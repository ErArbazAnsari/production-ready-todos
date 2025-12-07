import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { cn } from "@/lib/utils";

const Alert = AlertDialogPrimitive.Root;

const AlertTrigger = AlertDialogPrimitive.Trigger;

const AlertCancel = AlertDialogPrimitive.Cancel;

const AlertAction = AlertDialogPrimitive.Action;

const AlertContent = React.forwardRef(({ className, ...props }, ref) => (
    <AlertDialogPrimitive.Portal>
        <AlertDialogPrimitive.Overlay className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <AlertDialogPrimitive.Content
            ref={ref}
            className={cn(
                "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
                className
            )}
            {...props}
        />
    </AlertDialogPrimitive.Portal>
));
AlertContent.displayName = AlertDialogPrimitive.Content.displayName;

const AlertTitle = React.forwardRef(({ className, ...props }, ref) => (
    <AlertDialogPrimitive.Title
        ref={ref}
        className={cn("mb-2 font-bold", className)}
        {...props}
    />
));
AlertTitle.displayName = AlertDialogPrimitive.Title.displayName;

const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
    <AlertDialogPrimitive.Description
        ref={ref}
        className={cn("mb-2 text-sm text-muted-foreground", className)}
        {...props}
    />
));
AlertDescription.displayName = AlertDialogPrimitive.Description.displayName;

export {
    Alert,
    AlertTrigger,
    AlertCancel,
    AlertAction,
    AlertContent,
    AlertTitle,
    AlertDescription,
};
