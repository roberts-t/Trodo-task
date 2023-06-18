export const LoadingPlaceholder = ({ className }: LoadingPlaceholderProps) => {
    return (
        <span className={`animate-pulse bg-gray-200 rounded block ${className}`} />
    );
};

type LoadingPlaceholderProps = {
    className?: string;
}
