<?php

namespace App\Config;

use Database;
use PDO;

class HasTransaction
{
    protected $conn;
    //khởi tạo connect
    public function initConnection()
    {
        if (!$this->conn) {
            $db = new Database();
            $this->conn = $db->connect();
        }
    }
    //begin transaction
    protected function beginTransaction(): self
    {
        $this->initConnection();
        $this->conn->beginTransaction();
        return $this;
    }
    //commit transaction
    protected function commit(): self
    {
        if ($this->conn && $this->conn->inTransaction()) {
            $this->conn->commit();
        }
        return $this;
    }
    //rollback transaction
    protected function rollback()
    {
        $this->initConnection();
        $this->conn->rollback();
    }
    protected function inTransaction()
    {
        return $this->conn && $this->conn->inTransaction();
    }
}
