'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

  type Product = {
    _id: string;
    name: string;
    sku: string;
    image: string;
    price: number;
    description: string;
    category: string;
  };
  
  export default function Product() {
    const [allProduct, setAllProduct] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const fetchAllProduct = async () => {
      try {
        const response = await axios.get<Product[]>(
          // 'http://10.0.2.2:3000/product'
          'http://localhost:3000/product'
        );
        setAllProduct(response.data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };
    useEffect(() => {
      fetchAllProduct();
    }, []);

    return (
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
              Klik Add Product untuk menambahkan produk baru
          </p>
          <form className="mt-10">
              <a
                href="/add"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add Product
              </a>
             
            </form>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {allProduct.map((product) => (
              <div key={product._id} className="group relative">
                <img
                  src={product.image}
                  className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                />
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <Link href={`/product/${product._id}`} key={product._id}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </Link>
                    </h3>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm text-gray-700">
                    Rp. {product.price}
                  </h3>
                </div>
              </div>
            ))}
            
          </div>
          <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
              Klik salah satu produk untuk update produk, delete produk, dan melihat detail SKU, Description, Category
          </p>
        </div>
      </div>
    )
  }
  