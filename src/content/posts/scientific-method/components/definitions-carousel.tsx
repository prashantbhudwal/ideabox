import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/client/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/client/components/ui/carousel";

import dedent from "dedent";
import { Prose } from "~/client/components/blog/custom/prose.v2";
import { useIsMobile } from "~/client/hooks/use-mobile";

const content = [
  {
    source: { title: "Khan Academy", description: "Used around the world." },
    text: dedent`The scientific method has five basic steps, plus one feedback step:
1. Make an observation.
2. Ask a question.
3. Form a hypothesis, or testable explanation.
4. Make a prediction based on the hypothesis.
5. Test the prediction.
6. Iterate: use the results to make new hypotheses or predictions.`,
    warning:
      "In most cases, the scientific method is an iterative process. In other words, it's a cycle rather than a straight line.",
  },
  {
    source: { title: "NCERT, Grade 6", description: "Major Indian Textbook" },
    text: dedent` Science...is about following a step-by-step process that helps us find answers to our questions...First, we observe something that we find interesting or we do not understand. This makes us wonder and perhaps think of a question about it. Then, we guess a possible answer to that question. We test this guess through experiments or more observations. We then try to analyse the results to see if it actually answers our question`,
    warning: "None",
  },

  {
    source: {
      title: "CK-12 Foundation",
      description: "Aligned to common core curriculum.",
    },
    text: dedent`It generally follows the steps. A scientific investigation is a plan for asking questions and testing possible answers. It generally follows the steps listed ... below 
    1.	Make observations
	2.	Ask a question
	3.	Research background
	4.	Form a hypothesis
	5.	Test the hypothesis
	6.	Draw conclusion
	7.	Communicate results `,
    warning:
      "In reality, however, the process doesn’t always go in a straight line.",
  },
];

export default function DefinitionsCarousel({
  hasWarnings = false,
}: {
  hasWarnings?: boolean;
}) {
  const isMobile = useIsMobile();
  return (
    <Carousel orientation={isMobile ? "vertical" : "horizontal"}>
      <CarouselContent>
        {content.map((item) => {
          return (
            <CarouselItem key={item.source.title}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>{item.source.title}</CardTitle>
                  <CardDescription>{item.source.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Prose type="markdown" content={item.text} />
                </CardContent>
                <CardFooter className="text-amber-300 italic">
                  {hasWarnings && <> Warning: {item.warning}</>}
                </CardFooter>
              </Card>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      {!isMobile && (
        <>
          <CarouselPrevious />
          <CarouselNext />
        </>
      )}
    </Carousel>
  );
}
