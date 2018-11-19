import GameService from "./game-service.js"

let _gameService = new GameService()

let activeChampion = _gameService.activeChampion
let activeDragon = _gameService.activeDragon

function drawChampion() {
  let champions = _gameService.champions;
  let template = ''
  champions.forEach((champion) => {
    template += `<div class="card" style="width: 18rem;">
  <img class="card-img-top cardSize" src="${champion.imgUrl}" alt="Card image cap">
  <div class="card-body">
  <h5 class="card-title">${champion.name}</h5>
    <p><i>${champion.class} ${champion.race}</i></p>
    <p><i> Max HP : ${champion.hp}</i></p>
    <button class="btn btn-warning cursor" onclick="app.controller.gameController.selectChampion(${champion._id})">Select</button>
  </div>
</div>`
    document.getElementById('champions').innerHTML = template
  });
}

function drawDragon() {
  let dragons = _gameService.dragons
  let template = ''
  dragons.forEach((dragon) => {
    template += `<div class="card" style="width: 18rem;">
  <img class="card-img-top cardSize" src="${dragon.imgUrl}" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">${dragon.name}</h5>
    <p><i> Max HP : ${dragon.maxHP}</i></p>
    <p>Still a dragon, no matter the color.</p>
    <button class="btn btn-danger cursor" onclick="app.controller.gameController.selectDragon(drawDragon)">Select</button>
  </div>
</div>`
    document.getElementById('dragons').innerHTML = template
  })
}

function drawGame() {
  let game = _gameService.activeGame

}

// **WHAT THE CONTROLLER NEEDS**
// 1. function that pulls one champion from array of champions => set active champion by id
// 2. function that pulls one dragon from array of dragons => set active dragon by id
// 3. Something that allows the player to START the game, once the both have been selected
// 3.5 Function that selects active champion/dragon to new game
// 4. Once the START button is pressed, render the fight 
// 5. Attacks buttons that decrement health of dragon
// 6. On attack, decrement champion health by default attack damage of dragon


export default class GameController {
  constructor() {
    console.log('this is your CTRL speaking')
    _gameService.getChampions(drawChampion)
    _gameService.getDragons(drawDragon)
  }
  selectChampion(champId) {
    // Access the array of champions in service, and find the champion by the id, then set the active champion to the champion at that id
    _gameService.setActiveChampion(champId)
    //
  }
  selectDragon(dragonId) {
    // Access the array of champions in service, and find the champion by the id, then set the active champion to the champion at that id
    _gameService.setActiveDragon(dragonId)
  }

  startFight() {
    // Set active champion and active dragon to a new game. 
    _gameService.startGame(drawGame)
  }
  attack(attackName) {
    // Onclick, for whichever attack is chosen from that array, drill into that attack and find that attack's damage. Decrement the dragon health by the attack damage, then decrement the champion's health by the dragon's attack damge. Then after that, redraw the champ&drags health
    _gameService.attack(attackName, drawGame)
  }
}