import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getAppointments } from "@/app/actions";
import { Appointment } from "@/types";
import AdminTable from "./AdminTable";

const page = async () => {
  const session = (await cookies()).get("session")?.value;
  if (!session) redirect("/login");

  const appointments = await getAppointments();

  return <AdminTable appointments={appointments} />;
};

export default page;
