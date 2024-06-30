"use client";

import { signOut } from "next-auth/react"
import Link from 'next/link'
import { useSession } from "next-auth/react"
import { usePathname } from "next/navigation";
import logo from "../../public/resume.png"
import Image from 'next/image'
import { useState } from "react";

function CheckSessionDesktop() {
    const { data: session } = useSession()

    if (session) {
        return (
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                <button
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                    onClick={() => signOut()}
                >
                    Log out
                    <span aria-hidden="true" className="text-xl">
                        →
                    </span>
                </button>
            </div>
        )
    }
    else {
        return (
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                <Link href="/auth/signin" className="text-sm font-semibold leading-6 text-gray-900">
                    Log in
                    <span aria-hidden="true" className="text-xl">
                        →
                    </span>
                </Link>
            </div>
        )
    }
}


function CheckSessionMobile() {
    const { data: session } = useSession()

    if (session) {
        return (
            <li>
                <button
                    data-testid="mobile-logout"
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900 py-2 px-3"
                    onClick={() => signOut()}
                >
                    Log out
                    <span aria-hidden="true" className="text-xl">
                        →
                    </span>
                </button>
            </li>
        )
    }
    else {
        return (
            <li>
                <Link href="/auth/signin" className="text-sm font-semibold leading-6 text-gray-900 py-2 px-3"
                    data-testid="mobile-login"
                >
                    Log in
                    <span aria-hidden="true" className="text-xl">
                        →
                    </span>
                </Link>
            </li>
        )
    }
}


export function Nav({ tabs }: { tabs: { name: string, href: string }[] }) {

    const pathname = usePathname()
    const [toggle, setToggle] = useState(false);

    return (
        <nav
            className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 border-b-gray-400"
            aria-label="Global"
        >
            <div className="flex lg:flex-1">
                <Link href="/" className="-m-1.5 p-1.5">
                    <Image
                        src={logo}
                        className="h-8 w-auto"
                        alt="Resume Builder"
                    />
                    <span className="font-bold">Resume Builder</span>
                </Link>
            </div>
            <div className="flex lg:hidden">
                <button
                    type="button"
                    className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    onClick={() => setToggle(!toggle)}
                >
                    <span className="sr-only">Open main menu</span>
                    <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                        />
                    </svg>
                </button>
            </div>
            {/*  toggle menu */}
            <div className={`${toggle ? 'block' : 'hidden'} lg:hidden absolute top-20 right-0 z-10 bg-white w-48 mr-4 p-2 border-2 border-gray-200 rounded-lg`}>
                <ul className="flex flex-col font-medium mt-4 rounded-lg">
                    {
                        tabs.map((tab) => (
                            <li key={tab.name}>
                                <a
                                    href={tab.href}
                                    className={`
                                                ${tab.href === pathname ? 'bg-indigo-50 text-indigo-700' : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900'}
                                                block rounded-md py-2 px-3 text-base font-medium
                                            `}
                                    aria-current={tab.href === pathname ? 'page' : undefined}
                                >
                                    {tab.name}
                                </a>
                            </li>
                        ))
                    }
                    <CheckSessionMobile />
                </ul>
            </div>
            {/* desktop menu */}
            <div className="hidden lg:flex lg:gap-x-12">
                <div className="relative">
                </div>
                {
                    tabs.map((tab) => (
                        <a href={tab.href} key={tab.name}
                            className={`
                                ${tab.href === pathname ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}
                                inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium
                        `} aria-current={tab.href === pathname ? 'page' : undefined} data-testid={tab.name}
                        >
                            {tab.name}
                        </a>
                    ))
                }
            </div>
            <CheckSessionDesktop />
        </nav>

    )
}