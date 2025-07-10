"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InteractiveCube } from "./interactive-cube";
import { CuboidIcon as Cube, Shield, Timer, Trophy } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

interface LoginFormProps {
  onLogin: (type: "admin" | "participant", password: string) => void;
  isLoading: boolean;
  error: string | null;
}

export function LoginForm({ onLogin, isLoading, error }: LoginFormProps) {
  const [adminPassword, setAdminPassword] = useState("");
  const [participantPassword, setParticipantPassword] = useState("");

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin("admin", adminPassword);
  };

  const handleParticipantLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin("participant", participantPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0D0D] via-[#101A40] to-[#0D0D0D] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Enhanced Golden Sparkle Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary Golden Glow Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4AF37]/15 rounded-full blur-3xl animate-pulse-golden"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#D4AF37]/20 rounded-full blur-3xl animate-pulse-golden-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#1520A6]/10 rounded-full blur-3xl animate-pulse-blue"></div>

        {/* Secondary Golden Sparkles */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-[#D4AF37]/25 rounded-full blur-2xl animate-float-sparkle"></div>
        <div className="absolute bottom-32 left-1/3 w-24 h-24 bg-[#D4AF37]/30 rounded-full blur-xl animate-float-sparkle-delayed"></div>
        <div className="absolute top-1/3 right-20 w-40 h-40 bg-[#D4AF37]/20 rounded-full blur-2xl animate-float-sparkle-slow"></div>

        {/* Animated Golden Particles */}
        <div className="absolute top-10 left-10 w-2 h-2 bg-[#D4AF37] rounded-full animate-twinkle"></div>
        <div className="absolute top-32 right-32 w-1 h-1 bg-[#D4AF37] rounded-full animate-twinkle-delayed"></div>
        <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-twinkle-slow"></div>
        <div className="absolute top-1/2 left-20 w-1 h-1 bg-[#D4AF37] rounded-full animate-twinkle-fast"></div>
        <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-[#D4AF37] rounded-full animate-twinkle"></div>
        <div className="absolute top-20 right-1/3 w-1 h-1 bg-[#D4AF37] rounded-full animate-twinkle-delayed"></div>

        {/* Gradient Overlay for Depth */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-[#D4AF37]/5 to-transparent animate-pulse-overlay"></div>
      </div>

      <Card className="w-full max-w-md relative z-10 bg-[#101A40]/90 backdrop-blur-xl border-[#D4AF37]/30 shadow-2xl shadow-[#D4AF37]/10">
        <CardHeader className="text-center space-y-4">
          <InteractiveCube size="md" />
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-[#D4AF37] via-[#1520A6] to-[#D4AF37] bg-clip-text text-transparent">
              CubeComp Portal
            </CardTitle>
            <CardDescription className="text-[#FFFFFF]/70">
              Access your cubing competition dashboard
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="participant" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2 bg-[#0A1340]/50">
              <TabsTrigger
                value="participant"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#1520A6] data-[state=active]:to-[#0A1340] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-[#1520A6]/20"
              >
                <Timer className="w-4 h-4 mr-2" />
                Participant
              </TabsTrigger>
              <TabsTrigger
                value="admin"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#D4AF37] data-[state=active]:to-[#1520A6] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-[#D4AF37]/20"
              >
                <Shield className="w-4 h-4 mr-2" />
                Admin
              </TabsTrigger>
            </TabsList>

            <TabsContent value="participant" className="space-y-4">
              <form onSubmit={handleParticipantLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="participant-password"
                    className="text-[#FFFFFF]/90"
                  >
                    Your Competition Password
                  </Label>
                  <Input
                    id="participant-password"
                    type="password"
                    placeholder="Enter your unique password"
                    value={participantPassword}
                    onChange={(e) => setParticipantPassword(e.target.value)}
                    className="bg-[#0A1340]/50 border-[#1520A6]/30 text-white placeholder:text-[#FFFFFF]/50 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 focus:shadow-lg focus:shadow-[#D4AF37]/10"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#1520A6] to-[#0A1340] hover:from-[#0A1340] hover:to-[#1520A6] text-white font-medium shadow-lg shadow-[#1520A6]/20 hover:shadow-[#1520A6]/30 transition-all duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <Cube className="w-4 h-4 mr-2 animate-spin" />
                      Accessing Dashboard...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Trophy className="w-4 h-4 mr-2" />
                      Access My Results
                    </div>
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="admin" className="space-y-4">
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-password" className="text-[#FFFFFF]/90">
                    Admin Password
                  </Label>
                  <Input
                    id="admin-password"
                    type="password"
                    placeholder="Enter admin password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="bg-[#0A1340]/50 border-[#1520A6]/30 text-white placeholder:text-[#FFFFFF]/50 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 focus:shadow-lg focus:shadow-[#D4AF37]/10"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#D4AF37] to-[#1520A6] hover:from-[#1520A6] hover:to-[#D4AF37] text-white font-medium shadow-lg shadow-[#D4AF37]/20 hover:shadow-[#D4AF37]/30 transition-all duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <Cube className="w-4 h-4 mr-2 animate-spin" />
                      Authenticating...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Shield className="w-4 h-4 mr-2" />
                      Access Admin Panel
                    </div>
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          {error && (
            <div className="mt-4 p-3 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-lg shadow-lg shadow-[#D4AF37]/10">
              <p className="text-[#D4AF37] text-sm text-center font-medium">
                {error}
              </p>
            </div>
          )}

          <div className="mt-6 text-center">
            <p className="text-[#FFFFFF]/50">
              Powered by CubeComp • Secure Competition Portal
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
