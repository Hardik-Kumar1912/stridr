import { ArrowRightIcon, MapIcon, HeartIcon, FlameIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="relative min-h-screen flex items-center justify-center px-6 bg-background text-foreground overflow-hidden">
      {/* Background Icons */}
      <div className="absolute inset-0 -z-10 opacity-10 pointer-events-none">
        <MapIcon className="absolute top-10 left-10 w-24 h-24 text-primary animate-pulse-slow" />
        <HeartIcon className="absolute bottom-16 right-16 w-28 h-28 text-secondary animate-pulse-slow" />
        <FlameIcon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 text-muted animate-pulse-slow" />
      </div>

      {/* Content */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center py-20">
        {/* Left – Image */}
        <div className="w-full max-w-lg mx-auto">
          <img
            src="/hero.png"
            alt="Strider AI"
            className="w-full h-auto rounded-xl shadow-xl border border-border"
          />
        </div>

        {/* Right – Text and Button */}
        <div className="space-y-8 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight">
            Meet <span className="text-primary">Strider</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
            Discover personalized jogging and walking routes powered by real-time AI insights.
            Whether it’s water stalls, greenery, or your stamina goals — we’ve got you covered.
          </p>
          <Button
            asChild
            size="lg"
            className="px-8 py-6 text-base md:text-lg font-mono"
          >
            <Link href="/create-route">
              Create Route
              <ArrowRightIcon className="ml-2 size-5" />
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
