import React, { useRef, useCallback } from 'react';
import Oops from '../errorComponent/Oops';

// types
import type { InfiniteScrollErrorInterface } from '../../types/errorComponentInterface';

interface InfiniteScrollGridProps<T> {
    data: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
    loading: boolean;
    hasMore: boolean;
    onLoadMore: () => void;
    error?: InfiniteScrollErrorInterface;
    skeletonComponent?: React.ReactNode;
    className?: string; // Optional className for the grid container
    style?: React.CSSProperties;
}

function InfiniteScrollGrid<T extends { _id?: string, id?: string | number }>({
    data,
    renderItem,
    loading,
    hasMore,
    onLoadMore,
    error,
    skeletonComponent,
    className = "products-grid", // Default to products-grid but allow override
    style
}: InfiniteScrollGridProps<T>) {

    const observer = useRef<IntersectionObserver | null>(null);

    const lastElementRef = useCallback((node: HTMLDivElement | null) => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                onLoadMore();
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore, onLoadMore]);

    const retry = () => {
        window.location.reload();
    }

    if (error?.errorState) {
        return <Oops message={error.errorMsg} retry={retry} />;
    }

    return (
        <div className={className} style={style}>
            {data.map((item, index) => (
                <React.Fragment key={item._id || item.id || index}>
                    {renderItem(item, index)}
                </React.Fragment>
            ))}

            {!loading && hasMore && (
                <div ref={lastElementRef} style={{ height: '20px', width: '100%', gridColumn: '1 / -1' }}></div>
            )}

            {loading && skeletonComponent}
            {loading && !skeletonComponent && <p>Loading...</p>}

            {!loading && data.length === 0 && !error && (
                <div style={{ gridColumn: "1 / -1", textAlign: "center" }}>
                    <Oops message="No items found." />
                </div>
            )}
        </div>
    );
}

export default InfiniteScrollGrid;
