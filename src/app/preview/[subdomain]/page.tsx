import React from 'react';
import { prisma } from '@/lib/prisma';


import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CommandMenu } from "@/components/command-menu";
import { Section } from "@/components/ui/section";
import { GlobeIcon, MailIcon, PhoneIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/project-card";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/icons";
import Link from 'next/link';
import type { Metadata } from 'next'
import { CldImage } from 'next-cloudinary';


type Props = {
    params: { subdomain: string };
}

export async function generateMetadata({ params }: Props,
): Promise<Metadata> {

    const decodeName = decodeURIComponent(params.subdomain);
    // check name exists in db
    const resume = await prisma.resume.findUnique({
        where: {
            subdomain: decodeName,
        },
        include: {
            education: true,
            work: true,
            projects: true,
        },
    },
    );
    if (!resume) {
        // no resume found
        return {
            title: `404 | Resume not found`,
            description: "The resume you are seeking does not exist. If you believe this is an error, please contact us.",
        };
    }

    return {
        title: `${resume.name} | ${resume.about}`,
        description: resume.summary,
    };
}


export default async function Page({ params }: { params: { subdomain: string } }) {




    const decodeName = decodeURIComponent(params.subdomain);


    // check name exists in db
    const resume = await prisma.resume.findUnique({
        where: {
            subdomain: decodeName,
        },
        include: {
            education: true,
            work: true,
            projects: true,
        },
    },
    );




    if (!resume) {
        // no resume found
        return (
            <section className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                    <div className="mx-auto max-w-screen-sm text-center">
                        <h1 className="mb-4 text-6xl font-bold text-gray-900 md:text-8xl dark:text-white">
                            404
                        </h1>
                        <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
                            No resume found
                        </p>
                        <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                            The resume you are seeking does not exist. If you believe this is an error, please contact us.
                        </p>
                        <Link href="/" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 mt-4">
                            Go back home
                        </Link>
                    </div>
                </div>
            </section>

        );
    }


    const RESUME_DATA = {
        name: resume?.name ?? "",
        initials: resume?.initials ?? "",
        location: resume?.location ?? "",
        locationLink: resume?.locationLink ?? "",
        about: resume?.about ?? "",
        summary: resume?.summary ?? "",
        avatarUrl: resume?.avatarUrl ?? "",
        personalWebsiteUrl: resume?.personalWebsiteUrl ?? "",
        contact: {
            email: resume?.email ?? "",
            tel: resume?.tel ?? "",
            social: [
                {
                    name: "GitHub",
                    url: resume?.github ?? "",
                    icon: GitHubIcon,
                },
                {
                    name: "LinkedIn",
                    url: resume?.linkedin ?? "",
                    icon: LinkedInIcon,
                },
                {
                    name: "X",
                    url: resume?.twitter ?? "",
                    icon: XIcon,
                },
            ],
        },
        education: resume?.education.map((education) => ({
            school: education.instituteName,
            degree: education.degree,
            start: education.startDate,
            end: education.endDate
        })),
        work: resume?.work.map((work) => ({
            company: work.companyName,
            title: work.position,
            start: work.startDate,
            end: work.endDate,
            badges: work.badges,
            description: work.jobDescription,
            link: work.companyWebsite,
        })),
        projects: resume?.projects.map((project) => ({
            title: project.projectName,
            description: project.projectDescription,
            techStack: project.techStack,
            link: project.url,
        })),
        skills: resume?.skills,
    };

    RESUME_DATA.work?.sort((a, b) => {
        return new Date(b.start).getTime() - new Date(a.start).getTime();
    });

    RESUME_DATA.education?.sort((a, b) => {
        return new Date(b.start).getTime() - new Date(a.start).getTime();
    });

    const differenceInMonths = (date1: any, date2: any) => {
        const diff = date1.getTime() - date2.getTime();
        return Math.round(diff / (1000 * 60 * 60 * 24 * 30));
    };



    return (<>
        <main className="container relative mx-auto scroll-my-12 overflow-auto p-4 print:p-12 md:p-16">
            <section className="mx-auto w-full max-w-2xl space-y-8 bg-white print:space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex-1 space-y-1.5">
                        <h1 className="text-2xl font-bold">{RESUME_DATA.name}</h1>
                        <p className="max-w-md text-pretty font-mono text-sm text-muted-foreground">
                            {RESUME_DATA.about}
                        </p>
                        <p className="max-w-md items-center text-pretty font-mono text-xs text-muted-foreground">
                            <a
                                className="inline-flex gap-x-1.5 align-baseline leading-none hover:underline"
                                href={RESUME_DATA.locationLink}
                                target="_blank"
                            >
                                <GlobeIcon className="h-3 w-3" />
                                {RESUME_DATA.location}
                            </a>
                        </p>
                        <div className="flex gap-x-1 pt-1 font-mono text-sm text-muted-foreground print:hidden">
                            {RESUME_DATA.contact.email ? (
                                <Button
                                    className="h-8 w-8"
                                    variant="outline"
                                    size="icon"
                                    asChild
                                >
                                    <a href={`mailto:${RESUME_DATA.contact.email}`}>
                                        <MailIcon className="h-4 w-4" />
                                    </a>
                                </Button>
                            ) : null}
                            {RESUME_DATA.contact.tel ? (
                                <Button
                                    className="h-8 w-8"
                                    variant="outline"
                                    size="icon"
                                    asChild
                                >
                                    <a href={`tel:${RESUME_DATA.contact.tel}`}>
                                        <PhoneIcon className="h-4 w-4" />
                                    </a>
                                </Button>
                            ) : null}
                            {RESUME_DATA.contact.social.map((social) => (
                                <Button
                                    key={social.name}
                                    className="h-8 w-8"
                                    variant="outline"
                                    size="icon"
                                    asChild
                                >
                                    <a href={social.url}>
                                        <social.icon className="h-4 w-4" />
                                    </a>
                                </Button>
                            ))}
                        </div>
                        <div className="hidden flex-col gap-x-1 font-mono text-sm text-muted-foreground print:flex">
                            {RESUME_DATA.contact.email ? (
                                <a href={`mailto:${RESUME_DATA.contact.email}`}>
                                    <span className="underline">{RESUME_DATA.contact.email}</span>
                                </a>
                            ) : null}
                            {RESUME_DATA.contact.tel ? (
                                <a href={`tel:${RESUME_DATA.contact.tel}`}>
                                    <span className="underline">{RESUME_DATA.contact.tel}</span>
                                </a>
                            ) : null}
                        </div>
                    </div>

                    <Avatar className="h-28 w-28 border-2 border-grey-400">
                        <AvatarImage alt={RESUME_DATA.name} src={RESUME_DATA.avatarUrl} />
                        <AvatarFallback>{RESUME_DATA.initials}</AvatarFallback>
                    </Avatar>
                </div>
                <Section>
                    <h2 className="text-xl font-bold">About</h2>
                    <p className="text-pretty font-mono text-sm text-muted-foreground">
                        {RESUME_DATA.summary}
                    </p>
                </Section>


                {RESUME_DATA.work.length > 0 && (
                    <Section>
                        <h2 className="text-xl font-bold">Work Experience</h2>
                        {RESUME_DATA.work?.map((work) => {

                            const monthsDifference = differenceInMonths(work.end, work.start);
                            const duration = monthsDifference >= 12 ? `${Math.floor(monthsDifference / 12)} years` : `${monthsDifference} months`;

                            return (
                                <Card key={work.company}>
                                    <CardHeader>
                                        <div className="flex items-center justify-between gap-x-2 text-base">
                                            <h3 className="inline-flex items-center justify-center gap-x-1 font-semibold leading-none">
                                                <a className="hover:underline" href={work.link}>
                                                    {work.company}
                                                </a>

                                                <span className="inline-flex gap-x-1">
                                                    {work.badges.map((badge) => (
                                                        <Badge
                                                            variant="secondary"
                                                            className="align-middle text-xs"
                                                            key={badge}
                                                        >
                                                            {badge}
                                                        </Badge>
                                                    ))}
                                                </span>
                                            </h3>
                                            <div className="text-sm tabular-nums text-gray-500">
                                                {
                                                    work.start.toLocaleDateString(undefined, {
                                                        year: "numeric",
                                                    })
                                                } - {
                                                    work.end.toLocaleDateString(undefined, {
                                                        year: "numeric",
                                                    })
                                                } ({duration})
                                            </div>
                                        </div>

                                        <h4 className="font-mono text-sm leading-none">
                                            {work.title}
                                        </h4>
                                    </CardHeader>
                                    <CardContent className="mt-2 text-xs">
                                        {work.description}
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </Section>

                )
                }

                {
                    RESUME_DATA.education?.length > 0 &&
                    (
                        <Section>
                            <h2 className="text-xl font-bold">Education</h2>
                            {RESUME_DATA.education?.map((education) => {
                                const monthsDifference = differenceInMonths(education.end, education.start);
                                const duration = monthsDifference >= 12 ? `${Math.floor(monthsDifference / 12)} years` : `${monthsDifference} months`;

                                return (
                                    <Card key={education.school}>
                                        <CardHeader>
                                            <div className="flex items-center justify-between gap-x-2 text-base">
                                                <h3 className="font-semibold leading-none">
                                                    {education.school}
                                                </h3>

                                                <div className="text-sm tabular-nums text-gray-500">
                                                    {
                                                        education.start.toLocaleDateString(undefined, {
                                                            year: "numeric",
                                                        })
                                                    } - {
                                                        education.end.toLocaleDateString(undefined, {
                                                            year: "numeric",
                                                        })
                                                    } ({duration})
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="mt-2">{education.degree}</CardContent>
                                    </Card>
                                );
                            })}
                        </Section>
                    )
                }

                {
                    RESUME_DATA.skills?.length > 0 &&
                    (
                        <Section>
                            <h2 className="text-xl font-bold">Skills</h2>
                            <div className="flex flex-wrap gap-1">
                                {RESUME_DATA.skills?.map((skill) => {
                                    return <Badge key={skill}>{skill}</Badge>;
                                })}
                            </div>
                        </Section>
                    )
                }



                {
                    RESUME_DATA.projects?.length > 0 &&
                    (
                        <Section>
                            <h2 className="text-xl font-bold">Projects</h2>
                            <div className="-mx-3 grid grid-cols-1 gap-3 print:grid-cols-3 print:gap-2 md:grid-cols-2 lg:grid-cols-3">
                                {RESUME_DATA.projects?.map((project) => {
                                    return (
                                        <ProjectCard
                                            key={project.title}
                                            title={project.title}
                                            description={project.description}
                                            tags={project.techStack}
                                            link={"link" in project ? project.link : undefined}
                                        />
                                    );
                                })}
                            </div>
                        </Section>
                    )
                }

            </section>

            <CommandMenu
                links={[
                    {
                        url: RESUME_DATA.personalWebsiteUrl,
                        title: "Personal Website",
                    },
                    ...RESUME_DATA.contact.social.map((socialMediaLink) => ({
                        url: socialMediaLink.url,
                        title: socialMediaLink.name,
                    })),
                ]}
            />
        </main>

    </>);
}

