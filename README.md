# Hatch Careers

Hatch Careers merupakan web application sebagai peneyedia platform antara pelamar dan pihak perusahaan.

## Installation

fork / clone this repository

```bash
  git clone <repository.github.io>

  cd hatch-careers

```

create file .env and copy file env.example to .env

```bash
  cp .env.example .env

```

Install dependency php

```bash
  composer install

```

or

```bash
  composer update

```

Install dependency js

```bash
  npm install --legacy-peer-deps

```

setup

```bash
  php artisan migrate:fresh --seed
  php artisan key:generate
  php artisan storage:link
```

run

```bash
  php artisan serve

  npm run dev
```
