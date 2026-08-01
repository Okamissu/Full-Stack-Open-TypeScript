import express from 'express';
import type { Request, Response } from 'express';
import { calculateBmi } from './bmiCalculator.ts';
import { calculateExercises } from './exerciseCalculator.ts';
import { isExerciseBody } from './utils.ts';

const app = express();
app.use(express.json());

app.get('/hello', (_req: Request, res: Response) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req: Request, res: Response): void => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (Number.isNaN(height) || Number.isNaN(weight)) {
    res.status(400).json({ error: 'malformatted parameters' });
    return;
  }

  try {
    const bmi = calculateBmi(height, weight);

    res.json({
      height,
      weight,
      bmi,
    });
  } catch {
    res.status(400).json({ error: 'malformatted parameters' });
  }
});

app.post(
  '/exercises',
  (req: Request<unknown, unknown, unknown>, res: Response) => {
    const body = req.body;

    if (!isExerciseBody(body)) {
      return res.status(400).json({ error: 'parameters missing' });
    }

    const { daily_exercises, target } = body;

    if (
      !Array.isArray(daily_exercises) ||
      !daily_exercises.every((e) => !isNaN(Number(e))) ||
      isNaN(Number(target))
    ) {
      return res.status(400).json({ error: 'malformatted parameters' });
    }

    const result = calculateExercises(
      daily_exercises.map(Number),
      Number(target),
    );

    return res.json(result);
  },
);

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
