export function weather(){
    const data = {}
    const getData = ()=> {return data}
    async function loadInfo(location){
        try{
            let response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=f8abbef2852443bc969152457240603&q=${location}&days=3`,{mode:'cors'})
            let weather = await response.json()
            data.location = `${weather.location.name} - ${weather.location.country}`
            data.tempC = `${weather.current.temp_c}° C`
            data.tempF = `${weather.current.temp_f}° F`
            data.status = `${weather.current.condition.text}`
            data.humidity = weather.current.humidity
            data.icon = weather.current.condition.icon
            data.max = `${weather.forecast.forecastday[0].day.maxtemp_c}° C`
            data.min = `${weather.forecast.forecastday[0].day.mintemp_c}° C`
            data.rain = weather.forecast.forecastday[0].day.daily_chance_of_rain
            data.date = new Date(weather.location.localtime)
            return true
        }catch(e){
            console.log(e);
            return false
        }
    }
    return {loadInfo, getData}
}