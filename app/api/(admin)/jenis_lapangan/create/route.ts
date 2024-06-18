import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const verifyJWT = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string) as {
      email: string;
      id: string;
    };
  } catch (error) {
    throw new Error("Invalid token");
  }
};

export async function POST(req: NextRequest) {
  try {
    const authorization = req.headers.get("Authorization");
    console.log("Authorization Header:", authorization);
    if (!authorization) {
      return NextResponse.json(
        { status: 401, message: "Unauthorized: Token is required" },
        { status: 401 }
      );
    }

    let token = authorization
    const decodedToken = verifyJWT(token);

    if (!decodedToken) {
      return NextResponse.json(
        { status: 401, message: "Unauthorized: Invalid token" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { jenis_lapangan } = body;

    if (!jenis_lapangan) {
      return NextResponse.json(
        { status: 400, message: "Bad Request: 'jenis_lapangan' is required" },
        { status: 400 }
      );
    }

    await prisma.jenisLapangan.create({
      data: {
        jenis_lapangan,
      },
    });

    return NextResponse.json(
      { status: 200, message: "Jenis lapangan created successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: 500, message: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
