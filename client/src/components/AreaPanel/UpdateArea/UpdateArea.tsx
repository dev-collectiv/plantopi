import { useState } from 'react';
import { IAddArea, IGetArea } from 'types/areaInterfaces';

const AreaUpdate: React.FC<{ area: IGetArea, patchArea : Function; goToAreasPanel: Function }> = ({ area, patchArea, goToAreasPanel }) => {
  //TODO - IPatchArea
  const [areaToUpdate, setAreaToUpdate] = useState<IGetArea>({ ...area });

  const { id, isActive, longitude, latitude, user, sensors } = areaToUpdate;

  const handleEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAreaToUpdate({
      ...areaToUpdate,
      [event.target.name]: [event.target.value]
    });
  };

  const handleActivity = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAreaToUpdate({
      ...areaToUpdate,
      [event.target.name]: !areaToUpdate.isActive
    });
  };

  return (
    <form >  
      <h4>Update Area</h4>
      <h3>Area id: {id}</h3>
      <h3>User: {user}</h3>
      <h3>Sensors: [{sensors}]</h3>
      <label>
        <h3> Longitude:</h3>
        <input value={longitude} name="longitude" type="text" onChange={handleEvent} />
      </label>
      <label>
        <h3> Latitude: </h3>
        <input value={latitude} name="latitude" type="text" onChange={handleEvent} />
      </label>
      <div>
        <h3>Active: </h3>
        <input name="isActive" type="checkbox" onChange={handleActivity} />
      </div>
      <div>
        <button type="submit" onClick={() => patchArea(areaToUpdate, areaToUpdate.id)}>SUBMIT</button>
        <button  onClick={() => goToAreasPanel()}> GO BACK </button>
      </div>
    </form>
  );
};
export default AreaUpdate;
