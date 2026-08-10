import { Router, type Response, type Request } from 'express';
import patientService from '../services/patientService.ts';
import type { NewPatient, NonSensitivePatient } from '../types.ts';
import { errorMiddleware, newPatientParser } from '../middleware.ts';

const router = Router();

router.get('/', (_req: Request, res: Response<NonSensitivePatient[]>) => {
  const data = patientService.getNonSensitivePatients();
  res.send(data);
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
