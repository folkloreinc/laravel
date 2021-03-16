<?php

namespace App\Contracts\Repositories;

use App\Contracts\Resources\Resource;

interface Resources
{
    public function findById(string $id): ?Resource;

    public function get(array $query = [], ?int $page = null, ?int $count = 10);

    public function create(array $data): Resource;

    public function update(string $id, array $data): ?Resource;

    public function destroy(string $id): bool;
}
