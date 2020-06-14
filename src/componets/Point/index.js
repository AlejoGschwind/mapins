import React from "react";
import styled from "styled-components";

import {ReactComponent as IconMarker} from '../../assets/marker.svg';

const PointWrapper = styled.div`
  width: 100%;
  height: 50px;
  background: white;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.08);
  border-radius: 5px;
  margin: 10px 0;
  padding: 0 10px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  & > span {
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 12px;
    font-weight: lighter;
    padding: 5px;
  }
`;

const StyledIconMarker = styled(IconMarker)`
  width: 20px;
  height: 20px;
  & path {
    fill: ${props => props.color}
  }
`;

const PointCard = ({ color, name }) => {
  const defaultColor = '#ca4a4a';
  return (
  <PointWrapper>
    <StyledIconMarker color={color ? color : defaultColor}/>
    <span>{name}</span>
  </PointWrapper>
  );
}


export default PointCard;
