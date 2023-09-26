import React from 'react'
import {FaTemperatureFull} from 'react-icons/fa6'
import {WiHumidity} from 'react-icons/wi'
import {BiWind} from 'react-icons/bi'
import './FiveDaysForecast.css'

import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

function FiveDaysForecast({fiveDaysForecast, weatherIconMapping, calculateDateDay}) {
    return (
        <div className="fiveDaysForecast">
            <h4 className="fiveDaysForecast-title">Five days Forecast</h4>
            <div className="fiveDaysForecast-content">
                <Swiper 
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                    breakpoints={{
                        0: {
                            slidesPerView: 2.3,
                            spaceBetween: 10,
                        },
                        576: {
                            slidesPerView: 3.1,
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 4.1,
                            spaceBetween: 10,
                        },
                        992: {
                            slidesPerView: 5,
                            spaceBetween: 10,
                        },
                        1200: {
                            slidesPerView: 5,
                            spaceBetween: 10,
                        } 
                    }}
                >
                    {fiveDaysForecast.slice(1, 6).map((fiveDForecast, index) => {
                        let weatherIcon = weatherIconMapping[fiveDForecast.weather[0].icon];
                        let dayAndDate = calculateDateDay(fiveDForecast.dt_txt)
                        return(
                            <SwiperSlide key={index}>
                            <div className="fiveDaysForecast-wrap">
                                <span className="fiveDaysForecast-date">{dayAndDate}</span>
                                <div className="fiveDaysForecast-info">
                                    <div className="fiveDaysForecast-weather">
                                        <span className="fiveDaysForecastIcon">
                                            {weatherIcon}
                                        </span>
                                    </div>
                                    <div className="fiveDaysForecast-details">
                                        <span className='fiveDaysForecast-detailsIcon'><FaTemperatureFull/> {Math.round(fiveDForecast.main.temp)}°C</span>
                                        <span className='fiveDaysForecast-detailsIcon'><BiWind/> {`${fiveDForecast.wind.speed}`}m/s</span>
                                        <span className='fiveDaysForecast-detailsIcon'><WiHumidity/> {`${fiveDForecast.main.humidity}`}%</span>
                                    </div>
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

export default FiveDaysForecast;