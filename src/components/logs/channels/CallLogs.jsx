// NOT WORKING, TEST INFINITY SCROLL

import React, { useState } from 'react';
import { useInfiniteQuery } from '@reduxjs/toolkit/query/react';
import { api } from './api';

const CallLogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

  const { data = [], isLoading, isFetchingMore, fetchMore } = useInfiniteQuery(
    ['items', page, searchTerm],
    ({ pageParam = 1 }) => api.fetchItems(pageParam, searchTerm),
    {
      getNextPageParam: (lastPage) => {
        const { hasNextPage, nextPage } = lastPage.pagination;
        return hasNextPage ? nextPage : undefined;
      },
    }
  );

  const items = data.flatMap((page) => page.items);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const handleScroll = () => {
    if (!isLoading && !isFetchingMore && window.innerHeight + window.scrollY >= document.body.scrollHeight) {
      fetchMore();
    }
  };

  return (
    <div>
      <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearch} />
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      {(isLoading || isFetchingMore) && <p>Loading...</p>}
    </div>
  );
};

export default CallLogs;
