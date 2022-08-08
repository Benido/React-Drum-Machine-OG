import { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';

import hh1 from 'assets/sounds/hh1.wav'
import kick from 'assets/sounds/kick.wav'
import perc1 from 'assets/sounds/perc1.wav'
import snare from 'assets/sounds/snare.wav'

export default function useSounds() {

  const mySampler = useRef(null);

  const [isKickPlayed, setIsKickPlayed] = useState(false)
  const [isPercPlayed, setIsPercPlayed] = useState(false)
  const [isHHPlayed, setIsHHPlayed] = useState(false)
  const [isSnarePlayed, setIsSnarePlayed] = useState(false)

  useEffect(() => {
    const sampler = new Tone.Sampler({      
        "C4": kick,
        "D#4": perc1,
        "F#4": hh1,
        "A4": snare,
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

  function handleSampleChange(note, file) {
    let fileURL = URL.createObjectURL(file);
    let buffer = new Tone.Buffer(fileURL);
    mySampler.current.add(note, buffer, () => alert('Sample succesfully changed'));

  }
 
  const buttonsList = [ 
    {
      soundPlay: () => soundPlay("C4"),
      isPlayed: isKickPlayed,
      id: 'kick',
      handleSampleChange: (e) => handleSampleChange('C4', e.target.files[0]),
    },
    {
      soundPlay: () => soundPlay("D#4"),
      isPlayed: isPercPlayed,
      id: 'perc',
      handleSampleChange: (e) => handleSampleChange('D#4', e.target.files[0]),
    },
    {
      soundPlay: () => soundPlay("F#4"),
      isPlayed: isHHPlayed,
      id: 'hh',
      handleSampleChange: (e) => handleSampleChange('F#4', e.target.files[0]),
    },
    {
      soundPlay: () => soundPlay("A4"),
      isPlayed: isSnarePlayed,
      id: 'snare',
      handleSampleChange: (e) => handleSampleChange('A4', e.target.files[0]),
    }  
  ]

  return { buttonsList };
} 