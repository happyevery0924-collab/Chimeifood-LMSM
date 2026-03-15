import React, { useState } from 'react';
import { useAppContext } from '../AppContext';
import { CourseCategory, Course } from '../types';
import { PlusCircle, CheckCircle2 } from 'lucide-react';

const AdminPage = () => {
  const { currentUser, addCourse } = useAppContext();
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
      date: category.includes('physical') ? date : undefined,
      endDate: category.includes('physical') && endDate ? endDate : undefined,
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
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">課程上架</h2>
        <p className="text-slate-500">新增教育訓練課程資訊至平台。</p>
      </div>

      {successMsg && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl flex items-center gap-3">
          <CheckCircle2 size={20} />
          <span className="font-medium">{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
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

        {(category === 'external_physical' || category === 'internal_physical') && (
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
        )}

        {(category === 'external_physical' || category === 'internal_physical') && (
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
        )}

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            {category.includes('online') || category.includes('digital') ? '課程連結 *' : '詳細網址 (選填)'}
          </label>
          <input
            type="url"
            required={category.includes('online') || category.includes('digital')}
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
    </div>
  );
};

export default AdminPage;
