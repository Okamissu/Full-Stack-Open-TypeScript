const categories = [
  { max: 16, label: 'Underweight (Severe thinness)' },
  { max: 17, label: 'Underweight (Moderate thinness)' },
  { max: 18.5, label: 'Underweight (Mild thinness)' },
  { max: 25, label: 'Normal range' },
  { max: 30, label: 'Overweight (Pre-obese)' },
  { max: 35, label: 'Obese (Class I)' },
  { max: 40, label: 'Obese (Class II)' },
] as const;

const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100) ** 2;

  return (
    categories.find((category) => bmi < category.max)?.label ??
    'Obese (Class III)'
  );
};

console.log(calculateBmi(168, 47));
