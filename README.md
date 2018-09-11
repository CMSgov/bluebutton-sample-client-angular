Blue Button Sample Client Application - Angular Version
======================================================

## Introduction

This client demonstrates authenticating to the Blue Buttom API and subsequent FHIR API calls.
It demonstrates the OAuth2 Server Side web application flow where a `client_secret` is used.

## Status and Contributing

The application is in active development so check back often for updates.
Please consider improving this code with your contributions. Pull requests welcome ;)

## Basic Setup

   git@github.com:CMSgov/bluebutton-sample-client-angular.git


### Configuring Your Development Application

Your application will need to be set up to use the Blue Button 2.0 OAuth service.  Go to  https://bluebutton.cms.gov/ for documentation on how to register for a sandbox account and register your application. 

Once you have your developer account created and you've verified your email address,
you'll need to set up an application. Log in to your new account, and select
"Applications" -> "Applications You Created" -> "Register New Application". From
here, you can fill out the form with the following options:

    Scope: [you likely want to select all available]
    Name: [your choice]
    Client type: Confidential
    Authorization grant type: Authorization Code
    Redirect uris: http://localhost:8082/login
    
You will need to go into the remoteappinfo.service.ts which is within the src/app/_services directory to 
input your client id and client secret.    Modify the following lines:

    'client_id': "<your_client_id>",
    'client_secret': "<your_client_secret>",

Replacing <your_client_id> and <your_client_secret> with the values from the application you registered.

These parameters are in a service that can be referenced from other parts of your code.  


### Final Steps

Finally, you're ready to execute

    npm install (first time only)
    npm start

And from here, you can navigate to http://localhost:8082/login to ensure the application has started.

click the "Connect to CMS Medicare Blue Button 2.0" button

Use test user of BBUser29999 and password of PW29999! for a sample beneficiary once the MyMedicare.gov login screen appears. 

After authorizing the application you will be returned to the login screen for the Angular app.
Now fill in the user id and password for the angular app: 
- user: test
- password: test

This should take you to a screen that displays parts of the ExplanationOfBenefit resource record.

