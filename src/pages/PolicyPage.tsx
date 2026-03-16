import React from 'react';
import { BookOpen } from 'lucide-react';

const PolicyPage = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8 flex items-center gap-3">
        <div className="p-3 bg-orange-100 text-orange-600 rounded-xl">
          <BookOpen size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-1">教育訓練承諾暨政策</h2>
          <p className="text-slate-500">公司教育訓練之承諾與執行原則</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
        <div className="prose prose-slate max-w-none">
          <p className="text-lg leading-relaxed text-slate-700 mb-8 indent-8">
            本公司承諾『提供公司全體員工完整及專業之教育訓練，以提升全體員工工作職能而成為公司所需之專業之人才，除能勝任工作並有優異之表現以滿足其成就感及職涯發展所需，並能促進公司創新與改善以達成永續經營之目標』。並將依以下原則，貫徹教育訓練活動之進行，以及定期評估執行成效及持續改善。
          </p>

          <div className="mb-8">
            <ol className="list-none space-y-3 text-slate-700">
              <li className="flex gap-2">
                <span className="font-medium">一、</span>
                <span>配合公司及組織需求規劃教育訓練課程並確保訓練績效。</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium">二、</span>
                <span>提升食品安全衛生意識、建立食品安全衛生文化。</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium">三、</span>
                <span>強化自我能力提升、落實基礎職能教育。</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium">四、</span>
                <span>鼓勵員工終身學習，提升個人的競爭優勢。</span>
              </li>
            </ol>
          </div>

          <div className="mb-12">
            <p className="font-bold text-slate-800 mb-4">並作以下承諾：</p>
            <ol className="list-none space-y-3 text-slate-700">
              <li className="flex gap-2">
                <span className="font-medium">一、</span>
                <span>充分揭露年度訓練計畫與課程相關資訊，並依需求落實執行。</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium">二、</span>
                <span>外部訓練課程經核准公司將提供學費與差旅費。</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium">三、</span>
                <span>外部訓練課程若為休息日則另給補休一天。</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium">四、</span>
                <span>內部訓練課程經主管同意參訓視同上班。</span>
              </li>
            </ol>
          </div>

          <div className="text-right mt-12 pt-8 border-t border-slate-100">
            <p className="text-xl font-bold text-slate-800">總經理 宋宗龍 <span className="text-base font-normal text-slate-500 ml-2">簽署發行</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyPage;
