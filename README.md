mr.vladimir.ice@gmail.com


# Startup surveys server

## Notice
* This is simplified backend application. Main goal - to provide a backend functionality for the React part of the 
applications. This architecture solutions are not optimal here.

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
* A survey.


## TODO
* Move credits price to the MongoDb and fetch the data from it
* Add RequestWithUser to all desired express requests
* Autotests
* Send emails on the background
