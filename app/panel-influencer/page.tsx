import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from 'react'
import TopBarAndHeader from "../components/HeaderComponents/TopBarAndHeader";
import InfluencerDataGrid from "./InfluencerDataGrid";
import SignOutButton from "./SignOutButton";

const page = async () => {

    const session = await getServerSession();
    if (!session || !session.user) {
        redirect('/api/auth/signin');
    }
    return (
        <>
            <TopBarAndHeader />
            <div className='p-24 sm:p-64 flex flex-col space-y-24'>
                <div className="flex justify-between">
                    <h1 className="text-heading font-medium'">Bienvenido a tu panel, <span className="text-primary font-bold">{session?.user?.name}</span></h1>
                    <h3 className="text-subheading font-medium">Mis ganancias: <span className="text-primary font-bold">$300,00</span></h3>
                </div>
                <InfluencerDataGrid title='Mis Enlaces de Afiliado' tableToShow="links"/>
                <InfluencerDataGrid title='Mis códigos de descuento' tableToShow="codes"/>
                <InfluencerDataGrid title='Mis compras generadas' tableToShow="purchases" />
                <SignOutButton/>
            </div>
        </>
    )
}

export default page
