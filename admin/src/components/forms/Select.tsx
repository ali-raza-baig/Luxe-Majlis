import React from "react";
import type { IconType } from "react-icons";

type OptionType = {
    label: string;
    value: string | number;
};

type SelectType = {
    label?: string;
    name: string;
    value: string | number;
    handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: OptionType[];
    placeHolder?: string;
    Icon?: IconType;
    className?: string;
    disabled?: boolean;
};

const Select = ({
    label,
    name,
    value,
    handleChange,
    options,
    placeHolder = "Select option",
    Icon,
    className = "",
    disabled = false,
}: SelectType) => {
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
                <select
                    id={name}
                    name={name}
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
                        appearance-none
                        ${className}
                    `}
                >
                    <option value="">{placeHolder}</option>

                    {options.map((opt, i) => (
                        <option key={i} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>

                {Icon && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-deep-walnut pointer-events-none">
                        <Icon size={18} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Select;