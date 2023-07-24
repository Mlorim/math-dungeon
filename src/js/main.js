import '../css/style.css'
import { startGame } from './game';

const startGameButton = document.getElementById('enter1');
startGameButton.addEventListener('click', startGame)