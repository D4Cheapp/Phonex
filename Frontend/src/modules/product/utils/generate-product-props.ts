import { Product } from '../types';

export const generateProductProps = (product: Product) => {
  const formData = new FormData();

  formData.append('name', product.name);
  formData.append('description', product.description);
  formData.append('price', product.price.toString());
  formData.append('product_category_id', product.product_category_id?.toString() || '');

  if (product.image instanceof FileList) {
    formData.append('image', product.image[0]);
  }

  if (product.characteristics.length > 0) {
    product.characteristics.forEach((characteristic, index) => {
      if (characteristic.id) {
        formData.append(`characteristics[${index}][id]`, characteristic.id.toString());
      }
      formData.append(`characteristics[${index}][name]`, characteristic.name);
      formData.append(`characteristics[${index}][value]`, characteristic.value);
    });
  }

  return formData;
};
