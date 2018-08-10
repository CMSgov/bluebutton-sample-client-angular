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

By default, your application will be set up to use the public OAuth service
at https://dev.bluebutton.cms.fhirservice.net/. In order to use this version of
the service, you'll need to request an account on that site. So select Account ->
"Request an Invite," fill out the form, setting user type to "Developer," and
we'll get back to you as soon as possible.

Once you have your developer account created and you've verified your email address,
you'll need to set up an application. Log in to your new account, and select
"Applications" -> "Applications You Created" -> "Register New Application". From
here, you can fill out the form with the following options:

    Scope: [you likely want to select all available]
    Name: [your choice]
    Client type: Confidential
    Authorization grant type: Authorization Code
    Redirect uris: http://localhost:8082/login



### Final Steps

Finally, you're ready to execute

    npm install (first time only)
    npm start

And from here, you can navigate to http://localhost:8082/login and test your application.

Copy the following url into your browser to start this application..

https://account.mymedicare.gov/?scope=openid%20profile&client_id=bluebutton&state=98161439157483715087066764&redirect_uri=https%3A//sandbox.bluebutton.cms.gov/mymedicare/sls-callback

Use test user of BBUser29999 and password of PW29999! for a sample beneficiary



