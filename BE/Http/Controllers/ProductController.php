<?php

namespace App\Http\Controllers;

use App\Services\ProductService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

// =============================================================
// PRODUCT CONTROLLER
// Menangani endpoint produk digital.
//
// CATATAN: ProductController ini hanya menyediakan endpoint
// publik (catalog) untuk MVP. Admin CRUD produk dan checkout
// akan diaktifkan di Phase 2 bersama Midtrans integration.
//
// Public routes (tanpa auth):
//   GET /api/products          — list produk published
//   GET /api/products/{slug}   — detail produk
//
// Admin routes (Phase 2):
//   POST   /api/admin/products
//   PUT    /api/admin/products/{id}
//   DELETE /api/admin/products/{id}
//
// Pattern: Controller → ProductService → Product Model
// =============================================================

class ProductController extends Controller
{
    public function __construct(
        protected ProductService $productService
    ) {}

    // -------------------------------------------------------------
    // PUBLIC: LIST PRODUK
    // GET /api/products
    // Hanya tampilkan produk dengan status 'published'
    // Support query: ?page=1 &search=
    // -------------------------------------------------------------
    public function index(Request $request): JsonResponse
    {
        $products = $this->productService->getAll(
            page: $request->integer('page', 1),
            search: $request->string('search', ''),
        );

        return response()->json([
            'success' => true,
            'data'    => $products,
        ]);
    }

    // -------------------------------------------------------------
    // PUBLIC: DETAIL PRODUK
    // GET /api/products/{slug}
    // -------------------------------------------------------------
    public function show(string $slug): JsonResponse
    {
        $product = $this->productService->getBySlug($slug);

        if (! $product) {
            return response()->json([
                'success' => false,
                'message' => 'Product not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data'    => $product,
        ]);
    }

    // -------------------------------------------------------------
    // ADMIN: DASHBOARD STATS (dipakai DashboardController juga)
    // Dipanggil dari AdminController atau route admin/dashboard
    // -------------------------------------------------------------
    // Catatan: Dashboard statistics ada di DashboardController
    // yang akan memanggil ProductService::countPublished()
    // -------------------------------------------------------------
}