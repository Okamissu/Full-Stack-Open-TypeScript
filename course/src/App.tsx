import Content from './components/Content';
import Header from './components/Header';
import Total from './components/Total';
import { courseName, courseParts } from './data/courseData';

const App = () => {
  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;
