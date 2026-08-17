import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
} from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

import { Entry, HealthCheckRatingLabel, Patient } from '../../types';
import patientService from '../../services/patients';

const PatientDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      if (!id) return;
      try {
        const fetchedPatient = await patientService.getOne(id);
        setPatient(fetchedPatient);
      } catch (e: unknown) {
        console.error(e);
      }
    };

    void fetchPatient();
  }, [id]);

  const getGenderIcon = (gender: string) => {
    switch (gender) {
      case 'male':
        return (
          <MaleIcon color="primary" sx={{ verticalAlign: 'middle', ml: 1 }} />
        );
      case 'female':
        return (
          <FemaleIcon color="error" sx={{ verticalAlign: 'middle', ml: 1 }} />
        );
      default:
        return (
          <TransgenderIcon
            color="action"
            sx={{ verticalAlign: 'middle', ml: 1 }}
          />
        );
    }
  };

  const renderVisit = (entry: Entry) => {
    const getFormattedVisitType = (visitType: string) => {
      switch (visitType) {
        case 'Hospital':
          return 'Hospital';
        case 'OccupationalHealthcare':
          return 'Occupational Healthcare';
        case 'HealthCheck':
          return 'Health Check';
        default:
          return 'Unknown';
      }
    };

    const renderTypeSpecific = (entry: Entry) => {
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
                  <strong>Discharge criteria:</strong>{' '}
                  {entry.discharge.criteria}
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
      }
    };

    return (
      <Box>
        <Divider sx={{ mb: 2 }} />
        <Box mb={1}>
          <Typography variant="subtitle1" color="text.secondary">
            <strong>{entry.date}</strong> - {getFormattedVisitType(entry.type)}
          </Typography>
        </Box>
        <Box mb={1}>
          <Typography variant="subtitle1" color="text.secondary">
            <strong>Specialist:</strong> {entry.specialist}
          </Typography>
        </Box>
        <Box mb={1}>
          <Typography variant="subtitle1" color="text.secondary">
            <strong>Description:</strong> {entry.description}
          </Typography>
        </Box>
        <Box mb={1}>
          <Typography variant="subtitle1" color="text.secondary">
            <strong>Diagnosis codes:</strong>{' '}
            {entry.diagnosisCodes ? (
              <List
                dense={true}
                sx={{
                  listStyleType: 'disc',
                  listStylePosition: 'inside',
                }}
              >
                {entry.diagnosisCodes.map((code) => (
                  <ListItem sx={{ display: 'list-item' }}>{code}</ListItem>
                ))}
              </List>
            ) : (
              '-'
            )}
          </Typography>
        </Box>

        {renderTypeSpecific(entry)}
      </Box>
    );
  };

  if (!patient) {
    return <></>;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 3 }}>
      <Card>
        <CardContent sx={{ p: 4 }}>
          <Box display="flex" alignItems="center" mb={2}>
            <Typography variant="h5" component="h2" fontWeight="bold">
              {patient.name}
            </Typography>
            {getGenderIcon(patient.gender)}
          </Box>

          <Divider sx={{ mb: 2 }} />

          <Box mb={1}>
            <Typography variant="subtitle1" color="text.secondary">
              <strong>SSN:</strong> {patient.ssn || 'Brak danych'}
            </Typography>
          </Box>

          <Box mb={1}>
            <Typography variant="subtitle1" color="text.secondary">
              <strong>Occupation:</strong> {patient.occupation}
            </Typography>
          </Box>

          <Box mb={1}>
            <Typography variant="subtitle1" color="text.secondary">
              <strong>Date of Birth:</strong> {patient.dateOfBirth}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ mt: 2 }}>
        <CardContent sx={{ p: 4 }}>
          <Box display="flex" alignItems="center" mb={2}>
            <Typography variant="h5" component="h3" fontWeight="bold">
              Entries
            </Typography>
          </Box>

          {patient.entries.length === 0 ? (
            <Typography variant="subtitle1" color="text.secondary">
              No entries were recorded.
            </Typography>
          ) : (
            patient.entries.map((entry) => renderVisit(entry))
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default PatientDetailPage;
