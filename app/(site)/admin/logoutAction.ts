"use server";

import { logoutAdmin } from "@/app/actions";

export async function logoutWrapper() {
  await logoutAdmin();
}
