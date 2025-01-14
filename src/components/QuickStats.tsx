import React from 'react';
import { TrendingUp, Users, DollarSign, Activity } from 'lucide-react';
import { LivestockData } from '../types';

interface QuickStatsProps {
  data: LivestockData[];
}

const QuickStats: React.FC<QuickStatsProps> = ({ data }) => {
  const totalValue = data.reduce((sum, item) => sum + item.price, 0);
  const totalAnimals = data.length;
  const averagePrice = totalValue / totalAnimals;
  const healthyAnimals = data.filter(item => 
    item.condition === 'excellent' || item.condition === 'good'
  ).length;

  const stats = [
    {
      title: 'Total Livestock',
      value: totalAnimals,
      icon: Users,
      color: 'bg-blue-500',
      trend: '+5% from last month'
    },
    {
      title: 'Total Value',
      value: `$${totalValue.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-green-500',
      trend: '+12% from last month'
    },
    {
      title: 'Average Price',
      value: `$${averagePrice.toFixed(2)}`,
      icon: TrendingUp,
      color: 'bg-purple-500',
      trend: '+3% from last month'
    },
    {
      title: 'Healthy Animals',
      value: `${healthyAnimals}/${totalAnimals}`,
      icon: Activity,
      color: 'bg-yellow-500',
      trend: 'Stable'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 transition-all duration-200 hover:shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} bg-opacity-10 p-3 rounded-lg`}>
                <Icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
              </div>
              <span className="text-sm font-medium text-gray-400">{stat.trend}</span>
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">{stat.title}</h3>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        );
      })}
    </div>
  );
};

export default QuickStats;