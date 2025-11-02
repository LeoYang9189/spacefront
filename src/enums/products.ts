// 将数组转换为对象
export const arr2Obj = <T extends { [key: string]: any }>(
  key: keyof T,
  arr: T[]
) => {
  return arr.reduce((acc, item) => {
    acc[item[key] as string] = item;
    return acc;
  }, {} as Record<string, T>);
};

// 产品分类配置
export const CategoryConfig = [
  {
    category: "lighting",
    categoryLabel: "灯具",
    categories: ["吊灯", "台灯", "落地灯", "壁灯"],
    brands: ["Tom Dixon", "Flos", "Louis Poulsen", "Artemide"],
  },
  {
    category: "decor",
    categoryLabel: "配饰",
    categories: ["装饰摆件", "挂画", "地毯", "抱枕"],
    brands: ["&Tradition", "Menu", "Vitra", "Hay"],
  },
  {
    category: "furniture",
    categoryLabel: "家具",
    categories: ["沙发", "茶几", "餐桌", "床具"],
    brands: ["Minotti", "B&B Italia", "Poliform", "Flexform"],
  },
];
export const LargeCategoryConfig = {
  lighting: "灯具",
  decor: "配饰",
  furniture: "家具",
};

// 将数据结构转换为CategoryConfig格式
export const transformToCategoryConfig = (data: {
  category: { [key: string]: string[] };
  brand: { [key: string]: string[] };
  largeCategory: string[];
}) => {
  return data.largeCategory.map((categoryLabel) => {
    const category = Object.keys(LargeCategoryConfig).find(
      (key) =>
        LargeCategoryConfig[key as keyof typeof LargeCategoryConfig] ===
        categoryLabel
    );
    return {
      category,
      categoryLabel,
      categories: data.category[categoryLabel],
      brands: data.brand[categoryLabel],
    };
  });
};
