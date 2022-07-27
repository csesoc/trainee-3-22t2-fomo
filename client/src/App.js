import './App.css';
import EventAdd from './components/EventAdd';
import FrontGeneral from './components/FrontGeneral'; 
import SocFollowing from './components/SocFollowing';
import SearchBar from './components/SearchBar';
import TagFilter from './components/TagFilter';

import { useState, useEffect } from 'react'
import LoginPage from './components/LoginPage';

function App() {

  // Societies currently following list
  const [societies, setSocieties] = useState([]);
  // Full list of societies from db
  const [fullSocList, setFullSocList] = useState([]);

  // Get all societies from db and sets fullSocList accordingly
  useEffect(() => {
    fetch("http://localhost:5000/society/getAll")
    .then((response) => response.json())
    .then((data) => {
      setFullSocList(data)
    });
  }, []);

  // Add a society to the following box
  const addSociety = (id) => {
    const newSoc = fullSocList.filter((society) => society.societyId === id)[0]
    if (!societies.includes(newSoc)) {
      setSocieties([...societies, newSoc])
    }
  }

  // delete a society from following box
  const delSociety = (id) => {
    setSocieties(societies.filter((society) => society.societyId !== id))
  }

  return (
    <div className="App">
      <SearchBar addSociety={addSociety} fullSocList={fullSocList}/>
      <SocFollowing societies={societies} delSociety={delSociety}/>
    </div>
  );
}

export default App;
