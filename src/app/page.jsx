"use client";

import { ArrowRightIcon, MapIcon, HeartIcon, FlameIcon } from "lucide-react";
import { SignInButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Home() {
  const routes = [
    {
      title: "Morning Park Loop",
      description: "Perfect 3km jog with tree-lined paths and water stalls.",
      image: "/sun.png",
    },
    {
      title: "Sunset Riverside Run",
      description:
        "5km flat route along the river, great for stamina building.",
      image: "/river.png",
    },
    {
      title: "Cafe Circuit",
      description: "Ideal walking route with coffee breaks and chill vibes.",
      image: "/cafe3.png",
    },
    {
      title: "Green Trail Sprint",
      description:
        "Fast-paced track with 2.5km lap distance, minimal foot traffic.",
      image: "/green.png",
    },
    {
      title: "City Lights Walk",
      description:
        "Night-friendly route with street lighting and easy terrain.",
      image: "/street.png",
    },
  ];

  const { user } = useUser();

  return (
    <>
      <main className="relative pt-20 flex items-center justify-center px-6 bg-background text-foreground overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-10 pointer-events-none">
          <MapIcon className="absolute top-10 left-10 w-24 h-24 text-primary animate-pulse-slow" />
          <HeartIcon className="absolute bottom-16 right-16 w-28 h-28 text-secondary animate-pulse-slow" />
          <FlameIcon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 text-muted animate-pulse-slow" />
        </div>

        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center py-12">
          <div className="w-full max-w-[600px]">
            <img
              src="/hero.png"
              alt="Strider AI"
              className="w-full h-auto rounded-xl shadow-xl border border-border cursor-default select-none"
            />
          </div>

          {/* Right – Text and Button */}
          <div className="space-y-8 text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight">
              Meet <span className="text-primary">Strider</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto md:mx-0">
              Discover personalized jogging and walking routes powered by
              real-time AI insights. Whether it’s water stalls, greenery, or
              your stamina goals — we’ve got you covered.
            </p>
            {user ? (
              <Button
                size="lg"
                className="px-8 py-6 text-base md:text-lg font-mono"
              >
                <Link href="/route">Create Route</Link>
                <ArrowRightIcon className="ml-2 size-5" />
              </Button>
            ) : (
              <SignInButton mode="modal">
                <Button
                  size="lg"
                  className="px-8 py-6 text-base md:text-lg font-mono"
                >
                  Create Route
                  <ArrowRightIcon className="ml-2 size-5" />
                </Button>
              </SignInButton>
            )}
          </div>
        </div>
      </main>

      {/* CAROUSEL SECTION */}
      <section className="pt-10 pb-20 px-6 bg-background">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Popular Routes
          </h2>
          <p className="text-muted-foreground mt-2 text-sm md:text-base">
            Handpicked routes based on safety, scenery, and stamina level
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <Carousel className="relative">
            <CarouselContent>
              {routes.map((route, index) => (
                <CarouselItem
                  key={index}
                  className="md:basis-1/2 lg:basis-1/3 p-4"
                >
                  <div className="h-full bg-background border rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden">
                    <img
                      src={route.image}
                      alt={route.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6 space-y-2">
                      <h3 className="text-xl font-semibold text-primary">
                        {route.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {route.description}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2 z-10" />
            <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2 z-10" />
          </Carousel>
        </div>
      </section>
    </>
  );
}
