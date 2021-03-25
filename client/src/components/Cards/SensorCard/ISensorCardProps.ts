interface ISensorCardProps {
  id: string;
  name: string;
  type: 'temperature' | 'humidity';
  reading: number;
  position?: string;
}

export default ISensorCardProps;
