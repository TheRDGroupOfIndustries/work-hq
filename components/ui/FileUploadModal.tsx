import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface FileUploadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpload: (file: File, title: string, description: string) => void;
    modalOptions: { title: string; description: string };
    setModalOptions: React.Dispatch<React.SetStateAction<{ title: string; description: string }>>;
}

const FileUploadModal: React.FC<FileUploadModalProps> = ({ isOpen, onClose, onUpload,modalOptions, setModalOptions }) => {
    const [file, setFile] = useState<File | null>(null);
    ;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleSubmit = () => {
        if (file) {
            onUpload(file, modalOptions.title, modalOptions.description);
            setFile(null);
            setModalOptions({ title: '', description: '' });
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded shadow-lg">
                <h2 className="text-lg font-bold mb-2">Upload File</h2>
                <input type="file" accept=".pdf, .doc, .docx, .csv" onChange={handleFileChange} />
                <input
                    type="text"
                    placeholder="Title"
                    value={modalOptions.title}
                    onChange={(e) => setModalOptions({ ...modalOptions, title: e.target.value })}
                    className="mt-2 border rounded p-1 w-full"
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={modalOptions.description}
                    onChange={(e) => setModalOptions({ ...modalOptions, description: e.target.value })}
                    className="mt-2 border rounded p-1 w-full"
                />
                <div className="mt-4 flex justify-end">
                    <Button type="button" onClick={onClose} className="mr-2">
                        Cancel
                    </Button>
                    <Button type="button" onClick={handleSubmit}>
                        Upload
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default FileUploadModal;