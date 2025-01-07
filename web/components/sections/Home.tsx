import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/Logo.png";
// import Doodle1 from "@/assets/Doodle1.png"; // Add your doodle images here
import Doodle2 from "@/assets/GrowDoodle.png";

interface NavItemProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

function NavItem({ href, children, className }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "text-sm font-semibold text-muted-foreground transition-colors hover:text-primary font-nunito",
        className
      )}
    >
      {children}
    </Link>
  );
}

export function Hero() {
  return (
    <div className="relative flex-col items-center justify-center py-16 mt-16">
      <Image
        src={Doodle2}
        alt="Doodle 2"
        className="hidden md:block absolute bottom-16 right-28 z-0 opacity-70"
      />

      {/* Navbar */}
      <nav className="p-4 w-full z-50 bg-background backdrop-blur-sm fixed top-0 left-0 right-0">
        <div className="container flex h-16 items-center justify-between p-5">
          <Link href="/" className="font-semibold text-xl tracking-tight">
            <div className="flex items-center gap-2">
              <Image src={Logo} alt="Logo" className="w-16 h-16" />
              <div className="flex flex-col justify-center items-center">
                <div className="text-3xl font-nunito">HEARTLY</div>
                <div className="text-xs font-thin">Talk.Heal.Grow</div>
              </div>
            </div>
          </Link>
          <div className="hidden md:flex justify-evenly gap-20">
            <NavItem href="#what">What</NavItem>
            <NavItem href="#why">Why</NavItem>
            <NavItem href="#how">How</NavItem>
          </div>
          <div></div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-4 font-montserrat py-20 mx-auto relative z-10">
        <h1 className="text-6xl md:text-7xl font-medium tracking-tight mb-4 flex flex-col md:flex-row justify-center items-center gap-3">
          <div>Talk.</div>
          <div className="bg-tertiary p-2 rounded">Heal.</div>
          <div>Grow.</div>
        </h1>
        <p className="text-lg mb-8 font-normal">
          Talk about anything & everything, anonymously.
        </p>
        {/* <Link href="/app">
          <Button
            size="lg"
            className="bg-gradient-to-r from-[#FEBF5D] to-[#FFA2C9] text-white py-2 px-4 rounded hover:bg-gradient-to-r hover:from-[#FFA2C9] hover:to-[#FEBF5D] hover:transition-colors duration-300 font-nunito text-lg"
          >
            Start Your Journey
          </Button>
        </Link> */}
        <Link href="/coming-soon">
          {" "}
          {/* // Changed from "/app" to "/coming-soon" */}
          <Button
            size="lg"
            className="bg-gradient-to-r from-[#FEBF5D] to-[#FFA2C9] text-white py-2 px-4 rounded hover:bg-gradient-to-r hover:from-[#FFA2C9] hover:to-[#FEBF5D] hover:transition-colors duration-300 font-nunito text-lg"
          >
            Start Your Journey
          </Button>
        </Link>
      </section>
    </div>
  );
}
