import logo from './logo.svg';
import './App.css';
import EventAdd from './components/EventAdd';
import FrontGeneral from './components/FrontGeneral'; 
import SocFollowing from './components/SocFollowing';
import SearchBar from './components/SearchBar';

import { useState } from 'react'
import fullSocList from './components/TestData.json'

function App() {

  // Societies currently following list
  const [societies, setSocieties] = useState([]);


  // Add a society to the following box
  const addSociety = (id) => {
    const newSoc = fullSocList.filter((society) => society.id === id)[0]
    if (!societies.includes(newSoc)) {
      setSocieties([...societies, newSoc])
    }
  }

  // delete a society from following box
  const delSociety = (id) => {
    setSocieties(societies.filter((society) => society.id !== id))
  }

  return (
    <div className="App">
      <SearchBar addSociety={addSociety} fullSocList={fullSocList}/>
      <SocFollowing societies={societies} delSociety={delSociety}/>
    </div>
  );
}

export default App;
