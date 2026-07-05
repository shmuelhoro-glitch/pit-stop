import fs from "fs/promises";

const FILEPATH = './data.json'

export async function saveDataToFile(){
    const res = await fetch('https://server-for-test-week-13.onrender.com/api/race')
    if (!res.ok) return ('error in fetch')
    const data = await res.json()
    return await fs.writeFile(FILEPATH,JSON.stringify(data,null,2),'utf8')
}



export async function loadingData(){
    console.log('Loading queue data...')
    const data = await fs.readFile(FILEPATH,'utf8')
    return await JSON.parse(data)
}


export async function splitDataForPrint(data){
    const carsWaiting = data.cars.filter(car => car.status == "waiting")
    console.log('========== PIT STOP QUEUE ==========') 
    console.log(`Race: ${data["raceName"]}`) 
    console.log(`Lap: ${data.currentLap}/ ${data.totalLaps} `) 
    console.log(`Total cars in race: ${data.cars.length}`)
    console.log(`Pit stops completed: ${data.cars.filter((car) => car.status == "done").length}`)
    console.log()
    
    console.log('Cars waiting for pit stop:')
    console.log(`${carsWaiting.map(car => `-Car #${car.carNumber} | Driver: ${car.driverName}\n`)}`)
    console.log()
    
    console.log('Next car to enter the pit:')
    console.log(`>> Car #${carsWaiting[0].carNumber} | Driver: ${carsWaiting[0].driverName}`)
    console.log('=====================================')
    console.log()

}



const currentData = await loadingData()
.then(data => splitDataForPrint(data))




