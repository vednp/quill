import { db } from "@/src/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import DashboardComp from "@/src/components/DashboardComp";
const Dashboard = async () => {
  const { getUser } = await getKindeServerSession();
  const user = await getUser();
  if (!user || !user.id) redirect("/auth-callback?origin=dashboard");
  const DbUser = await db.user.findFirst({
    where: {
      email: user.email,
    },
  });

  if (!DbUser) redirect("/auth-callback?origin=dashboard");
  return <DashboardComp />;
};

export default Dashboard;
