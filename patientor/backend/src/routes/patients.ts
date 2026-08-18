import { Router, type Response, type Request } from 'express';
import patientService from '../services/patientService.ts';
import type {
  NewEntry,
  Entry,
  NewPatient,
  Patient,
  NonSensitivePatient,
} from '../types.ts';
import {
  errorMiddleware,
  newPatientParser,
  newEntryParser,
} from '../middleware.ts';

const router = Router();

router.get('/', (_req: Request, res: Response<NonSensitivePatient[]>) => {
  const data = patientService.getNonSensitivePatients();
  res.send(data);
});

router.get('/:id', (req: Request<{ id: string }>, res: Response) => {
  const patient = patientService.getPatient(req.params.id);

  if (patient) {
    res.json(patient);
  } else {
    res.status(404).send('Patient not found');
  }
});

router.post(
  '/',
  newPatientParser,
  (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const addedPatient = patientService.addPatient(req.body);
    res.json(addedPatient);
  },
);

router.post(
  '/:id/entries',
  newEntryParser,
  (req: Request<{ id: string }, unknown, NewEntry>, res: Response<Entry>) => {
    const addedEntry = patientService.addEntry(req.params.id, req.body);

    res.json(addedEntry);
  },
);
router.use(errorMiddleware);

export default router;
