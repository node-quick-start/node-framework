```
$ npm install -g db-migrate
```
mysql
```
$ npm install -g db-migrate-mysql
```
sqlite
```
$ npm install -g db-migrate-sqlite3
```

look help
```
$ db-migrate
```

config
```
# add .db-migraterc file in root path write:
{
  "sql-file": true,
  "configFile": "./config/database.json"
}
# add config/database.json write:
{
  "defaultEnv": "development",
  "development": {
    "database": "start_development",
    "driver": "mysql",
    "user": "root",
    "password" : "",
    "multipleStatements": true
  },
  "production": {
    "database": "start_production",
    "driver": "mysql",
    "user": "root",
    "password" : "",
    "multipleStatements": true
  },
  "local": {
    "database": "start_local",
    "driver": "sqlite3",
    "filename": "./tmp/local.db"
  },
  "test": {
    "driver": "sqlite3",
    "filename": ":memory:"
  },
  "demo": "mysql://user:password@host:port/database"
}
```


创建DB
- default env `development`
```
$ db-migrate db:create start_development [--env production]
```

创建migration
```
$ db-migrate create users
```

执行 migration    
```
$ db-migrate up:all -v
```

撤销migration
```
$ db-migrate down -c 1
$ db-migrate down:all -v
```

- eg:
 
`db-migrate create users` 

up sql
```
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(255),
  `email` varchar(255),
  `phone` varchar(255),
  `wallet_amount` decimal(10,2) DEFAULT 0.0,
  `password` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  INDEX idx_users_on_email(email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```
down sql
```
$ DROP TABLE users;
```

`db-migrate create shops` 

up sql
```
CREATE TABLE `shops` (
  `id` bigint NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` int(11),
  `name` varchar(255),
  `created_at` datetime NOT NULL,
   `updated_at` datetime NOT NULL,
  INDEX idx_shops_on_name(name),
  INDEX idx_shops_on_user_id(user_id),
  CONSTRAINT fk_shops_user_id FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```
down sql
```
$ DROP TABLE shops;
```