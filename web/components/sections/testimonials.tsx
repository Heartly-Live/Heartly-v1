"use client";

import { useEffect, useRef, useState } from "react";
import Logo from "@/assets/Logo.png";
import Image from "next/image";

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
      className={`flex-shrink-0 w-[300px] bg-white rounded-lg shadow-lg p-6 mx-4 transition-transform duration-300 border-4 ${
        isFocused ? "scale-125 border-tertiary" : "scale-50 border-transparent"
      }`}
    >
      <div className="w-12 h-12 bg-red-500 rounded-full mb-4 flex items-center justify-center text-white text-xs">
        wip pic
      </div>
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
      "Heartly gives me peace of mind, knowing my self-care journey is 100% private and tailored just for me.",
    author: "Sophia A.",
    location: "New Jersey, USA",
  },
  {
    quote:
      "The personalized approach to mindfulness has transformed my daily routine.",
    author: "Michael R.",
    location: "California, USA",
  },
  {
    quote:
      "I love how I can focus on my journey without worrying about data privacy.",
    author: "Emma L.",
    location: "Texas, USA",
  },
  {
    quote:
      "The Web3 integration makes me feel secure about my personal information.",
    author: "David K.",
    location: "Florida, USA",
  },
  // Duplicate testimonials for continuous scroll
  {
    quote:
      "Heartly gives me peace of mind, knowing my self-care journey is 100% private and tailored just for me.",
    author: "Sophia A.",
    location: "New Jersey, USA",
  },
  {
    quote:
      "The personalized approach to mindfulness has transformed my daily routine.",
    author: "Michael R.",
    location: "California, USA",
  },
];

export function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollWidth = scrollContainer.scrollWidth;
    const clientWidth = scrollContainer.clientWidth;
    const duration = 30000; // 30 seconds for one complete scroll

    let start: number | null = null;
    let previousTimestamp: number | null = null;

    function step(timestamp: number) {
      if (!start) start = timestamp;
      if (!previousTimestamp) previousTimestamp = timestamp;

      if (!scrollContainer) return;

      const elapsed = timestamp - start;

      const progress = (elapsed % duration) / duration;
      const scrollPosition = progress * (scrollWidth - clientWidth);

      scrollContainer.scrollLeft = scrollPosition;

      // Calculate the focused index
      const centerPosition = scrollPosition + clientWidth / 2;
      const cardWidth = 300 + 32; // card width + margin
      const newFocusedIndex = Math.floor(centerPosition / cardWidth);

      setFocusedIndex(newFocusedIndex);

      previousTimestamp = timestamp;
      requestAnimationFrame(step);
    }

    const animationFrame = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollContainer = scrollRef.current;
      if (!scrollContainer) return;

      const scrollLeft = scrollContainer.scrollLeft;
      const clientWidth = scrollContainer.clientWidth;
      const centerPosition = scrollLeft + clientWidth / 2;
      const cardWidth = 300 + 32; // card width + margin
      const newFocusedIndex = Math.floor(centerPosition / cardWidth);

      setFocusedIndex(newFocusedIndex);
    };

    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <section className="py-24 relative overflow-hidden mx-auto">
      <div className="container mb-12">
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

      <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-background to-transparent z-10" />

      <div ref={scrollRef} className="flex overflow-hidden">
        <div className="flex animate-scroll">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              location={testimonial.location}
              isFocused={index === focusedIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
