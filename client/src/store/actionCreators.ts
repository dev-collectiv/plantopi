import * as actionTypes from './actionTypes';

export function addArea(area: IArea) {
  const action: AreaAction = {
    type: actionTypes.ADD_AREA,
    area
  };

  return simulateHttpRequest(action);
}

export function removeArea(area: IArea) {
  const action: AreaAction = {
    type: actionTypes.REMOVE_AREA,
    area
  };
  return simulateHttpRequest(action);
}

export function simulateHttpRequest(action: AreaAction) {
  return (dispatch: DispatchType) => {
    setTimeout(() => {
      dispatch(action);
    }, 500);
  };
}
