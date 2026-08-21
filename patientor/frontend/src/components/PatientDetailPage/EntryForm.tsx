import { useState } from 'react';
import axios from 'axios';
import {
  Alert,
  Card,
  CardContent,
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  MenuItem,
} from '@mui/material';
import type { EntryWithoutId } from '../../types';

type HealthCheckEntry = Extract<EntryWithoutId, { type: 'HealthCheck' }>;

const EntryForm = ({
  onEntrySubmit,
}: {
  onEntrySubmit: (values: EntryWithoutId) => Promise<void>;
}) => {
  const [entry, setEntry] = useState<HealthCheckEntry>({
    type: 'HealthCheck',
    specialist: '',
    date: '',
    description: '',
    healthCheckRating: 0,
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setEntry((prev) => ({
      ...prev,
      [name]: name === 'healthCheckRating' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError(null);

    try {
      await onEntrySubmit(entry);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.error ?? 'Invalid entry.');
      } else {
        setError('Could not add entry.');
      }
    }
  };

  return (
    <Card sx={{ mt: 2 }}>
      <CardContent sx={{ p: 4 }} component="form" onSubmit={handleSubmit}>
        <Box display="flex" alignItems="center" mb={2}>
          <Typography variant="h5" component="h3" fontWeight="bold">
            New Entry
          </Typography>
        </Box>

        {error && <Alert severity="error">{error}</Alert>}

        <Divider />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            mt: 3,
          }}
        >
          <TextField
            select
            label="Visit type"
            name="type"
            fullWidth
            required
            value={entry.type}
            onChange={handleChange}
          >
            <MenuItem value="HealthCheck">Health Check</MenuItem>
          </TextField>

          <TextField
            label="Specialist"
            name="specialist"
            fullWidth
            required
            value={entry.specialist}
            onChange={handleChange}
          />

          <TextField
            label="Date"
            name="date"
            type="date"
            fullWidth
            required
            value={entry.date}
            onChange={handleChange}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />

          <TextField
            label="Description"
            name="description"
            multiline
            rows={2}
            fullWidth
            required
            value={entry.description}
            onChange={handleChange}
          />

          <TextField
            select
            label="Health check rating"
            name="healthCheckRating"
            fullWidth
            required
            value={entry.healthCheckRating}
            onChange={handleChange}
          >
            <MenuItem value={0}>Healthy</MenuItem>
            <MenuItem value={1}>Low Risk</MenuItem>
            <MenuItem value={2}>High Risk</MenuItem>
            <MenuItem value={3}>Critical Risk</MenuItem>
          </TextField>

          <Button type="submit" variant="contained">
            Save
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EntryForm;
