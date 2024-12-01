import React, { PropsWithChildren } from "react";
import { AdminPanelProviders } from "./AdminPanelProviders";
import { getServerSession } from "next-auth";
import { redirect } from "@/routing";
import { authOptions } from "../api/auth/[...nextauth]/auth";

const layout = async ({ children }: PropsWithChildren) => {
  const session = await getServerSession(authOptions);

  if (
    !session ||
    (session.user &&
      session.user.email !== "viajaresimoficial@gmail.com" &&
      !session.user.access)
  ) {
    console.log(session?.user);
    redirect("/login-admin");
  }

  return <AdminPanelProviders>{children}</AdminPanelProviders>;
};

export default layout;
