# Career Endorsement Tracker App (Back-End Repo)

🚫 Note: All lines that start with 🚫 are instructions and should be deleted before this is posted to your portfolio. This is intended to be a guideline. Feel free to add your own flare to it.

🚫 The numbers 1️⃣ through 3️⃣ next to each item represent the week that part of the docs needs to be comepleted by. Make sure to delete the numbers by the end of Labs.

🚫 Each student has a required minimum number of meaningful PRs each week per the rubric. Contributing to docs does NOT count as a PR to meet your weekly requirements.

# API Documentation

#### Backend delpoyed at STAGING: [HEROKU](https://endrsd-api-staging.herokuapp.com/) <br>

#### Backend delpoyed at PRODUCTION: [HEROKU](https://endrsd-api.herokuapp.com/) <br>

## 1️⃣ Getting started

To get the server running locally:

🚫 adjust these scripts to match your project

-   Clone this repo
-   **yarn install** to install all required dependencies
-   **yarn server** to start the local server
-   **yarn test** to start server using testing environment

### Backend framework goes here

🚫 Why did you choose this framework?

-   Point One
-   Point Two
-   Point Three
-   Point Four

## 2️⃣ Endpoints

🚫This is a placeholder, replace the endpoints, access controll, and descriptioin to match your project

#### Organization Routes

| Method | Endpoint                | Access Control | Description                                  |
| ------ | ----------------------- | -------------- | -------------------------------------------- |
| GET    | `/organizations/:orgId` | all users      | Returns the information for an organization. |
| PUT    | `/organizatoins/:orgId` | owners         | Modify an existing organization.             |
| DELETE | `/organizations/:orgId` | owners         | Delete an organization.                      |

#### User Routes

| Method | Endpoint                              | Access Control      | Description                                                                                                                                                                 |
| ------ | ------------------------------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GET    | `/api/v0/requirements`                | all users           | Returns a list of the user's endorsement requirements                                                                                                                       |
| POST   | `/api/v0/users`                       | all users           | Returns `{userId: Int, token: String }`                                                                                                                                     |
| POST   | `/api/v0/login`                       | all users           | Returns an object with token and userId.                                                                                                                                    |
| GET    | `/api/v0/tracks`                      | all users           | Returns a list of all available tracks                                                                                                                                      |
| GET    | `/requirements/:requirementsId/steps` | all users           | Gets a list of the steps for a given requirement, ordered by step number, with flag for completion                                                                          |
| PUT    | `/requirements/:requirementsId/steps` | all users           | Mark a step complete or incomplete: send the current state of the step. If its is_complete flag is currently true, send {is_complete:true} and it will be marked incomplete |
| DELETE | `/users/:userId`                      | owners, supervisors |                                                                                                                                                                             |

## Endpoint Examples

#### POST /api/v0/login

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

#### GET /api/v0/requirements

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
    "tracks_id": 3,
    "tasks_id": 1,
    "title": "Update Resume",
    "is_required": true,
    "tasks_description": "Update your resume to include your recent work history",
    "is_endorsement_requirement": true
  },
  {
    "id": 5,
    "tracks_id": 3,
    "tasks_id": 5,
    "title": "Green GitHub with quality contributions",
    "is_required": true,
    "tasks_description": "You should have quality contributions in your git hub",
    "is_endorsement_requirement": true
  }
]
```

#### GET /api/v0/tracks

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

#### GET /api/v0/requirements/:requirementsId/steps

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

#### PUT /api/v0/requirements/:requirementsId/steps/:stepsId

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

# Data Model

🚫This is just an example. Replace this with your data model

#### 2️⃣ ORGANIZATIONS

---

```
{
  id: UUID
  name: STRING
  industry: STRING
  paid: BOOLEAN
  customer_id: STRING
  subscription_id: STRING
}
```

#### USERS

---

```
{
  id: UUID
  organization_id: UUID foreign key in ORGANIZATIONS table
  first_name: STRING
  last_name: STRING
  role: STRING [ 'owner', 'supervisor', 'employee' ]
  email: STRING
  phone: STRING
  cal_visit: BOOLEAN
  emp_visit: BOOLEAN
  emailpref: BOOLEAN
  phonepref: BOOLEAN
}
```

## 2️⃣ Actions

🚫 This is an example, replace this with the actions that pertain to your backend

`getOrgs()` -> Returns all organizations

`getOrg(orgId)` -> Returns a single organization by ID

`addOrg(org)` -> Returns the created org

`updateOrg(orgId)` -> Update an organization by ID

`deleteOrg(orgId)` -> Delete an organization by ID
<br>
<br>
<br>
`getUsers(orgId)` -> if no param all users

`getUser(userId)` -> Returns a single user by user ID

`addUser(user object)` --> Creates a new user and returns that user. Also creates 7 availabilities defaulted to hours of operation for their organization.

`updateUser(userId, changes object)` -> Updates a single user by ID.

`deleteUser(userId)` -> deletes everything dependent on the user

## 3️⃣ Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:

🚫 These are just examples, replace them with the specifics for your app

_ STAGING_DB - optional development db for using functionality not available in SQLite
_ NODE\*ENV - set to "development" until ready for "production"

-   JWT*SECRET - you can generate this by using a python shell and running import random''.join([random.SystemRandom().choice('abcdefghijklmnopqrstuvwxyz0123456789!@#\$%^&amp;*(-_=+)') for i in range(50)])
    _ SENDGRID_API_KEY - this is generated in your Sendgrid account \* stripe_secret - this is generated in the Stripe dashboard

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

## Documentation

See [Frontend Documentation](🚫link to your frontend readme here) for details on the fronend of our project.
🚫 Add DS iOS and/or Andriod links here if applicable.
