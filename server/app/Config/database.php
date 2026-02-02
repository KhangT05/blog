<?php
class Database
{
    private $host = 'localhost';
    private $dbname = 'web_forum';
    private $user = 'root';
    private $password = '';
    private $port = '3306';
    private $conn;
    public function connect()
    {
        $this->conn = null;
        try {
            $this->conn = new PDO(
                'mysql:host=' . $this->host . 'dbname=' . $this->dbname,

            );
        } catch (\Throwable $th) {
            //throw $th;
        }
    }
}
