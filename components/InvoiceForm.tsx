"use client";

import { useState, ChangeEvent, FormEvent } from "react";

interface InvoiceItem {
  description: string;
  price: number;
  quantity: number;
}

interface InvoiceFormProps {
  onGenerate: (data: {
    clientName: string;
    items: InvoiceItem[];
    date: string;
    receivedAmount: number;
  }) => void;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({ onGenerate }) => {
  const [clientName, setClientName] = useState("");
  const [date, setDate] = useState("");
  const [receivedAmount, setReceivedAmount] = useState(0);
  const [items, setItems] = useState<InvoiceItem[]>([{ description: "", price: 0, quantity: 1 }]);

  const addItem = () => setItems([...items, { description: "", price: 0, quantity: 1 }]);

  const updateItem = (index: number, key: keyof InvoiceItem, value: string | number) => {
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index] = { ...updatedItems[index], [key]: value };
      return updatedItems;
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onGenerate({
      clientName,
      items,
      date,
      receivedAmount,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Invoice Details</h2>
      
      <label className="block">
        Client Name
        <input
          type="text"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          required
          className="w-full p-2 mt-1 border rounded"
        />
      </label>

      <label className="block">
        Received Amount
        <input
          type="number"
          value={receivedAmount}
          onChange={(e) => setReceivedAmount(parseFloat(e.target.value))}
          required
          className="w-full p-2 mt-1 border rounded"
        />
      </label>

      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Items</h3>
        {items.map((item, index) => (
          <div key={index} className="border p-4 rounded-md space-y-2">
            <label className="block">
              Description
              <input
                type="text"
                value={item.description}
                onChange={(e) => updateItem(index, "description", e.target.value)}
                required
                className="w-full p-2 mt-1 border rounded"
              />
            </label>

            <label className="block">
              Price
              <input
                type="number"
                value={item.price}
                onChange={(e) => updateItem(index, "price", parseFloat(e.target.value))}
                required
                className="w-full p-2 mt-1 border rounded"
              />
            </label>

            <label className="block">
              Quantity
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => updateItem(index, "quantity", parseInt(e.target.value))}
                required
                className="w-full p-2 mt-1 border rounded"
              />
            </label>
          </div>
        ))}

        <button
          type="button"
          onClick={addItem}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Add Item
        </button>
      </div>

      <label className="block">
        Date
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full p-2 mt-1 border rounded"
        />
      </label>

      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
        Generate Invoice
      </button>
    </form>
  );
};

export default InvoiceForm;
