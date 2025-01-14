import React from 'react';
import { historicalData } from '../data/mockData';
import MyLivestock from '../components/MyLivestock';

const MyLivestockPage = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">My Livestock</h1>
      <MyLivestock data={historicalData} />
    </div>
  );
};

export default MyLivestockPage;