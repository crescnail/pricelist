import React, { useState } from 'react';
import { SECTION_1, SECTION_2, SECTION_3, BROKEN_NAIL, FREE_CREATION_STORY } from '../constants';
import { SectionData, ServiceCategory } from '../types';
import { AlertCircle, Info, X, ChevronDown, ChevronUp, BookOpenText } from 'lucide-react';

interface SectionRendererProps {
  data: SectionData;
  onShowInfo?: () => void;
}

// Helper component to render the text content consistently
const SectionContent: React.FC<{ data: SectionData }> = ({ data }) => (
  <>
    {data.description && (
       <div className="space-y-2">
          {data.description.map((desc, i) => (
            <p key={`desc-${i}`} className="leading-relaxed text-justify">{desc}</p>
          ))}
       </div>
    )}
    {data.notice && (
      <div className={`space-y-2 ${data.description ? 'mt-3' : ''}`}>
        {data.notice.map((note, i) => (
          <div key={`note-${i}`} className="flex gap-2">
            <span className="text-stone-400 shrink-0">✦</span>
            <p className="leading-relaxed text-justify">{note.replace('✦', '').trim()}</p>
          </div>
        ))}
      </div>
    )}
  </>
);

const SectionRenderer: React.FC<SectionRendererProps> = ({ data, onShowInfo }) => {
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);
  
  // Only the 'CREATION' category (Free Creation) uses the collapsible layout
  const isCollapsible = data.category === ServiceCategory.CREATION;

  return (
    <div className="mb-8 bg-white p-6 rounded-xl shadow-sm border border-stone-100">
      <h2 className="text-xl font-bold text-stone-800 mb-4 border-l-4 border-stone-400 pl-3 flex items-center gap-2">
        {data.title}
        {data.category === ServiceCategory.CREATION && onShowInfo && (
          <button 
            onClick={onShowInfo}
            className="text-stone-400 hover:text-stone-600 transition-colors p-1 rounded-full hover:bg-stone-100"
            aria-label="查看詳細說明"
          >
            <Info size={18} />
          </button>
        )}
      </h2>
      
      {/* Intro Text placed below title */}
      {data.intro && (
        <div className="mb-5 text-sm text-stone-600 space-y-1 bg-stone-50/50 p-3 rounded-lg border border-stone-50">
          {data.intro.map((text, i) => (
            <p key={`intro-${i}`} className="leading-relaxed">{text}</p>
          ))}
        </div>
      )}

      <div className="space-y-3 mb-6">
        {data.items.map((item) => (
          <div key={item.id} className="flex flex-col border-b border-stone-100 pb-2 last:border-0">
            <div className="flex justify-between items-baseline">
              <span className="font-medium text-stone-700 text-lg">{item.name}</span>
              <span className="font-bold text-stone-900 font-brand italic text-xl">${item.price}</span>
            </div>
            {item.description && (
              <span className="text-sm text-stone-400 mt-1 italic">{item.description}</span>
            )}
          </div>
        ))}
        {data.addOns?.map((addon) => (
           <div key={addon.id} className="flex justify-between items-center py-2 text-stone-600 bg-stone-50 px-3 rounded-lg mt-2">
            <span className="font-medium">{addon.name}</span>
            <span className="font-bold font-brand italic">+${addon.price} / 指</span>
           </div>
        ))}
      </div>

      {/* Description & Notice Section */}
      {(data.description || data.notice) && (
        isCollapsible ? (
          // Collapsible Version (Only for Free Creation)
          <div className="mt-4">
            <button
              onClick={() => setIsPolicyOpen(!isPolicyOpen)}
              className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 group ${
                isPolicyOpen ? 'bg-stone-100 text-stone-800' : 'bg-stone-50 text-stone-500 hover:bg-stone-100'
              }`}
            >
              <span className="text-sm font-bold flex items-center gap-2">
                <BookOpenText size={16} className={isPolicyOpen ? 'text-stone-600' : 'text-stone-400 group-hover:text-stone-600'} />
                設計溝通
              </span>
              {isPolicyOpen ? (
                <ChevronUp size={16} className="text-stone-500" />
              ) : (
                <ChevronDown size={16} className="text-stone-400 group-hover:text-stone-500" />
              )}
            </button>

            {isPolicyOpen && (
              <div className="mt-2 p-2 pl-4 text-xs text-stone-600 animate-fade-in border-l-2 border-stone-100 ml-2">
                 <SectionContent data={data} />
              </div>
            )}
          </div>
        ) : (
          // Static Version (For Classic & Removal)
          <div className="mt-4 bg-stone-50 p-4 rounded-lg text-xs text-stone-600">
             <SectionContent data={data} />
          </div>
        )
      )}
    </div>
  );
};

export const PriceListView: React.FC = () => {
  const [showStoryModal, setShowStoryModal] = useState(false);

  return (
    <div className="pb-24 animate-fade-in relative">
      <SectionRenderer 
        data={SECTION_1} 
        onShowInfo={() => setShowStoryModal(true)} 
      />
      <SectionRenderer data={SECTION_2} />
      <SectionRenderer data={SECTION_3} />
      
      {/* Broken Nail Extra */}
      <div className="mb-8 bg-white p-6 rounded-xl shadow-sm border border-stone-100 flex justify-between items-center">
        <span className="font-medium text-stone-800 text-lg">{BROKEN_NAIL.name}</span>
        <span className="font-bold text-stone-900 font-brand italic text-xl">+${BROKEN_NAIL.price} / 指</span>
      </div>

      {/* Disclaimer Section */}
      <div className="mt-8 p-5 bg-stone-100 rounded-xl border border-stone-200 text-stone-500">
        <h3 className="font-bold text-stone-600 text-sm mb-3 flex items-center gap-2">
            <AlertCircle size={14} /> 免責聲明與注意事項
        </h3>
        <ul className="text-xs space-y-2 leading-relaxed list-disc pl-4 marker:text-stone-400">
            <li>當月精選設計(限定特惠)款恕不適用任何優惠券或折抵方案。</li>
            <li>為確保服務品質與公平性，每筆交易僅限使用一項優惠，優惠活動無法同時折抵，感謝您的配合與理解。</li>
            <li>2025.12 更新cresc.nail 試營運期間價目表，正式營運後價格將視服務內容進行調整。</li>
            <li>所有設計款與服務價格皆為目前參考資訊，實際內容與價格可能依營運調整，恕不另行通知。本工作室保有隨時修改、暫停或終止活動與設計款的最終權利，並以公告內容為準。</li>
        </ul>
      </div>

      {/* Story Modal */}
      {showStoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setShowStoryModal(false)}
          />
          <div className="relative bg-[#faf9f6] rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-fade-in-up border border-stone-100 max-h-[85vh] flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-stone-200 flex justify-between items-center bg-white">
              <span className="text-xs font-bold text-stone-400 tracking-widest uppercase">STORY</span>
              <button 
                onClick={() => setShowStoryModal(false)}
                className="text-stone-400 hover:text-stone-800 transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto overscroll-contain no-scrollbar">
              <h3 className="text-xl font-brand italic font-bold text-stone-800 mb-6 text-center leading-snug">
                {FREE_CREATION_STORY.title}
              </h3>
              <div className="space-y-4 text-stone-600 text-sm leading-7 text-justify font-light">
                {FREE_CREATION_STORY.content.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-8 flex justify-center">
                 <div className="w-8 h-1 bg-stone-200 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
