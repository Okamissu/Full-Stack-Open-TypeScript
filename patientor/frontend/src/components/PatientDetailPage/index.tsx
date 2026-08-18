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
import EntryDetails from './EntryDetails';
import type { Diagnosis, Entry, Patient } from '../../types';
import patientService from '../../services/patients';
import diagnosisService from '../../services/diagnoses';
import EntryForm from './EntryForm';

const PatientDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Record<string, Diagnosis>>({});

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

  useEffect(() => {
    const fetchDiagnoses = async () => {
      if (!patient) return;

      const codes = patient.entries.flatMap(
        (entry) => entry.diagnosisCodes ?? [],
      );

      const uniqueCodes = [...new Set(codes)];

      try {
        const fetchedDiagnoses = await Promise.all(
          uniqueCodes.map((code) => diagnosisService.getOne(code)),
        );

        const diagnosisMap = fetchedDiagnoses.reduce<Record<string, Diagnosis>>(
          (acc, diagnosis) => {
            acc[diagnosis.code] = diagnosis;
            return acc;
          },
          {},
        );

        setDiagnoses(diagnosisMap);
      } catch (e: unknown) {
        console.error(e);
      }
    };

    void fetchDiagnoses();
  }, [patient]);

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

    return (
      <Box key={entry.id}>
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
            <strong>Diagnoses:</strong>
          </Typography>

          {entry.diagnosisCodes?.length ? (
            <List
              dense
              sx={{
                listStyleType: 'disc',
                listStylePosition: 'inside',
              }}
            >
              {entry.diagnosisCodes.map((code) => {
                const diagnosis = diagnoses[code];

                return (
                  <ListItem key={code} sx={{ paddingBlock: 0, marginBlock: 0 }}>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      sx={{
                        display: 'list-item',
                      }}
                    >
                      {diagnosis
                        ? `${diagnosis.code} - ${diagnosis.name}${
                            diagnosis.latin ? ` (${diagnosis.latin})` : ''
                          }`
                        : code}
                    </Typography>
                  </ListItem>
                );
              })}
            </List>
          ) : (
            <Typography variant="subtitle1" color="text.secondary">
              -
            </Typography>
          )}
        </Box>
        <EntryDetails entry={entry} />
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

      <EntryForm />

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
