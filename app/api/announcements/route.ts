import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Create Announcement
export async function POST(req: NextRequest) {
  try {
    const { title, message } = await req.json();

    if (!title || !message) {
      return NextResponse.json(
        { message: "Title and Message are required" },
        { status: 400 }
      );
    }

    const announcement = await prisma.announcement.create({
      data: {
        title,
        message,
      },
    });

    return NextResponse.json(announcement, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Get All Announcements
export async function GET() {
  try {
    const announcements = await prisma.announcement.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(announcements);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}