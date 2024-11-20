'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaSearch, FaFilter, FaSortAmountDownAlt } from 'react-icons/fa';

const ProductsPage = () => {
    const [categories, setCategories] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch product categories
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:3006/api/product-category-fake');
            const data = await response.json();
            setCategories(data.product);
        };
        fetchData();
    }, []);

    // Filtered categories based on search term
    const filteredCategories = categories.filter((category) =>
        category.ProductCategoryName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 py-8">
                <h1 className="text-4xl text-white font-bold text-center">Product Categories</h1>
            </div>

            {/* Search and Filters */}
            <div className="container mx-auto px-4 mt-6">
                <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                    {/* Search Bar */}
                    <div className="w-full md:w-1/3 flex items-center bg-white rounded-full shadow-lg">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full py-2 px-4 rounded-l-full focus:outline-none text-gray-800"
                        />
                        <button className="bg-blue-500 text-white p-3 rounded-r-full">
                            <FaSearch />
                        </button>
                    </div>

                    {/* Filters and Sorting */}
                    <div className="flex items-center mt-4 md:mt-0 gap-4">
                        <button className="flex items-center text-black bg-white py-2 px-4 rounded-full shadow-lg hover:bg-gray-200">
                            <FaFilter className="mr-2" /> Filter
                        </button>
                        <button className="flex items-center text-black bg-white py-2 px-4 rounded-full shadow-lg hover:bg-gray-200">
                            <FaSortAmountDownAlt className="mr-2" /> Sort by Price
                        </button>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredCategories.map((category) => (
                        <div
                            key={category._id}
                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="relative h-48">
                                <Image
                                    src={category.Image}
                                    alt={category.ProductCategoryName}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    className="rounded-t-lg"
                                />
                            </div>
                            <div className="p-4">
                                <h2 className="text-xl font-semibold mb-2 text-gray-900">
                                    {category.ProductCategoryName}
                                </h2>
                                <p className="text-gray-800">{category.Description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;
