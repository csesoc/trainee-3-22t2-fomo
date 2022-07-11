import logo from './logo.svg';
import './App.css';
import EventAdd from './components/EventAdd';
import FrontGeneral from './components/FrontGeneral'; 

function App() {
  return (
    <div className="App">
      <FrontGeneral />
      <EventAdd /> 
    </div>
  );
}

export default App;
