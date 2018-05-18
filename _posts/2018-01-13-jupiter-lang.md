---
layout: post
title:  "Jupiter programming language"
date:   2018-01-13 20:00:00
categories: projects
---

The last months I have been working in a new side project just for fun:
**[Jupiter](https://github.com/davidarias/Jupiter)**, a programming language based on Smalltalk. It features a simple
bytecode interpreter virtual machine with a mark&sweep garbage collector. Nothing fancy there,
but I added some features to the language that I think are worth exploring:

* A set of simple core types: Numbers ( Just one type of numbers ),
  Strings, Arrays ( number indexed collections ) and Maps ( String indexed collections ).
* Immutable data structures.
* There are no classes. Objects are created copying other objects ( prototypes ). Thanks to immutability no special semantics is needed to achieve this.
* Code reuse through composition instead of inheritance. Deep hierarchies often are a source of incidental complexity.
* Unix friendly: Its source code is stored in files, which is not the 'Smalltalk way', but this allow easy interaction with other Unix tools, like git, grep, IDE's/text editors etc..

In my opinion Smalltalk ( and its cousin [Self](http://www.selflanguage.org/) ) are a very interesting
programming languages. Seems that nowadays are relegated to niche/academic languages, due to
some reasons beyond the scope of this article (although [Pharo](https://pharo.org/)
has a quite active community), nevertheless, I think we can still learn a lot from this 'old' technologies.

Contributions are very much welcome. Just open a pull request or an issue in Github :)

**Edit 2018-05-18:** Check out the brand new [Juno IDE](https://github.com/davidarias/juno),
a Smalltalk-like IDE for the Jupiter Programing Language
