import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

import Modal from "../Modal";
import Input from "../Input";
import Button from "../Button";

const mapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.mapKey}`;
console.log(process.env);

const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Map = compose(
  withProps({
    googleMapURL: mapURL,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100vh` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)(({ points, setPoints }) => {
  const [newPoint, setNewPoint] = useState(null);
  const [coords, setCoords] = useState(null);

  // Referencias a modal y inputs.
  const modalRef = useRef(null);
  const inputNameRef = useRef(null);
  const inputColorRef = useRef(null);

  const createPoint = () => {
    setNewPoint({
      id: points.length,
      name: inputNameRef.current.value,
      color: inputColorRef.current.value,
      coords,
    });
  };

  const updatePoint = (id, coords) => {
    const pointCopy = {...points[id]};
    points.splice(id, 1);
    pointCopy.coords = coords;
    setPoints(points => [pointCopy].concat(points));
  };

  useEffect(() => {
    if (newPoint) {
      setPoints(points => [newPoint].concat(points));
    }
  }, [newPoint, setPoints]);

  return (
    <GoogleMap
      defaultZoom={17}
      defaultCenter={{ lat: -33.856658, lng: 151.215342 }}
      onClick={(e) => {
        setCoords({
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
        });
        modalRef.current.openModal();
      }}
    >
      {true &&
        points.map(({ color, title, coords: { lat, lng } }, id) => (
          <Marker
            key={id}
            position={{ lat, lng }}
            title={title}
            labelContent={title}
            draggable
            onDragEnd={(e) => {
              updatePoint(id, {
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
              });
            }}
            // icon={{
            //   path: 'M5.38338 17.6368C0.842821 10.2316 8.35867e-06 9.47155 8.35867e-06 6.75C8.35867e-06 3.02207 2.68629 1.07288e-06 6.00001 1.07288e-06C9.31373 1.07288e-06 12 3.02207 12 6.75C12 9.47155 11.1572 10.2316 6.61663 17.6368C6.31866 18.1211 5.68132 18.121 5.38338 17.6368ZM6.00001 9.5625C7.38073 9.5625 8.50001 8.30331 8.50001 6.75C8.50001 5.19669 7.38073 3.9375 6.00001 3.9375C4.61929 3.9375 3.50001 5.19669 3.50001 6.75C3.50001 8.30331 4.61929 9.5625 6.00001 9.5625Z',
            //   fillColor: color,
            //   fillOpacity: 1,
            //   strokeColor: '#fff',
            //   scale: 1
            // }}
          />
        ))}
      <Modal ref={modalRef}>
        <Input
          ref={inputNameRef}
          label="Introduzca el nombre: "
          placeholder="Ingrese el nombre del marcador..."
        />
        <Center>
          <label>Seleccione un color:</label>
          <input ref={inputColorRef} type="color" />
          <Button
            onClick={() => {
              createPoint();
              modalRef.current.closeModal();
            }}
          >
            Guardar Marcador
          </Button>
        </Center>
      </Modal>
    </GoogleMap>
  );
});

export default Map;
