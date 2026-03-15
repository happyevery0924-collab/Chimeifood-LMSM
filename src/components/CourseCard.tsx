import React, { useState } from 'react';
import { Course } from '../types';
import { useAppContext } from '../AppContext';
import { ExternalLink, MapPin, Calendar, PlayCircle, X, Clock } from 'lucide-react';

interface Props {
  course: Course;
}

const CourseCard: React.FC<Props> = ({ course }) => {
  const { registerCourse, signInCourse } = useAppContext();
  const [showForm, setShowForm] = useState<'register' | 'signin' | null>(null);
  const [formData, setFormData] = useState({ department: '', employeeId: '', name: '' });
  const [signinId, setSigninId] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  const today = new Date().toISOString().split('T')[0];
  const isToday = course.date 
    ? (course.endDate ? (today >= course.date && today <= course.endDate) : course.date === today)
    : false;

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.department && formData.employeeId && formData.name) {
      registerCourse(course.id, formData);
      setSubmitted(true);
      setShowForm(null);
    }
  };

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (signinId) {
      signInCourse(course.id, signinId);
      setSignedIn(true);
      setShowForm(null);
    }
  };

  const renderButtons = () => {
    if (submitted) {
      return (
        <div className="w-full py-2.5 rounded-lg font-medium bg-slate-100 text-slate-500 text-center">
          已送出報名
        </div>
      );
    }

    switch (course.category) {
      case 'external_physical':
        return (
          <div className="flex gap-3">
            <button
              onClick={() => setShowForm('register')}
              className="flex-1 py-2.5 rounded-lg font-medium bg-orange-500 hover:bg-orange-600 text-white shadow-sm transition-colors"
            >
              報名課程
            </button>
            {course.link && (
              <a
                href={course.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 rounded-lg font-medium border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-2 transition-colors"
              >
                詳細網址 <ExternalLink size={16} />
              </a>
            )}
          </div>
        );
      case 'external_online':
        return (
          <a
            href={course.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 rounded-lg font-medium bg-blue-50 hover:bg-blue-100 text-blue-700 flex items-center justify-center gap-2 transition-colors"
          >
            前往學習 <ExternalLink size={16} />
          </a>
        );
      case 'internal_digital':
        return (
          <a
            href={course.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 rounded-lg font-medium bg-emerald-50 hover:bg-emerald-100 text-emerald-700 flex items-center justify-center gap-2 transition-colors"
          >
            開始學習 <PlayCircle size={16} />
          </a>
        );
      case 'internal_physical':
        return (
          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <button
                onClick={() => setShowForm('register')}
                className="flex-1 py-2.5 rounded-lg font-medium bg-orange-500 hover:bg-orange-600 text-white shadow-sm transition-colors"
              >
                報名課程
              </button>
              {isToday && (
                <button
                  onClick={() => setShowForm('signin')}
                  disabled={signedIn}
                  className={`flex-1 py-2.5 rounded-lg font-medium transition-colors ${
                    signedIn
                      ? 'bg-emerald-100 text-emerald-700 cursor-not-allowed'
                      : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm'
                  }`}
                >
                  {signedIn ? '已簽到' : '現場簽到'}
                </button>
              )}
            </div>
            {course.link && (
              <a
                href={course.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-lg font-medium border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-2 transition-colors"
              >
                詳細網址 <ExternalLink size={16} />
              </a>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  const getCategoryLabel = () => {
    switch (course.category) {
      case 'external_physical': return { text: '外部實體', color: 'bg-orange-100 text-orange-800' };
      case 'external_online': return { text: '外部線上', color: 'bg-blue-100 text-blue-800' };
      case 'internal_digital': return { text: '內部數位', color: 'bg-emerald-100 text-emerald-800' };
      case 'internal_physical': return { text: '內部實體', color: 'bg-purple-100 text-purple-800' };
    }
  };

  const label = getCategoryLabel();

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow flex flex-col h-full relative overflow-hidden">
      {showForm === 'register' && (
        <div className="absolute inset-0 bg-white z-10 p-5 flex flex-col h-full">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-bold text-slate-800">填寫報名資料</h4>
            <button onClick={() => setShowForm(null)} className="text-slate-400 hover:text-slate-600">
              <X size={20} />
            </button>
          </div>
          <form onSubmit={handleRegisterSubmit} className="flex-1 flex flex-col space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">部門</label>
              <input
                type="text"
                required
                value={formData.department}
                onChange={e => setFormData({ ...formData, department: e.target.value })}
                className="w-full border border-slate-300 rounded-md px-3 py-1.5 text-sm focus:ring-orange-500 focus:border-orange-500"
                placeholder="例如：行銷部"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">工號</label>
              <input
                type="text"
                required
                value={formData.employeeId}
                onChange={e => setFormData({ ...formData, employeeId: e.target.value })}
                className="w-full border border-slate-300 rounded-md px-3 py-1.5 text-sm focus:ring-orange-500 focus:border-orange-500"
                placeholder="例如：E001"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">姓名</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full border border-slate-300 rounded-md px-3 py-1.5 text-sm focus:ring-orange-500 focus:border-orange-500"
                placeholder="例如：王小明"
              />
            </div>
            <div className="mt-auto pt-4">
              <button
                type="submit"
                className="w-full py-2.5 rounded-lg font-medium bg-orange-500 hover:bg-orange-600 text-white shadow-sm transition-colors"
              >
                確認報名
              </button>
            </div>
          </form>
        </div>
      )}

      {showForm === 'signin' && (
        <div className="absolute inset-0 bg-white z-10 p-5 flex flex-col h-full">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-bold text-slate-800">現場簽到</h4>
            <button onClick={() => setShowForm(null)} className="text-slate-400 hover:text-slate-600">
              <X size={20} />
            </button>
          </div>
          <form onSubmit={handleSignInSubmit} className="flex-1 flex flex-col space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">請輸入工號</label>
              <input
                type="text"
                required
                value={signinId}
                onChange={e => setSigninId(e.target.value)}
                className="w-full border border-slate-300 rounded-md px-3 py-1.5 text-sm focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="例如：E001"
              />
            </div>
            <div className="mt-auto pt-4">
              <button
                type="submit"
                className="w-full py-2.5 rounded-lg font-medium bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm transition-colors"
              >
                確認簽到
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="flex items-start justify-between mb-4">
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${label.color}`}>
          {label.text}
        </span>
      </div>
      
      <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight">{course.title}</h3>
      <p className="text-sm text-slate-600 mb-4 flex-1">{course.description}</p>
      
      <div className="space-y-2 mb-6">
        {course.date && (
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Calendar size={16} />
            <span>{course.date}{course.endDate ? ` ~ ${course.endDate}` : ''}</span>
          </div>
        )}
        {course.time && (
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Clock size={16} />
            <span>{course.time}</span>
          </div>
        )}
        {(course.location || course.category === 'external_physical' || course.category === 'internal_physical') && (
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <MapPin size={16} />
            <span>{course.location || '實體課程'}</span>
          </div>
        )}
      </div>

      <div className="mt-auto pt-4 border-t border-slate-100">
        {renderButtons()}
      </div>
    </div>
  );
};

export default CourseCard;
