import type { CoursePart } from '../types';
import { assertNever } from '../utils';

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div className="space-y-4">
      {courseParts.map((part) => {
        switch (part.kind) {
          case 'basic':
            return (
              <div key={part.name} className="*:my-0.5">
                <p className="font-bold">
                  {part.name} {part.exerciseCount}
                </p>
                <p className="italic">{part.description}</p>
              </div>
            );

          case 'group':
            return (
              <div key={part.name} className="*:my-0.5">
                <p className="font-bold">
                  {part.name} {part.exerciseCount}
                </p>
                <p>project exercises {part.groupProjectCount}</p>
              </div>
            );

          case 'background':
            return (
              <div key={part.name} className="*:my-0.5">
                <p className="font-bold">
                  {part.name} {part.exerciseCount}
                </p>
                <p className="italic">Confusing description</p>
                <p>{part.backgroundMaterial}</p>
              </div>
            );

          default:
            return assertNever(part);
        }
      })}
    </div>
  );
};

export default Content;
