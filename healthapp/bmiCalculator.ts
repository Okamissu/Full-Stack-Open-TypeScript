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

const parseArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers');
  }
};

const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100) ** 2;

  return (
    categories.find((category) => bmi < category.max)?.label ??
    'Obese (Class III)'
  );
};

try {
  const { height, weight } = parseArguments(process.argv);
  const result = calculateBmi(height, weight);
  console.log(result);
} catch (error: unknown) {
  let errorMessage = 'Something wrong happened.';
  if (error instanceof Error) {
    errorMessage += ` Error: ${error.message}`;
  }
  console.log(errorMessage);
}
