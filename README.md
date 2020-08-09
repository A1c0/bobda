# Bobda <!-- omit in toc -->

[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)
[![npm version](https://badge.fury.io/js/bobda.svg)](https://badge.fury.io/js/bobda)

<a href="https://imgbb.com/"><img src="https://i.ibb.co/5LB5d0Q/1562845380-bobda.png" alt="1562845380-bobda" border="0"></a>

It's an add-on module for [Ramda](https://ramdajs.com/), so all functions are [curry](https://ramdajs.com/docs/#curry).

## Table of Contents <!-- omit in toc -->

- [Installation](#Installation)
- [Documentation](#Documentation)
  - [Async Functions](#Async-Functions)
    - [promiseMap](#promisemap)
    - [promiseAll](#promiseall)
    - [promiseProps](#promiseprops)
  - [Object properties functions](#Object-properties-functions)
    - [renameProp](#renameprop)
    - [renamePath](#renamepath)
    - [multiPath](#multipath)

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

#### promiseMap

`promiseMap(asyncFn : Function, array : Array): Promise`

This function allows to apply a map but with an asynchronous function

**Arguments**

_asyncFn_: The asynchronous function who whant to apply

_array_: The array who want to apply a map

**Exemple**

```js
const {promiseMap} = require('bobda');

const squareAsync = async value =>
  new Promise(resolve => setTimeout(() => resolve(value * value), 30));

const array = [2, 3, 4, 5];
promiseMap(squareAsync)(array); //=> Promise
```

#### promiseAll

`promiseAll(array : Array<Promise>): Promise`

This function allows you to wait until all the promises contained in an array are resolved

**Arguments**

_array_: The array of promise

**Exemple**

```js
const R = require('ramda');
const {promiseAll} = require('bobda');

const incrementAsync = async value =>
  new Promise(resolve => setTimeout(() => resolve(++value), 30));

const squareAsync = async value =>
  new Promise(resolve => setTimeout(() => resolve(value * value), 30));

const value = 2;
promiseAll(R.juxt([incrementAsync, squareAsync]))(value); //=> Promise
```

#### promiseProps

`promiseProps(object : Object): Promise`

This function allows you to wait until all the promises contained in an object as key are resolved

**Arguments**

_object_: The array of promise

**Exemple**

```js
const R = require('ramda');
const {promiseProps} = require('bobda');

const incrementAsync = async value =>
  new Promise(resolve => setTimeout(() => resolve(++value), 30));

const squareAsync = async value =>
  new Promise(resolve => setTimeout(() => resolve(value * value), 30));

const value = 2;

promiseProps(
  R.applySpec({
    incrementResult: incrementAsync,
    squareResult: squareAsync
  })
)(value); //=> Promise
```

### Object properties functions

#### renameProp

`renameProp(from : String ,to : String): object`

This function allows you to rename a prop into the given object.

**Argments**

- _from_ : Name of the prop you want to rename
- _to_ : New name you want to give to this prop
- _object_ : This function is curried by default, last argument (not explicitly given) is the object

**Exemple**

```js
const myAwesomeObj = {
  prop1: 'chapi',
  prop2: 'chapo'
};
const myAwesomePipe = R.pipe(renameProp('prop1', 'readTheDoc'));

myAwesomePipe(myAwesomeObj);
/* =>
{
  readTheDoc : 'chapi',
  prop2 : 'chapo'
}
 */
```

**Note**
Read test for other examples.

#### renamePath

`renamePath(from : [String] ,to : [String]): object`

This function allows you to rename a path into the given object.

**Argments**

- _from_ : Name of the path you want to rename
- _to_ : New name you want to give to this path
- _object_ : This function is curried by default, last argument (not explicitly given) is the object

**Exemple**

```js
const myAwesomeObj = {
  prop1: 'chapi',
  prop2: {
    chapo: {
      patapo: true
    }
  }
};
const myAwesomePipe = R.pipe(
  renamePath(['prop2', 'chapo', 'patapo'], ['chapi', 'chapo', 'patapo'])
);

myAwesomePipe(myAwesomeObj);
/* =>
{
  prop1 : 'chapi',
  chapi : {
    chapo : {
      patapo : true
    }
  }
}
 */
```

**Note**
Read test for other examples.

#### multiPath

`multiPath(mappingRename : [[[String],[String]]] ,object : Object): object`

**Argments**

- _mappingRename_ : Name of the path you want to rename
- _object_ : New name you want to give to this path

This function take list of tuples and recursively replace the path [0] with the path [1] into the given object.

**Exemple**

```js
const listOfPaths = [
  [
    ['une', 'souris', 'verte'],
    ['qui', 'courait', 'dans']
  ],
  [
    ['l', 'herbe'],
    ['je', 'la', 'montre']
  ],
  [['a', 'ces'], ['messieurs']]
];

const inObj = {
  une: {souris: {verte: true}},
  l: {herbe: false},
  a: {ces: 0}
};

multiPath(listOfPaths, inObj);
/* =>
{
  qui: {courait: {dans: true}},
  je: {la: {montre: false}},
  messieurs: 0,
  a: {},
  l: {},
  une: {souris: {}}
};
 */
```

**Note**

Read test for other examples.
