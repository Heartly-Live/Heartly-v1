import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";

export function Hero() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen text-center px-4 font-montserrat">
      <h1 className="text-6xl md:text-7xl font-medium tracking-tight mb-4 ">
        <span>Talk.</span>{" "}
        <span className="bg-tertiary p-2 rounded">Heal.</span>{" "}
        <span>Grow.</span>
      </h1>
      <p className="text-lg mb-8 font-normal">
        Talk about anything & everything, anonymously.
      </p>
      <Button
        size="lg"
        className="bg-gradient-to-r from-[#FEBF5D] to-[#FFA2C9] text-white py-2 px-4 rounded hover:bg-gradient-to-r hover:from-[#FFA2C9] hover:to-[#FEBF5D] hover:transition-colors duration-300 font-nunito text-lg"
      >
        Start Your Journey
      </Button>
    </div>
  );
}
