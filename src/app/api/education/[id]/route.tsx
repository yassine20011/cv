import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";


export async function DELETE(
    request: Request,
    { params }: { params: { id: number } }
) {

    const id = params.id as unknown as string;

    const session = await getServerSession();
    if (!session) {
        return new Response(null, { status: 401 });
    }


    try{
        await prisma.education.delete({
            where: {
                id: parseInt(id),
            },
        });
        
    } catch (e) {
        console.log(e);
        return new Response(null, { status: 500 });
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
    
    return new Response(JSON.stringify(education), { status: 200 });

}