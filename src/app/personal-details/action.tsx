"use server";

import { getServerSession } from "next-auth/next"
import { prisma } from "@/lib/prisma"
import { options } from "../api/auth/[...nextauth]/options"

export const handleAction = async (formdata: FormData) => {

    const session = await getServerSession(options)

    const user = await prisma.user.findUnique({
        where: {
            email: session?.user?.email ?? undefined
        }
    })

    if (!user) {
        throw new Error("User not found")
    }

    const skills = formdata.get("skills") as string;
    const name = formdata.get("name") as string;

    try {

        await prisma.resume.update({
            where: {
                id: user.id
            },
            data: {
                name: name,
                subdomain: name.split(" ").join("-").toLowerCase(),
                initials: name.split(" ").map((n) => n[0]).join(""), // e.g. John Doe -> JD
                tel: formdata.get("phone") as string,
                location: formdata.get("location") as string,
                locationLink: formdata.get("locationLink") as string,
                about: formdata.get("about") as string,
                summary: formdata.get("summary") as string,
                personalWebsiteUrl: formdata.get("portfolio") as string,
                email: formdata.get("email") as string,
                skills: skills.split(",").filter((s) => s !== ""), // remove empty strings
                linkedin: formdata.get("linkedin") as string,
                github: formdata.get("github") as string,
                twitter: formdata.get("twitter") as string,
            }
        })
    } catch (error) {
        console.error(error)
        throw new Error("Error updating resume")
    }
}