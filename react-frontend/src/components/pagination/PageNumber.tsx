export const PageNumber= ({ onClick, pageNumber, active }: PageNumberProps) => {
    return (
        <li className="inline-block mx-0.5">
            <button
                className={`px-1.5 py-0.5 text-sm rounded cursor-pointer ${active ? 'bg-gray-400 text-white' : 'text-gray-700 hover:bg-gray-100 transition-colors'}`}
                onClick={onClick}
            >
                {pageNumber}
            </button>
        </li>
    );
};

type PageNumberProps = {
    onClick: () => void;
    pageNumber: number;
    active: boolean;
}
