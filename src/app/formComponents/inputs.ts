export const educationFormStructure = [
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
      type: "date",
      label: "Start Date",
      name: "startDate",
      placeHolder: "E.g. 2018",
      required: true,
      disabled: false,
    },
    {
      type: "date",
      label: "End Date",
      name: "endDate",
      placeHolder: "E.g. 2022",
      required: true,
      disabled: false,
    },
  ];


  export const experienceFormStructure = [
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
      label: "Badges",
      name: "Badges",
      placeHolder: "E.g. Hybrid, Remote, Full-time(Comma separated)",
      required: false,
      disabled: false,
    },
    {
      type: "date",
      label: "Start Date",
      name: "startDate",
      placeHolder: "E.g. 2018/01/01",
      required: true,
      disabled: false,
    },
    {
      type: "date",
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


  export const projectFormStructure = [
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
  ]
