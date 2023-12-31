'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useState } from 'react';
import type { DosenWali, Jurusan } from '@prisma/client';
import { SelectChangeEvent } from '@mui/material/Select';
import { useRouter } from 'next/navigation';
import { SyntheticEvent } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FieldValues, SubmitHandler, useForm, Controller } from 'react-hook-form';
import { resolve } from 'path';

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

interface AddMahasiswaProps {
  jurusan: Jurusan[];
  dosen: DosenWali[];
}

const AddMahasiswa: React.FC<AddMahasiswaProps> = ({ jurusan, dosen }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm<FieldValues>({
    defaultValues: {
      nama: '',
      nim: '',
      email: '',
      tlp: '',
      alamat: '',
      idJurusan: '',
      idDosenWali: '',
    },
  });

  const onSubmit = (data: FieldValues) => {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    // reset();
    console.log(data);
  };

  return (
    <>
      <Button onClick={handleOpen} variant='outlined'>
        Add Mahasiswa
      </Button>
      <Modal open={open} onClose={handleOpen} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Form Add Mahasiswa
          </Typography>
          <Box onSubmit={handleSubmit(onSubmit)} component={'form'} className='flex flex-col gap-3 mt-3'>
            <TextField label='Nama' {...register('nama', { required: 'Email harus di isi' })} variant='outlined' className='w-full' size='small' />
            {errors.nama && <small className='text-xs text-red-500'>{`${errors.nama.message}`}</small>}
            <TextField label='NIM' {...register('nim', { required: 'NIM harus di isi' })} variant='outlined' className='w-full' size='small' />
            {errors.nim && <small className='text-xs text-red-500'>{`${errors.nim.message}`}</small>}
            <TextField label='Email' {...register('email', { required: 'Email harus di isi' })} variant='outlined' className='w-full' size='small' />
            {errors.email && <small className='text-xs text-red-500'>{`${errors.email.message}`}</small>}
            <TextField label='No Tlp' {...register('tlp', { required: 'No tlp harus di isi' })} variant='outlined' className='w-full' size='small' />
            {errors.tlp && <small className='text-xs text-red-500'>{`${errors.tlp.message}`}</small>}
            <TextField label='Alamat' variant='outlined' {...register('alamat', { required: 'Alamat tidak boleh kosong' })} className='w-full' size='small' multiline minRows={3} />
            {errors.alamat && <small className='text-xs text-red-500'>{`${errors.alamat.message}`}</small>}
            <FormControl size='small' className='w-full'>
              <InputLabel id='demo-select-small-label'>Jurusan</InputLabel>
              <Select labelId='demo-select-small-label' {...register('jurusan')} id='demo-select-small' label='Jurusan'>
                <MenuItem value=''>
                  <em>-- Pilih Jurusan --</em>
                </MenuItem>
                {jurusan.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.nama}
                  </MenuItem>
                ))}
              </Select>
              {errors.idJurusan && <small className='text-xs text-red-500'>{`${errors.idJurusan.message}`}</small>}
            </FormControl>
            <FormControl size='small' className='w-full'>
              <InputLabel id='demo-select-small-label'>Dosen Wali</InputLabel>
              <Select labelId='demo-select-small-label' {...register('dosen')} id='demo-select-small' label='Dosen Wali'>
                <MenuItem value=''>
                  <em>-- Pilih Dosen --</em>
                </MenuItem>
                {dosen.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.nama}
                  </MenuItem>
                ))}
              </Select>
              {errors.idDosenWali && <small className='text-xs text-red-500'>{`${errors.idDosenWali.message}`}</small>}
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

export default AddMahasiswa;
