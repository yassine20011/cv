"use client";

import { signOut } from "next-auth/react"
import Link from 'next/link'
import { useSession } from "next-auth/react"
import { usePathname } from "next/navigation";


export default function CheckSession() {
    const { data: session } = useSession()

    if (session) {
        return (
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                <button
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                    onClick={() => signOut()}
                >
                    Log out <span aria-hidden="true">→</span>
                </button>
            </div>
        )
    }
    else {
        return (
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                <Link href="/auth/signin" className="text-sm font-semibold leading-6 text-gray-900">
                    Log in <span aria-hidden="true">→</span>
                </Link>
            </div>
        )
    }
}


export function Nav({ tabs }: { tabs: { name: string, href: string }[] }) {

    const pathname = usePathname()

    return (
        <nav
            className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
            aria-label="Global"
        >
            <div className="flex lg:flex-1">
                <Link href="/" className="-m-1.5 p-1.5">
                    <span className="sr-only">Resume Builder</span>
                    <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt=""
                    />
                </Link>
            </div>
            <div className="flex lg:hidden">
                <button
                    type="button"
                    className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
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
            <div className="hidden lg:flex lg:gap-x-12">
                <div className="relative">

                </div>
                {
                    tabs.map((tab) => (
                        tab.name === "profile-manager" ? (
                            <a href={tab.href} key={tab.name}
                                className={`
                                ${tab.href === pathname ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}
                                inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium
                        `} aria-current={tab.href === pathname ? 'page' : undefined}
                            >
                                {tab.name}
                            </a>
                        ) : (
                            <Link href={tab.href
                            } key={tab.name} prefetch={true}
                                className={`
                                ${tab.href === pathname ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}
                                inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium
                        `}

                                aria-current={tab.href === pathname ? 'page' : undefined}
                            >
                                {tab.name}
                            </Link>
                        )

                    ))
                }
            </div>
            <CheckSession />
        </nav>

    )
}