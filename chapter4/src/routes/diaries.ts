import express, { type Response } from 'express';
import diaryService from '../services/diaryService.ts';
import type { NonSensitiveDiaryEntry } from '../types.ts';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitiveDiaryEntry[]>) => {
  const data = diaryService.getNonSensitiveEntries();
  res.send(data);
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const diary = diaryService.findById(id);
  if (diary) res.send(diary);
  else res.sendStatus(404);
});

router.post('/', (_req, res) => {
  res.send('Saving a diary!');
});

export default router;
