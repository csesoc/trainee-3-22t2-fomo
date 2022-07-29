import './App.css';
import EventAdd from './components/EventAdd';
import Login from './components/LoginRegister/Login';
import Register from './components/LoginRegister/Register';
import FrontGeneral from './components/FrontGeneral'

function App() {
  return (
    <div className="App">
      <Register />
      <Login />
    </div>
  );
}

export default App;
