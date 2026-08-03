import diaries from '../../data/entries.ts';
import type { DiaryEntry } from '../types.ts';

const getEntries = (): DiaryEntry[] => {
  return diaries;
};

const addDiary = () => {
  return null;
};

export default {
  getEntries,
  addDiary,
};
