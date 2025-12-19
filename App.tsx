import React, { useState } from 'react';
import { PriceListView } from './components/PriceListView';
import { CalculatorView } from './components/CalculatorView';
import { Calculator, FileText } from 'lucide-react';

enum Tab {
  PRICE_LIST = 'PRICE_LIST',
  CALCULATOR = 'CALCULATOR'
}

function App() {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.PRICE_LIST);

  return (
    <div className="min-h-screen bg-stone-50 flex justify-center">
      <div className="w-full max-w-md bg-[#faf9f6] min-h-screen flex flex-col relative shadow-2xl">
        
        {/* Header */}
        <header className="pt-8 pb-4 px-6 sticky top-0 z-40 bg-[#faf9f6]/95 backdrop-blur-sm border-b border-stone-100">
          <h1 className="text-3xl text-stone-800 font-brand italic text-center font-semibold tracking-wide">
            cresc.nail
          </h1>
          <p className="text-center text-xs text-stone-400 mt-1 tracking-widest uppercase">Nail Artistry & Design</p>
        </header>

        {/* Tab Switcher (Sticky below header) */}
        <p className="text-center text-xs text-stone-400 m-2 tracking-widest">此版本項目價格將於 2026.02.01 起啟用。</p>
        <div className="px-4 py-2 sticky top-[85px] z-30 bg-[#faf9f6]">
          <div className="bg-stone-200 p-1 rounded-full flex relative">
            {/* Animated Background Slider could be added here for extra polish, utilizing Framer Motion, but standard CSS is safer for this constraints */}
            <button
              onClick={() => setActiveTab(Tab.PRICE_LIST)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === Tab.PRICE_LIST 
                  ? 'bg-white text-stone-900 shadow-md' 
                  : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              <FileText size={16} />
              價目表
            </button>
            <button
              onClick={() => setActiveTab(Tab.CALCULATOR)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === Tab.CALCULATOR 
                  ? 'bg-white text-stone-900 shadow-md' 
                  : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              <Calculator size={16} />
              試算
            </button>
          </div>
        </div>

        {/* Content Area */}
        <main className="flex-1 px-4 pt-4">
            {activeTab === Tab.PRICE_LIST ? <PriceListView /> : <CalculatorView />}
        </main>

      </div>
    </div>
  );
}

export default App;
