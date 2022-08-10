import styled from "styled-components"; 
import { useDrop } from "react-dnd";
import { ItemTypes } from "utils/Constants";
import { useState } from "react";

export default function GridButton({ isPlayed = false, soundPlay, id, handleSampleChange }) {

  const [name, setName] = useState('')
  
  const [collectedProps, drop] = useDrop(() => ({
    accept: ItemTypes.INSTRUMENT,
    drop: (item) => {
    alert('Vous avez déposé ' + item.property + ' dans la case ' + id);
    handleSampleChange(item.property);
    setName(item.fullName)
    },
  }),

  )
  return (
    <Wrapper 
      isPlayed={isPlayed} 
      onClick={soundPlay}
      ref={drop}
    >
    <div>{name}</div>
    </Wrapper>
    );
};

const Wrapper = styled.div`
  border-radius: 4px;
  background: rgba(213, 236, 194, 1);
  background: radial-gradient(
    circle,
     rgba(118, 84, 154, 100) 0%,
     rgba(223, 120, 97, 100) 160%
  );
  position: relative;
  overflow: hidden;

  &::before{
    position: absolute;
    content: "";
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 0;
    background: radial-gradient(
      circle,
      rgba(223, 120, 97, 100) ${(props) => (props.isPlayed ? "30%" : "0%")},
      rgba(118, 84, 154, 100) 160%
    );
    opacity: ${(props) => (props.isPlayed ? "1" : "0")};
  }
  
  &:hover::before {
    opacity: 1;
  }

  &:active::before {
    opacity: 1;
    background: radial-gradient(
      circle,
      rgba(223, 120, 97, 100) 30%,
      rgba(118, 84, 154, 100) 160%
    );
  }

  & div {
    position: absolute;
    color: ${(props) => props.theme.backgroundColor};
    font-size: 0.8rem;
    padding: 0.3rem;
  }
  
`  