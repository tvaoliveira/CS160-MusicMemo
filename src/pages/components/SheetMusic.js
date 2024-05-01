import React, { useEffect, useState, useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { OpenSheetMusicDisplay as OSMD } from 'opensheetmusicdisplay';
import styles from '../../css/sheet.module.css';

function SheetMusic({ audioSrc, mxlSrc, BPM, measLength, useSkips }) {
  const buffering = useRef();
  const intId = useRef();
  const standby = useRef();
  const [currTime, setTime] = useState(0);
  const [currOsmd, defOsmd] = useState();
  const [incr, setIncr] = useState(405.405);
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
        loadCheckpoints(osmdCpy);
        defineTiming(BPM);
        prebuffer(osmdCpy);
      });
    }
  }, [osmd, BPM, mxlSrc])

  function defineTiming(bpm) {
    setIncr(1000 * 60 / bpm / 2);
  }

  function loadCheckpoints(osmd) {
    for (let i = 0; i < osmd.graphic.measureList.length; i++) {
      const measures = osmd.graphic.measureList[i];
      for (let j = 0; j < measures.length; j++) {
        const measure = measures[j];
        if (measure && !measure.hasOnlyRests) {
          for (var k = 0; k < measure.staffEntries.length; k++) {
            const se = measure.staffEntries[k];
            const y = se.getLowestYAtEntry();
            const x = se.PositionAndShape.AbsolutePosition.x;
            const index = se.relInMeasureTimestamp.realValue * 8;
            const id = `CHECKPOINT:${measure.measureNumber}-${index}`
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
          navigateTo(osmd, measure, index);
        })
        elem.style.cursor = 'pointer';
      }
    });

  }

  function prebuffer(osmd) {
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
          topLength = topLength + staves[0].voiceEntries[0].notes[0].length.realValue * 16;
        }

        if (bot) {
          botLength = botLength + staves[1].voiceEntries[0].notes[0].length.realValue * 16;
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
  }

  function startPlaying3() {
    var sixteenth = incr / 2;
    var i = 0;
    var measureArr = playback[i];
    var delay = 0;
    console.log(sixteenth);
    intId.current = setInterval(() => {
      if (measureArr.length === 0) {
        i++;
        if (i > maxMeasure) {
          clearInterval(intId.current);
        }
        measureArr = playback[i];
        console.log(measureArr);
      }
      if (delay === 0) {
        delay = delay + measureArr.shift();
        currOsmd.cursor.next();
      } else {
        delay = delay - 1;
      }
    }, sixteenth);
  }

  function startPlaying2() {
    var currMeasure = 0;
    var length = measLength - 1;
    var skips = 0;
    intId.current = setInterval(() => {
      var measure = currOsmd.cursor.iterator.currentMeasure;
      var index = currOsmd.cursor.iterator.currentVoiceEntryIndex;
      if (currMeasure !== measure.measureNumber) {
        currMeasure = measure.measureNumber;
        length = measure.verticalSourceStaffEntryContainers.length - 1;
        skips = measLength - 1 - length;
      }

      if (index < length) {
        currOsmd.cursor.next();
      } else if (index >= length) {
        if (skips === 0) {
          currOsmd.cursor.next();
        }
        skips = skips - 1;
      }
    }, incr);
  }

  function playReps2(reps) {
    currOsmd.cursor.reset();
    var currMeasure = 0;
    var length = measLength - 1;
    var skips = 0;
    for (var i = 0; i < reps; i = i + 1) {
      var measure = currOsmd.cursor.iterator.currentMeasure;
      var index = currOsmd.cursor.iterator.currentVoiceEntryIndex;
      if (currMeasure !== measure.measureNumber) {
        currMeasure = measure.measureNumber;
        length = measure.verticalSourceStaffEntryContainers.length - 1;
        skips = measLength - 1 - length;
      }
      if (index < length) {
        currOsmd.cursor.next();
      } else if (index >= length) {
        if (skips === 0) {
          currOsmd.cursor.next();
        }
        skips = skips - 1;
      }
    }
  }

  function playToMeasure(osmd, measureNumber) {
    osmd.cursor.reset();
    var currMeasure = 0;
    var length = measLength - 1;
    var skips = 0;
    var reps = 0;
    while (osmd.cursor.iterator.currentMeasure.measureNumber < measureNumber) {
      var measure = osmd.cursor.iterator.currentMeasure;
      var index = osmd.cursor.iterator.currentVoiceEntryIndex;
      if (currMeasure !== measure.measureNumber) {
        currMeasure = measure.measureNumber;
        length = measure.verticalSourceStaffEntryContainers.length - 1;
        skips = measLength - 1 - length;
      }
      if (index < length) {
        osmd.cursor.next();
        reps = reps + 1;
      } else if (index >= length) {
        if (skips === 0) {
          osmd.cursor.next();
        }
        skips = skips - 1;
        reps = reps + 1;
      }
    }
    return reps;
  }

  const recalculate = () => {
    buffering.current = true;
    var timeMs = audioRef.current.audio.current.currentTime * 1000;
    var reps = Math.floor(timeMs / incr);
    playReps2(reps);
    var newTime = reps * incr / 1000;
    audioRef.current.audio.current.currentTime = reps * incr / 1000;
    setTime(newTime);
    buffering.current = false;
  }

  const navigateTo = (osmd, measure, index) => {
    buffering.current = true;
    var reps = playToMeasure(osmd, measure);
    for (let i = 0; i < index; i++) {
      osmd.cursor.next();
      reps = reps + 1;
    }
    var newTime = reps * incr / 1000;
    audioRef.current.audio.current.currentTime = reps * incr / 1000;
    setTime(newTime);
    buffering.current = false;
  }

  return (
    <div class={`${styles.sheet} ${styles.frame}`} >
      <button onClick={() => {
        currOsmd.cursor.next();
      }}>
        next
      </button>
      <button onClick={() => {
        console.log(currOsmd)
      }}>
        print
      </button>
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