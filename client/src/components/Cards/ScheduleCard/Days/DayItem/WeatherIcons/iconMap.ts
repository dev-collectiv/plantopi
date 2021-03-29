import clouds from 'assets/icons/weather/clouds.svg';
import cloudy from 'assets/icons/weather/cloudy.svg';
import rainy from 'assets/icons/weather/rainy.svg';
import rainysunny from 'assets/icons/weather/rainysunny.svg';
import rainythunder from 'assets/icons/weather/rainythunder.svg';
import snowalt from 'assets/icons/weather/snowalt.svg';
import sunalt from 'assets/icons/weather/sunalt.svg';
import sunny from 'assets/icons/weather/sunny.svg';
import wave from 'assets/icons/weather/wave.svg';

type stringIndexed = { [key: string]: string };

// icons names can be found at: https://openweathermap.org/weather-conditions
const iconMap: stringIndexed = {
  '01d': sunalt,
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

// import { ReactComponent as Clouds } from 'assets/icons/weather/clouds.svg';
// import { ReactComponent as Cloudy } from 'assets/icons/weather/cloudy.svg';
// import { ReactComponent as Rainy } from 'assets/icons/weather/rainy.svg';
// import { ReactComponent as Rainysunny } from 'assets/icons/weather/rainysunny.svg';
// import { ReactComponent as Rainythunder } from 'assets/icons/weather/rainythunder.svg';
// import { ReactComponent as Snowalt } from 'assets/icons/weather/snowalt.svg';
// import { ReactComponent as Sunalt } from 'assets/icons/weather/sunalt.svg';
// import { ReactComponent as Sunny } from 'assets/icons/weather/sunny.svg';
// import { ReactComponent as Wave } from 'assets/icons/weather/wave.svg';

// type stringIndexed = { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> };

// // icons names can be found at: https://openweathermap.org/weather-conditions
// const iconMap: stringIndexed = {
//   '01d': Sunalt,
//   '02d': Sunny,
//   '03d': Cloudy,
//   '04d': Clouds,
//   '09d': Rainy,
//   '10d': Rainysunny,
//   '11d': Rainythunder,
//   '13d': Snowalt,
//   '50d': Wave
// };

// export default iconMap;
