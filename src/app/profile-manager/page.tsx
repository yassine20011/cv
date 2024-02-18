import Header from "@/components/header";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'
import Modal from "../formComponents/modal";
import { experienceFormStructure, educationFormStructure, projectFormStructure } from "@/app/formComponents/inputs";
import EditEducation from "./clientSide";


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
			<section>
				<div className="container mx-auto px-6 py-12 h-full flex justify-center items-center">
					<div className="md:w-8/12 lg:w-5/12 bg-white">
						<div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
							<h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
								Here you can edit your resume or delete some of your details
							</h2>
							<EditEducation education={education} educationFormStructure={educationFormStructure} />
						</div>

					</div>
				</div>
			</section>
		</>
	);


}
