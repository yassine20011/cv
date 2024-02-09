"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { handleActionEducation, handleActionProject, handleActionExperience } from "./action";

type FormStructure = {
    type: string;
    label: string;
    name: string;
    placeHolder: string;
    required: boolean;
    disabled: boolean;
    longText?: boolean;
}


interface ModalProps {
    name: string;
    formStructure: FormStructure[];
}


export default function Modal({ name, formStructure }: ModalProps) {
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setShowModal(false);
        const formdata = new FormData(e.currentTarget);
        if (name.toLowerCase() === "Education".toLowerCase()) {
            await handleActionEducation(formdata);
        }
        else if (name.toLowerCase() === "Project".toLowerCase()) {
            await handleActionProject(formdata);
        }
        else if (name.toLowerCase() === "Experience".toLowerCase()) {
            await handleActionExperience(formdata);
        } else {
            throw new Error("Invalid form name");
        }
    }

    return (
        <>
            <Button variant="default"
                className="w-full mt-4"
                onClick={() => setShowModal(true)}
            >
                Add {name}
            </Button>


            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative p-4 w-full max-w-md max-h-full">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        Add your {name.toLowerCase()} details
                                    </h3>
                                    <button
                                        type="button"
                                        className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <svg
                                            className="w-3 h-3"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 14 14"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                            />
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>
                                <div className="p-4 md:p-5">
                                    <form className="space-y-4" onSubmit={handleSubmit}>
                                        {
                                            formStructure.map((form) => (
                                                
                                                form.longText ? (
                                                    <div key={form.name}>
                                                        <label htmlFor={form.name} className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                                            {form.label}
                                                        </label>
                                                        <textarea
                                                            id={form.name}
                                                            name={form.name}
                                                            rows={3}
                                                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                            placeholder={form.placeHolder}
                                                            required={form.required}
                                                            disabled={form.disabled}
                                                        />
                                                    </div>
                                                ) : (
                                                

                                                <div key={form.name}>
                                                    <label htmlFor={form.name} className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                                        {form.label}
                                                    </label>

                                                    <input
                                                        id={form.name}
                                                        name={form.name}
                                                        type={form.type}
                                                        autoComplete="text"
                                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                        placeholder={form.placeHolder}
                                                        required={form.required}
                                                        disabled={form.disabled}
                                                    />
                                                </div>
                                                )
                                            ))
                                        }
                                        <button
                                            type="submit"
                                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full mt-4"
                                        >
                                            Add
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null
            }
        </>
    );
}
