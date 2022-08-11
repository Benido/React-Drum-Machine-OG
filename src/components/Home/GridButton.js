import styled from "styled-components"; 
import { useDrop } from "react-dnd";
import { ItemTypes } from "utils/Constants";
import { useState } from "react";

export default function GridButton({ isPlayed = false, soundPlay, id, handleSampleChange }) {

  const [item, setItem] = useState({})
  
  const [{collectedProps, isOver}, drop] = useDrop(() => ({
    accept: ItemTypes.INSTRUMENT,
    drop: (item) => {
    handleSampleChange(item.property);
    setItem(item.value)
    console.log(item.value)
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    })
  }),

  )
  return (
    <Wrapper 
      isPlayed={isPlayed}
      isOver={isOver} 
      onClick={soundPlay}
      ref={drop}
    >
      <div>
        <p>{item.fullName}</p> 
        <img src={item.img} alt={item.imgAlt} />
      </div>     
      
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
  box-shadow: 6px 5px 5px gray;

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
    opacity: ${(props) => (props.isPlayed || props.isOver ? "1" : "0")};
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
    width: 100%;
    position: absolute;
    display: flex;
    justify-content: space-between;
    color: ${(props) => props.theme.backgroundColor};
    font-size: 0.8rem;
    padding: 0.3rem;
    user-select: none;
  }

  & img {
    max-height: 40px;
    max-width: 40px;
    object-fit: contain;
    margin-right: 1em;
  }
  
`  