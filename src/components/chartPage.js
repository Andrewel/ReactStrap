import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from './layout';
import { MyResponsiveLine } from './chart/responsiveLineChart';
import { MyResponsivePie } from './chart/responsivePie';
import { MyResponsiveBar } from './chart/responsiveBar';
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
    <div>
      {!loading ? (
        <div>
          <div style={{ width: '85vw', height: '700px' }}>
            <MyResponsiveLine data={makeData} />
          </div>
          <div style={{ width: '85vw', height: '700px' }}>
            <MyResponsivePie />
          </div>
          <div style={{ width: '85vw', height: '700px' }}>
            <MyResponsiveBar />
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
