import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FC, ReactNode } from "react";

type CustomAccType = {
  items: { title: string; content: ReactNode }[];
  type: "multiple" | "single";
};

const CustomAccordion: FC<CustomAccType> = ({ items, type }) => {
  return (
    <Accordion
      type={type}
      // collapsible
      className="w-full space-y-4"
    >
      {items.map(({ content, title }, index) => {
        return (
          <AccordionItem
            value={title}
            key={index}
            className="border-2 border-zinc-200 rounded-2xl no-underline overflow-clip"
          >
            <AccordionTrigger className="border-none font-semibold text-primary px-3  ">
              {title}
            </AccordionTrigger>
            <AccordionContent className="border-t-[1.5px] border-green-800/70">
              {content}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default CustomAccordion;
