import React, { Fragment } from 'react'
import Header from '@/components/header'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation'
import demoImg from "../../public/demo.png"
import Image from 'next/image';
import { Button } from "@/components/ui/button";

async function Home() {

    const session = await getServerSession();

    if (session) {
        redirect("/personal-details");
    }


    return (<Fragment>
        <Header />
        <main className="relative h-[calc(100vh_-_48px)] w-full">
            <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-24">
                <div className="text-center">
                    <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                        <span className="block">Create Your Online CV</span>
                        <span className="block text-indigo-600">With a Personal Subdomain</span>
                    </h1>
                    <p className="mt-6 max-w-md mx-auto text-lg text-gray-600 sm:text-lg md:mt-8 md:text-xl md:max-w-2xl">
                        Easily create a professional online CV with a personal subdomain (yourname.cvhub.live) and print-friendly layout.
                    </p>
                    <div className="mt-8">
                        <Button>
                            <a
                                href="/auth/signin">
                                Try it out
                            </a>
                        </Button>
                    </div>
                </div>
                <div className="mt-12">
                    <div className="relative max-w-7xl mx-auto">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6">
                            <div className="sm:col-span-1 hidden sm:block">
                                <Image
                                    alt="App screenshot"
                                    src={demoImg}
                                    width={1232}
                                    height={623}
                                    className="relative rounded-lg shadow-lg"
                                    loading="lazy"
                                    style={{ color: "transparent" }}
                                />
                            </div>
                            <div className="sm:col-span-1 block sm:hidden">
                                <Image
                                    alt="App screenshot on mobile"
                                    src={demoImg}
                                    width={574}
                                    height={678}
                                    className="relative rounded-lg shadow-lg"
                                    loading="lazy"
                                    style={{ color: "transparent" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </Fragment>);
}

export default Home;

