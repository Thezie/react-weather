import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import styles from "./SearchBar.module.scss";
import { Autocomplete, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { setData } from "../../features/weather/weatherSlice";
import { resetData } from "../../features/weather/weatherSlice";
import PositionSvg from "../Svgs/PositionSvg";

export const SearchBar = () => {
  const GEO_API_KEY = process.env.REACT_APP_GEO_API_KEY;
  const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API;
  const dispatch = useDispatch();
  const [cities, setCities] = useState([]);
  const [unity] = useState("metric");
  const [geoLocation, setGeoLocation] = useState(undefined);
  const [isCurrentLocation, setIsCurrentLocation] = useState(false);
  const getGeoLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setIsCurrentLocation(true);
      setGeoLocation({
        lon: position.coords.longitude,
        lat: position.coords.latitude,
      });
    });
  };
  useEffect(() => {
    getGeoLocation();
  }, []);
  useEffect(() => {
    getData();
  }, [geoLocation]);
  const handleChange = (e) => {
    const { value } = e.currentTarget;
    fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&type=city&format=json&apiKey=${GEO_API_KEY}`
    )
      .then((response) => response.json())
      .then((json) =>
        setCities(
          json.results.map((data) => {
            const { country, city, lat, lon, formatted } = data;
            return { country, city, lat, lon, formatted };
          })
        )
      );
  };
  const getData = () => {
    if (geoLocation) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${geoLocation.lat}&units=${unity}&lon=${geoLocation.lon}&appid=${WEATHER_API_KEY}`
      )
        .then((response) => response.json())
        .then((json) => {
          const { clouds, main, name, sys, weather, wind } = json;
          dispatch(setData({ clouds, main, name, sys, weather, wind }));
        });
    }
  };
  const handleAutocompleteSelect = (e, value) => {
    if (value != null) {
      const { lat, lon } = value;
      setIsCurrentLocation(false);
      setGeoLocation({
        lat,
        lon,
      });
    } else {
      dispatch(resetData());
    }
  };
  return (
    <>
      <Form>
        <Form.Group className={`${styles.searchContainer}`}>
          <Autocomplete
            className={styles.searchInput}
            clearOnBlur={false}
            onChange={handleAutocompleteSelect}
            renderInput={(params) => (
              <TextField
                {...params}
                onChange={handleChange}
                label={"Enter Your City..."}
              />
            )}
            options={cities}
            getOptionLabel={(option) => option.formatted}
          />
          <Button
            variant="contained"
            style={{ backgroundColor: "#006CA5" }}
            disabled={geoLocation == undefined || isCurrentLocation == true}
            onClick={() => getGeoLocation()}
          >
            <PositionSvg color={"#fff"} />
          </Button>
        </Form.Group>
      </Form>
    </>
  );
};
