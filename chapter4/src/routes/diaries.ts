import express, { type Response } from 'express';
import diaryService from '../services/diaryService.ts';
import type { NonSensitiveDiaryEntry } from '../types.ts';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitiveDiaryEntry[]>) => {
  const data = diaryService.getNonSensitiveEntries();
  res.send(data);
});

router.post('/', (_req, res) => {
  res.send('Saving a diary!');
});

export default router;
