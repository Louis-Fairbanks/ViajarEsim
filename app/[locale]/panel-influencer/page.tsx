import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from 'react'
import TopBarAndHeader from "../components/HeaderComponents/TopBarAndHeader";
import SignOutButton from "./SignOutButton";
import DataWrapper from "./DataWrapper";

const page = async () => {

    const session = await getServerSession();
    if (!session || !session.user || session.user.email === 'viajaresimoficial@gmail.com') {
        redirect('/usuario');
    }
    //session.user.name is what can be used to identify the influencer from the database
    return (
        <>
            <TopBarAndHeader />
            <div className='p-24 sm:p-64 flex flex-col space-y-24'>
                <DataWrapper username={session?.user?.name}/>
                <SignOutButton/>
            </div>
        </>
    )
}

export default page
