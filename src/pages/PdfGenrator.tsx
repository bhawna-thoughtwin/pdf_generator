import React, { useState } from "react";
import { jsPDF } from "jspdf";
import toast from "react-hot-toast";

const PdfGenerator: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [pdfDoc, setPdfDoc] = useState<jsPDF | null>(null);

  const createPdf = () => {
    if (!text.trim()) {
      toast.error("Please enter some description");
      return;
    }

    setLoading(true); // <-- START loading

    setTimeout(() => {
      const doc = new jsPDF();
      doc.text(text || "No content", 10, 20);

      setPdfDoc(doc);
      toast.success("PDF generated! Now you can preview or download.");
      setLoading(false); // <-- END loading
    }, 800); // small delay to show spinner effect (optional)
  };

  const previewPdf = () => {
    if (!pdfDoc) return;
    const pdfBlob = pdfDoc.output("blob");
    const url = URL.createObjectURL(pdfBlob);
    window.open(url);
  };

  const downloadPdf = () => {
    if (!pdfDoc) return;
    const fileName = name.trim() ? `${name.trim()}.pdf` : "document.pdf";
    pdfDoc.save(fileName);

    toast.success("PDF downloaded successfully!");
    setName("");
    setText("");
    setPdfDoc(null);
  };

  return (
    <div className="p-6 max-w-md mx-auto mt-10 border rounded">
      <label>Name</label>
      <input
        type="text"
        className="border p-2 w-full mb-4"
        placeholder="Enter title for PDF..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>Description</label>
      <textarea
        className="border p-2 w-full h-32"
        placeholder="Type something for PDF..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {loading ? (
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded w-full mt-3 cursor-not-allowed"
          disabled
        >
          Generating PDF...
        </button>
      ) : (
        <button
          onClick={createPdf}
          className="bg-green-600 text-white px-4 py-2 rounded w-full mt-3"
        >
          Generate PDF
        </button>
      )}
      <div className="flex gap-4 mt-4">
        <button
          onClick={previewPdf}
          disabled={!pdfDoc}
          className={`px-4 py-2 rounded w-full text-white ${
            pdfDoc ? "bg-yellow-600" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Preview
        </button>
        <button
          onClick={downloadPdf}
          disabled={!pdfDoc}
          className={`px-4 py-2 rounded w-full text-white ${
            pdfDoc ? "bg-blue-600" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default PdfGenerator;
