'use client';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const DeleteMahasiswa: React.FC<{ id: number }> = ({ id }) => {
  const router = useRouter();
  const handleDelete = async () => {
    if (confirm('Delete this data ?')) {
      const response = await axios.delete(`/api/mahasiswa/${id}`);
      if (response.status === 200) {
        toast.success('Success deleted');
        router.refresh();
      }
    }
  };
  return (
    <Button onClick={handleDelete} size='small' variant='outlined' startIcon={<DeleteIcon />}>
      Delete
    </Button>
  );
};

export default DeleteMahasiswa;
