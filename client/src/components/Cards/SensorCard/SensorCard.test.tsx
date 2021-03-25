import React from 'react';
import { render, screen } from '@testing-library/react';
import SensorCard from './SensorCard';
import ISensorCardProps from './ISensorCardProps';

const dataTemperature: ISensorCardProps = {
  id: '1',
  name: 'Temperature',
  reading: 23,
  type: 'temperature'
};

const dataHumidity: ISensorCardProps = {
  id: '1',
  name: 'Humidity',
  reading: 89,
  type: 'humidity'
};

test('renders humidity sensor data', () => {
  render(<SensorCard id={dataHumidity.id} name={dataHumidity.name} reading={dataHumidity.reading} type={dataHumidity.type} />);
  let linkElement = screen.getByText(/89%/i);
  expect(linkElement).toBeInTheDocument();
  linkElement = screen.getByText(/Humidity/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders temperature sensor data', () => {
  render(<SensorCard id={dataTemperature.id} name={dataTemperature.name} reading={dataTemperature.reading} type={dataTemperature.type} />);
  let linkElement = screen.getByText(/23ºC/i);
  expect(linkElement).toBeInTheDocument();
  linkElement = screen.getByText(/Temperature/i);
  expect(linkElement).toBeInTheDocument();
});
