import { weather } from './weather.js'
const locInput = document.getElementById("loc")
const btn = document.getElementById("btn")
const info = document.getElementById("info")
const zone = document.getElementById("zone")
const img = document.getElementById("icon")
const w = new weather()
let wInfo = {}

btn.addEventListener('click', updateInfo)
locInput.addEventListener('keypress', (e)=>{if(e.key == 'Enter'){updateInfo()}})

async function updateInfo(){
    if(locInput.validity.valid && await w.loadInfo(locInput.value)){
        wInfo = w.getData()
        img.setAttribute("src", wInfo.icon)
        img.style.visibility = 'visible'
        info.style.visibility = 'visible'
        zone.style.visibility = 'visible'

        editElement("location",wInfo.location)
        editElement("temp",wInfo.tempC)
        editElement("current-minmax",`${wInfo.min} - ${wInfo.max}`)
        editElement("status",wInfo.status)
        editElement("rain", `Rain: ${wInfo.rain}%`)
        editElement("humidity",`Humidity: ${wInfo.humidity}%`)
        editElement("date", wInfo.date.toLocaleDateString('en-EN', {weekday: 'long', day: 'numeric', month: 'long',}))
        
    }else{
        console.error("Invalid Input")
    }
}

function editElement(id, text){
    return document.getElementById(id).textContent = text
}
