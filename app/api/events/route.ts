import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: {
        date: "asc",
      },
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      title,
      description,
      banner,
      category,
      venue,
      date,
      deadline,
      totalSeats,
    } = body;

    const event = await prisma.event.create({
      data: {
        title,
        description,
        banner,
        category,
        venue,
        date: new Date(date),
        deadline: new Date(deadline),
        totalSeats,
        availableSeats: totalSeats,
      },
    });

    return NextResponse.json(event, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}