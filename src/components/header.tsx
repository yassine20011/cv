import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { prisma } from "@/lib/prisma"
import { Nav } from './headerComponents'


async function Page() {

    const session = await getServerSession();
    
    if (session) {

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

        const Usertabs = [
            { name: 'Personal Details', href: '/personal-details' },
            { name: 'Preview', href: `/preview/${resume?.subdomain}` },
            { name: 'Demo', href: '/demo' },
        ]

        return (
            <header className="bg-white">
                <Nav tabs={Usertabs} />
            </header>
        )
    }
    else {

        const AnonymousUserTabs = [
            { name: 'Home', href: '/' },
            { name: 'Demo', href: '/demo'}
        ]

        return (
            <header className="bg-white">
                <Nav tabs={AnonymousUserTabs} />
            </header>

        )
    }
}

export default Page
