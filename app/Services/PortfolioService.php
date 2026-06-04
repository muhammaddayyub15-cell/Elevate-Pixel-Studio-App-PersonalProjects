<?php

namespace App\Services;

use App\Models\Portfolio;

class PortfolioService
{
    public function getAll()
    {
        return Portfolio::latest()->get();
    }

    public function getFeatured()
    {
        return Portfolio::where('featured', true)
            ->where('status', 'published')
            ->latest()
            ->get();
    }

    public function findBySlug(string $slug)
    {
        return Portfolio::where('slug', $slug)
            ->firstOrFail();
    }

    public function create(array $data)
    {
        return Portfolio::create($data);
    }

    public function update(Portfolio $portfolio, array $data)
    {
        $portfolio->update($data);

        return $portfolio;
    }

    public function delete(Portfolio $portfolio)
    {
        return $portfolio->delete();
    }
}