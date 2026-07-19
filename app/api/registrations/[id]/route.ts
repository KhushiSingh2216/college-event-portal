import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const registration = await prisma.registration.findUnique({
      where: {
        id,
      },
    });

    if (!registration) {
      return NextResponse.json(
        { message: "Registration not found" },
        { status: 404 }
      );
    }

    // Increase available seats
    await prisma.event.update({
      where: {
        id: registration.eventId,
      },
      data: {
        availableSeats: {
          increment: 1,
        },
      },
    });

    // Delete registration
    await prisma.registration.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "Registration Cancelled Successfully",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}