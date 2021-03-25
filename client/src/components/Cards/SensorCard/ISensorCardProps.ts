interface ISensorCardProps {
  id: string;
  name: string;
  type: 'temperature' | 'humidity';
  reading: number;
}

export default ISensorCardProps;
