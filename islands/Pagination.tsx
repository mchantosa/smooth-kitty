import axiod from "https://deno.land/x/axiod/mod.ts";
export const PAGE_SIZE = 2;

export function Pagination(props: any) {
  const { activePage, totalPages } = props.pagination;

  const PageButton = ({ pageNumber, active }) => {
    return (
      <a
        className={`join-item btn ${active ? "btn-active" : ""}`}
        role="button"
        href={active ? "#" : `/contacts?page=${pageNumber}`}
      >
        {pageNumber}
      </a>
    );
  };

  const pages = Array.from(Array(totalPages).keys());
  return (
    <div className="join flex justify-center">
      {pages.map((p: number) => {
        const pageNumber = p + 1;
        return (
          <PageButton
            pageNumber={pageNumber}
            active={activePage == pageNumber}
          ></PageButton>
        );
      })}
    </div>
  );
}