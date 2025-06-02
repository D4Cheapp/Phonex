import { Product } from '@/modules/product/types';
import { Card, CardBody, CardFooter } from '@heroui/react';
import { getImageSrc } from 'utils/get-image-href';

import Link from 'next/link';

const truncateText = (text: string, maxLength = 30): string => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link className="min-h-80" href={`/product/${product.id}`}>
      <Card isPressable shadow="sm" className="h-full w-full pb-5">
        <CardBody className="flex items-center justify-center box-border min-h-72 max-h-72 pl-5 pr-5 max-md:max-h-96">
          <img
            className="w-full max-h-full object-cover rounded-md"
            src={getImageSrc(product.image)}
            alt={truncateText(product.name, 20)}
          />
        </CardBody>
        <CardFooter className="h-full flex justify-between items-center gap-3 pl-5 pr-5 max-md:h-min">
          <h2 className="w-full text-start text-xl break-all" title={product.name}>
            {truncateText(product.name)}
          </h2>
          <p className=" min-w-max text-md text-gray-500">{product.price} руб.</p>
        </CardFooter>
      </Card>
    </Link>
  );
};
