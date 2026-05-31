import React from "react";
import type { IconType } from "react-icons";

type InputType = {
    label?: string;
    type?: string;
    name: string;
    value: string | number;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeHolder?: string;
    Icon?: IconType;
    className?: string;
    disabled?: boolean;
};

const Input = ({
    label,
    type = "text",
    name,
    value,
    handleChange,
    placeHolder,
    Icon,
    className = "",
    disabled = false,
}: InputType) => {
    return (
        <div className="flex flex-col gap-1">
            {label && (
                <label
                    htmlFor={name}
                    className="text-sm font-medium text-gray-700"
                >
                    {label}
                </label>
            )}

            <div className="relative">
                <input
                    id={name}
                    type={type}
                    name={name}
                    placeholder={placeHolder}
                    value={value}
                    onChange={handleChange}
                    disabled={disabled}
                    className={`
                        w-full py-2 px-3
                        ${Icon ? "pr-10" : ""}
                        border border-gray-300
                        rounded-lg
                        outline-none
                        focus:ring-2 focus:ring-deep-walnut
                        focus:border-deep-walnut
                        transition
                        disabled:bg-gray-100
                        disabled:cursor-not-allowed
                        ${className}
                    `}
                />

                {Icon && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-deep-walnut">
                        <Icon size={18} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Input;