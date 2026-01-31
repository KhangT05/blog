<?php

namespace App\Exception;

use Exception;

class SecurityException extends Exception
{
    public function __construct(string $message = '', int $code = 403)
    {
        parent::__construct($message, $code);
    }
}
