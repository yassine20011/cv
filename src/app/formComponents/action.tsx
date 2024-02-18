"use server";

import { getServerSession } from "next-auth/next"
import { prisma } from "@/lib/prisma"
import { options } from "@/app/api/auth/[...nextauth]/options"

export const handleActionEducation = async (formdata: FormData) => {

    const session = await getServerSession(options)

    const user = await prisma.user.findUnique({
        where: {
            email: session?.user?.email ?? undefined
        }
    })

    const resume = await prisma.resume.findUnique({
        where: { id: user?.id },
    })

    const instituteName = formdata.get("instituteName") as string;
    const degree = formdata.get("degree") as string;
    const start = formdata.get("startDate") as string;
    const end = formdata.get("endDate") as string;
    const isoStartDate = new Date(start).toISOString();
    const isoEndDate = new Date(end).toISOString();

    if (!instituteName || !degree || !start || !end) {
        throw new Error("Invalid form data");
    }
    
    await prisma.education.create({
        data: {
            instituteName: instituteName,
            degree: degree,
            startDate: isoStartDate,
            endDate: isoEndDate,
            resume: {
                connect: { id: resume?.id },
            },
        },
    });

}

export const handleActionProject = async (formdata: FormData) => {

    try {
        const session = await getServerSession(options)

        const user = await prisma.user.findUnique({
            where: {
                email: session?.user?.email ?? undefined
            }
        })

        const resume = await prisma.resume.findUnique({
            where: { id: user?.id },
        })

        const techStack = formdata.get("TechStack") as string;
        const projectName = formdata.get("ProjectName") as string;
        const projectDescription = formdata.get("projectDescription") as string;
        const projectLink = formdata.get("ProjectLink") as string;


        if (!projectName || !projectDescription || !projectLink || !techStack) {
            throw new Error("Invalid form data");
        }


        await prisma.project.create({
            data: {
                projectName: projectName,
                projectDescription: projectDescription,
                url: projectLink,
                techStack: techStack.split(",").filter((tech) => tech !== ""),
                resume: {
                    connect: { id: resume?.id },
                },
            },
        });


    } catch (error) {
        throw new Error("Failed to add project");
    }
}   


export const handleActionExperience = async (formdata: FormData) => {

    const session = await getServerSession(options)

    const user = await prisma.user.findUnique({
        where: {
            email: session?.user?.email ?? undefined
        }
    })

    const resume = await prisma.resume.findUnique({
        where: { id: user?.id },
    })

    const start = formdata.get("startDate") as string;
    const end = formdata.get("endDate") as string;

    const isoStartDate = new Date(start).toISOString();
    const isoEndDate = new Date(end).toISOString();


    const badges = formdata.get("Badges") as string;
    const companyName = formdata.get("CompanyName") as string;
    const position = formdata.get("Position") as string;
    const jobDescription = formdata.get("jobDescription") as string;
    const companyWebsite = formdata.get("CompanyWebsite") as string;

    if (!companyName || !position || !jobDescription || !start || !end) {
        throw new Error("Invalid form data");
    }

    await prisma.work.create({
        data: {
            companyName: companyName,
            position: position,
            startDate: isoStartDate,
            endDate: isoEndDate,
            jobDescription: jobDescription,
            badges: badges.split(",").filter((badge) => badge !== ""),
            companyWebsite: companyWebsite,
            resume: {
                connect: { id: resume?.id },
            },
        },
    });
}