# Sli.do-like

A simple example of Sli.do ;)

## Prerequisites

- NodeJS (Version 8 or above)
- [RethinkDB](https://www.rethinkdb.com/)
- [Docker](https://www.docker.com/get-docker)

## Getting started

Start dev server (with docker-compose)
```
bash bin/develop.sh
# Or bin/develop.sh
```

*NOTE: If there is an error with client dev server, run the bash command again as it's seem an issue with react-script*

Then open:
- server: localhost:8000
- client: localhoset:3000

## How to install and dev (manually)

For Client-side React app
```
cd ./client
yarn install
yarn start
```

For Server REST API
```
cd ./server
yarn install
yarn start
```

For Datbase
```
cd database
rethinkdb
```

## Stack

Backend: 
- NodeJS (Express)
- Socket.io (real-time updates and interactions)

Frontend
- React.JS
- Redux
- Redux-Saga
- Bulma (CSS framework)

Database
- RethinkDB

Devops
- Docker

## Why?

### Why choose RethinkDB?
- It's scalable
- Support real-time update by default
- Easier to understand and structure
- ..

## Thing to solve ...

- [X] Manage anonymou => To generate token every time anonymous join the event
- [ ] Problem with cleared local-storage and status of question reaction (Able to trick on Sli.do)

## Todo

- [ ] Backend - Setup basic 
- [ ] Backend - Endpoints for
  - [ ] authentication
  - [ ] event creation
  - [ ] fetch event
- [ ] Backend - Socket setup - Event / Room connection 
  - [ ] add question + real-time update
  - [ ] update question + real-time update
  - [ ] delete question + real-time update
  - [ ] react to question + real-time update 
- [ ] Backend - Unit test for
  - [ ] add question + real-time update
  - [ ] update question + real-time update
  - [ ] delete question + real-time update
  - [ ] react to question + real-time update 
  - [ ] authentication
  - [ ] event creation
  - [ ] fetch event
- [ ] Backend - Validation
  - [ ] add question + real-time update
  - [ ] update question + real-time update
  - [ ] delete question + real-time update
  - [ ] react to question + real-time update 
  - [ ] authentication
  - [ ] event creation
  - [ ] fetch event
- [X] Frontend - Configure Redux (Saga)
- [X] Frontend - Setup Router/App Structures
- [X] Frontend - Setup flow including (UI + data handling)
  - [X] Admin - Login / Register
  - [X] Admin - Create Event
  - [X] Admin - Manage Questions in event
  - [X] Audience - Join Event
  - [X] Audience - Add question 
  - [X] Audience - React to question
- [ ] Frontend - Validation
  - [ ] add question + real-time update
  - [ ] update question + real-time update
  - [ ] delete question + real-time update
  - [ ] react to question + real-time update 
  - [ ] authentication
  - [ ] event creation
  - [ ] fetch event

- [ ] Frontend - Redux (Data) Unit-test
  - [ ] Admin - Login / Register
  - [ ] Admin - Create Event
  - [ ] Admin - Manage Questions in event
  - [ ] Audience - Join Event
  - [ ] Audience - Add question 
  - [ ] Audience - React to question
  - [ ] General Components
- [ ] Configure Docker
  - [ ] Frontend
  - [ ] API
  - [ ] Database
 
