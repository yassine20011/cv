"use client"

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from 'sonner'
import Modal from "../formComponents/modal";


type education = {
    id: number;
    instituteName: string;
    degree: string;
    startDate: Date;
    endDate: Date;
    resumeId: number;
}[]

type educationFormStructure = {
    type: string;
    label: string;
    name: string;
    placeHolder: string;
    required: boolean;
    disabled: boolean;
}[]

type Props = {
    education: education;
    educationFormStructure: educationFormStructure;
}

export default function EditEducation({ education, educationFormStructure }: Props) {

    const [deleted, setDeleted] = useState(false);
    const [educationData, setEducationData] = useState(education);

    const handleDelete = async (id: number) => {
        try {
            const response = await axios.delete(`/api/education/${id}`);
            setDeleted(true);
            if (response.status === 200) {
                setEducationData(response.data);
            }
        } catch (error) {
            toast.error("Failed to delete education");
        }
    }

    useEffect(() => {
        if (deleted) {
            toast.success("Education deleted successfully");
            setDeleted(false);
        }
    }, [deleted]);


    return (
        <>
            <div className="flex flex-col pt-2">
                {

                    educationData.map((item) => {


                        const educationStructure = educationFormStructure.map(formItem => ({
                            ...formItem,
                            defaultValue: formItem.name === "startDate" || formItem.name === "endDate" ?
                                (item[formItem.name] instanceof Date ? item[formItem.name].toISOString().split('T')[0] : item[formItem.name].toString()) :
                                item[formItem.name as keyof typeof item],
                            id: item.id
                        }));

                        console.log(educationStructure);

                        return (
                            <div className="flex flex-wrap" key={item.id}>
                                <Modal
                                    key={`modal-${item.id}`}
                                    buttonType="edit"
                                    buttonLabel="Education"
                                    name={`${item.instituteName}`}
                                    formStructure={educationStructure}
                                />
                                <Button
                                    key={`button-${item.id}`}
                                    variant="destructive"
                                    className="mt-4"
                                    onClick={() => handleDelete(item.id)}
                                >
                                    Delete
                                </Button>
                            </div>
                        );
                    })}
            </div>
        </>
    )

}