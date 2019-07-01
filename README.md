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

MongoDb cloud hosting

## How to install

```
    make init-project-linux
```

## Features
* An OAuth (Google)
* A cookie-based sessions
* Surveys that are stored inside MongoDb

## TODO
* Send actual emails after survey creation
* Catch yes, no responses and update MongoDb stats
* Styles for thanks for your reply + reply stats
* Add RequestWithUser to all desired express requests
* Documentation - workflow and text explanations.

## Future improvements 
* Send emails in batch. In order to track who responds to the message - use Mailgun Hooks feature.
* Send emails on the background
* Autotests
