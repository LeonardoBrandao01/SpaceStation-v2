<?php
// config/config.php

declare(strict_types=1);

return [
    'db' => [
        'host' => getenv('DB_HOST') ?: ($_ENV['DB_HOST'] ?? 'db'),
        'port' => (int)(getenv('DB_PORT') ?: ($_ENV['DB_PORT'] ?? 3306)),
        'name' => getenv('MYSQL_DATABASE') ?: ($_ENV['MYSQL_DATABASE'] ?? 'space_station'),
        'user' => getenv('MYSQL_USER') ?: ($_ENV['MYSQL_USER'] ?? 'root'),
        'pass' => getenv('MYSQL_PASSWORD') !== false ? getenv('MYSQL_PASSWORD') : ($_ENV['MYSQL_PASSWORD'] ?? ''),
        'charset' => 'utf8mb4',
    ],
];

