/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
     // Loop over each item in the data
     games.forEach(game => {
        // Create a new div element, which will become the game card
        const gameCard = document.createElement('div');

        // Add the class "game-card" to the div's class list
        gameCard.classList.add('game-card');

        // Set the inner HTML using a template literal to display some info 
        // about each game
        gameCard.innerHTML = `
            <h3>${game.name}</h3>
            <p>Description: ${game.description}</p>
            <p>Pledged: ${game.pledged}</p>
            <p>Goal: ${game.goal}</p>
            <p>Backers: ${game.backers}</p>
            <img src="${game.img}" alt="${game.name} Image" class="game-img" />
        `;
        // Append the game to the games-container
        const gamesContainer = document.getElementById('games-container');
        gamesContainer.appendChild(gameCard);
    });
}

addGamesToPage(GAMES_JSON); 


// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((accumulator, game) => {
    return accumulator + game.backers;
}, 0);


// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `Total Contributions: ${totalContributions.toLocaleString()}`;


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalRaised = GAMES_JSON.reduce((accumulator, game) => {
    return accumulator + game.pledged;
}, 0);

// set inner HTML using template literal
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

// set inner HTML of gamesCard
gamesCard.innerHTML = `Total Games: ${GAMES_JSON.length}`;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
}
filterUnfundedOnly();

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);

    // use the function we previously created to add the funded games to the DOM
    addGamesToPage(fundedGames);
}
filterFundedOnly();

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}
showAllGames();

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use reduce to count the number of unfunded games
const numberOfUnfundedGames = GAMES_JSON.reduce((count, game) => {
    return count + (game.pledged < game.goal ? 1 : 0);
  }, 0);


// create a string that explains the number of unfunded games using the ternary operator
const unfundedGamesString = numberOfUnfundedGames === 1
  ? `${numberOfUnfundedGames} game is unfunded.`
  : `Currently, ${numberOfUnfundedGames} games are unfunded.`;


// create a new DOM element containing the template string and append it to the description container
const unfundedGamesElement = document.createElement('p');
unfundedGamesElement.textContent = unfundedGamesString;
descriptionContainer.appendChild(unfundedGamesElement);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
  return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [topGame, runnerUp] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const topGameElement = document.createElement('p');
topGameElement.textContent = `${topGame.name}`;
firstGameContainer.appendChild(topGameElement);

// create a new element to hold the name of the runner-up game, then append it to the correct element
const runnerUpElement = document.createElement('p');
runnerUpElement.textContent = `${runnerUp.name}`;
secondGameContainer.appendChild(runnerUpElement);

function searchGames() {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  
    // Filter games based on the search term
    const searchResults = GAMES_JSON.filter(game =>
      game.name.toLowerCase().includes(searchTerm)
    );
  
    // Display the search results
    deleteChildElements(gamesContainer); // Clear existing games
    addGamesToPage(searchResults);
}
searchGames();
  