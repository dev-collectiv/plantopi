import * as actionTypes from './actionTypes';

const initialState: AreaState = {
  areas: [
    {
      id: '1',
      name: 'Area 1',
      controllers: [
        {
          id: 'pump1'
        }
      ],
      sensors: [
        {
          id: 'sensor1',
          type: 'humidity',
          reading: -1
        }
      ]
    }
  ]
};

const reducer = (state: AreaState = initialState, action: AreaAction): AreaState => {
  switch (action.type) {
  case actionTypes.ADD_AREA:
    const newArea: IArea = {
      id: action.area.id,
      name: action.area.name,
      controllers: action.area.controllers,
      sensors: action.area.sensors
    };
    return {
      ...state,
      areas: state.areas.concat(newArea)
    };
  case actionTypes.REMOVE_AREA:
    const updatedAreas: IArea[] = state.areas.filter((area) => area.id !== action.area.id);
    return {
      ...state,
      areas: updatedAreas
    };
  }
  return state;
};

export default reducer;
