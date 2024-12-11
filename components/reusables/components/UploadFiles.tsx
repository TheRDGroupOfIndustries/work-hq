"use client";
import React, { useState } from 'react';
import { DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";
import SquareButton from "../wrapper/squareButton";

export default function UploadFiles() {
  const [inputType, setInputType] = useState<"all" | "url" | "file">('all');
  const [url, setUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setTitle(selectedFile.name);
      setInputType('file');
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    setInputType(newUrl.trim() ? 'url' : 'all');
  };

  const handleRemoveFile = () => {
    setFile(null);
    setTitle('');
    setInputType(url.trim() ? 'url' : 'all');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!title.trim()) {
      alert('Please enter a title');
      return;
    }

    if (inputType === 'url' && !url.trim()) {
      alert('Please enter a URL');
      return;
    }

    if (inputType === 'file' && !file) {
      alert('Please select a file');
      return;
    }

    // Prepare submission data
    const submissionData = {
      title,
      description,
      type: inputType,
      [inputType]: inputType === 'url' ? url : file
    };

    console.log('Submission Data:', submissionData);
    // Backend submission logic here
  };


  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="z-10 w-[733px] m-4 bg-primary-sky-blue flex flex-col gap-6 rounded-3xl p-5 lg:p-6"
    >
      <h1 className="text-2xl font-semibold text-dark-gray">Upload File</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="w-full flex flex-col gap-3">
          <Label className="text-base font-medium text-gray-800">Title</Label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Name of file"
            className="w-full text-base h-[40px] outline-none shadow-[3px_3px_3px_0px_#789BD399,-3px_-3px_5px_0px_#FFFFFF] bg-transparent rounded-lg px-4"
            required
          />
        </div>

        <div className="w-full flex flex-col gap-3">
          <Label className="text-base font-medium text-gray-800">
            Description
          </Label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What is this file about?"
            className="w-full text-base h-[40px] outline-none shadow-[3px_3px_3px_0px_#789BD399,-3px_-3px_5px_0px_#FFFFFF] bg-transparent rounded-lg px-4"
          />
        </div>

        <div className="w-full flex flex-col gap-3">
          <Label className="text-base font-medium text-gray-800">Add Url</Label>
          <input
            type="text"
            value={url}
            onChange={handleUrlChange}
            placeholder="Add Url"
            disabled={inputType === 'file'}
            className={`w-full text-base h-[40px] outline-none shadow-[3px_3px_3px_0px_#789BD399,-3px_-3px_5px_0px_#FFFFFF] bg-transparent rounded-lg px-4 ${
              inputType === 'file' ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          />
        </div>

        <div className="text-center">OR</div>

        <div className="w-full flex flex-col gap-3">
          <Label className="text-base font-medium text-gray-800">
            Upload File
          </Label>
          <div className="relative w-full text-base h-[40px] outline-none shadow-[3px_3px_3px_0px_#789BD399,-3px_-3px_5px_0px_#FFFFFF] bg-transparent rounded-lg px-4 flex flex-row items-center">
            <input
              type="file"
              onChange={handleFileChange}
              disabled={inputType === 'url'}
              className="absolute z-10 top-0 bottom-0 right-0 left-0 w-[90%] h-full opacity-0 cursor-pointer"
            />
            {file ? (
              <div className="flex items-center w-full justify-between">
                <p className="truncate max-w-[80%]">{file.name}</p>
                <button 
                  type="button"
                  onClick={handleRemoveFile}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={20} />
                </button>
              </div>
            ) : (
              <p className={`w-full text-base ${
                inputType === 'url' ? '' : 'opacity-50 cursor-not-allowed'
              }`}>
                Upload File
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-row gap-2 justify-end">
          <DialogClose asChild>
            <SquareButton className="text-[#6A6A6A] w-fit self-end">
              Cancel
            </SquareButton>
          </DialogClose>
          <button 
            type="submit" 
            className="text-desktop flex items-center py-3 px-5 gap-2 shadow-[3px_3px_10px_0px_#789BD399,5px_5px_15px_0px_#00000099_inset,-3px_-3px_10px_0px_#FFFFFF] rounded-xl text-white bg-primary-blue"
          >
            <Plus color="#ffffff" />
            Add File
          </button>
        </div>
      </form>
    </div>
  );
}