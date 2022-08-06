import clsx from 'clsx';
import React, { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from 'react';

export interface InputProps
    extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    label?: string;
    className?: string;
    error?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
    { label, leftIcon, rightIcon, type = 'text', error='', className = '', ...props },
    ref
) {
    return (
        <label className="w-full">
            {label && <div className="mb-2 font-medium text-gray-500">{label}</div>}
            <div className="flex items-center ring-1 ring-gray-300  hover:shadow-lg focus-within:shadow-xl hover:ring-gray-300 focus-within:ring-primary-300  focus-within:-translate-y-0.5 duration-200 ease-out rounded-lg bg-white ">
                {leftIcon && <span className=" py-2 px-3 ">{leftIcon}</span>}
                <input
                    className={clsx(
                        ' focus:ring-primary focus:ring-1 text-gray-900   bg-white disabled:opacity-60 disabled:bg-opacity-20 outline-none w-full p-3',
                        {
                            '!border-red-500 placeholder-red-500': error !== '',
                            'rounded-r-lg': leftIcon,
                            'rounded-l-lg': rightIcon,
                            'rounded-lg': !rightIcon && !leftIcon,
                            'pl-4': !leftIcon,
                            'pr-4': !rightIcon,
                        },
                        className
                    )}
                    type={type} 
                    ref={ref}
                    {...props}
                />
                {rightIcon && (
                    <span className=" py-2 px-3 rounded-r-lg">{rightIcon}</span>
                )}
            </div>
        </label>
    );
});