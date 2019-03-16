---
layout: post
title:  "Optimizing Jupiter garbage collector"
date:   2018-05-18 18:00:00
categories: projects
---

The first version of the Jupiter's garbage collector was very simple. When a new object
needed to be allocated, I just call the *new* operator, and when it was time to be
collected *delete*. The gc phase triggered when a fixed amount of objects were allocated.
As you can imagine, this have a terrible performance.

### Easy optimizations

First I added a pool of objects that is preallocated at the start of the virtual machine with
a relatively large number (at the moment 16000). This way most of the time we don't need to ask for
new memory, we just get it from the pool. Also short lived objects are returned quickly to the pool.

This alone increased the performance by a ~130% in some cases where a lot of garbage
is generated.

Also, I had a std::list to keep track of the allocated objects, but std::list has
bery bad performance. Initialy I used this container because in the sweep phase I needed to
remove objects from this list, and removing an element in the middle of a std::vector is very
non-performant. I solved this using two std::vectors alternatively, a `from` vector
and a `to` vector. When an object needed to be removed, I just push to the `to` vector,
when the sweep phase finish, I clear the `from` vector and swap the `from` and  `to`.

This increased the performance by another ~130%

### Generational GC

The mark phase is the most critical (and slow) phase of the collection. To keep it simple
for the moment I just used two generations: `young` and `tenured` that are signaled by a Boolean
in all objects. When an object survives a collection cycle is marked as tenured.

Having objects separated in two groups (generations) allow me to divide the mark phase in two:
A minor collection and a mayor collection. In the minor collection I just mark & sweep `young` objects,
while in the mayor collection I mark & sweep all. Right now I do a mayor collection after 10 minor collections
are executed.

With the increased the performance a bit ( between 50% - 70% ). It works specially well
when big arrays are used. The array usually survives the first collection cycle, so in the next 10
collection cycles the array and all of its elements are skip.

You can check more about advantages of generational GC's here: [Generational GC in Wikipedia](https://en.wikipedia.org/wiki/Tracing_garbage_collection#Generational_GC_(ephemeral_GC))

### Future work

Right now the memory for the objects is very fragmented, although I suspect the standard allocation library
does a good job allocating a lot of similar objects (probably with memory pools) but I'd like to
experiment with copying GC strategies and allocating objects from a big continuous chunk of memory.

Thanks for reading!
