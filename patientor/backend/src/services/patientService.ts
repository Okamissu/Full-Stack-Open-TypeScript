import patients from '../../data/patients.ts';
import type { NonSensitivePatient, Patient } from '../types.ts';

const getPatients = (): Patient[] => patients;

const getNonSensitivePatients = (): NonSensitivePatient[] =>
  patients.map(({ ssn, ...other }) => other);

export default {
  getPatients,
  getNonSensitivePatients,
};
