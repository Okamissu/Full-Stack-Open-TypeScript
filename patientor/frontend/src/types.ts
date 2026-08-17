type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export type PatientFormValues = Omit<Patient, 'id' | 'entries'>;

export type BaseEntry = {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
};

const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const;

export const HealthCheckRatingLabel: Record<HealthCheckRating, string> = {
  [HealthCheckRating.Healthy]: 'Healthy',
  [HealthCheckRating.LowRisk]: 'Low risk',
  [HealthCheckRating.HighRisk]: 'High risk',
  [HealthCheckRating.CriticalRisk]: 'Critical risk',
};

type HealthCheckRating =
  (typeof HealthCheckRating)[keyof typeof HealthCheckRating];

type HealthCheckEntry = BaseEntry & {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
};

type OccupationalHealthcareEntry = BaseEntry & {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
};

type HospitalEntry = BaseEntry & {
  type: 'Hospital';
  discharge: {
    date: string;
    criteria: string;
  };
};

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export type EntryWithoutId = UnionOmit<Entry, 'id'>;
