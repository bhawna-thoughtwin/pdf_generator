interface PdfPreviewProps {
    previewUrl: string;
    onEdit: () => void;
    onDownload: () => void;
}

const PdfPreview: React.FC<PdfPreviewProps> = ({
    previewUrl,
    onEdit,
    onDownload,
}) => {
    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-90 z-50 flex flex-col">
            {/* Top Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-blue-600 text-white">
                <h2 className="text-lg font-semibold">PDF Preview</h2>

                <div className="flex gap-2">
                    <button
                        onClick={onEdit}
                        className="bg-white text-blue-600 px-3 py-1 rounded text-sm font-medium"
                    >
                        Edit
                    </button>

                    <button
                        onClick={onDownload}
                        className="bg-green-500 px-3 py-1 rounded text-sm font-medium"
                    >
                        Download
                    </button>
                </div>
            </div>

            {/* Preview */}
            <div className="flex-1 overflow-auto flex justify-center p-6">
                <iframe
                    src={previewUrl}
                    title="PDF Preview"
                    className="w-[210mm] h-[297mm] bg-white"
                />
            </div>
        </div>
    );
};

export default PdfPreview;
