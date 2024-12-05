import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Applayout from './layout/Applayout';
import Homepage from './pages/Homepage/Homepage';
import Moviepage from './pages/Moviepage/Moviepage';
import MovieDetailpage from './pages/MovieDetail/MovieDetailpage';
import Notfoundpage from './pages/NOTfoundpage/Notfoundpage';


// 홈페이지  /
// 영화 전체보여주는 페이지 (서치) /movie
// 영화 디테일 페이지 /movies/:id
function App() {
  return (
    <div >
      <Routes>
        <Route path='/' element={<Applayout/>}>
            <Route index element={<Homepage/>}/>
            <Route path='movies'>
              <Route index element={<Moviepage/>}/>
              <Route path=':id' element={<MovieDetailpage/>}/>
            </Route>
        </Route>
        
        <Route path='*' element={<Notfoundpage/>}/>
      </Routes>
    </div>
  );
}

export default App;
