import { Button } from "@/components/ui/button"

const ActionButton = ({ 
  children, 
  onClick, 
  variant = "default",
  size = "lg",
  disabled = false,
  fullWidth = false,
  icon = null,
  className = "",
  ...props 
}) => {
  const baseClasses = "px-8 py-3 text-lg hover:scale-105 transition-transform"
  const widthClasses = fullWidth ? "w-full" : "w-full md:w-auto"
  const variantClasses = variant === "outline" ? "bg-transparent" : ""
  
  const combinedClasses = `${baseClasses} ${widthClasses} ${variantClasses} ${className}`

  return (
    <Button
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </Button>
  )
}

export default ActionButton