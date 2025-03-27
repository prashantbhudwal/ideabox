"use client";
import { useState } from "react";
import { InView } from "react-intersection-observer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { storyPoints } from "./story-data";
import { TravelMap } from "./map";

const observerOptions = {
  // threshold: 0, // Not needed if using rootMargin effectively
  rootMargin: "0px 0px -60% 0px", // Adjust % to control trigger point
};

export function Story() {
  const [activeLocationId, setActiveLocationId] = useState<string | null>(
    storyPoints[0]?.id || null,
  );

  const activeLocation = storyPoints.find((loc) => loc.id === activeLocationId);

  // Callback function for when a section's intersection state changes
  const handleInViewChange = (
    inView: boolean,
    entry: IntersectionObserverEntry,
  ) => {
    // Get the location ID from the target element's dataset
    const locationId = (entry.target as HTMLElement)?.dataset?.locationId;

    // Update the active location ID *only* when the section comes into view
    if (inView && locationId) {
      console.log("InView:", locationId); // For debugging
      setActiveLocationId(locationId);
    }
    // Note: If multiple sections are "inView" based on the options,
    // the *last one* to trigger this callback will set the state.
  };

  return (
    <div className="container py-8 max-w-7xl">
      <div className="flex flex-col gap-12">
        <div className="sticky top-2 z-10 w-full shadow-lg">
          <TravelMap
            targetLocation={
              activeLocation
                ? {
                    coordinates: activeLocation.coordinates,
                    zoom: activeLocation.zoom,
                  }
                : null
            }
            allLocations={storyPoints}
          />
        </div>

        <div className="prose prose-lg max-w-none dark:prose-invert space-y-12">
          {storyPoints.map((location, index) => (
            <InView
              key={location.id}
              as="div"
              onChange={handleInViewChange}
              {...observerOptions}
              data-location-id={location.id}
              id={`section-${location.id}`}
            >
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>
                    {index + 1}. {location.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>{location.description}</CardContent>
              </Card>
              {index < storyPoints.length - 1 && (
                <div className="h-12" /> // Spacer instead of Separator
              )}
            </InView>
          ))}
        </div>
      </div>
    </div>
  );
}
