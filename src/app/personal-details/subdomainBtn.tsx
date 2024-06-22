"use client"
import { toast } from 'sonner'
import { useState } from "react";

export default function SubDomainButton({subdomain}: {subdomain: string | undefined}) {

    return (

        <button className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 mt-2"
            onClick={() => {
                toast.success("Copied to clipboard");
                navigator.clipboard.writeText(`${subdomain}.cvhub.live`);
            }}
        >
            {`${subdomain}.cvhub.live`}
        </button>
    )
}