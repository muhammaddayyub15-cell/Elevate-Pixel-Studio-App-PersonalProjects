<?php

namespace App\Services;

use App\Models\Blog;
use App\Models\BlogCategory;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

// =============================================================
// BLOG SERVICE
// Business logic untuk semua operasi blog.
// Dipanggil oleh BlogController.
//
// Method public:
//   getAll()          → public listing dengan filter & pagination
//   getBySlug()       → public detail by slug
//   getCategories()   → daftar semua kategori blog
//   getAllAdmin()     → admin listing dengan filter & pagination
//   create()          → buat blog baru
//   update()          → update blog by id
//   delete()          → hapus blog by id
// =============================================================

class BlogService
{
    // -------------------------------------------------------------
    // PUBLIC: GET ALL dengan filter page, category, search
    // Dipanggil: BlogController@index
    // Hanya tampilkan yang sudah published
    // -------------------------------------------------------------
    public function getAll(int $page = 1, string $category = '', string $search = ''): LengthAwarePaginator
    {
        $query = Blog::with('category')
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now());

        // Filter berdasarkan slug kategori
        if ($category !== '') {
            $query->whereHas('category', function ($q) use ($category) {
                $q->where('slug', $category);
            });
        }

        // Filter pencarian berdasarkan title atau excerpt
        if ($search !== '') {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('excerpt', 'like', "%{$search}%");
            });
        }

        return $query->latest('published_at')->paginate(9, ['*'], 'page', $page);
    }

    // -------------------------------------------------------------
    // PUBLIC: GET DETAIL BY SLUG
    // Dipanggil: BlogController@show
    // Return null jika tidak ditemukan
    // -------------------------------------------------------------
    public function getBySlug(string $slug): ?Blog
    {
        return Blog::with('category', 'user')
            ->where('slug', $slug)
            ->first();
    }

    // -------------------------------------------------------------
    // PUBLIC: GET SEMUA KATEGORI BLOG
    // Dipanggil: BlogController@categories
    // -------------------------------------------------------------
    public function getCategories(): Collection
    {
        return BlogCategory::orderBy('name')->get();
    }

    // -------------------------------------------------------------
    // ADMIN: GET ALL untuk halaman admin (termasuk draft)
    // Dipanggil: BlogController@adminIndex
    // -------------------------------------------------------------
    public function getAllAdmin(int $page = 1, string $search = ''): LengthAwarePaginator
    {
        $query = Blog::with('category')->latest();

        // Filter pencarian berdasarkan title
        if ($search !== '') {
            $query->where('title', 'like', "%{$search}%");
        }

        return $query->paginate(15, ['*'], 'page', $page);
    }

    // -------------------------------------------------------------
    // ADMIN: CREATE blog baru
    // Dipanggil: BlogController@store
    // $userId diambil dari authenticated user
    // -------------------------------------------------------------
    public function create(array $data, int $userId): Blog
    {
        return Blog::create([
            ...$data,
            'user_id' => $userId,
        ]);
    }

    // -------------------------------------------------------------
    // ADMIN: UPDATE blog by ID
    // Dipanggil: BlogController@update
    // Return null jika blog tidak ditemukan
    // -------------------------------------------------------------
    public function update(int $id, array $data): ?Blog
    {
        $blog = Blog::find($id);

        if (! $blog) {
            return null;
        }

        $blog->update($data);

        return $blog;
    }

    // -------------------------------------------------------------
    // ADMIN: DELETE blog by ID
    // Dipanggil: BlogController@destroy
    // Return false jika blog tidak ditemukan
    // -------------------------------------------------------------
    public function delete(int $id): bool
    {
        $blog = Blog::find($id);

        if (! $blog) {
            return false;
        }

        return (bool) $blog->delete();
    }
}