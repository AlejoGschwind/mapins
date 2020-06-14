import React, { useState } from "react";
import styled from "styled-components";

import Point from "../Point";
import { ReactComponent as ArrowDownIcon } from "../../assets/arrowdown.svg";

const ListWrapper = styled.section`
  background: white;
  height: 50vh;
  width: 200px;
  position: absolute;
  bottom: 0;
  transform: ${(props) =>
    props.display ? "translate(0, 0)" : "translate(0, calc(100% - 40px))"};
  overflow-y: ${(props) => (props.display ? "auto" : "hidden")};
  left: 10px;
  z-index: 100;
  border-radius: 5px;
  border: 0.5px solid #dddddd;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;

  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #2196f3;
    border-radius: 10px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #2196f3;
  }
`;

const StyledArrowDownIcon = styled(ArrowDownIcon)`
  height: 20px;
  width: 20px;
  transform: ${(props) =>
    props.display ? "rotateX(0deg)" : "rotateX(180deg)"};
  cursor: pointer;
`;

const List = ({ points, deletePoint }) => {
  const [display, setDisplay] = useState(true);

  return (
    <ListWrapper display={display}>
      <StyledArrowDownIcon
        display={display}
        onClick={() => setDisplay(!display)}
      />
      <div style={{ width: "100%", height: "90%" }}>
        {points.length > 0 &&
          points.map((point, index) => {
            console.log(index);
            return (
            <Point
              key={point.id}
              id={index}
              name={point.name}
              color={point.color}
              lat={point.coords.lat}
              onClick={() => deletePoint(index)}
            />
          )})}
      </div>
    </ListWrapper>
  );
};

export default List;
