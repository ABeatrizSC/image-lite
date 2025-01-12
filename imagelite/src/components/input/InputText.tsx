import React from "react";

interface InputTextProps {
    style ?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    id?: string;
    value?: string;
}

export const InputText: React.FC<InputTextProps> = ({ style, ...rest } : InputTextProps) => {
    return (
        <input type="text" 
            {...rest}
            className={`${style} border px-3 py-2 rounded-lg text-gray-900`}
        />
    )
}