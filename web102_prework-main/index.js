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
    const gamesContainer = document.getElementById("games-container");
    deleteChildElements(gamesContainer);
    
    for (let i = 0; i < games.length; i++) {
        const game = games[i];
        
        // Create and add game elements here
        const gameCard = document.createElement("div");
        gameCard.classList.add("game-card");
        
        // Create and add game image
        const gameImg = document.createElement("img");
        gameImg.src = game.img;
        gameImg.alt = game.name;
        gameImg.classList.add("game-img");
        gameCard.appendChild(gameImg);
        
        // Create and add game name
        const gameName = document.createElement("h2");
        gameName.textContent = game.name;
        gameCard.appendChild(gameName);
        
        // Create and add game description
        const gameDesc = document.createElement("p");
        gameDesc.textContent = game.description;
        gameCard.appendChild(gameDesc);
        
        // Create and add funding status
        const fundingStatus = document.createElement("p");
        fundingStatus.textContent = `$${game.pledged.toLocaleString()} raised of $${game.goal.toLocaleString()} goal`;
        gameCard.appendChild(fundingStatus);
        
        // Create and add backers count
        const backersCount = document.createElement("p");
        backersCount.textContent = `${game.backers.toLocaleString()} backers`;
        gameCard.appendChild(backersCount);
        
        // Add the complete card to the games container
        gamesContainer.appendChild(gameCard);
    }
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((total, game) => {
    return total + game.backers;
}, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = totalContributions.toLocaleString();

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

// set inner HTML using template literal
const totalRaised = GAMES_JSON.reduce((total, game) => {
    return total + game.pledged;
}, 0);
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = GAMES_JSON.length;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    const unfundedGames = GAMES_JSON.filter((game) => {
        return game.pledged < game.goal;
    });
    console.log("Unfunded games:", unfundedGames.length);
    addGamesToPage(unfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
    const fundedGames = GAMES_JSON.filter((game) => {
        return game.pledged >= game.goal;
    });
    console.log("Funded games:", fundedGames.length);
    addGamesToPage(fundedGames);
}

// show all games
function showAllGames() {
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
document.getElementById("unfunded-btn").addEventListener("click", filterUnfundedOnly);
document.getElementById("funded-btn").addEventListener("click", filterFundedOnly);
document.getElementById("all-btn").addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal).length;

// create a string that explains the number of unfunded games using the ternary operator
const descriptionString = `Sea Monster has raised $${totalRaised.toLocaleString()} for ${GAMES_JSON.length} games. 
Currently, there ${unfundedGames === 1 ? 'is' : 'are'} ${unfundedGames} 
game${unfundedGames === 1 ? '' : 's'} that ${unfundedGames === 1 ? 'remains' : 'remain'} unfunded.`;

// create a new DOM element containing the template string and append it to the description container
const descriptionElement = document.createElement("p");
descriptionElement.textContent = descriptionString;
descriptionContainer.appendChild(descriptionElement);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame, ...rest] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const firstGameElement = document.createElement("h3");
firstGameElement.textContent = `${firstGame.name}`;
firstGameContainer.appendChild(firstGameElement);

// do the same for the runner up item
const secondGameElement = document.createElement("h3");
secondGameElement.textContent = `${secondGame.name}`;
secondGameContainer.appendChild(secondGameElement);

const result = ["cat", "dog", "bird"].reduce((sum, animal) => {
  return sum + animal.charAt(0);
}, "");
    