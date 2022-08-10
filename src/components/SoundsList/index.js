import React from 'react';
import styled from 'styled-components';

import Instrument from './Instrument';

export default function SoundsList ({ soundsList}) {
  return (
    <Wrapper>
      {Object.keys(soundsList).map((key, index) => {
          
          return (
            <Instrument key={index} property={key} fullName={soundsList[key].fullName}>
              {soundsList[key].fullName}
            </Instrument>
          )
        })
      }
    </Wrapper>
  )

}

const Wrapper = styled.div`
  height: 400px;
  width: 100%;
  margin: 2rem;
  padding: 1rem;
  border: solid 1px;
  background: ${props => props.theme.mainColor};
  display: grid;
  grid-template-columns: repeat(auto-fill, 150px);
  grid-template-rows: repeat(auto-fill, 150px);
  column-gap: 12px;
  row-gap: 12px;

`

