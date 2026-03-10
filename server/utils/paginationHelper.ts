export interface Pagination {
    limit: number;
    page: number;
    skip: number;
}

export function formatPagination(page: number = 1, limit: number = 12) {
    const newLimit = Math.min(limit, 50);
    const newPage = Math.max(page, 1);
    const skip = (newPage - 1) * newLimit;
    const pagination = { limit: newLimit, page: newPage, skip };

    return pagination;
}