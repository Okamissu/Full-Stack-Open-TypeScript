/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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

router.post('/', (req, res) => {
  const { date, weather, visibility, comment } = req.body;

  const addedEntry = diaryService.addDiary({
    date,
    weather,
    visibility,
    comment,
  });

  res.json(addedEntry);
});

export default router;
