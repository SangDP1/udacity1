import { displayResults } from './js/app'
import { removeResults } from './js/app'


import './styles/style.scss'


export {
    displayResults,
    removeResults
}


// Add event listener
document.querySelector("#saveButton").addEventListener('click', displayResults);
document.querySelector("#removeButton").addEventListener('click', removeResults);

