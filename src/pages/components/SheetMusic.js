import React, { useEffect, useState, useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { OpenSheetMusicDisplay as OSMD } from 'opensheetmusicdisplay';
import styles from '../../css/sheet.module.css';

function SheetMusic({ audioSrc, mxlSrc, BPM }) {
  const buffering = useRef();
  const intId = useRef();
  const standby = useRef();
  const incr = useRef();
  const [currTime, setTime] = useState(0);
  const [currOsmd, defOsmd] = useState();
  const [playback, bufferPlayback] = useState({});
  const [maxMeasure, setMaxMeasure] = useState(0);
  const audioRef = useRef();
  var osmd;


  useEffect(() => {
    osmd = new OSMD("osmddiv", {
      autoResize: false,
      backend: "svg",
      alignRests: 1,
      fillEmptyMeasuresWithWholeRest: 1,
    })
  }, [])

  useEffect(() => {
    if (osmd) {
      var osmdCpy = osmd;
      osmdCpy.load(mxlSrc).then(() => {
        osmdCpy.render();
      }).then(() => {
        var cursor = osmdCpy.Cursor;
        cursor.SkipInvisibleNotes = false;
        cursor.CursorOptions = {
          type: 0,
          color: "#dab4e8",
        }
      }).then(() => {
        osmdCpy.cursor.show();
      }).then(() => {
        defOsmd(osmdCpy);
        defineTiming(BPM);
        return prebuffer(osmdCpy);
      }).then((playbackCpy) => {
        loadCheckpoints(osmdCpy, playbackCpy);
      });
    }
  }, [osmd, BPM, mxlSrc])

  function defineTiming(bpm) {
    incr.current = 1000 * 60 / bpm / 4;
  }

  function loadCheckpoints(osmd, playbackCpy) {
    const containers = osmd.graphic.verticalGraphicalStaffEntryContainers;
    for (let i = 0; i < containers.length; i++) {
      var measure = [];
      while (containers[0].absoluteTimestamp.wholeValue === i) {
        measure.push(containers.shift());
      }
      for (let j = 0; j < measure.length; j++) {
        const entries = measure[j].staffEntries;
        for (let k = 0; k < entries.length; k++) {
          const se = entries[k];
          if (se && !se.parentMeasure.hasOnlyRests) {
            const y = se.getLowestYAtEntry();
            const x = se.PositionAndShape.AbsolutePosition.x;
            const id = `CHECKPOINT:${i}-${j}`
            osmd.Drawer.DrawOverlayLine({ x: x, y: y }, { x: x, y: y - 6 }, osmd.graphic.MusicPages[0], "transparent", 1.5, id);
          }
        }
      }
    }

    var els = document.getElementsByClassName('vf-line');
    Array.prototype.forEach.call(els, (elem) => {
      if (elem.id.includes('CHECKPOINT')) {
        var coords = elem.id.split(':')[1];
        var measure = coords.split('-')[0];
        var index = coords.split('-')[1];

        elem.addEventListener('click', () => {
          navigateTo(osmd, playbackCpy, Number(measure), Number(index));
        })
        elem.style.cursor = 'pointer';
      }
    });

  }

  function prebuffer(osmd) {
    console.log(osmd);
    var playbackObj = {};
    var measureList = osmd.sheet.sourceMeasures;
    var last = 0;
    for (let i = 0; i < measureList.length; i++) {
      var entries = measureList[i].verticalSourceStaffEntryContainers;
      var topLength = 0;
      var botLength = 0;
      var measureArr = []
      for (let j = 0; j < entries.length; j++) {
        var staves = entries[j].staffEntries;
        var top = staves[0];
        var bot = staves[1];
        var skips = 0;

        if (top) {
          var max = 0;
          var voiceEntries = top.voiceEntries;
          for (let k = 0; k < voiceEntries.length; k++) {
            var notes = voiceEntries[k].notes;
            for (let l = 0; l < notes.length; l++) {
              var length = notes[l].length.realValue * 16;
              if (length > max) {
                max = length;
              }
            }
          }
          topLength = topLength + max;
        }

        if (bot) {
          var max = 0;
          var voiceEntries = bot.voiceEntries;
          for (let k = 0; k < voiceEntries.length; k++) {
            var notes = voiceEntries[k].notes;
            for (let l = 0; l < notes.length; l++) {
              var length = notes[l].length.realValue * 16;
              if (length > max) {
                max = length;
              }
            }
          }
          botLength = botLength + max;
        }

        while (topLength > 0 && botLength > 0) {
          topLength = topLength - 1;
          botLength = botLength - 1;
          skips = skips + 1;
        }
        measureArr.push(skips);
      }
      playbackObj[i] = measureArr;
      last = i;
    }
    bufferPlayback(playbackObj);
    setMaxMeasure(last);
    return playbackObj;
  }

  function startPlaying3() {
    var i = currOsmd.cursor.iterator.currentMeasureIndex;
    var j = currOsmd.cursor.iterator.currentVoiceEntryIndex;
    var measureArr = [...playback[i]];
    var delay = measureArr.shift();
    while (j >= 1) {
      delay = measureArr.shift();
      j--;
    }
    intId.current = setInterval(() => {
      delay = delay - 1;
      if (delay <= 0) {
        delay = measureArr.shift();
        currOsmd.cursor.next();
      }
      if (measureArr.length === 0) {
        i++;
        if (i > maxMeasure) {
          clearInterval(intId.current);
        }
        measureArr = [...playback[i]];
      }
    }, incr.current);
  }


  function playReps3(reps) {
    currOsmd.cursor.reset();
    var i = 0;
    var measureArr = [...playback[i]];
    var delay = measureArr.shift();
    for (let j = 0; j < reps; j++) {
      delay = delay - 1;
      if (delay <= 0) {
        delay = delay + measureArr.shift();
        currOsmd.cursor.next();
      }
      if (measureArr.length === 0) {
        i++;
        if (i > maxMeasure) {
          clearInterval(intId.current);
        }
        measureArr = [...playback[i]];
      }
    }
  }

  function playToIndex(osmd, playbackCpy, measureNumber, index) {
    osmd.cursor.reset();
    var i = 0;
    var measureArr = [...playbackCpy[i]];
    var delay = measureArr.shift();
    var measureIndex = osmd.cursor.iterator.currentMeasureIndex;
    var voiceIndex = osmd.cursor.iterator.currentVoiceEntryIndex;
    var reps = 0;
    while (!(measureIndex === measureNumber && voiceIndex === index)) {
      measureIndex = osmd.cursor.iterator.currentMeasureIndex;
      voiceIndex = osmd.cursor.iterator.currentVoiceEntryIndex;
      delay = delay - 1;
      if (delay <= 0) {
        delay = delay + measureArr.shift();
        osmd.cursor.next();
      }
      if (measureArr.length === 0) {
        i++;
        if (!(i in playbackCpy)) {
          break;
        }
        measureArr = [...playbackCpy[i]];
      }
      reps++;
    }
    return reps;
  }

  const recalculate = () => {
    buffering.current = true;
    if (audioRef.current) {
      var timeMs = audioRef.current.audio.current.currentTime * 1000;
      var reps = Math.floor(timeMs / incr.current);
      playReps3(reps);
      var newTime = reps * incr.current / 1000;
      audioRef.current.audio.current.currentTime = newTime;
      setTime(newTime);
    }
    buffering.current = false;
  }

  const navigateTo = (osmd, playbackCpy, measure, index) => {
    buffering.current = true;
    var reps = playToIndex(osmd, playbackCpy, measure, index);
    var newTime = reps * incr.current / 1000;
    audioRef.current.audio.current.currentTime = newTime;
    setTime(newTime);
    buffering.current = false;
  }

  return (
    <div class={`${styles.sheet} ${styles.frame}`} >
      <AudioPlayer
        src={audioSrc}
        onCanPlay={() => {
          if (!buffering.current && standby.current) {
            if (Math.abs(audioRef.current.audio.current.currentTime - currTime) > 1) {
              standby.current = false;
              recalculate();
            }
          }
        }}
        onPlay={() => {
          startPlaying3();
          standby.current = false;
        }}
        onPause={() => {
          clearInterval(intId.current);
          recalculate();
          standby.current = true;
        }}
        ref={audioRef}
        showJumpControls={false}
      />
      <div id="osmddiv">
      </div>
    </div>
  )
}

export default SheetMusic;