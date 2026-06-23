import React, { useEffect, useRef, useState } from "react";
import {  FiX, FiUpload } from "react-icons/fi";

interface ImageUploadProps {
    label?: string;
    name: string;
    value: File | File[] | null;
    handleChange: (
        name: string,
        value: File | File[] | null
    ) => void;
    multiple?: boolean;
    accept?: string;
    maxSize?: number;
    maxFiles?: number;
    className?: string;
}

const ImageUpload = ({
    label,
    name,
    value,
    handleChange,
    multiple = false,
    accept = "image/*",
    maxSize = 5,
    maxFiles = 10,
    className = "",
}: ImageUploadProps) => {
    const [dragActive, setDragActive] = useState(false);
    const [previews, setPreviews] = useState<string[]>([]);
    
    const fileInputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (!value) {
            setPreviews([]);
            return;
        }

        if (Array.isArray(value)) {
            const urls = value.map((item) =>
                item instanceof File
                    ? URL.createObjectURL(item)
                    : item
            );

            setPreviews(urls);
        } else {
            const url =
                value instanceof File
                    ? URL.createObjectURL(value)
                    : value;

            setPreviews([url]);
        }
    }, [value]);

    const handleFiles = (files: FileList | null) => {
        if (!files) return;

        const fileArray = Array.from(files);

        const validFiles: File[] = [];
        const errors: string[] = [];

        fileArray.forEach((file) => {
            if (file.size > maxSize * 1024 * 1024) {
                errors.push(`${file.name} exceeds ${maxSize}MB`);
            } else if (!file.type.startsWith("image/")) {
                errors.push(`${file.name} is not an image`);
            } else {
                validFiles.push(file);
            }
        });

        if (errors.length) {
            alert(errors.join("\n"));
        }

        if (!validFiles.length) return;

        const newPreviews = validFiles.map((file) =>
            URL.createObjectURL(file)
        );

        if (multiple) {
            setPreviews((prev) => [...prev, ...newPreviews]);

            const existingFiles = Array.isArray(value)
                ? value
                : [];

            handleChange(name, [...existingFiles, ...validFiles]);
        } else {
            previews.forEach((url) => URL.revokeObjectURL(url));

            setPreviews([newPreviews[0]]);

            handleChange(name, validFiles[0]);
        }
    };

    const removeImage = (index: number) => {
        URL.revokeObjectURL(previews[index]);

        const updatedPreviews = previews.filter(
            (_, i) => i !== index
        );

        setPreviews(updatedPreviews);

        if (multiple) {
            const files = Array.isArray(value)
                ? value.filter((_, i) => i !== index)
                : [];

            handleChange(name, files);
        } else {
            handleChange(name, null);
        }
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        handleFiles(e.dataTransfer.files);
    };

    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            {label && (
                <label className="text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}

            {/* Upload Area */}
            <div
                className={`relative border-2 border-dashed rounded-lg p-6 transition-colors cursor-pointer ${dragActive
                    ? "border-deep-walnut bg-deep-walnut/5"
                    : "border-gray-300 hover:border-deep-walnut"
                    }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    onChange={(e) => handleFiles(e.target.files)}
                    className="hidden"
                />

                <div className="text-center">
                    <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">
                        Drag & drop or click to upload
                    </p>
                    <p className="text-xs text-gray-500">
                        {multiple ? `Max ${maxFiles} files` : "Single file"} • Max {maxSize}MB each
                    </p>
                </div>
            </div>

            {/* Image Previews */}
            {previews.length > 0 && (
                <div className={`mt-4 ${multiple ? "grid grid-cols-3 gap-4" : ""}`}>
                    {previews.map((preview, index) => (
                        <div key={index} className="relative group">
                            <img
                                src={preview.startsWith("blob:")
                                    ? preview
                                    : `${import.meta.env.VITE_API_BACKEND_URL}/images/${preview}`}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg border border-gray-200"
                            />
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeImage(index);
                                }}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                            >
                                <FiX size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImageUpload;