---
layout: post
title:  "A Simple Javascript Library Design"
description: When building a JavaScript library, you may find yourself on some code architecture issues. A library should have a well-defined public interface and protect itself from a carelessly programmer. In this post, I’m going to build a super simple library to illustrate some code designs.
permalink: /a-simple-javascript-library-design
---

When building a JavaScript library, you may find yourself on some code architecture issues. Should I use a constructor function, maybe with a prototype inheritance, isolating in a module or a mix of all of this? A library should have a well-defined public interface and protect itself from a carelessly programmer. In this post, I'm going to build a super simple library to illustrate some code designs.

<!--excerpt_separator-->

The library has one purpose: to create `Person` objects. A `Person` object has a `name`, which is assigned in the person constructor and cannot be changed after the person was created. A `Person` object also have a `me` function that describes the person himself.

Some approaches are presented below as well as their pros and cons.

## 1 - Constructor function

{% highlight javascript %}

function Person( _name ) {
  this.name = _name;
  this.me = function() {
    return "Hi, my name is " + this.name;
  };
}

var bernardo = new Person("Bernardo");
console.log( bernardo.me() ); // Hi, my name is Bernardo

{% endhighlight %}

Cons:

- the `name` is not a private variable;

- the `me` function is created for each new object `Person`.

## 2 - Constructor function and prototype

{% highlight javascript %}

function Person( _name ) {
  this.name = _name;
}

Person.prototype = {
  me: function() {
    return "Hi, my name is " + this.name;
  }
};

var bernardo = new Person("Bernardo");
console.log( bernardo.me() ); // Hi, my name is Bernardo

{% endhighlight %}

Pros:

- the `me`function is created only once. Each new `Person` object inherits the `me` function through prototype.

Cons:

- the `name` is not a private variable.


## 3 - Revealing Module Pattern

{% highlight javascript %}

function person( _name ) {
  var name = _name;

  return {
    me: function() {
      return "Hi, my name is " + name;
    }
  };
}

var bernardo = person("Bernardo");
console.log( bernardo.me() ); // Hi, my name is Bernardo

{% endhighlight %}


Pros:

- the `name` is a private variable.

Cons:

- the `me` function is created for each new object `person`.

## 4 - A Different Module Flavor

{% highlight javascript %}

var Person = (function() {
  var name,
    module;

  function InnerPerson( _name ) {
    name = _name;
  }

  InnerPerson.prototype = {
    constructor: InnerPerson,
    me: function() {
      return "Hi, my name is " + name;
    }
  };

  return InnerPerson;
}());

var bernardo = new Person("Bernardo");
var foo = new Person("Foo");

console.log( bernardo.me() ); // Hi, my name is Foo
console.log( foo.me() ); // Hi, my name is Foo

{% endhighlight %}

Pros:

- the `me`function is created only once. Each new `Person` object inherits the `me` function through prototype.

Cons:

- although the `name` is a private variable, it is shared by all `Person` objects. Therefore, the `foo` person changes the `bernardo` person name.

## 5 - Constructor function, prototype and getter function

{% highlight javascript %}

function Person( _name ) {
  var name = _name;

  this.getName = function() {
    return name;
  };
}

Person.prototype = {
  me: function() {
    return "Hi, my name is " + this.getName();
  }
};

var bernardo = new Person("Bernardo");
console.log( bernardo.me() ); // Hi, my name is Bernardo

{% endhighlight %}

Pros:

- the `name` is a private variable;

- the `me` function is created only once. Each new `Person` object inherits the `me` function through prototype.

Cons:

- the `getName` function should not be public because it is used only internally.

## 6 - Bind to solve

{% highlight javascript %}

function person( _name ) {

  function InnerPerson( _name ) {
    this.name = _name;
  }

  InnerPerson.prototype = {
    me: function() {
      return "Hi, my name is " + this.name;
    }
  };

  var innerPerson = new InnerPerson( _name );

  return {
    me: innerPerson.me.bind( innerPerson )
  };
}

var bernardo = person("Bernardo");
console.log( bernardo.me() ); // Hi, my name is Bernardo

{% endhighlight %}


Pros:

- the `name` is a private variable;

- the `me` function is created only once. Each new `Person` object inherits the `me` function through prototype.

Cons:

- None, this is my preferred pattern.

If the return is this way:

{% highlight javascript %}

return {
  me: innerPerson.me
};

{% endhighlight %}

It will not work because the `this` in the `me` function references a anonymous object. You must [bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) the `me` function to right object in the return statement.
