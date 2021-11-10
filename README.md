# Javascript-array_column
Javascript array_column function like PHP\
An attempt to create a Javascript function to work like PHP's array_column.\
(c) Ram Narula You can use this information, kindly do give credit: [github rambkk](https://github.com/rambkk) - [pluslab.net](https://pluslab.net)\
*Please drop a line to say hello and let me know what kind of project you are working on :-)*

So the general syntax should be:

      array_column(ARRAY, index/key each item of ARRAY, index/key to be used for for output)

Requirement: might require Javascript ES6\
NOTE: Javascript (ES6) handling of array with holes/sparse array is different from PHP, so output might have 'empty' items

Using reduce (a little shorhand hack using array to run a command then return):\
NOTE: works ARRAY of arrays and ARRAY of associative array objects:
```JavaScript
function array_column(a,i,ok) { return a.reduce((c,v,k) =>  ok===undefined ? [c[k]=v[i],c][1] : [c[v[ok]]=v[i],c][1],[]) }
```
Example:
```Javascript
arrayA=[
    [1,2,11,12],
    [2,4,14,15],
    [3,5,17]
]
array_column(arrayA,2)   // [ 11, 14, 17 ]
array_column(arrayA,3)   // [ 12, 15, undefined ]
array_column(arrayA,3,1) // [ <2 empty slots>, 12, <1 empty slot>, 15, undefined ]  (simplified: Array [1]=12, [3]=15, [3]=undefined)
array_column(arrayA,0,3) // [ <10 empty slots>, 12, 15 ] 

arrayB=[ 
        {a:'a1',b:'b1',data:'ONE'},
        {a:'a2',b:'b2',data:'TWO'},
        {a:'a3',b:'b3',data:'THREE'}
]

array_column(arrayB,'data') // Array(3) [ "ONE", "TWO", "THREE" ]

array_column(aa,'data','b')
//Array []
//b1: "ONE"
//b2: "TWO"
//b3: "THREE"
```

Using recursion (simplified version):\
(Without the index/key for output, just output array of values of the specified column/index/key)
```Javascript
function array_column(a,i) { return a.length ? [  ...a[0].length?[a[0][i]]:[] , ...array_column(a.slice(1),i) ]:[]; }
```
```JavaScript
array_column(a,2)   // [ 11, 14, 17 ]
array_column(a,3)   // [ 12, 15, undefined ]
```
  
(c) Ram Narula You can use this information, kindly do give credit: [github rambkk](https://github.com/rambkk) - [pluslab.net](https://pluslab.net)\
*Please drop a line to say hello and let me know what kind of project you are working on :-)*
