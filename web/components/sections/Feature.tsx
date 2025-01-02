import { StaticImageData } from "next/image";
import Image from "next/image";

import FeatureImage from "@/assets/Experience1.png";
import FeatureImage2 from "@/assets/Experience2.png";
import FeatureImage3 from "@/assets/Experience3.png";
interface FeatureCardProps {
  title: string;
  description: string;
  featureImage: StaticImageData;
}

function FeatureCard({ title, description, featureImage }: FeatureCardProps) {
  return (
    <div className="flex flex-col gap-4 sm:gap-6 md:gap-8">
      <div className=" rounded-lg overflow-hidden  flex flex-col justify-center items-center gap-4 h-80">
        <Image src={featureImage} alt={title} className="object-cover" />
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

export function Features() {
  return (
    <section id="what" className="py-24 px-4 bg-[#F8C1D8] bg-opacity-10">
      <div className="container font-nunito mx-auto">
        <h2 className="text-4xl md:text-5xl font-medium text-center mb-16">
          A{" "}
          <span className="bg-gradient-to-r from-[#FEBF5D] to-[#FFA2C9] text-transparent bg-clip-text font-medium">
            new
          </span>{" "}
          era of
          <br />
          Mindful Living
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12 md:gap-16">
          <FeatureCard
            featureImage={FeatureImage}
            title="Absolute Privacy"
            description="Your journey is yours alone. Heartly ensures complete privacy through decentralized Web3 technology, storing no user data."
          />
          <FeatureCard
            featureImage={FeatureImage2}
            title="Personalized Guidance"
            description="Your journey is yours alone. Heartly ensures complete privacy through decentralized Web3 technology, storing no user data."
          />
          <FeatureCard
            featureImage={FeatureImage3}
            title="Web3-Powered Freedom"
            description="Your journey is yours alone. Heartly ensures complete privacy through decentralized Web3 technology, storing no user data."
          />
        </div>
      </div>
    </section>
  );
}
