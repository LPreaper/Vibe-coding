"use client";

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible@1.1.3";
import { cn } from "./utils";

function Collapsible({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
}

function CollapsibleTrigger({
  className,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      className={cn("cursor-pointer", className)}
      {...props}
    />
  );
}

function CollapsibleContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      className={cn(
        "overflow-hidden origin-top",
        "transition-all duration-300 ease-in-out",
        "data-[state=closed]:animate-[slideUp_300ms_cubic-bezier(0.4,0,0.2,1)]",
        "data-[state=open]:animate-[slideDown_300ms_cubic-bezier(0.4,0,0.2,1)]",
        className
      )}
      {...props}
    >
      <div className="pt-0 animate-[fadeIn_400ms_ease-out_100ms_backwards]">
        {children}
      </div>
    </CollapsiblePrimitive.CollapsibleContent>
  );
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
