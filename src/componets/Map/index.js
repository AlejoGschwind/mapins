import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

import config from "../../config";

import Modal from "../Modal";
import Input from "../Input";
import Button from "../Button";

const mapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${config.mapKey}`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Map = ({ points, setPoints, ...otherProps }) => {
  const [newPoint, setNewPoint] = useState(null);
  const [coords, setCoords] = useState(null);

  // Referencias a modal y inputs.
  const modalRef = useRef(null);
  const inputNameRef = useRef(null);
  const inputColorRef = useRef(null);

  const createPoint = () => {
    setNewPoint({
      id: Date.now(),
      name: inputNameRef.current.value,
      color: inputColorRef.current.value,
      coords,
    });
  };

  const updatePoint = (id, coords) => {
    const pointCopy = points[id];
    points.splice(id, 1);
    pointCopy.coords = coords;
    setPoints((points) => [pointCopy].concat(points));
  };

  // When a new point is created update points state.
  useEffect(() => {
    if (newPoint) {
      setPoints((points) => [newPoint].concat(points));
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
      {points.map(({ color, title, coords: { lat, lng } }, id) => (
        <Marker
          key={id}
          position={{ lat, lng }}
          title={title}
          labelContent={title}
          draggable
          onClick={(e) => {
            // mod
          }}
          onDragEnd={(e) => {
            updatePoint(id, {
              lat: e.latLng.lat(),
              lng: e.latLng.lng(),
            });
          }}
        />
      ))}
      <Modal ref={modalRef}>
        <Input
          ref={inputNameRef}
          label="Introduzca el nombre: "
          placeholder="Ingrese el nombre del pin..."
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
};

const MapWrapper = compose(
  withProps({
    googleMapURL: mapURL,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100vh` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)(Map);

export default MapWrapper;
