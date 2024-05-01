import React from 'react';
import { useParams } from 'react-router-dom';
import 'react-h5-audio-player/lib/styles.css';
import assets from '../assets/assets.js';
import PDFViewer from './components/PDFViewer.js';
import SheetMusic from './components/SheetMusic.js';
import SheetHeader from './components/SheetHeader.js';

function Sheet() {
  let { sheet_id } = useParams();
  var data = assets[`${sheet_id}`];

  return (
    <div>
      <SheetHeader songTitle={data.title} artist={data.artist} />
      <SheetMusic audioSrc={data.audioSrc} mxlSrc={data.mxlSrc} BPM={data.BPM} measLength={data.length} />
      <PDFViewer pdfSrc={data.pdfSrc} />
    </div>
  )
}

export default Sheet;