import axios from 'axios';
import { useState, useEffect } from 'react';
function App() {
  const [chosenRank, SetChosenRank] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [championList, setChampionList] = useState(null);
  function ShowVariable() {
    console.log(championList);
  }
  function GetAllChampions() {
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
    if (chosenRank) {
      GetAllChampions();
    }
    //run when ever this changes
  }, [chosenRank]);
  return (
    <div className='App'>
      {!chosenRank && (
        <div className='Rank-selector'>
          <h1>League of Legends Champion Picker</h1>
          <p>Select Your Rank to start</p>
          <select
            name='ranks'
            id='ranks'
            value={chosenRank}
            onChange={(e) => SetChosenRank(e.target.value)}
          >
            <option value='rank'>Choose a Rank</option>

            <option value='Iron'>Iron</option>
            <option value='Bronze'>Bronze</option>
            <option value='Silver'>Silver</option>
          </select>
        </div>
      )}
      {isLoading && <h2>Loading...</h2>}
      {!championList && <h2>Loading the variable...</h2>}

      <button>Click to load the champions</button>

      <button onClick={() => ShowVariable()}>ShowVariable</button>
    </div>
  );
}

export default App;
