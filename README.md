[![Build Status](https://travis-ci.org/typewriterjs/typewriterjs-angular.svg?branch=master)](https://travis-ci.org/typewriterjs/typewriterjs-angular)
[![Coverage Status](https://coveralls.io/repos/github/typewriterjs/typewriterjs-angular/badge.svg?branch=master)](https://coveralls.io/github/typewriterjs/typewriterjs-angular?branch=master)
[![npm version](https://badge.fury.io/js/%40typewriterjs%2Ftypewriterjs-angular.svg)](https://badge.fury.io/js/%40typewriterjs%2Ftypewriterjs-angular)

# TypewriterJs Angular

Angular component library for animating the drawing of text so that it appears to be typed by a person.

# Demo

Please check out samples of the features by visiting [typewriterjs.github.io/typewriterjs-angular](https://typewriterjs.github.io/typewriterjs-angular/)

# Dependencies

This project implements the Angular components for using the [TypewriterJS](https://github.com/typewriterjs/typewriterjs) library, and requires that the library be
installed along side this library. 

# Installation

You need to have an Angular project with the supported Angular version. This project was last updated to work with Angular 7.

To install the library

```
npm install --save @typewriterjs/typewriterjs @typewriterjs/typewriterjs-angular
```

Once installed you need to import the main module.

```
import {TypewriterModule} from '@typewriterjs/typewriterjs-angular';

@NgModule({
    ...
    imports: [TypewriterModule, ...],
    ...
})
export class YourAppModule {
}
```

# Getting help

You are welcome to open issues for general support questions as well as bug reports and feature requests.

