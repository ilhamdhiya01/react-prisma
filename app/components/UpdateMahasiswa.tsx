'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useState } from 'react';
import type { DosenWali, Jurusan, Mahasiswa } from '@prisma/client';
import { SelectChangeEvent } from '@mui/material/Select';
import { useRouter } from 'next/navigation';
import { SyntheticEvent } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import EditIcon from '@mui/icons-material/Edit';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

interface EditMahasiswaProps {
  jurusan: Jurusan[];
  dosen: DosenWali[];
  mahasiswa: Mahasiswa;
}

const UpdateMahasiswa: React.FC<EditMahasiswaProps> = ({ dosen, jurusan, mahasiswa }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(mahasiswa);
  const router = useRouter();
  const handleOpen = () => {
    setOpen((prev) => !prev);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleChangeSelect = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    const response = await axios.patch(`/api/mahasiswa/${mahasiswa.id}`, formData);
    if (response.status == 200) {
      setOpen(false);
      setLoading(false);
      setFormData(mahasiswa);
      toast.success('Data has been updated');
      router.refresh();
    }
  };
  console.log(formData);
  return (
    <>
      <Button onClick={handleOpen} size='small' variant='outlined' startIcon={<EditIcon />}>
        Edit
      </Button>
      <Modal open={open} onClose={handleOpen} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Form Edit Mahasiswa
          </Typography>
          <Box onSubmit={(e) => handleSubmit(e)} component={'form'} className='flex flex-col gap-3 mt-3'>
            <TextField name='nama' value={formData.nama} onChange={handleChange} label='Nama' variant='outlined' className='w-full' size='small' />
            <TextField name='nim' value={formData.nim} onChange={handleChange} label='NIM' variant='outlined' className='w-full' size='small' />
            <TextField name='email' value={formData.email} onChange={handleChange} label='Email' variant='outlined' className='w-full' size='small' />
            <TextField name='tlp' value={formData.tlp} onChange={handleChange} label='No Tlp' variant='outlined' className='w-full' size='small' />
            <TextField name='alamat' value={formData.alamat} onChange={handleChange} label='Alamat' variant='outlined' className='w-full' size='small' multiline minRows={3} />
            <FormControl size='small' className='w-full'>
              <InputLabel id='demo-select-small-label'>Jurusan</InputLabel>
              <Select labelId='demo-select-small-label' value={mahasiswa.idJurusan.toString()} onChange={handleChangeSelect} name='idJurusan' id='demo-select-small' label='Jurusan'>
                <MenuItem value=''>
                  <em>-- Pilih Jurusan --</em>
                </MenuItem>
                {jurusan.map((item) => (
                  <MenuItem value={item.id} key={item.id}>
                    {item.nama}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl size='small' className='w-full'>
              <InputLabel id='demo-select-small-label'>Dosen Wali</InputLabel>
              <Select labelId='demo-select-small-label' value={mahasiswa.idDosenWali.toString()} onChange={handleChangeSelect} name='idDosenWali' id='demo-select-small' label='Dosen Wali'>
                <MenuItem value=''>
                  <em>-- Pilih Dosen --</em>
                </MenuItem>
                {dosen.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.nama}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box className='flex flex-col'>
              <Button type='submit' variant='outlined' className='w-full'>
                Save{loading && '...'}
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default UpdateMahasiswa;
