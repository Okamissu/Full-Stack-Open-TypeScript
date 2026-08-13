import type { CoursePart } from '../types';
import { assertNever } from '../utils';

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  courseParts.forEach((part) => {
    switch (part.kind) {
      case 'basic':
        console.log(part.name, part.exerciseCount, part.description);
        break;
      case 'group':
        console.log(part.name, part.exerciseCount, part.groupProjectCount);
        break;
      case 'background':
        console.log(part.name, part.exerciseCount, part.backgroundMaterial);
        break;
      default:
        return assertNever(part);
    }
  });

  return courseParts.map((part) => (
    <p key={part.name}>
      {part.name} {part.exerciseCount}
    </p>
  ));
};

export default Content;
