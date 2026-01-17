import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getAppointments } from "./AdminTable"; // fetch server-side iz AdminTable
import AdminTable from "./AdminTable";

const Page = async () => {
  const session = (await cookies()).get("session")?.value;
  if (!session) redirect("/login"); // redirect ako nije logovan

  const appointments = await getAppointments();

  return <AdminTable appointments={appointments} />;
};

export default Page;
