import { Router, type Response, type Request } from 'express';
import diagnosisService from '../services/diagnosisService.ts';
import type { Diagnosis } from '../types.ts';

const router = Router();

router.get('/', (_req, res: Response<Diagnosis[]>) => {
  const data = diagnosisService.getDiagnoses();
  res.send(data);
});

router.get('/:code', (req: Request<{ code: string }>, res: Response) => {
  const code = diagnosisService.getDiagnosis(req.params.code);

  if (code) {
    res.json(code);
  } else {
    res.status(404).send('Code not found');
  }
});

export default router;
