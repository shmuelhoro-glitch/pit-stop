import fs from "fs/promises";

const FILEPATH = './data.json'

export async function saveDataToFile(){
    const res = await fetch('https://server-for-test-week-13.onrender.com/api/race')
    if (!res.ok) return ('error in fetch')
    const data = await res.json()
    return await fs.writeFile(FILEPATH,JSON.stringify(data,null,2),'utf8')
}



export async function loadingData(){
    try{
    const data = await fs.readFile(FILEPATH,'utf8')
    return await JSON.parse(data)}
    catch{
        (err) => {throw new Error(err)}
    }
}


export async function splitDataForPrint(){
    const data = await loadingData()
    const carsWaiting = data.cars.filter(car => car.status == "waiting")
    console.log()
    console.log('Loading queue data...')
    console.log()
    console.log('========== PIT STOP QUEUE ==========') 
    console.log(`Race: ${data.raceName}`) 
    console.log(`Lap: ${data.currentLap}/${data.totalLaps} `) 
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

    console.log(`Radio message to car #${carsWaiting[0].carNumber}: "Box box box,${carsWaiting[0].driverName}, pit this lap!"`)
    console.log()
    console.log('--- Search for a car by number ---')
}

export async function findCarById(id){
    const data = await loadingData()
    .then(data1 => {
    const isFind = data1.cars.filter(car => car.carNumber == id)
    if (isFind) return isFind 
    else return console.log(`Error: No car found with number #${id} in the current race`)})
    .then(isFind => { console.log(`Found car #${id} | Driver: ${isFind.driverName} | Status: ${isFind.status}`)
    })
    .catch(console.error)
    
}
















