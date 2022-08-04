import axios from 'axios';
import { useState, useEffect } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

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
        <h1 id='title'>League of Legends Champion Picker</h1>
        <p>
          This is a champion picker tool developed by Tim, which helps you to
          decide which champions to play based on current meta (if you are
          wondering). You can choose your preferences of your play style, then
          let the system decide which champion you should play.
        </p>
        <h4>Select your preferences to start:</h4>

        <div className='selections'>
          <select
            className='select'
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
            className='select'
            name='skill'
            id='skill'
            value={skillLevel}
            onChange={(e) => setSkillLevel(e.target.value)}
          >
            <option value={null}>Choose your skill level</option>

            <option value='D'>[Hell] Bring me some real challenge</option>
            <option value='C'>[Hard] I can beat most of the players</option>
            <option value='B'>
              [Intermediate] I'm okay with some challenge
            </option>
            <option value='A'>[Easy] I'm getting better</option>
            <option value='S'>[Very Easy] I'm new to this game!</option>
          </select>

          <select
            className='select'
            name='role'
            id='role'
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value={null}>Choose your prefered role</option>

            <option value='TOP'>Top</option>
            <option value='MID'>Mid</option>
            <option value='JUNGLE'>Jungle</option>
            <option value='ADC'>Bottom</option>
            <option value='SUPPORT'>Support</option>
          </select>
        </div>
      </div>
      <div className='loading'>
        {isLoading && <h3>Loading Champions...</h3>}
        <ClipLoader color={'FF0000'} loading={isLoading} size={150} />
      </div>
      {!isLoading && championList && skillLevel && role && (
        <h3>Introducing your champions:</h3>
      )}

      {!isLoading && championList && skillLevel && role && (
        <div className='output'>
          <div className='outputChampList'>
            {championList.map((champion, _championIndex) =>
              champion.tier.includes(skillLevel) && champion.role === role ? (
                <div className='selected-champ'>
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
                  <p>{champion.name}</p>

                  <p>Win rate: {champion.winRate}</p>
                </div>
              ) : null
            )}
          </div>
          <div className='randomizer'>
            <h4>The champion system picked for you is: {random}</h4>
            {random && (
              <img
                id='image'
                width='150'
                height='150'
                src={
                  'https://ddragon.leagueoflegends.com/cdn/12.4.1/img/champion/' +
                  random +
                  '.png'
                }
              ></img>
            )}

            <button class='button' onClick={() => randomItem(templist)}>
              Roll For a Champion
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
