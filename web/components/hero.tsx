import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen text-center px-4">
      {/* Gradient Background */}
      <div 
        className="absolute top-0 right-0 w-96 h-96 bg-pink-100 rounded-full blur-3xl opacity-50"
        aria-hidden="true"
      />
      
      <h1 className="text-5xl md:text-6xl font-medium tracking-tight mb-4">
        Talk. <span className="text-primary">Heal.</span> Grow.
      </h1>
      <p className="text-lg text-muted-foreground mb-8">
        Talk about anything & everything, anonymously.
      </p>
      <Button size="lg" className="px-8">
        Start Your Journey
      </Button>
    </div>
  )
}

