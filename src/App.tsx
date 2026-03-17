import React from 'react';
import { AppProvider, useAppContext, Tab } from './AppContext';
import { MOCK_USERS } from './data';
import { BookOpen, User as UserIcon, Settings, LogOut, Users } from 'lucide-react';
import HomePage from './pages/HomePage';
import MyRecordsPage from './pages/MyRecordsPage';
import AdminPage from './pages/AdminPage';
import RegistrationListPage from './pages/RegistrationListPage';
import PolicyPage from './pages/PolicyPage';

const AppContent = () => {
  const { currentUser, setCurrentUser, activeTab, setActiveTab } = useAppContext();

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const user = MOCK_USERS.find(u => u.id === e.target.value);
    if (user) {
      setCurrentUser(user);
      setActiveTab('home');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-orange-500 text-white p-2 rounded-lg">
              <BookOpen size={24} />
            </div>
            <h1 className="text-xl font-bold text-slate-800">奇美食品教育訓練平台</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-sm text-slate-500">
              切換視角 (Demo):
            </div>
            <select 
              value={currentUser.id}
              onChange={handleRoleChange}
              className="border border-slate-300 rounded-md px-3 py-1.5 text-sm bg-slate-50 focus:ring-orange-500 focus:border-orange-500"
            >
              {MOCK_USERS.map(u => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </select>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 shrink-0">
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('policy')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === 'policy' ? 'bg-orange-50 text-orange-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <BookOpen size={20} />
              訓練政策
            </button>
            <button
              onClick={() => setActiveTab('home')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === 'home' ? 'bg-orange-50 text-orange-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <BookOpen size={20} />
              課程總覽
            </button>
            <button
              onClick={() => setActiveTab('records')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === 'records' ? 'bg-orange-50 text-orange-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <UserIcon size={20} />
              訓練紀錄查詢
            </button>
            <button
              onClick={() => setActiveTab('registration_list')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === 'registration_list' ? 'bg-orange-50 text-orange-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Users size={20} />
              報名清單查詢
            </button>

            {currentUser.role === 'admin' && (
              <button
                onClick={() => setActiveTab('admin')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  activeTab === 'admin' ? 'bg-orange-50 text-orange-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Settings size={20} />
                課程上架
              </button>
            )}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden min-h-[600px]">
          {activeTab === 'policy' && <PolicyPage />}
          {activeTab === 'home' && <HomePage />}
          {activeTab === 'records' && <MyRecordsPage />}
          {activeTab === 'admin' && <AdminPage />}
          {activeTab === 'registration_list' && <RegistrationListPage />}
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
