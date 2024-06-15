import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import Header from "@/components/header";
import { handleAction } from "./action";
import Modal from "../formComponents/modal";
import { getServerSession } from "next-auth/next";
import Submit from "./submit";
import FileDropzone from './upload';
import { redirect } from 'next/navigation'
import { experienceFormStructure, educationFormStructure, projectFormStructure } from "@/app/formComponents/inputs";


export const metadata: Metadata = {
  title: "Resume Maker | Generate your own resume online",
  description: `Generate your own resume online`,
};

export default async function Page() {

  const session = await getServerSession();

  if (!session) {
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
      type: "tel",
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
      required: false,
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
      placeHolder: "A short summary about yourself",
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
      defaultValue: resume?.github ?? ""
    },
    {
      type: "url",
      label: "Your LinkedIn",
      name: "linkedin",
      placeHolder: "Enter your LinkedIn link",
      required: false,
      disabled: false,
      longText: false,
      defaultValue: resume?.linkedin ?? ""
    },
    {
      type: "url",
      label: "Your Twitter",
      name: "twitter",
      placeHolder: "Enter your Twitter link",
      required: false,
      disabled: false,
      longText: false,
      defaultValue: resume?.twitter ?? ""
    }
  ];




  return (
    <>
      <Header />
      <section>
        <div className="container mx-auto px-6 py-12 h-full flex justify-center items-center">
          <div className="md:w-8/12 lg:w-5/12 bg-white">

            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
              <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                Fill the form to generate your resume
              </h2>

              <div className="flex flex-col pt-2">
                <Modal buttonType="add" buttonLabel="Experience" formStructure={experienceFormStructure} />
                <Modal buttonType="add" buttonLabel="Education" formStructure={educationFormStructure} />
                <Modal buttonType="add" buttonLabel="Project" formStructure={projectFormStructure} />
              </div>
              <form action={handleAction} className="space-y-6 pt-6">
                <FileDropzone />
                {
                  formStructure.map((form) => (
                    <div key={form.name}>
                      <label htmlFor={form.name} className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        {form.label} <span className="text-red-400">
                          {form.required ? "*" : ""}
                        </span>
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