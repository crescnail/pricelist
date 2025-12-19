import React, { useState, useMemo } from 'react';
import { SECTION_1, SECTION_2, SECTION_3, BROKEN_NAIL } from '../constants';
import { ServiceCategory } from '../types';
import { Counter } from './Counter';
import { Check, RotateCcw, AlertCircle, ChevronDown, ChevronUp, Lock } from 'lucide-react';

export const CalculatorView: React.FC = () => {
  // State
  const [selectedMainServiceId, setSelectedMainServiceId] = useState<string | null>(null);
  const [isPureRemovalMode, setIsPureRemovalMode] = useState<boolean>(false);
  
  const [specialTechCount, setSpecialTechCount] = useState<number>(0);
  const [selectedRemovalId, setSelectedRemovalId] = useState<string | null>(null);
  const [removeGemCount, setRemoveGemCount] = useState<number>(0);
  const [brokenNailCount, setBrokenNailCount] = useState<number>(0);
  
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);

  // Computed Status
  const step1Completed = selectedMainServiceId !== null || isPureRemovalMode;
  
  const allMainServices = [...SECTION_1.items, ...SECTION_2.items];
  const selectedMainService = allMainServices.find(s => s.id === selectedMainServiceId);
  const isClassicSelected = selectedMainService?.category === ServiceCategory.CLASSIC;
  
  const selectedRemoval = SECTION_3.items.find(r => r.id === selectedRemovalId);
  
  // Prices
  const specialTechPrice = SECTION_2.addOns?.[0]?.price || 50;
  const removeGemPrice = SECTION_3.addOns?.[0]?.price || 40;

  // Filter Removal Options based on Mode
  const availableRemovalOptions = useMemo(() => {
    if (!step1Completed) return [];
    
    if (isPureRemovalMode) {
      // Pure Removal Mode: Show 'r3' (My Shop Pure Removal), 'r5' (Polish)
      // Hide 'r1', 'r2' (Renewal options)
      return SECTION_3.items.filter(item => ['r3', 'r5'].includes(item.id));
    } else {
      // Design Mode: Show 'r1', 'r2' (Renewal)
      // Hide 'r3' (Pure Removal) as it's mutually exclusive with Design in Step 1
      return SECTION_3.items.filter(item => ['r1', 'r2'].includes(item.id));
    }
  }, [step1Completed, isPureRemovalMode]);

  // Handle Selections
  const handleServiceSelect = (id: string) => {
    setSelectedMainServiceId(id);
    setIsPureRemovalMode(false);
    setSpecialTechCount(0);
    // Reset removal selection when switching modes to prevent invalid states
    setSelectedRemovalId(null); 
  };

  const handlePureRemovalSelect = () => {
    setSelectedMainServiceId(null);
    setIsPureRemovalMode(true);
    setSpecialTechCount(0);
    // Default to 'r3' (Standard Pure Removal) when entering Pure Removal mode
    setSelectedRemovalId('r3');
  };

  const handleRemovalSelect = (id: string | null) => {
    setSelectedRemovalId(id);
  };

  const handleReset = () => {
    setSelectedMainServiceId(null);
    setIsPureRemovalMode(false);
    setSpecialTechCount(0);
    setSelectedRemovalId(null);
    setRemoveGemCount(0);
    setBrokenNailCount(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculation
  const total = useMemo(() => {
    let sum = 0;
    if (selectedMainService) sum += selectedMainService.price;
    if (isClassicSelected) sum += specialTechCount * specialTechPrice;
    if (selectedRemoval) sum += selectedRemoval.price;
    sum += removeGemCount * removeGemPrice;
    sum += brokenNailCount * BROKEN_NAIL.price;
    return sum;
  }, [
    selectedMainService, 
    isClassicSelected, 
    specialTechCount, 
    selectedRemoval, 
    removeGemCount, 
    brokenNailCount
  ]);

  return (
    <div className="pb-40 animate-fade-in space-y-6">
      
      {/* STEP 1: Service Selection */}
      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
        <div className="bg-stone-50 px-6 py-4 border-b border-stone-100 flex justify-between items-center">
          <h3 className="font-bold text-stone-800 flex items-center gap-3 text-lg">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-stone-800 text-white font-brand italic">1</span>
            選擇服務項目
          </h3>
          {step1Completed && (
             <div className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full flex items-center gap-1">
                <Check size={12}/> 已選擇
             </div>
          )}
        </div>
        
        <div className="p-5 space-y-6">
          {/* Section 1: Creation */}
          <div>
            <div className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">{SECTION_1.title}</div>
            <div className="grid grid-cols-1 gap-3">
              {SECTION_1.items.map(item => (
                <ServiceCard 
                  key={item.id} 
                  item={item} 
                  isSelected={selectedMainServiceId === item.id} 
                  onClick={() => handleServiceSelect(item.id)}
                />
              ))}
            </div>
          </div>

          {/* Section 2: Classic */}
          <div>
            <div className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">{SECTION_2.title}</div>
            <div className="grid grid-cols-1 gap-3">
              {SECTION_2.items.map(item => (
                <ServiceCard 
                  key={item.id} 
                  item={item} 
                  isSelected={selectedMainServiceId === item.id} 
                  onClick={() => handleServiceSelect(item.id)}
                />
              ))}
            </div>
            {/* Special Tech for Classic */}
            {isClassicSelected && (
              <div className="mt-3 ml-1 pl-4 border-l-2 border-stone-200 animate-fade-in-down">
                <Counter 
                  label="特殊技法 (鏡面/極光/漸層/立體)"
                  pricePerUnit={specialTechPrice}
                  value={specialTechCount}
                  onChange={setSpecialTechCount}
                />
              </div>
            )}
          </div>

          {/* Pure Removal Option */}
          <div>
             <div className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">純卸甲</div>
             <button
                onClick={handlePureRemovalSelect}
                className={`w-full relative p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                  isPureRemovalMode
                    ? 'border-stone-800 bg-stone-800 text-white shadow-md transform scale-[1.01]' 
                    : 'border-stone-100 hover:border-stone-300 hover:bg-stone-50'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-lg">僅需卸甲 (不施作款式)</span>
                </div>
                 {isPureRemovalMode && (
                  <div className="absolute top-3 right-3 text-white">
                    <Check size={20} />
                  </div>
                )}
              </button>
          </div>
        </div>
      </div>

      {/* STEP 2: Removal & Extras */}
      <div className={`bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden transition-all duration-300 ${!step1Completed ? 'opacity-60 grayscale' : ''}`}>
        <div className="bg-stone-50 px-6 py-4 border-b border-stone-100 flex justify-between items-center">
          <h3 className="font-bold text-stone-800 flex items-center gap-3 text-lg">
            <span className={`flex items-center justify-center w-8 h-8 rounded-full font-brand italic transition-colors ${step1Completed ? 'bg-stone-800 text-white' : 'bg-stone-200 text-stone-400'}`}>2</span>
            卸甲與修補
          </h3>
          {!step1Completed && (
             <div className="flex items-center gap-1 text-xs text-stone-500 font-medium">
                <Lock size={12} /> 請先完成步驟 1
             </div>
          )}
        </div>

        <div className={`p-5 space-y-6 ${!step1Completed ? 'pointer-events-none select-none' : ''}`}>
           {/* Removal List */}
           <div>
              <div className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">卸甲選項</div>
              <div className="grid grid-cols-1 gap-2">
                {/* Option: None (Only available in Design mode) */}
                {!isPureRemovalMode && (
                  <button
                    onClick={() => handleRemovalSelect(null)}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      selectedRemovalId === null
                        ? 'border-stone-600 bg-stone-100 text-stone-800 font-medium' 
                        : 'border-stone-100 text-stone-400 hover:bg-stone-50'
                    }`}
                  >
                    無需卸甲
                  </button>
                )}
                
                {availableRemovalOptions.map(item => (
                  <button
                    key={item.id}
                    onClick={() => handleRemovalSelect(item.id)}
                    className={`flex justify-between items-center p-3 rounded-lg border text-left transition-all ${
                      selectedRemovalId === item.id 
                        ? 'border-stone-800 bg-stone-800 text-white shadow-md' 
                        : 'border-stone-100 text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    <span className="font-medium">{item.name}</span>
                    <span className={`font-brand italic font-bold ${selectedRemovalId === item.id ? 'text-white' : 'text-stone-800'}`}>
                      ${item.price}
                    </span>
                  </button>
                ))}
                
                {/* Helper text for Pure Removal Mode */}
                {isPureRemovalMode && (
                    <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
                        <AlertCircle size={12} />
                        純卸甲模式預設為本店純卸甲。如需卸除指甲油請手動切換。
                    </p>
                )}
              </div>
           </div>

           {/* Addons */}
           <div className="pt-4 border-t border-stone-100">
               <div className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">加購項目</div>
               <div className="space-y-1">
                 <Counter 
                    label="卸除鑽飾 / 立體造型"
                    pricePerUnit={removeGemPrice}
                    value={removeGemCount}
                    onChange={setRemoveGemCount}
                  />
                  <Counter 
                    label="補斷甲"
                    pricePerUnit={BROKEN_NAIL.price}
                    value={brokenNailCount}
                    onChange={setBrokenNailCount}
                  />
               </div>
           </div>
        </div>
      </div>

      {/* Collapsible Notice */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm">
        <button 
            onClick={() => setIsNoticeOpen(!isNoticeOpen)}
            className="w-full flex justify-between items-center p-4 bg-stone-50 hover:bg-stone-100 transition-colors text-stone-600"
        >
            <span className="font-bold text-sm flex items-center gap-2">
                <AlertCircle size={16} />
                預約與服務須知
            </span>
            {isNoticeOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        
        {isNoticeOpen && (
            <div className="p-5 text-sm text-stone-600 leading-relaxed bg-white animate-fade-in space-y-4">
                <div>
                    <h4 className="font-bold text-stone-800 mb-1">設計與溝通</h4>
                    <p>我們相信好的設計來自信任與共鳴。請務必參考我們的作品集，確認風格符合您的期待後再預約。</p>
                    <p>請於預約日前5日，提供以下資訊：</p>
                    <ul className="list-disc pl-4 space-y-1">
                        <li>提供最多3張靈感／風格照片，我們將以抽象、擷取元素意向的方式呈現，非具體手繪出完全一樣的圖式。</li>
                        <li>如有不喜歡的樣式/元素(如:不喜歡立體、不要亮片)，請於預約前一併回覆。</li>
                        <li>不提供仿製他人圖片的服務。</li>
                        <li>若您未能於指定時間內（預約日前5日）回傳上述設計溝通資訊，為確保現場服務流暢與設計品質，我們將以現場現有款式或工作室擅長風格為您提案。</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-stone-800 mb-1">卸甲政策</h4>
                    <ul className="list-disc pl-4 space-y-1">
                        <li>本店不提供他店純卸甲服務。</li>
                        <li>如有特殊需求請於預約時進行確認，若無確認則以現場既有款式/色號為主。</li>
                    </ul>
                </div>
            </div>
        )}
      </div>

      {/* Floating Result Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-stone-200 px-6 py-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50">
        <div className="max-w-md mx-auto flex justify-between items-end">
            <button 
                onClick={handleReset}
                className="flex flex-col items-center justify-center text-stone-400 hover:text-stone-800 transition-colors px-2 pb-1"
            >
                <RotateCcw size={20} />
                <span className="text-[10px] mt-1 font-medium">重置</span>
            </button>
            <div className="flex flex-col items-end">
                <div className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">預估費用</div>
                <div className="font-brand italic font-bold text-4xl text-stone-900 leading-none">
                    ${total.toLocaleString()}
                </div>
            </div>
        </div>
      </div>

    </div>
  );
};

// Sub-component for Service Cards
const ServiceCard: React.FC<{ item: any, isSelected: boolean, onClick: () => void }> = ({ item, isSelected, onClick }) => (
  <button
    onClick={onClick}
    className={`relative p-4 rounded-xl border-2 text-left transition-all duration-200 w-full group ${
      isSelected
        ? 'border-stone-800 bg-stone-800 text-white shadow-md transform scale-[1.01]' 
        : 'border-stone-100 hover:border-stone-300 hover:bg-stone-50'
    }`}
  >
    <div className="flex justify-between items-start">
      <div className="pr-8">
        <span className={`font-medium block text-lg ${isSelected ? 'text-white' : 'text-stone-800 group-hover:text-stone-900'}`}>
          {item.name}
        </span>
        {item.description && (
          <span className={`text-xs block mt-1 leading-normal ${isSelected ? 'text-stone-300' : 'text-stone-400'}`}>
            {item.description}
          </span>
        )}
      </div>
      <span className={`font-brand italic font-bold text-lg whitespace-nowrap ${isSelected ? 'text-white' : 'text-stone-800'}`}>
        ${item.price}
      </span>
    </div>
    {isSelected && (
      <div className="absolute top-3 right-3 text-white">
        <Check size={20} />
      </div>
    )}
  </button>
);
