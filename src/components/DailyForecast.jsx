// src/components/DailyForecast.js
const DailyForecast = ({ days, unit }) => {
  if (!days) return null;

  return (
    <div className="container">
      <h3>Daily Forecast</h3>
      <div className="daily-forecast">
        {days.map((day, index) => (
          <div key={index} className="five-day-card">
            <p>
              {new Date(day.date).toLocaleDateString("en", {
                weekday: "short",
              })}
            </p>
            <img src={day.day.condition.icon} alt={day.day.condition.text} />
            <div className="temp-range">
              <span>
                {unit === "c" ? day.day.maxtemp_c : day.day.maxtemp_f}°
              </span>
              <span className="low">
                {unit === "c" ? day.day.mintemp_c : day.day.mintemp_f}°
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyForecast;
