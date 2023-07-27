# DIG SIDEKICK ASSIGNMENT
This is the backend part of the DIG SIDEKICK ASSIGNMENT. As instructed by the recruiters, this web service is specifically for implementing CRUD operations over the users' collection. 
MongoDB is used as a database with the Mongoose ODM library for creating schema, modeling, and interacting with the database. Besides, proper validation is applied within the schema in order to maintain
data consistency. The JsonWebToken package is utilized for handling authentication and authorization that is highly secure and reliable. The errors are being handled whether they are 
programming errors or operational errors using express global error handling middleware and the front-end is informed in an appropriate manner with the proper status code and message. To increase the performance of the query indexing system and pagination is applied. The search engine is also enabled via Mongoose query operators. Moreover, the web service is well structured and maintained to mitigate the chances
of error. Below are the complete instructions regarding how to use this web service.

NOTE: You can find the front-end repository for this assignment here 👉👉https://github.com/parvesh001/dig-assignment-client

## FEATURES
- Authentication & Authorization (jwt)
- Error Handling (express error handler)
- CRUD Operations over users' collection (Mongoose)
- Optimized query performance (indexing and pagination)
- Search Engine (query operators)

## INSTALLATION GUIDE
To get started with the web service locally, follow these steps:
1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies.
4. Configure the start script inside package.json file.
5. Configure environment variables:
    - **PORT**= server port must be 8080 as i configured it in front-end.
    -  **MONGO_DATABASE** = mongo uri
    -   **MONGO_USER_PASSWORD** = mongo uri user password
    -    **JSON_WEB_TOKEN_SECRET** = json secret to create signature
    -    **JSON_WEB_TOKEN_EXPIRESIN** = json token expire time.
7. Start the service.

NOTE: Do not forget to create your own cluster in MongoDB.
