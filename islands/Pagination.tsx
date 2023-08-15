import axiod from "https://deno.land/x/axiod/mod.ts";
export const PAGE_SIZE = 2;

export function Pagination(props: any) {
  //active page
  //min page = 1
  //max page = total pages
  return (
    <div className="join flex justify-center">
      <button className="join-item btn">1</button>
      <button className="join-item btn btn-active">2</button>
      <button className="join-item btn">3</button>
      <button className="join-item btn">4</button>
    </div>
  );
}
