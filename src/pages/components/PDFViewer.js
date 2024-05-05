import React, { useRef, useEffect } from 'react';
import styles from '../../css/sheet.module.css';

function PDFViewer({ pdfSrc }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    let PSPDFKit;

    (async function () {
      PSPDFKit = await import("pspdfkit");
      await PSPDFKit.load({
        container,
        licenseKey: 'KBfkvGnjghp1eLkWNhmj_RGTy-3iDPs0xkc4ZAIwQJcP2fYcnwpV4ZEmtXPqJkAy9RbQOh4Rb89PR3ZBYiqNDyPNFB6Ey_tnSVxl9tCDGkGwFoIfUYdYYRZ6fxuASQajb7oVefIUwnxFdY51cDRAo2eXH2bvmGRyGbq66UWleprFI3IsPxFVkgj50RgUDHbzfwdwKZW5qh7kfM8a',
        document: pdfSrc,
        baseUrl: `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`,
      })
    })();
    return () => PSPDFKit && PSPDFKit.unload(container);
  }, [pdfSrc]);

  return (
    <div class={styles.frame}>
      <div ref={containerRef} style={{ width: "100%", height: "100vh" }}></div>
    </div>
  )
}

export default PDFViewer;