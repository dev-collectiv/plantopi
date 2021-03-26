import { useState } from 'react';

export interface INewArea {
  userId: string;
  isActive: boolean;
  sensors: [];
}
const AddArea: any = (props: any) => {
  const [newArea, setNewArea] = useState<any>({
    userId: '',
    isActive: false,
    sensors: []
  });

  const handleEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewArea({
      ...newArea,
      [e.target.name]: [e.target.value]
    });
  };

  const handleActivity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewArea({
      ...newArea,
      [e.target.name]: !newArea.isActive
    });
  };

  return (
    <form className="formsContainer" onSubmit={() => props.addingArea(newArea)}>
      <h3>New Area</h3>
      <label>
        <h3> User Id:</h3>
        <input value={newArea.userId} name="userId" type="text" onChange={handleEvent} />
      </label>
      <label>
        <h3> sensors:</h3>
        <input value={newArea.sensors} name="sensors" type="text" onChange={handleEvent} />
      </label>
      <div>
        <h3>Is Active?</h3>
        <input value={newArea.isActive} name="isActive" type="checkbox" onChange={handleActivity} />
      </div>
      <div>
        <button className="btn" type="submit">
          submit
        </button>
      </div>
    </form>
  );
};

export default AddArea;
