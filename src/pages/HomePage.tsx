import React, { useState } from 'react';
import { useAppContext } from '../AppContext';
import CourseCard from '../components/CourseCard';
import { CourseCategory } from '../types';

const HomePage = () => {
  const { courses } = useAppContext();
  const [filter, setFilter] = useState<CourseCategory | 'all'>('all');

  const filteredCourses = filter === 'all' ? courses : courses.filter(c => c.category === filter);

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">課程總覽</h2>
        <p className="text-slate-500">瀏覽並報名各類教育訓練課程。</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            filter === 'all' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          全部課程
        </button>
        <button
          onClick={() => setFilter('external_physical')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            filter === 'external_physical' ? 'bg-orange-600 text-white' : 'bg-orange-50 text-orange-700 hover:bg-orange-100'
          }`}
        >
          外部實體
        </button>
        <button
          onClick={() => setFilter('external_online')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            filter === 'external_online' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
          }`}
        >
          外部線上
        </button>
        <button
          onClick={() => setFilter('internal_digital')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            filter === 'internal_digital' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
          }`}
        >
          內部數位
        </button>
        <button
          onClick={() => setFilter('internal_physical')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            filter === 'internal_physical' ? 'bg-purple-600 text-white' : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
          }`}
        >
          內部實體
        </button>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
