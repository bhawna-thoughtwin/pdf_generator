import React, { useState } from "react";
import { jsPDF } from "jspdf";
import toast from "react-hot-toast";
const PdfGenerator: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [text, setText] = useState("");
    const [education, setEducation] = useState("");
    const [pdfDoc, setPdfDoc] = useState<jsPDF | null>(null);
    const [imageType, setImageType] = useState<"JPEG" | "PNG" | "WEBP" | "SVG">("JPEG");
    const [fileName, setFileName] = useState<string>("No file chosen");
    const [imageBase64, setImageBase64] = useState<string | null>(null);
    const [mode, setMode] = useState<"form" | "preview">("form");
    const [errors, setErrors] = useState<{
        name?: string;
        text?: string;
        education?: string;
        image?: string;
    }>({});
    const validateForm = () => {
        const newErrors: typeof errors = {};
        if (!name.trim()) {
            newErrors.name = "Name is required";
        }
        const plainText = text.replace(/<[^>]+>/g, "").trim();
        if (!plainText) {
            newErrors.text = "Description is required";
        }
        if (!education.trim()) {
            newErrors.education = "Education is required";
        }
        if (!imageBase64) {
            newErrors.image = "Image is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const fileToBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    const handleImageChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith("image/")) {
            toast.error("Please select a valid image");
            return;
        }
        setFileName(file.name); //  show selected file name
        const base64 = await fileToBase64(file);
        setImageBase64(base64);


        if (file.type.includes("png")) setImageType("PNG");
        else if (file.type.includes("webp")) setImageType("WEBP");
        else if (file.type.includes("svg")) setImageType("SVG");
        else setImageType("JPEG");
        setErrors((prev) => ({ ...prev, image: undefined }));
    };
    const createPdf = async () => {
        if (!validateForm()) {
            toast.error("Please fil the required fields");
            return;
        }
        setLoading(true);
        try {
            const doc = new jsPDF("p", "mm", "a4");
            //this is for margin
            let y = 20;
            // for imgae
            const pageWidth = doc.internal.pageSize.getWidth();
            const imgWidth = 30;
            const marginRight = 15;
            const x = pageWidth - imgWidth - marginRight;
            if (imageBase64) {
                doc.addImage(imageBase64, imageType, x, y, imgWidth, 30);
            }
            // for name
            doc.setFontSize(18);
            doc.text(name || "Your Name", 50, y + 20);
            // for descritpion
            doc.setFontSize(12);
            doc.text("Description", 20, y + 40);
            const plainText = text.replace(/<[^>]+>/g, "");
            const lines = doc.splitTextToSize(plainText, 140);
            doc.text(lines, 20, y + 46);
            //for education section
            doc.setFontSize(16);
            doc.text("Education", 20, y + 80);
            doc.setFontSize(12);
            const eduLines = doc.splitTextToSize(education, 170);
            doc.text(eduLines, 20, y + 90);
            setPdfDoc(doc);
              setMode("preview");
            toast.success("PDF generated successfully");
        } catch (err) {
            console.error(err);
            toast.error("Failed to generate PDF");
        } finally {
            setLoading(false);
        }
    };
    const previewPdf = () => {
        if (!pdfDoc) return;

        // open blank tab immediately (user gesture)
        const previewWindow = window.open("", "_blank");
        if (!previewWindow) {
            toast.error("Popup blocked. Please allow popups.");
            return;
        }
        const blob = pdfDoc.output("blob");
        const url = URL.createObjectURL(blob);

        previewWindow.location.href = url;
        setTimeout(() => URL.revokeObjectURL(url), 10000);
    };


    const downloadPdf = () => {
        if (!pdfDoc) return;
        pdfDoc.save(`${name || "resume"}.pdf`);
        setName("");
        setText("");
        setImageBase64(null);
        setPdfDoc(null);
        setEducation("");
    };
    return (
        <div className="p-6 max-w-md mx-auto mt-10 border rounded">
            {mode === "form" && (
                <>
                
                </>
                )}
            <label className="block mb-1 text-sm text-gray-700">
                Name
            </label>
            <input
                className={`border p-2 w-full mb-1 ${errors.name ? "border-red-500" : ""}`}
                value={name}
                placeholder="Enter your name..."
                onChange={(e) => {
                    setName(e.target.value);
                    setErrors((prev) => ({ ...prev, name: undefined }));
                }}
            />
            {errors.name && (
                <p className="text-red-500 text-sm mb-2">{errors.name}</p>
            )}

            <label className="block mb-1 text-sm text-gray-700">
                Description
            </label>
            <input
                className={`border p-2 w-full mb-1 ${errors.text ? "border-red-500" : ""}`}
                placeholder="Enter description here..."
                value={text}
                onChange={(e) => {
                    setText(e.target.value);
                    setErrors((prev) => ({ ...prev, text: undefined }));
                }}
            />
            {errors.text && (
                <p className="text-red-500 text-sm mb-2">{errors.text}</p>
            )}
            <label className="block mb-1 text-sm text-gray-700">
                Education
            </label>

            <input
                className={`border p-2 w-full mb-1 ${errors.text ? "border-red-500" : ""}`}
                placeholder="Enter your Education here..."
                value={education}
                onChange={(e) => {
                    setEducation(e.target.value);
                    setErrors((prev) => ({ ...prev, education: undefined }));
                }}
            />
            {errors.education && (
                <p className="text-red-500 text-sm mb-2">{errors.education}</p>
            )}
            {/* <TextEditor value={text} onChange={setText}  /> */}
            <div className="mt-3">
                <label className="block mb-1 text-sm text-gray-700">
                    Choose Image
                </label>

                <div className="flex items-center gap-3">
                    {/* Button */}
                    <label
                        htmlFor="imageUpload"
                        className="cursor-pointer rounded bg-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-300"
                    >
                        Choose File
                    </label>

                    {/* File name */}
                    <span className="text-sm text-gray-600 truncate max-w-[200px]">
                        {fileName}
                    </span>
                </div>

                {/* Hidden input */}
                <input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                />
                {errors.image && (
                    <p className="text-red-500 text-sm mt-1">{errors.image}</p>
                )}

            </div>


            <button
                onClick={createPdf}
                disabled={loading}
                className="bg-green-600 text-white px-4 py-2 rounded w-full mt-3"
            >
                {loading ? "Generating..." : "Generate PDF"}
            </button>
            {pdfDoc && (

                <div className="flex gap-4 mt-4">
                    <button
                        onClick={previewPdf}
                        disabled={!pdfDoc}
                        className="bg-yellow-600 text-white px-4 py-2 rounded w-full"
                    >
                        Preview
                    </button>
                    <button
                        onClick={downloadPdf}
                        disabled={!pdfDoc}
                        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
                    >
                        Download
                    </button>
                </div>
            )}


        </div>
    );
};

export default PdfGenerator;
