<?php

namespace App\Trait;

trait HasQuery
{
    protected function beforeSave(): self
    {
        return $this;
    }
    protected function save(?int $id)
    {
        $this->model = ($id) ?
            $this->repository->update($id, $this->modelData) :
            $this->repository->create($this->modelData);
        return $this;
    }
    protected function afterSave(): self
    {
        return $this;
    }
    protected function handleRelation(): self
    {
        return $this;
    }
    protected function getResult()
    {
        return $this->result;
    }
}
