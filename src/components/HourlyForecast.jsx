// src/components/HourlyForecast.js
const HourlyForecast = ({ hours, unit }) => {
  if (!hours) return null;

  return (
    <div className="container">
      <h3>Hourly Forecast</h3>
      <div className="scroll-container">
        {hours.map((hour, index) => (
          <div key={index} className="hour-card">
            <p>{new Date(hour.time).getHours()}:00</p>
            <img src={hour.condition.icon} alt={hour.condition.text} />
            <p>{unit === "c" ? hour.temp_c : hour.temp_f}°</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default HourlyForecast;