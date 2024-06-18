import prisma from "@/app/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nama_pengguna, email, kata_sandi } = body;

    if (!email || !nama_pengguna || !kata_sandi) {
      return NextResponse.json({
        error: "Please provide all required fields",
      });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(kata_sandi, 10);

    const newUser = await prisma.user.create({
      data: {
        nama_penguna: nama_pengguna,
        email,
        kata_sandi: hashedPassword,
      },
    });


    return NextResponse.json({
      message: "User registered successfully",
      user: newUser,
      status: 200
    });
  } catch (error) {
    console.error("Error accessing database:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } finally {
    await prisma.$disconnect();
  }
}
