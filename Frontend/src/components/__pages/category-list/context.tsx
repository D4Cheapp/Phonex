'use client';

import { getCategories } from '@/modules/category/get-categories';
import { Category } from '@/modules/category/type';

import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';

type CategoryListContextType = {
  categories: Category[] | null;
  selectedCategory: Category | undefined;
  setName: Dispatch<SetStateAction<string | undefined>>;
  setCategories: Dispatch<SetStateAction<Category[]>>;
  setSelectedCategory: Dispatch<SetStateAction<Category | undefined>>;
  isEditCategoryModalOpen: boolean;
  setIsEditCategoryModalOpen: Dispatch<SetStateAction<boolean>>;
  isConfirmModalOpen: boolean;
  setIsConfirmModalOpen: Dispatch<SetStateAction<boolean>>;
  isAddCategoryModalOpen: boolean;
  setIsAddCategoryModalOpen: Dispatch<SetStateAction<boolean>>;
  fetchCategories: () => Promise<void>;
};

const CategoryListContext = createContext({} as CategoryListContextType);

type Props = {
  children: React.ReactNode;
  initialCategories: Category[] | null;
};

export const CategoryListProvider = ({ children, initialCategories }: Props) => {
  const [categories, setCategories] = useState<Category[]>(initialCategories || []);
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>();
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [name, setName] = useState<string | undefined>();

  const fetchCategories = async () => {
    const response = await getCategories(name);
    setCategories(response || []);
  };

  useEffect(() => {
    fetchCategories();
  }, [name]);

  return (
    <CategoryListContext.Provider
      value={{
        categories,
        selectedCategory,
        setName,
        setCategories,
        setSelectedCategory,
        isEditCategoryModalOpen,
        setIsEditCategoryModalOpen,
        isConfirmModalOpen,
        setIsConfirmModalOpen,
        isAddCategoryModalOpen,
        setIsAddCategoryModalOpen,
        fetchCategories,
      }}>
      {children}
    </CategoryListContext.Provider>
  );
};

export const useCategoryListContext = () => useContext(CategoryListContext);
