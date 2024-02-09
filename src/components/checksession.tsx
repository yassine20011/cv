"use client";

import { signOut } from "next-auth/react"
import Link from 'next/link'
import { useSession } from "next-auth/react"


export default function CheckSession (){
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