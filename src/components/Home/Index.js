import styled from "styled-components";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import SoundsList from "components/SoundsList";
import GridButton from "./GridButton";
import useSounds from "hooks/useSounds";

export default function Home () {
  const { buttonsList, sounds } = useSounds();
  return (
    <DndProvider backend={HTML5Backend}>
      <Wrapper>
        <Grid>
          {buttonsList.map(({ soundPlay, isPlayed, id, handleSampleChange }, index) => {
            return (
              <GridButton 
                key={index} 
                soundPlay={soundPlay} 
                isPlayed={isPlayed} 
                id={id} 
                handleSampleChange={handleSampleChange}
              />
            );
          })}
        </Grid>
        <SoundsList soundsList={sounds}/>
      </Wrapper>
    </DndProvider>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Grid = styled.div`
  display: grid;
  width: 400px;
  height: 400px;
  grid-template-columns: 1fr 1fr;
  column-gap: 12px;
  row-gap: 12px;
  margin: auto;
  @media (max-width: 640px) {
    width: 300px;
    height: 300px;
  }
  
`