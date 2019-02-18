import MainController from './controllers/MainController.js'

const mainController = new MainController()

document.addEventListener('DOMContentLoaded', () => {
  mainController.init()
})
