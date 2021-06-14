# bloomit

bloomit is a Space efficient bloom filter based on the
[bloom-filters npm package](https://www.npmjs.com/package/bloom-filters).

The main motivation for this package was to reduce the memory usage of the bloom
filter by using a bitmap instead of an array of javascript numbers. This should
result in a theoretical memory reduction by a factor of 64.

I have also edited the export to use a Uint8Array which encodes all needed
values and can be used to send it over the web efficiently.

### Classic Bloom Filter

A Bloom filter is a space-efficient probabilistic data structure, conceived by
Burton Howard Bloom in 1970, that is used to test whether an element is a member
of a set. False positive matches are possible, but false negatives are not.

**Reference:** Bloom, B. H. (1970). _Space/time trade-offs in hash coding with
allowable errors_. Communications of the ACM, 13(7), 422-426.
([Full text article](http://crystal.uta.edu/~mcguigan/cse6350/papers/Bloom.pdf))

#### Methods

- `add(element: string) -> void`: add an element into the filter.
- `has(element: string) -> boolean`: Test an element for membership, returning
  False if the element is definitively not in the filter and True is the element
  might be in the filter.
- `equals(other: BloomFilter) -> boolean`: Test if two filters are equals.
- `rate() -> number`: compute the filter's false positive rate (or error rate).

```javascript
const { BloomFilter } = require('bloomit');
// create a Bloom Filter with a size of 10 and 4 hash functions
let filter = new BloomFilter(10, 4);
// insert data
filter.add('alice');
filter.add('bob');

// lookup for some data
console.log(filter.has('bob')); // output: true
console.log(filter.has('daniel')); // output: false

// print the error rate
console.log(filter.rate());

// alternatively, create a bloom filter optimal for a number of items and a desired error rate
const items = ['alice', 'bob'];
const errorRate = 0.04; // 4 % error rate
filter = BloomFilter.create(items.length, errorRate);

// or create a bloom filter optimal for a collections of items and a desired error rate
filter = BloomFilter.from(items, errorRate);
```
