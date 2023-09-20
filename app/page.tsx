import AddMahasiswa from './components/AddMahasiswa';
import ListMahasiswa from './components/ListMahasiswa';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const Home = async () => {
  const jurusan = await prisma.jurusan.findMany();
  const dosen = await prisma.dosenWali.findMany();
  return (
    <main className='flex min-h-screen flex-col p-24'>
      <div className='mb-3'>
        <AddMahasiswa dosen={dosen} jurusan={jurusan} />
      </div>
      <ListMahasiswa dosen={dosen} jurusan={jurusan} />
    </main>
  );
};

export default Home;
