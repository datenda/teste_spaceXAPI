"use client";

import { Button } from "@/app/components/ui/button";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function HomePage() {
  return (
    <div className="w-full h-screen overflow-y-auto scroll-smooth snap-y snap-mandatory">
      <div className="relative w-full h-screen snap-start bg-black text-white flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/astronaut.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 px-8 md:px-16 max-w-xl space-y-6">
          <div className="text-4xl md:text-5xl font-bold uppercase">
            Taking Humans to Space
          </div>
          <div className="text-gray-300 text-lg md:text-xl">
            In 2020, SpaceX returned America&apos;s ability to fly NASA
            astronauts...
          </div>
          <Link href="/launches" passHref>
            <Button variant="default" size="lg">
              Read More
            </Button>
          </Link>
        </div>

        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 cursor-pointer">
          <ChevronDown
            className="animate-bounce w-12 h-12 text-white opacity-90"
            onClick={() => {
              const aboutSection = document.getElementById("about-section");
              if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          />
        </div>
      </div>

      <div
        id="about-section"
        className="relative snap-start h-screen px-8 md:px-16 flex flex-col justify-center text-white"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/rocket.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-3xl">
          <div className="text-3xl md:text-4xl font-bold mb-4">
            About This Page
          </div>
          <div className="text-gray-300 text-lg md:text-xl">
            This portal was created to showcase SpaceX&apos;s missions, history,
            and upcoming launches. Explore our site to learn more about
            humanity&apos;s journey to space, the technology behind each
            spacecraft, and the vision for future interplanetary travel.
          </div>
        </div>
      </div>
    </div>
  );
}
