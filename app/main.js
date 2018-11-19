import GameController from "../app/components/game-controller.js"


export default class App {
  constructor() {
    this.controllers = {
      gameController: new GameController()
    }
  }
}

// @ts-ignore
window.app = new App