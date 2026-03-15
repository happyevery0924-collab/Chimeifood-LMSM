import React from 'react';
import { ExternalLink } from 'lucide-react';

const MyRecordsPage = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-slate-200 bg-white">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">訓練紀錄查詢</h2>
            <p className="text-slate-500">
              請點選/部門/姓名/訓練方式/年度/進行歷年訓練記錄查詢<br />
              資料起始日期：2024年1月1日
            </p>
          </div>
          <a
            href="https://lookerstudio.google.com/reporting/d7c12a51-2aa9-4b9b-b670-a51eba58eaa4"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-orange-600 hover:text-orange-700 bg-orange-50 px-4 py-2 rounded-lg transition-colors"
          >
            在新分頁開啟 <ExternalLink size={16} />
          </a>
        </div>
      </div>

      <div className="p-6 bg-slate-50 flex-1 flex flex-col">
        <div className="flex-1 w-full bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm min-h-[600px]">
          <iframe 
            width="100%" 
            height="100%" 
            src="https://lookerstudio.google.com/embed/reporting/d7c12a51-2aa9-4b9b-b670-a51eba58eaa4"
            frameBorder="0" 
            style={{ border: 0, minHeight: '600px' }} 
            allowFullScreen 
            sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default MyRecordsPage;
