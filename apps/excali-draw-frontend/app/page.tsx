"use client";

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Pencil, Share2, Users2, Sparkles, Github, Download } from "lucide-react";
import Link from "next/link";

function App() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <header className="relative  overflow-hidden">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-[var(--foreground)]">
              Collaborative Whiteboarding
              <span className="text-[var(--primary)] block">Made Simple</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--muted-foreground)]">
              Create, collaborate, and share beautiful diagrams and sketches with our intuitive drawing tool.
              No sign-up required.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/signin">
                <Button variant="primary" size="lg">
                  Sign in <Pencil className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="outline" size="lg">
                  Sign up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-24 ">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="p-6 border hover:border-[var(--primary)] transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-[var(--primary)]/10">
                  <Share2 className="h-6 w-6 text-[var(--primary)]" />
                </div>
                <h3 className="text-xl font-semibold">Real-time Collaboration</h3>
              </div>
              <p className="mt-4 text-[var(--muted-foreground)]">
                Work together with your team in real-time. Share your drawings instantly with a simple link.
              </p>
            </Card>

            <Card className="p-6 border-1 hover:border-[var(--primary)] transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-[var(--primary)]/10">
                  <Users2 className="h-6 w-6 text-[var(--primary)]" />
                </div>
                <h3 className="text-xl font-semibold">Multiplayer Editing</h3>
              </div>
              <p className="mt-4 text-[var(--muted-foreground)]">
                Multiple users can edit the same canvas simultaneously. See who's drawing what in real-time.
              </p>
            </Card>

            <Card className="p-6 border-1 hover:border-[var(--primary)] transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-[var(--primary)]/10">
                  <Sparkles className="h-6 w-6 text-[var(--primary)]" />
                </div>
                <h3 className="text-xl font-semibold">Smart Drawing</h3>
              </div>
              <p className="mt-4 text-[var(--muted-foreground)]">
                Intelligent shape recognition and drawing assistance helps you create perfect diagrams.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl p-8 sm:p-16 text-center bg-[var(--primary)] text-[var(--primary-foreground)]">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to start creating?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-[var(--primary-foreground)/80]">
              Join thousands of users who are already creating amazing diagrams and sketches.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" variant="secondary">
                Open Canvas <Pencil className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-transparent text-[var(--primary-foreground)] border-[var(--primary-foreground)] hover:bg-[var(--primary-foreground)] hover:text-[var(--primary)]"
              >
                View Gallery
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)]">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <p className="text-sm text-[var(--muted-foreground)]">
              © 2024 Excalidraw Clone. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="https://github.com" className="text-[var(--muted-foreground)] hover:text-[var(--primary)]">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-[var(--muted-foreground)] hover:text-[var(--primary)]">
                <Download className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
