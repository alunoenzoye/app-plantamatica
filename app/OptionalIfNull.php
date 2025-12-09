<?php

namespace App;

use Spatie\LaravelData\Optional;

class OptionalIfNull
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public static function create(mixed $val)
    {
        if ($val == null) {
            return Optional::create();
        }

        return $val;
    }
}
