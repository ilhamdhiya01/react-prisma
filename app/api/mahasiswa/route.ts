import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import type { Mahasiswa } from '@prisma/client';

const prisma = new PrismaClient();

export const POST = async (request: Request) => {
  const body: Mahasiswa = await request.json();
  const mahasiswa = await prisma.mahasiswa.create({
    data: {
      nama: body.nama,
      nim: body.nim,
      email: body.email,
      alamat: body.alamat,
      tlp: Number(body.tlp),
      idJurusan: body.idJurusan,
      idDosenWali: body.idDosenWali,
    },
  });
  return NextResponse.json(mahasiswa);
};
