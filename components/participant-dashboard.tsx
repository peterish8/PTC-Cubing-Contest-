"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Clock, MapPin, Gift, LogOut, CuboidIcon as Cube, Calendar, Key } from "lucide-react"
import { subscribeToParticipant, type Participant } from "@/lib/auth"
import { useState, useEffect } from "react"

interface ParticipantDashboardProps {
  participant: Participant
  onLogout: () => void
}

export function ParticipantDashboard({ participant: initialParticipant, onLogout }: ParticipantDashboardProps) {
  const [participant, setParticipant] = useState<Participant>(initialParticipant)

  // Subscribe to real-time updates for this participant
  useEffect(() => {
    const unsubscribe = subscribeToParticipant(participant.id, (updatedParticipant) => {
      if (updatedParticipant) {
        setParticipant(updatedParticipant)
      }
    })

    return () => unsubscribe()
  }, [participant.id])

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-[#D4AF37] to-[#B8941F]"
      case 2:
        return "bg-gradient-to-r from-[#C0C0C0] to-[#A8A8A8]"
      case 3:
        return "bg-gradient-to-r from-[#CD7F32] to-[#B8860B]"
      default:
        return "bg-gradient-to-r from-[#1520A6] to-[#0A1340]"
    }
  }

  const getRankIcon = (rank: number) => {
    if (rank <= 3) return <Trophy className="w-5 h-5" />
    return <Cube className="w-5 h-5" />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0D0D] via-[#101A40] to-[#0D0D0D] p-4 relative overflow-hidden">
      {/* Enhanced Golden Sparkle Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4AF37]/12 rounded-full blur-3xl animate-pulse-golden"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#D4AF37]/15 rounded-full blur-3xl animate-pulse-golden-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#1520A6]/8 rounded-full blur-3xl animate-pulse-blue"></div>
        <div className="absolute top-20 left-20 w-32 h-32 bg-[#D4AF37]/20 rounded-full blur-2xl animate-float-sparkle"></div>
        <div className="absolute bottom-32 left-1/3 w-24 h-24 bg-[#D4AF37]/25 rounded-full blur-xl animate-float-sparkle-delayed"></div>
        <div className="absolute top-1/3 right-20 w-40 h-40 bg-[#D4AF37]/15 rounded-full blur-2xl animate-float-sparkle-slow"></div>
        <div className="absolute bottom-1/2 left-1/4 w-28 h-28 bg-[#D4AF37]/18 rounded-full blur-xl animate-float-sparkle"></div>
        <div className="absolute top-10 left-10 w-2 h-2 bg-[#D4AF37] rounded-full animate-twinkle"></div>
        <div className="absolute top-32 right-32 w-1 h-1 bg-[#D4AF37] rounded-full animate-twinkle-delayed"></div>
        <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-twinkle-slow"></div>
        <div className="absolute top-1/2 left-20 w-1 h-1 bg-[#D4AF37] rounded-full animate-twinkle-fast"></div>
        <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-[#D4AF37] rounded-full animate-twinkle"></div>
        <div className="absolute top-20 right-1/3 w-1 h-1 bg-[#D4AF37] rounded-full animate-twinkle-delayed"></div>
        <div className="absolute bottom-40 right-10 w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-twinkle-slow"></div>
        <div className="absolute top-2/3 left-10 w-1 h-1 bg-[#D4AF37] rounded-full animate-twinkle-fast"></div>
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-[#D4AF37]/3 to-transparent animate-pulse-overlay"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header with Real-time Indicator */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#D4AF37] via-[#1520A6] to-[#D4AF37] bg-clip-text text-transparent">
                Welcome back, {participant.name}!
              </h1>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-400 font-medium">Live Updates</span>
              </div>
            </div>
            <p className="text-[#FFFFFF]/70 mt-2">Your competition results are updated in real-time</p>
          </div>
          <Button
            onClick={onLogout}
            variant="outline"
            className="border-[#D4AF37]/30 text-[#FFFFFF]/90 hover:bg-[#D4AF37]/10 bg-transparent hover:border-[#D4AF37]/50 transition-all duration-300"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Rank Card */}
          <Card className="bg-[#101A40]/80 backdrop-blur-xl border-[#D4AF37]/20 shadow-lg shadow-[#D4AF37]/5">
            <CardHeader className="text-center">
              <div
                className={`w-16 h-16 rounded-full ${getRankColor(participant.rank)} flex items-center justify-center mx-auto mb-4 shadow-lg`}
              >
                {getRankIcon(participant.rank)}
              </div>
              <CardTitle className="text-white">Final Rank</CardTitle>
              <CardDescription className="text-[#FFFFFF]/60">Your competition position</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl font-bold text-white mb-2">#{participant.rank}</div>
              <Badge variant="secondary" className="bg-[#0A1340]/50 text-[#FFFFFF]/80 border-[#D4AF37]/20">
                {participant.status}
              </Badge>
            </CardContent>
          </Card>

          {/* Average Time Card */}
          <Card className="bg-[#101A40]/80 backdrop-blur-xl border-[#1520A6]/20 shadow-lg shadow-[#1520A6]/5">
            <CardHeader className="text-center">
              <Clock className="w-12 h-12 text-[#1520A6] mx-auto mb-4" />
              <CardTitle className="text-white">Average Time</CardTitle>
              <CardDescription className="text-[#FFFFFF]/60">Your Ao5 result</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-[#1520A6] to-[#D4AF37] bg-clip-text text-transparent mb-2">
                {participant.average.toFixed(2)}s
              </div>
              <Badge variant="outline" className="border-[#1520A6]/30 text-[#1520A6]">
                Average of 5
              </Badge>
            </CardContent>
          </Card>

          {/* Room Entry Time Card */}
          <Card className="bg-gradient-to-br from-[#D4AF37]/10 to-[#1520A6]/10 backdrop-blur-xl border-[#D4AF37]/20 shadow-lg shadow-[#D4AF37]/5">
            <CardHeader className="text-center">
              <Calendar className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
              <CardTitle className="text-white">Entry Time</CardTitle>
              <CardDescription className="text-[#FFFFFF]/60">When to enter your room</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-2xl font-bold text-[#D4AF37] mb-1">{participant.roomEntryTime}</div>
              <div className="text-sm text-[#FFFFFF]/70 mb-2">{participant.roomEntryDate}</div>
              <Badge className="bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/30">{participant.room}</Badge>
            </CardContent>
          </Card>

          {/* Room Code Card */}
          <Card className="bg-gradient-to-br from-[#1520A6]/10 to-[#0A1340]/10 backdrop-blur-xl border-[#1520A6]/20 shadow-lg shadow-[#1520A6]/5">
            <CardHeader className="text-center">
              <Key className="w-12 h-12 text-[#1520A6] mx-auto mb-4" />
              <CardTitle className="text-white">Room Code</CardTitle>
              <CardDescription className="text-[#FFFFFF]/60">Access code for your room</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-2xl font-mono font-bold text-[#1520A6] mb-2 bg-[#0A1340]/50 rounded-lg py-2 px-4 border border-[#1520A6]/20">
                {participant.roomCode}
              </div>
              <Badge className="bg-[#1520A6]/20 text-[#1520A6] border-[#1520A6]/30">Required for Entry</Badge>
            </CardContent>
          </Card>
        </div>

        {/* Room Instructions Card */}
        <Card className="bg-gradient-to-br from-[#1520A6]/10 to-[#D4AF37]/10 backdrop-blur-xl border-[#D4AF37]/20 shadow-lg shadow-[#D4AF37]/5">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-[#D4AF37]" />
              Room Instructions
            </CardTitle>
            <CardDescription className="text-[#FFFFFF]/60">Important information for competition day</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#0A1340]/30 rounded-lg p-4 border border-[#D4AF37]/20">
                <h4 className="font-semibold text-white mb-2 flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-[#D4AF37]" />
                  Entry Schedule
                </h4>
                <p className="text-[#FFFFFF]/80 text-sm">
                  Please arrive at <span className="font-mono text-[#D4AF37]">{participant.room}</span> by{" "}
                  <span className="font-mono text-[#D4AF37]">{participant.roomEntryTime}</span> on{" "}
                  <span className="font-mono text-[#D4AF37]">{participant.roomEntryDate}</span>
                </p>
              </div>
              <div className="bg-[#0A1340]/30 rounded-lg p-4 border border-[#1520A6]/20">
                <h4 className="font-semibold text-white mb-2 flex items-center">
                  <Key className="w-4 h-4 mr-2 text-[#1520A6]" />
                  Access Code
                </h4>
                <p className="text-[#FFFFFF]/80 text-sm">
                  Present code{" "}
                  <span className="font-mono text-[#1520A6] bg-[#0A1340]/50 px-2 py-1 rounded">
                    {participant.roomCode}
                  </span>{" "}
                  to the room supervisor for entry
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Individual Solves */}
        <Card className="bg-[#101A40]/80 backdrop-blur-xl border-[#D4AF37]/20 shadow-lg shadow-[#D4AF37]/5">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Cube className="w-5 h-5 mr-2 text-[#D4AF37]" />
              Individual Solves
            </CardTitle>
            <CardDescription className="text-[#FFFFFF]/60">Your 5 solve times</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-4">
              {participant.solves.map((solve, index) => (
                <div key={index} className="text-center">
                  <div className="bg-[#0A1340]/50 rounded-lg p-4 border border-[#D4AF37]/20 hover:border-[#D4AF37]/40 transition-all duration-300">
                    <div className="text-sm text-[#FFFFFF]/60 mb-1">Solve {index + 1}</div>
                    <div className="text-xl font-bold text-white">{solve.toFixed(2)}s</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Prize Code */}
        <Card className="bg-gradient-to-br from-[#D4AF37]/10 to-[#1520A6]/10 backdrop-blur-xl border-[#D4AF37]/30 shadow-lg shadow-[#D4AF37]/10">
          <CardHeader className="text-center">
            <Gift className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
            <CardTitle className="text-white">Prize Code</CardTitle>
            <CardDescription className="text-[#FFFFFF]/60">Your reward code</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-xl font-mono font-bold bg-gradient-to-r from-[#D4AF37] to-[#1520A6] bg-clip-text text-transparent mb-2">
              {participant.prizeCode}
            </div>
            <Badge className="bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/30">Claim at Prize Counter</Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
