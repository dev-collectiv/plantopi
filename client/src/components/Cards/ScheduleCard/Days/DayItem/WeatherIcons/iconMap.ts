import clouds from 'assets/icons/weather/clouds.svg';
import cloudy from 'assets/icons/weather/cloudy.svg';
import rainy from 'assets/icons/weather/rainy.svg';
import rainysunny from 'assets/icons/weather/rainysunny.svg';
import rainythunder from 'assets/icons/weather/rainythunder.svg';
import snowalt from 'assets/icons/weather/snowalt.svg';
import sunalt from 'assets/icons/weather/sunalt.svg';
import sunny from 'assets/icons/weather/sunny.svg';
import wave from 'assets/icons/weather/wave.svg';

type stringIndexed = {[key: string]: string}

// icons names can be found at: https://openweathermap.org/weather-conditions
const iconMap: stringIndexed = {
  '01d':  sunalt,
  '02d': sunny,
  '03d': cloudy,
  '04d': clouds,
  '09d': rainy,
  '10d': rainysunny,
  '11d': rainythunder,
  '13d': snowalt,
  '50d': wave
};

export default iconMap;