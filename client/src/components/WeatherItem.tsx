import React from 'react'

 interface weatherProp {
    loading: boolean
    prediction: string[]
    weather:{
        weather:{
            id:number
            main:string
            description:string
            icon:string
        }[]
        main:{
            temp:number
            // wind:number
            humidity:number
        }
        wind:{
            speed:number
        }
        sys:{
            country:string
        }
        name:string
    }

}
const WeatherItem: React.FC<weatherProp> = ({weather, loading, prediction}) => {

    const weatherElement = weather.weather.map((currentWeather)=>{
        const {id, main, description, icon} = currentWeather
        return(
            <div key={id} className="w-full h-full bg-slate-100/50 rounded-xl px-4 py-3 " >
                <div className="w-full flex justify-between mb-2 gap-4 ">

                    <div className="relative">
                        <h2 className=" text-slate-900 font-semibold text-xl">{weather.name}</h2>
                        <h3 className="absolute -right-4 top-4 z-10 opacity-100 text-xs text-cyan-900">{weather.sys.country}</h3>
                    </div>
                    <div className="ml-7">
                        <h4 className="text-xl font-bold text-slate-900">{main}</h4>
                        <p className="text-slate-900 text-xs font-medium">{description}&nbsp;</p>
                    </div>
                    <div className="h-16 bg-slate-900/30 rounded-lg">

                    <img className=" drop-shadow animate-bounce " src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt={`/${weather.name}`} />
                    </div>
                </div>
                <div className="flex w-full justify-around   pb-4 ">
                    <div>
                        {/* humidity */}
                        <div className="flex items-center">
                        <p className="text-3xl text-slate-900">{weather.main.humidity}</p>
                        <span>%</span>
                        </div>
                   
                        <h5>Humidity</h5>
                    </div>
                    <div>
                        {/* feels_like */}
                        <div className="flex items-center gap-1">
                            <p className="text-3xl text-slate-900">{weather.wind.speed.toFixed(0)}</p>
                            <span className="text-sm">MPH</span>

                        </div>
                        <h5>Feels Like</h5>
                    </div>
                    <div>
                        {/* temp */}
                        <p className="text-4xl text-slate-900 font-semibold">{(weather.main.temp - 273.25).toFixed(0)}&#176;</p>
                        <h5>Temperature</h5>
                    </div>
                </div>
                
                
            </div>
        )
           
    })
  return (
    <div>WeatherItem</div>
  )
}

export default WeatherItem