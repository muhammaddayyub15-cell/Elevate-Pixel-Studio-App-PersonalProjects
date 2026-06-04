<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Blog extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'blog_category_id',
        'title',
        'slug',
        'featured_image',
        'excerpt',
        'content',
        'meta_title',
        'meta_description',
        'published_at',
        'status',
    ];

    protected $casts = [
        'published_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function blogCategory()
    {
        return $this->belongsTo(
            BlogCategory::class,
            'blog_category_id'
        );
    }
}