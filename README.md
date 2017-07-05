# Security Assessment Tool

This project was generated with the [Angular Full-Stack Generator](https://github.com/DaftMonk/generator-angular-fullstack) version 4.1.0.

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node >= 4.x.x, npm >= 2.x.x
- [Gulp](http://gulpjs.com/) (`npm install --global gulp`)

### Set up

Run `npm install` to install server dependencies.

## Developing

Run `gulp serve` to start the development server. It should automatically open the client in your browser when ready on localhost:3000

Run 'gulp serve:dist' to run production code (stored in _dist/_ directory)

## Build for production

Run `gulp build` for building production-ready code that will run on NodeJS, packaged inside of the _dist/_ directory. If you only want the client files and run the app on your own web server, use the _dist/client_ directory.

## Mainstay Data I/O

Inputs and outputs can be accessed inside a hidden form with an ID of `shadow-form` on their corresponding pages (index page and results page respectively). Question data, along with their dbEntity and dbAnalyticsName values can be altered in `main.component.js`. The UI will adjust to display data as outlined in the `steps` object. Conversely, result data is contained in `results` object of the `results.component.js` file.

### Inputs

Inputs can be updated by triggering a click event in the `#msUpdateInputs` element of the `#shadow-form`.


### Outputs

Outputs can be updated by triggering a click event in the `#msUpdateInputs` element of the `#shadow-form`.
