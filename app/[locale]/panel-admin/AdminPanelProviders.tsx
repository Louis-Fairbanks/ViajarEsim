import { AppProvider } from "@toolpad/core/nextjs";
import { getServerSession } from "next-auth";
import { PropsWithChildren } from "react";
import { NAVIGATION } from "./adminNavigation";
import Image from "next/image";
import { DashboardLayout, PageContainer } from "@toolpad/core";
import { theme } from "../StyledRoot";
import authentication from "./DashboardLayoutAccount";

export const AdminPanelProviders = async ({ children }: PropsWithChildren) => {
  const session = await getServerSession();

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: <Image src="/img/favicon.png" alt="" width={36} height={36} />,
        title: "ViajareSIM",
      }}
      session={session}
      theme={theme}
      authentication={authentication}
    >
      <DashboardLayout>
        <PageContainer>{children}</PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
};

// TODO:
// Pages of the dashboard:
// Inicio - resúmen general del desempeño de la tienda
// content draft:
/*

First line:
 [Ingresos totales del mes] - [ Trafico total del mes] - [Ticket promedio (ingresos totales / número de compras), filtrable por periodos. ]


 Second line:
 [grafica de ingresos totales] - [ Top 10 planes más solicitados]

 Third line:

[Table with recent purchases]



*/
