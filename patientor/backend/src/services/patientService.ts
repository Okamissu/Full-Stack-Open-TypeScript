import patients from '../../data/patients.ts';
import type { NewPatient, NonSensitivePatient, Patient } from '../types.ts';
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => patients;

const getNonSensitivePatients = (): NonSensitivePatient[] =>
  patients.map(({ ssn, ...other }) => other);

const getPatient = (id: string): Patient | undefined =>
  patients.find((p) => p.id === id);

const addPatient = (patient: NewPatient): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    ...patient,
    entries: [],
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getPatient,
  getNonSensitivePatients,
  addPatient,
};
