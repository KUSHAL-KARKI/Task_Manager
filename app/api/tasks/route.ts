import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/app/utils/connect";
// create a task
export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }
    const { title, description, date, completed, important } = await req.json();
    console.log("Creating task for user:", userId);
    console.log("Task details:", {
      title,
      description,
      date,
      completed,
      important,
    });
    if (!title || !description || !date) {
      return NextResponse.json({
        error: "Missing required fields",
        status: 400,
      });
    }
    if (title.length < 3) {
      return NextResponse.json({
        error: "Title must be at least 3 characters long",
        status: 400,
      });
    }
    const task = await prisma.task.create({
      data: {
        title,
        description,
        date,
        isCompleted: completed,
        isImportant: important,
        userId,
      },
    });
    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json({ error: "error in creating task", status: 500 });
  }
}

// get all tasks
export async function GET(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }
    const tasks = await prisma.task.findMany({
      where: {
        userId,
      },
    });
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json({ error: "error in getting tasks", status: 500 });
  }
}

// update a task
export async function PUT(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }
    const { isCompleted, id } = await req.json();

    const task = await prisma.task.update({
      where: { id },
      data: {
        isCompleted,
      },
    });
    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json({ error: "error in updating tasks", status: 500 });
  }
}
