import React from 'react';
import { useParams } from 'react-router-dom';
import 'react-h5-audio-player/lib/styles.css';
import assets from '../assets/assets.js';
import styles from '../css/sheet.module.css';
import PDFViewer from './components/PDFViewer.js';
import SheetMusic from './components/SheetMusic.js';
import SheetHeader from './components/SheetHeader.js';

function Sheet() {
  let { sheet_id } = useParams();
  var data = assets[`${sheet_id}`];

  return (
    <div>
      <SheetHeader songTitle={data.title} artist={data.artist} />
      <div class={styles.sideBySide}>
        <SheetMusic audioSrc={data.audioSrc} mxlSrc={data.mxlSrc} BPM={data.BPM} measLength={data.length} useSkips={data.useSkips} />
        <PDFViewer pdfSrc={data.pdfSrc} />
      </div>
    </div>
  )
}

export default Sheet;