<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePortfolioRequest;
use App\Http\Requests\UpdatePortfolioRequest;
use App\Services\PortfolioService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

// =============================================================
// PORTFOLIO CONTROLLER
// Menangani semua endpoint portfolio.
//
// Public routes (tanpa auth):
//   GET  /api/portfolios
//   GET  /api/portfolios/{slug}
//
// Admin routes (butuh Sanctum token):
//   GET    /api/admin/portfolios
//   POST   /api/admin/portfolios
//   PUT    /api/admin/portfolios/{id}
//   DELETE /api/admin/portfolios/{id}
//
// Pattern: Controller → PortfolioService → Portfolio Model
// =============================================================

class PortfolioController extends Controller
{
    public function __construct(
        protected PortfolioService $portfolioService
    ) {}

    // -------------------------------------------------------------
    // PUBLIC: LIST PORTFOLIO
    // GET /api/portfolios
    // Support query: ?page=1 &search= &featured=
    // -------------------------------------------------------------
    public function index(Request $request): JsonResponse
    {
        $portfolios = $this->portfolioService->getAll(
            page: $request->integer('page', 1),
            search: $request->string('search', ''),
            featured: $request->boolean('featured', false),
        );

        return response()->json([
            'success' => true,
            'data'    => $portfolios,
        ]);
    }

    // -------------------------------------------------------------
    // PUBLIC: DETAIL PORTFOLIO
    // GET /api/portfolios/{slug}
    // -------------------------------------------------------------
    public function show(string $slug): JsonResponse
    {
        $portfolio = $this->portfolioService->getBySlug($slug);

        if (! $portfolio) {
            return response()->json([
                'success' => false,
                'message' => 'Portfolio not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data'    => $portfolio,
        ]);
    }

    // -------------------------------------------------------------
    // ADMIN: LIST SEMUA PORTFOLIO
    // GET /api/admin/portfolios
    // -------------------------------------------------------------
    public function adminIndex(Request $request): JsonResponse
    {
        $portfolios = $this->portfolioService->getAllAdmin(
            page: $request->integer('page', 1),
            search: $request->string('search', ''),
        );

        return response()->json([
            'success' => true,
            'data'    => $portfolios,
        ]);
    }

    // -------------------------------------------------------------
    // ADMIN: CREATE PORTFOLIO
    // POST /api/admin/portfolios
    // -------------------------------------------------------------
    public function store(StorePortfolioRequest $request): JsonResponse
    {
        $portfolio = $this->portfolioService->create(
            data: $request->validated(),
            userId: $request->user()->id,
        );

        return response()->json([
            'success' => true,
            'message' => 'Portfolio created successfully',
            'data'    => $portfolio,
        ], 201);
    }

    // -------------------------------------------------------------
    // ADMIN: UPDATE PORTFOLIO
    // PUT /api/admin/portfolios/{id}
    // -------------------------------------------------------------
    public function update(UpdatePortfolioRequest $request, int $id): JsonResponse
    {
        $portfolio = $this->portfolioService->update($id, $request->validated());

        if (! $portfolio) {
            return response()->json([
                'success' => false,
                'message' => 'Portfolio not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Portfolio updated successfully',
            'data'    => $portfolio,
        ]);
    }

    // -------------------------------------------------------------
    // ADMIN: DELETE PORTFOLIO
    // DELETE /api/admin/portfolios/{id}
    // -------------------------------------------------------------
    public function destroy(int $id): JsonResponse
    {
        $deleted = $this->portfolioService->delete($id);

        if (! $deleted) {
            return response()->json([
                'success' => false,
                'message' => 'Portfolio not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Portfolio deleted successfully',
        ]);
    }
}