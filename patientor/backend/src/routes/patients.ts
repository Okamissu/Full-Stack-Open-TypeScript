import { Router, type Response, type Request } from 'express';
import patientService from '../services/patientService.ts';
import type { NewPatient, NonSensitivePatient } from '../types.ts';
import { errorMiddleware, newPatientParser } from '../middleware.ts';

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
  (req: Request<unknown, unknown, NewPatient>, res: Response) => {
    const addedPatient = patientService.addPatient(req.body);
    res.json(addedPatient);
  },
);

router.use(errorMiddleware);

export default router;
