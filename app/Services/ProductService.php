<?php

namespace App\Services;

use App\Models\Product;

class ProductService
{
    public function getAll()
    {
        return Product::latest()->get();
    }

    public function getPublished()
    {
        return Product::where('status', 'published')
            ->latest()
            ->get();
    }

    public function findBySlug(string $slug)
    {
        return Product::where('slug', $slug)
            ->firstOrFail();
    }

    public function create(array $data)
    {
        return Product::create($data);
    }

    public function update(Product $product, array $data)
    {
        $product->update($data);

        return $product;
    }

    public function delete(Product $product)
    {
        return $product->delete();
    }
}