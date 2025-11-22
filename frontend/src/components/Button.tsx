const Button = ({
    children,
    onClick,
    className = '',
    variant = 'primary',
    ...props
}: {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    variant?: 'primary' | 'secondary';
    [key: string]: unknown;
}) => {
        const baseClasses =
            'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 cursor-pointer disabled:pointer-events-none disabled:opacity-50';

        const variants = {
            primary: 'bg-pink-500 text-white hover:bg-pink-600 px-4 py-2',
            secondary: 'border border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white px-4 py-2',
        };

    return (
        <button className={`${baseClasses}, ${variants[variant]} ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;
