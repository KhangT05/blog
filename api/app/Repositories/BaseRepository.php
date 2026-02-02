<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Model;

class BaseRepository
{
    protected $model;
    public function __construct(
        Model $model
    ) {
        $this->model = $model;
    }
    public function create(array $payload = []): Model |null
    {
        return $this->model->create($payload)->fresh();
    }
    public function update(int $id = 0, array $payload = []): mixed
    {
        $model = $this->findByid($id);
        $model->fill($payload);
        $model->save();
        return $model;
    }
    public function findByid(int $id = 0, array $relation = [], array $column = ['*'])
    {
        return $this->model->select($column)->with($relation)->find($id);
    }
    public function delete(int $id = 0): bool
    {
        $model = $this->findByid($id);
        return $model->delete();
    }
    public function getFillable()
    {
        return $this->model->getFillable();
    }
}
