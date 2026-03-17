"use client";

import { useState, useEffect, useCallback } from "react";
import type { ShopperProfile } from "@lumifit/shared-types";
import {
  getStoredProfile,
  saveProfile,
  clearProfile,
} from "../lib/body-profile-storage";

export function useBodyProfile() {
  const [profile, setProfile] = useState<ShopperProfile | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setProfile(getStoredProfile());
    setIsLoaded(true);
  }, []);

  const save = useCallback((data: ShopperProfile) => {
    saveProfile(data);
    setProfile(data);
  }, []);

  const clear = useCallback(() => {
    clearProfile();
    setProfile(null);
  }, []);

  return { profile, isLoaded, save, clear };
}
