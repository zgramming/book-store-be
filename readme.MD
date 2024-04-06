# RESTful API Node Express

The project builds RESTful APIs using Node.js, Express for Library Web Apps

## Manual Installation

```bash
git clone https://github.com/zgramming/book-store-be.git
cd book-store-be
```

Install the dependencies:

```bash
npm install
```

Set the environment variables:

```bash
cp .env.example .env
# open .env and modify the environment variables
```

Running Migration for Database

```bash
npm run prisma:build
```

## Table of Contents

- [Commands](#commands)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)

## Commands

Running in development:

```bash
npm run dev
```

Running in production:

```bash
# build
npm run build
# start
npm run start
```

## Environment Variables

The environment variables can be found and modified in the `.env` file.

```bash
# Database Location
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/book_store?schema=public"

# JWT Secret
JWT_SECRECT_KEY="6da654d8-b691-4391-8340-e49882447c2c" # You can ignored it
```


### API Endpoints

List of available routes:

**Master Book routes**:\
`GET api/v1/master-books` - Get All Books
`GET api/v1/master-books/:id` - Get Book by id

`POST api/v1/master-books` - Create Book

`PUT api/v1/master-books/:id` - Update Book

`DEL api/v1/master-books/:id` - Delete Book

**Master Student routes**:\
`GET api/v1/master-students` - Get All Students
`GET api/v1/master-students/:id` - Get Student by id

`POST api/v1/master-students` - Create Student

`PUT api/v1/master-students/:id` - Update Student

`DEL api/v1/master-students/:id` - Delete Student

**Inventory routes**:\
`GET api/v1/inventories` - Get All Inventories
`GET api/v1/inventories/:id` - Get Inventory by id

`POST api/v1/inventories` - Create Inventory

`PUT api/v1/inventories/:id` - Update Inventory
`PUT api/v1/inventories/:id/increase-stock` - Increase stock inventory
`PUT api/v1/inventories/:id/decrease-stock` - Decrease stock inventory

`DEL api/v1/inventories/:id` - Delete Inventory

**Transactions routes**:\
`GET api/v1/transactions` - Get All Transactions
`GET api/v1/transactions/:id` - Get Transaction by id

`POST api/v1/transactions` - Create Transaction

`PUT api/v1/transactions/:id/return` - Return book


**History routes**:\
`GET api/v1/history-transactions` - Get All History Transactions
