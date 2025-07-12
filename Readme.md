# Setup new environment

## Create the database

```
CREATE DATABASE supag_dev;
```

## Create the user in the database

```
  psql -U postgres -h localhost -p 5435
  CREATE ROLE postgres WITH LOGIN SUPERUSER PASSWORD '{take-from-env}'
```

# Heroku CLI

First of all do

`heroku login`

## Backend logs

`heroku logs --app=supag-pup-backend`