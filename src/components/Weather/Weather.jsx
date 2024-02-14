import { Card } from "react-bootstrap";
import styles from "./Weather.module.scss";
import DefaultWeather from "../Svgs/DefaultWeather";
import Thermometer from "../Svgs/Thermometer";
import Time from "../Svgs/Time";
import Wind from "../Svgs/Wind";
import SpeedoMeter from "../Svgs/SpeedoMeter";
import Humidity from "../Svgs/Humidity";
import Cloudy from "../Svgs/Cloudy";
import SunnyRainy from "../Svgs/SunnyRainy";
import Rainy from "../Svgs/Rainy";
import Sunny from "../Svgs/Sunny";
import PositionSvg from "../Svgs/PositionSvg";
import { useSelector } from "react-redux";
import Moment from "react-moment";
export const Weather = () => {
  const weather = useSelector(({ weather }) => weather);
  const displayIcon = () => {
    const number = weather.weather.icon.substring(0, 2);
    const defaultWidth = "200px";
    const defaultheight = "200px";
    switch (number) {
      case "01":
        return <Sunny width={defaultWidth} height={defaultheight} />;
      case "03":
      case "04":
      case "50":
        return <Cloudy width={defaultWidth} height={defaultheight} />;
      case "10":
        return <SunnyRainy width={defaultWidth} height={defaultheight} />;
      case "11":
        <Rainy width={defaultWidth} height={defaultheight} />;
      default:
        return (
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather.icon}@2x.png`}
            alt=""
          />
        );
    }
  };

  return (
    <>
      <Card className={styles.container}>
        {weather.isLoaded ? (
          <Card.Body>
            <Card.Title>
              {weather.name} ,{weather.sys.country}
              <PositionSvg color={"rgba(255,255,255,0.7)"} />
              <div className={styles.date}>
                <div>
                  {" "}
                  <Moment format="llll" />
                </div>
                <div>
                  <Time width="15px" height="15px" />
                </div>
              </div>
            </Card.Title>
            <Card.Text as={"div"} className={styles.weather_infos}>
              <div>{displayIcon()}</div>
              <div className={styles.temperature}>
                <div>{weather.main.feels_like}</div>
                <div>
                  <Thermometer />
                </div>
              </div>
              <div>
                Good Morning {weather.name}
                <div className={styles.separator} />
              </div>

              <div className={styles.infos}>
                <div className={styles.border_right}>
                  <div>
                    <DefaultWeather color={"#fff"} />
                  </div>
                  <div>SUNRISE</div>
                  <div>
                    <Moment unix={true} format="hh:mm">
                      {weather.sys.sunrise}
                    </Moment>
                  </div>
                </div>
                <div className={styles.border_right}>
                  <div>
                    <SpeedoMeter color={"#fff"} />
                  </div>
                  <div>SpeedoMeter</div>
                  <div>{weather.main.pressure} Pa</div>
                </div>
                <div className={styles.border_right}>
                  <div>
                    <Humidity color={"#fff"} />
                  </div>
                  <div>Humidity</div>
                  <div>{weather.main.humidity} %</div>
                </div>
                <div className={styles.border_right}>
                  <div>
                    <Wind />
                  </div>
                  <div>WIND</div>
                  <div>{weather.wind.speed} m/s</div>
                </div>
                <div>
                  <div>
                    <Thermometer
                      color={"#fff"}
                      width={"25px"}
                      height={"25px"}
                    />
                  </div>
                  <div>TEMPERATURE</div>
                  <div>{weather.main.temp_max}° C</div>
                </div>
              </div>
            </Card.Text>
          </Card.Body>
        ) : (
          <Card.Body>
            <Card.Title>Please Choose Your City</Card.Title>
          </Card.Body>
        )}
      </Card>
    </>
  );
};
