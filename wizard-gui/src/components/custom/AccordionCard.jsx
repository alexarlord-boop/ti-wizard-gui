import React from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const AccordionCard = ({ header, children, isOpened = false}) => {
    return (
        <Accordion type="single" collapsible defaultValue={isOpened ? "item" : null}>
            <AccordionItem value="item" className="px-3 rounded-lg border bg-card text-card-foreground shadow-sm">
                <AccordionTrigger>{header}</AccordionTrigger>
                <AccordionContent >
                    {children}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default AccordionCard;