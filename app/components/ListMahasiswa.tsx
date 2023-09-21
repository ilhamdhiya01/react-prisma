import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { PrismaClient } from '@prisma/client';
import DeleteMahasiswa from './DeleteMahasiswa';
import UpdateMahasiswa from './UpdateMahasiswa';
import type { DosenWali, Jurusan } from '@prisma/client';

const ListMahasiswa: React.FC<{ dosen: DosenWali[]; jurusan: Jurusan[] }> = async ({ dosen, jurusan }) => {
  const prisma = new PrismaClient();
  const mahasiswa = await prisma.mahasiswa.findMany({
    include: {
      dosen: true,
      jurusan: true,
    },
  });
  console.log(dosen);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell align='center'>Nama</TableCell>
            <TableCell align='center'>NIM</TableCell>
            <TableCell align='center'>Email</TableCell>
            <TableCell align='center'>Jurusan</TableCell>
            <TableCell align='center'>Dosen Wali</TableCell>
            <TableCell align='center'>Aksi</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mahasiswa.map((item, index) => (
            <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component='th' scope='row'>
                {index + 1}
              </TableCell>
              <TableCell align='center'>{item.nama}</TableCell>
              <TableCell align='center'>{item.nim}</TableCell>
              <TableCell align='center'>{item.email}</TableCell>
              <TableCell align='center'>{item.jurusan.nama}</TableCell>
              <TableCell align='center'>{item.dosen.nama}</TableCell>
              <TableCell align='center' className='flex gap-2'>
                <DeleteMahasiswa id={item.id} />
                <UpdateMahasiswa dosen={dosen} jurusan={jurusan} mahasiswa={item} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListMahasiswa;
