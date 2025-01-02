import Image from "next/image";
import { StaticImageData } from "next/image";
import ExperienceImage from "@/assets/Exp1.png";
import ExperienceImage2 from "@/assets/Exp2.png";
import ExperienceImage3 from "@/assets/Exp3.png";

interface ExperienceCardProps {
  title: string;
  description: string;
  ExperienceImage: StaticImageData;
}

function ExperienceCard({
  title,
  description,
  ExperienceImage,
}: ExperienceCardProps) {
  return (
    <div className="flex flex-col gap-4 sm:gap-6 md:gap-8">
      <div className=" rounded-lg overflow-hidden  flex flex-col justify-center items-center gap-4">
        <Image src={ExperienceImage} alt={title} className="" />
      </div>
      <h3 className="font-medium text-lg sm:text-xl md:text-2xl text-center">
        {title}
      </h3>
      <p className="text-sm sm:text-base text-muted-foreground text-center">
        {description}
      </p>
    </div>
  );
}

export function Experience() {
  return (
    <section id="why" className="py-24 px-4 sm:px-8 md:px-16">
      <div className="container mx-auto flex flex-col items-center gap-12 sm:gap-16 md:gap-24">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium text-center leading-tight">
          Experience{" "}
          <span className="bg-gradient-to-r from-[#FEBF5D] to-[#FFA2C9] text-transparent bg-clip-text">
            mindfulness
          </span>{" "}
          today!
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12 md:gap-16">
          <ExperienceCard
            ExperienceImage={ExperienceImage}
            title="Global Accessibility 🌎"
            description="Connect with a global audience through a multilingual platform designed for inclusivity."
          />
          <ExperienceCard
            ExperienceImage={ExperienceImage2}
            title="Targeted Engagement 🎯"
            description="Dive into curated topics tailored to your mindfulness and self-help needs."
          />
          <ExperienceCard
            ExperienceImage={ExperienceImage3}
            title="Credible Access Control ⛔️"
            description="Ensuring secure and validated participation with wallet-based access and accountability."
          />
        </div>
      </div>
    </section>
  );
}
