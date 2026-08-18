import {
  Card,
  CardContent,
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  MenuItem,
} from '@mui/material';

const EntryForm = () => {
  return (
    <Card sx={{ mt: 2 }}>
      <CardContent
        sx={{ p: 4 }}
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          console.log('submitted');
        }}
      >
        <Box display="flex" alignItems="center" mb={2}>
          <Typography variant="h5" component="h3" fontWeight="bold">
            New Entry
          </Typography>
        </Box>

        <Divider />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 3 }}>
          <TextField
            select
            label="Visit type"
            name="type"
            fullWidth
            required
            defaultValue="OccupationalHealthcare"
          >
            <MenuItem value={'OccupationalHealthcare'}>
              Occupational Healthcare
            </MenuItem>
          </TextField>

          <TextField label="Specialist" name="specialist" fullWidth required />

          <TextField
            label="Date"
            name="date"
            type="date"
            fullWidth
            required
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
          />

          <TextField
            select
            label="Health check rating"
            name="rating"
            fullWidth
            required
            defaultValue="0"
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
