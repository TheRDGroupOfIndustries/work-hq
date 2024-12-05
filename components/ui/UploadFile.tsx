import React from 'react';
import { removeFile } from '@/utils/actions/fileUpload.action';
import { uploadNewFile } from '@/utils/actions/fileUpload.action';
import { Button } from '@/components/ui/button';
import { AddProjectFormData } from '../project/AddProject2'; // Adjust the import path as necessary
import Link from 'next/link';

interface UploadFileProps {
    title?: string;
    value: string; // The current file URL
    setFormData: React.Dispatch<React.SetStateAction<AddProjectFormData>>;
    valueName: string; // The key in companyDetails to update
    disabled?: boolean;
}

interface fileType {
    url: string;
    title: string;
    description: string;
    date: string;
    size: number;
}

const UploadFile: React.FC<UploadFileProps> = ({ title, value, setFormData, valueName, disabled }) => {
    const [filePreview, setFilePreview] = React.useState<fileType | null>({url: value, title: '', description: '', date: '', size: 0});
    const [uploading, setUploading] = React.useState<boolean>(false);

    const handleSingleFileUpload = async () => {
        if (disabled) return;
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".pdf, .doc, .docx, .csv"; // Acceptable file types

        input.onchange = async (e: Event) => {
            const target = e.target as HTMLInputElement;
            const file = target.files?.[0];
            setUploading(true);
            if (file) {
                const filesFormData = new FormData();
                filesFormData.append("file", file);

                const fileData = (await uploadNewFile(filesFormData));
                if (!fileData) {
                    return alert("File upload failed. Please try again later.");
                }
                
                setFilePreview({
                    url: fileData.url,
                    title: fileData.name,
                    description: "This is a file",
                    date: fileData.lastModified? new Date(fileData?.lastModified).toISOString(): new Date().toISOString(),
                    size: fileData.size,
                });
                setFormData((prevData:AddProjectFormData) => ({
                    ...prevData,
                    projectDetails:{
                        ...prevData.projectDetails,
                      [valueName]: fileData.url, // Set the specified field to the uploaded file URL
                    }
                }));
            }
            setUploading(false);
        };

        input.click();
    }

    const handleRemoveFile = async () => {
        if (filePreview) {
            const success = await removeFile(filePreview.url);
            if (success) {
                setFilePreview(null);
                setFormData((prevData) => ({
                    ...prevData,
                    companyDetails: {
                        ...prevData.companyDetails,
                        [valueName]: "", // Set the specified field to an empty string
                    },
                }));
            }
        }
    };

    return (
        <div className='h-full'>
            <div className='flex flew-row justify-between'>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {title}
                </label>
                { !disabled &&
                    <Button disabled={!filePreview?.url} style={{ background: "red" }} type='button' onClick={handleRemoveFile} className='ml-2 disabled:opacity-50'>
                        Remove
                    </Button>
                }
            </div>
            {(filePreview && filePreview.url) ? (
                <div className='min-h-[150px] mt-3 shadow-neuro-3 bg-transparent rounded flex-center flex-col gap-1'>
                    <Link href={filePreview.url} className='underline hover:opacity-60'>Assets & Scope Uploaded</Link> 
                </div>
            ) :
                <div className={`min-h-[150px] mt-3 shadow-neuro-3 bg-transparent rounded flex-center cursor-pointer ${disabled && 'cursor-no-drop'}`} onClick={handleSingleFileUpload}>
                    <span>
                        {disabled ? 'No File Uploaded' : uploading ? 'Uploading...' : 'Drag & Drop or Click to Upload File'}
                    </span>
                </div>
            }
        </div>
    );
}

export default UploadFile;