"use client";

import React, { useRef, useState } from "react";
import PDFGenerator from "./PDFGenerator";
import {X} from 'lucide-react'

interface InvoiceItem {
  description: string;
  price: number;
  quantity: number;
}

const Invoice = () => {
  const invoiceRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<InvoiceItem[]>([
    { description: "", price: 0, quantity: 1 },
  ]);
  const [clientName, setClientName] = useState("");
  const [receivedAmount, setReceivedAmount] = useState(0);
  const [date, setDate] = useState("");
  const [isPDFMode, setIsPDFMode] = useState(false);
  const [isClick, setClick] = useState(false);

  const handleItemChange = (index: number, key: keyof InvoiceItem, value: string | number) => {
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index] = { ...updatedItems[index], [key]: value };
      return updatedItems;
    });
  };

  const addItem = () => {
    setItems([...items, { description: "", price: 0, quantity: 1 }]);
  };

  const removeItem = (index: number) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const totalAmount = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const remainingAmount = totalAmount - receivedAmount;

  if (!isClick) {
    return (
      <div className="p-8 bg-gray-100 min-h-screen">
        <div
          ref={invoiceRef}
          className={`max-w-[595px] mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200 ${isPDFMode ? "pdf-mode" : ""}`}
          style={{ width: "595px" }}
        >
          {/* Accent Top Bar */}
          <div className="h-1 bg-blue-500 rounded-t-lg"></div>

          {/* Header */}
          <div className="flex justify-between items-center mt-4 mb-2">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 uppercase">al-<span className="text-green-400">khalid</span>-tailor</h1>
              {isPDFMode ? (
                <p className="text-xs text-gray-500 mt-1">Date: {date}</p>
              ) : (
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="text-xs text-gray-500 mt-1 border p-1"
                />
              )}
            </div>
          </div>

          {/* Billing Information */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div>
              <h3 className="font-semibold text-gray-800 text-base">Billed to:</h3>
              {isPDFMode ? (
                <p className="text-gray-700 text-sm capitalize">{clientName}</p>
              ) : (
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="text-gray-700 text-sm capitalize w-full p-1 border"
                />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 text-base">From:</h3>
              <p className="text-gray-700 text-sm">Al Khalid Tailor</p>
              <p className="text-gray-700 text-sm capitalize">shop #6, green heaven market hyderi, Karachi</p>
            </div>
          </div>

          {/* Itemized Table */}
          <table className="w-full text-gray-800 mb-4 border-t border-b border-gray-200  flex flex-col">
            <thead className="">
              <tr className="bg-gray-100 text-gray-600 flex justify-around items-center">
                <th className="p-2 text-left text-sm">Item</th>
                <th className="p-2 text-center text-sm">Quantity</th>
                <th className="p-2 text-center text-sm">Price</th>
                <th className="py-2  text-right text-sm">Amount</th>
                {/* <th className="p-2 text-right text-sm"><X/></th> Empty header for remove button */}
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} className="border-t border-gray-200 flex justify-around items-center">
                  <td className="p-1 text-sm">
                    {isPDFMode ? (
                      <span>{item.description}</span>
                    ) : (
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => handleItemChange(index, "description", e.target.value)}
                        className="w-full p-1 border rounded"
                      />
                    )}
                  </td>
                  <td className="p-1 text-center text-sm">
                    {isPDFMode ? (
                      <span>{item.quantity}</span>
                    ) : (
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, "quantity", parseInt(e.target.value))}
                        className="w-full p-1 border rounded"
                      />
                    )}
                  </td>
                  <td className="p-1 text-center text-sm">
                    {isPDFMode ? (
                      <span>Rs.{item.price.toFixed(2)}</span>
                    ) : (
                      <input
                        type="number"
                        value={item.price}
                        onChange={(e) => handleItemChange(index, "price", parseFloat(e.target.value))}
                        className="w-full p-1 border rounded"
                      />
                    )}
                  </td>
                  <td className="p-1 text-right text-sm">Rs.{(item.price * item.quantity).toFixed(2)}</td>
                  <td className="p-1 text-right text-sm">
                    {!isPDFMode && (
                      <button onClick={() => removeItem(index)} className="text-red-500 hover:text-red-700 ml-4">
                        <X/>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Add Item Button */}
          {!isPDFMode && (
            <button
              onClick={addItem}
              className="block text-green-500 font-semibold py-1 px-3 rounded hover:bg-green-100"
            >
              + Line Item
            </button>
          )}

          {/* Total Section */}
          <div className={`text-right ${isPDFMode ? "pdf-total" : ""} mt-4`}>
            <p className="text-base font-semibold text-gray-800">Total: Rs.{totalAmount.toFixed(2)}</p>
            {isPDFMode ? (
              <p className="text-base font-semibold text-gray-800">Received Amount: Rs.{receivedAmount.toFixed(2)}</p>
            ) : (
              <div>
                <p className="text-base font-semibold text-gray-800">Received Amount:</p>
                <input
                  type="number"
                  value={receivedAmount}
                  onChange={(e) => setReceivedAmount(parseFloat(e.target.value))}
                  className="w-full text-right p-1 border rounded"
                />
              </div>
            )}
            <p className="text-base font-semibold text-gray-800">Remaining Amount: Rs.{remainingAmount.toFixed(2)}</p>
          </div>

          {/* Bottom Accent Bar */}
          <div className="h-1 bg-blue-500 rounded-b-lg mt-4"></div>
        </div>
        <button
          onClick={() => setClick(true)}
          className="block mx-auto mt-6 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Generate PDF
        </button>
      </div>
    );
  } else {
    return <PDFGenerator data={{ clientName: clientName, items: items, date: date, receivedAmount: receivedAmount }} />;
  }
};

export default Invoice;
