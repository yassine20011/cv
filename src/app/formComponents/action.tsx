"use server";

import { getServerSession } from "next-auth/next"
import { prisma } from "@/lib/prisma"
import { options } from "@/app/api/auth/[...nextauth]/options"

export const handleActionEducation = async (formdata : FormData) => {

    const session = await getServerSession(options)

    const user = await prisma.user.findUnique({
        where: {
            email: session?.user?.email ?? undefined
        }
    })

    const resume = await prisma.resume.findUnique({
        where: { id: user?.id },
    })

    await prisma.education.create({
        data: {
            school: formdata.get("instituteName") as string,
            degree: formdata.get("degree") as string,
            start: formdata.get("startDate") as string,
            end: formdata.get("endDate") as string,
            resume: {
                connect: { id: resume?.id },
            },
        },
    });
}

export const handleActionProject = async (formdata : FormData) => {
    
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

        await prisma.project.create({
            data: {
                title: formdata.get("ProjectName") as string,
                techStack: techStack.split(",").filter((tech) => tech !== ""),
                description: formdata.get("projectDescription") as string,
                link: formdata.get("ProjectLink") as string,
                logo: formdata.get("projectLogo") as string,
                resume: {
                    connect: { id: resume?.id },
                },
            },
        });
    }


export const handleActionExperience = async (formdata : FormData) => {
    
        const session = await getServerSession(options)
    
        const user = await prisma.user.findUnique({
            where: {
                email: session?.user?.email ?? undefined
            }
        })
    
        const resume = await prisma.resume.findUnique({
            where: { id: user?.id },
        })
    
        await prisma.work.create({
            data: {
                company: formdata.get("CompanyName") as string,
                link: formdata.get("CompanyWebsite") as string,
                title: formdata.get("Position") as string,
                start: formdata.get("startDate") as string,
                end: formdata.get("endDate") as string,
                description: formdata.get("jobDescription") as string,
                resume: {
                    connect: { id: resume?.id },
                },
            },
        });
    }