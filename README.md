# Startup surveys server

Website: [startup-surveys.sunarmy.pro](https://startup-surveys.sunarmy.pro/)

This is a very simplified backend application for the 
[startup-surveys frontend application](https://github.com/vladimirice/startup-surveys-client).
This repository does not represent backend skills. For the backend skills representation 
please observe the [u.community backend application](https://github.com/UOSnetwork/ucom.backend)

## Features
* An OAuth (Google)
* Cookie-based sessions
* Surveys that are stored inside the MongoDb
* Mailgun integration
* Responses count

## Architecture
* Database - MongoDB
* Docker Compose for the development
* PM2 process manager

## How to install

```
    make init-project-linux
```

[Development URL (localhost)](http://localhost:3000/) 

## Possible improvements 
* Use a PostgreSQL, not MongoDB.
* Send emails in batch. To track who responds to the message - use Mailgun Hooks feature.
* Send emails on the background
* Track who responds to the survey, avoid duplications
* Surveys fields validation
* Autotests
