import React, { useState } from 'react';
import { useAppContext } from '../AppContext';
import { BookOpen, Users, CheckCircle, Clock } from 'lucide-react';

const RegistrationListPage = () => {
  const { courses, registrations } = useAppContext();
  const [selectedCourseId, setSelectedCourseId] = useState<string>(courses[0]?.id || '');

  const selectedCourse = courses.find(c => c.id === selectedCourseId);
  
  // Get registrations for the selected course
  const courseRegistrations = registrations.filter(r => r.courseId === selectedCourseId);

  return (
    <div className="p-6 flex flex-col h-full">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">報名清單查詢</h2>
        <p className="text-slate-500">依課程檢視所有已報名的學員名單。</p>
      </div>

      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm mb-6">
        <label className="block text-sm font-bold text-slate-700 mb-2">
          選擇課程
        </label>
        <div className="relative">
          <select
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
            className="w-full md:w-1/2 appearance-none border border-slate-300 rounded-lg pl-10 pr-4 py-2.5 text-slate-700 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-slate-50"
          >
            {courses.map(course => (
              <option key={course.id} value={course.id}>
                {course.title} ({course.date || '無日期'})
              </option>
            ))}
          </select>
          <BookOpen size={18} className="absolute left-3 top-3 text-slate-400" />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex-1 overflow-hidden flex flex-col">
        <div className="p-5 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <Users size={18} className="text-orange-500" />
            學員名單
          </h3>
          <div className="text-sm text-slate-500 font-medium">
            共 {courseRegistrations.length} 人報名
          </div>
        </div>

        <div className="p-0 overflow-auto flex-1">
          {courseRegistrations.length === 0 ? (
            <div className="text-center py-16">
              <Users size={48} className="mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500 text-lg">目前此課程尚無學員報名。</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-slate-200 text-sm text-slate-500">
                  <th className="py-3 px-5 font-medium">部門</th>
                  <th className="py-3 px-5 font-medium">工號</th>
                  <th className="py-3 px-5 font-medium">姓名</th>
                  <th className="py-3 px-5 font-medium">狀態</th>
                  <th className="py-3 px-5 font-medium">操作時間</th>
                </tr>
              </thead>
              <tbody>
                {courseRegistrations.map((record, index) => (
                  <tr key={record.id} className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                    <td className="py-3 px-5 text-slate-700">{record.department}</td>
                    <td className="py-3 px-5 text-slate-700 font-mono">{record.employeeId}</td>
                    <td className="py-3 px-5 font-medium text-slate-900">{record.name}</td>
                    <td className="py-3 px-5">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800">
                        <Clock size={12} /> 已報名
                      </span>
                    </td>
                    <td className="py-3 px-5 text-sm text-slate-500">
                      {new Date(record.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationListPage;
