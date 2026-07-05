import { saveDataToFile,splitDataForPrint } from "./raceService.js"


// saveDataToFile()
// .then('success')
// .catch('error')


function showEnterMenu(){
    console.log('Pit Stop Queue - Race Team Management System')
    console.log("Race engineer: 'Let's check the current queue status on the pit wall'.")
}




function main(){
    saveDataToFile()
    showEnterMenu()
    splitDataForPrint()
}
