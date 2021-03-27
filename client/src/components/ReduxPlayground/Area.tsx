import * as React from 'react';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';

type Props = {
  area: IArea;
  removeArea: (area: IArea) => void;
};

export const Area: React.FC<Props> = ({ area, removeArea }) => {
  const dispatch: Dispatch<any> = useDispatch();

  const deleteArea = React.useCallback((area: IArea) => dispatch(removeArea(area)), [dispatch, removeArea]);

  return (
    <div className="Area">
      <div>
        <h1>{area.id}</h1>
        <p>{area.name}</p>
      </div>
      <button onClick={() => deleteArea(area)}>Delete</button>
    </div>
  );
};
