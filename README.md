# Minimalist CV with a User-Friendly Layout

This project is a fork of [cv](https://github.com/BartoszJarocki/cv.git), originally licensed under the MIT License by [@BartoszJarocki](https://github.com/BartoszJarocki). See the [ORIGINAL_LICENSE.txt](./ORIGINAL_LICENSE.txt) for details.

I have converted the project to be more user-friendly and added several features. This project aims to provide a minimalist CV that is easy to set up and use, even for non-developers.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [TODO](#todo)
- [Contributing](#contributing)
- [Credits](#credits)
- [License](#license)

## Features

- Authenticated users can create their own CV (using next-auth)
- Fully responsive (works on all devices)
- Three pages: Personal Details, Manage Content, and Preview
- Easy to use and set up
- Wildcard subdomain for each user
- Users can download their CV as a PDF
- Clean User Interface

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- next-auth
- Prisma with PostgreSQL
- Vercel (for deployment)
- Cloudinary (for image upload)
- Aiven (for PostgreSQL database)
- Cloudflare (for DNS, SSL, and wildcard subdomain)
- GitHub Actions (for CI/CD)

## Installation

To install the project, follow these steps:

1. Clone the project:

    ```bash
    git clone <project-url>
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Create a `.env.local` file in the root directory and add the following environment variables:

    ```env
    DATABASE_URL=postgres://username:password@host:port/dbname

    # Cloudinary credentials
    CLOUDINARY_CLOUD_NAME=<cloudinary_cloud_name>
    CLOUDINARY_API_KEY=<cloudinary_api_key>
    CLOUDINARY_API_SECRET=<cloudinary_api_secret>

    # Auth credentials
    NEXTAUTH_SECRET=<nextauth_secret>
    GOOGLE_CLIENT_ID=<google_client_id>
    GOOGLE_CLIENT_SECRET=<google_client_secret>
    GITHUB_CLIENT_ID=<github_client_id>
    GITHUB_CLIENT_SECRET=<github_client_secret>
    NEXTAUTH_URL=http://localhost:3000
    NODE_ENV=development
    ```

4. Run the migrations:

    ```bash
    npx prisma migrate dev
    ```

5. Run the project:

    ```bash
    npm run dev
    ```

If you have Docker installed, you can use the `docker-compose.yaml` to create a PostgreSQL database:

    ```bash
    docker-compose start
    ```

## TODO

- [x] Setup next-auth
- [x] Setup Prisma with PostgreSQL
- [x] Setup Cloudinary
- [x] Setup Aiven
- [x] Setup Cloudflare
- [x] Setup GitHub Actions
- [x] Add wildcard subdomain
- [x] Add personal details page
- [x] Add buttons to add Experience, Education, and Projects on personal details page
- [x] Add manage content page
- [x] Add/remove buttons Experience, Education, and Projects on manage content page
- [ ] Add edit buttons Experience, Education, and Projects on manage content page
- [x] Add preview page
- [x] Add download as PDF button (already exists)
- [ ] Add more themes

## Contributing

If you want to contribute to this project, you can fork the project and create a pull request. I will review the pull request and merge it if it is good.

## Credits

- [BartoszJarocki](https://github.com/BartoszJarocki) for the original project

## License

This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for details.
