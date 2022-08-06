import clsx from 'clsx';
import React, { ButtonHTMLAttributes, DetailedHTMLProps, forwardRef, ReactNode } from 'react';
import Spinner from './Spinner';

interface Props
    extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'warning' | 'danger' | 'gradient';
    size?: 'sm' | 'md' | 'lg' | 'none';
    outline?: boolean;
    loading?: boolean;
    icon?: React.ReactNode;
    children?: ReactNode;
    className?: string;
}

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
    { className = '',size='md', variant="secondary", outline, loading, icon, children, ...rest },
    ref
) {
    return (
        <button
            ref={ref}
            className={clsx(
                {
                    'bg-primary-500 hover:bg-primary-600 active:bg-primary-300 text-white ':
                    !outline && variant === 'primary',
                    'bg-gradient-to-r from-violet-400 to-fuchsia-500 hover:from-violet-500 hover:to-fuchsia-600    text-white focus:ring-1 ring-white':
                        !outline && variant === 'gradient',
                        'bg-slate-300 hover:bg-slate-400/60 active:bg-slate-400/60 text-black':
                    !outline && variant === 'secondary',
                    'bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-600 text-white focus:ring-1 ring-white':
                    !outline &&  variant === 'warning',
                    'bg-red-500 hover:bg-red-400 active:bg-red-600 text-white focus:ring-1 ring-white':
                    !outline &&  variant === 'danger',
                    'border-primary-500 hover:bg-primary-500 active:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 text-primary-600 ': outline && variant === 'primary',
                    'border-white hover:bg-white text-white active:bg-white focus:bg-white focus:ring-0': outline && variant === 'secondary',
                    'border-yellow-500 hover:bg-yellow-500 active:bg-yellow-500 focus:bg-yellow-500  focus:ring-0 ': outline && variant === 'warning',
                    'border-red-500 hover:bg-red-500 active:bg-red-500 focus:bg-red-500  focus:ring-0 ': outline && variant === 'danger',
                    'border hover:bg-opacity-10 active:bg-opacity-10 focus:bg-opacity-10':outline,
                    'flex items-center  justify-center gap-2': (icon || loading) && children,
                    'px-3 py-1 text-sm ':size === 'sm',
                    'px-4 py-1.5 text-base':size === 'md',
                    'px-12 py-3 text-lg':size === 'lg',
                    '': size === 'none'
                },
                'rounded-lg font-medium whitespace-nowrap cursor-pointer disabled:cursor-default font-display duration-200 ease-out hover:scale-[1.02] disabled:shadow-none  disabled:bg-gray-300 disabled:text-gray-900 active:scale-95  outline-none',
                className
            )}
            disabled={loading}
            {...rest}>
            {icon && !loading && icon}
            {icon && loading && <Spinner size={size === 'lg' ? 'md' : 'sm'} variant={variant === 'secondary' && !outline ? 'black' : 'secondary'} />}
            {!icon && loading && <Spinner size={size === 'lg' ? 'md' : 'sm'} variant={variant === 'secondary' && !outline ? 'black' : 'secondary'}/>}
            {children}
        </button>
    );
});

export default Button;