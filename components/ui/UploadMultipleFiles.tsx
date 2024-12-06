import React, { useState } from 'react';
import { removeFile } from '@/utils/actions/fileUpload.action';
import { uploadMultipleNewFiles } from '@/utils/actions/fileUpload.action';
import { Button } from '@/components/ui/button';
import FileUploadModal from './FileUploadModal'; // Import the modal component
import { AddProjectFormData } from '../project/AddProject2'; // Adjust the import path as necessary
import Link from 'next/link';


interface FileObject {
    url: string;
    title: string;
    description: string;
    date: Date;
    size: number;
}

interface UploadMultipleFilesProps {
    title?: string;
    values: FileObject[]; // Array of file objects
    setFormData: React.Dispatch<React.SetStateAction<AddProjectFormData>>;
    valueName: string; // The key in projectDetails to 
    disabled?: boolean;
}

const UploadMultipleFiles: React.FC<UploadMultipleFilesProps> = ({ title, values, setFormData, valueName , disabled}) => {
    const [filePreviews, setFilePreviews] = useState<FileObject[]>(values);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [uploading, setUploading] = useState<boolean>(false);
    const [modalOptions, setModalOptions] = useState<{ title: string; description: string }>({
        title: "",
        description: "",
    });

    const handleMultipleFilesUpload = async (file: File) => {
        const filesFormData = new FormData();
        filesFormData.append("files", file);
        setUploading(true);
        const fileUrls = (await uploadMultipleNewFiles(filesFormData)) as string[];

        if (!fileUrls) {
            return alert("Files upload failed. Please try again later.");
        }

        const newFile: FileObject = {
            url: fileUrls[0], // Assuming single file upload
            title:modalOptions.title,
            description: modalOptions.description,
            date: new Date(), // Set current date
            size: file.size, // Get the size of the uploaded file
        };

        const updatedFiles = [...filePreviews, newFile];
        console.log("updated files: ",updatedFiles);
        setFilePreviews(updatedFiles);
        setFormData((prevData) => ({
            ...prevData,
            projectDetails: {
                ...prevData.projectDetails,
                [valueName]: updatedFiles, // Update the specified field in projectDetails
            },
        }));
        setUploading(false);
    };

    const handleRemoveFile = async (fileToRemove: string) => {
        const success = await removeFile(fileToRemove);
        if (success) {
            const updatedFiles = filePreviews.filter(file => file.url !== fileToRemove);
            setFilePreviews(updatedFiles);
            setFormData((prevData) => ({
                ...prevData,
                projectDetails: {
                    ...prevData.projectDetails,
                    [valueName]: updatedFiles, // Update the specified field in projectDetails
                },
            }));
        }
    };

    return (
        <div className='h-full'>
            <div className='flex flew-row justify-between '>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {title}
                </label>
                <Button type='button' onClick={() => {
                    if(disabled) return;
                    setIsModalOpen(true);
                }} className={`ml-2 disabled:opacity-60 ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                disabled={uploading}
                    >
                    {disabled ? 'No Files Uploaded' : uploading ? 'Uploading...' : 'Upload'}
                </Button>
            </div>
            <div className='h-[150px] mt-3 shadow-neuro-3 bg-transparent rounded '>
                {filePreviews.length > 0 ? (
                    <div className='mt-3 p-4'>
                        {filePreviews.map((file, index) => {
                            // console.log("file: ",file);
                            return (
                            <div key={index} className='flex justify-between items-center'>
                                <div>
                                    <span>{index+ 1} .</span>
                                    <Link href={file.url} className='hover:opacity-60 underline'>
                                        {file.title}
                                    </Link>
                                </div>
                                { !disabled && <Button type='button' onClick={() => handleRemoveFile(file.url)} className='ml-2 text-red-600 bg-transparent hover:text-dark-blue'>
                                    X
                                </Button>
                        }
                            </div>
                        )}
                        )}
                    </div>
                ) : (
                    <div className={` flex-center cursor-pointer h-full w-full ${
                        disabled && 'cursor-no-drop'
                    }`} onClick={() => {
                        if(disabled) return;
                        setIsModalOpen(true);
                    }}>
                        <span>
                            {disabled? 'No Files uploaded' : uploading ? 'Uploading...' : 'Drag & Drop or Click to Upload Files'}
                           
                            
                        </span>
                    </div>
                )}  
            </div>
            <FileUploadModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onUpload={handleMultipleFilesUpload}
                modalOptions={modalOptions}
                setModalOptions={setModalOptions}
            />
        </div>
    );
}

export default UploadMultipleFiles;