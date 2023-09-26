import React from 'react'
import {FaTemperatureFull} from 'react-icons/fa6'
import {WiHumidity} from 'react-icons/wi'
import {BiWind} from 'react-icons/bi'
import './TodaysForecast.css'

import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';


function TodaysForecast ({currentForecast, calculateTimeOfForecast, weatherIconMapping }) {
    return (
        <div className="todays-forecast">
            <h4 className="t-forecast">Today's Forecast</h4>
            <div className="three-hours-forecast">
                <Swiper
                    pagination={{
                    clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                    breakpoints={{
                        0: {
                            slidesPerView: 3.4,
                            spaceBetween: 10,
                        },
                        576: {
                            slidesPerView: 4.5,
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 5,
                            spaceBetween: 10,
                        },
                        992: {
                            slidesPerView: 5,
                            spaceBetween: 10,
                        } 
                    }}
                >
                    {currentForecast.map((forecast, index) => {

                        let timeOfForecast = calculateTimeOfForecast(forecast.dt_txt);
                        let weatherIcon = weatherIconMapping[forecast.weather[0].icon];

                        return(
                            <SwiperSlide className='swiper-wrap'>
                            <div className="threeHours-forecast-content" key={index}>
                                <div className="threeHours-forecast-time">
                                    <span className="threeHours-time-value">{timeOfForecast}</span>
                                </div>
                                <div className="threeHours-weather">
                                    <span className="threeHrsWeatherIcon">{weatherIcon}</span>
                                </div>
                                <div className="threeHours-temp">
                                    <span className='weatherDetailsIcon'><FaTemperatureFull/> {Math.round(forecast.main.temp)}°</span>
                                    <span className='weatherDetailsIcon'><BiWind/> {`${forecast.wind.speed}`}m/s</span>
                                    <span className='weatherDetailsIcon'><WiHumidity/> {`${forecast.main.humidity}`}%</span>
                                </div>
                            </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
        </div>
    )
}
export default TodaysForecast;

