import React from "react";
import "./btn.css"
const Button = React.forwardRef(function Button({ className, variant = "default", size = "default", asChild = false, ...props }, ref) {
    const Comp = asChild ? "span" : "button";
    return (
      <Comp
        ref={ref}
        className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none text-black disabled:opacity-50 btn  ${className || ""}`}
        {...props}
      />
    );
  });
  Button.displayName = "Button";
  export { Button };