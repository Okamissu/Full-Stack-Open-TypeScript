import { parseNumber, handleError } from './utils.ts';

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface Rating {
  rating: number;
  ratingDescription: string;
}

interface ExerciseValues {
  target: number;
  dailyExercises: number[];
}

const parseExerciseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) {
    throw new Error(
      'Usage: npm run calculateExercises <target> <day1> <day2> ...',
    );
  }

  const target = parseNumber(args[2]);
  const dailyExercises = args.slice(3).map(parseNumber);

  if (target <= 0) {
    throw new Error('Target must be positive');
  }

  if (dailyExercises.some((hours) => hours < 0)) {
    throw new Error('Exercise hours cannot be negative');
  }

  return {
    target,
    dailyExercises,
  };
};

const getRating = (average: number, target: number): Rating => {
  if (average >= target) {
    return {
      rating: 3,
      ratingDescription: 'Target achieved, great job!',
    };
  }

  if (average >= target * 0.75) {
    return {
      rating: 2,
      ratingDescription:
        "You've met more than 75% of your target - still a very nice job!",
    };
  }

  return {
    rating: 1,
    ratingDescription: 'Try to improve a bit more! :)',
  };
};

export const calculateExercises = (
  dailyExercises: number[],
  target: number,
): Result => {
  const periodLength = dailyExercises.length;
  const trainingDays = dailyExercises.filter((hours) => hours > 0).length;

  const totalHours = dailyExercises.reduce((sum, hours) => sum + hours, 0);

  const average = totalHours / periodLength;
  const success = average >= target;

  const { rating, ratingDescription } = getRating(average, target);

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { dailyExercises, target } = parseExerciseArguments(process.argv);
  const result = calculateExercises(dailyExercises, target);
  console.log(result);
} catch (error) {
  handleError(error);
}
