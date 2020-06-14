import React, { useState } from "react";
import Map from "./componets/Map";
import List from "./componets/List";

function App() {
  const [points, setPoints] = useState([]);

  return (
    <div className="App">
      <Map
        showPoints
        points={points}
        setPoints={setPoints}
      />
      <List points={points} />
    </div>
  );
}



// function placeNewMarker() {
//   let marker = new Marker({
//     pos,
//   });
// }

export default App;
