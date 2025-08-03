import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    const { id } = await params;
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!id) {
      return NextResponse.json(
        { error: "Task ID is required" },
        { status: 400 }
      );
    }

    const task = await prisma.task.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.error("Error in DELETE route:", error);
    return NextResponse.json({ error: "Error deleting task" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    const { id } = await params;
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    const { title, description, date, completed, isImportant } = body;
    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        title,
        description,
        date,
        isCompleted: completed,
        isImportant,
        userId,
      },
    });
    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error("Error in PUT route:", error);
    return NextResponse.json({ error: "Error updating task" }, { status: 500 });
  }
}