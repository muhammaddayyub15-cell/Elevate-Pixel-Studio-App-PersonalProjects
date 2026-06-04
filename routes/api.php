<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

// =============================================================
// API ROUTES — Elevate Pixel Studio
// Base URL: /api
//
// Struktur:
//   PUBLIC   → tanpa middleware (visitor bebas akses)
//   AUTH     → POST /login (generate token)
//   ADMIN    → middleware auth:sanctum (butuh Bearer token)
//
// Controller → Method mapping:
//   AuthController       login(), logout()
//   PortfolioController  index(), show(), adminIndex(), store(), update(), destroy()
//   BlogController       index(), show(), categories(), adminIndex(), store(), update(), destroy()
//   ContactController    store(), adminIndex(), updateStatus()
//   DashboardController  index()
//   ProductController    index(), show()
// =============================================================


// -------------------------------------------------------------
// PUBLIC ROUTES
// Tidak butuh autentikasi — untuk visitor website
// -------------------------------------------------------------
Route::prefix('v1')->group(function () {

    // -- Services --------------------------------------------------
    // GET /api/v1/services
    // Catatan: ServiceController belum dibuat — skip untuk MVP
    // (data services bisa hardcode di frontend untuk saat ini)
    // -------------------------------------------------------------

    // -- Portfolio -------------------------------------------------
    Route::get('/portfolios', [PortfolioController::class, 'index']);
    Route::get('/portfolios/{slug}', [PortfolioController::class, 'show']);

    // -- Blog ------------------------------------------------------
    Route::get('/blogs', [BlogController::class, 'index']);
    Route::get('/blogs/{slug}', [BlogController::class, 'show']);
    Route::get('/blog-categories', [BlogController::class, 'categories']);

    // -- Products (Phase 2 ready — public catalog) -----------------
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/products/{slug}', [ProductController::class, 'show']);

    // -- Contact Form ----------------------------------------------
    Route::post('/contact', [ContactController::class, 'store']);


    // -------------------------------------------------------------
    // AUTH ROUTES
    // POST /api/v1/login — generate Sanctum token
    // POST /api/v1/logout — revoke token (butuh token)
    // -------------------------------------------------------------
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
    });


    // -------------------------------------------------------------
    // ADMIN ROUTES
    // Semua route di sini butuh Sanctum Bearer token
    // Header: Authorization: Bearer {token}
    // -------------------------------------------------------------
    Route::middleware('auth:sanctum')->prefix('admin')->group(function () {

        // -- Dashboard ---------------------------------------------
        // GET /api/v1/admin/dashboard
        Route::get('/dashboard', [DashboardController::class, 'index']);

        // -- Portfolio CRUD ----------------------------------------
        // GET    /api/v1/admin/portfolios
        // POST   /api/v1/admin/portfolios
        // PUT    /api/v1/admin/portfolios/{id}
        // DELETE /api/v1/admin/portfolios/{id}
        Route::get('/portfolios', [PortfolioController::class, 'adminIndex']);
        Route::post('/portfolios', [PortfolioController::class, 'store']);
        Route::put('/portfolios/{id}', [PortfolioController::class, 'update']);
        Route::delete('/portfolios/{id}', [PortfolioController::class, 'destroy']);

        // -- Blog CRUD ---------------------------------------------
        // GET    /api/v1/admin/blogs
        // POST   /api/v1/admin/blogs
        // PUT    /api/v1/admin/blogs/{id}
        // DELETE /api/v1/admin/blogs/{id}
        Route::get('/blogs', [BlogController::class, 'adminIndex']);
        Route::post('/blogs', [BlogController::class, 'store']);
        Route::put('/blogs/{id}', [BlogController::class, 'update']);
        Route::delete('/blogs/{id}', [BlogController::class, 'destroy']);

        // -- Contact Leads -----------------------------------------
        // GET   /api/v1/admin/contacts
        // PATCH /api/v1/admin/contacts/{id}/status
        Route::get('/contacts', [ContactController::class, 'adminIndex']);
        Route::patch('/contacts/{id}/status', [ContactController::class, 'updateStatus']);

    });

});