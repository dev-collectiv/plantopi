import * as React from 'react';

type Props = {
  saveArea: (area: IArea | any) => void;
};
//Record<string, never> => type empty object
//Record<string, unknown> => type any object

export const AddArea: React.FC<Props> = ({ saveArea }) => {
  const [area, setArea] = React.useState<IArea | Record<string, unknown>>();

  const handleAreaData = (e: React.FormEvent<HTMLInputElement>) => {
    setArea({
      ...area,
      [e.currentTarget.id]: e.currentTarget.value
    });
  };

  const addNewArea = (e: React.FormEvent) => {
    e.preventDefault();
    saveArea(area);
  };

  return (
    <form onSubmit={addNewArea} className="Add-area">
      <input type="text" id="title" placeholder="Title" onChange={handleAreaData} />
      <input type="text" id="body" placeholder="Description" onChange={handleAreaData} />
      <button disabled={area === undefined ? true : false}>Add area</button>
    </form>
  );
};
