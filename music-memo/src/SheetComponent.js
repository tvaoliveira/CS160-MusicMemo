import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import AudioPlayer from 'react-h5-audio-player';
import 'html-midi-player';
import 'react-h5-audio-player/lib/styles.css';
import { OpenSheetMusicDisplay as OSMD } from 'opensheetmusicdisplay';
import wet_hands from './files/Wet_Hands_Minecraft.mxl';
import wethandsmp3 from './files/Wet_Hands_Minecraft.mp3';
import wethandsmidi from './files/Wet_Hands_Minecraft.mid';
import line from './files/line.png';

function SheetComponent() {
  const [loaded, setLoaded] = useState(false);
  const [currOsmd, defOsmd] = useState();
  const [intervalId, setIntervalId] = useState();
  const audioRef = useRef();


  useEffect(() => {
    if (!loaded) {
      var osmd = new OSMD("osmddiv", {
        autoResize: false,
        backend: "canvas",
      });
      osmd.load(wet_hands).then(() => osmd.render()).then(() => osmd.cursor.show());
      defOsmd(osmd);
      setLoaded(true);
    }
  })

  function startPlaying() {
    currOsmd.render();
    var lastIndex = 7;
    var skips = 0;
    var startPlaying = setInterval(() => {
      var index = currOsmd.cursor.iterator.currentVoiceEntryIndex;
      if (index == 0 && lastIndex !== 7) {
        skips = 7 - lastIndex;
        lastIndex = lastIndex + 1;
      } else {
        lastIndex = index;
        currOsmd.cursor.next();
      }
    }, 405);
    setIntervalId(startPlaying);
  }

  function playReps(reps) {
    currOsmd.cursor.reset();
    var lastIndex = 7;
    var skips = 0;
    for (var i = 0; i < reps; i = i + 1) {
      var index = currOsmd.cursor.iterator.currentVoiceEntryIndex;
      if (index == 0 && lastIndex !== 7) {
        skips = 7 - lastIndex;
        lastIndex = lastIndex + 1;
      } else {
        lastIndex = index;
        currOsmd.cursor.next();
      }
    }
  }

  const recalculate = () => {
    var timeMs = audioRef.current.audio.current.currentTime * 1000;
    var reps = Math.floor(timeMs / 405.405405);
    playReps(reps);
    audioRef.current.audio.current.currentTime = reps * 405.405405;
  }

  return (
    <div>
      <div>
        <midi-player
          src={wethandsmidi}
          sound-font visualizer="#myVisualizer">
        </midi-player>
        <midi-visualizer type="piano-roll" id="myVisualizer"></midi-visualizer>
      </div>
      <br></br><br></br><br></br><br></br>
      <AudioPlayer
        src={wethandsmp3}
        onPlay={() => {
          startPlaying();
        }}
        onPause={() => {
          clearInterval(intervalId);
        }}
        ref={audioRef}
      />
      <button onClick={() => {
        currOsmd.cursor.next();
        currOsmd.render();
      }}>
        BUTTON
      </button>
      <button onClick={() => {
        currOsmd.cursor.next();
      }}>
        BUTTON2
      </button>
      <button onClick={() => {
        currOsmd.render();
      }}>
        BUTTON3
      </button>
      <button onClick={() => {

      }}>
        BUTTON4
      </button>
      <div id="osmddiv">
        <img id="line" src={line}></img>
      </div>
    </div>
  )
}

export default SheetComponent;