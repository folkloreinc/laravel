<?php

namespace App\Repositories;

use Illuminate\Support\Arr;
use App\Contracts\Repositories\Pages as PagesRepositoryContract;
use App\Contracts\Resources\Resourcable;
use App\Models\Page as PageModel;
use App\Contracts\Resources\Page as PageContract;

class PagesRepository extends ModelResourcesRepository implements PagesRepositoryContract
{
    protected function newModel()
    {
        return new PageModel();
    }

    protected function newQuery()
    {
        return $this->newModel()->newQuery();
    }

    public function findById(string $id): ?PageContract
    {
        $model = $this->findModelById($id);
        return $model instanceof Resourcable ? $model->toResource() : null;
    }

    public function findBySlug(string $slug, string $locale = null): ?PageContract
    {
        if (is_null($locale)) {
            $locale = app()->getLocale();
        }
        $model = $this->newQuery()
            ->where('slug_' . $locale, $slug)
            ->first();
        return $model instanceof Resourcable ? $model->toResource() : null;
    }

    public function findByHandle(string $handle): ?PageContract
    {
        $model = $this->newQuery()
            ->where('handle', $handle)
            ->first();
        return $model instanceof Resourcable ? $model->toResource() : null;
    }

    public function create(array $data): PageContract
    {
        return parent::create($data);
    }

    public function update(string $id, array $data): ?PageContract
    {
        return parent::update($id, $data);
    }
}
