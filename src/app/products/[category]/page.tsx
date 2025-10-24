"use client";

import React, { useState, useEffect } from "react";
import { debounce, isEmpty } from "lodash";
import Image from "next/image";
import Link from "next/link";
import {
  XMarkIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { getProductList, getBrandList } from "@/api/stock";
import { fetchClassification } from "@/api/common";
import { arr2Obj, LargeCategoryConfig } from "@/enums/products";
import useStore from "@/store/useStore";
import { fetchTags } from "@/api/tags";

// 样式定义 - 移除滚动限制
const scrollContainerStyle = {
  // maxHeight: "calc(100vh - 300px)",
  // overflowY: "auto" as const,
};

// 新增枚举配置
const STATUS_OPTIONS = [
  { value: "1", label: "现货" },
  { value: "2", label: "在途" },
  { value: "3", label: "期货" },
  { value: "4", label: "特价" },
];

const FilterSection = ({
  title,
  items,
  selectedItems,
  onChange,
  isRadio = false,
  onClear,
}: {
  title: string;
  items: Array<any>;
  selectedItems: string[];
  onChange: (item: any) => void;
  isRadio?: boolean;
  onClear?: () => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="border-b border-brand-100 pb-6">
      <div className="flex items-center justify-between py-3">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center text-brand-600 hover:text-brand-700 transition-colors"
        >
          <span className="text-lg font-medium">{title}</span>
          <ChevronDownIcon
            className={`w-5 h-5 ml-2 transition-transform duration-300 ${
              isExpanded ? "transform rotate-180" : ""
            }`}
          />
        </button>
        {!isRadio && selectedItems.length > 0 && onClear && (
          <button
            onClick={onClear}
            className="text-sm text-brand-400 hover:text-brand-600 transition-colors"
          >
            清除所选
          </button>
        )}
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-3 pt-3 max-h-[312px] overflow-y-auto">
              {Array.isArray(items) &&
                items.map((item) => (
                  <label
                    key={item.category || item.value}
                    className="flex items-center group cursor-pointer py-1"
                  >
                    <div className="relative flex items-center p-1">
                      <input
                        type={isRadio ? "radio" : "checkbox"}
                        name={isRadio ? "mainCategory" : undefined}
                        checked={
                          isRadio
                            ? selectedItems[0] === (item.category || item.value)
                            : selectedItems.includes(
                                item.category || item.value
                              )
                        }
                        onChange={() => onChange(item)}
                        className={`
                        ${isRadio ? "form-radio" : "form-checkbox"}
                        w-5 h-5
                        border-2
                        border-brand-300
                        text-brand-600
                        focus:ring-brand-500
                        focus:ring-2
                        focus:ring-offset-2
                        ${isRadio ? "rounded-full" : "rounded-md"}
                        transition-all
                        duration-200
                        ease-in-out
                        checked:bg-brand-600
                        checked:border-brand-600
                        hover:border-brand-400
                      `}
                      />
                    </div>
                    <span
                      className={`ml-3 transition-colors ${
                        (
                          isRadio
                            ? selectedItems[0] === (item.category || item.value)
                            : selectedItems.includes(
                                item.category || item.value
                              )
                        )
                          ? "text-brand-600 font-medium"
                          : "text-brand-500 group-hover:text-brand-600"
                      }`}
                    >
                      {item.categoryLabel || item.label}
                    </span>
                    {!isRadio &&
                      selectedItems.includes(item.category || item.value) && (
                        <span className="ml-auto text-sm text-brand-400">
                          已选
                        </span>
                      )}
                  </label>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// 状态筛选组件（平铺显示）
const StatusFilter = ({
  selectedStatus,
  onChange,
}: {
  selectedStatus: string[];
  onChange: (status: { value: string; label: string }) => void;
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium text-brand-600 mb-4">状态</h3>
      <div className="flex flex-wrap gap-3">
        {STATUS_OPTIONS.map((status) => (
          <button
            key={status.value}
            onClick={() => onChange(status)}
            className={`px-4 py-2 rounded-full border transition-all duration-200 ${
              selectedStatus.includes(status.value)
                ? "bg-brand-600 text-white border-brand-600"
                : "bg-white text-brand-600 border-brand-300 hover:border-brand-600 hover:bg-brand-50"
            }`}
          >
            {status.label}
          </button>
        ))}
      </div>
    </div>
  );
};

const ProductListPage = ({ params }: { params: { category: string } }) => {
  const { categoryList } = useStore();
  const [categoryObj, setCategoryObj] = useState<any>({});
  const [categoryArr, setCategoryArr] = useState<any[]>([]);
  const [selectedMainCategory, setSelectedMainCategory] = useState(
    params.category
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<{[key: string]: string[]}>({});
  const [productList, setProductList] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [availableFilters, setAvailableFilters] = useState({
    categories: [] as string[],
    brands: [] as string[],
  });

  const [tags, setTags] = useState<any[]>([]);
  const getTags = async () => {
    const res = await fetchTags();

    const tags = res.reduce((acc: any, item: any) => {
      // 移除大类过滤，全量显示所有标签
      if (!acc[item.type]) {
        acc[item.type] = [];
      }
      const single = { label: item.name, value: item.name };
      acc[item.type].push(single);
      return acc;
    }, {});
    setTags(tags);
  };

  useEffect(() => {
    getTags();
  }, []); // 移除依赖，只在组件初始化时加载一次

  const [brands, setBrands] = useState<any[]>([]);
  const getBrands = async () => {
    const res = await getBrandList({
      pageNum: 1,
      pageSize: 999,
    });
    const arr = res.records.map((v: any) => ({
      label: v.brandName,
      value: v.brandName,
    }));
    console.log(arr);
    setBrands(arr);
  };

  const getCategorys = async () => {
    const res = await fetchClassification();
    setCategoryObj(arr2Obj("category", res));
    setCategoryArr(res);
  };

  useEffect(() => {
    getCategorys();
    getBrands();
  }, []);

  const getList = debounce(async function () {
    if (!categoryObj[selectedMainCategory]) return;
    // 将标签对象转换为扁平数组
    const allSelectedTags = Object.values(selectedTags).flat();
    getProductList({
      largeCategory: categoryObj[selectedMainCategory].categoryLabel,
      categories: selectedCategories,
      brand: selectedBrands,
      productStatus: selectedStatus,
      tags: allSelectedTags,
      pageNum: 1,
      pageSize: 99999,
    }).then((res) => {
      setProductList(res.records);
      setTotal(res.total);
    });
  }, 500);

  // 当大类改变时更新可用的筛选项
  useEffect(() => {
    const category = selectedMainCategory;
    if (categoryObj[category]) {
      const config = categoryObj[category] as {
        categories: string[];
        brands: string[];
      };
      setAvailableFilters({
        categories: config.categories,
        brands: config.brands,
      });
      // 清空已选的品类和品牌
      setSelectedCategories([]);
      setSelectedBrands([]);
      setSelectedStatus([]);
      setSelectedTags({});
    }
  }, [categoryObj, selectedMainCategory]);

  useEffect(() => {
    getList();
  }, [
    categoryObj,
    selectedMainCategory,
    selectedCategories,
    selectedBrands,
    selectedStatus,
    selectedTags,
  ]);

  // 计算总页数
  const totalPages = Math.ceil(productList.length / itemsPerPage);

  // 获取当前页的商品
  const getCurrentPageProducts = () => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return productList.slice(start, end);
  };

  // 处理品类多选
  const handleCategoryChange = (category: {
    category: string;
    categoryLabel: string;
  }) => {
    setSelectedCategories((prev) =>
      prev.includes(category.category)
        ? prev.filter((c) => c !== category.category)
        : [...prev, category.category]
    );
  };

  // 处理品牌多选
  const handleBrandChange = (brand: {
    label: string;
    value: string;
  }) => {
    setSelectedBrands((prev) =>
      prev.includes(brand.value)
        ? prev.filter((b) => b !== brand.value)
        : [...prev, brand.value]
    );
  };

  // 处理状态多选
  const handleStatusChange = (status: { value: string; label: string }) => {
    setSelectedStatus((prev) =>
      prev.includes(status.value)
        ? prev.filter((s) => s !== status.value)
        : [...prev, status.value]
    );
  };

  // 处理功能标签多选
  const handleTagChange = (tag: { value: string; label: string }, tagType: string) => {
    setSelectedTags((prev) => ({
      ...prev,
      [tagType]: prev[tagType]?.includes(tag.value)
        ? prev[tagType].filter((t) => t !== tag.value)
        : [...(prev[tagType] || []), tag.value]
    }));
  };

  // 处理大类切换
  const handleMainCategoryChange = (category: {
    category: string;
    categoryLabel: string;
  }) => {
    setSelectedMainCategory(category.category);
  };

  // 移除已选筛选条件
  const removeFilter = (
    type: "category" | "brand" | "status" | "tag",
    value: string
  ) => {
    if (type === "category") {
      setSelectedCategories((prev) => prev.filter((c) => c !== value));
    } else if (type === "brand") {
      setSelectedBrands((prev) => prev.filter((b) => b !== value));
    } else if (type === "status") {
      setSelectedStatus((prev) => prev.filter((s) => s !== value));
    }
    // 标签的移除逻辑现在在渲染部分直接处理
  };

  // 处理页码变化
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 生成页码数组
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <main className="min-h-screen bg-white pt-16">
      <div className="container mx-auto px-4 py-8">
        {/* 顶部状态筛选 */}
        <StatusFilter
          selectedStatus={selectedStatus}
          onChange={handleStatusChange}
        />

        <div className="flex gap-8">
          {/* 左侧筛选栏 */}
          <div className="w-72 flex-shrink-0">
            <div
              className="bg-white rounded-xl shadow-sm border border-brand-100 p-6"
              style={scrollContainerStyle}
            >
              {/* 大类筛选 */}
              <FilterSection
                title="大类"
                items={categoryArr}
                selectedItems={[selectedMainCategory]}
                onChange={(category) => {
                  return handleMainCategoryChange(category);
                }}
                isRadio={true}
              />

              {/* 品类筛选 */}
              {Array.isArray(categoryList) && (
                <FilterSection
                  title="品类"
                  items={categoryList.reduce((acc, category) => {
                    if (
                      category.largeCategoryLabel ===
                      LargeCategoryConfig[selectedMainCategory as keyof typeof LargeCategoryConfig]
                    ) {
                      acc.push({
                        category: category.name,
                        categoryLabel: category.name,
                      });
                    }
                    return acc;
                  }, [])}
                  selectedItems={selectedCategories}
                  onChange={(item) => handleCategoryChange(item)}
                  onClear={() => setSelectedCategories([])}
                />
              )}

              {/* 功能标签筛选 */}
              {Object.keys(tags).map((key) => {
                return (
                  <FilterSection
                    key={key}
                    title={key}
                    items={tags[key as keyof typeof tags]}
                    selectedItems={selectedTags[key] || []}
                    onChange={(item) => handleTagChange(item, key)}
                    onClear={() => setSelectedTags(prev => ({...prev, [key]: []}))}
                  />
                );
              })}

              {/* 品牌筛选 */}
              {Array.isArray(brands) && (
                <FilterSection
                  title="品牌"
                  items={brands}
                  selectedItems={selectedBrands}
                  onChange={(item) => handleBrandChange(item)}
                  onClear={() => setSelectedBrands([])}
                />
              )}
            </div>
          </div>

          {/* 右侧内容区 */}
          <div className="flex-1">
            {/* 已选筛选条件 */}
            <AnimatePresence>
              {(selectedCategories.length > 0 ||
                selectedBrands.length > 0 ||
                selectedStatus.length > 0 ||
                Object.values(selectedTags).some(tags => tags.length > 0)) && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-6 flex flex-wrap gap-2"
                >
                  {selectedStatus.map((status) => {
                    // 将数值转换为中文显示
                    const statusLabel = STATUS_OPTIONS.find(option => option.value === status)?.label || status;
                    return (
                      <motion.span
                        key={status}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-brand-50 text-brand-600 border border-brand-100"
                      >
                        状态: {statusLabel}
                        <button
                          onClick={() => removeFilter("status", status)}
                          className="ml-2 text-brand-400 hover:text-brand-600 transition-colors"
                        >
                          <XMarkIcon className="h-4 w-4" />
                        </button>
                      </motion.span>
                    );
                  })}
                  {selectedCategories.map((category) => (
                    <motion.span
                      key={category}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-brand-50 text-brand-600 border border-brand-100"
                    >
                      品类: {category}
                      <button
                        onClick={() => removeFilter("category", category)}
                        className="ml-2 text-brand-400 hover:text-brand-600 transition-colors"
                      >
                        <XMarkIcon className="h-4 w-4" />
                      </button>
                    </motion.span>
                  ))}
                  {Object.entries(selectedTags).map(([tagType, tags]) =>
                    tags.map((tag) => (
                      <motion.span
                        key={`${tagType}-${tag}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-brand-50 text-brand-600 border border-brand-100"
                      >
                        标签: {tag}
                        <button
                          onClick={() => {
                            setSelectedTags(prev => ({
                              ...prev,
                              [tagType]: prev[tagType]?.filter(t => t !== tag) || []
                            }));
                          }}
                          className="ml-2 text-brand-400 hover:text-brand-600 transition-colors"
                        >
                          <XMarkIcon className="h-4 w-4" />
                        </button>
                      </motion.span>
                    ))
                  )}
                  {selectedBrands.map((brand) => (
                    <motion.span
                      key={brand}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-brand-50 text-brand-600 border border-brand-100"
                    >
                      品牌: {brand}
                      <button
                        onClick={() => removeFilter("brand", brand)}
                        className="ml-2 text-brand-400 hover:text-brand-600 transition-colors"
                      >
                        <XMarkIcon className="h-4 w-4" />
                      </button>
                    </motion.span>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* 产品卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getCurrentPageProducts().map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${selectedMainCategory}/${product.id}`}
                  className="block"
                >
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="relative h-64">
                      <Image
                        src={
                          Array.isArray(product.productCoverImageList)
                            ? product.productCoverImageList[0]
                            : ""
                        }
                        alt={product.productName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-1">
                        {product.productName}
                      </h3>
                      <p className="text-sm text-brand-600">{product.brand}</p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>

            {/* 分页器 */}
            {total > 0 && (
              <div className="mt-12 flex justify-center items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-lg transition-colors ${
                    currentPage === 1
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-brand-600 hover:bg-brand-50"
                  }`}
                >
                  <ChevronLeftIcon className="w-5 h-5" />
                </button>

                {getPageNumbers().map((pageNumber, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      typeof pageNumber === "number" &&
                      handlePageChange(pageNumber)
                    }
                    disabled={pageNumber === "..."}
                    className={`min-w-[40px] h-10 px-4 rounded-lg transition-colors ${
                      pageNumber === currentPage
                        ? "bg-brand-600 text-white"
                        : pageNumber === "..."
                        ? "text-gray-500 cursor-default"
                        : "text-brand-600 hover:bg-brand-50"
                    }`}
                  >
                    {pageNumber}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-lg transition-colors ${
                    currentPage === totalPages
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-brand-600 hover:bg-brand-50"
                  }`}
                >
                  <ChevronRightIcon className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductListPage;
