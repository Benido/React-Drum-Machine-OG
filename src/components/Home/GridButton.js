import styled from "styled-components"; 

export default function GridButton({ isPlayed = false, soundPlay, id, handleSampleChange }) {
  return (
  <Wrapper isPlayed={isPlayed} onClick={soundPlay}>
    <label onClick={e => e.stopPropagation()} htmlFor={id}>🎵</label>
    <input 
      onClick={e => e.stopPropagation()} 
      id={id} 
      type='file'
      onChange={handleSampleChange} />
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
  & input {
    display: none;
  } 

  & label {
    position: absolute;
    right: 12px;
    top: 12px; 
    font-size: 24px;
  }
`  