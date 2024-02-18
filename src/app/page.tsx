import React from 'react'
import Header from '@/components/header'
import { getServerSession } from 'next-auth';
import { redirect  } from 'next/navigation'

async function  Pgae() {

    const session = await getServerSession();

    if (session) {
        redirect("/personal-details");
    }


    return ( <>
        <Header />
        <h1>Page</h1>
    </>);
}

export default Pgae;

