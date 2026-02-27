import * as React from "react"
import { cn } from "@/lib/utils"

interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  viewportClassName?: string
}

const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ className, children, viewportClassName, ...props }, ref) => (
    <div ref={ref} className={cn("relative overflow-hidden", className)} {...props}>
      <div
        className={cn(
          "h-full w-full overflow-auto [scrollbar-width:thin] [scrollbar-color:rgba(148,163,184,0.45)_transparent]",
          "[&::-webkit-scrollbar]:h-2.5 [&::-webkit-scrollbar]:w-2.5",
          "[&::-webkit-scrollbar-track]:bg-transparent",
          "[&::-webkit-scrollbar-thumb]:rounded-full",
          "[&::-webkit-scrollbar-thumb]:bg-slate-400/45",
          "[&::-webkit-scrollbar-thumb:hover]:bg-slate-300/65",
          "dark:[&::-webkit-scrollbar-thumb]:bg-slate-500/55",
          "dark:[&::-webkit-scrollbar-thumb:hover]:bg-slate-400/70",
          viewportClassName
        )}
      >
        {children}
      </div>
    </div>
  )
)
ScrollArea.displayName = "ScrollArea"

interface ScrollBarProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "vertical" | "horizontal"
}

const ScrollBar = React.forwardRef<HTMLDivElement, ScrollBarProps>(
  ({ className, orientation = "vertical", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "pointer-events-none absolute select-none rounded-full bg-transparent",
        orientation === "vertical" ? "inset-y-0 right-0 w-2.5" : "inset-x-0 bottom-0 h-2.5",
        className
      )}
      {...props}
    />
  )
)
ScrollBar.displayName = "ScrollBar"

export { ScrollArea, ScrollBar }
