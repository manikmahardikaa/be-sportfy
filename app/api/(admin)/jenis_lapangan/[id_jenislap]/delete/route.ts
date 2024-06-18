import prisma from "@/app/lib/prisma";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

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

export async function DELETE(req: Request, { params }: { params: { id_jenislap: string } }) {
  const { id_jenislap } = params;
    try {
        const authorization = req.headers.get("Authorization");
    if (!authorization) {
      return NextResponse.json(
        { status: 401, message: "Unauthorized: Token is required" },
        { status: 401 }
      );
    }

    let token = authorization;
    const decodedToken = verifyJWT(token);

    if (!decodedToken) {
      return NextResponse.json(
        { status: 401, message: "Unauthorized: Invalid token" },
        { status: 401 }
      );
    }

    await prisma.jenisLapangan.delete({
      where: {
        id_jenislap: Number(id_jenislap)
      }
    });
    return NextResponse.json(
      { status: 200, message: "Delete Success" },
      { status: 200 }
    );
    }catch (error) {
      return NextResponse.json(
        { status: 500, message: "Internal Server Error" },
        { status: 500 }
      );
    }finally {
      await prisma.$disconnect();
    }
}