import * as React from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

import { Area } from './Area';
import { AddArea } from './AddArea';
import { addArea, removeArea } from 'store/actionCreators';
import { Dispatch } from 'redux';

const App: React.FC = () => {
  const areas: readonly IArea[] = useSelector((state: AreaState) => state.areas, shallowEqual);

  const dispatch: Dispatch<any> = useDispatch();

  const saveArea = React.useCallback((area: IArea) => dispatch(addArea(area)), [dispatch]);

  return (
    <main>
      <h1>My Areas</h1>
      <AddArea saveArea={saveArea} />
      {areas.map((area: IArea) => (
        <Area key={area.id} area={area} removeArea={removeArea} />
      ))}
    </main>
  );
};

export default App;
