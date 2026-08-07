"use server";

import { createHash } from "crypto";
import { cookies } from "next/headers";

/**
 * Passcode gate for the admin panel.
 *
 * The passcode is compared here, on the server, so it never reaches the browser
 * bundle. Set `ADMIN_PASSCODE` in the environment to change it without a code
 * change; the literal below is the fallback.
 *
 * SCOPE: this hides the admin UI. It is not an authorisation boundary — the
 * nurse, doctor and product endpoints are reachable without it, so anything
 * that must actually be restricted needs a role check on the API.
 */

const COOKIE_NAME = "admin_gate";
const MAX_AGE_SECONDS = 60 * 60 * 8; // one working day
const FALLBACK_PASSCODE = "Amir@2336";

function expectedPasscode(): string {
  return process.env.ADMIN_PASSCODE || FALLBACK_PASSCODE;
}

/** The cookie holds a digest, so the passcode itself is never stored in it. */
function marker(): string {
  return createHash("sha256")
    .update(`kidoohub-admin:${expectedPasscode()}`)
    .digest("hex");
}

export async function unlockAdmin(
  passcode: string,
): Promise<{ success: boolean; message?: string }> {
  if (!passcode?.trim()) {
    return { success: false, message: "Please enter the passcode." };
  }

  if (passcode !== expectedPasscode()) {
    // Small delay so the form cannot be hammered quickly.
    await new Promise((resolve) => setTimeout(resolve, 400));
    return { success: false, message: "That passcode is not correct." };
  }

  const store = await cookies();
  store.set(COOKIE_NAME, marker(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
    secure: process.env.NODE_ENV === "production",
  });

  return { success: true };
}

export async function lockAdmin(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

/** Read by the admin layout before it renders the sidebar or any page. */
export async function isAdminUnlocked(): Promise<boolean> {
  try {
    const store = await cookies();
    return store.get(COOKIE_NAME)?.value === marker();
  } catch {
    return false;
  }
}
