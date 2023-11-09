import { useInfiniteHits } from 'react-instantsearch-hooks-web';
import { AutoSizer, Grid } from 'react-virtualized';
import React, { useCallback, useEffect, useRef } from 'react';

import 'react-virtualized/styles.css';

const columnCount = 4;
const rowHeight = 178;

export function InfiniteHits({ hitComponent: HitComponent, ...props }: any) {
  const { hits, isLastPage, showMore } = useInfiniteHits(props);
  const sentinelRef = useRef(null);

  // const gridCellRenderer = useCallback(({ columnIndex, key, rowIndex, style }: any) => {
  //   const index = rowIndex * columnCount + columnIndex
  //   const hit = hits[index]

  //   return (
  //     <div key={hit.objectID} className="ais-InfiniteHits-item" style={style}>
  //       <HitComponent hit={hit} />
  //     </div>
  //   )
  // }, [hits])

  // const onGridScroll = useCallback(({clientHeight, scrollHeight, scrollTop}: any) => {
  //   const buffer = 5
  //   const hasReachedEnd = scrollTop + clientHeight >= scrollHeight - buffer * rowHeight

  //   console.log(hasReachedEnd, isLastPage)

  //   if (hasReachedEnd && !isLastPage) showMore()
  // }, [isLastPage, showMore])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isLastPage) {
          showMore();
        }
      });
    });

    if (sentinelRef.current !== null) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [isLastPage, showMore]);

  // return (
  //   <div className="ais-InfiniteHits">
  //     <AutoSizer disableHeight>
  //       {({ width, height }) => (
  //         <Grid
  //           className="ais-InfiniteHits-list"
  //           autoHeight={true}
  //           onScroll={onGridScroll}
  //           cellRenderer={gridCellRenderer}
  //           columnCount={columnCount}
  //           columnWidth={width / columnCount}
  //           height={height || 600}
  //           rowCount={hits.length / columnCount}
  //           rowHeight={rowHeight}
  //           width={width}
  //         />
  //       )}
  //     </AutoSizer>
  //   </div>
  // )

  return (
    <div className="ais-InfiniteHits">
      <ul className="ais-InfiniteHits-list">
        {hits.map((hit) => (
          <li key={hit.objectID} className="ais-InfiniteHits-item">
            <HitComponent hit={hit} />
          </li>
        ))}
        <li
          className="ais-InfiniteHits-sentinel"
          ref={sentinelRef}
          aria-hidden="true"
        />
      </ul>
    </div>
  );
}
