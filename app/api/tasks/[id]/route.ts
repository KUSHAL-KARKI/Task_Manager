import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export  async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
const {userId} = await auth();
const { id } = params;
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        if (!id) {
            return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
        }

        const task = await prisma.task.delete({
            where: {
                id
            },
        })

    return NextResponse.json(task);
    } catch (error) {
        console.error("Error in DELETE route:", error);
    }
    
}