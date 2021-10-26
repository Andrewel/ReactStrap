import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from './layout';
import { MyResponsiveLine } from './chart/responsiveLineChart';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPosts, postsSelector } from '../slices/posts';

export const ChartPage = () => {
  const dispatch = useDispatch();
  const { posts, loading, hasErrors } = useSelector(postsSelector);

  const makeData = useMemo(() => {
    const data = posts.map((post) => {
      return { x: post.name, y: post.forks };
    });

    let chartData = [
      {
        id: 'JavaScript',
        color: 'hsl(330, 70%, 50%)',
        data,
      },
    ];
    return chartData;
  }, [posts]);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <Layout>
      <h1>Chart page</h1>
      <Link to='/'>Navigate to Table Page</Link>
      {!loading ? (
        <div style={{ width: '85vw', height: '700px' }}>
          <MyResponsiveLine data={makeData} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </Layout>
  );
};
