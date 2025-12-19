import { SectionData, ServiceCategory, ServiceItem } from './types';

export const FREE_CREATION_STORY = {
  title: "重視風格，但不複製流行",
  content: [
    "「自由創作」不只是一次美甲服務，更是您與我們共同編織的一場指尖藝術旅程。",
    "在這裡，我們相信每一雙手都有獨特的故事與個性，不該被固定的樣式所框架。",
    "透過深入的對話與感受，我們將捕捉您的靈感火花——可能是您最近的心情、一段珍貴的回憶、一場夢想的旅行，或是對未來的美好期盼。從色彩的跳躍到線條的流動，從抽象的意念到具象的圖騰，我們將這些無形卻充滿力量的元素，細膩地轉化為指尖上獨一無二的風景。",
    "每一次的筆觸，都凝聚著我們的熱情與匠心；每一個圖案，都訴說著您專屬的印記。這不僅是美甲，更是您個人風格的延伸，是生活態度的展現，是一份專屬於您的藝術品。",
    "讓「自由創作」成為您指尖上最溫柔的提醒，提醒著您，生活中的美好與獨特，都值得被用心呈現。期待與您一同，繪製屬於您的指尖故事。"
  ]
};

export const SECTION_1: SectionData = {
  title: "自由創作",
  category: ServiceCategory.CREATION,
  intro: [
    "根據您提供的靈感，設計專屬款式。",
    "將準備至少2組專屬設計提案供您在預約日選擇，並可於當日討論微幅調整。"
  ],
  items: [
    { id: 'c1', name: '6指 創作設計', description: '6指設計，其餘單色/貓眼, price: 1780, category: ServiceCategory.CREATION, isBaseOption: true },
    { id: 'c2', name: '10指 創作設計', price: 2080, category: ServiceCategory.CREATION, isBaseOption: true },
  ],
  description: [
    "我們相信美好的創作源於信任與共鳴。",
    "在預約此服務前，請務必參考我們的作品集，確認風格符合您的期待後再預約。",
    "【預約確認與設計溝通】 ",
    "請於預約日前5日回傳以下資訊，以便為您設計："
  ],
  notice: [
    "不提供仿製他人圖片的服務。",
    "請提供您希望呈現的氛圍或感覺，最多3張靈感照片（不限美甲，服裝、飾品、風景皆可），我們將以抽象、擷取元素意向的方式呈現，非具體手繪出完全一樣的圖式",
    "如有不喜歡的樣式請於預約時一併告知。",
    "若您未能於指定時間內（預約日前5日）回傳上述設計溝通資訊，為確保現場服務流暢與設計品質，我們將以現場現有款式或工作室擅長風格為您提案。"
  ]
};

export const SECTION_2: SectionData = {
  title: "經典款式",
  category: ServiceCategory.CLASSIC,
  items: [
    { id: 'cl1', name: '貓眼', price: 1000, category: ServiceCategory.CLASSIC, isBaseOption: true },
    { id: 'cl2', name: '本月精選', description: '限定特惠，4指設計，其餘單色/貓眼', price: 1180, category: ServiceCategory.CLASSIC, isBaseOption: true },
    { id: 'cl3', name: '典藏精選', description: '6指設計，其餘單色/貓眼', price: 1480, category: ServiceCategory.CLASSIC, isBaseOption: true },
  ],
  notice: [
    "{本月精選}與{典藏精選}單色或貓眼僅選擇一色，不跳色。",
    "如有特殊需求請於預約時進行確認，若無確認則以現場既有款式/色號為主。"
  ],
  addOns: [
    { id: 'cl_add1', name: '特殊技法 (鏡面/極光/漸層/立體)', price: 50, category: ServiceCategory.CLASSIC, isAddOn: true },
     ]
};

export const SECTION_3: SectionData = {
  title: "卸甲服務",
  category: ServiceCategory.REMOVAL,
  items: [
    { id: 'r1', name: '本店卸甲續作', description: '續作為一層殘', price: 250, category: ServiceCategory.REMOVAL, isBaseOption: true },
    { id: 'r2', name: '他店卸甲續作', description: '為全卸除，非一層殘', price: 350, category: ServiceCategory.REMOVAL, isBaseOption: true },
    { id: 'r3', name: '本店純卸甲', price: 500, category: ServiceCategory.REMOVAL, isBaseOption: true },
    { id: 'r5', name: '卸除指甲油 / 硬甲油', price: 50, category: ServiceCategory.REMOVAL, isBaseOption: true },
  ],
  addOns: [
    { id: 'r_add1', name: '卸除鑽飾 / 立體造型', price: 50, category: ServiceCategory.REMOVAL, isAddOn: true }
  ],
  description: [
    "【注意】不提供他店純卸甲服務。"
  ]
};

export const BROKEN_NAIL: ServiceItem = {
  id: 'other1',
  name: '補斷甲',
  price: 50,
  category: ServiceCategory.OTHER,
  isAddOn: true
};
