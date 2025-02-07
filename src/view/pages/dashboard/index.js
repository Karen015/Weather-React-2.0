import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCitiesData } from "../../../state-managment/slices/citiesWeatherslice";
import { Image } from "antd";
import "./index.css";

const Dashboard = () => {
    const dispatch = useDispatch();
    const { selectedCities } = useSelector((state) => state.locations);
    const { data, loading, error } = useSelector((state) => state.weather);
    const { Temperature, Humidity, windSpeed } = useSelector((state) => state.options);
    
    useEffect(() => {
        if (selectedCities.length > 0) {
        dispatch(fetchCitiesData(selectedCities));
        }
    }, [dispatch, selectedCities]);

    if (loading) return <p style={{textAlign: "center"}}>Загрузка...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    console.log(Temperature)

    return (
        <div className="info_container">
        <h1 className="">Прогноз погоды</h1>
            <div className="card_container">
                {data.length > 0 ? (
                    data.map((cityWeather, index) => {
                    const firstWeather = cityWeather.list[0];
                    
                    return (
                        <div key={index} className="weather_card">
                            <h2>{cityWeather.city.name}</h2>
                            <Image
                                width={200}
                                src={`https://openweathermap.org/img/wn/${firstWeather.weather[0].icon}@4x.png`} preview={false}
                            />
                            {Temperature ? (<p>Температура: <strong>{(firstWeather.main.temp - 273.15).toFixed(1)}°C</strong></p>) : (<div></div>)}
                            {Humidity ? (<p>Влажность: {(firstWeather.main.humidity) }%</p>) : (<div></div>)}
                            {windSpeed ? (<p>Скорость Ветра: {firstWeather.wind.speed} м/с</p>) : (<div></div>)}
                        </div>
                    );
                    })
                    ) : (
                        <p>Выберите город</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
