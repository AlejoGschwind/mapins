import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import styled from 'styled-components';

const Label = styled.label`
  display: flex;
  width: 100%;
  margin: 15px 0;
  flex-direction: column;
  color: #343434;
  font-weight: 300;
  font-size: 16px;

  & > span {
    padding: 0 20px;
  }
`;

const StyledInput = styled.input`
  background: white;
  border-radius: 10px;
  height: 40px;
  border: none;
  padding: 0 20px;
  background: #F8F8F8;
  font-size: 16px;

  &::placeholder {
    font-weight: lighter;
    font-size: 14px;
    line-height: 24px;
    color: #b7b7b7;
  }
  &:focus {
    outline: none;
    border: 1px solid #2196f3;
  }
`;

const Input = forwardRef(({ label, ...otherProps}, ref) => {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => (
      inputRef.current
  ));

  return (
  <Label>
    <span>{label}</span>
    <StyledInput
      autoComplete="off"
      ref={inputRef}
      {...otherProps}
    />
  </Label>
  )
})

export default Input;