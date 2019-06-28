# Startup surveys server

## Infrastructure

### Servers
* MongoDB - as an example of this database usage. In the real projects PostgreSQL is chosen.

### Development
[Development URL](http://localhost:3000/)


* Docker containers
* PM2 process manager

### Production
[Heroku production URL](http://startup-surveys.sunarmy.pro/)

## How to install

```
    make init-project-linux
```

## Features
* OAuth (Google)
* cookie-based sessions


## TODO
* Move credits price to the MongoDb and fetch the data from it
* Add RequestWithUser to all desired express requests
