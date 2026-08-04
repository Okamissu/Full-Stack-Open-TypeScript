import express from 'express';
import diaryService from '../services/diaryService.ts';

const router = express.Router();

router.get('/', (_req, res) => {
  const data = diaryService.getNonSensitiveEntries();
  res.send(data);
});

router.post('/', (_req, res) => {
  res.send('Saving a diary!');
});

export default router;
