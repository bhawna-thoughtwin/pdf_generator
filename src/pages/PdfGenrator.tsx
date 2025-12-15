import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import toast from "react-hot-toast";
type ImageType = "JPEG" | "PNG" | "WEBP" | "SVG";
interface FormData {
    name: string;
    description: string;
    education: string;
    imageBase64: string | null;
    fileName: string;
    imageType: ImageType;
}
const initialForm: FormData = {
    name: "",
    description: "",
    education: "",
    imageBase64: null,
    fileName: "No file chosen",
    imageType: "JPEG",
};
const PdfGenerator: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<FormData>(initialForm);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [pdfDoc, setPdfDoc] = useState<jsPDF | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [mode, setMode] = useState<"form" | "preview">("form");

    /* ---------------- VALIDATION ---------------- */
    const validateForm = () => {
        const err: Record<string, string> = {};
        if (!formData.name.trim()) err.name = "Name is required";
        if (!formData.description.trim()) err.description = "Description is required";
        if (!formData.education.trim()) err.education = "Education is required";
        if (!formData.imageBase64) err.image = "Image is required";

        setErrors(err);
        return Object.keys(err).length === 0;
    };

    /* ---------------- HELPERS FUNCTIONS ---------------- */
    const fileToBase64 = (file: File) =>
        new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });

    const handleChange =
        (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData((prev) => ({ ...prev, [key]: e.target.value }));
            setErrors((prev) => ({ ...prev, [key]: "" }));
        };

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith("image/")) return toast.error("Invalid image");

        const base64 = await fileToBase64(file);
        const type: ImageType =
            file.type.includes("png") ? "PNG" :
                file.type.includes("webp") ? "WEBP" :
                    file.type.includes("svg") ? "SVG" : "JPEG";

        setFormData((prev) => ({
            ...prev,
            imageBase64: base64,
            fileName: file.name,
            imageType: type,
        }));

        setErrors((prev) => ({ ...prev, image: "" }));
    };

    /* ---------------- PDF GENERATION ---------------- */
    const generatePdf = () => {
        const doc = new jsPDF("p", "mm", "a4");
        const y = 20;

        const pageWidth = doc.internal.pageSize.getWidth();
        const imgX = pageWidth - 45;

        if (formData.imageBase64) {
            doc.addImage(formData.imageBase64, formData.imageType, imgX, y, 30, 30);
        }

        doc.setFontSize(18);
        doc.text(formData.name, 20, y + 20);

        doc.setFontSize(14);
        doc.text("Description", 20, y + 40);
        doc.setFontSize(12);
        doc.text(
            doc.splitTextToSize(formData.description, 170),
            20,
            y + 48
        );

        doc.setFontSize(14);
        doc.text("Education", 20, y + 90);
        doc.setFontSize(12);
        doc.text(
            doc.splitTextToSize(formData.education, 170),
            20,
            y + 98
        );

        return doc;
    };

    const createPdf = () => {
        if (!validateForm()) {
            toast.error("Please fill all fields");
            return;
        }

        setLoading(true);
        try {
            const doc = generatePdf();
            const blobUrl = URL.createObjectURL(doc.output("blob"));

            setPdfDoc(doc);
            setPreviewUrl(blobUrl);
            setMode("preview");

            toast.success("PDF generated Succesfully");
        } catch {
            toast.error("PDF generation failed");
        } finally {
            setLoading(false);
        }
    };

    const downloadPdf = () => {
        if (!pdfDoc) return;
        pdfDoc.save(`${formData.name || "resume"}.pdf`);
        setFormData(initialForm);
        setPdfDoc(null);
        setPreviewUrl(null);
        setMode("form");
    };

    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    /* ---------------- UI ---------------- */
    return (
        <div className="p-6 max-w-md mx-auto mt-10 border rounded">
            {mode === "form" && (
                <>
                    <label className="block mb-1 text-sm text-gray-700">
                        Name
                    </label>
                    <input
                        className="border p-2 w-full mb-2"
                        placeholder=" Enter your name"
                        value={formData.name}
                        onChange={handleChange("name")}
                    />
                    {errors.name && <p className="text-red-500">{errors.name}</p>}
                    <label className="block mb-1 text-sm text-gray-700">
                        Description
                    </label>
                    <input
                        className="border p-2 w-full mb-2"
                        placeholder="Enter your Description"
                        value={formData.description}
                        onChange={handleChange("description")}
                    />
                    {errors.description && <p className="text-red-500">{errors.description}</p>}
                    <label className="block mb-1 text-sm text-gray-700">
                        Education
                    </label>
                    <input
                        className="border p-2 w-full mb-2"
                        placeholder="Enter your education Education"
                        value={formData.education}
                        onChange={handleChange("education")}
                    />
                    {errors.education && <p className="text-red-500">{errors.education}</p>}
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
                                {formData.fileName}
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
                        className="bg-green-600 text-white w-full py-2 mt-4 rounded"
                    >
                        {loading ? "Generating..." : "Generate PDF"}
                    </button>
                </>
            )}

            {mode === "preview" && previewUrl && (
                <>
                    <iframe
                        src={previewUrl}
                        className="w-full h-[500px] border rounded"
                        title="PDF Preview"

                    />
                    <div className="flex gap-3 mt-4">
                        <button
                            onClick={() => setMode("form")}
                            className="bg-gray-500 text-white w-full py-2 rounded"
                        >
                            Edit
                        </button>
                        <button
                            onClick={downloadPdf}
                            className="bg-blue-600 text-white w-full py-2 rounded"
                        >
                            Download
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default PdfGenerator;
