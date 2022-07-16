import { useState } from 'react';
import Soc from './Soc';

const SocFollowing = () => {

  const [societies, setSocieties] = useState([
    {
      id: 1,
      name: "CSESOC",
    },
    {
      id: 2,
      name: "UNSW Esports Society",
    },
    {
      id: 3,
      name: "Dog-appreciation ting",
    },
  ]);

  const toggleActive = () => {
    const items = document.querySelectorAll(".followSoc");
    for (const item of items) {
      item.addEventListener("click", (e) => {
        items.forEach(function(currentSoc) {
          currentSoc.classList.remove('followSoc-active');
        });
        // if target already had .active. remove it. Otherwise, add it
        item.classList.toggle('followSoc-active');
      })
    }
  }

  return (
    <div className='followBox' onMouseOver={() => toggleActive()}>
      <h1>Following</h1>
      {societies.map((society) => (
        <Soc key={society.id} society={society} />
      ))}
    </div>
  )
}

export default SocFollowing