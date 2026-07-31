import { parseNumber, handleError } from './utils.ts';

interface BmiValues {
  height: number;
  weight: number;
}

const categories = [
  { max: 16, label: 'Underweight (Severe thinness)' },
  { max: 17, label: 'Underweight (Moderate thinness)' },
  { max: 18.5, label: 'Underweight (Mild thinness)' },
  { max: 25, label: 'Normal range' },
  { max: 30, label: 'Overweight (Pre-obese)' },
  { max: 35, label: 'Obese (Class I)' },
  { max: 40, label: 'Obese (Class II)' },
] as const;

const parseBmiArguments = (args: string[]): BmiValues => {
  if (args.length !== 4) {
    throw new Error('Usage: npm run calculateBmi <height> <weight>');
  }

  const height = parseNumber(args[2]);
  const weight = parseNumber(args[3]);

  return { height, weight };
};

export const calculateBmi = (height: number, weight: number): string => {
  if (height <= 0 || weight <= 0) {
    throw new Error('malformatted parameters');
  }

  const heightInMeters = height / 100;
  const bmi = weight / heightInMeters ** 2;

  return (
    categories.find((category) => bmi < category.max)?.label ??
    'Obese (Class III)'
  );
};

if (process.argv[1] === import.meta.filename) {
  try {
    const { height, weight } = parseBmiArguments(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error) {
    handleError(error);
  }
}
