import Image from "next/image";
import { StaticImageData } from "next/image";
import FeatureImage from "@/assets/Group 35.png";
import FeatureImage2 from "@/assets/Group 37.png";
import FeatureImage3 from "@/assets/Group 36.png";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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

export function What() {
  return (
    <section id="how" className="py-24 px-4 sm:px-8 md:px-16">
    <div className="container mx-auto flex flex-col items-center gap-12 sm:gap-16 md:gap-24">
      <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium text-center leading-tight">
      Discover {" "}
        <span className="bg-gradient-to-r from-[#FEBF5D] to-[#FFA2C9] text-transparent bg-clip-text">
        Heartly: 
        </span>{" "}
        A Confidential Space for Mental Wellness
      </h2>
      <p className="text-lg mb-8 font-normal text-center">
      Heartly isn&apos;t just a mental wellness platform; it&apos;s a technological breakthrough designed for Web3 enthusiasts and tech professionals. Here&apos;s why we’re different:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12 md:gap-16">
          <FeatureCard
            featureImage={FeatureImage}
            title="Privacy-Powered by Zero-Knowledge Proofs"
            description="Your identity and data remain completely private, secured by advanced cryptographic technology."
          />
          <FeatureCard
            featureImage={FeatureImage2}
            title="Built for the Web3 Era"
            description=" Embrace a decentralized, user-first approach to mental health."
          />
          <FeatureCard
            featureImage={FeatureImage3}
            title="A Judgment-Free Space"
            description="Feel safe sharing your thoughts, knowing you’re in a secure and anonymous environment."
          />
        </div>
        <Link href="/coming-soon">
          {" "}
          {/* Changed from "/app" to "/coming-soon" */}
          <Button
            size="lg"
            className="bg-gradient-to-r from-[#FEBF5D] to-[#FFA2C9] text-white py-2 px-4 rounded hover:bg-gradient-to-r hover:from-[#FFA2C9] hover:to-[#FEBF5D] hover:transition-colors duration-300 font-nunito text-lg"
          >
            Join the future of mental wellness today
          </Button>
        </Link>
      </div>
      </section>
  )
}