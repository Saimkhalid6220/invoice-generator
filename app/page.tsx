'use client'
import React, { useRef } from 'react';
import Invoice from '../components/Invoice';
// import DownloadablePDFComponent from '../components/PDFGenerator';

const Page: React.FC = () => {

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Invoice Display */}
      <Invoice />

      {/* Download PDF Button */}
      {/* <DownloadablePDFComponent invoiceRef={invoiceRef} /> */}
    </div>
  );
};

export default Page;
