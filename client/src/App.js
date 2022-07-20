import './App.css';
import EventAdd from './components/EventAdd';
import LoginPage from './components/LoginPage';
import FrontGeneral from './components/FrontGeneral'

function App() {
  return (
    <div className="App">
      <LoginPage />
      <EventAdd />
      <FrontGeneral /> 
    </div>
  );
}

export default App;
