import { Route, Routes} from 'react-router-dom';
import RegisterMatches from './pages/RegisterMatches';
import HomePage from './pages/HomePage';
import Matches from './pages/Matches';
import Sidebar from './components/Sidebar';
import Charts from './pages/Charts';
import './App.css';

function App() {

  const path = '/appRocketFlow'
  return (
    <div className='flex'>
      <Sidebar/>
      <Routes>
        <Route path={`${path}`} element={<HomePage/>}/>
        <Route path={`${path}/registerMatch`} element={<RegisterMatches />} />
        <Route path={`${path}/matches`} element={<Matches />} />
        <Route path={`${path}/charts`} element={<Charts />} />
      </Routes>
    </div>
  )
}

export default App;
