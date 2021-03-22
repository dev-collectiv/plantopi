import './App.css';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
let socket = io('http://localhost:3002');

const App: React.FC = () => {
  let [duration, setDuration] = useState<string>('');

  useEffect(() => {
    socket.on('connect', () => console.log('connected to ws'));
    socket.on('action', (data: string) => console.log('received msg: ' + data));
  }, []);

  function clickHandler (e: React.FormEvent) {
    e.preventDefault();
    socket.emit('action', duration);
    setDuration('');
  }

  function inputChangeHandler (e: React.ChangeEvent<HTMLInputElement>) {
    setDuration(e.target.value);
  }

  return (
    <div className="App">
      <form action="" onSubmit={clickHandler}>
        <input type="text" value={duration} onChange={inputChangeHandler}/>
        <button type="submit">emit</button>
      </form>
    </div>
  );
};
export default App;