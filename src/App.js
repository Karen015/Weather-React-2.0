import { 
  Route,
  BrowserRouter,
  Routes
} from 'react-router-dom'; 
import MainLayout from './view/layouts/MainLayout'; 
import './App.css';
import Dashboard from './view/pages/dashboard';
import Preferences from './view/pages/preferences';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route path='/' element={<Dashboard />} />
          <Route path='/preferences' element={<Preferences />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
