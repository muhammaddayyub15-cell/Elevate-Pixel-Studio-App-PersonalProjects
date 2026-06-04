<?php

namespace App\Services;

use App\Models\Portfolio;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

// =============================================================
// PORTFOLIO SERVICE
// Business logic untuk semua operasi portfolio.
// Dipanggil oleh PortfolioController.
//
// Method public:
//   getAll()        → public listing dengan filter & pagination
//   getBySlug()     → public detail by slug
//   getAllAdmin()   → admin listing dengan filter & pagination
//   create()        → buat portfolio baru
//   update()        → update portfolio by id
//   delete()        → hapus portfolio by id
// =============================================================

class PortfolioService
{
    // -------------------------------------------------------------
    // PUBLIC: GET ALL dengan filter page, search, featured
    // Dipanggil: PortfolioController@index
    // -------------------------------------------------------------
    public function getAll(int $page = 1, string $search = '', bool $featured = false): LengthAwarePaginator
    {
        $query = Portfolio::query();

        // Filter hanya yang featured jika parameter featured=true
        if ($featured) {
            $query->where('featured', true);
        }

        // Filter pencarian berdasarkan title atau client_name
        if ($search !== '') {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('client_name', 'like', "%{$search}%");
            });
        }

        return $query->latest()->paginate(12, ['*'], 'page', $page);
    }

    // -------------------------------------------------------------
    // PUBLIC: GET DETAIL BY SLUG
    // Dipanggil: PortfolioController@show
    // Return null jika tidak ditemukan (bukan throw exception)
    // -------------------------------------------------------------
    public function getBySlug(string $slug): ?Portfolio
    {
        return Portfolio::where('slug', $slug)->first();
    }

    // -------------------------------------------------------------
    // ADMIN: GET ALL untuk halaman admin (tanpa filter featured)
    // Dipanggil: PortfolioController@adminIndex
    // -------------------------------------------------------------
    public function getAllAdmin(int $page = 1, string $search = ''): LengthAwarePaginator
    {
        $query = Portfolio::query();

        // Filter pencarian berdasarkan title
        if ($search !== '') {
            $query->where('title', 'like', "%{$search}%");
        }

        return $query->latest()->paginate(15, ['*'], 'page', $page);
    }

    // -------------------------------------------------------------
    // ADMIN: CREATE portfolio baru
    // Dipanggil: PortfolioController@store
    // $userId diambil dari authenticated user
    // -------------------------------------------------------------
    public function create(array $data, int $userId): Portfolio
    {
        return Portfolio::create([
            ...$data,
            'user_id' => $userId,
        ]);
    }

    // -------------------------------------------------------------
    // ADMIN: UPDATE portfolio by ID
    // Dipanggil: PortfolioController@update
    // Return null jika portfolio tidak ditemukan
    // -------------------------------------------------------------
    public function update(int $id, array $data): ?Portfolio
    {
        $portfolio = Portfolio::find($id);

        if (! $portfolio) {
            return null;
        }

        $portfolio->update($data);

        return $portfolio;
    }

    // -------------------------------------------------------------
    // ADMIN: DELETE portfolio by ID
    // Dipanggil: PortfolioController@destroy
    // Return false jika portfolio tidak ditemukan
    // -------------------------------------------------------------
    public function delete(int $id): bool
    {
        $portfolio = Portfolio::find($id);

        if (! $portfolio) {
            return false;
        }

        return (bool) $portfolio->delete();
    }
}