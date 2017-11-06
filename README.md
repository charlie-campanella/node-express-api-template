# API Template

An open-source template used to quickly bootstrap a RESTful API powered by Node.js/Express/MongoDB. Feel free to use this template when building your next medium-large scale Node.js project!

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Before installation, please ensure that your system has Node.js/NPM installed. Visit [this page](https://nodejs.org/en/download/) for installation instructions. This application was developed and tested using **Node.js v6.11.2**.

### Installing

First, open a new terminal window and **cd** into this directory.

Next, install all required NPM modules by running the following command:

```
  npm install
```

To launch the application in **development** mode, ensure that the **.env** file in this directory contains the following:

```
  NODE_ENV=development
```

*...otherwise...*

```
  NODE_ENV=production
```

Finally, **start** the application with the following command:

```
  npm start
```

## Running Tests

This application contains a full suite of unit, integration, and end-to-end (e2e) tests. All tests are contained within the **./test** directory. Run the full suite of tests with the following command:

```
  npm test
```

### Unit Tests

Test the smallest unit of functionality within the project.

### Integration Tests

Combine units of code and testing that the resulting combination works correctly. Suite requires an internet connection to run properly due to the required access of external services and application programming interfaces.

## Deployment

Instructions on deployment via continuous integration go here.

## Documentation

This application uses [JSDoc](http://usejsdoc.org/index.html) to generate thorough code documentation on-the-fly. To generate and view the code documentation, run the following command in your terminal window:

```
  npm run-script docs
```

## Built With

* [Node.js](https://nodejs.org/en/) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
* [Express](https://expressjs.com/) - Express is a fast, unopinionated, minimalist web framework for Node.js
* [Mongoose](http://mongoosejs.com/) - Elegant MongoDB object modeling for Node.js

## Followed Conventions

* [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
* [Node Style Guide (felixge)](https://github.com/felixge/node-style-guide)
* [JSend](https://labs.omniti.com/labs/jsend)
* [Semantic Versioning](http://semver.org/)

## Authors

* [Charlie Campanella](https://charliecampanella.com)

## License

This project is licensed under the Apache v2.0 License - see the LICENSE.md file for details.

## Acknowledgments

* A big thanks to [Gregg Mojica](https://greggmoji.ca) for helping me compile a list of best practices/conventions to use within this template.
