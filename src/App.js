import './App.css';
import Klasemen from './Presentation/Views/Klasemen/Klasemen';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Klub from './Presentation/Views/Klub/Klub';
import Pertandingan from './Presentation/Views/Pertandingan/Pertandingan';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
          <Route path="/" element={ <Klasemen /> } />
      </Routes>
      <Routes>
          <Route path="/klub" element={ <Klub /> } />
      </Routes>
      <Routes>
          <Route path="/hasil-pertandingan" element={ <Pertandingan /> } />
      </Routes>
    </div>
  </BrowserRouter>
  );
}

export default App;
