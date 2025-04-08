import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

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
        <div className="group-data-[state=open]:border group-data-[state=open]:border-foreground-muted group-data-[state=open]:rounded-lg group-data-[state=open]:px-3 group-data-[state=open]:shadow-sm transition-all">
          <AccordionTrigger className="transition-all group-data-[state=open]:text-lg group-data-[state=open]:font-semibold group-data-[state=open]:text-primary">
            {title}
          </AccordionTrigger>
          <AccordionContent>{content}</AccordionContent>
        </div>
      </AccordionItem>
    </Accordion>
  );
}
