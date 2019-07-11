# Bobda <!-- omit in toc --> 

[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)
[![npm version](https://badge.fury.io/js/bobda.svg)](https://badge.fury.io/js/bobda)

![logo](https://image.noelshack.com/fichiers/2019/28/4/1562845380-bobda.png)

It's an add-on module for [Ramda](https://ramdajs.com/), so all functions are [curry](https://ramdajs.com/docs/#curry). 

## Table of Contents <!-- omit in toc --> 

- [Installation](#Installation)
- [Documentation](#Documentation)
  - [Async Functions](#Async-Functions)
    - [bromiseMap](#bromiseMap)
    - [bromiseAll](#bromiseAll)
    - [bromiseProps](#bromiseProps)

---

## Installation

```
$ yarn add bobda
```
or
```
$ npm install bobda
```
---

## Documentation

### Async Functions

We used the [Bluebird](http://bluebirdjs.com/docs/getting-started.html) functions and adapted them for use with [Ramda](https://ramdajs.com/)

#### bromiseMap

`bromiseMap(asyncFn : Function, array : Array): Promise`

This function allows to apply a map but with an asynchronous function

**Arguments**

*asyncFn*: The asynchronous function who whant to apply

*array*: The array who want to apply a map

**Exemple**

```js
const squareAsync = async value =>
  new Promise(resolve => setTimeout(() => resolve(value * value), 30));

const array = [2, 3, 4, 5];
bromiseMap(incrementAsync)(array); //=> Promise
```

#### bromiseAll

`bromiseAll(array : Array<Promise>): Promise`

This function allows you to wait until all the promises contained in an array are resolved

**Arguments**

*array*: The array of promise

**Exemple**

```js
const squareAsync = async value =>
  new Promise(resolve => setTimeout(() => resolve(value * value), 30));

const squareAsync = async value =>
  new Promise(resolve => setTimeout(() => resolve(value * value), 30));

const value = 2;
R.juxt([incrementAsync, squareAsync])(value); //=> Promise
```

#### bromiseProps

`bromiseProps(object : Object): Promise`

This function allows you to wait until all the promises contained in an object as key are resolved

**Arguments**

*object*: The array of promise

**Exemple**

```js
const squareAsync = async value =>
  new Promise(resolve => setTimeout(() => resolve(value * value), 30));

const squareAsync = async value =>
  new Promise(resolve => setTimeout(() => resolve(value * value), 30));

const value = 2;
R.applySpec({incrementResult: incrementAsync, squareResult: squareAsync})(value) //=> Promise
```