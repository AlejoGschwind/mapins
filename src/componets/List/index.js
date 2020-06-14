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
  left: 10px;
  z-index: 100;
  border-radius: 5px;
  border: 0.5px solid #dddddd;
  padding: 10px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledArrowDownIcon = styled(ArrowDownIcon)`
  height: 20px;
  width: 20px;
  transform: ${(props) =>
    props.displayList ? "rotateX(0deg)" : "rotateX(180deg)"};
  cursor: pointer;
`;

const List = ({ points }) => {
  const [display, setDisplay] = useState(true);
  console.log(points);
  return (
    <ListWrapper display={display}>
      <StyledArrowDownIcon
        display={display}
        onClick={() => setDisplay(!display)}
      />
      <div style={{ width: "100%", height: "90%" }}>
        {points.length > 0 &&
          points.map((point) => (
            <Point key={point.id} name={point.name} color={point.color} lat={point.coords.lat}/>
          ))}
      </div>
    </ListWrapper>
  );
};

export default List;
