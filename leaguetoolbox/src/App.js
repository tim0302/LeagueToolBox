import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  //ranking such as iron, bronze, silver
  const [chosenRank, setChosenRank] = useState(null);
  //the loading status of the championlist
  const [isLoading, setIsLoading] = useState(false);
  //full response from api
  const [championList, setChampionList] = useState(null);
  //skill level, low or high
  const [skillLevel, setSkillLevel] = useState(null);
  //the role the player is playing
  const [role, setRole] = useState(null);
  //random champion from the list
  const [random, setRandom] = useState(null);
  //temporary list for a certain row to calculate random
  var templist = [];
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
  function randomItem(items) {
    setRandom(items[Math.floor(Math.random() * items.length)]);
    return items[Math.floor(Math.random() * items.length)];
  }
  useEffect(() => {
    if (chosenRank) {
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
      {isLoading && <h2>Loading Champions...</h2>}

      {<h2>Introducing your champions:</h2>}

      {championList && skillLevel && role && (
        <div className='output'>
          {championList.map((champion, _championIndex) =>
            champion.tier.includes(skillLevel) && champion.role === role ? (
              <div className='selected-champ'>
                <p>
                  {champion.name} - win rate: {champion.winRate}
                </p>
                <span hidden>{templist.push(champion.name)}</span>
                <img
                  id='image'
                  width='100'
                  height='100'
                  src={
                    //stick the seperated names together
                    'https://ddragon.leagueoflegends.com/cdn/12.4.1/img/champion/' +
                    champion.name.replace(/\s/g, '') +
                    '.png'
                  }
                ></img>
              </div>
            ) : null
          )}
          <p>
            The champion system picked for you is: {random}
            {random && (
              <img
                id='image'
                width='100'
                height='100'
                src={
                  'https://ddragon.leagueoflegends.com/cdn/12.4.1/img/champion/' +
                  random +
                  '.png'
                }
              ></img>
            )}
          </p>
          <button onClick={() => randomItem(templist)}>
            Roll For a Champion
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
