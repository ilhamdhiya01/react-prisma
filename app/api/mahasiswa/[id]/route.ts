import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import type { Mahasiswa } from '@prisma/client';

const prisma = new PrismaClient();

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
  const mahasiswa = await prisma.mahasiswa.delete({
    where: {
      id: Number(params.id),
    },
  });
  return NextResponse.json(mahasiswa);
};

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
  const body: Mahasiswa = await request.json();
  const mahasiswa = await prisma.mahasiswa.update({
    where: {
      id: Number(params.id),
    },
    data: {
      nama: body.nama,
      nim: body.nim,
      email: body.nim,
      tlp: Number(body.tlp),
      alamat: body.alamat,
      idJurusan: body.idJurusan,
      idDosenWali: body.idDosenWali,
    },
  });
  return NextResponse.json(mahasiswa);
};
