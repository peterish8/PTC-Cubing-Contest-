"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InteractiveCube } from "./interactive-cube";
import {
  Trophy,
  Users,
  Brain,
  Heart,
  Star,
  ArrowRight,
  Timer,
  Target,
  Zap,
  Award,
  Shield,
  Sparkles,
  Menu,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import styled from "styled-components";
import React from "react";
import { Particles } from "@/components/magicui/particles";

interface LandingPageProps {
  // onEnterPortal: () => void; // Removed as per edit hint
}

export function LandingPage({}: LandingPageProps) {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const benefits = [
    {
      icon: Heart,
      title: "Confidence Building",
      description:
        "Help your child overcome fears and build self-confidence through structured competition experience.",
    },

    {
      icon: Users,
      title: "Social Skills",
      description:
        "Connect with like-minded peers and build lasting friendships in a supportive community environment.",
    },
    {
      icon: Zap,
      title: "Stress Management",
      description:
        "Learn to handle pressure and perform under competition conditions with grace and composure.",
    },
    {
      icon: Trophy,
      title: "Achievement Recognition",
      description:
        "Celebrate progress and achievements with proper recognition and rewards for dedication.",
    },
  ];

  const teamMembers = [
    {
      name: "Prathick Dhanes R",
      role: "Founder & Head Organizer",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Akshwathha R",
      role: "Competition Director",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Pranith V",
      role: "Technical Coordinator",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Sarva",
      role: "Community Manager",
      image: "/placeholder.svg?height=200&width=200",
    },
  ];

  const achievements = [
    { number: "100+", label: "Participants", icon: Users },
    { number: "10+", label: "States", icon: Award },
    { number: "₹5000+", label: "Prize Pool", icon: Trophy },
  ];

  return (
    <div className="min-h-screen bg-[#0D0D0D] overflow-x-hidden relative">
      <Particles
        className="absolute inset-0 z-0"
        quantity={800}
        color="#ffffff"
      />
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#101A40]/90 backdrop-blur-md border-b border-[#1520A6]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6">
                <InteractiveCube size={24} mode="auto" />
              </div>
              <span className="text-xl font-bold text-[#FFFFFF]">
                PTC <span className="text-[#D4AF37]">Season 2</span>
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#about"
                className="text-[#FFFFFF] hover:text-[#D4AF37] transition-colors duration-300"
              >
                About
              </a>
              <a
                href="#benefits"
                className="text-[#FFFFFF] hover:text-[#D4AF37] transition-colors duration-300"
              >
                Benefits
              </a>
              <a
                href="#team"
                className="text-[#FFFFFF] hover:text-[#D4AF37] transition-colors duration-300"
              >
                Team
              </a>
              <Button
                variant="outline"
                size="sm"
                className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0D0D0D] bg-transparent px-5 py-2 text-base backdrop-blur-sm transition-all duration-300"
                onClick={() => {
                  document
                    .getElementById("register")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Register Now!!
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-[#FFFFFF]"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-[#101A40] border-t border-[#1520A6]/20">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a
                  href="#about"
                  className="block px-3 py-2 text-[#FFFFFF] hover:text-[#D4AF37] transition-colors duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </a>
                <a
                  href="#benefits"
                  className="block px-3 py-2 text-[#FFFFFF] hover:text-[#D4AF37] transition-colors duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Benefits
                </a>
                <a
                  href="#team"
                  className="block px-3 py-2 text-[#FFFFFF] hover:text-[#D4AF37] transition-colors duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Team
                </a>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0D0D0D] bg-transparent px-5 py-2 text-base backdrop-blur-sm transition-all duration-300"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    document
                      .getElementById("register")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Register Now!!
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Enhanced background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#1520A6]/10 rounded-full blur-3xl animate-pulse"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        ></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl animate-pulse delay-1000"
          style={{ transform: `translateY(${-scrollY * 0.15}px)` }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#0A1340]/10 rounded-full blur-3xl animate-pulse delay-500"
          style={{
            transform: `translate(-50%, -50%) translateY(${scrollY * 0.05}px)`,
          }}
        ></div>
      </div>

      {/* Decorative floating cubes */}
      <div className="fixed top-32 left-5 z-10 opacity-20 hidden lg:block w-6 h-6">
        <InteractiveCube size={24} mode="auto" />
      </div>
      <div className="fixed top-1/3 right-5 z-10 opacity-15 hidden lg:block w-6 h-6">
        <InteractiveCube size={24} mode="auto" />
      </div>
      <div className="fixed bottom-1/4 left-10 z-10 opacity-25 hidden lg:block w-6 h-6">
        <InteractiveCube size={24} mode="auto" />
      </div>

      <div className="relative z-10 pt-16">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 relative">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left side - Content */}
              <div className="space-y-8 text-center lg:text-left">
                <div className="space-y-6">
                  <Badge className="bg-gradient-to-r from-[#1520A6] to-[#0A1340] text-[#FFFFFF] px-6 py-3 text-base font-medium hover:scale-105 transition-transform duration-300">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Season 2 • Registration Open
                  </Badge>

                  <div className="space-y-4">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#FFFFFF] leading-tight">
                      Prathick The{" "}
                      <span className="bg-gradient-to-r from-[#D4AF37] to-[#1520A6] bg-clip-text text-transparent">
                        Cube.R
                      </span>
                    </h1>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#D4AF37]">
                      Cubing Contest Season 2
                    </h2>
                    <p className="text-lg sm:text-xl text-[#FFFFFF]/80 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                      Unlock your child's potential through the art of cubing.
                      Join our premier competition designed to build confidence,
                      enhance cognitive abilities, and create lasting memories.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  {/* Replacing Quick Register Button with Animated PTC Button */}
                  <PTCRegisterButton />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-8">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="text-center group">
                      <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#D4AF37] group-hover:scale-110 transition-transform duration-300">
                        {achievement.number}
                      </div>
                      <div className="text-[#FFFFFF]/60 text-sm sm:text-base mt-1">
                        {achievement.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right side - Hero Enhanced Cube */}
              <div className="flex justify-center lg:justify-end">
                <div className="relative w-[250px] h-[250px] mx-auto mt-32 sm:mt-0">
                  <InteractiveCube size={250} mode="interactive" />
                </div>
              </div>
            </div>
          </div>

          {/* Floating cubes on sides for larger screens */}
          <div className="absolute left-10 top-1/2 transform -translate-y-1/2 opacity-20 hidden xl:block w-6 h-6">
            <InteractiveCube size={24} mode="auto" />
          </div>
          <div className="absolute right-10 top-1/3 transform -translate-y-1/2 opacity-20 hidden xl:block w-6 h-6">
            <InteractiveCube size={24} mode="auto" />
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="pt-20 sm:pt-32 pb-8 sm:pb-12 px-4 relative"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 sm:mb-20">
              <Badge className="bg-[#101A40] text-[#D4AF37] border-[#D4AF37]/30 mb-6">
                <Shield className="w-4 h-4 mr-2" />
                Why Choose PTC
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFFFFF] mb-6">
                Transform Your Child's Future
              </h2>
              <p className="text-lg sm:text-xl text-[#FFFFFF]/80 max-w-3xl mx-auto leading-relaxed">
                More than just a cubing contest - we're building the next
                generation of confident, analytical thinkers who can tackle any
                challenge life throws at them.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16">
              {benefits.map((benefit, index) => (
                <Card
                  key={index}
                  className="bg-[#101A40]/80 backdrop-blur-xl border-[#1520A6]/30 hover:border-[#D4AF37]/50 transition-all duration-500 group hover:scale-105 hover:shadow-2xl"
                >
                  <CardHeader>
                    <div className="w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-br from-[#1520A6] to-[#0A1340] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <benefit.icon className="w-6 sm:w-7 h-6 sm:h-7 text-[#FFFFFF]" />
                    </div>
                    <CardTitle className="text-[#FFFFFF] text-lg sm:text-xl group-hover:text-[#D4AF37] transition-colors duration-300">
                      {benefit.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-[#FFFFFF]/70 leading-relaxed text-sm sm:text-base">
                      {benefit.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Previous Season Section Header */}
        <div className="text-center mt-0 mb-4">
          <Badge className="bg-[#101A40] text-[#D4AF37] border-[#D4AF37]/30 mb-2">
            <Trophy className="w-4 h-4 mr-2" />
            Previous Season
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFFFFF] mb-2">
            Previous Season (2020)
          </h2>
          <div className="mb-16"></div>
        </div>
        {/* 2. Season 1: A Huge Success Box with Video and Badges */}
        <section className="pt-0 pb-8 mb-12 px-4 flex justify-center mt-16">
          <div className="w-full max-w-5xl bg-[#181C2A]/80 rounded-2xl shadow-xl border border-[#D4AF37]/20 p-8 flex flex-col lg:flex-row gap-12 items-center backdrop-blur-xl">
            <div className="w-full lg:w-1/2 flex-shrink-0 mb-6 lg:mb-0 flex justify-center">
              <div className="rounded-xl overflow-hidden shadow-lg border border-[#D4AF37]/30 aspect-video max-w-[520px] w-full">
                <iframe
                  width="60%"
                  height="50%"
                  src="https://www.youtube.com/embed/2_j0rJyoN28"
                  title="Award Ceremony - Season 1"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-4 justify-center w-full">
              <div className="flex flex-col items-center justify-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="text-[#D4AF37] text-2xl font-extrabold tracking-wide drop-shadow-lg">
                    Season 1 Champions (2020)
                  </span>
                </div>
                <div className="flex items-end justify-center gap-12 mt-0">
                  {/* Second Place */}
                  <div className="flex flex-col items-center">
                    <div className="bg-[#C0C0C0] w-20 h-20 rounded-full flex items-center justify-center text-white font-extrabold text-3xl shadow-lg border-4 border-[#C0C0C0]/60">
                      2
                    </div>
                    <div className="mt-2 text-lg text-[#C0C0C0] font-bold">
                      Vanshraj
                    </div>
                  </div>
                  {/* First Place */}
                  <div className="flex flex-col items-center z-10">
                    <div className="bg-[#D4AF37] w-24 h-24 rounded-full flex items-center justify-center text-white font-extrabold text-4xl shadow-2xl border-4 border-[#D4AF37]/80 scale-110">
                      1
                    </div>
                    <div className="mt-2 text-xl text-[#D4AF37] font-extrabold drop-shadow">
                      Kunal Oak
                    </div>
                  </div>
                  {/* Third Place */}
                  <div className="flex flex-col items-center">
                    <div className="bg-[#CD7F32] w-16 h-16 rounded-full flex items-center justify-center text-white font-extrabold text-2xl shadow-lg border-4 border-[#CD7F32]/60">
                      3
                    </div>
                    <div className="mt-2 text-lg text-[#CD7F32] font-bold">
                      Prathmesh
                    </div>
                  </div>
                </div>
                {/* Optional: Podium base effect */}
                <div className="flex justify-center items-end gap-12 mt-4">
                  <div className="w-20 h-6 bg-[#C0C0C0]/60 rounded-t-lg"></div>
                  <div className="w-24 h-8 bg-[#D4AF37]/80 rounded-t-lg scale-110"></div>
                  <div className="w-16 h-4 bg-[#CD7F32]/60 rounded-t-lg"></div>
                </div>
              </div>
              <div className="text-[#D4AF37] text-xl font-bold mb-1"></div>
              <div className="text-[#FFFFFF]/80 text-base mb-2">
                50+ Participants • 20+ Prizes • 1 Epic Finale
              </div>
              <div className="flex flex-wrap gap-3 mb-2">
                <a
                  href="https://www.instagram.com/p/CFZq6yxJ9-N/?utm_source=ig_web_copy_link&igsh=MTJ3azFkcW1xcnNoZA=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#101A40]/80 border border-[#D4AF37]/30 rounded-full px-4 py-2 text-[#D4AF37] hover:bg-[#1520A6]/80 transition"
                >
                  Previous Comp Poster
                </a>
                <a
                  href="https://www.instagram.com/p/CMgzFQDJ6N1/?utm_source=ig_web_copy_link&igsh=MTA5ZWtwaGFnOWE2Yw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#101A40]/80 border border-[#D4AF37]/30 rounded-full px-4 py-2 text-[#D4AF37] hover:bg-[#1520A6]/80 transition"
                >
                  Cubeography Comp
                </a>
                <a
                  href="https://www.instagram.com/p/CPmyKpFpaPa/?utm_source=ig_web_copy_link&igsh=NmllaG96Y3lrNXl0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#101A40]/80 border border-[#D4AF37]/30 rounded-full px-4 py-2 text-[#D4AF37] hover:bg-[#1520A6]/80 transition"
                >
                  Giveaways
                </a>
                <a
                  href="https://www.instagram.com/reel/Cze-oyUyqK5/?utm_source=ig_web_copy_link&igsh=cG9weDZxOGlybDFt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#101A40]/80 border border-[#D4AF37]/30 rounded-full px-4 py-2 text-[#D4AF37] hover:bg-[#1520A6]/80 transition"
                >
                  Top 100 rank in pyra
                </a>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <a
                  href="https://www.worldcubeassociation.org/persons/2022RPRA01"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <img
                    src="/images/prathick wca.jpg"
                    alt="Prathick Dhanes R"
                    className="w-10 h-10 rounded-full border-2 border-[#D4AF37]"
                  />
                  <span className="text-[#D4AF37] font-semibold whitespace-nowrap mr-3">
                    Prathick Dhanes R
                  </span>
                </a>
                <span className="text-[#FFFFFF]/70 text-sm">
                  WCA Competitor,
                  <br />
                  Founder & Organizer
                </span>
              </div>
            </div>
          </div>
        </section>
        {/* 3. Why Your Child Needs This Section (unchanged) */}
        <section
          id="benefits"
          className="py-20 sm:py-32 px-4 bg-[#101A40]/20 relative"
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-center">
              {/* Left side - Enhanced Cube */}
              <div className="flex justify-center lg:justify-start order-2 lg:order-1">
                <div className="relative w-[250px] h-[250px] mx-auto">
                  <InteractiveCube size={250} mode="interactive" />
                </div>
              </div>

              {/* Right side - Content */}
              <div className="space-y-8 order-1 lg:order-2">
                <div className="text-center lg:text-left">
                  <Badge className="bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/30 mb-6">
                    <Heart className="w-4 h-4 mr-2" />
                    For Parents
                  </Badge>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFFFFF] mb-8">
                    Why Your Child Needs This
                  </h2>
                </div>

                <div className="space-y-6 sm:space-y-8">
                  <div className="space-y-4 group hover:scale-105 transition-transform duration-300">
                    <h3 className="text-xl sm:text-2xl font-semibold text-[#D4AF37] flex items-center">
                      <Brain className="w-5 sm:w-6 h-5 sm:h-6 mr-3" />
                      Overcome Mental Barriers
                    </h3>
                    <p className="text-[#FFFFFF]/80 text-base sm:text-lg leading-relaxed">
                      Help your child break through fear and self-doubt. Our
                      structured approach builds mental resilience and teaches
                      them that challenges are opportunities for growth.
                    </p>
                  </div>

                  <div className="space-y-4 group hover:scale-105 transition-transform duration-300">
                    <h3 className="text-xl sm:text-2xl font-semibold text-[#1520A6] flex items-center">
                      <Trophy className="w-5 sm:w-6 h-5 sm:h-6 mr-3" />
                      Competition Readiness
                    </h3>
                    <p className="text-[#FFFFFF]/80 text-base sm:text-lg leading-relaxed">
                      Prepare your child for life's competitions - from
                      academics to career. Learn to perform under pressure,
                      handle setbacks gracefully, and celebrate victories
                      humbly.
                    </p>
                  </div>

                  <div className="space-y-4 group hover:scale-105 transition-transform duration-300">
                    <h3 className="text-xl sm:text-2xl font-semibold text-[#D4AF37] flex items-center">
                      <Users className="w-5 sm:w-6 h-5 sm:h-6 mr-3" />
                      Life Skills Development
                    </h3>
                    <p className="text-[#FFFFFF]/80 text-base sm:text-lg leading-relaxed">
                      Beyond cubing, we teach time management, goal setting,
                      perseverance, and social interaction - skills that will
                      benefit them throughout their lives.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="py-20 sm:py-32 px-4 relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 sm:mb-20">
              <Badge className="bg-[#101A40] text-[#1520A6] border-[#1520A6]/30 mb-6">
                <Users className="w-4 h-4 mr-2" />
                Our Team
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFFFFF] mb-6">
                Meet Our Experts
              </h2>
              <p className="text-lg sm:text-xl text-[#FFFFFF]/80 max-w-3xl mx-auto leading-relaxed">
                Passionate educators and cubing enthusiasts dedicated to
                nurturing young talent and creating unforgettable experiences.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {teamMembers.map((member, index) => (
                <Card
                  key={index}
                  className="bg-[#101A40]/80 backdrop-blur-xl border-[#1520A6]/30 text-center hover:border-[#D4AF37]/50 transition-all duration-500 group hover:scale-105 hover:shadow-2xl"
                >
                  <CardHeader className="pb-4">
                    <div className="w-28 sm:w-36 h-28 sm:h-36 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-br from-[#101A40] to-[#0A1340] flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-300 border-4 border-[#1520A6] group-hover:border-[#D4AF37]">
                      <img
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardTitle className="text-[#FFFFFF] text-lg sm:text-xl group-hover:text-[#D4AF37] transition-colors duration-300">
                      {member.name}
                    </CardTitle>
                    <CardDescription className="text-[#FFFFFF]/70 text-sm sm:text-base">
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="register" className="py-20 sm:py-32 px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="bg-gradient-to-br from-[#181C2A] to-[#101A40] border border-[#D4AF37]/40 shadow-none backdrop-blur-xl transition-all duration-500 hover:scale-105">
              {/* Gold glow effect */}
              <div className="pointer-events-none absolute -inset-4 rounded-2xl bg-[radial-gradient(ellipse_at_top,_rgba(21,32,166,0.18)_0%,_transparent_70%)] blur-2xl z-0"></div>
              <CardHeader className="space-y-6 sm:space-y-8 pb-6 sm:pb-8">
                <div className="relative w-[250px] h-[250px] mx-auto flex items-center justify-center">
                  <InteractiveCube size={120} mode="interactive" />
                </div>
                <div>
                  <Badge className="bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/30 mb-6">
                    <Star className="w-4 h-4 mr-2" />
                    Ready to Start?
                  </Badge>
                  <CardTitle className="text-2xl sm:text-3xl lg:text-4xl text-[#FFFFFF] mb-6">
                    Begin Your Cubing Journey
                  </CardTitle>
                  <CardDescription className="text-[#FFFFFF]/80 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
                    Join hundreds of young cubers who have already transformed
                    their confidence and skills. Your child's cubing adventure
                    starts here.
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 sm:space-y-8 pb-8 sm:pb-12">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-[#1520A6] to-[#0D0D0D] border-2 border-[#D4AF37] text-white font-semibold px-5 sm:px-6 py-3 sm:py-4 text-lg sm:text-xl rounded-full shadow-md hover:shadow-[0_0_16px_2px_rgba(212,175,55,0.18)] hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <a
                    href="https://prathick-resume.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    {/* Custom checkmark-in-circle SVG icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#D4AF37"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-circle-check w-5 h-5"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                    Register via Google Form
                  </a>
                </Button>
                {/* Subtle note below the button */}
                <p className="mt-3 text-sm text-[#D4AF37] text-center font-medium opacity-80">
                  If you have previously registered, re-registration is not
                  required!
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-sm sm:text-base text-[#FFFFFF]/60">
                  <div className="flex items-center gap-3 hover:text-[#D4AF37] transition-colors duration-300">
                    <Timer className="w-4 sm:w-5 h-4 sm:h-5" />
                    Quick Registration
                  </div>
                  <div className="flex items-center gap-3 hover:text-[#1520A6] transition-colors duration-300">
                    <Star className="w-4 sm:w-5 h-4 sm:h-5" />
                    Instant Access
                  </div>
                  <div className="flex items-center gap-3 hover:text-[#D4AF37] transition-colors duration-300">
                    <Trophy className="w-4 sm:w-5 h-4 sm:h-5" />
                    Exciting Prizes
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 sm:py-16 px-4 border-t border-[#1520A6]/20 bg-[#101A40]/30 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto text-center">
            <div className="text-center mb-6">
              <span className="text-xl sm:text-2xl font-bold text-[#FFFFFF]">
                Prathick The <span className="text-[#D4AF37]">Cube.R</span>
              </span>
            </div>
            <p className="text-[#FFFFFF]/70 mb-6 text-base sm:text-lg">
              Empowering young minds through the art of cubing • Season 2
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-6">
              <Badge
                variant="outline"
                className="border-[#1520A6] text-[#1520A6]"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Premium Competition
              </Badge>
              <Badge
                variant="outline"
                className="border-[#D4AF37] text-[#D4AF37]"
              >
                <Shield className="w-4 h-4 mr-2" />
                Safe Environment
              </Badge>
              <Badge
                variant="outline"
                className="border-[#1520A6] text-[#1520A6]"
              >
                <Award className="w-4 h-4 mr-2" />
                Certified Organizers
              </Badge>
            </div>
            <p className="text-[#FFFFFF]/50 text-sm">
              © 2025 Prathick The Cube.R. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

const PTCRegisterButton = () => {
  const handleClick = () => {
    document.getElementById("register")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <StyledWrapper>
      <button className="button" onClick={handleClick}>
        <div className="bg" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 342 208"
          height={208}
          width={342}
          className="splash"
        >
          <path
            strokeLinecap="round"
            strokeWidth={3}
            d="M54.1054 99.7837C54.1054 99.7837 40.0984 90.7874 26.6893 97.6362C13.2802 104.485 1.5 97.6362 1.5 97.6362"
          />
          <path
            strokeLinecap="round"
            strokeWidth={3}
            d="M285.273 99.7841C285.273 99.7841 299.28 90.7879 312.689 97.6367C326.098 104.486 340.105 95.4893 340.105 95.4893"
          />
          <path
            strokeLinecap="round"
            strokeWidth={3}
            strokeOpacity="0.3"
            d="M281.133 64.9917C281.133 64.9917 287.96 49.8089 302.934 48.2295C317.908 46.6501 319.712 36.5272 319.712 36.5272"
          />
          <path
            strokeLinecap="round"
            strokeWidth={3}
            strokeOpacity="0.3"
            d="M281.133 138.984C281.133 138.984 287.96 154.167 302.934 155.746C317.908 157.326 319.712 167.449 319.712 167.449"
          />
          <path
            strokeLinecap="round"
            strokeWidth={3}
            d="M230.578 57.4476C230.578 57.4476 225.785 41.5051 236.061 30.4998C246.337 19.4945 244.686 12.9998 244.686 12.9998"
          />
          <path
            strokeLinecap="round"
            strokeWidth={3}
            d="M230.578 150.528C230.578 150.528 225.785 166.471 236.061 177.476C246.337 188.481 244.686 194.976 244.686 194.976"
          />
          <path
            strokeLinecap="round"
            strokeWidth={3}
            strokeOpacity="0.3"
            d="M170.392 57.0278C170.392 57.0278 173.89 42.1322 169.571 29.54C165.252 16.9478 168.751 2.05227 168.751 2.05227"
          />
          <path
            strokeLinecap="round"
            strokeWidth={3}
            strokeOpacity="0.3"
            d="M170.392 150.948C170.392 150.948 173.89 165.844 169.571 178.436C165.252 191.028 168.751 205.924 168.751 205.924"
          />
          <path
            strokeLinecap="round"
            strokeWidth={3}
            d="M112.609 57.4476C112.609 57.4476 117.401 41.5051 107.125 30.4998C96.8492 19.4945 98.5 12.9998 98.5 12.9998"
          />
          <path
            strokeLinecap="round"
            strokeWidth={3}
            d="M112.609 150.528C112.609 150.528 117.401 166.471 107.125 177.476C96.8492 188.481 98.5 194.976 98.5 194.976"
          />
          <path
            strokeLinecap="round"
            strokeWidth={3}
            strokeOpacity="0.3"
            d="M62.2941 64.9917C62.2941 64.9917 55.4671 49.8089 40.4932 48.2295C25.5194 46.6501 23.7159 36.5272 23.7159 36.5272"
          />
          <path
            strokeLinecap="round"
            strokeWidth={3}
            strokeOpacity="0.3"
            d="M62.2941 145.984C62.2941 145.984 55.4671 161.167 40.4932 162.746C25.5194 164.326 23.7159 174.449 23.7159 174.449"
          />
        </svg>
        <div className="wrap">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 221 42"
            height={42}
            width={221}
            className="path"
          >
            <path
              strokeLinecap="round"
              strokeWidth={3}
              d="M182.674 2H203C211.837 2 219 9.16344 219 18V24C219 32.8366 211.837 40 203 40H18C9.16345 40 2 32.8366 2 24V18C2 9.16344 9.16344 2 18 2H47.8855"
            />
          </svg>
          <div className="outline" />
          <div className="content">
            <span className="quick-register-text">Quick Register</span>
            <div className="icon" style={{ marginLeft: "0" }}>
              <div />
            </div>
          </div>
        </div>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .button {
    --white: #fff;
    --ptc-gold: #d4af37;
    --ptc-blue: #1520a6;
    --ptc-blue-dark: #101a40;
    --ptc-blue-deep: #0a1340;
    --radius: 18px;
    border-radius: var(--radius);
    outline: none;
    cursor: pointer;
    font-size: 23px;
    font-family: Arial;
    background: transparent;
    letter-spacing: -1px;
    border: 0;
    position: relative;
    width: 300px;
    height: 80px;
    /* No tilt/skew/rotation */
  }
  .bg {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    filter: blur(1px);
  }
  .bg::before,
  .bg::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: calc(var(--radius) * 1.1);
    background: linear-gradient(
      135deg,
      var(--ptc-blue) 0%,
      var(--ptc-blue-dark) 60%,
      var(--ptc-gold) 100%
    );
  }
  .bg::before {
    filter: blur(5px);
    transition: all 0.3s ease;
    box-shadow: -7px 6px 0 0 rgb(21 32 166 / 40%),
      -14px 12px 0 0 rgb(21 32 166 / 30%), -21px 18px 4px 0 rgb(21 32 166 / 25%),
      -28px 24px 8px 0 rgb(21 32 166 / 15%),
      -35px 30px 12px 0 rgb(21 32 166 / 12%),
      -42px 36px 16px 0 rgb(21 32 166 / 8%),
      -56px 42px 20px 0 rgb(21 32 166 / 5%);
  }
  .wrap {
    border-radius: inherit;
    overflow: hidden;
    height: 100%;
    transform: translate(6px, -6px);
    padding: 3px;
    background: linear-gradient(
      to bottom,
      var(--ptc-gold) 0%,
      var(--ptc-blue) 100%
    );
    position: relative;
    transition: all 0.3s ease;
  }
  .outline {
    position: absolute;
    overflow: hidden;
    inset: 0;
    opacity: 0;
    outline: none;
    border-radius: inherit;
    transition: all 0.4s ease;
  }
  .outline::before {
    content: "";
    position: absolute;
    inset: 2px;
    width: 120px;
    height: 300px;
    margin: auto;
    background: linear-gradient(
      to right,
      transparent 0%,
      white 50%,
      transparent 100%
    );
    animation: spin 3s linear infinite;
    animation-play-state: paused;
  }
  .content {
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    position: relative;
    height: 100%;
    gap: 16px;
    border-radius: calc(var(--radius) * 0.85);
    font-weight: 700;
    transition: all 0.3s ease;
    background: linear-gradient(
      to bottom,
      var(--ptc-blue) 0%,
      var(--ptc-blue-dark) 100%
    );
    box-shadow: inset -2px 12px 11px -5px var(--ptc-gold),
      inset 1px -3px 11px 0px rgb(0 0 0 / 35%);
    padding-right: 32px;
  }
  .quick-register-text {
    color: #fff;
    font-size: 1.5rem;
    font-weight: 700;
    text-align: center;
    width: 100%;
    letter-spacing: 0.01em;
    z-index: 2;
    position: relative;
    text-shadow: 0 2px 8px #000, 0 0 2px #fff;
    margin-right: 12px;
  }
  .icon {
    margin-left: 0;
  }
  .icon div,
  .icon div::before,
  .icon div::after {
    height: 3px;
    border-radius: 1px;
    background-color: var(--ptc-gold);
  }
  .icon div::before,
  .icon div::after {
    content: "";
    position: absolute;
    right: 0;
    transform-origin: center right;
    width: 14px;
    border-radius: 15px;
    transition: all 0.3s ease;
  }
  .icon div {
    position: relative;
    width: 24px;
    box-shadow: -2px 2px 5px var(--ptc-blue);
    transform: scale(0.9);
    background: linear-gradient(to bottom, var(--ptc-gold), var(--ptc-blue));
    animation: swingArrow 1s ease-in-out infinite;
    animation-play-state: paused;
  }
  .icon div::before {
    transform: rotate(44deg);
    top: 1px;
    box-shadow: 1px -2px 3px -1px var(--ptc-blue);
    animation: rotateArrowLine 1s linear infinite;
    animation-play-state: paused;
  }
  .icon div::after {
    bottom: 1px;
    transform: rotate(316deg);
    box-shadow: -2px 2px 3px 0 var(--ptc-blue);
    background: linear-gradient(200deg, var(--ptc-gold), var(--ptc-blue));
    animation: rotateArrowLine2 1s linear infinite;
    animation-play-state: paused;
  }
  .path {
    position: absolute;
    z-index: 12;
    bottom: 0;
    left: 0;
    right: 0;
    stroke-dasharray: 150 480;
    stroke-dashoffset: 150;
    pointer-events: none;
  }
  .splash {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    stroke-dasharray: 60 60;
    stroke-dashoffset: 60;
    transform: translate(-17%, -31%);
    stroke: var(--ptc-blue);
  }
  /** STATES */
  .button:hover .words {
    opacity: 1;
  }
  .button:hover .words span {
    animation-play-state: running;
  }
  .button:hover .char.state-1 span::before {
    animation: charAppear 0.7s ease calc(var(--i) * 0.03s);
  }
  .button:hover .char.state-1 span::after {
    opacity: 1;
    animation: charDisappear 0.7s ease calc(var(--i) * 0.03s);
  }
  .button:hover .wrap {
    transform: translate(8px, -8px);
  }
  .button:hover .outline {
    opacity: 1;
  }
  .button:hover .outline::before,
  .button:hover .icon div::before,
  .button:hover .icon div::after,
  .button:hover .icon div {
    animation-play-state: running;
  }
  .button:active .bg::before {
    filter: blur(5px);
    opacity: 0.7;
    box-shadow: -7px 6px 0 0 rgb(21 32 166 / 40%),
      -14px 12px 0 0 rgb(21 32 166 / 25%), -21px 18px 4px 0 rgb(21 32 166 / 15%);
  }
  .button:active .content {
    box-shadow: inset -1px 12px 8px -5px rgba(21, 32, 166, 0.4),
      inset 0px -3px 8px 0px var(--ptc-gold);
  }
  .button:active .words,
  .button:active .outline {
    opacity: 0;
  }
  .button:active .wrap {
    transform: translate(3px, -3px);
  }
  .button:active .splash {
    animation: splash 0.8s cubic-bezier(0.3, 0, 0, 1) forwards 0.05s;
  }
  .button:focus .path {
    animation: path 1.6s ease forwards 0.2s;
  }
  .button:focus .icon {
    animation: arrow 1s cubic-bezier(0.7, -0.5, 0.3, 1.5) forwards;
  }
  .char.state-2 span::after,
  .button:focus .char.state-1 span {
    animation: charDisappear 0.5s ease forwards calc(var(--i) * 0.03s);
  }
  .button:focus .char.state-2 span::after {
    animation: charAppear 1s ease backwards calc(var(--i) * 0.03s);
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes charAppear {
    0% {
      transform: translateY(50%);
      opacity: 0;
      filter: blur(20px);
    }
    20% {
      transform: translateY(70%);
      opacity: 1;
    }
    50% {
      transform: translateY(-15%);
      opacity: 1;
      filter: blur(0);
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
  @keyframes charDisappear {
    0% {
      transform: translateY(0);
      opacity: 1;
    }
    100% {
      transform: translateY(-70%);
      opacity: 0;
      filter: blur(3px);
    }
  }
  @keyframes arrow {
    0% {
      opacity: 1;
    }
    50% {
      transform: translateX(60px);
      opacity: 0;
    }
    51% {
      transform: translateX(-200px);
      opacity: 0;
    }
    100% {
      transform: translateX(-128px);
      opacity: 1;
    }
  }
  @keyframes swingArrow {
    50% {
      transform: translateX(5px) scale(0.9);
    }
  }
  @keyframes rotateArrowLine {
    50% {
      transform: rotate(30deg);
    }
    80% {
      transform: rotate(55deg);
    }
  }
  @keyframes rotateArrowLine2 {
    50% {
      transform: rotate(330deg);
    }
    80% {
      transform: rotate(300deg);
    }
  }
  @keyframes resetArrow {
    0% {
      transform: translateX(-128px);
    }
    100% {
      transform: translateX(0);
    }
  }
  @keyframes path {
    from {
      stroke: var(--ptc-gold);
    }
    to {
      stroke-dashoffset: -480;
      stroke: var(--ptc-blue);
    }
  }
  @keyframes splash {
    to {
      stroke-dasharray: 2 60;
      stroke-dashoffset: -60;
    }
  }
`;
