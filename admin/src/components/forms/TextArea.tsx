import React from "react";

type TextAreaProps = {
    label?: string;
    name: string;
    value: string;
    handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeHolder?: string;
    className?: string;
    disabled?: boolean;
    required?: boolean;
    rows?: number;
};

const TextArea = ({
    label,
    name,
    value,
    handleChange,
    placeHolder,
    className = "",
    disabled = false,
    required = false,
    rows = 5,
}: TextAreaProps) => {
    return (
        <div className="flex flex-col gap-1">
            {label && (
                <label
                    htmlFor={name}
                    className="text-sm font-medium text-gray-700"
                >
                    {label}
                    {required && <span className="ml-1 text-red-500">*</span>}
                </label>
            )}

            <textarea
                id={name}
                name={name}
                placeholder={placeHolder}
                value={value}
                onChange={handleChange}
                disabled={disabled}
                required={required}
                rows={rows}
                className={`
                    w-full px-3 py-2
                    border border-gray-300
                    rounded-lg
                    resize-y
                    outline-none
                    transition-all
                    focus:border-deep-walnut
                    focus:ring-2 focus:ring-deep-walnut/20
                    disabled:bg-gray-100
                    disabled:cursor-not-allowed
                    ${className}
                `}
            />
        </div>
    );
};

export default TextArea;