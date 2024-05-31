"use client"

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface Listing {
  _id?: string;
  title: string;
  description: string;
  bundle_products: Record<string, string>;
  company: string;
  company_logo: string;
  price: number;
  stripe_product_id?: string;
  bundle_product_price: number;
  features: string[];
  about: string;
  tags: string[];
  stack: string[];
  category: string;
  sub_category?: string;
}

const Admin = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [formData, setFormData] = useState<Listing>({
    title: '',
    description: '',
    bundle_products: {},
    company: '',
    company_logo: '',
    price: 0,
    stripe_product_id: '',
    bundle_product_price: 0,
    features: [],
    about: '',
    tags: [],
    stack: [],
    category: '',
    sub_category: ''
  });

  const fetchListings = async () => {
    const response = await axios.get('/api/listings');
    setListings(response.data.data);
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleArrayChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Listing) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      [field]: value.split(',')
    });
  };

  const handleObjectChange = (e: ChangeEvent<HTMLInputElement>, field: keyof Listing) => {
    const { name, value } = e.target;
    const currentFieldData = formData[field] as Record<string, any> || {};

    setFormData({
      ...formData,
      [field]: {
        ...currentFieldData,
        [name]: value
      }
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (formData._id) {
      await axios.put(`/api/listings/${formData._id}`, formData);
    } else {
      await axios.post('/api/listings', formData);
    }
    setFormData({
      title: '',
      description: '',
      bundle_products: {},
      company: '',
      company_logo: '',
      price: 0,
      stripe_product_id: '',
      bundle_product_price: 0,
      features: [],
      about: '',
      tags: [],
      stack: [],
      category: '',
      sub_category: ''
    });
    fetchListings();
  };

  const handleEdit = (listing: Listing) => {
    setFormData(listing);
  };

  const handleDelete = async (id: string) => {
    await axios.delete(`/api/listings/${id}`);
    fetchListings();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">MongoDB CRUD</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-4">
          <label className="block mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Bundle Products (key:value)</label>
          {Object.entries(formData.bundle_products).map(([key, value]) => (
            <div key={key} className="flex mb-2">
              <input
                type="text"
                name={key}
                value={value}
                onChange={(e) => handleObjectChange(e, 'bundle_products')}
                className="w-full p-2 border"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => setFormData({ ...formData, bundle_products: { ...formData.bundle_products, '': '' } })}
            className="bg-gray-500 text-white p-2"
          >
            Add Bundle Product
          </button>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Company</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full p-2 border"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Company Logo</label>
          <input
            type="text"
            name="company_logo"
            value={formData.company_logo}
            onChange={handleChange}
            className="w-full p-2 border"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Stripe Product ID</label>
          <input
            type="text"
            name="stripe_product_id"
            value={formData.stripe_product_id}
            onChange={handleChange}
            className="w-full p-2 border"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Bundle Product Price</label>
          <input
            type="number"
            name="bundle_product_price"
            value={formData.bundle_product_price}
            onChange={handleChange}
            className="w-full p-2 border"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Features (comma separated)</label>
          <input
            type="text"
            name="features"
            value={formData.features.join(',')}
            onChange={(e) => handleArrayChange(e, 'features')}
            className="w-full p-2 border"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">About</label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            className="w-full p-2 border"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Tags (comma separated)</label>
          <input
            type="text"
            name="tags"
            value={formData.tags.join(',')}
            onChange={(e) => handleArrayChange(e, 'tags')}
            className="w-full p-2 border"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Stack (comma separated)</label>
          <input
            type="text"
            name="stack"
            value={formData.stack.join(',')}
            onChange={(e) => handleArrayChange(e, 'stack')}
            className="w-full p-2 border"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Sub Category</label>
          <input
            type="text"
            name="sub_category"
            value={formData.sub_category}
            onChange={handleChange}
            className="w-full p-2 border"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2">
          {formData._id ? 'Update' : 'Create'}
        </button>
      </form>
      <h2 className="text-xl mb-4">Listings</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Title</th>
            <th className="py-2">Description</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {listings.map((listing) => (
            <tr key={listing._id}>
              <td className="border px-4 py-2">{listing.title}</td>
              <td className="border px-4 py-2">{listing.description}</td>
              <td className="border px-4 py-2">
                <button onClick={() => handleEdit(listing)} className="bg-yellow-500 text-white p-2 mr-2">
                  Edit
                </button>
                <button onClick={() => handleDelete(listing._id!)} className="bg-red-500 text-white p-2">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
