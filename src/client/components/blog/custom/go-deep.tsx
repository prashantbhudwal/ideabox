import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/client/components/ui/accordion";
import React from "react";
import { Prose } from "./prose";

export function GoDeep({
  title,
  content,
}: {
  title: string;
  content: React.ReactNode;
}) {
  return (
    <Accordion type="single" collapsible className="p-0">
      <AccordionItem value="item-1" className="group">
        <div className="group-data-[state=open]:border group-data-[state=open]:border-foreground-muted group-data-[state=open]:rounded-lg group-data-[state=open]:px-3 group-data-[state=open]:shadow-sm group-data-[state=open]:pt-0 group-data-[state=open]:mt-0 transition-all ">
          <AccordionTrigger className="transition-all group-data-[state=open]:text-lg group-data-[state=open]:font-semibold group-data-[state=open]:text-primary justify-end pt-0">
            {title}
          </AccordionTrigger>
          <AccordionContent>
            <Prose>{content}</Prose>
          </AccordionContent>
        </div>
      </AccordionItem>
    </Accordion>
  );
}
