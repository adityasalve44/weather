// src/components/CurrentWeather.js
const  CurrentWeather = ({ data, location, unit }) => {
  if (!data) return null;

  const temp = unit === "c" ? data.temp_c : data.temp_f;

  return (
    <div className="current-weather">
      <h2>
        {location?.name}, {location?.country}
      </h2>
      <div className="current-main">
        <img src={data.condition.icon} alt={data.condition.text} />
        <div>
          <p className="temp">
            {temp}°{unit.toUpperCase()}
          </p>
          <p>{data.condition.text}</p>
        </div>
      </div>
    </div>
  );
}
export default CurrentWeather;
