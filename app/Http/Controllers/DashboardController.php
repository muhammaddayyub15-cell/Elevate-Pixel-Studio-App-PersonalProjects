<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Contact;
use App\Models\Portfolio;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;

// =============================================================
// DASHBOARD CONTROLLER
// Menangani endpoint statistik admin.
// Tidak perlu Service layer karena hanya aggregate query sederhana.
//
// Admin routes (butuh Sanctum token):
//   GET /api/admin/dashboard
// =============================================================

class DashboardController extends Controller
{
    // -------------------------------------------------------------
    // ADMIN: STATISTIK DASHBOARD
    // GET /api/admin/dashboard
    // Menghitung total blog, portfolio, dan leads masuk
    // -------------------------------------------------------------
    public function index(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data'    => [
                'total_blogs'      => Blog::count(),
                'total_portfolios' => Portfolio::count(),
                'total_contacts'   => Contact::count(),

                // Breakdown leads berdasarkan status
                'contacts_by_status' => [
                    'new'       => Contact::where('status', 'new')->count(),
                    'contacted' => Contact::where('status', 'contacted')->count(),
                    'closed'    => Contact::where('status', 'closed')->count(),
                ],
            ],
        ]);
    }
}