<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreContactRequest;
use App\Http\Requests\UpdateContactStatusRequest;
use App\Services\ContactService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

// =============================================================
// CONTACT CONTROLLER
// Menangani semua endpoint contact / leads.
//
// Public routes (tanpa auth):
//   POST /api/contact
//
// Admin routes (butuh Sanctum token):
//   GET   /api/admin/contacts
//   PATCH /api/admin/contacts/{id}/status
//
// Pattern: Controller → ContactService → Contact Model
// =============================================================

class ContactController extends Controller
{
    public function __construct(
        protected ContactService $contactService
    ) {}

    // -------------------------------------------------------------
    // PUBLIC: SUBMIT CONTACT FORM
    // POST /api/contact
    // Validasi via StoreContactRequest
    // -------------------------------------------------------------
    public function store(StoreContactRequest $request): JsonResponse
    {
        $this->contactService->submit($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Message sent successfully',
        ], 201);
    }

    // -------------------------------------------------------------
    // ADMIN: LIST SEMUA LEADS
    // GET /api/admin/contacts
    // Support query: ?page=1 &status=new|contacted|closed
    // -------------------------------------------------------------
    public function adminIndex(Request $request): JsonResponse
    {
        $contacts = $this->contactService->getAll(
            page:   $request->integer('page', 1),
            status: $request->string('status', ''),
        );

        return response()->json([
            'success' => true,
            'data'    => $contacts,
        ]);
    }

    // -------------------------------------------------------------
    // ADMIN: UPDATE STATUS LEAD
    // PATCH /api/admin/contacts/{id}/status
    // Status: new | contacted | closed
    // -------------------------------------------------------------
    public function updateStatus(UpdateContactStatusRequest $request, int $id): JsonResponse
    {
        $contact = $this->contactService->updateStatus($id, $request->validated('status'));

        if (! $contact) {
            return response()->json([
                'success' => false,
                'message' => 'Contact not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Status updated successfully',
            'data'    => $contact,
        ]);
    }
}