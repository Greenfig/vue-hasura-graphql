# vue-vanilla

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## Create Heroku - Hasura(GraphQl) App

https://hasura.io/learn/graphql/hasura/authentication/1-create-auth0-app/
https://hasura.io/docs/1.0/graphql/manual/queries/simple-object-queries.html
https://hasura.io/learn/graphql/vue/intro-to-graphql/2-fetching-data-queries/

This prototype has only one model (Jobs)

Hasura creates <model>_by_id query automatically once the table is created

## Hasura Actions
https://hasura.io/blog/introducing-actions/

## Web Socket (ws endpoint) Documentation
https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API

## Table / Fuzzy Search Queries

Add extension
    CREATE EXTENSION pg_trgm;

Create GIN index on required fields
    CREATE INDEX jobs_gin_idx ON jobs
    USING GIN ((position_name || ' ' || description || ' ' || location) gin_trgm_ops);

Create Function
    CREATE FUNCTION job_search (search text)
    RETURNS SETOF jobs AS $$
        SELECT jobs.id, jobs.position_name, jobs.url, jobs.location, SUBSTRING(jobs.description, 1, 150) AS description
        FROM jobs
        WHERE
            search <% (position_name || ' ' || description || ' ' || location)
        ORDER BY
            similarity(search, (position_name || ' ' || description || ' ' || location)) DESC
        LIMIT 5;
    $$ LANGUAGE sql STABLE;

Created function needs to be tracked via hasura's sql cli "track option"