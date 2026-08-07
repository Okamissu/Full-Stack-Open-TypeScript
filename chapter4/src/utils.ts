import type { NewDiaryEntry, Weather } from './types.ts';

const parseNewDiaryEntry = (object: unknown): NewDiaryEntry => {
  console.log(object); // now object is no longer unused
  const newEntry: NewDiaryEntry = {
    weather: 'cloudy', // fake the return value
    visibility: 'great',
    date: '2026-1-1',
    comment: 'fake news',
  };

  return newEntry;
};

const parseComment = (comment: unknown): string => {
  if (!comment || !isString(comment))
    throw new Error('Incorrect or missing comment');

  return comment;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date))
    throw new Error('Incorrect or missing date: ' + date);

  return date;
};

const parseWeather = (weather: unknown): Weather => {
  if (!weather || !isString(weather) || !isWeather(weather))
    throw new Error('Incorrect or missing weather' + weather);

  return weather;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string';
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isWeather = (str: string): str is Weather => {
  return ['sunny', 'rainy', 'cloudy', 'stormy'].includes(str);
};
export default { parseNewDiaryEntry, parseComment, parseDate };
