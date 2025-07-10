import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore"
import { db } from "./firebase"

// Mock admin password - in production, this should be more secure
const ADMIN_PASSWORD = "cubecomp2024admin"

export interface Participant {
  id: string
  name: string
  password: string
  room: string
  roomCode: string
  roomEntryTime: string
  roomEntryDate: string
  solves: number[]
  average: number
  status: string
  rank: number
  prizeCode: string
  createdAt?: Date
  updatedAt?: Date
}

export interface CreateParticipantData {
  name: string
  password: string
  room: string
  roomCode: string
  roomEntryTime: string
  roomEntryDate: string
  solves: number[]
  average: number
  status: string
  rank: number
  prizeCode: string
}

// Admin Authentication
export function authenticateAdmin(password: string): boolean {
  return password === ADMIN_PASSWORD
}

// Participant Authentication
export async function authenticateParticipant(password: string): Promise<Participant | null> {
  try {
    const participantsRef = collection(db, "participants")
    const q = query(participantsRef, where("password", "==", password))
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      return null
    }

    const doc = querySnapshot.docs[0]
    return {
      id: doc.id,
      ...doc.data(),
    } as Participant
  } catch (error) {
    console.error("Error authenticating participant:", error)
    return null
  }
}

// Get all participants
export async function getAllParticipants(): Promise<Participant[]> {
  try {
    const participantsRef = collection(db, "participants")
    const q = query(participantsRef, orderBy("rank", "asc"))
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Participant[]
  } catch (error) {
    console.error("Error getting participants:", error)
    return []
  }
}

// Get single participant by ID
export async function getParticipantById(id: string): Promise<Participant | null> {
  try {
    const docRef = doc(db, "participants", id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as Participant
    }
    return null
  } catch (error) {
    console.error("Error getting participant:", error)
    return null
  }
}

// Create new participant
export async function createParticipant(participantData: CreateParticipantData): Promise<string | null> {
  try {
    const docRef = await addDoc(collection(db, "participants"), {
      ...participantData,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    return docRef.id
  } catch (error) {
    console.error("Error creating participant:", error)
    return null
  }
}

// Update participant
export async function updateParticipant(id: string, updates: Partial<Participant>): Promise<boolean> {
  try {
    const docRef = doc(db, "participants", id)
    await updateDoc(docRef, {
      ...updates,
      updatedAt: new Date(),
    })
    return true
  } catch (error) {
    console.error("Error updating participant:", error)
    return false
  }
}

// Delete participant
export async function deleteParticipant(id: string): Promise<boolean> {
  try {
    await deleteDoc(doc(db, "participants", id))
    return true
  } catch (error) {
    console.error("Error deleting participant:", error)
    return false
  }
}

// Real-time listener for participants
export function subscribeToParticipants(callback: (participants: Participant[]) => void) {
  const participantsRef = collection(db, "participants")
  const q = query(participantsRef, orderBy("rank", "asc"))

  return onSnapshot(q, (querySnapshot) => {
    const participants = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Participant[]
    callback(participants)
  })
}

// Real-time listener for single participant
export function subscribeToParticipant(id: string, callback: (participant: Participant | null) => void) {
  const docRef = doc(db, "participants", id)

  return onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      const participant = {
        id: docSnap.id,
        ...docSnap.data(),
      } as Participant
      callback(participant)
    } else {
      callback(null)
    }
  })
}

// Generate unique password
export function generateParticipantPassword(name: string): string {
  const cleanName = name.replace(/\s+/g, "").toUpperCase().slice(0, 3)
  const randomNum = Math.floor(Math.random() * 99) + 10
  return `CUBE_${cleanName}${randomNum}`
}

// Check if password is unique
export async function isPasswordUnique(password: string): Promise<boolean> {
  try {
    const participantsRef = collection(db, "participants")
    const q = query(participantsRef, where("password", "==", password))
    const querySnapshot = await getDocs(q)
    return querySnapshot.empty
  } catch (error) {
    console.error("Error checking password uniqueness:", error)
    return false
  }
}
