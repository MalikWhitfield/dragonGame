export default class Dragon {
  constructor(data) {
    this._id = data._id
    this.name = data.name
    this.imgUrl = data.imgUrl
    this.maxHP = data.maxHP
  }
}