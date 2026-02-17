import { useState } from "react";

export const useInfiniteScroll = () => {
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isFetching, setIsFetching] = useState(false);
    const [errorObj, setErrorObj] = useState({ errorState: false, errorMsg: "" });

    const loadMore = () => {
        setPage(prev => prev + 1);
    }

    const handleEnd = () => {
        setHasMore(false);
    }

    const setFetching = (fetchingState: boolean) => {
        setIsFetching(fetchingState);
    }

    const handleError = (errorState: boolean, errorMsg: string) => {
        setErrorObj({ errorState, errorMsg });
    }

    return {
        page,
        hasMore,
        isFetching,
        errorObj,
        loadMore,
        handleEnd,
        setFetching,
        handleError
    }
}