import { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';
import sounds from 'assets/sounds';

export default function useSounds() {

  const mySampler = useRef(null);

  const [isKickPlayed, setIsKickPlayed] = useState(false)
  const [isPercPlayed, setIsPercPlayed] = useState(false)
  const [isHHPlayed, setIsHHPlayed] = useState(false)
  const [isSnarePlayed, setIsSnarePlayed] = useState(false)


  useEffect(() => {
    const sampler = new Tone.Sampler({      
        "C4": sounds.ace_kick.audio,
        "D#4": sounds.ace_perc1.audio,
        "F#4": sounds.ace_hh1.audio,
        "A4": sounds.ace_snare.audio,
    }).toDestination();

    Tone.loaded().then(() => {
      mySampler.current = sampler
     
    })

  }, []);

  function soundPlay(note) {
    mySampler.current.triggerAttackRelease([note], Tone.context.currentTime) 
  }

  function handleKeyDown({ key }) {
    switch(key) {
      case 'a': 
        setIsKickPlayed(true);
        window.setTimeout(() => setIsKickPlayed(false) , 250);
        soundPlay('C4');
        break; 
      case 'z': 
        setIsPercPlayed(true);
        window.setTimeout(() =>  setIsPercPlayed(false), 250);
        soundPlay('D#4');
        break; 
      case 'q': 
       setIsHHPlayed(true);
       window.setTimeout(() => setIsHHPlayed(false), 250);
        soundPlay('F#4');
        break; 
      case 's': 
        setIsSnarePlayed(true);
        window.setTimeout(() =>  setIsSnarePlayed(false), 250);
        soundPlay('A4');
        break;  
      default: 
        break;
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    }
  })


  function handleSampleChange(note, property) {
      mySampler.current.add(note, sounds[property].audio);
  }
 
  const buttonsList = [ 
    {
      soundPlay: () => soundPlay("C4"),
      isPlayed: isKickPlayed,
      id: 'C4',
      handleSampleChange: (property) => handleSampleChange('C4', property)
      ,
    },
    {
      soundPlay: () => soundPlay("D#4"),
      isPlayed: isPercPlayed,
      id: 'D#4',
      handleSampleChange: (property) => handleSampleChange('D#4', property),
    },
    {
      soundPlay: () => soundPlay("F#4"),
      isPlayed: isHHPlayed,
      id: 'F#4',
      handleSampleChange: (property) => handleSampleChange('F#4', property),
    },
    {
      soundPlay: () => soundPlay("A4"),
      isPlayed: isSnarePlayed,
      id: 'A4',
      handleSampleChange: (property) => handleSampleChange('A4', property),
    }  
  ]

  return { buttonsList, sounds };
} 