'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { result } from 'lodash';

type DetailProduct = {
  _id: string;
  name: string;
  sku: string;
  image: string;
  price: number;
  description: string;
  category: string;
};

export default function DetailProduct({params} : any) {
    const getID = React.use(params);
    const _id = result(getID, '_id', '');
    const [detailProduct, setDetailProduct] = useState<DetailProduct[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const fetchProductByID = async () => {
      try {
        const response = await axios.get<DetailProduct[]>(
          `http://localhost:3000/product/get/${_id}`
        );
        setDetailProduct(response.data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };
    useEffect(() => {
      fetchProductByID();
    }, []);

    const router = useRouter();
    const [loadingDelete, setLoadingDelete] = useState(false);
    
    const deleteProductByID = async () => {
      try {
        setLoadingDelete(true);
        const response = await axios.delete<DetailProduct[]>(
          `http://localhost:3000/product/delete/${_id}`
        );
        setDetailProduct(response.data);
        alert('Delete product is successfully');
        router.push('/product');
      } catch (err) {
        console.error('Error delete products:', err);
        setError('Failed to delete products');
      } finally {
        setLoading(false);
      }
    };


    const name = result(detailProduct, 'name', '');
    const image = result(detailProduct, 'image', '');
    const description = result(detailProduct, 'description', '');
    const sku = result(detailProduct, 'sku', '');
    const price = result(detailProduct, 'price', 0);
    const category = result(detailProduct, 'category', '');

  return (
    <div className="bg-white">
      <div className="pt-6">
      { 
        image ? 
          (
            <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
              <img
                src={image}
                className="aspect-[4/5] size-full object-cover sm:rounded-lg lg:aspect-[3/4]"
              />
            </div>
          )
          :
          (
            null
          )
      } 
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Name : {name}</h1>
          </div>
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">Price : Rp. {price}</p>

            <form className="mt-10">
              <button
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Update Product
              </button>
            </form>
            <form onClick={deleteProductByID} className="mt-10">
              <button
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {loadingDelete ? 'Deleting...' : 'Delete Product'}     
              </button>
            </form>
          </div>
          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            <div>
              <h3 className="sr-only">Description</h3>
              <div className="space-y-6">
                <p className="text-base text-gray-900">Description : {description}</p>
                <p className="text-base text-gray-900">SKU : {sku}</p>
                <p className="text-base text-gray-900">Category : {category}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
