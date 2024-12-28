import { Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-6 px-4 bg-gradient-to-b from-pink-50 to-transparent">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <span className="text-sm">Find us on :</span>
            <div className="flex gap-3">
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="w-5 h-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-1 text-sm">
            Made with <span className="text-red-500">❤️</span> in{" "}
            <span>🇮🇳</span>
          </div>
        </div>

        <div className="text-center mt-6 text-sm text-muted-foreground">
          © {new Date().getFullYear()} Heartly. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
