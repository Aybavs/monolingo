import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SplitText from "@/components/CoolText";

export default function Home() {
  return (
    <div className="min-h-screen bg-muted flex flex-col overflow-y-hidden">
      <main className="flex-grow container mx-auto px-4 py-20 overflow-y-hidden">
        {/* Hero Section */}
        <div className="text-center">
          <SplitText
            text="Welcome to the MONOLINGO!"
            className="text-5xl z-50 md:text-6xl font-bold text-center"
            delay={100}
            animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
            animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
            easing="easeOutCubic"
            threshold={0.2}
            rootMargin="-50px"
          />
          <p className="text-lg md:text-xl text-muted-foreground mt-8 mb-8">
            Your journey to mastering languages begins here
          </p>
          <Link href="/auth/login">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 hover:shadow-lg">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-card/50 p-6 rounded-xl hover:bg-card/70 transition-all hover:shadow-xl backdrop-blur-md border border-border">
            <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 transform transition-all hover:rotate-[360deg] duration-300">
              <Image src="/globe.svg" alt="Learn" width={24} height={24} />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2 hover:text-primary transition-colors">
              Learn Anywhere
            </h3>
            <p className="text-muted-foreground">
              Access your lessons from any device, anytime
            </p>
          </div>

          <div className="bg-card/50 p-6 rounded-xl hover:bg-card/70 transition-all hover:shadow-xl backdrop-blur-md border border-border">
            <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 transform transition-all hover:rotate-[360deg] duration-300">
              <Image src="/window.svg" alt="Practice" width={24} height={24} />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2 hover:text-primary transition-colors">
              Interactive Practice
            </h3>
            <p className="text-muted-foreground">
              Engage with fun and effective exercises
            </p>
          </div>

          <div className="bg-card/50 p-6 rounded-xl hover:bg-card/70 transition-all hover:shadow-xl backdrop-blur-md border border-border">
            <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 transform transition-all hover:rotate-[360deg] duration-300">
              <Image src="/globe.svg" alt="Track" width={24} height={24} />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              Track Progress
            </h3>
            <p className="text-muted-foreground">
              Monitor your learning journey
            </p>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-4">
              <h3 className="text-4xl font-bold text-emerald-400">50+</h3>
              <p className="text-slate-300">Languages</p>
            </div>
            <div className="p-4">
              <h3 className="text-4xl font-bold text-blue-400">1M+</h3>
              <p className="text-slate-300">Active Users</p>
            </div>
            <div className="p-4">
              <h3 className="text-4xl font-bold text-purple-400">10K+</h3>
              <p className="text-slate-300">Lessons</p>
            </div>
            <div className="p-4">
              <h3 className="text-4xl font-bold text-pink-400">4.8/5</h3>
              <p className="text-slate-300">User Rating</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-5">
        <div className="container mx-auto px-4 text-center text-slate-400">
          <p>© 2024 Monolingo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
