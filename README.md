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
    
You will need to go into the authentication.service.ts which is within the src/app/_services directory to input your client id and client secret.    Modify the following:

urlSearchParams.set('client_id', '<<your client id here>>');
urlSearchParams.set('client_secret', '<<your client secret here>>');

These parameters should be in a properties file to be ideal.  Just wanted to keep it simple for now.


### Final Steps

Finally, you're ready to execute

    npm install (first time only)
    npm start

And from here, you can navigate to http://localhost:8082/login to ensure the application has started.

Copy the following url into your browser to start this application.   Change <Client Id> to the client id of your application which you should have received via the application registration process mentioned above. 

https://sandbox.bluebutton.cms.gov/v1/o/authorize/?client_id=<Client Id>&redirect_uri=http://localhost:8082/login&response_type=code&state=test1


Use test user of BBUser29999 and password of PW29999! for a sample beneficiary once the MyMedicare.gov login screen appears. 

Follow the steps on the Angular login screen once it appears. 

