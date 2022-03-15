# AN ONLINE INTERACTIVE QUIZ GAME PLATFORM

<!-- badges -->
[![MIT license](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/mit-license.php)
[![GitHub latest commit](https://img.shields.io/github/last-commit/u-s-c-l/i-t-t-w-s-d-server.svg)](https://github.com/u-s-c-l/i-t-t-w-s-d-server)
[![GitHub forks](https://img.shields.io/github/forks/u-s-c-l/i-t-t-w-s-d-server.svg)](https://github.com/u-s-c-l/i-t-t-w-s-d-server)

This repo hosts the server side of an interactive quiz game.

## Installation & Usage
---

### Installation

* Clone the repo.
* Open terminal and navigate to `/i-t-t-w-s-d-server/api` folder.
* Run `npm i` to install dependencies.
* Navigate back to `/i-t-t-w-s-d-server` folder.
   
### Usage

`bash _scripts/startDev.sh`
- starts api & db services
- runs db migrations
- seeds db for development
- serves api on `localhost:3003`

`bash _scripts/teardown.sh`
- stop all running services
- removes containers
- removes volumes

`bash _scripts/startTest.sh`
- starts api & db services
- runs db migrations
- attaches to api container and triggers full test run
- no ports mapped to local host

`bash _scripts/coverage.sh`
- starts api & db services
- runs db migrations
- attaches to api container and triggers full test coverage run
- no ports mapped to local host


### Technologies

* [node.js 🔗](https://nodejs.org/) 
* [express 🔗](https://expressjs.com/)
* [Mongodb]()
* [docker 🔗](https://docker.com/)
* [Jest 🔗](https://jestjs.io/)
* [Socket.io]()

### Deployment

This server is currently deployed at ...heroku.....

---
# Routes

## Auth Routes

| **URL** | **HTTP Verb** |  **Action**| 
|------------|-------------|------------|
| /auth/login             | POST      | authentication  | 
| /auth/register          | POST      | authentication | 

### Posted object for login request

```json
{
"username": "new_username",
"password":"new_password"
}
```

### Posted object for login request

```json
{
"username": "Frank",
"password":"frank_password"
}
```


## User Routes

| **URL** | **HTTP Verb** |  **Action**| 
|------------|-------------|------------|
| /user          | GET      | index  | 
| /user/:username| GET      | show  | 

## Score Routes

| **URL** | **HTTP Verb** |  **Action**| 
|------------|-------------|------------|
| /scores                            | GET       | index  | 
| /scores/username/:username         | GET       | show  | 
| /scores/cat/:cat                   | GET       | show  | 
| /scores/username/:username/cat/:cat| GET       | show  |  
| /scores/leadersboard               | GET       | show  |  
| /scores/post                       | POST      | post and update  |  
| /scores/username/:username         | DELETE    | destroy |  


### Posted object for the score POST request

```json
{
"username": "Frank",
"cat":"science fiction",
"score": 28
}
```



