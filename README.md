# Medup

<!-- A simple to use way to see what your local politicians are doing with their elected post. Search by name or ZIP code, or view congress people by state. View district or congress member pages to see information about vote history, party affiliation, and even view recent news. 

Users can create secure accounts using their email in order to save their location and past searches for easy reference.
  
It's now easier than ever to keep tabs on your repesentatives and make sure the **Represent** you. 

## Team

* __Product Owner__: Chris Clark
* __Scrum Master__: Matt Hand
* __Front End Developer__: Auggie Hudak
* __Front End Developer__: Kayla Dowling
* __Full Stack Developer__: Zac Delventhal

**Legacy "Congressional Stalker" Team**

* __Product Owner__: Sean Reimer
* __Scrum Master__: Santosh Gautam
* __Development Team__: Delphine Foo-Matkin
* __Development Team__: Bryan Bierce

## Table of Contents

1. [Usage](#Usage)
2. [Development](#development)
  1. [Requirements](#requirements)
  2. [Installing Dependencies](#installing-dependencies)
  3. [The API's](#the-apis)
  4. [Tasks](#tasks)
3. [Team](#team)
4. [Contributing](#contributing)

## Usage

In order to use the app as a user, simply go to [represent.heroku.com](http://represent.heroku.com) and begin investigating your representatives.

* **Home Page**
* * Type in the name of your congress person to find their page, or a ZIP code to find your district.
* * Click on your state in order to see every congress person broken down by district.
* **Register/Login**
* * Use your email to signup for an account, and save your searches and ZIP code to make your future visits to the site more convenient.
* **Your District**
* * Your district page offers a summation of information on your congressperson in the House of Representatives, as well as your two in the Senate.
* * Has any of your representatives been in the news? Check out the NYTimes feed to the right.
* * For more info, click on the represenative.
* **Your Congressperson**
* * Displays the congress person's bio along with links to their websites.
* * Offers a look at their party loyalty and vote attendance.
* * Displays an in depth analysis fo their ten most recent votes.

## Development

### Requirements

**NPM**:
* bcrypt-nodejs: *0.0.3*
* body-parser: *1.14.2*
* bower: *1.7.2*
* cookie-parser: *1.4.0*
* express: *4.13.3*
* grunt: *0.4.5*
* kerberos: *0.0.17*
* mongoose: *4.3.4*
* morgan: *1.6.1*
* passport: *0.1.17*
* scraperjs: *1.2.0*

**Bower**:
* angular: *1.4.8*
* angular-ui-router: *0.2.15*
* Materialize: *0.97.5*
* angular-resource: *1.4.8*
* jquery: *2.2.0*
* angular-materialize: *0.1.2*
* progressbar.js: *0.9.0*

### Installing Dependencies

From within the root directory:

```
npm install
```
This will install all npm managed dependencies and then run bower install to manage bower dependencies.

###The APIs

To present the vote history to the user we used the New York Times Congress API, The New York Times New API and the Sunlight API. All three require their own API keys, which are not included in this repo. In order to run the page locally you must add a `_config.js` file at the root level of your directory, with the following content:

```
var SESSION_SECRET = '<YOUR SECRET>';
var KEYS = {};

KEYS.NYTIMES_REPS = '<YOUR API KEY>';
KEYS.NYTIMES_NEWS = '<YOUR API KEY>';
KEYS.SUNLIGHT = '<YOUR API KEY>';


module.exports = {
  SESSION_SECRET: SESSION_SECRET,
  KEYS: KEYS
};
```

Where, `<YOUR SECRET>` is any unique string, which will be used to hash your session information, and `<YOUR API KEY>` are your own personal API keys for The Sunlight Project's service, and The New York Time's congressional and news services.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines. -->