<?php

namespace App\Services;

use App\Models\Contact;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

// =============================================================
// CONTACT SERVICE
// Business logic untuk semua operasi contact/leads.
// Dipanggil oleh ContactController.
//
// Method public:
//   submit()        → simpan lead baru dari form publik
//   getAll()        → admin listing dengan filter & pagination
//   updateStatus()  → update status lead by id
// =============================================================

class ContactService
{
    // -------------------------------------------------------------
    // PUBLIC: SUBMIT CONTACT FORM
    // Dipanggil: ContactController@store
    // Status default 'new' saat pertama masuk
    // -------------------------------------------------------------
    public function submit(array $data): Contact
    {
        return Contact::create([
            ...$data,
            'status' => 'new',
        ]);
    }

    // -------------------------------------------------------------
    // ADMIN: GET ALL LEADS dengan filter page & status
    // Dipanggil: ContactController@adminIndex
    // -------------------------------------------------------------
    public function getAll(int $page = 1, string $status = ''): LengthAwarePaginator
    {
        $query = Contact::latest();

        // Filter berdasarkan status: new | contacted | closed
        if ($status !== '') {
            $query->where('status', $status);
        }

        return $query->paginate(15, ['*'], 'page', $page);
    }

    // -------------------------------------------------------------
    // ADMIN: UPDATE STATUS LEAD BY ID
    // Dipanggil: ContactController@updateStatus
    // Return null jika contact tidak ditemukan
    // -------------------------------------------------------------
    public function updateStatus(int $id, string $status): ?Contact
    {
        $contact = Contact::find($id);

        if (! $contact) {
            return null;
        }

        $contact->update(['status' => $status]);

        return $contact;
    }
}