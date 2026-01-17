
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LoginForm from "./LoginForm"; 

export default async function Page() {
  const session = (await cookies()).get("session")?.value;
  if (session) redirect("/admin");

  return <LoginForm />;
}
