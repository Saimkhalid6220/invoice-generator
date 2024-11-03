
import React, { useRef } from "react";
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
  };
}

const Invoice: React.FC<InvoiceProps> = ({ data }) => {
  const invoiceRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    if (invoiceRef.current) {
      const canvas = await html2canvas(invoiceRef.current);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10, 190, 0); // Adjust dimensions for PDF
      pdf.save("invoice.pdf");
    }
  };

  const calculateTotal = () =>
    data.items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div>
      <div
        ref={invoiceRef}
        className="p-6 bg-gray-100 rounded shadow-md max-w-lg mx-auto my-8"
      >
        <h2 className="text-3xl font-bold text-center mb-4">Invoice</h2>
        <p className="text-lg mb-4">Client: {data.clientName}</p>
        <table className="w-full border-collapse mb-4">
          <thead>
            <tr>
              <th className="border p-2">Description</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, index) => (
              <tr key={index} className="text-center">
                <td className="border p-2">{item.description}</td>
                <td className="border p-2">{item.quantity}</td>
                <td className="border p-2">${item.price.toFixed(2)}</td>
                <td className="border p-2">${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3 className="text-xl font-bold text-right">Total: ${calculateTotal().toFixed(2)}</h3>
      </div>
      <button
        onClick={downloadPDF}
        className="block mx-auto bg-blue-500 text-white py-2 px-4 rounded"
      >
        Download PDF
      </button>
    </div>
  );
};

export default Invoice;
