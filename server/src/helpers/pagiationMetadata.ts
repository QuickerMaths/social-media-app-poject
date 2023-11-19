export default function paginationMetadata({
  currentPage,
  pageSize,
  total
}: {
  currentPage: number;
  pageSize: number;
  total: number;
}) {
  const totalPages = Math.ceil(total / pageSize);
  const hasNextPage = currentPage < totalPages;

  return {
    totalPages,
    hasNextPage
  };
}
