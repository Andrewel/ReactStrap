import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from './layout';
import { ReactTablePage } from './reactTablePage/reactTablePage';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPosts, postsSelector } from '../slices/posts';

export const Home = () => {
  const dispatch = useDispatch();
  const { posts, loading, hasErrors } = useSelector(postsSelector);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const makeTableData = useMemo(() => {
    const tableData = posts.map((post) => {
      return {
        name: post.name,
        fullName: post.full_name,
        watchers: post.watchers,
        forks: post.forks,
        owner: post.owner.login,
        openIssues: post.open_issues,
      };
    });
    return tableData;
  }, [posts]);

  return (
    <div>
      {!loading ? (
        <>
          <ReactTablePage tableData={makeTableData} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
