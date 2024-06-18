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
export async function POST(
  req: NextRequest,
  { params }: { params: { id_jenislap: string } }
) {
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
    const id_jenislap = params.id_jenislap;

    const body = await req.json();
    const { nama_lapangan, deskripsi, alamat_lapangan, harga_sewa, gambar_lapangan } =
      body;
      if (
        !nama_lapangan ||
        !deskripsi ||
        !alamat_lapangan ||
        !harga_sewa ||
        !gambar_lapangan
      ) {
        return NextResponse.json(
          { status: 400, message: "Bad Request: All fields are required" },
          { status: 400 }
        );
      }
    const data = await prisma.lapangan.create({
      data: {
        nama_lapanagn: nama_lapangan,
        deskripsi: deskripsi,
        alamat_lapangan: alamat_lapangan,
        harga_sewa: harga_sewa,
        gambar_lapangan: gambar_lapangan,
        id_jenislap: Number(id_jenislap),
      },
    });

    return NextResponse.json({
      status: 200,
      message: "Success",
      data: data,
    });
  } catch (error) {
    return NextResponse.json(
      { status: 500, message: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
