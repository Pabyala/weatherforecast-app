import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import './WeatherContent.css'
import {MdThunderstorm} from 'react-icons/md'
import {LiaSnowflakeSolid} from 'react-icons/lia'
import {BiSolidSun, BiSolidMoon} from 'react-icons/bi'
import {FaCloudSunRain, FaCloudMoonRain} from 'react-icons/fa6'
import {BsCloudSunFill, BsCloudMoonFill, BsFillCloudsFill, 
    BsClouds, BsFillCloudSleetFill, BsFillCloudHaze2Fill} from 'react-icons/bs'
import TodaysForecast from "./TodaysForecast";
import FiveDaysForecast from "./FiveDaysForecast";
import FormInputBtn from "./FormInputBtn";
import ErrorEmptyInput from "./ErrorEmptyInput";
import ErrorNotFound from "./ErrorNotFound";

export default function WeatherContent() {

    const API_KEY = '8bd6b6cece9cc9d532f3e24669a1c9fd'

    const [inputCity, setInputCity] = useState("Marikina")
    const [currentWeather, setCurrentWeather] = useState(null)
    const [fiveDaysForecast, setFiveDaysForcecast] = useState([]) //five days forecast
    const [currentForecast, setCurrentForecast] = useState([]) //3hrs forecast

    const handleInputChange = (event) => {
        setInputCity(event.target.value);
    };

    useEffect(() => {
        fetchWeather(inputCity);
    }, []);

    const handleButtonClick  = (e) => {
        e.preventDefault()
        fetchWeather(inputCity)
    }

    
    const fetchWeather = async (city) => {
        const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`

        if (!city.trim()) {
            setShowForEmptyInput(true)
            return; 
        }

        fetch(weatherURL)
            .then((res) => res.json())
            .then((dataWeather) => {

                if(dataWeather.cod === '404'){
                    setShowForCityNotFound(true)
                } else {
                setCurrentWeather(null)
                setCurrentWeather(dataWeather)

                const lat = dataWeather.coord.lat;
                const lon = dataWeather.coord.lon;
        
                weatherCity(lat, lon);
                }
            })
            .catch((err) => {
                console.error('Error fetching weather data:', err);
            });
    }

    const weatherCity = (lat, lon) => {
        if (lat !== null && lon !== null) {
            const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      
            fetch(forecastURL)
              .then((res) => res.json())
              .then((dataCity) => {
                let oneDayThreeHrsForecast = dataCity.list.slice(0, 5);
                setCurrentForecast(oneDayThreeHrsForecast)
                
                const uniqueForecastDays = [];
                const getDaysForcecast = dataCity.list.filter((forecast) => {
                    const forcecastDate = new Date(forecast.dt_txt).getDate()
                    if(!uniqueForecastDays.includes(forcecastDate)){
                        uniqueForecastDays.push(forcecastDate)
                        return true;
                    }
                    return false;
                })
                setFiveDaysForcecast(getDaysForcecast)
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            console.error('Latitude and longitude are not available.');
          }
    }
    
    const calculateTimeOfForecast = (dateAndTime) => {
        let newDate = new Date(dateAndTime);
        let hrs = newDate.getHours().toString().padStart(2, '0');
        let mints = newDate.getMinutes().toString().padStart(2, '0');
        let AMandPM = "AM";
        
        if (hrs >= 12) {
          AMandPM = "PM";
          if (hrs > 12) {
            hrs -= 12;
            hrs = hrs.toString().padStart(2, '0');
          }
        } else if (hrs === '00') {
          hrs = '12'; 
        }
        return `${hrs}:${mints}${AMandPM}`;
    };

    const calculateDateDay = (dateAndDay) => {
        let newDateFiveDays = new Date(dateAndDay)
        let daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        let date = newDateFiveDays.getDate();
        let dayOfWeek = daysOfWeek[newDateFiveDays.getDay()]

        return `${date} ${dayOfWeek}`
    }

    const weatherIconMapping = {        
        '01d': <BiSolidSun/>,
        '01n': <BiSolidMoon/>,
        '02d': <BsCloudSunFill/>,
        '02n': <BsCloudMoonFill/>,
        '03d': <BsClouds/>,
        '03n': <BsClouds/>,
        '04d': <BsFillCloudsFill/>,
        '04n': <BsFillCloudsFill/>,
        '09d': <BsFillCloudSleetFill/>,
        '09n': <BsFillCloudSleetFill/>,
        '10d': <FaCloudSunRain/>,
        '10n': <FaCloudMoonRain/>,
        '11d': <MdThunderstorm/>,
        '11n': <MdThunderstorm/>,
        '13d': <LiaSnowflakeSolid/>,
        '13n': <LiaSnowflakeSolid/>,
        '50d': <BsFillCloudHaze2Fill/>,
        '50n': <BsFillCloudHaze2Fill/>,
    };
    let todayWeatherIcon = weatherIconMapping[currentWeather?.weather[0]?.icon];

    const [showForEmptyInput, setShowForEmptyInput] = useState(false);
    const handleCloseEmpty = () => setShowForEmptyInput(false);

    const [showForCityNotFound, setShowForCityNotFound] = useState(false);
    const handleCloseNotFound = () => setShowForCityNotFound(false);

    
    const getWordFormApi = currentWeather?.weather[0]?.description
    const capitalizedWord = getWordFormApi ? getWordFormApi.charAt(0).toUpperCase() + getWordFormApi.slice(1) : ""
    
    return (
        <>
            <Container>
                <div className="weather-content">
                    <ErrorEmptyInput
                        showForEmptyInput={showForEmptyInput}
                        handleCloseEmpty={handleCloseEmpty}
                    />
                    
                    <ErrorNotFound
                        showForCityNotFound={showForCityNotFound}
                        handleCloseNotFound={handleCloseNotFound}
                        inputCity={inputCity}
                    />
                    
                    <h2 className="title">Weather Forecast</h2>
                    <FormInputBtn
                        inputCity={inputCity}
                        handleInputChange={handleInputChange}
                        handleButtonClick={handleButtonClick}
                    />
                    
                    <div className="currentWeather-todaysForecast">
                        <div className="current-weather-content">
                            <div className="currentWeather-details">
                                <div className="weather-title-wrap">
                                    <h4 className="weather-title">Current Weather</h4>
                                    <h3 className="weather-city">
                                        {`${currentWeather?.name}, ${currentWeather?.sys?.country}`}
                                    </h3>
                                </div>
                                <div className="cloudy-temp-wrap">
                                    <div className="description-img">
                                        <span className="todayWeatherIcon">
                                            {todayWeatherIcon}
                                        </span>
                                    </div>
                                    <div className="temp-description">
                                        <div className="temp">
                                            <span className="temp-number">
                                                {Math.round(currentWeather?.main?.temp)}
                                            </span>
                                            <span className="temp-cell">°C</span>
                                        </div>
                                        <span className="weather-descriptiom">
                                            {capitalizedWord}
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="forecast-info">
                                    <div className="wind">
                                        <span className="description-title">Wind</span>
                                        <span className="description-value">{`${currentWeather?.wind?.speed}`}m/s</span>
                                    </div>
                                    <div className="wind">
                                        <span className="description-title">Humidity</span>
                                        <span className="description-value">{`${currentWeather?.main?.humidity}`}%</span>
                                    </div>
                                    <div className="wind">
                                        <span className="description-title">Feels like</span>
                                        <span className="description-value">{Math.round(currentWeather?.main?.feels_like)}°</span>
                                    </div>
                                    <div className="wind">
                                        <span className="description-title">Visibility</span>
                                        <span className="description-value">{`${currentWeather?.visibility / 1000}`}km</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <TodaysForecast
                            currentForecast={currentForecast}
                            calculateTimeOfForecast={calculateTimeOfForecast}
                            weatherIconMapping={weatherIconMapping}
                        />
                    </div>
                    
                    <FiveDaysForecast
                        fiveDaysForecast={fiveDaysForecast}
                        weatherIconMapping={weatherIconMapping}
                        calculateDateDay={calculateDateDay}
                    />
                </div>
            </Container>
        </>
    );
}
