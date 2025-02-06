import React, { useState } from "react";
import { Input, List, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addCity, removeCity } from "../../../state-managment/slices/locationSlice";
import { API_KEY } from "../../../core/constants/index";
import "./index.css"

const { Search } = Input;

const SearchLocation = () => {
  const dispatch = useDispatch();
  const { selectedCities, maxValue } = useSelector((state) => state.locations);
  const [ searchTerm, setSearchTerm ] = useState("");
  const [ suggestions, setSuggestions ] = useState([]);

  const fetchLocations = async (query) => {
        if (!query) return setSuggestions([]);
        
        const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=3&appid=${API_KEY}`
        );

        if (response.ok) {
        const data = await response.json();
        setSuggestions(data);
        }
    };

    const handleSearch = (value) => {
        setSearchTerm(value);
        fetchLocations(value);
    };

    const handleSelect = (location) => {
        dispatch(addCity(location.name));
        setSearchTerm("");
        setSuggestions([]);
    };

    return (
        <div className="search_component">
            <Search
                value={searchTerm}
                placeholder="Search city"
                onChange={(e) => handleSearch(e.target.value)}
                onSearch={handleSearch}
                enterButton="Add"
            />
        
            {suggestions.length > 0 && (
                <List
                    bordered
                    dataSource={suggestions}
                    className="search_recomendations"
                    renderItem={(item) => (
                        <List.Item onClick={() => handleSelect(item)} style={{ cursor: "pointer" }}>
                            {item.name}, {item.country}
                        </List.Item>
                    )}
                />
            )}

            <h3>Selected Cities:</h3>
                <div className="selected_location_container">
                    {selectedCities.length > 0 ? (
                        selectedCities.map((city, index) => (
                            <div key={index} className="city-item">
                                {city}
                                <Button onClick={() => dispatch(removeCity(city))} className="remove-btn">
                                    X
                                </Button>
                            </div>
                            ))
                        ) : (
                            <div>No cities selected</div>
                        )}
                </div>
                    {maxValue ? (
                        <div style={{color: "red"}}>Maximal cities Count is 5</div>
                    ) : (
                        <div></div>
                    )}
            </div>
        );
    };

export default SearchLocation;
