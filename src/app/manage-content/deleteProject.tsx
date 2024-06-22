"use client"

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from 'sonner'

type project = {
    id: number;
    projectName: string;
    techStack: string[];
    projectDescription: string;
    url: string;
    resumeId: number;
}[]


type Props = {
    project: project;
}

function DeleteProject({ project }: Props) {
    const [deleted, setDeleted] = useState(false);
    const [projectData, setProjectData] = useState(project);

    const handleDelete = async (id: number) => {
        try {
            const response = await axios.delete(`/api/project/${id}`);
            setDeleted(true);
            if (response.status === 200) {
                setProjectData(response.data);
            }
        } catch (error) {
            toast.error("Failed to delete project");
        }
    }

    useEffect(() => {
        if (deleted) {
            toast.success("project deleted successfully");
            setDeleted(false);
        }
    }, [deleted]);

    type DateFormatOptions = {
        year: 'numeric' | '2-digit';
        month: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long';
        day: 'numeric' | '2-digit';
    };

    const formatDate = (date: Date): string => {
        const options: DateFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(date).toLocaleDateString('en-US', options);
    };

    return (
        <div className="space-y-4">
            <>
                {projectData.length === 0 ? (
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm border-2 border-gray-300 border-dashed">
                        <p>No project data available.</p>
                    </div>
                ) : (
                    projectData.map((item) => {
                        return (

                            <div key={`item-${item.id}`} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm border-2 border-gray-300 border-dashed">
                                <div>
                                    <h3 className="text-lg font-semibold">{item.projectName}</h3>
                                    <p className="text-gray-600">{item.projectDescription.length > 100 ? `${item.projectDescription.substring(0, 100)}...` : item.projectDescription}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <Button
                                        variant="destructive"
                                        className="mt-4"
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4">
                                            <path
                                                fill="#ffffff"
                                                d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
                                            />
                                        </svg>
                                    </Button>
                                </div>
                            </div>
                        )
                    })
                )}
            </>
        </div>
    );
}

export default DeleteProject;