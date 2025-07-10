"use client";

import { useState } from "react";
import { LandingPage } from "@/components/landing-page";
import { LoginForm } from "@/components/login-form";
import { ParticipantDashboard } from "@/components/participant-dashboard";
import { AdminDashboard } from "@/components/admin-dashboard";
import {
  authenticateAdmin,
  authenticateParticipant,
  type Participant,
} from "@/lib/auth";

type UserType = "admin" | "participant" | null;
type PageState = "landing" | "portal";

export default function Home() {
  const [userType, setUserType] = useState<UserType>(null);
  const [participant, setParticipant] = useState<Participant | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (
    type: "admin" | "participant",
    password: string
  ) => {
    setIsLoading(true);
    setError(null);

    // Simulate loading delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (type === "admin") {
      if (authenticateAdmin(password)) {
        setUserType("admin");
      } else {
        setError("Invalid admin password");
      }
    } else {
      const participantData = authenticateParticipant(password);
      if (participantData) {
        setParticipant(participantData);
        setUserType("participant");
      } else {
        setError("Invalid participant password");
      }
    }

    setIsLoading(false);
  };

  const handleLogout = () => {
    setUserType(null);
    setParticipant(null);
    setError(null);
  };

  return <LandingPage />;
}
