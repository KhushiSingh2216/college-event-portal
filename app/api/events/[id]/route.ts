import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

// ==================== GET EVENT BY ID ====================

export async function GET(
  req: NextRequest,
  { params }: Params
) {
  try {
    const { id } = await params;

    const event = await prisma.event.findUnique({
      where: {
        id,
      },
    });

    if (!event) {
      return NextResponse.json(
        { message: "Event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(event);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// ==================== UPDATE EVENT ====================

export async function PUT(
  req: NextRequest,
  { params }: Params
) {
  try {
    const { id } = await params;

    const body = await req.json();

    const updatedEvent = await prisma.event.update({
      where: {
        id,
      },
      data: {
        ...body,
        date: body.date ? new Date(body.date) : undefined,
        deadline: body.deadline
          ? new Date(body.deadline)
          : undefined,
      },
    });

    return NextResponse.json(updatedEvent);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// ==================== DELETE EVENT ====================

export async function DELETE(
  req: NextRequest,
  { params }: Params
) {
  try {
    const { id } = await params;

    await prisma.event.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "Event Deleted Successfully",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}