'use client'
import { useState, ChangeEvent, FormEvent } from "react";

interface InvoiceItem {
  description: string;
  price: number;
  quantity: number;
}

interface InvoiceFormProps {
  onGenerate: (data: { clientName: string; items: InvoiceItem[] }) => void;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({ onGenerate }) => {
  const [clientName, setClientName] = useState("");
  const [items, setItems] = useState<InvoiceItem[]>([
    { description: "", price: 0, quantity: 1 },
  ]);

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
    onGenerate({ clientName, items });
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
      
      <h3 className="text-xl font-semibold">Items</h3>
      {items.map((item, index) => (
        <div key={index} className="grid grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Description"
            value={item.description}
            onChange={(e) => updateItem(index, "description", e.target.value)}
            required
            className="p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Price"
            value={item.price}
            onChange={(e) => updateItem(index, "price", parseFloat(e.target.value))}
            required
            className="p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={item.quantity}
            onChange={(e) => updateItem(index, "quantity", parseInt(e.target.value))}
            required
            className="p-2 border rounded"
          />
        </div>
      ))}
      <button type="button" onClick={addItem} className="p-2 bg-blue-500 text-white rounded">
        Add Item
      </button>
      <button type="submit" className="p-2 bg-green-500 text-white rounded">
        Generate Invoice
      </button>
    </form>
  );
};

export default InvoiceForm;
