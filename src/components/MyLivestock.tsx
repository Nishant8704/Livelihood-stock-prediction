import React from 'react';
import { LivestockData } from '../types';

interface MyLivestockProps {
  data: LivestockData[];
}

const MyLivestock: React.FC<MyLivestockProps> = ({ data }) => {
  const groupedLivestock = data.reduce((acc, item) => {
    if (!acc[item.type]) acc[item.type] = [];
    acc[item.type].push(item);
    return acc;
  }, {} as Record<string, LivestockData[]>);

  const images = {
    cattle: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80',
    sheep: 'https://images.unsplash.com/photo-1484557985045-edf25e08da73?auto=format&fit=crop&w=800&q=80',
    goat: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2BZFJJNM9TDiPINnoIhw4sYfUdFbBKkwsuA&s',
    pig: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80'
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">My Livestock Inventory</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(groupedLivestock).map(([type, animals]) => (
          <div key={type} className="group relative overflow-hidden rounded-lg border hover:shadow-lg transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
            <img
              src={images[type as keyof typeof images]}
              alt={type}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 z-20 p-4 flex flex-col justify-end text-white">
              <h3 className="text-lg font-medium capitalize mb-2">{type}</h3>
              <div className="space-y-1">
                <p className="text-sm">
                  Total: <span className="font-semibold">{animals.length}</span>
                </p>
                <p className="text-sm">
                  Average Age: <span className="font-semibold">
                    {(animals.reduce((sum, a) => sum + a.age, 0) / animals.length).toFixed(1)} years
                  </span>
                </p>
                <p className="text-sm">
                  Total Value: <span className="font-semibold">
                    ${animals.reduce((sum, a) => sum + a.price, 0).toLocaleString()}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyLivestock;