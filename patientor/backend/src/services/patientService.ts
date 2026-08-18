import patients from '../../data/patients.ts';
import type {
  Entry,
  NewEntry,
  NewPatient,
  NonSensitivePatient,
  Patient,
} from '../types.ts';
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

const addEntry = (patientId: string, entry: NewEntry): Entry => {
  const patient = patients.find((p) => p.id === patientId);

  if (!patient) {
    throw new Error('Patient not found');
  }

  const newEntry: Entry = {
    id: uuid(),
    ...entry,
  };

  patient.entries.push(newEntry);

  return newEntry;
};

export default {
  getPatients,
  getPatient,
  getNonSensitivePatients,
  addPatient,
  addEntry,
};
