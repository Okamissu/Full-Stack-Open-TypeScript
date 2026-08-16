import type { DiaryEntry } from '../types';

const DiaryList = ({ diaryEntries }: { diaryEntries: DiaryEntry[] }) => (
  <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
    {diaryEntries.map((entry) => (
      <li
        key={entry.id}
        className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200"
      >
        <h2 className="mb-4 text-lg font-semibold text-slate-900">
          {entry.date}
        </h2>

        <div className="space-y-3 text-sm">
          <p className="flex justify-between gap-4 border-b border-slate-100 pb-2">
            <span className="font-medium text-slate-500">Visibility</span>
            <span className="font-semibold text-slate-800">
              {entry.visibility}
            </span>
          </p>

          <p className="flex justify-between gap-4">
            <span className="font-medium text-slate-500">Weather</span>
            <span className="font-semibold text-slate-800">
              {entry.weather}
            </span>
          </p>
        </div>
      </li>
    ))}
  </ul>
);

export default DiaryList;
