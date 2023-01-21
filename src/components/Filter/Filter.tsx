import { Container, TextField, Box, Typography } from '@mui/material';

interface IProps {
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Filter: React.FC<IProps> = ({ name, onChange }) => {
  return (
    <Container
      maxWidth='md'
      sx={{ display: 'grid', gridTemplateColumns: '50% 1fr' }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography
          sx={{ m: '0', fontSize: '0.85rem' }}
          gutterBottom
          variant='h6'
          component='label'
          htmlFor='find'
          
        >
          Filter by keywords
        </Typography>
        <TextField
        sx={{p: '0'}}
          type='search'
          name='find'
          autoFocus
          value={name}
          onChange={onChange}
        />
      </Box>
    </Container>
  );
};
