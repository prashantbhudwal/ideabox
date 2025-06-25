import { useState } from "react";
import { InView } from "react-intersection-observer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/client/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/client/components/ui/accordion";
import { layersPoints } from "./story-data";
import { TravelMap } from "./map";
import { Markdown } from "~/client/components/blog/mdx/md.client";
import { Slider } from "~/client/components/ui/slider";
import { DETAIL_LABELS, LEVEL, type Story, type StorySubplot } from "./types";
import { Separator } from "~/client/components/ui/separator";
import { SummaryCard } from "./summary-card";
import { useAtom } from "jotai";
import { resolutionAtom } from "./resolution-atom";
import { useScrollDirection } from "~/client/hooks/use-scroll-direction";

const observerOptions = {
  // threshold: 0, // Not needed if using rootMargin effectively
  rootMargin: "0px 0px -60% 0px", // Adjust % to control trigger point
};

export function Story() {
  const [isSliding, setIsSliding] = useState(false);
  const [activeLocationId, setActiveLocationId] = useState<string | null>(
    layersPoints[0]?.id || null,
  );
  const [expandedSubplotId, setExpandedSubplotId] = useState<string | null>(
    null,
  );
  const [resolution, setResolution] = useAtom<number>(resolutionAtom);
  const { isScrollingUp, hasScrolled, isIdle } = useScrollDirection();

  const activeLocation = layersPoints.find(
    (loc) => loc.id === activeLocationId,
  );

  // Callback function for when a section's intersection state changes
  const handleInViewChange = function (
    inView: boolean,
    entry: IntersectionObserverEntry,
  ) {
    // Get the location ID from the target element's dataset
    const locationId = (entry.target as HTMLElement)?.dataset?.locationId;

    // Update the active location ID *only* when the section comes into view
    if (inView && locationId) {
      setActiveLocationId(locationId);
    }
    // Note: If multiple sections are "inView" based on the options,
    // the *last one* to trigger this callback will set the state.
  };

  const getLayerContent = (story: Story | StorySubplot) => {
    const level = Object.values(LEVEL).find((l) => l.value === resolution);
    if (!level) return "";

    // Initialize with concise content which is always available
    let content = story.layers.l1.text;

    // Helper to add layer content with spacing
    const addLayer = (text: string | undefined) => {
      if (text) {
        content = `${content} ${text}`;
      }
    };

    switch (level.name) {
      case "Basic":
        // Add professional, personal, then philosophical (in that order)
        addLayer(story.layers.l2?.text);
        break;
      case "Detailed":
        // Add professional then personal
        addLayer(story.layers.l2?.text);
        addLayer(story.layers.l3?.text);
        break;
      case "Concise":
      default:
        // Just return concise content
        break;
    }

    return content;
  };

  return (
    <div className="container py-8 max-w-7xl">
      {/* Desktop view */}
      <div className="hidden md:block">
        <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 bg-card border shadow-xl rounded-lg p-4 w-20">
          <div className="flex flex-col gap-8 items-center h-96">
            <div className="whitespace-nowrap text-sm font-medium text-primary">
              {DETAIL_LABELS[resolution]}
            </div>
            <Slider
              value={[resolution]}
              min={LEVEL.concise.value}
              max={LEVEL.detailed.value}
              step={1}
              orientation="vertical"
              onValueChange={(value) => {
                setResolution(value[0]);
                setIsSliding(true);
              }}
              onValueCommit={() => {
                setTimeout(() => setIsSliding(false), 1000);
              }}
              className="h-full w-3 [&_[role=slider]]:h-6 [&_[role=slider]]:w-6 [&_[role=slider]]:rounded-full [&_[role=slider]]:bg-primary [&_[role=slider]]:border-2 [&_[role=slider]]:border-background [&_[role=slider]]:shadow-lg touch-none"
            />
            <div className="flex flex-col justify-between h-32 py-1 text-center">
              {Object.values(LEVEL)
                .reverse()
                .map((level) => (
                  <div
                    key={level.value}
                    className={`text-xs font-medium ${
                      resolution === level.value
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {level.value}
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="prose max-w-none dark:prose-invert space-y-10 pb-44">
          <SummaryCard />
          <Separator />
          <h1 className="text-center text-2xl font-semibold font-mono text-muted-foreground">
            I, Prashant
          </h1>
          {layersPoints.map((event) => (
            <InView
              key={event.id}
              as="div"
              onChange={handleInViewChange}
              {...observerOptions}
              data-location-id={event.id}
              id={`section-${event.id}`}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-primary tracking-tight">
                    {event.title}
                  </CardTitle>
                  <CardDescription>{event.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Markdown content={getLayerContent(event)} />
                  {event.subplots && (
                    <Accordion
                      type="single"
                      value={expandedSubplotId || ""}
                      onValueChange={setExpandedSubplotId}
                      className="w-full"
                    >
                      {event.subplots
                        .filter(
                          (subplot) => subplot.resolution.value <= resolution,
                        )
                        .map((subplot) => {
                          const uniqueSubplotId = `${event.id}-${subplot.id}`;
                          return (
                            <AccordionItem
                              key={uniqueSubplotId}
                              value={uniqueSubplotId}
                              className="underline-none"
                            >
                              <AccordionTrigger className="flex justify-between text-base hover:no-underline hover:cursor-pointer">
                                <div className="flex flex-col space-y-1 items-baseline">
                                  <span>{subplot.title}</span>
                                  <span className="text-xs text-muted-foreground">
                                    {subplot.description}
                                  </span>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent>
                                <Markdown content={getLayerContent(subplot)} />
                              </AccordionContent>
                            </AccordionItem>
                          );
                        })}
                    </Accordion>
                  )}
                </CardContent>
              </Card>
            </InView>
          ))}
        </div>
      </div>

      {/* Mobile view */}
      <div className="md:hidden">
        <div className="prose max-w-none dark:prose-invert space-y-10 pb-44">
          <SummaryCard />
          <Separator />
          <h1 className="text-center text-xl font-semibold font-mono text-muted-foreground">
            I, Prashant
          </h1>

          {layersPoints.map((event) => (
            <InView
              key={event.id}
              as="div"
              onChange={handleInViewChange}
              {...observerOptions}
              data-location-id={event.id}
              id={`section-${event.id}`}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-primary tracking-tight">
                    {event.title}
                  </CardTitle>
                  <CardDescription>{event.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Markdown content={getLayerContent(event)} />
                  {event.subplots && (
                    <Accordion
                      type="single"
                      value={expandedSubplotId || ""}
                      onValueChange={setExpandedSubplotId}
                      className="w-full"
                    >
                      {event.subplots
                        .filter(
                          (subplot) => subplot.resolution.value <= resolution,
                        )
                        .map((subplot) => {
                          const uniqueSubplotId = `${event.id}-${subplot.id}`;
                          return (
                            <AccordionItem
                              key={uniqueSubplotId}
                              value={uniqueSubplotId}
                              className="underline-none"
                            >
                              <AccordionTrigger className="flex justify-between text-base hover:no-underline hover:cursor-pointer">
                                <div className="flex flex-col space-y-1 items-baseline">
                                  <span>{subplot.title}</span>
                                  <span className="text-xs text-muted-foreground">
                                    {subplot.description}
                                  </span>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent>
                                <Markdown content={getLayerContent(subplot)} />
                              </AccordionContent>
                            </AccordionItem>
                          );
                        })}
                    </Accordion>
                  )}
                </CardContent>
              </Card>
            </InView>
          ))}
        </div>

        <div
          className={`fixed bottom-4 left-1/2 -translate-x-1/2 bg-card border shadow-xl rounded-lg w-72 px-4 py-3 transition-all duration-300 ${
            !hasScrolled || isScrollingUp || isIdle
              ? "translate-y-0 opacity-100"
              : "translate-y-32 opacity-0"
          }`}
        >
          <div className="space-y-3">
            <div className="flex items-baseline justify-between">
              <div className="text-sm font-medium">Detail Level</div>
              <div className="text-base font-medium text-primary whitespace-nowrap">
                {DETAIL_LABELS[resolution]}
              </div>
            </div>
            <Slider
              value={[resolution]}
              min={LEVEL.concise.value}
              max={LEVEL.detailed.value}
              step={1}
              onValueChange={(value) => {
                setResolution(value[0]);
                setIsSliding(true);
              }}
              onValueCommit={() => {
                setTimeout(() => setIsSliding(false), 1000);
              }}
              className="w-full [&_[role=slider]]:h-6 [&_[role=slider]]:w-6"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
