## Trodo test assignment

This repository contains a test assignment for Trodo. The assignment is realized with Laravel back-end service and React.js front-end service (using TypeScript). Currency exchange rates are fetched from [AnyAPI API service](https://anyapi.io/).

## Requirements

- PHP 8.1 or higher
- Composer
- Node.js
- NPM
- SQL database
- AnyAPI API key

## Installation

1. Clone the repository and navigate to the project directory
2. Install composer dependencies: `composer install`
3. Install NPM dependencies: `npm install`
4. Copy `.env.example` to `.env` and fill in at least the following variables:
    - `DB_HOST`
    - `DB_PORT`
    - `DB_DATABASE`
    - `DB_USERNAME`
    - `DB_PASSWORD`
    - `ANYAPI_API_KEY`
5. Run `php artisan key:generate`
6. Migrate and seed the database: `php artisan migrate --seed`
    - *Optional:* To add 100 random exchange rates, run `php artisan db:seed --class=RateSeeder`
7. Set up the scheduler for scheduled exchange rate updates:
    - If running the application locally, in a separate terminal run `php artisan schedule:work`
    - If running the application on a server, add the following cron entry to the crontab `* * * * * cd /path-to-your-project && php artisan schedule:run >> /dev/null 2>&1`
8. Navigate to the front-end service directory: `cd react-frontend`
9. Copy `.env.example` to `.env` and fill in `VITE_API_BASE_URL` with the URL of the back-end service, default: `http://localhost:8000/`
10. Install front-end dependencies: `npm install`

## Running the application

1. In the root directory start the back-end service: `php artisan serve`
2. In a separate terminal, navigate to the front-end service directory: `cd react-frontend`
3. Start the front-end service: `npm run dev`
4. Navigate to the front-end service URL (default: `http://localhost:3000`)

## Other commands

- To manually run the scheduled command that fetches the exchange rates, run `php artisan fetch:currency-rates`
