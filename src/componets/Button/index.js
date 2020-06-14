import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background: #2196f3;
  height: 40px;
  color: white;
  width: 50%;
  max-width: 300px;
  border: none;
  border-radius: 5px;
  margin: 10px 0;

  & > span {
    font-weight: 300;
    font-size: 18px;
    line-height: 32px;
    text-align: center;
  }
`;

const Button = ({ children, ...otherProps }) => (
  <StyledButton {...otherProps}>
    <span>{children}</span>
  </StyledButton>
);

export default Button;