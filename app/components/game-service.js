// @ts-ignore
let _api = axios.create({
  baseURL: "https://dragon-duel.herokuapp.com/api"
})

let _championApi = "champions"
let _dragonApi = "dragons"

let _champions = []
let _dragons = []
let _activeChampionId = -1
let _activeDragonId = -1

let _activeGame = {}

// ** WHAT THE SERVICE NEEDS
// 1. 


export default class GameService {
  constructor() {
    console.log('this is your service speaking')
  }
  get champions() {
    return _champions
  }
  get dragons() {
    return _dragons
  }
  get activeChampion() {
    return _activeChampionId
  }
  get activeDragon() {
    return _activeDragonId
  }
  get activeGame() {
    return _activeGame
  }
  getChampions(drawChampion) {
    console.log('champions should be drawn to the screen')
    _api.get(_championApi)
      .then(res => {
        _champions = res.data
        drawChampion()
      })
  }
  getDragons(drawDragon) {
    console.log('dragons should be drawn to the screen')
    _api.get(_dragonApi)
      .then(res => {
        _dragons = res.data
        drawDragon()
      })
  }
  setActiveChampion(champId) {
    _activeChampionId = champId
  }
  setActiveDragon(dragonId) {
    _activeDragonId = dragonId
  }

  startGame(drawGame) {
    //CHECK if both IDs are greater than -1
    let newGame = {
      dragonId: _activeDragonId,
      champId: _activeChampionId
    }
    _api.post('game', newGame)
      .then(response => {
        _activeGame = response.data
        drawGame()
      }
      )
  }
  attack(attackName, drawGame) {
    _api.put('games/' + _activeGame.id, { attack: attackName })
      .then(response => {
        _activeGame = response.data
        drawGame()
      }
      )
  }



}


