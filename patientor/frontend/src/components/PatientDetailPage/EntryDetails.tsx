import { Typography, Box } from '@mui/material';
import { type Entry, HealthCheckRatingLabel } from '../../types';

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case 'Hospital':
      return (
        <>
          <Box mb={1}>
            <Typography variant="subtitle1" color="text.secondary">
              <strong>Discharge date:</strong> {entry.discharge.date}
            </Typography>
          </Box>

          <Box mb={1}>
            <Typography variant="subtitle1" color="text.secondary">
              <strong>Discharge criteria:</strong> {entry.discharge.criteria}
            </Typography>
          </Box>
        </>
      );

    case 'OccupationalHealthcare':
      return (
        <>
          <Box mb={1}>
            <Typography variant="subtitle1" color="text.secondary">
              <strong>Employer:</strong> {entry.employerName}
            </Typography>
          </Box>

          <Box mb={1}>
            <Typography variant="subtitle1" color="text.secondary">
              <strong>Sick leave:</strong>{' '}
              {entry.sickLeave
                ? `${entry.sickLeave.startDate} - ${entry.sickLeave.endDate}`
                : '-'}
            </Typography>
          </Box>
        </>
      );

    case 'HealthCheck':
      return (
        <Box mb={1}>
          <Typography variant="subtitle1" color="text.secondary">
            <strong>Health rating:</strong>{' '}
            {HealthCheckRatingLabel[entry.healthCheckRating]}
          </Typography>
        </Box>
      );

    default:
      return assertNever(entry);
  }
};

const assertNever = (entry: never): never => {
  throw new Error(`Unhandled entry type: ${JSON.stringify(entry)}`);
};

export default EntryDetails;
