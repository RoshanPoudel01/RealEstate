import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface UseSearchParamsState {
  pageParam?: string;
  queryParam?: string;
}

export const useSearchParamsState = ({
  pageParam = "page",
  queryParam = "q",
}: UseSearchParamsState = {}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(location.search);

  // Get initial values from URL or set defaults
  const pageFromUrl = urlParams.get(pageParam) || "1";
  const queryFromUrl = urlParams.get(queryParam) || "";

  const [pageIndex, setPageIndex] = useState<number>(parseInt(pageFromUrl));
  const [keyword, setKeyword] = useState<string>(queryFromUrl);

  // Sync pageIndex state with URL changes
  useEffect(() => {
    setPageIndex(parseInt(pageFromUrl));
  }, [pageFromUrl]);

  // Sync keyword state with URL changes and update the URL on keyword change
  useEffect(() => {
    if (keyword) {
      urlParams.set(queryParam, keyword);
    } else {
      urlParams.delete(queryParam);
    }
    navigate({ search: urlParams.toString() }, { replace: true });
  }, [keyword, location.search, navigate, queryParam]);

  return { pageIndex, setPageIndex, keyword, setKeyword };
};
