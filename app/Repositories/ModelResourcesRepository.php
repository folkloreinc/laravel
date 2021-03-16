<?php

namespace App\Repositories;

use App\Contracts\Repositories\Resources as ResourcesRepositoryContract;
use App\Contracts\Resources\Resourcable;
use App\Contracts\Resources\Resource;
use Laravel\Scout\Builder as ScoutBuilder;

abstract class ModelResourcesRepository implements ResourcesRepositoryContract
{
    abstract protected function newModel();

    public function findById(string $id): ?Resource
    {
        $model = $this->findModelById($id);
        return $model instanceof Resourcable ? $model->toResource() : $model;
    }

    public function get(array $params = [], ?int $page = null, ?int $count = null)
    {
        $query = $this->buildQueryFromParams($this->newQuery(), $this->getQueryParams($params));
        if (!is_null($page)) {
            $models =
                $query instanceof ScoutBuilder
                    ? $query->paginate($count, 'page', $page)
                    : $query->paginate($count, ['*'], 'page', $page);
        } else {
            if (!is_null($count)) {
                $query->take($count);
            }
            $models = $query->get();
        }

        $collection = $models->map(function ($model) {
            return $model instanceof Resourcable ? $model->toResource() : $model;
        });
        if (is_null($page)) {
            return $collection;
        }
        $models->setCollection($collection);
        return $models;
    }

    public function create(array $data): Resource
    {
        $model = $this->newModel();
        $this->fillModel($model, $data);
        $model->save();
        $this->syncRelations($model, $data);
        return $model instanceof Resourcable ? $model->toResource() : $model;
    }

    public function update(string $id, array $data): ?Resource
    {
        $model = $this->findModelById($id);
        if (is_null($model)) {
            return null;
        }
        $this->fillModel($model, $data);
        $model->save();
        $this->syncRelations($model, $data);

        return $model instanceof Resourcable ? $model->toResource() : $model;
    }

    public function destroy(string $id): bool
    {
        $model = $this->findModelById($id);
        if (is_null($model)) {
            return false;
        }
        $model->delete();
        return true;
    }

    protected function newQuery()
    {
        return $this->newModel()->newQuery();
    }

    protected function findModelById($id)
    {
        return $this->newQuery()
            ->where('id', $id)
            ->first();
    }

    protected function fillModel($model, array $data)
    {
        $model->fill($data);
    }

    protected function syncRelations($model, array $data)
    {
    }

    protected function getDefaultParams(): array
    {
        return [];
    }

    protected function getQueryParams(array $params): array
    {
        return array_merge($this->getDefaultParams(), $params);
    }

    protected function buildQueryFromParams($query, $params)
    {
        if (isset($params['order'])) {
            if (is_array($params['order'])) {
                $query->orderBy($params['order'][0], $params['order'][1]);
            } else {
                $query->orderBy($params['order']);
            }
        }

        return $query;
    }
}
