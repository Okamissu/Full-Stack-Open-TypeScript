import diagnoses from '../../data/diagnoses.ts';
import type { Diagnosis } from '../types.ts';

const getDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};

const getDiagnosis = (code: string): Diagnosis | undefined =>
  diagnoses.find((d) => d.code === code);

export default {
  getDiagnoses,
  getDiagnosis,
};
