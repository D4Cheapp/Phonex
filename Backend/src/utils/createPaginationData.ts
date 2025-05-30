export const createPaginationData = (
  page: number,
  perPage: number,
  count: number,
  results: unknown
) => ({
  results,
  pagination: {
    currentPage: Number(page),
    perPage: Number(perPage),
    nextPage: page + 1 > Math.ceil(count / perPage) ? null : page + 1,
    prevPage: page === 1 ? null : page - 1,
    totalPages: Math.ceil(count / perPage),
    totalCount: Number(count),
  },
});
