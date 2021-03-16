<?php

namespace App\Repositories;

use Illuminate\Support\Facades\Hash;
use Illuminate\Contracts\Hashing\Hasher;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Auth\EloquentUserProvider;
use Illuminate\Support\Arr;
use App\Contracts\Resources\Resourcable;
use App\Contracts\Repositories\Users as UsersRepositoryContract;
use App\Models\User as UserModel;
use App\Contracts\Resources\User as UserContract;

class UsersRepository extends ModelResourcesRepository implements UsersRepositoryContract
{
    protected $userProvider;

    protected $donationsRepository;

    protected $newsletterService;

    public function __construct(Hasher $hasher)
    {
        $this->userProvider = new EloquentUserProvider($hasher, UserModel::class);
    }

    protected function newModel()
    {
        return new UserModel();
    }

    protected function newQuery()
    {
        return parent::newQuery();
    }

    public function findById(string $id): ?UserContract
    {
        return parent::findById($id);
    }

    public function findByEmail(string $email): ?UserContract
    {
        $model = $this->newQuery()
            ->where('email', 'LIKE', $email)
            ->first();
        return $model instanceof Resourcable ? $model->toResource() : $model;
    }

    public function get(array $query = [], ?int $page = null, ?int $count = null)
    {
        return parent::get($query, $page, $count);
    }

    public function create($data): UserContract
    {
        return parent::create($data);
    }

    public function update(string $id, $data): ?UserContract
    {
        return parent::update($id, $data);
    }

    public function updatePassword(string $id, string $password): ?UserContract
    {
        return parent::update($id, [
            'password' => $password,
        ]);
    }

    protected function fillModel($model, array $data)
    {
        $model->fill(Arr::only($data, $model->getFillable()));

        if (isset($data['password']) && !empty($data['password'])) {
            $model->password = Hash::make($data['password']);
        }
    }

    protected function syncRelations($model, array $data)
    {
    }

    protected function buildQueryFromParams($query, $params)
    {
        $query = parent::buildQueryFromParams($query, $params);

        if (isset($params['email'])) {
            $query->where('email', 'LIKE', $params['email']);
        }

        return $query;
    }

    /**
     * Retrieve a user by their unique identifier.
     *
     * @param  mixed  $identifier
     * @return \Illuminate\Contracts\Auth\Authenticatable|null
     */
    public function retrieveById($identifier)
    {
        $model = $this->userProvider->retrieveById($identifier);
        return !is_null($model) && $model instanceof Resourcable ? $model->toResource() : null;
    }

    /**
     * Retrieve a user by their unique identifier and "remember me" token.
     *
     * @param  mixed  $identifier
     * @param  string  $token
     * @return \Illuminate\Contracts\Auth\Authenticatable|null
     */
    public function retrieveByToken($identifier, $token)
    {
        $model = $this->userProvider->retrieveByToken($identifier, $token);
        return !is_null($model) && $model instanceof Resourcable ? $model->toResource() : null;
    }

    /**
     * Update the "remember me" token for the given user in storage.
     *
     * @param  \Illuminate\Contracts\Auth\Authenticatable  $user
     * @param  string  $token
     * @return void
     */
    public function updateRememberToken(Authenticatable $user, $token)
    {
        return $this->userProvider->updateRememberToken($user, $token);
    }

    /**
     * Retrieve a user by the given credentials.
     *
     * @param  array  $credentials
     * @return \Illuminate\Contracts\Auth\Authenticatable|null
     */
    public function retrieveByCredentials(array $credentials)
    {
        $model = $this->userProvider->retrieveByCredentials($credentials);
        return !is_null($model) && $model instanceof Resourcable ? $model->toResource() : null;
    }

    /**
     * Validate a user against the given credentials.
     *
     * @param  \Illuminate\Contracts\Auth\Authenticatable  $user
     * @param  array  $credentials
     * @return bool
     */
    public function validateCredentials(Authenticatable $user, array $credentials)
    {
        return $this->userProvider->validateCredentials($user, $credentials);
    }
}
