import { useState } from 'react';

function usePagination(
  page: number,
  pageSize: number,
): [{ pageNum: number; pageSize: number }, (a: number, b: number) => void] {
  const [currentPageNum, setCurrentPageNum] = useState(page);
  const [currentPageSize, setCurrentPageSize] = useState(pageSize);

  const currentPagination = {
    pageNum: currentPageNum,
    pageSize: currentPageSize,
  };

  const setCurrentPagination = (pageNum: number, pagesize: number) => {
    setCurrentPageNum(pageNum);
    setCurrentPageSize(pagesize);
  };

  return [currentPagination, setCurrentPagination];
}

export default usePagination;
