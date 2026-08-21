import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from './constants';
import type { Patient, EntryWithoutId } from './types';

import patientService from './services/patients';
import PatientListPage from './components/PatientListPage';
import PatientDetailPage from './components/PatientDetailPage';

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);

  const submitPatientEntry = async (
    patientId: string,
    values: EntryWithoutId,
  ) => {
    const newEntry = await patientService.addEntry(patientId, values);

    setPatients((prevPatients) =>
      prevPatients.map((patient) =>
        patient.id === patientId
          ? {
              ...patient,
              entries: patient.entries.concat(newEntry),
            }
          : patient,
      ),
    );
  };

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" sx={{ marginBottom: '0.5em' }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider sx={{ marginY: 2 }} />
          <Routes>
            <Route
              path="/"
              element={
                <PatientListPage
                  patients={patients}
                  setPatients={setPatients}
                />
              }
            />
            <Route
              path="/patients/:id"
              element={<PatientDetailPage onEntrySubmit={submitPatientEntry} />}
            />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
