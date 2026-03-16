import React, { useState } from 'react';
import { useAppContext } from '../AppContext';
import { CourseCategory, Course } from '../types';
import { PlusCircle, CheckCircle2, Trash2, List, Settings } from 'lucide-react';

const AdminPage = () => {
  const { currentUser, courses, addCourse, deleteCourse } = useAppContext();
  const [activeTab, setActiveTab] = useState<'create' | 'manage'>('create');
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<CourseCategory>('external_physical');
  const [date, setDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [link, setLink] = useState('');
  const [description, setDescription] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (currentUser.role !== 'admin') {
    return (
      <div className="p-6 text-center text-slate-500 mt-20">
        您沒有權限存取此頁面。
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCourse: Course = {
      id: `C${Date.now()}`,
      title,
      category,
      date: date || undefined,
      endDate: endDate || undefined,
      time: time || undefined,
      location: location || undefined,
      link: link || undefined,
      description,
    };
    addCourse(newCourse);
    setSuccessMsg('課程上架成功！');
    setTimeout(() => setSuccessMsg(''), 3000);
    setTitle('');
    setDate('');
    setEndDate('');
    setTime('');
    setLocation('');
    setLink('');
    setDescription('');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">系統管理</h2>
          <p className="text-slate-500">管理教育訓練課程資訊。</p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('create')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'create' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <PlusCircle size={16} />
            課程上架
          </button>
          <button
            onClick={() => setActiveTab('manage')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'manage' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Settings size={16} />
            課程管理
          </button>
        </div>
      </div>

      {activeTab === 'create' && (
        <>
          {successMsg && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl flex items-center gap-3">
              <CheckCircle2 size={20} />
              <span className="font-medium">{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6 max-w-2xl">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">課程類別 *</label>
          <select
            value={category}
            onChange={e => setCategory(e.target.value as CourseCategory)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all bg-white"
          >
            <option value="external_physical">外部實體</option>
            <option value="external_online">外部線上</option>
            <option value="internal_digital">內部數位</option>
            <option value="internal_physical">內部實體</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">課程名稱 *</label>
          <input
            type="text"
            required
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
            placeholder="例如：2026 數位行銷趨勢"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">開始日期 *</label>
            <input
              type="date"
              required
              value={date}
              onChange={e => setDate(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">結束日期 (選填)</label>
            <input
              type="date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">課程時間</label>
            <input
              type="text"
              value={time}
              onChange={e => setTime(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
              placeholder="例如：14:00 - 16:00"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">課程地點</label>
          <input
            type="text"
            value={location}
            onChange={e => setLocation(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
            placeholder="例如：總部 3F 會議室"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            課程連結 (選填)
          </label>
          <input
            type="url"
            value={link}
            onChange={e => setLink(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
            placeholder="https://"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">課程說明 *</label>
          <textarea
            required
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all resize-none"
            placeholder="簡述課程內容與目標..."
          />
        </div>

        <div className="pt-4 border-t border-slate-100">
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <PlusCircle size={20} />
            確認上架
          </button>
        </div>
      </form>
        </>
      )}

      {activeTab === 'manage' && (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-sm">
                  <th className="p-4 font-medium">課程名稱</th>
                  <th className="p-4 font-medium">類別</th>
                  <th className="p-4 font-medium">日期</th>
                  <th className="p-4 font-medium text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {courses.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-slate-500">
                      目前沒有任何課程
                    </td>
                  </tr>
                ) : (
                  courses.map(course => (
                    <tr key={course.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-medium text-slate-800">{course.title}</td>
                      <td className="p-4 text-slate-600 text-sm">
                        {course.category === 'external_physical' && '外部實體'}
                        {course.category === 'external_online' && '外部線上'}
                        {course.category === 'internal_digital' && '內部數位'}
                        {course.category === 'internal_physical' && '內部實體'}
                      </td>
                      <td className="p-4 text-slate-600 text-sm">
                        {course.date ? `${course.date}${course.endDate ? ` ~ ${course.endDate}` : ''}` : '-'}
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => setCourseToDelete(course)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors inline-flex items-center gap-1"
                          title="下架課程"
                        >
                          <Trash2 size={18} />
                          <span className="text-sm font-medium">下架</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {courseToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="text-lg font-bold text-slate-900 mb-2">確認下架課程</h3>
            <p className="text-slate-600 mb-6">
              您確定要下架「{courseToDelete.title}」嗎？此動作無法復原。
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setCourseToDelete(null)}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors"
              >
                取消
              </button>
              <button
                onClick={() => {
                  deleteCourse(courseToDelete.id);
                  setCourseToDelete(null);
                }}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
              >
                確定下架
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
