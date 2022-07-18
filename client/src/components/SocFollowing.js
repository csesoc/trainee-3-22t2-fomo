import Soc from './Soc';

const SocFollowing = ({ societies, delSociety }) => {

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
        <Soc key={society.id} society={society} delSociety={delSociety} />
      ))}
    </div>
  )
}

export default SocFollowing