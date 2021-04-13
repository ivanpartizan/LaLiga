const scroll = new SmoothScroll('a[href*="#"]');

const urlStandings =
  "https://api.football-data.org/v2/competitions/2014/standings";

const urlResults =
  "https://api.football-data.org/v2/competitions/2014/matches?status=FINISHED";

const urlScorers = "https://api.football-data.org/v2/competitions/2014/scorers";

async function getStandings() {
  const response = await fetch(urlStandings, {
    method: "GET",
    headers: {
      "X-Auth-Token": "ef72570ff371408f9668e414353b7b2e",
    },
  });
  const data = await response.json();
  console.log(data);

  document.getElementById(
    "standingsOverall"
  ).innerHTML = `<h1 class='title'>STANDINGS</h1><table class='table'>
  <tr class='tableHeading'><td></td><td></td><td></td><td>P</td><td>W</td><td>D</td><td>L</td><td>GF</td><td>GA</td><td>GD</td></tr>
  <tr>
  ${data.standings[0].table
    .map(
      (team) => ` 
    
    <td>${team.position}</td><td><img src=${team.team.crestUrl} height='20'></td><td>${team.team.name}</td><td class='points'>${team.points}</td><td>${team.won}</td><td>${team.draw}</td><td>${team.lost}</td><td>${team.goalsFor}</td><td>${team.goalsAgainst}</td><td>${team.goalDifference}</td>
    </tr>`
    )
    .join("")}</table>
  `;

  document.getElementById(
    "standingsHome"
  ).innerHTML = `<h1 class='title'>HOME</h1><table class='table'>
  <tr class='tableHeading'><td></td><td></td><td></td><td>P</td><td>W</td><td>D</td><td>L</td><td>GF</td><td>GA</td><td>GD</td></tr>
  <tr>
  ${data.standings[1].table
    .map(
      (team) => ` 
    
    <td>${team.position}</td><td><img src=${team.team.crestUrl} height='20'></td><td>${team.team.name}</td><td class='points'>${team.points}</td><td>${team.won}</td><td>${team.draw}</td><td>${team.lost}</td><td>${team.goalsFor}</td><td>${team.goalsAgainst}</td><td>${team.goalDifference}</td>
    </tr>`
    )
    .join("")}</table>
  `;

  document.getElementById(
    "standingsAway"
  ).innerHTML = `<h1 class='title'>AWAY</h1><table class='table'>
  <tr class='tableHeading'><td></td><td></td><td></td><td>P</td><td>W</td><td>D</td><td>L</td><td>GF</td><td>GA</td><td>GD</td></tr>
  <tr>
  ${data.standings[2].table
    .map(
      (team) => ` 
    
    <td>${team.position}</td><td><img src=${team.team.crestUrl} height='20'></td><td>${team.team.name}</td><td class='points'>${team.points}</td><td>${team.won}</td><td>${team.draw}</td><td>${team.lost}</td><td>${team.goalsFor}</td><td>${team.goalsAgainst}</td><td>${team.goalDifference}</td>
    </tr>`
    )
    .join("")}</table>
  `;
}

async function getResults() {
  const response = await fetch(urlResults, {
    method: "GET",
    headers: {
      "X-Auth-Token": "ef72570ff371408f9668e414353b7b2e",
    },
  });
  const data1 = await response.json();
  console.log(data1);

  document.getElementById(
    "results"
  ).innerHTML = `<h1 class='title'>RESULTS</h1><table class='table matches'><tr>
  ${data1.matches
    .map(
      (match) =>
        `<td>Round ${match.matchday}</td><td class='${
          match.score.winner == "HOME_TEAM" ? "winner" : "loser"
        }'>${match.homeTeam.name}</td> <td>vs</td> <td class='${
          match.score.winner == "AWAY_TEAM" ? "winner" : "loser"
        }'>${match.awayTeam.name}</td><td>${
          match.score.fullTime.homeTeam
        }</td><td>-</td><td>${match.score.fullTime.awayTeam}</td><td>(${
          match.score.halfTime.homeTeam
        } - ${match.score.halfTime.awayTeam})</td></tr>`
    )
    .join("")}</table>
  `;
}

async function getScorers() {
  const response = await fetch(urlScorers, {
    method: "GET",
    headers: {
      "X-Auth-Token": "ef72570ff371408f9668e414353b7b2e",
    },
  });
  const data2 = await response.json();
  console.log(data2);

  document.getElementById(
    "goalscorers"
  ).innerHTML = `<h1 class='title'>TOP 10 GOALSCORERS</h1><table class='table scorers'><tr class='tableHeading'><td>Name<td><td>Team<td><td>Country<td><td>Goals<td></tr>
  ${data2.scorers
    .map(
      (player) => `<td>
    ${player.player.name}<td><td>${player.team.name}<td><td>${player.player.nationality}<td><td>${player.numberOfGoals}<td></tr>`
    )
    .join("")}</table>
  `;
}

getStandings();
getResults();
getScorers();

function calculate() {
  let startDate = new Date("August 01, 2021").getTime();
  let now = new Date().getTime();
  let difference = startDate - now;

  let second = 1000;
  let minute = second * 60;
  let hour = minute * 60;
  let day = hour * 24;

  let days = Math.floor(difference / day);
  let hours = Math.floor((difference % day) / hour);
  let minutes = Math.floor((difference % hour) / minute);
  let seconds = Math.floor((difference % minute) / second);

  document.getElementById(
    "days"
  ).innerHTML = `<span class='numbers'>${days}</span><br>DAYS`;
  document.getElementById("hours").innerHTML = `<span class='numbers'>${
    hours < 10 ? "0" : ""
  }${hours}</span><br>HOURS
  `;
  document.getElementById("minutes").innerHTML = `<span class='numbers'>${
    minutes < 10 ? "0" : ""
  }${minutes}</span><br>MINUTES
  `;
  document.getElementById("seconds").innerHTML = `<span class='numbers'>${
    seconds < 10 ? "0" : ""
  }${seconds}</span><br>SECONDS
  `;

  setInterval(calculate, 1000);
}

calculate();
