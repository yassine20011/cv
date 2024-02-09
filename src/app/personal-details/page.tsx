import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { handleAction } from "./action";
import Modal from "../formComponents/modal";
import { getServerSession } from "next-auth/next";
import Submit from "./clientSide";
import { redirect  } from 'next/navigation'

export const metadata: Metadata = {
  title: "Resume Maker | Generate your own resume online",
  description: `Generate your own resume online`,
};

export default async function Page() {

  const session = await getServerSession();

  if(!session) {
    redirect("/auth/signin");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email ?? undefined,
    },
  });

  const resume = await prisma.resume.findFirst({
    where: {
      userId: user?.id,
    },
  });


  const formStructure = [
    {
      type: "text",
      label: "Full Name",
      name: "name",
      placeHolder: "Enter your full name",
      required: true,
      disabled: false,
      longText: false,
      defaultValue: resume?.name ?? ""
    },
    {
      type: "text",
      label: "Email",
      name: "email",
      placeHolder: "Enter your email address",
      required: true,
      disabled: false,
      longText: false,
      defaultValue: resume?.email ?? ""
    },
    {
      type: "text",
      label: "Phone",
      name: "phone",
      placeHolder: "Enter your phone number",
      required: true,
      disabled: false,
      longText: false,
      defaultValue: resume?.tel ?? ""
    },
    {
      type: "text",
      label: "location",
      name: "location",
      placeHolder: "Enter your location",
      required: true,
      disabled: false,
      longText: false,
      defaultValue: resume?.location ?? ""
    },
    {
      type: "url",
      label: "location link",
      name: "locationLink",
      placeHolder: "Enter your location link (google maps)",
      required: true,
      disabled: false,
      longText: false,
      defaultValue: resume?.locationLink ?? ""
    },
    {
      type: "text",
      label: "About",
      name: "about",
      placeHolder: "A short description about yourself",
      required: true,
      disabled: false,
      longText: false,
      defaultValue: resume?.about ?? ""
    },
    {
      type: "text",
      label: "Summary",
      name: "summary",
      placeHolder: "Enter your pincode",
      required: true,
      disabled: false,
      longText: true,
      defaultValue: resume?.summary ?? ""
    },
    {
      type: "text",
      label: "Skills",
      name: "skills",
      placeHolder: "E.g. React, Node, MongoDB(Comma separated)",
      required: false,
      disabled: false,
      longText: false,
      defaultValue: resume?.skills.join(",") ?? ""
    },
    {
      type: "url",
      label: "your portfolio",
      name: "portfolio",
      placeHolder: "Enter your portfolio link",
      required: false,
      disabled: false,
      longText: false,
      defaultValue: resume?.personalWebsiteUrl ?? ""
    },
    {
      type: "url",
      label: "Your Github",
      name: "github",
      placeHolder: "Enter your Github link",
      required: false,
      disabled: false,
      longText: false,
      defaultValue: ""
    },
    {
      type: "url",
      label: "Your LinkedIn",
      name: "linkedin",
      placeHolder: "Enter your LinkedIn link",
      required: false,
      disabled: false,
      longText: false,
      defaultValue: ""
    },
    {
      type: "url",
      label: "Your Twitter",
      name: "twitter",
      placeHolder: "Enter your Twitter link",
      required: false,
      disabled: false,
      longText: false,    
      defaultValue: ""
    }
  ];


  const Education = [
    {
      type: "text",
      label: "Institute Name",
      name: "instituteName",
      placeHolder: "Enter your Institute Name",
      required: true,
      disabled: false,
    },
    {
      type: "text",
      label: "Degree",
      name: "degree",
      placeHolder: "E.g. Software Engineering",
      required: true,
      disabled: false,
    },
    {
      type: "text",
      label: "Start Date",
      name: "startDate",
      placeHolder: "E.g. 2018",
      required: true,
      disabled: false,
    },
    {
      type: "text",
      label: "End Date",
      name: "endDate",
      placeHolder: "E.g. 2022",
      required: true,
      disabled: false,
    },
  ];


  const Experience = [
    {
      type: "text",
      label: "Company Name",
      name: "CompanyName",
      placeHolder: "Entre your Company Name",
      required: true,
      disabled: false,
    },
    {
      type: "text",
      label: "Position",
      name: "Position",
      placeHolder: "E.g. Software Engineer",
      required: true,
      disabled: false,
    }
    ,
    {
      type: "url",
      label: "Company Website",
      name: "CompanyWebsite",
      placeHolder: "E.g. https://www.google.com",
      required: false,
      disabled: false,
    },
    {
      type: "text",
      label: "Start Date",
      name: "startDate",
      placeHolder: "E.g. 2018/01/01",
      required: true,
      disabled: false,
    },
    {
      type: "text",
      label: "End Date",
      name: "endDate",
      placeHolder: "E.g. 2018/06/09",
      required: true,
      disabled: false,
    },
    {
      type: "text",
      label: "Description",
      name: "jobDescription",
      placeHolder: "E.g. I worked on the front end of the application...",
      required: true,
      disabled: false,
      longText: true,
    }
  ]


  const Project = [
    {
      type: "text",
      label: "Project Name",
      name: "ProjectName",
      placeHolder: "Entre your Project Name",
      required: true,
      disabled: false,
    },
    {
      type: "text",
      label: "Description",
      name: "projectDescription",
      placeHolder: "E.g. A web application that allows users to...",
      required: true,
      disabled: false,
      longText: true,
    },
    {
      type: "text",
      label: "Tech Stack",
      name: "TechStack",
      placeHolder: "E.g. React, Node, MongoDB(Comma separated)",
      required: true,
      disabled: false,
    }, {
      type: "url",
      label: "Project Link",
      name: "ProjectLink",
      placeHolder: "E.g. https://www.github.com",
      required: true,
      disabled: false,
    },
    {
      type: "url",
      label: "logo",
      name: "projectLogo",
      placeHolder: "E.g. https://www.projectLogo.com",
      required: false,
      disabled: false,
    },
  ]


  return (
    <>
      <Header />
      <section className="bg-ct-blue-600 min-h-screen">
        <div className="container mx-auto px-6 py-12 h-full flex justify-center items-center">
          <div className="md:w-8/12 lg:w-5/12 bg-white">

            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
              <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                Fill the form to generate your resume
              </h2>

              <div className="flex flex-col pt-2">
                <Modal name="Experience" formStructure={Experience} />
                <Modal name="Education" formStructure={Education} />
                <Modal name="Project" formStructure={Project} />
              </div>

              <form action={handleAction} className="space-y-6 pt-2">
                {
                  formStructure.map((form) => (
                    <div key={form.name}>
                      <label htmlFor={form.name} className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        {form.label}
                      </label>
                      {
                        form.longText ? (
                          <textarea
                            id={form.name}
                            name={form.name}
                            rows={3}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder={form.placeHolder}
                            required={form.required}
                            disabled={form.disabled}
                            defaultValue={form.defaultValue}
                          />
                        ) : (
                          <input
                            type={form.type}
                            name={form.name}
                            id={form.name}
                            autoComplete={form.name}
                            placeholder={form.placeHolder}
                            required={form.required}
                            disabled={form.disabled}
                            defaultValue={form.defaultValue}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          />
                        )
                      }
                    </div>
                  ))
                }

                <Submit />
              </form>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
