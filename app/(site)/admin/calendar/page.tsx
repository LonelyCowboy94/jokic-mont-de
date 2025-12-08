import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const page = async () => {

  const session = (await cookies()).get("session")?.value;
  if (!session) {
    redirect("/login");
  }

  return (
    <div>CALENDAR</div>
  )
}

export default page