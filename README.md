<a href="https://lambdaschool.com/">
    <img src="https://res.cloudinary.com/endrsd/image/upload/v1567546601/lambda_logo_ffimws.png" title="Lambda School Logo" width="200" align="right">
</a>

# The 'ENDRSD' Project

![MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)
![Express](https://img.shields.io/badge/Express-v4.17.1-blue)
![Knex](https://img.shields.io/badge/Knex-v0.19.1-orange)
![Code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)
[![GitHub issues](https://img.shields.io/github/issues/labs15-career-endorsement-tracker/frontend)](https://github.com/labs15-career-endorsement-tracker/frontend/issues)
[![GitHub forks](https://img.shields.io/github/forks/labs15-career-endorsement-tracker/frontend)](https://github.com/labs15-career-endorsement-tracker/frontend/network)
[![GitHub stars](https://img.shields.io/github/stars/labs15-career-endorsement-tracker/frontend)](https://github.com/labs15-career-endorsement-tracker/frontend/stargazers)

<p align="center">
    <a href="#">
        <img src="https://res.cloudinary.com/endrsd/image/upload/v1568002293/new_logo_ltlpkr.png" alt="New ENDRSD logo" width="400">
    </a>
</p>

## Project Overview

"ENDRSD" is a capstone project that was built as a centralized location for Lambda School students to access track-specific career endorsement requirements, as well as provide students with a fun and engaging way to track their career endorsement progress.

# API Documentation

#### Backend delpoyed at STAGING: [HEROKU](https://endrsd-api-staging.herokuapp.com/) <br>

#### Backend delpoyed at PRODUCTION: [HEROKU](https://endrsd-api.herokuapp.com/) <br>

## Getting started

To get the server running locally:

1.  Clone this repo
2.  Run **yarn install** in the terminal, while in the root directory, to install all the required dependencies
3.  Create a local PostgreSQL database for development
    -   Reference [this article](https://www.freecodecamp.org/news/how-to-get-started-with-postgresql-9d3bc1dd1b11/) or [this document](https://github.com/Lambda-School-Labs/Labs8-OfflineReader/wiki/Setting-up-a-PostgreSQL-database-for-local-testing) for help
4.  Run **touch .env** in the terminal, while in the root directory, to create a file for your environment variables:
    -   DATABASE_URL
    -   AUTH_JWT_SECRET
    -   EMAIL_JWT_SECRET
    -   EMAIL_ADDRESS_SENDER
    -   EMAIL_ADDRESS_PASSWORD
    -   EMAIL_URL_RESET_PASSWORD
5.  Run migrations and seeds
    -   migrations **yarn knex:migrate:latest**
    -   seeds **yarn knex:seed:run**
6.  Run **yarn dev** to connect to your local server, using the development environment

To run the test server

1. Create a database in your postgres server called `test_endrsd`
2. Add the following environment variable to the _.env_ file:
    - TEST_DATABASE_URL
3. **yarn test** to start server using testing environment

## Tech Stack

#### Node.js

-   Node.js offers easy scalability because it can handle a large number of simultaneous connections with high throughput.
-   Using node.js allows developers who are familiar with JavaScript, to develop both the client-side and server-side applications using a single programming language.
-   Node.js takes less time to learn because it utilizes an already popular client-side scripting language---JavaScript.
-   Support for node.js is readily available because of the large and active community behind it.
-   Node.js is able to take advantage of caching things within the appliation memory for faster load times.

#### PostgreSQL

-   PostgreSQL is a type of relational database that is open source and freely available for anyone to use.
-   SQL databases have a reputation for being more reliable because they have ben tried and tested longer than their NoSQL counterparts.
-   The source code for PostgreSQL was developed by a large community that has created numerous online resources for support.
-   The strongly-typed schemas with a SQL database leave very little room for errors.

#### Knex.js

-   A SQL query builder that integrates well with a PostgreSQL database.
-   Allows for 'migragtions', which makes it easier to manage tables within the PostgreSQL database.
-   It can create sequential files with timestamps and even manage table alterations.
-   Allows for the creation of 'seeds', which can be used to consistently populate the database.

## Endpoints

#### User Routes

| Method | Endpoint                                | Access Control | Description                                                                                                                                                                 |
| ------ | --------------------------------------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GET    | `/api/v2/requirements`                  | all users      | Returns a list of the user's endorsement requirements                                                                                                                       |
| POST   | `/api/v2/users`                         | all users      | Returns `{userId: Int, token: String }`                                                                                                                                     |
| POST   | `/api/v2/login`                         | all users      | Returns an object with token and userId.                                                                                                                                    |
| GET    | `/api/v2/tracks`                        | all users      | Returns a list of all available tracks                                                                                                                                      |
| GET    | `/requirements/:requirementsId/steps`   | all users      | Gets a list of the steps for a given requirement, ordered by step number, with flag for completion                                                                          |
| PUT    | `/requirements/:requirementsId/steps`   | all users      | Mark a step complete or incomplete: send the current state of the step. If its is_complete flag is currently true, send {is_complete:true} and it will be marked incomplete |
| GET    | `/users/:userId`                        | all users      | Get a user object with progress propery indicatin completion of all user requirements, and a coach property indicating if the the user is pinned by a coach                 |
| POST   | `/api/v2/reset-password`                | all users      | Sends a reset password email to the user                                                                                                                                    |
| PUT    | `/api/v2/users`                         | all users      | Updates the user info                                                                                                                                                       |
| DELETE | `/api/v2/users`                         | all users      | Deletes the user                                                                                                                                                            |
| GET    | `/api/v2/students`                      | coaches        | Returns a list of the students that the coach has pinned                                                                                                                    |
| PUT    | `/api/v2/students/:studentId`           | coaches        | Pins/unpins a student to a coach, returns the updated list of pinned students                                                                                               |
| GET    | `/api/v2/users/:studentId/requirements` | coaches        | Gets a list of a user's requirements with progress and resources                                                                                                            |

## Endpoint Examples

#### POST /api/v2/login

##### REQUEST

```
Body
{
        email: "bob_ross@happylittlemistakes.com",
        password: "Password1234!"
}
```

##### RESPONSE

```
{
  "token": "eyQiOjEsImlhdCI6MTU2NjkyODU0MywiZXhwIjoxNTY3MDE0O",
  "userId": 1
}
```

#### GET /api/v2/requirements

##### REQUEST

```
Headers
{
  authorization: bearer token
}
```

##### RESPONSE

```
[
    {
        "id": 1,
        "tracks_id": 1,
        "tasks_id": 1,
        "title": "Update Resume",
        "is_required": true,
        "tasks_description": "Update your resume to include your recent work history",
        "is_endorsement_requirement": true,
        "progress": 67,
        "resources": [
            {
                "id": 1,
                "type": "google_doc",
                "title": "Action verbs for technical resumes",
                "url": "https://docs.google.com/document/d/1wZkDPBWtQZDGGdvStD61iRx_jOWVlIyyQl9UOYHtZgA/edit",
                "description": null,
                "tasks_id": 1
            },
            {
                "id": 2,
                "type": "google_doc",
                "title": "Power statement article",
                "url": "https://www.linkedin.com/pulse/20140929001534-24454816-my-personal-formula-for-a-better-resume/",
                "description": null,
                "tasks_id": 1
            },
            {
                "id": 3,
                "type": "google_doc",
                "title": "'Lambda is…' paragraphs",
                "url": "https://docs.google.com/document/d/19OxIgJYkLMq4c1o5zHu1Na4a3PYcyutOosVfg6a03RI/edit",
                "description": null,
                "tasks_id": 1
            }
        ]
    },
    {
        "id": 5,
        "tracks_id": 1,
        "tasks_id": 5,
        "title": "Green GitHub with quality contributions",
        "is_required": true,
        "tasks_description": "You should have quality contributions in your git hub",
        "is_endorsement_requirement": true,
        "progress": 67,
        "resources": []
    }
]
```

#### GET /api/v2/tracks

##### REQUEST

```

```

##### RESPONSE

```
[
    {
        "id": 1,
        "title": "Full-Stack Web"
    },
    {
        "id": 2,
        "title": "iOS"
    },
    {
        "id": 3,
        "title": "Data Science"
    },
    {
        "id": 4,
        "title": "Android"
    },
    {
        "id": 5,
        "title": "UX Design"
    }
]
```

#### GET /api/v2/requirements/:requirementsId/steps

##### REQUEST

```
Headers
{
  authorization: bearer token
}
```

##### RESPONSE

```
[
    {
        "id": 1,
        "number": 1,
        "steps_description": "Get started with Creddle or Novoresume as a template. You can also use your own, but Creddle and Novoresume look great and take the guesswork out of formatting!",
        "is_required": true,
        "tasks_id": 1,
        "is_complete": true
    },
    {
        "id": 2,
        "number": 2,
        "steps_description": "Use the resume rubric and resume deep-dive to make sure you’re including all required sections in your resume",
        "is_required": true,
        "tasks_id": 1,
        "is_complete": true
    },
    {
        "id": 3,
        "number": 3,
        "steps_description": "Submit your resume for a free review through CV Compiler",
        "is_required": true,
        "tasks_id": 1,
        "is_complete": false
    }
]
```

#### PUT /api/v2/requirements/:requirementsId/steps/:stepsId

##### REQUEST

```
Headers
{
  authorization: bearer token
}
```

```
Body
{
	"is_complete": false
}
```

##### RESPONSE

```
[
    {
        "id": 1,
        "number": 1,
        "steps_description": "Get started with Creddle or Novoresume as a template. You can also use your own, but Creddle and Novoresume look great and take the guesswork out of formatting!",
        "is_required": true,
        "tasks_id": 1,
        "is_complete": true
    },
    {
        "id": 2,
        "number": 2,
        "steps_description": "Use the resume rubric and resume deep-dive to make sure you’re including all required sections in your resume",
        "is_required": true,
        "tasks_id": 1,
        "is_complete": true
    },
    {
        "id": 3,
        "number": 3,
        "steps_description": "Submit your resume for a free review through CV Compiler",
        "is_required": true,
        "tasks_id": 1,
        "is_complete": false
    }
]
```

#### GET /api/v2/user/:userId

##### REQUEST

```
Headers
{
  authorization: bearer token
}
```

##### RESPONSE

```
{
    "first_name": "Bob",
    "last_name": "Ross",
    "email": "bob_ross11@gmail.com",
    "tracks_id": 1,
    "is_admin": false,
    "tracks_title": "Full-Stack Web",
    "id": 1011,
    "calendly_link": null,
    "progress": 0,
    "coach": {
        "first_name": "admin",
        "last_name": "admin",
        "email": "admin@admin.com",
        "tracks_id": null,
        "is_admin": true,
        "tracks_title": null,
        "id": 1010,
        "calendly_link": null
    }
}
```

#### GET /api/v2/users

##### REQUEST

```
Headers
{
  authorization: bearer token
}
```

##### RESPONSE

```
[
    {
        "id": 1,
        "first_name": "bob",
        "last_name": "ross",
        "email": "bob_ross@happylittlemistakes.com",
        "device_token": null,
        "is_admin": false,
        "tracks_id": 1
    },
    {
        "id": 2,
        "first_name": "Cora",
        "last_name": "Trantow",
        "email": "cora.trantow56@hotmail.com",
        "device_token": null,
        "is_admin": false,
        "tracks_id": 2
    },
    {
        "id": 3,
        "first_name": "Shanie",
        "last_name": "Streich",
        "email": "shanie_streich@gmail.com",
        "device_token": null,
        "is_admin": false,
        "tracks_id": 4
    },
    {
        "id": 4,
        "first_name": "Jillian",
        "last_name": "Terry",
        "email": "jillian_terry@yahoo.com",
        "device_token": null,
        "is_admin": false,
        "tracks_id": 5
    }
]
```

#### POST /api/v2/reset-password

##### REQUEST

```

```

##### RESPONSE

```
OK
```

#### PUT /api/v2/users

##### REQUEST

```
Headers
{
  authorization: bearer token
}
```

##### RESPONSE

```
OK
```

#### DELETE /api/v2/users

##### REQUEST

```
Headers
{
  authorization: bearer token
}
```

##### RESPONSE

```
OK
```

#### GET /api/v2/students

##### REQUEST

```
Headers
{
  authorization: bearer token
}
```

##### RESPONSE

```
[
    {
        "id": 2,
        "first_name": "Johnny",
        "last_name": "Schumm",
        "email": "johnny_schumm23@hotmail.com",
        "is_admin": false,
        "tracks_id": 1,
        "calendly_link": null,
        "progress": 0
    }
]
```

#### PUT /api/v2/students/:studentId

##### REQUEST

```
Headers
{
  authorization: bearer token
}
```

##### RESPONSE

```
[
    {
        "id": 2,
        "first_name": "Johnny",
        "last_name": "Schumm",
        "email": "johnny_schumm23@hotmail.com",
        "is_admin": false,
        "tracks_id": 1,
        "calendly_link": null,
        "progress": 0
    }
]
```

#### GET /api/v2/users/:userId/requirements

##### REQUEST

```
Headers
{
  authorization: bearer token
}
```

##### RESPONSE

```
[
    {
        "id": 1,
        "tracks_id": 1,
        "tasks_id": 1,
        "title": "Update Resume",
        "is_required": true,
        "tasks_description": "Update your resume to include your recent work history",
        "is_endorsement_requirement": true,
        "progress": 0,
        "resources": [
            {
                "id": 1,
                "type": "unspecified",
                "title": "Creddle",
                "url": "http://creddle.io/",
                "description": null,
                "tasks_id": 1
            },
            {
                "id": 2,
                "type": "unspecified",
                "title": "NovoResume",
                "url": "https://novoresume.com/resume-templates",
                "description": null,
                "tasks_id": 1
            }
        ]
    },
    {
        "id": 2,
        "tracks_id": 1,
        "tasks_id": 2,
        "title": "LinkedIn Profile",
        "is_required": true,
        "tasks_description": "You must have an updated LinkedIn profile including a clear headshot and cover photo, personal summary. Reference your portfolio site here, work experiences, with descriptions (only include Lambda under work if you were a PM), projects.",
        "is_endorsement_requirement": true,
        "progress": 0,
        "resources": [
            {
                "id": 13,
                "type": "unspecified",
                "title": "LinkedIn Rubric",
                "url": "https://drive.google.com/file/d/1fgBBDBSoZwCB8exoRSFy20MpGZxNd6zq/view?usp=sharing",
                "description": null,
                "tasks_id": 2
            },
            {
                "id": 14,
                "type": "google_doc",
                "title": "LinkedIn Deep Dive",
                "url": "https://docs.google.com/document/d/1Gp4ZjEwRUY2a1dcbXK0Ml5LE4ZzWRnUjHa9pJnNFIpo/edit?usp=sharing",
                "description": null,
                "tasks_id": 2
            }
        ]
    }
]
```

# Data Model

[View on dbdesigner.net](https://app.dbdesigner.net/designer/schema/0-untitled-621fa2f2-75bd-4eb4-ab98-6f7a5914d0e4)

#### TRACKS

---

```
{
  id: INT
  title: STRING
}
```

#### USERS

---

```
{
  id: INT
  tracks_id: INT foreign key in TRACKS table
  first_name: STRING
  last_name: STRING
  email: STRING
  password: STRING
  is_admin: BOOLEAN,
  calendly_link: STRING,
  created_at: DATE with TIMEZONE
}
```

#### TASKS

---

```
{
  id: INT
  title: STRING
  is_required: BOOLEAN
  tasks_description: TEXT
  is_endorsement_requirement: BOOLEAN
}
```

#### TASKS_TRACKS

---

```
{
  id: INT
  tracks_id: INT foreign key in TRACKS table
  tasks_id: INT foreign key in TASKS table
}
```

#### RESOURCES

---

```
{
  id: INT
  type: STRING
  title: STRING
  url: STRING
  tasks_id: INT foreign key in TASKS table
}
```

#### STEPS

---

```
{
  id: INT
  number: INT
  steps_description: TEXT
  is_required: BOOLEAN
  tasks_id: INT foreign key in TASKS table
}
```

#### USER_STEPS_COMPLETED

---

```
{
  id: INT
  user_id: INT foreign key in USER table
  steps_id: INT foreign key in STEPS table
  created_at: DATE
}
```

#### PINNED STUDENTS

---

```
{
  id: INT
  coach_id: INT foriegn ket in USER table
  student_id: INT foriegn ket in USER table
  created_at: DATE with TIMEZONE
  updated_at: DATE with TIMEZONE
}
```

## Actions

### Users

`findUsers()` -> Returns all users

`findUsersBy(filter)` -> Returns a user or users by any filter

`findUserNoPassword(userId)` -> Returns a user without their password, found by user id

`getProgress(user)` -> Gets a users overall progress by their id

`getUserWithProgress(userId)` -> Returns a user without their password, found by user id, with a progress property

`insertUser(newUserData)` -> Adds a user to the database, returns the new user's id

`deleteUserById(userId)` -> Deletes a user at the given id

`userUpdate(userId, userData)` -> Updates the user info for the given id

### Tracks

`findAllTracks()` -> Gets all tracks

### Steps

`findStepsByTask(userId)` -> Finds all the steps for a task
`getFormattedSteps(taskId, userId)` -> Gets the steps for a task with completion flag

### Resources

`findResourcesForRequirement(taskId)` -> Gets all the resources for a requirement

### Requirements

`getRequirementProgress(userId, taskId)` -> Returns just an int, the progress a user has made on a requirement, calculated by completion of steps

`findRequirementsByTrack(trackId)` -> find all the requirements (just endorsement requirements not including assignments) by track id

`getRequirementsWithProgress(userId, trackId)` -> returns a list of requirements with a progress property

`getRequirementsWithProgressAndResources(userId, trackId)` -> returns a list of requirements with a progress property and a resources property containing an array of resources

### Completed Steps

`findCompletedStepsForTaskByUser(userId, taskId)` -> returns completed steps for a specific task for a specific user

`findCompletedStepsBy(filter)` -> returns steps from the user_steps_completed table either by user_id or steps_id

`findCompletedRequirementStepsByUser(userId)` -> returns all the completed steps for JUST ENDORSEMENT REQUIREMENTS for just the user

`markComplete(userId, stepId)` -> adds an entry to the user_steps_completed table, where userId and stepId

`markIncomplete(userId, stepId)` -> deletes an entry from the user_steps_completed table, where userId and stepId

## Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:

_ DATABSE_URL - the postgres string for your local development postgres server, recommended format:
`postgres://username:userpassword@localhost/dbname`
_ NODE_ENV - set to "development" until ready for "production"
\_TEST_DATABASE_URL - the postgres string for your testing enviroment, with the same format as your DATABASE_URL
\_JWT_SECRET - you can generate this by using a python shell and running import random''.join([random.SystemRandom().choice('abcdefghijklmnopqrstuvwxyz0123456789!@#\$%^&amp;\*(-*=+)') for i in range(50)])

## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

**If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**

-   Check first to see if your issue has already been reported.
-   Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
-   Create a live example of the problem.
-   Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

-   Ensure any install or build dependencies are removed before the end of the layer when doing a build.
-   Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
-   Ensure that your code conforms to our existing code conventions and test coverage.
-   Include the relevant issue number, if applicable.
-   You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Contributors

|                                                                                                                    [Isaac Houle](https://github.com/clem9281)                                                                                                                    |                                                                                                                  [Adam Mathieson](https://github.com/adammathieson)                                                                                                                   |                                                                                                                   [Hunter Raffety](https://hunterraffety.io/)                                                                                                                   |                                                                                                             [Leilani Schi- mmelfennig](https://github.com/lschimm)                                                                                                              |                                                                                                                 [Mikis Woodwinter](https://github.com/miikis)                                                                                                                  |                                                                                                              [Tico Thep- sourinthone](https://heytico.com)                                                                                                               |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| [<img src="https://media.licdn.com/dms/image/C5603AQEMgyFhyy-WOw/profile-displayphoto-shrink_200_200/0?e=1573084800&v=beta&t=sYDbGFkngXstWFpKYK3veQxx2eSmOkfAtJ3Jmm7tqu8" width= "110" height="auto" style="object-fit:cover; overflow:hidden;" />](https://github.com/clem9281) | [<img src="https://media.licdn.com/dms/image/C5603AQGhMHYDPQtOZw/profile-displayphoto-shrink_200_200/0?e=1573084800&v=beta&t=jw_OgUvsXguHXEfLJMUZOWibUXYBuGuk6OUW0zdzSkc" width= "110" height="auto" style="object-fit:cover; overflow:hidden;" />](https://github.com/adammathieson) | [<img src="https://media.licdn.com/dms/image/C5603AQHMP_uLd-zA2w/profile-displayphoto-shrink_200_200/0?e=1573084800&v=beta&t=7V72CSVPo8e5M0jpu5KdkOSaJxLGiJerdQbjKZXTwSk" width= "110" height="auto" style="object-fit:cover; overflow:hidden;"  />](https://hunterraffety.io/) | [<img src="https://media.licdn.com/dms/image/C4E03AQHAEef3W60uIA/profile-displayphoto-shrink_200_200/0?e=1573084800&v=beta&t=XzXK-HRJNkINx4rnNRCRsMdMrc1eo6P6stF4RW2OqKM" width= "110" height="auto" style="object-fit:cover; overflow:hidden;" />](https://github.com/lschimm) | [<img src="https://media.licdn.com/dms/image/C5603AQGm-tCUYO3Pog/profile-displayphoto-shrink_200_200/0?e=1573084800&v=beta&t=Mqz8GBXT-RvGmt5HynoQ9wBlvDOUyIv5eBexDfZPPME" width= "110" height="auto" style="object-fit:cover; overflow:hidden;" />](https://github.com/miikis) | [<img src="https://media.licdn.com/dms/image/C4E03AQGIjp9UmRoNXA/profile-displayphoto-shrink_200_200/0?e=1573084800&v=beta&t=p2pz2FMpiP7p40p6E2RHNglAjRz3HJI-W3vOUHAESuA" width= "110" height="auto" style="object-fit:cover; overflow:hidden;" />](https://heytico.com) |
|                                                                                              [<img src="https://github.com/favicon.ico" width="25"> ](https://github.com/clem9281)                                                                                               |                                                                                              [<img src="https://github.com/favicon.ico" width="25"> ](https://github.com/adammathieson)                                                                                               |                                                                                           [<img src="https://github.com/favicon.ico" width="25"> ](https://github.com/hunterraffety)                                                                                            |                                                                                              [<img src="https://github.com/favicon.ico" width="25"> ](https://github.com/lschimm)                                                                                               |                                                                                              [<img src="https://github.com/favicon.ico" width="25"> ](https://github.com/miikis)                                                                                               |                                                                                          [<img src="https://github.com/favicon.ico" width="25"> ](https://github.com/ticotheps)                                                                                          |
|                                                                      [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="25"> ](https://www.linkedin.com/in/isaac-houle-090020174/)                                                                      |                                                                       [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="25"> ](https://www.linkedin.com/in/adam-mathieson-b92369128/)                                                                       |                                                                         [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="25"> ](https://www.linkedin.com/in/huntersraffety/)                                                                         |                                                                [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="25"> ](https://www.linkedin.com/in/leilani-schimmelfennig-707477116/)                                                                |                                                                            [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="25"> ](https://www.linkedin.com/in/miikis/)                                                                             |                                                                        [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="25"> ](https://www.linkedin.com/in/ticotheps/)                                                                        |

## Documentation

See [Frontend Documentation](https://github.com/labs15-career-endorsement-tracker/frontend) for details on the frontend of our project.
See [iOS Documentation](https://github.com/labs15-career-endorsement-tracker/iOS) for details on the iOS app of our project.
