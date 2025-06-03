'use client';

import { deleteCategory } from '@/modules/category/delete-category';
import { Category } from '@/modules/category/type';

import { CategoryModal } from '@/components/Modals/CategoryModal';
import { ConfirmModal } from '@/components/Modals/ConfirmModal';

import { AddCategoryButton } from './AddCategoryButton';
import { CategoriesFilter } from './CategoriesFilter';
import { CategoryList } from './CategoryList';
import { CategoryListProvider, useCategoryListContext } from './context';

type Props = {
  initialCategories: Category[] | null;
};

const CategoryListPageContent = () => {
  const {
    isAddCategoryModalOpen,
    setIsAddCategoryModalOpen,
    isEditCategoryModalOpen,
    setIsEditCategoryModalOpen,
    isConfirmModalOpen,
    setIsConfirmModalOpen,
    selectedCategory,
    fetchCategories,
  } = useCategoryListContext();

  const handleDeleteConfirm = async () => {
    if (!selectedCategory) return;

    await deleteCategory(selectedCategory.id);
    setIsConfirmModalOpen(false);
    fetchCategories();
  };

  return (
    <>
      <div className="flex justify-between items-start gap-5 mb-10 mt-10">
        <h1 className="text-3xl font-bold">Список категорий</h1>
        <AddCategoryButton />
      </div>
      <CategoriesFilter />
      <CategoryList />
      <CategoryModal
        isOpen={isAddCategoryModalOpen}
        onClose={() => setIsAddCategoryModalOpen(false)}
        onSuccess={fetchCategories}
      />

      <CategoryModal
        category={selectedCategory}
        isOpen={isEditCategoryModalOpen}
        onClose={() => setIsEditCategoryModalOpen(false)}
        onSuccess={fetchCategories}
      />
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Удаление категории"
        description={`Вы уверены, что хотите удалить категорию "${selectedCategory?.name}"?`}
      />
    </>
  );
};

export const CategoryListPage = ({ initialCategories }: Props) => {
  return (
    <CategoryListProvider initialCategories={initialCategories}>
      <CategoryListPageContent />
    </CategoryListProvider>
  );
};
