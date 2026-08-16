import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

import { Patient } from '../../types';
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

  if (!patient) {
    return <></>;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card>
        <CardContent sx={{ p: 4 }}>
          <Box display="flex" alignItems="center" mb={2}>
            <Typography variant="h4" component="h1" fontWeight="bold">
              {patient.name}
            </Typography>
            {getGenderIcon(patient.gender)}
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Box mb={2}>
            <Typography variant="subtitle1" color="text.secondary">
              <strong>SSN:</strong> {patient.ssn || 'Brak danych'}
            </Typography>
          </Box>

          <Box mb={2}>
            <Typography variant="subtitle1" color="text.secondary">
              <strong>Occupation:</strong> {patient.occupation}
            </Typography>
          </Box>

          <Box mb={3}>
            <Typography variant="subtitle1" color="text.secondary">
              <strong>Date of Birth: {patient.dateOfBirth}</strong>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default PatientDetailPage;
