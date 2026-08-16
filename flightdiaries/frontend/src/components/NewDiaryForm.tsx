import { useState } from 'react';
import { Weather, Visibility, type NewDiaryEntry } from '../types';

const NewDiaryForm = ({
  onSubmit,
}: {
  onSubmit: (entry: NewDiaryEntry) => void;
}) => {
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState<Weather>('sunny');
  const [visibility, setVisibility] = useState<Visibility>('good');
  const [comment, setComment] = useState('');

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const entry: NewDiaryEntry = {
      date,
      weather,
      visibility,
      comment,
    };

    onSubmit(entry);

    setDate('');
    setWeather('sunny');
    setVisibility('good');
    setComment('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      {/* Date */}
      <div className="space-y-2">
        <label
          htmlFor="date"
          className="block text-sm font-medium text-slate-700"
        >
          Date
        </label>

        <input
          id="date"
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          required
          className="rounded-md border border-slate-300 px-3 py-2 text-slate-700 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
        />
      </div>

      {/* Weather */}
      <fieldset className="space-y-3">
        <legend className="text-sm font-medium text-slate-700">Weather</legend>

        <div className="flex flex-wrap gap-4">
          {Object.values(Weather).map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 text-sm text-slate-600"
            >
              <input
                type="radio"
                name="weather"
                value={option}
                checked={weather === option}
                onChange={() => setWeather(option)}
                className="h-4 w-4 accent-slate-700"
              />
              {option}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Visibility */}
      <fieldset className="space-y-3">
        <legend className="text-sm font-medium text-slate-700">
          Visibility
        </legend>

        <div className="flex flex-wrap gap-4">
          {Object.values(Visibility).map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 text-sm text-slate-600"
            >
              <input
                type="radio"
                name="visibility"
                value={option}
                checked={visibility === option}
                onChange={() => setVisibility(option)}
                className="h-4 w-4 accent-slate-700"
              />
              {option}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Comment */}
      <div className="space-y-2">
        <label
          htmlFor="comment"
          className="block text-sm font-medium text-slate-700"
        >
          Comment
        </label>

        <textarea
          id="comment"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          rows={2}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-700 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
        />
      </div>

      <button
        type="submit"
        className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
      >
        Add diary
      </button>
    </form>
  );
};

export default NewDiaryForm;
