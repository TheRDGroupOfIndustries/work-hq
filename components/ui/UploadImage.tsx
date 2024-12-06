import React from 'react';
import { removeFile } from '@/utils/actions/fileUpload.action';
import { uploadNewFile } from '@/utils/actions/fileUpload.action';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { AddProjectFormData } from '../project/AddProject2'; // Adjust the import path as necessary

interface UploadImageProps {
    title?: string;
    setFormData: React.Dispatch<React.SetStateAction<AddProjectFormData>>;
    valueName: string;
    value: string;
    disabled?: boolean;
    isCompanyDetail?: boolean;
}

function UploadImage({ title, value, setFormData, valueName, disabled, isCompanyDetail }: UploadImageProps) {
    // console.log('value:', value);
    const [logoPreview, setLogoPreview] = React.useState<string | null>(value);
    const [uploadingPreview, setUploadingPreview] = React.useState<boolean>(false);

    const handleSignleImageUpload = async () => {
        if(disabled) return;
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*, .gif";

        input.onchange = async (e: Event) => {
            const target = e.target as HTMLInputElement;
            const file = target.files?.[0];
            setUploadingPreview(true);
            if (file) {
                const imagesFormData = new FormData();
                imagesFormData.append("file", file);

                const imageUrl = (await uploadNewFile(imagesFormData));

                if (!imageUrl) {
                    return alert("Image upload failed. Please try again later.");
                }
                setLogoPreview(imageUrl?.url);
                // Update formData with the uploaded image URL
                if (isCompanyDetail) {
                    setFormData((prevData) => ({
                        ...prevData,
                        companyDetails: {
                            ...prevData.companyDetails,
                            [valueName]: imageUrl.url, // Set the logo URL
                        },
                        // [valueName]: imageUrl?.url,
                    }));
                }
                else {
                    setFormData((prevData) => ({
                        ...prevData,
                        projectDetails: {
                            ...prevData.projectDetails,
                            [valueName]: imageUrl.url, // Set the logo URL
                        },
                        // [valueName]: imageUrl?.url,
                    }));
                }
            }
            setUploadingPreview(false);
        };

        input.click();
    }

    const handleRemoveImage = async (imageToRemove: string) => {
        const success = await removeFile(imageToRemove);
        if (success) {
            setLogoPreview(null);
            // Clear the logo in formData
            
            setFormData((prevData) => ({
                ...prevData,
                companyDetails: {
                    ...prevData.companyDetails,
                    logo: "", // Set logo to an empty string
                },
            }));
        }
    };

    return (
        <div className='h-full'>
            <div className='flex flew-row justify-between'>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {title}
                </label>
                {!disabled && logoPreview &&
                    <Button style={{ background: "red" }} type='button' onClick={() => handleRemoveImage(logoPreview)} className='ml-2'>
                        Remove
                    </Button>
                }
            </div>
            {logoPreview ? (
                <div className='h-[150px] mt-3 shadow-neuro-3 bg-transparent rounded flex-center'>
                    <Image src={logoPreview} alt='logo' className='w-full h-full object-contain' width={100} height={100} />
                </div>
            ) :
                <div className={`h-[150px] mt-3 shadow-neuro-3 bg-transparent rounded flex-center cursor-pointer ${disabled && 'cursor-no-drop' }`} onClick={handleSignleImageUpload}>
                    <span>
                        {disabled?
                        'No Image Uploaded':
                        uploadingPreview ? 'Uploading...' : 'Drag & Drop or Click to Upload'}
                    </span>
                </div>
            }
        </div>
    )
}

export default UploadImage;