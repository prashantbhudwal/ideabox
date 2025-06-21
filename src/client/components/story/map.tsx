import React, { useState, useRef, useEffect } from "react";
import mapboxgl, { type Map, Marker, type LngLatLike } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { AspectRatio } from "~/client/components/ui/aspect-ratio";
import { useIsMobile } from "~/client/hooks/use-mobile";
import { type Story } from "./types";

interface TargetLocation {
  coordinates: [number, number];
  zoom: number;
}

interface TravelMapProps {
  targetLocation: TargetLocation | null;
  allLocations: Story[]; // Pass all locations to draw markers/lines
}

export const TravelMap: React.FC<TravelMapProps> = ({
  targetLocation,
  allLocations = [],
}) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<Map | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const markersRef = useRef<Record<string, Marker>>({}); // Store markers

  // --- Initial Map Setup ---
  useEffect(() => {
    if (map.current || !mapContainer.current || !allLocations.length) return;

    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!mapboxToken) {
      console.error("Mapbox token is not set!");
      return;
    }
    mapboxgl.accessToken = mapboxToken;

    const initialCenter = allLocations[0]?.coordinates || [78, 22];
    const initialZoom = allLocations[0]?.zoom || 4;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: initialCenter,
      zoom: initialZoom,
      pitch: 45,
      bearing: 0,
      attributionControl: false,
    });

    map.current.on("load", () => {
      setIsMapLoaded(true);

      // Force resize when map loads
      window.setTimeout(() => {
        map.current?.resize();
      }, 0);

      if (!map.current) return;

      // Create curved line coordinates
      const createCurvedLine = (
        start: [number, number],
        end: [number, number],
      ) => {
        // Calculate the midpoint and add some curve
        const midPoint = [(start[0] + end[0]) / 2, (start[1] + end[1]) / 2];

        // Add altitude for curve
        const curvePoint = [
          midPoint[0],
          midPoint[1],
          // More distance = more curve
          Math.sqrt(
            Math.pow(end[0] - start[0], 2) + Math.pow(end[1] - start[1], 2),
          ) * 0.5,
        ];

        // Generate curve points
        const points = [];
        for (let i = 0; i <= 100; i++) {
          const t = i / 100;
          points.push([
            start[0] * Math.pow(1 - t, 2) +
              curvePoint[0] * 2 * (1 - t) * t +
              end[0] * Math.pow(t, 2),
            start[1] * Math.pow(1 - t, 2) +
              curvePoint[1] * 2 * (1 - t) * t +
              end[1] * Math.pow(t, 2),
          ]);
        }
        return points;
      };

      // Create curved lines between all points
      let curvedLineCoordinates: [number, number][] = [];
      for (let i = 0; i < allLocations.length - 1; i++) {
        const curved = createCurvedLine(
          allLocations[i].coordinates,
          allLocations[i + 1].coordinates,
        );
        curvedLineCoordinates = [
          ...curvedLineCoordinates,
          ...curved.map((coord): [number, number] => [coord[0], coord[1]]),
        ];
      }

      const points = allLocations.map((loc) => ({
        type: "Feature" as const,
        geometry: {
          type: "Point" as const,
          coordinates: loc.coordinates,
        },
        properties: { title: loc.title, id: loc.id },
      }));

      const line = {
        type: "Feature" as const,
        geometry: {
          type: "LineString" as const,
          coordinates: curvedLineCoordinates,
        },
        properties: {},
      };

      const geojsonData: GeoJSON.FeatureCollection = {
        type: "FeatureCollection",
        features: [...points, line],
      };

      // Add source
      map.current.addSource("travel-data", {
        type: "geojson",
        data: geojsonData,
      });

      // Add the path line (background)
      map.current.addLayer({
        id: "route-background",
        type: "line",
        source: "travel-data",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#1a1a1a",
          "line-width": 6,
          "line-opacity": 0.3,
          "line-blur": 1, // Add blur for softer edges
        },
        filter: ["==", "$type", "LineString"],
      });

      // Add the main path line with dash animation
      map.current.addLayer({
        id: "route-main",
        type: "line",
        source: "travel-data",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#22c55e",
          "line-width": 3,
          "line-opacity": 0.8,
          "line-dasharray": [2, 4], // Add dash pattern
        },
        filter: ["==", "$type", "LineString"],
      });

      // Add location markers with smoother animations
      const currentMarkers: Record<string, Marker> = {};
      points.forEach((feature) => {
        const properties = feature.properties as { title: string; id: string };
        const element = document.createElement("div");
        element.className = "custom-marker";
        element.style.width = "20px";
        element.style.height = "20px";
        element.style.backgroundColor = "#22c55e";
        element.style.borderRadius = "50%";
        element.style.border = "2px solid #1a1a1a";
        element.style.transition = "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)";

        const marker = new Marker({
          element,
          scale: 0.8,
        })
          .setLngLat(feature.geometry.coordinates as LngLatLike)
          .addTo(map.current!);

        currentMarkers[properties.id] = marker;
      });
      markersRef.current = currentMarkers;

      // Add minimal navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl({
          showCompass: false,
          showZoom: true,
        }),
        "top-right",
      );
    });

    return () => {
      map.current?.remove();
      map.current = null;
      setIsMapLoaded(false);
      markersRef.current = {};
    };
  }, [allLocations]);

  // Smoother marker animations
  useEffect(() => {
    if (isMapLoaded && map.current && targetLocation) {
      map.current.flyTo({
        center: targetLocation.coordinates,
        zoom: targetLocation.zoom,
        essential: true,
        duration: 2000,
        pitch: 45,
        bearing: 0,
        curve: 1.42,
        easing: (t) => t * (2 - t),
      });

      // Smoother marker transitions
      Object.entries(markersRef.current).forEach(([id, marker]) => {
        const element = marker.getElement();
        const isActive =
          allLocations.find((loc) => loc.id === id)?.coordinates ===
          targetLocation.coordinates;

        element.style.transform = `scale(${isActive ? 1.3 : 0.8})`;
        element.style.backgroundColor = isActive ? "#22c55e" : "#1a1a1a";
        element.style.zIndex = isActive ? "10" : "1";
      });
    }
  }, [targetLocation, isMapLoaded, allLocations]);

  const isMobile = useIsMobile();

  return (
    <AspectRatio ratio={isMobile ? 4 / 3 : 21 / 9}>
      <div
        //ref={mapContainer}
        className="h-full w-full rounded-lg overflow-hidden"
        style={{
          position: "relative",
          isolation: "isolate",
          minHeight: "100%",
          minWidth: "100%",
        }}
      />
    </AspectRatio>
  );
};
