"use client";

import React, { useEffect, useRef, useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

interface InvoiceItem {
  description: string;
  price: number;
  quantity: number;
}

interface InvoiceProps {
  data: {
    clientName: string;
    items: InvoiceItem[];
    date: string;
    receivedAmount: number;
  };
}

const Invoice: React.FC<InvoiceProps> = ({ data }) => {
  const invoiceRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [isPDFMode, setIsPDFMode] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const downloadPDF = async () => {
    if (invoiceRef.current) {
      setIsPDFMode(true); // Set PDF mode before taking snapshot
      const pdf = new jsPDF("p", "pt", "a4");
      const canvas = await html2canvas(invoiceRef.current, {
        scale: 2,
      });
      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", 0, 0, 595, 842);
      pdf.save("invoice.pdf");
      setIsPDFMode(false); // Reset PDF mode after saving
    }
  };

  const totalAmount = data.items.reduce((total, item) => total + item.price * item.quantity, 0);
  const remainingAmount = totalAmount - data.receivedAmount;

  if (!isClient) return null;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div
        ref={invoiceRef}
        className={`max-w-[595px] mx-auto p-6 flex flex-col bg-white rounded-lg shadow-lg border border-gray-200 ${isPDFMode ? "pdf-mode" : ""}`}
        style={{ width: "595px", height: "842px" }}
      >
        {/* Accent Top Bar */}
        <div className="h-1 bg-blue-500 rounded-t-lg"></div>

        {/* Header */}
        <div className="flex justify-between items-center mt-4 mb-2">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">AL-<span className="text-green-400">KHALID</span>-TAILOR</h1>
            <p className="text-xs text-gray-500 mt-1">Date: {data.date}</p>
          </div>
        </div>

        {/* Billing Information */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div>
            <h3 className="font-semibold text-gray-800 text-base">Billed to:</h3>
            <p className="text-gray-700 text-sm">{data.clientName}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 text-base">From:</h3>
            <p className="text-gray-700 text-sm">Al Khalid Tailor</p>
            <p className="text-gray-700 text-sm capitalize">shop #6 green heaven market hyderi,Karachi</p>
          </div>
        </div>

        {/* Itemized Table */}
        <div className="flex-1">
          <table className="w-full text-gray-800 mb-4 border-t border-b border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-gray-600">
                <th className="p-2 text-left text-sm">Item</th>
                <th className="p-2 text-center text-sm">Quantity</th>
                <th className="p-2 text-center text-sm">Price</th>
                <th className="p-2 text-right text-sm">Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item, index) => (
                <tr key={index} className="border-t border-gray-200">
                  <td className="p-1 text-sm">{item.description}</td>
                  <td className="p-1 text-center text-sm">{item.quantity}</td>
                  <td className="p-1 text-center text-sm">${item.price.toFixed(2)}</td>
                  <td className="p-1 text-right text-sm">${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add an empty row if there are fewer items */}
        {/* <div className="flex-1" ></div> */}

        {/* Total Section */}
        <div className={`text-right ${isPDFMode ? "pdf-total" : ""}`}>
          <p className="text-base font-semibold text-gray-800">Total: ${totalAmount.toFixed(2)}</p>
          <p className="text-base font-semibold text-gray-800">Received Amount: ${data.receivedAmount.toFixed(2)}</p>
          <p className="text-base font-semibold text-gray-800">Remaining Amount: ${remainingAmount.toFixed(2)}</p>
        </div>

        {/* Bottom Accent Bar */}
        <div className="h-1 bg-blue-500 rounded-b-lg mt-4"></div>
      </div>

      <button
        onClick={downloadPDF}
        className="block mx-auto mt-6 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Download PDF
      </button>

      <style jsx>{`
        .pdf-mode .p-6 {
          padding: 12px;
        }
        .pdf-mode .mb-4 {
          margin-bottom: 8px;
        }
        .pdf-total p {
          margin-bottom: 2px;
        }
      `}</style>
    </div>
  );
};

export default Invoice;
