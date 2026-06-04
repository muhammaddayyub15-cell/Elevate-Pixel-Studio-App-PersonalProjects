<?php

namespace App\Services;

use App\Models\Contact;

class ContactService
{
    public function create(array $data)
    {
        return Contact::create($data);
    }

    public function getAll()
    {
        return Contact::latest()->get();
    }

    public function updateStatus(Contact $contact, string $status)
    {
        $contact->update([
            'status' => $status
        ]);

        return $contact;
    }
}