<?php

namespace App\Services;

use App\Models\Blog;

class BlogService
{
    public function getAll()
    {
        return Blog::latest()->get();
    }

    public function getPublished()
    {
        return Blog::where('status', 'published')
            ->latest()
            ->get();
    }

    public function findBySlug(string $slug)
    {
        return Blog::where('slug', $slug)
            ->firstOrFail();
    }

    public function create(array $data)
    {
        return Blog::create($data);
    }

    public function update(Blog $blog, array $data)
    {
        $blog->update($data);

        return $blog;
    }

    public function delete(Blog $blog)
    {
        return $blog->delete();
    }
}