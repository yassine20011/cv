import Header from "@/components/header";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'
import DeleteEducation from "./deleteEducation";
import DeleteWork from "./deleteWork"
import DeleteProject from "./deleteProject";

export default async function page() {

	const session = await getServerSession();

	if (!session) {
		redirect('/auth/signin')
	}

	const user = await prisma.user.findUnique({
		where: {
			email: session?.user?.email ?? undefined,
		},
	});


	const education = await prisma.education.findMany({
		where: {
			resumeId: user?.id,
		},
	});



	const projects = await prisma.project.findMany({
		where: {
			resumeId: user?.id,
		},
	});

	const work = await prisma.work.findMany({
		where: {
			resumeId: user?.id,
		},
	});


	return (
		<>
			<Header />
			<div className="max-w-4xl mx-auto bg-white p-6">
				<h2 className="text-2xl font-bold mb-4">Manage Education</h2>
				<DeleteEducation education={education} />
				<br />
				<h2 className="text-2xl font-bold mb-4">Manage Work</h2>
				<DeleteWork work={work} />
				<br />
				<h2 className="text-2xl font-bold mb-4">Manage Projects</h2>
				<DeleteProject project={projects} />
			</div>
		</>
	);


}
