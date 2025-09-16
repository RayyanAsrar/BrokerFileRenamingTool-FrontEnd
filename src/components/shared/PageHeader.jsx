const PageHeader = ({ title, description, className = "" }) => {
  return (
    <div className={`text-center mb-8 ${className}`}>
      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
        {title}
      </h2>
      <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
        {description}
      </p>
    </div>
  )
}

export default PageHeader