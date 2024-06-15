"use server";

import { getServerSession } from "next-auth/next"
import { prisma } from "@/lib/prisma"
import { options } from "../api/auth/[...nextauth]/options"
import cloudinary from "@/lib/cloudinary";
import fs from 'fs';

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

    // uploading avatar to cloudinary
    const avatar = formdata.get("avatar") as File;
    if (avatar.size != 0) {

        const fileBuffer = Buffer.from(await avatar.arrayBuffer());
        const fileName = avatar.name;
        const tempPath = `/tmp/${fileName}`;
        fs.writeFileSync(tempPath, fileBuffer);
        try {
            const uploadResult = await cloudinary.uploader.upload(tempPath, {
                public_id: name
            })
            await prisma.resume.update({
                where: {
                    id: user.id
                },
                data: {
                    avatarUrl: uploadResult.secure_url
                }
            })
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error("An unknown error occurred");
            }
        }
        fs.unlinkSync(tempPath);
    }

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
        console.log(error)
    }
}