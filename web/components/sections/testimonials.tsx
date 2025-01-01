"use client";

import Logo from "@/assets/Logo.png";
import TestimonialImage from "@/assets/Testimonial.png";
import Image from "next/image";
import { AnimatedTestimonials } from "../ui/animated-testimonials";

interface TestimonialCardProps {
  quote: string;
  author: string;
  location: string;
  isFocused: boolean;
}

function TestimonialCard({
  quote,
  author,
  location,
  isFocused,
}: TestimonialCardProps & { isFocused: boolean }) {
  return (
    <div
      className={`flex-shrink-0 w-[500px] bg-white rounded-lg shadow-lg p-6 mx-2 transition-transform duration-300 border-4 ${
        isFocused ? "scale-100" : "scale-50 border-transparent"
      }`}
    >
      <Image
        src={TestimonialImage}
        alt="TestimonialImage"
        className="w-12 h-12 rounded-full mb-4 flex items-center justify-center text-white text-xs"
      />

      <blockquote className="text-sm mb-4">{`"${quote}"`}</blockquote>
      <div className="text-right">
        <p className="font-medium">{author}</p>
        <p className="text-sm text-muted-foreground flex items-center justify-end gap-1">
          {location}
          <span className="text-xs">🇺🇸</span>
        </p>
      </div>
    </div>
  );
}

const testimonials = [
  {
    quote:
      "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
    name: "Sarah Chen",
    designation: "Product Manager at TechFlow",
    src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
    name: "Michael Rodriguez",
    designation: "CTO at InnovateSphere",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
    name: "Emily Watson",
    designation: "Operations Director at CloudScale",
    src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
    name: "James Kim",
    designation: "Engineering Lead at DataPro",
    src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
    name: "Lisa Thompson",
    designation: "VP of Technology at FutureNet",
    src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 overflow-hidden ">
      <div className="container mb-12 mx-auto">
        <h2 className="text-4xl md:text-5xl font-medium text-center flex items-center justify-center gap-2">
          50+ users trust
          <span className="inline-flex items-center">
            <Image
              src={Logo}
              alt="Logo"
              className="w-16 h-16"
              width={100}
              height={100}
            />
            HEARTLY
          </span>
        </h2>
      </div>
      <div>
        <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
      </div>
    </section>
  );
}
