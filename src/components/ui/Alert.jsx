import React from "react";

const Alert = React.forwardRef(function Alert({ className, variant = "default", ...props }, ref) {
    return (
      <div
        ref={ref}
        role="alert"
        className={"relative w-full rounded-lg border p-4 " + (className || "")}
        {...props}
      />
    );
  });
  Alert.displayName = "Alert";
  
  const AlertDescription = React.forwardRef(function AlertDescription({ className, ...props }, ref) {
    return <div ref={ref} className={"text-sm " + (className || "")} {...props} />;
  });
  AlertDescription.displayName = "AlertDescription";
  
  export { Alert, AlertDescription };
  