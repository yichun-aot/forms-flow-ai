# FormsFlow.AI Web Application

**FormsFlow.AI** delivers progressive web application with React version `16.3` and `create-react-app`

A React library for rendering out forms based on the form.io platform.

## Table of Content
* [Prerequisites](#prerequisites)
* [Solution Setup](#solution-setup)
  * [Step 1 : Keycloak Setup](#keycloak-setup)
  * [Step 2 : Installation](#installation)
  * [Step 3 : Running the Application](#running-the-application)
  * [Step 4 : Health Check](#health-check)
* [How to Create Your First Form](#how-to-create-your-first-form)

## Prerequisites

The system is deployed and run using [docker-compose](https://docker.com) and [Docker](https://docker.com). These need to be available.
There needs to be a [Keycloak](https://www.keycloak.org/) server available and you need admin privileges (to create realms, users etc. in Keycloak).

## Solution Setup

### Keycloak Setup

* Login to KeyCloak Realm with admin privileges
* For client **forms-flow-web** creation, follow the instructions given on [link](../forms-flow-idm/keycloak-setup.md)


### Installation

   * Make sure you have a Docker machine up and running.
   * Make sure your current working directory is forms-flow-web.
   * Rename the file **sample.env** to **.env**.
   * Modify the configuration values as needed. Details below,

 Variable name | Meaning | Possible values | Default value |
 --- | --- | --- | ---
 `NODE_ENV`| Define project level configuration | `development, test, production` | `development`
 `CLIENT_ROLE`|	The role name used for client users|| formsflow-client
 `CLIENT_ROLE_ID`|form.io client role Id|eg. 10121d8f7fadb18402a4c|must get the value from form.io resource **http://localhost:3001/role**
 `REVIEWER_ROLE`|The role name used for staff/reviewer users||`formsflow-reviewer`
 `REVIEWER_ROLE_ID`|form.io reviewer role Id|eg. 5ee10121d8f7fa03b3402a4d|must get the value from form.io resource **http://localhost:3001/role**
 `DESIGNER_ROLE`|The role name used for designer users||`formsflow-designer`
 `DESIGNER_ROLE_ID`|form.io administrator role Id|eg. 5ee090afee045f1597609cae|must get the value from form.io resource **http://localhost:3001http://localhost:3001/role**
 `ANONYMOUS_ID`|form.io anonymous role Id|eg. 5ee090b0ee045f28ad609cb0|must get the value from form.io resource **http://localhost:3001/role**
 `USER_RESOURCE_ID`|User forms form-Id|eg. 5ee090b0ee045f51c5609cb1|must get the value from form.io resource **http://localhost:3001/user**
 `FORMIO_DEFAULT_PROJECT_URL`|The URL of the form.io server||`http://localhost:3001`
 `INSIGHT_API_BASE`|Insight Api base end-point||`http://localhost:7000`
 `INSIGHT_API_KEY`|API_KEY from REDASH|eg. G6ozrFn15l5YJkpHcMZaKOlAhYZxFPhJl5Xr7vQw| must be set to your ReDash API key
 `WEB_API_BASE_URL`|FormsFlow Rest API URI||`http://localhost:5000/api`
* Update Keycloak configuration in file **public/config/kc/keycloak.json**

Steps to get the client adapter configuration from Keycloak:
  - Login to Keycloak
  - Select your realm --> Go to clients tab --> Click on your client ID i.e."forms-flow-web" --> Go to Installation tab --> Select Format option as Keycloak OIDC JSON
  - Copy the JSON data
  - Update the content in file **public/config/kc/keycloak.json**

### Running the application
   * Run `docker-compose up -d` to start.

#### To stop the application
   * Run `docker-compose down` to stop.

### Health Check

   The application should be up and available for use at port defaulted to 3000 in application.yaml http://localhost:3000/

### How to Create Your First Form
  * Login to **http://localhost:3000/** using valid **designer** credentials
  * Navigate to menu **Forms**
  * Click the button **+ Create Form** to launch the form designer studio.
  * Design the form using **Drag and Drop** of components from LHS to RHS and publish by clicking the button **Create Form**.

To know more about form.io, go to https://help.form.io/userguide/introduction/.


