interface ExperienceCardProps {
  title: string;
  description: string;
}

function ExperienceCard({ title, description }: ExperienceCardProps) {
  return (
    <div className="relative">
      {/* WIP Badge */}
      <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
        wip icon
      </div>

      {/* Card */}
      <div className="h-48 w-full rounded-lg bg-gradient-to-br from-pink-50 to-orange-50 p-6 flex flex-col justify-end">
        <h3 className="font-medium text-lg mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

export function Experience() {
  return (
    <section className="py-24 px-4">
      <div className="container font-nunito mx-auto">
        <h2 className="text-4xl md:text-5xl font-medium text-center mb-16">
          Experience <span className="text-orange-300">mindfulness</span> today!
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ExperienceCard
            title="Absolute Privacy"
            description="Your journey is yours alone. Heartly ensures complete privacy through decentralized Web3 technology, storing no user data"
          />
          <ExperienceCard
            title="Personalized Guidance"
            description="Your journey is yours alone. Heartly ensures complete privacy through decentralized Web3 technology, storing no user data"
          />
          <ExperienceCard
            title="Web3-Powered Freedom"
            description="Your journey is yours alone. Heartly ensures complete privacy through decentralized Web3 technology, storing no user data"
          />
        </div>
      </div>
    </section>
  );
}
