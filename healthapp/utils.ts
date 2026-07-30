export const handleError = (error: unknown): void => {
  const message =
    error instanceof Error
      ? `Error: ${error.message}`
      : 'An unknown error occurred.';

  console.error(message);
};

export const isNotNumber = (value: unknown): boolean => isNaN(Number(value));

export const parseNumber = (value: string): number => {
  if (isNotNumber(value)) {
    throw new Error(`"${value}" is not a number`);
  }

  return Number(value);
};
