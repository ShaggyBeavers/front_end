import {
    Pagination as UIPagination,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
    PaginationLink,
    PaginationContent,
    PaginationItem,
} from '../ui/pagination';

type PageNumber = number | 'ellipsis';

const Pagination = ({
    totalPages,
    currentPage,
    onPageChange,
}: {
    totalPages: number;
    currentPage: any;
    onPageChange: (pageNumber: number) => void;
}) => {
    
    const getPageNumbers = (): PageNumber[] => {
        const maxVisiblePages = 3;
        const pages: PageNumber[] = [];

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            const minPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
            const maxPage = Math.min(totalPages, minPage + maxVisiblePages - 1);

            if (minPage > 1) {
                pages.push(1);
                if (minPage > 2) {
                    pages.push('ellipsis');
                }
            }

            for (let i = minPage; i <= maxPage; i++) {
                pages.push(i);
            }

            if (maxPage < totalPages) {
                if (maxPage < totalPages - 1) {
                    pages.push('ellipsis');
                }
                pages.push(totalPages);
            }
        }

        return pages;
    };

    return (
        <UIPagination>
            <PaginationContent>
                <PaginationItem>
                    {currentPage !== 1 && (
                        <PaginationPrevious onClick={() => onPageChange(currentPage - 1)}/>
                    )}
                </PaginationItem>

                {getPageNumbers().map((page, index) => (
                    <PaginationItem key={index}>
                        {page === 'ellipsis' ? (
                            <PaginationEllipsis />
                        ) : (
                            <PaginationLink
                                isActive={currentPage === page}
                                onClick={() => onPageChange(page)}
                            >
                                {page}
                            </PaginationLink>
                        )}
                    </PaginationItem>
                ))}

                <PaginationItem>
                    {currentPage !== totalPages && (
                        <PaginationNext onClick={() => onPageChange(currentPage + 1)}/>
                    )}
                </PaginationItem>
            </PaginationContent>
        </UIPagination>
    );
};

export default Pagination;
