<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

// =============================================================
// PRODUCT SERVICE
// Business logic untuk semua operasi produk digital.
// Phase 2 — dipersiapkan sekarang, aktif di Phase 2.
// Dipanggil oleh ProductController.
//
// Method public:
//   getAll()      → public listing produk published
//   getBySlug()   → public detail by slug
//   create()      → buat produk baru (admin)
//   update()      → update produk by id (admin)
//   delete()      → hapus produk by id (admin)
// =============================================================

class ProductService
{
    // -------------------------------------------------------------
    // PUBLIC: GET ALL produk yang sudah published
    // Dipanggil: ProductController@index
    // -------------------------------------------------------------
    public function getAll(int $page = 1, string $search = ''): LengthAwarePaginator
    {
        $query = Product::where('status', 'published');

        // Filter pencarian berdasarkan title
        if ($search !== '') {
            $query->where('title', 'like', "%{$search}%");
        }

        return $query->latest()->paginate(12, ['*'], 'page', $page);
    }

    // -------------------------------------------------------------
    // PUBLIC: GET DETAIL BY SLUG
    // Dipanggil: ProductController@show
    // Return null jika tidak ditemukan
    // -------------------------------------------------------------
    public function getBySlug(string $slug): ?Product
    {
        return Product::where('slug', $slug)
            ->where('status', 'published')
            ->first();
    }

    // -------------------------------------------------------------
    // ADMIN: CREATE produk baru
    // Dipanggil: ProductController@store
    // -------------------------------------------------------------
    public function create(array $data): Product
    {
        return Product::create($data);
    }

    // -------------------------------------------------------------
    // ADMIN: UPDATE produk by ID
    // Dipanggil: ProductController@update
    // Return null jika produk tidak ditemukan
    // -------------------------------------------------------------
    public function update(int $id, array $data): ?Product
    {
        $product = Product::find($id);

        if (! $product) {
            return null;
        }

        $product->update($data);

        return $product;
    }

    // -------------------------------------------------------------
    // ADMIN: DELETE produk by ID
    // Dipanggil: ProductController@destroy
    // Return false jika produk tidak ditemukan
    // -------------------------------------------------------------
    public function delete(int $id): bool
    {
        $product = Product::find($id);

        if (! $product) {
            return false;
        }

        return (bool) $product->delete();
    }
}