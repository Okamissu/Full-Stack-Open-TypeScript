import type { NewDiaryEntry, DiaryEntry } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries';

const getAll = async (): Promise<DiaryEntry[]> => {
  const response = await fetch(baseUrl);

  if (!response.ok) throw new Error('Failed to fetch flight diaries');

  return response.json();
};

const create = async (object: NewDiaryEntry) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(object),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  return response.json();
};

export default { getAll, create };
