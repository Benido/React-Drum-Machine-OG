import { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';

import ace_hh1 from 'assets/sounds/Ace_hh1.wav';
import ace_kick from 'assets/sounds/Ace_kick.wav';
import ace_perc1 from 'assets/sounds/Ace_perc1.wav';
import ace_snare from 'assets/sounds/Ace_snare.wav';
import hammond_hh from 'assets/sounds/Hammond_hh.wav';
import hammond_kick_hat from 'assets/sounds/Hammond_kick_hat.wav';
import hammond_rapid_snare from 'assets/sounds/Hammond_rapid_snare.wav';
import hammond_snare from 'assets/sounds/Hammond_snare.wav';
import hammond_tom from 'assets/sounds/Hammond_tom.wav';
import hammond_wood_block from 'assets/sounds/Hammond_wood_block.wav';

export default function useSounds() {

  const mySampler = useRef(null);

  const [isKickPlayed, setIsKickPlayed] = useState(false)
  const [isPercPlayed, setIsPercPlayed] = useState(false)
  const [isHHPlayed, setIsHHPlayed] = useState(false)
  const [isSnarePlayed, setIsSnarePlayed] = useState(false)

  // const sounds = [
  //   {url: ace_hh1, key: 'ace_hh1'},
  //   {url: ace_kick, key: 'ace_kick'},
  //   {url: ace_perc1, key: 'ace_perc1'},
  //   {url: ace_snare, key: 'ace_snare'},
  //   {url: hammond_hh, key: 'hammond_hh'},
  //   {url: hammond_kick_hat, key: 'hammond_kick_hat'},
  //   {url: hammond_snare, key: 'hammond_snare'},
  //   {url: hammond_rapid_snare, key: 'hammond_rapid_snare'},
  //   {url: hammond_tom, key: 'hammond_tom'},
  //   {url: hammond_wood_block, key: 'hammond_wood_block'}
  // ]

  const sounds = {
    ace_hh1: {fullName: 'Ace High-hat 1', url: ace_hh1, img: ''},
    ace_kick: {fullName: 'Ace Kick', url: ace_kick, img: ''},
    ace_perc1: {fullName: 'Ace Percussion 1', url: ace_perc1, img: ''},
    ace_snare: {fullName: 'Ace Snare', url: ace_snare, img: ''},
    hammond_hh: {fullName: 'Hammond High-hat', url: hammond_hh, img: ''},
    hammond_kick_hat: {fullName: 'Hammond Kick-hat', url: hammond_kick_hat, img: ''},
    hammond_snare: {fullName: 'Hammond Snare', url: hammond_snare, img: ''},
    hammond_rapid_snare: {fullName: 'Hammond Rapid snare', url: hammond_rapid_snare, img: ''},
    hammond_tom: {fullName: 'Hammond Tom', url: hammond_tom, img: ''},
    hammond_wood_block: {fullName: 'Hammond Wood block', url: hammond_wood_block, img: ''}
  }



  useEffect(() => {
    const sampler = new Tone.Sampler({      
        "C4": ace_kick,
        "D#4": ace_perc1,
        "F#4": ace_hh1,
        "A4": ace_snare,
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

      mySampler.current.add(note, sounds[property].url);

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