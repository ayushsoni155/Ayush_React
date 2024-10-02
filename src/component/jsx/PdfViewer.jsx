import React from 'react';
import { Document, Page } from 'react-pdf';

const PdfViewer = ({ pdfUrl, onClose }) => {
  return (
    <div className="pdf-viewer-modal">
      <button onClick={onClose}>Close</button>
      <Document file={pdfUrl}>
        <Page pageNumber={1} />
        {/* Add more pages as needed */}
      </Document>
    </div>
  );
};

export default PdfViewer;
