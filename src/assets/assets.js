import canonindmp3 from './canonind/canonind.mp3';
import canonindpdf from './canonind/canonind.pdf';
import canonindmxl from './canonind/canonind.mxl';
import carolofthebellsmp3 from './carolofthebells/carolofthebells.mp3';
import carolofthebellspdf from './carolofthebells/carolofthebells.pdf';
import carolofthebellsmxl from './carolofthebells/carolofthebells.mxl';
import funeralmarchmp3 from './funeralmarch/funeralmarch.mp3';
import funeralmarchpdf from './funeralmarch/funeralmarch.pdf';
import funeralmarchmxl from './funeralmarch/funeralmarch.mxl';
import swedenmp3 from './sweden/sweden.mp3';
import swedenpdf from './sweden/sweden.pdf';
import swedenmxl from './sweden/sweden.mxl';
import clocksmp3 from './clocks/clocks.mp3';
import clockspdf from './clocks/clocks.pdf';
import clocksmxl from './clocks/clocks.mxl';
import wethandsmp3 from './wethands/wethands.mp3';
import wethandspdf from './wethands/wethands.pdf';
import wethandsmxl from './wethands/wethands.mxl';

var assets = {
  "canonind": {
    title: "Canon in D",
    artist: "Johann Pachelbel",
    audioSrc: canonindmp3,
    pdfSrc: canonindpdf,
    mxlSrc: canonindmxl,
    BPM: 60,
    length: 8,
  },
  "carolofthebells": {
    title: "Carol of the Bells",
    artist: "William J. Rose",
    audioSrc: carolofthebellsmp3,
    pdfSrc: carolofthebellspdf,
    mxlSrc: carolofthebellsmxl,
    BPM: 180,
    length: 6,
  },
  "funeralmarch": {
    title: "Sonate Op. 35 - Funeral March",
    artist: "Frederic Chopin",
    audioSrc: funeralmarchmp3,
    pdfSrc: funeralmarchpdf,
    mxlSrc: funeralmarchmxl,
    BPM: 48,
    length: 8,
  },
  "sweden": {
    title: "Sweden",
    artist: "C418",
    audioSrc: swedenmp3,
    pdfSrc: swedenpdf,
    mxlSrc: swedenmxl,
    BPM: 44,
    length: 4,
  },
  "clocks": {
    title: "Clocks",
    artist: "Coldplay",
    audioSrc: clocksmp3,
    pdfSrc: clockspdf,
    mxlSrc: clocksmxl,
    BPM: 60,
    length: 8,
  },
  "wethands": {
    title: "Wet Hands",
    artist: "C418",
    audioSrc: wethandsmp3,
    pdfSrc: wethandspdf,
    mxlSrc: wethandsmxl,
    BPM: 74,
    length: 8,
  },
}
export default assets;