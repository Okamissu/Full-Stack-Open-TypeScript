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

const calculateExercises = (
  dailyExercises: number[],
  target: number,
): Result => {
  const periodLength = dailyExercises.length;
  const trainingDays = dailyExercises.filter((value) => value > 0).length;
  const sum = dailyExercises.reduce((acc, num) => acc + num, 0);
  const average = sum / periodLength;
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
