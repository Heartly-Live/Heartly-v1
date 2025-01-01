interface ExperienceCardProps {
  title: string;
  description: string;
}

import Image from "next/image";
import ExperienceImage from "@/assets/Experience1.png";
import ExperienceImage2 from "@/assets/Experience2.png";
import ExperienceImage3 from "@/assets/Experience3.png";

function ExperienceCard({ title, description }: ExperienceCardProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="h-48 w-full rounded-lg  p-6 flex flex-col justify-center items-center">
        <Image src={ExperienceImage} alt="ExperienceImage" className="" />
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
        <h2 className="text-4xl md:text-5xl font-medium text-center">
          Experience <span className="text-orange-300">mindfulness</span> today!
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-28">
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
