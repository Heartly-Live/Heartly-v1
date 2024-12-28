import React from "react";
import { Hero } from "@/components/sections/Home";
import { Features } from "../sections/Feature";
import { Experience } from "../sections/experience";
import { Testimonials } from "../sections/testimonials";
import { Footer } from "../sections/footer";

const HomePage = () => {
  return (
    <div className="mx-auto">
      <Hero />
      <Features />
      <Experience />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default HomePage;
