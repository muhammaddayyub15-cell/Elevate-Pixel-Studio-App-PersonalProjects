<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBlogRequest;
use App\Http\Requests\UpdateBlogRequest;
use App\Services\BlogService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

// =============================================================
// BLOG CONTROLLER
// Menangani semua endpoint blog dan kategori blog.
//
// Public routes (tanpa auth):
//   GET /api/blogs
//   GET /api/blogs/{slug}
//   GET /api/blog-categories
//
// Admin routes (butuh Sanctum token):
//   GET    /api/admin/blogs
//   POST   /api/admin/blogs
//   PUT    /api/admin/blogs/{id}
//   DELETE /api/admin/blogs/{id}
//
// Pattern: Controller → BlogService → Blog Model
// =============================================================

class BlogController extends Controller
{
    public function __construct(
        protected BlogService $blogService
    ) {}

    // -------------------------------------------------------------
    // PUBLIC: LIST BLOG
    // GET /api/blogs
    // Support query: ?page=1 &category= &search=
    // -------------------------------------------------------------
    public function index(Request $request): JsonResponse
    {
        $blogs = $this->blogService->getAll(
            page: $request->integer('page', 1),
            category: $request->string('category', ''),
            search: $request->string('search', ''),
        );

        return response()->json([
            'success' => true,
            'data'    => $blogs,
        ]);
    }

    // -------------------------------------------------------------
    // PUBLIC: DETAIL BLOG
    // GET /api/blogs/{slug}
    // -------------------------------------------------------------
    public function show(string $slug): JsonResponse
    {
        $blog = $this->blogService->getBySlug($slug);

        if (! $blog) {
            return response()->json([
                'success' => false,
                'message' => 'Blog not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data'    => $blog,
        ]);
    }

    // -------------------------------------------------------------
    // PUBLIC: LIST KATEGORI BLOG
    // GET /api/blog-categories
    // -------------------------------------------------------------
    public function categories(): JsonResponse
    {
        $categories = $this->blogService->getCategories();

        return response()->json([
            'success' => true,
            'data'    => $categories,
        ]);
    }

    // -------------------------------------------------------------
    // ADMIN: LIST SEMUA BLOG
    // GET /api/admin/blogs
    // -------------------------------------------------------------
    public function adminIndex(Request $request): JsonResponse
    {
        $blogs = $this->blogService->getAllAdmin(
            page: $request->integer('page', 1),
            search: $request->string('search', ''),
        );

        return response()->json([
            'success' => true,
            'data'    => $blogs,
        ]);
    }

    // -------------------------------------------------------------
    // ADMIN: CREATE BLOG
    // POST /api/admin/blogs
    // -------------------------------------------------------------
    public function store(StoreBlogRequest $request): JsonResponse
    {
        $blog = $this->blogService->create(
            data: $request->validated(),
            userId: $request->user()->id,
        );

        return response()->json([
            'success' => true,
            'message' => 'Blog created successfully',
            'data'    => $blog,
        ], 201);
    }

    // -------------------------------------------------------------
    // ADMIN: UPDATE BLOG
    // PUT /api/admin/blogs/{id}
    // -------------------------------------------------------------
    public function update(UpdateBlogRequest $request, int $id): JsonResponse
    {
        $blog = $this->blogService->update($id, $request->validated());

        if (! $blog) {
            return response()->json([
                'success' => false,
                'message' => 'Blog not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Blog updated successfully',
            'data'    => $blog,
        ]);
    }

    // -------------------------------------------------------------
    // ADMIN: DELETE BLOG
    // DELETE /api/admin/blogs/{id}
    // -------------------------------------------------------------
    public function destroy(int $id): JsonResponse
    {
        $deleted = $this->blogService->delete($id);

        if (! $deleted) {
            return response()->json([
                'success' => false,
                'message' => 'Blog not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Blog deleted successfully',
        ]);
    }
}