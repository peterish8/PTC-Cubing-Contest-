"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  LogOut,
  Users,
  Trophy,
  Clock,
  CuboidIcon as Cube,
  Calendar,
  Key,
  Edit,
  Save,
  X,
  Plus,
  Trash2,
  Copy,
  CheckCircle,
} from "lucide-react"
import {
  createParticipant,
  updateParticipant,
  deleteParticipant,
  generateParticipantPassword,
  isPasswordUnique,
  subscribeToParticipants,
  type Participant,
  type CreateParticipantData,
} from "@/lib/auth"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

interface AdminDashboardProps {
  onLogout: () => void
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [participants, setParticipants] = useState<Participant[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState<Partial<Participant>>({})
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [copiedPassword, setCopiedPassword] = useState<string | null>(null)
  const { toast } = useToast()

  // New participant form data
  const [newParticipant, setNewParticipant] = useState<CreateParticipantData>({
    name: "",
    password: "",
    room: "Room A",
    roomCode: "RA2024",
    roomEntryTime: "10:30 AM",
    roomEntryDate: "2024-01-15",
    solves: [0, 0, 0, 0, 0],
    average: 0,
    status: "Pending",
    rank: 1,
    prizeCode: "",
  })

  // Subscribe to real-time updates
  useEffect(() => {
    const unsubscribe = subscribeToParticipants((updatedParticipants) => {
      setParticipants(updatedParticipants)
    })

    return () => unsubscribe()
  }, [])

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "text-[#D4AF37]"
      case 2:
        return "text-[#C0C0C0]"
      case 3:
        return "text-[#CD7F32]"
      default:
        return "text-[#1520A6]"
    }
  }

  const generateUniquePassword = async (name: string) => {
    let password = generateParticipantPassword(name)
    let attempts = 0

    while (!(await isPasswordUnique(password)) && attempts < 10) {
      password = generateParticipantPassword(name)
      attempts++
    }

    return password
  }

  const handleCreateParticipant = async () => {
    if (!newParticipant.name.trim()) {
      toast({
        title: "Error",
        description: "Please enter participant name",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Generate unique password if not provided
      if (!newParticipant.password) {
        const generatedPassword = await generateUniquePassword(newParticipant.name)
        newParticipant.password = generatedPassword
      }

      // Generate prize code if not provided
      if (!newParticipant.prizeCode) {
        newParticipant.prizeCode = `PRIZE_${newParticipant.name.replace(/\s+/g, "").toUpperCase().slice(0, 3)}${Math.floor(Math.random() * 99) + 10}`
      }

      const participantId = await createParticipant(newParticipant)

      if (participantId) {
        toast({
          title: "Success!",
          description: `Participant ${newParticipant.name} created successfully`,
        })

        // Reset form
        setNewParticipant({
          name: "",
          password: "",
          room: "Room A",
          roomCode: "RA2024",
          roomEntryTime: "10:30 AM",
          roomEntryDate: "2024-01-15",
          solves: [0, 0, 0, 0, 0],
          average: 0,
          status: "Pending",
          rank: participants.length + 1,
          prizeCode: "",
        })

        setIsCreateDialogOpen(false)
      } else {
        throw new Error("Failed to create participant")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create participant",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const startEdit = (participant: Participant) => {
    setEditingId(participant.id)
    setEditData({ ...participant })
  }

  const saveEdit = async () => {
    if (!editingId || !editData) return

    setIsLoading(true)

    try {
      const success = await updateParticipant(editingId, editData)

      if (success) {
        toast({
          title: "Success!",
          description: "Participant updated successfully",
        })
        setEditingId(null)
        setEditData({})
      } else {
        throw new Error("Failed to update participant")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update participant",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditData({})
  }

  const handleDeleteParticipant = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}?`)) return

    setIsLoading(true)

    try {
      const success = await deleteParticipant(id)

      if (success) {
        toast({
          title: "Success!",
          description: `${name} deleted successfully`,
        })
      } else {
        throw new Error("Failed to delete participant")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete participant",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const copyPassword = async (password: string) => {
    try {
      await navigator.clipboard.writeText(password)
      setCopiedPassword(password)
      toast({
        title: "Copied!",
        description: "Password copied to clipboard",
      })
      setTimeout(() => setCopiedPassword(null), 2000)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy password",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0D0D] via-[#101A40] to-[#0D0D0D] p-4 relative overflow-hidden">
      {/* Enhanced Golden Sparkle Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl animate-pulse-golden"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#D4AF37]/12 rounded-full blur-3xl animate-pulse-golden-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#1520A6]/8 rounded-full blur-3xl animate-pulse-blue"></div>
        <div className="absolute top-20 left-20 w-32 h-32 bg-[#D4AF37]/18 rounded-full blur-2xl animate-float-sparkle"></div>
        <div className="absolute bottom-32 left-1/3 w-24 h-24 bg-[#D4AF37]/22 rounded-full blur-xl animate-float-sparkle-delayed"></div>
        <div className="absolute top-1/3 right-20 w-40 h-40 bg-[#D4AF37]/15 rounded-full blur-2xl animate-float-sparkle-slow"></div>
        <div className="absolute bottom-1/2 left-1/4 w-28 h-28 bg-[#D4AF37]/16 rounded-full blur-xl animate-float-sparkle"></div>
        <div className="absolute top-1/4 right-1/3 w-36 h-36 bg-[#D4AF37]/14 rounded-full blur-2xl animate-float-sparkle-delayed"></div>
        <div className="absolute top-10 left-10 w-2 h-2 bg-[#D4AF37] rounded-full animate-twinkle"></div>
        <div className="absolute top-32 right-32 w-1 h-1 bg-[#D4AF37] rounded-full animate-twinkle-delayed"></div>
        <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-twinkle-slow"></div>
        <div className="absolute top-1/2 left-20 w-1 h-1 bg-[#D4AF37] rounded-full animate-twinkle-fast"></div>
        <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-[#D4AF37] rounded-full animate-twinkle"></div>
        <div className="absolute top-20 right-1/3 w-1 h-1 bg-[#D4AF37] rounded-full animate-twinkle-delayed"></div>
        <div className="absolute bottom-40 right-10 w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-twinkle-slow"></div>
        <div className="absolute top-2/3 left-10 w-1 h-1 bg-[#D4AF37] rounded-full animate-twinkle-fast"></div>
        <div className="absolute bottom-10 left-1/2 w-1 h-1 bg-[#D4AF37] rounded-full animate-twinkle"></div>
        <div className="absolute top-40 left-1/3 w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-twinkle-delayed"></div>
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-[#D4AF37]/3 to-transparent animate-pulse-overlay"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#D4AF37] via-[#1520A6] to-[#D4AF37] bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-[#FFFFFF]/70 mt-2">Competition management portal</p>
          </div>
          <div className="flex gap-4">
            {/* Create Participant Dialog */}
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-[#D4AF37] to-[#1520A6] hover:from-[#1520A6] hover:to-[#D4AF37] text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Participant
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#101A40] border-[#D4AF37]/30 text-white max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-[#D4AF37]">Create New Participant</DialogTitle>
                  <DialogDescription className="text-[#FFFFFF]/70">
                    Add a new participant to the competition
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-[#FFFFFF]/90">
                        Name *
                      </Label>
                      <Input
                        id="name"
                        value={newParticipant.name}
                        onChange={(e) => setNewParticipant({ ...newParticipant, name: e.target.value })}
                        className="bg-[#0A1340]/50 border-[#D4AF37]/30 text-white"
                        placeholder="Enter participant name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="password" className="text-[#FFFFFF]/90">
                        Password (auto-generated if empty)
                      </Label>
                      <Input
                        id="password"
                        value={newParticipant.password}
                        onChange={(e) => setNewParticipant({ ...newParticipant, password: e.target.value })}
                        className="bg-[#0A1340]/50 border-[#D4AF37]/30 text-white"
                        placeholder="Leave empty for auto-generation"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="room" className="text-[#FFFFFF]/90">
                        Room
                      </Label>
                      <Input
                        id="room"
                        value={newParticipant.room}
                        onChange={(e) => setNewParticipant({ ...newParticipant, room: e.target.value })}
                        className="bg-[#0A1340]/50 border-[#D4AF37]/30 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="roomCode" className="text-[#FFFFFF]/90">
                        Room Code
                      </Label>
                      <Input
                        id="roomCode"
                        value={newParticipant.roomCode}
                        onChange={(e) => setNewParticipant({ ...newParticipant, roomCode: e.target.value })}
                        className="bg-[#0A1340]/50 border-[#D4AF37]/30 text-white"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="entryTime" className="text-[#FFFFFF]/90">
                        Entry Time
                      </Label>
                      <Input
                        id="entryTime"
                        value={newParticipant.roomEntryTime}
                        onChange={(e) => setNewParticipant({ ...newParticipant, roomEntryTime: e.target.value })}
                        className="bg-[#0A1340]/50 border-[#D4AF37]/30 text-white"
                        placeholder="e.g., 10:30 AM"
                      />
                    </div>
                    <div>
                      <Label htmlFor="entryDate" className="text-[#FFFFFF]/90">
                        Entry Date
                      </Label>
                      <Input
                        id="entryDate"
                        type="date"
                        value={newParticipant.roomEntryDate}
                        onChange={(e) => setNewParticipant({ ...newParticipant, roomEntryDate: e.target.value })}
                        className="bg-[#0A1340]/50 border-[#D4AF37]/30 text-white"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="rank" className="text-[#FFFFFF]/90">
                        Rank
                      </Label>
                      <Input
                        id="rank"
                        type="number"
                        value={newParticipant.rank}
                        onChange={(e) =>
                          setNewParticipant({ ...newParticipant, rank: Number.parseInt(e.target.value) || 1 })
                        }
                        className="bg-[#0A1340]/50 border-[#D4AF37]/30 text-white"
                        min="1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="status" className="text-[#FFFFFF]/90">
                        Status
                      </Label>
                      <Input
                        id="status"
                        value={newParticipant.status}
                        onChange={(e) => setNewParticipant({ ...newParticipant, status: e.target.value })}
                        className="bg-[#0A1340]/50 border-[#D4AF37]/30 text-white"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsCreateDialogOpen(false)}
                    className="border-[#D4AF37]/30 text-[#FFFFFF]/90"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateParticipant}
                    disabled={isLoading}
                    className="bg-[#D4AF37] hover:bg-[#B8941F] text-black"
                  >
                    {isLoading ? "Creating..." : "Create Participant"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Button
              onClick={onLogout}
              variant="outline"
              className="border-[#D4AF37]/30 text-[#FFFFFF]/90 hover:bg-[#D4AF37]/10 bg-transparent hover:border-[#D4AF37]/50 transition-all duration-300"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card className="bg-[#101A40]/80 backdrop-blur-xl border-[#1520A6]/20 shadow-lg shadow-[#1520A6]/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#FFFFFF]/90">Total Participants</CardTitle>
              <Users className="h-4 w-4 text-[#1520A6]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{participants.length}</div>
              <p className="text-xs text-[#FFFFFF]/60">Active competitors</p>
            </CardContent>
          </Card>

          <Card className="bg-[#101A40]/80 backdrop-blur-xl border-[#D4AF37]/20 shadow-lg shadow-[#D4AF37]/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#FFFFFF]/90">Best Average</CardTitle>
              <Trophy className="h-4 w-4 text-[#D4AF37]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {participants.length > 0 ? Math.min(...participants.map((p) => p.average)).toFixed(2) + "s" : "N/A"}
              </div>
              <p className="text-xs text-[#FFFFFF]/60">Competition record</p>
            </CardContent>
          </Card>

          <Card className="bg-[#101A40]/80 backdrop-blur-xl border-[#1520A6]/20 shadow-lg shadow-[#1520A6]/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#FFFFFF]/90">Completed</CardTitle>
              <Clock className="h-4 w-4 text-[#1520A6]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {participants.filter((p) => p.status === "Results Ready").length}
              </div>
              <p className="text-xs text-[#FFFFFF]/60">Results processed</p>
            </CardContent>
          </Card>
        </div>

        {/* Participants Management */}
        <Card className="bg-[#101A40]/80 backdrop-blur-xl border-[#D4AF37]/20 shadow-lg shadow-[#D4AF37]/5">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Cube className="w-5 h-5 mr-2 text-[#D4AF37]" />
              Competition Management ({participants.length} participants)
            </CardTitle>
            <CardDescription className="text-[#FFFFFF]/60">
              Manage participant data, room timing, and access codes - Changes sync in real-time
            </CardDescription>
          </CardHeader>
          <CardContent>
            {participants.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-[#FFFFFF]/30 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[#FFFFFF]/70 mb-2">No participants yet</h3>
                <p className="text-[#FFFFFF]/50 mb-4">Create your first participant to get started</p>
                <Button
                  onClick={() => setIsCreateDialogOpen(true)}
                  className="bg-gradient-to-r from-[#D4AF37] to-[#1520A6] hover:from-[#1520A6] hover:to-[#D4AF37] text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Participant
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {participants.map((participant) => (
                  <div
                    key={participant.id}
                    className="border border-[#D4AF37]/20 rounded-lg p-6 bg-[#0A1340]/30 backdrop-blur-sm"
                  >
                    {editingId === participant.id ? (
                      // Edit Mode
                      <div className="space-y-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-white">Editing: {participant.name}</h3>
                          <div className="flex gap-2">
                            <Button
                              onClick={saveEdit}
                              size="sm"
                              disabled={isLoading}
                              className="bg-[#D4AF37] hover:bg-[#B8941F] text-black"
                            >
                              <Save className="h-4 w-4 mr-2" />
                              {isLoading ? "Saving..." : "Save Changes"}
                            </Button>
                            <Button
                              onClick={cancelEdit}
                              variant="outline"
                              size="sm"
                              className="border-[#D4AF37]/30 text-[#FFFFFF]/90 bg-transparent hover:bg-[#D4AF37]/10"
                            >
                              <X className="h-4 w-4 mr-2" />
                              Cancel
                            </Button>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="edit-name" className="text-[#FFFFFF]/90">
                              Name
                            </Label>
                            <Input
                              id="edit-name"
                              value={editData.name || ""}
                              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                              className="bg-[#0A1340]/50 border-[#D4AF37]/30 text-white focus:border-[#D4AF37] focus:ring-[#D4AF37]/20"
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-room" className="text-[#FFFFFF]/90">
                              Room
                            </Label>
                            <Input
                              id="edit-room"
                              value={editData.room || ""}
                              onChange={(e) => setEditData({ ...editData, room: e.target.value })}
                              className="bg-[#0A1340]/50 border-[#D4AF37]/30 text-white focus:border-[#D4AF37] focus:ring-[#D4AF37]/20"
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-roomCode" className="text-[#FFFFFF]/90">
                              Room Code
                            </Label>
                            <Input
                              id="edit-roomCode"
                              value={editData.roomCode || ""}
                              onChange={(e) => setEditData({ ...editData, roomCode: e.target.value })}
                              className="bg-[#0A1340]/50 border-[#D4AF37]/30 text-white focus:border-[#D4AF37] focus:ring-[#D4AF37]/20"
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-roomEntryTime" className="text-[#FFFFFF]/90">
                              Entry Time
                            </Label>
                            <Input
                              id="edit-roomEntryTime"
                              value={editData.roomEntryTime || ""}
                              onChange={(e) => setEditData({ ...editData, roomEntryTime: e.target.value })}
                              placeholder="e.g., 10:30 AM"
                              className="bg-[#0A1340]/50 border-[#D4AF37]/30 text-white focus:border-[#D4AF37] focus:ring-[#D4AF37]/20"
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-roomEntryDate" className="text-[#FFFFFF]/90">
                              Entry Date
                            </Label>
                            <Input
                              id="edit-roomEntryDate"
                              value={editData.roomEntryDate || ""}
                              onChange={(e) => setEditData({ ...editData, roomEntryDate: e.target.value })}
                              placeholder="e.g., 2024-01-15"
                              className="bg-[#0A1340]/50 border-[#D4AF37]/30 text-white focus:border-[#D4AF37] focus:ring-[#D4AF37]/20"
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-prizeCode" className="text-[#FFFFFF]/90">
                              Prize Code
                            </Label>
                            <Input
                              id="edit-prizeCode"
                              value={editData.prizeCode || ""}
                              onChange={(e) => setEditData({ ...editData, prizeCode: e.target.value })}
                              className="bg-[#0A1340]/50 border-[#D4AF37]/30 text-white focus:border-[#D4AF37] focus:ring-[#D4AF37]/20"
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-rank" className="text-[#FFFFFF]/90">
                              Rank
                            </Label>
                            <Input
                              id="edit-rank"
                              type="number"
                              value={editData.rank || 1}
                              onChange={(e) => setEditData({ ...editData, rank: Number.parseInt(e.target.value) || 1 })}
                              className="bg-[#0A1340]/50 border-[#D4AF37]/30 text-white focus:border-[#D4AF37] focus:ring-[#D4AF37]/20"
                              min="1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-status" className="text-[#FFFFFF]/90">
                              Status
                            </Label>
                            <Input
                              id="edit-status"
                              value={editData.status || ""}
                              onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                              className="bg-[#0A1340]/50 border-[#D4AF37]/30 text-white focus:border-[#D4AF37] focus:ring-[#D4AF37]/20"
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-average" className="text-[#FFFFFF]/90">
                              Average Time
                            </Label>
                            <Input
                              id="edit-average"
                              type="number"
                              step="0.01"
                              value={editData.average || 0}
                              onChange={(e) =>
                                setEditData({ ...editData, average: Number.parseFloat(e.target.value) || 0 })
                              }
                              className="bg-[#0A1340]/50 border-[#D4AF37]/30 text-white focus:border-[#D4AF37] focus:ring-[#D4AF37]/20"
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      // View Mode
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <div className="flex items-center gap-4">
                              <h3 className="font-semibold text-lg text-white">{participant.name}</h3>
                              <div className={`flex items-center font-bold ${getRankColor(participant.rank)}`}>
                                <Trophy className="w-4 h-4 mr-1" />#{participant.rank}
                              </div>
                              <Badge
                                variant="secondary"
                                className="bg-[#0A1340]/50 text-[#FFFFFF]/80 border-[#D4AF37]/20"
                              >
                                {participant.status}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-[#FFFFFF]/60">
                              Password:
                              <span className="font-mono text-[#D4AF37] bg-[#0A1340]/50 px-2 py-1 rounded">
                                {participant.password}
                              </span>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => copyPassword(participant.password)}
                                className="h-6 w-6 p-0 hover:bg-[#D4AF37]/10"
                              >
                                {copiedPassword === participant.password ? (
                                  <CheckCircle className="h-3 w-3 text-green-400" />
                                ) : (
                                  <Copy className="h-3 w-3 text-[#D4AF37]" />
                                )}
                              </Button>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              onClick={() => startEdit(participant)}
                              variant="outline"
                              size="sm"
                              className="border-[#D4AF37]/30 text-[#FFFFFF]/90 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/50"
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                            <Button
                              onClick={() => handleDeleteParticipant(participant.id, participant.name)}
                              variant="outline"
                              size="sm"
                              className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </Button>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div className="bg-[#0A1340]/50 rounded-lg p-4 border border-[#D4AF37]/20">
                            <div className="flex items-center mb-2">
                              <Calendar className="w-4 h-4 text-[#D4AF37] mr-2" />
                              <span className="text-sm font-medium text-[#FFFFFF]/90">Room Entry</span>
                            </div>
                            <div className="text-white font-semibold">{participant.roomEntryTime}</div>
                            <div className="text-xs text-[#FFFFFF]/60">{participant.roomEntryDate}</div>
                            <div className="text-sm text-[#D4AF37] mt-1">{participant.room}</div>
                          </div>

                          <div className="bg-[#0A1340]/50 rounded-lg p-4 border border-[#1520A6]/20">
                            <div className="flex items-center mb-2">
                              <Key className="w-4 h-4 text-[#1520A6] mr-2" />
                              <span className="text-sm font-medium text-[#FFFFFF]/90">Room Code</span>
                            </div>
                            <div className="font-mono text-[#1520A6] bg-[#0A1340]/50 px-2 py-1 rounded text-sm">
                              {participant.roomCode}
                            </div>
                          </div>

                          <div className="bg-[#0A1340]/50 rounded-lg p-4 border border-[#1520A6]/20">
                            <div className="flex items-center mb-2">
                              <Clock className="w-4 h-4 text-[#1520A6] mr-2" />
                              <span className="text-sm font-medium text-[#FFFFFF]/90">Performance</span>
                            </div>
                            <div className="text-[#1520A6] font-mono text-lg">{participant.average.toFixed(2)}s</div>
                            <div className="text-xs text-[#FFFFFF]/60">Average of 5</div>
                          </div>

                          <div className="bg-[#0A1340]/50 rounded-lg p-4 border border-[#D4AF37]/20">
                            <div className="flex items-center mb-2">
                              <Trophy className="w-4 h-4 text-[#D4AF37] mr-2" />
                              <span className="text-sm font-medium text-[#FFFFFF]/90">Prize</span>
                            </div>
                            <div className="font-mono text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-1 rounded text-sm border border-[#D4AF37]/20">
                              {participant.prizeCode}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
