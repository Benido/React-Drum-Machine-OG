import React from "react";
import styled from "styled-components";
import { useDrag } from "react-dnd";
import { ItemTypes } from "utils/Constants";


export default function Instrument({ property, value, children }) {

  const [{isDragging}, drag] = useDrag(() => ({
    type: ItemTypes.INSTRUMENT,
    item: { property, value } ,
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  return (
    <StyledInstrument 
      ref={drag}
      style={{ 
        opacity: isDragging ? '0.5' : '1',
        cursor: 'move',  
      }}
    >
      {children}
    </StyledInstrument>
  )
}

const StyledInstrument = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0.8rem;
  color: black;
  border-radius: 4px;
  font-size: 0.8rem; 
  background: ${props => props.theme.secondaryColor};
  box-shadow: 5px 3px 3px gray;
  overflow: hidden;
`