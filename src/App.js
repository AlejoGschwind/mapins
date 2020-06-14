import React, { useState, useEffect, useCallback } from "react";
import Map from "./componets/Map";
import List from "./componets/List";

function App() {
  const localPoints = JSON.parse(localStorage.getItem('points'));
  console.log(localPoints);
  const [points, setPoints] = useState(!localPoints ? []: localPoints);

  useEffect(() => {
    localStorage.setItem('points', JSON.stringify(points))
  }, [points])

  const deletePoint = (id) => {
    points.splice(id, 1);
    setPoints([...points]);
  }

  return (
    <div className="App">
      <Map
        points={points}
        setPoints={useCallback(setPoints)}
      />
      <List points={points} deletePoint={useCallback(deletePoint)}/>
    </div>
  );
}

export default App;
