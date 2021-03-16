<?php

namespace App\Contracts\Repositories;

use App\Contracts\Resources\Page;
use Illuminate\Support\Collection;

interface Pages extends Resources
{
    public function findById(string $id): ?Page;

    public function findByHandle(string $handle): ?Page;

    public function findBySlug(string $slug, string $locale = null): ?Page;

    public function get(array $query = [], ?int $page = null, ?int $count = 10);

    public function create(array $data): Page;

    public function update(string $id, array $data): ?Page;

    public function destroy(string $id): bool;
}
