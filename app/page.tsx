'use client'
import { useState } from "react";
import InvoiceForm from "../components/InvoiceForm";
import Invoice from "../components/Invoice";

interface InvoiceItem {
  description: string;
  price: number;
  quantity: number;
}

interface InvoiceData {
  clientName: string;
  items: InvoiceItem[];
}

export default function Home() {
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);

  const handleGenerateInvoice = (data: InvoiceData) => setInvoiceData(data);

  return (
    <div className="p-8 min-h-screen bg-gray-50 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8">Invoice Generator</h1>
      <InvoiceForm onGenerate={handleGenerateInvoice} />
      {invoiceData && <Invoice data={invoiceData} />}
    </div>
  );
}
