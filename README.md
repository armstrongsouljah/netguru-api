## Netguru Movies Api
A nodejs API that allows users to create and save a movie catalog based on the titles they like.

#### Technical requirements
- Nodejs 14 or higher
- docker installation
- docker-compose installation
- api key from [omdbapi](https://omdbapi.com/)
- mongodb DATABASE_URI from [mongo atlas](https://cloud.mongodb.com/)
- postman
- linux/macOs/Windows with a working installation of the above

#### Test API locally
- clone this repository `git clone https://github.com/armstrongsouljah/netguru-api.git`
- create a `.env` in the root of the project and populate it with the following 
  ```
  PORT=5050
  DATABASE_URL=mongo-cloud or local database uri
  MOVIES_URL='https://www.omdbapi.com/'
  API_KEY='fefefefef' key from ombdapi
  ```

- cd `auth-service` and run npm install
- cd backup to netguru-api and run npm install

- run with docker
- in the root of the project
- type `docker-compose up`
- open postman using the button below

#### Postman Documentation

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/5140285-dfc2cacd-73ab-4f23-8f57-8678bc39cf99?action=collection%2Ffork&collection-url=entityId%3D5140285-dfc2cacd-73ab-4f23-8f57-8678bc39cf99%26entityType%3Dcollection%26workspaceId%3Db23ac272-caa1-48c3-ac2c-f8e4d15aa05b).

#### Contact Author
[Twitter](https://twitter.com/armstrongsenior)