import { EventEmitter2 } from 'eventemitter2';
import { createSensorReadingHandler } from './action.service.helpers';

describe ('Sensor Reading Handler', () => {
  it('should record sensor readings to Db with given frequency and correct data', () => {

    // SETUP & MOCKS
    const trackedSensor = '1';
    const readingCountToRecord = 100;

    const mockHandler = jest.fn();
    const mockEmitter: any = jest.fn();

    const mockReading1 = {id: '1', time: 100, reading: 11};
    const mockReading2 = {id: '1', time: 150, reading: 12};

    const mockDbRequest1 = {sensorId: '1', value: 11};
    const mockDbRequest2 = {sensorId: '1', value: 12};

    const sensorReadingHandler = createSensorReadingHandler(mockHandler, trackedSensor, readingCountToRecord, mockEmitter);

    // CALL HANDLER ONCE
    sensorReadingHandler(mockReading1);
    expect(mockHandler).toBeCalled();
    expect(mockHandler.mock.calls[0][0]).toMatchObject(mockDbRequest1);
    expect(mockHandler.mock.calls[0][0]).toHaveProperty('timestamp');

    // CALL HANDLER 100 MORE TIMES
    for (let i = 0; i < readingCountToRecord + 1; i++) sensorReadingHandler(mockReading1);
    expect(mockHandler).toBeCalledTimes(2);
    expect(mockHandler.mock.calls[1][0]).toMatchObject(mockDbRequest1);
    expect(mockHandler.mock.calls[1][0]).toHaveProperty('timestamp');

    // CALL HANDLER ANOTHER 100 MORE TIMES WITH DIFFERENT READING
    for (let i = 0; i < readingCountToRecord + 1; i++) sensorReadingHandler(mockReading2);
    expect(mockHandler).toBeCalledTimes(3);
    expect(mockHandler.mock.calls[2][0]).toMatchObject(mockDbRequest2);
    expect(mockHandler.mock.calls[2][0]).toHaveProperty('timestamp');
  });
});