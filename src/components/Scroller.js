import { useState, useEffect } from "react";
import axios from "axios";

function UseScroller(pageNum, req) {
    const [isLoading, setIsLoading] = useState(false); // Initialize as false
    const [error, setError] = useState(false);
    const [list, setList] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        const CancelToken = axios.CancelToken;
        let cancel;
        setIsLoading(true); // Set loading to true when starting a new request
        setError(false);

        if (pageNum === 1) {
            setList([]); // Clear the list if it's the first page
        }

        axios(req, {
            cancelToken: new CancelToken((c) => (cancel = c)),
        })
            .then((res) => {
                setList((prev) => {
                    if (pageNum === 1) {
                        return [...res.data];
                    }
                    return [...new Set([...prev, ...res.data])];
                });
                setHasMore(res.data.length > 0);
            })
            .catch((err) => {
                if (axios.isCancel(err)) return;
                setError(err);
            })
            .finally(() => {
                setIsLoading(false); // Set loading to false after the request is complete
            });

        return () => cancel();
    }, [pageNum, req]); // Include pageNum and req as dependencies

    return { isLoading, error, list, hasMore };
}


export default UseScroller;


