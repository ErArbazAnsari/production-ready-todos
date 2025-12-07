import * as React from "react"
import * as FormPrimitive from "@radix-ui/react-form"
import { cn } from "@/lib/utils"

const Form = FormPrimitive.Root

const FormField = React.forwardRef(
  ({ className, ...props }, ref) => (
    <FormPrimitive.Field
      ref={ref}
      className={cn("space-y-2", className)}
      {...props}
    />
  )
)
FormField.displayName = "FormField"

const FormLabel = React.forwardRef(
  ({ className, ...props }, ref) => (
    <FormPrimitive.Label
      ref={ref}
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      {...props}
    />
  )
)
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef(({ ...props }, ref) => (
  <FormPrimitive.Control ref={ref} {...props} />
))
FormControl.displayName = "FormControl"

const FormMessage = React.forwardRef(
  ({ className, ...props }, ref) => (
    <FormPrimitive.Message
      ref={ref}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    />
  )
)
FormMessage.displayName = "FormMessage"

export { Form, FormField, FormLabel, FormControl, FormMessage }
