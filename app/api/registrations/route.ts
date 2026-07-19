import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { userId, eventId } = await req.json();

    if (!userId || !eventId) {
      return NextResponse.json(
        { message: "User ID and Event ID are required" },
        { status: 400 }
      );
    }

    // Check user exists
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Check event exists
    const event = await prisma.event.findUnique({
      where: {
        id: eventId,
      },
    });

    if (!event) {
      return NextResponse.json(
        { message: "Event not found" },
        { status: 404 }
      );
    }

    // Check deadline
    if (new Date() > event.deadline) {
      return NextResponse.json(
        { message: "Registration deadline has passed" },
        { status: 400 }
      );
    }

    // Check seats
    if (event.availableSeats <= 0) {
      return NextResponse.json(
        { message: "No seats available" },
        { status: 400 }
      );
    }

    // Check already registered
    const existingRegistration = await prisma.registration.findUnique({
      where: {
        userId_eventId: {
          userId,
          eventId,
        },
      },
    });

    if (existingRegistration) {
      return NextResponse.json(
        { message: "Already Registered" },
        { status: 400 }
      );
    }

    // Create registration
    const registration = await prisma.registration.create({
      data: {
        userId,
        eventId,
      },
    });

    // Reduce available seats
    await prisma.event.update({
      where: {
        id: eventId,
      },
      data: {
        availableSeats: {
          decrement: 1,
        },
      },
    });

    return NextResponse.json(
      {
        message: "Registration Successful",
        registration,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const userId = searchParams.get("userId");

    const registrations = await prisma.registration.findMany({
      where: userId
        ? {
            userId,
          }
        : undefined,

      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        event: true,
      },
    });

    return NextResponse.json(registrations);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}