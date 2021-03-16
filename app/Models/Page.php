<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;
use App\Contracts\Resources\Page as PageContract;
use App\Models\Resources\Page as PageModelResource;
use App\Contracts\Resources\Resourcable;
use App\Models\Concerns\SluggableWithFallback;

class Page extends Model implements Resourcable
{
    use Sluggable, SluggableWithFallback;

    protected $fillable = ['type', 'data'];

    protected $casts = [
        'data' => 'json',
    ];

    public function toResource(): PageContract
    {
        return new PageModelResource($this);
    }

    /**
     * Return the sluggable configuration array for this model.
     *
     * @return array
     */
    public function sluggable()
    {
        return $this->getSluggablesWithFallback('data.title.%s', 'slug_%s', ['unique' => false]);
    }

    public function getRouteKeyName()
    {
        $locale = app()->getLocale();
        return 'slug_' . $locale;
    }
}
