import React from "react";
import styled from "styled-components";
import { useDrag } from "react-dnd";
import { ItemTypes } from "utils/Constants";


export default function Instrument({ property, fullName, children }) {

  const [{isDragging}, drag] = useDrag(() => ({
    type: ItemTypes.INSTRUMENT,
    item: { property, fullName } ,
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
  justify-content: center;
  align-items: center;
  color: black;
  border: solid 1px;
  font-size: 0.8rem; 
  background: ${props => props.theme.secondaryColor} 
`