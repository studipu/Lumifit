import type { ShopperProfile } from "@lumifit/shared-types";

const PROFILE_KEY = "lumifit_shopper_profile";
const AVATAR_KEY = "lumifit_selected_avatar";

export function getStoredProfile(): ShopperProfile | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(PROFILE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as ShopperProfile;
  } catch {
    return null;
  }
}

export function saveProfile(profile: ShopperProfile): void {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function clearProfile(): void {
  localStorage.removeItem(PROFILE_KEY);
  localStorage.removeItem(AVATAR_KEY);
}

export function getSelectedAvatarId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(AVATAR_KEY);
}

export function saveSelectedAvatarId(avatarId: string): void {
  localStorage.setItem(AVATAR_KEY, avatarId);
}
