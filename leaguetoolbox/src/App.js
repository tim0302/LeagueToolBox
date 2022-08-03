import axios from 'axios';
import { useState, useEffect } from 'react';
function App() {
  const [chosenRank, setChosenRank] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [championList, setChampionList] = useState(null);
  const [filteredChampionList, setFilteredChampionList] = useState(null);
  const [skillLevel, setSkillLevel] = useState(null);
  const [role, setRole] = useState(null);

  function filterChampionBaseOnSkill() {
    console.log(championList.name);
  }
  function getAllChampions() {
    setIsLoading(true);

    const options = {
      method: 'GET',
      url: `https://league-of-legends-champion-meta.p.rapidapi.com/champions/all/rank/${chosenRank}`,
      headers: {
        rankname:
          'placements,iron,bronze,silver,gold,platinum,diamond,master,grandmaster,challenger',
        'X-RapidAPI-Key': 'e66b56b8d1msh02904278e3e2013p12d713jsnf39e91383aea',
        'X-RapidAPI-Host': 'league-of-legends-champion-meta.p.rapidapi.com',
      },
    };
    console.log(options.url);
    axios
      .request(options)
      .then(function (response) {
        setChampionList(response.data);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  useEffect(() => {
    if (chosenRank && skillLevel && role) {
      getAllChampions();
    }
    //run when ever this changes
  }, [chosenRank]);
  return (
    <div className='App'>
      {/* {!chosenRank && !skillLevel && !role && ( */}
      <div className='Rank-selector'>
        <h1>League of Legends Champion Picker</h1>
        <p>Select Your Rank & skill Level to start</p>
        <select
          name='ranks'
          id='ranks'
          value={chosenRank}
          onChange={(e) => setChosenRank(e.target.value)}
        >
          <option value={null}>Choose your Rank</option>
          <option value='iron'>Iron</option>
          <option value='bronze'>Bronze</option>
          <option value='silver'>Silver</option>
          <option value='gold'>Gold</option>
          <option value='platinum'>Platinum</option>
          <option value='diamond'>Diamond</option>
          <option value='master'>Master</option>
          <option value='grandmaster'>Grandmaster</option>
          <option value='challenger'>Challenger</option>
        </select>

        <select
          name='skill'
          id='skill'
          value={skillLevel}
          onChange={(e) => setSkillLevel(e.target.value)}
        >
          <option value={null}>Choose your skill level</option>

          <option value='D'>No one can beat me in this game.</option>
          <option value='S'>I'm new!</option>
        </select>

        <select
          name='role'
          id='role'
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value={null}>Choose your prefered role</option>

          <option value='TOP'>Top</option>
          <option value='MID'>Mid</option>
          <option value='JUNGLE'>Jungle</option>
          <option value='ADC'>ADC</option>
          <option value='SUPPORT'>Support</option>
        </select>
      </div>
      {/* )} */}
      {isLoading && <h2>Loading...</h2>}
      {/* {!championList && <h2>Loading the variable...</h2>} */}
      {chosenRank && skillLevel && role && (
        <button onClick={() => filterChampionBaseOnSkill()}>
          Click to load the champions
        </button>
      )}
      {championList && chosenRank && skillLevel && role && (
        <div className='output'>
          <h5>Introducing your champions:</h5>
          {championList.map((champion, _championIndex) =>
            champion.tier.includes(skillLevel) && champion.role === role ? (
              <p>
                {champion.name} - win rate: {champion.winRate}
              </p>
            ) : null
          )}
        </div>
      )}
      {/* <button onClick={() => ShowVariable()}>ShowVariable</button> */}
    </div>
  );
}

export default App;
