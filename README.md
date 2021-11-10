# Javascript-array_column
Javascript array_column function like PHP\
An attempt to create a Javascript function to work like PHP's array_column.\
(c) Ram Narula You can use this information, kindly do give credit: [github rambkk](https://github.com/rambkk) - [pluslab.net](https://pluslab.net)\
*Please drop a line to say hello and let me know what kind of project you are working on :-)*

So the general syntax should be:

      array_column(ARRAY, KEY/INDEX COLUMN NAME to get data from, (optional) OUTPUT-KEY/INDEX COLUMN NAME to be used as key/index for for output)

Requirement: might require Javascript ES6\

NOTE: works on ARRAY of arrays and ARRAY of associative array objects:
NOTE: Javascript (ES6) handling of array with holes/sparse array is different from PHP, so output might have 'empty' items
(using shorhand hack using array to run a command before returning a value in the reduce loop)

## All examples using these declarations
```JavaScript
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
```

### Using reduce method, ALWAYS returning Array []:
```JavaScript
function array_column(a,i,ok) { return a.reduce((c,v,k) => ok===undefined ? [c[k]=v[i],c][1] : [c[v[ok]]=v[i],c][1],[]) }
```
Example:
```Javascript
array_column(arrayA,2)   // [ 11, 14, 17 ]
array_column(arrayA,3)   // [ 12, 15, undefined ]
array_column(arrayA,3,1) // [ <2 empty slots>, 12, <1 empty slot>, 15, undefined ]  (simplified: Array [1]=12, [3]=15, [3]=undefined)
array_column(arrayA,0,3) // [ <10 empty slots>, 12, 15 ] 

array_column(arrayB,'data') // Array(3) [ "ONE", "TWO", "THREE" ]
array_column(arrayB,'data','b') //Array []   b1: "ONE", b2: "TWO", b3: "THREE"
```
### Using reduce method, ALWAYS returning Object {}:
```JavaScript
function array_column(a,i,ok) { return a.reduce((c,v,k) => ok===undefined ? [c[k]=v[i],c][1] : [c[v[ok]]=v[i],c][1],{}) }
```
Example:
```JavaScript
array_column(arrayA,2)   // Object { 0: 11, 1: 14, 2: 17 }
array_column(arrayA,3)   // Object { 0: 12, 1: 15, 2: undefined }
array_column(arrayB,'data')  // Object { 0: "ONE", 1: "TWO", 2: "THREE" }
array_column(arrayB,'data','b') // Object { b1: "ONE", b2: "TWO", b3: "THREE" }
```

### Using reduce method returning Array or Object depending on the type of first item of ARRAY:
```JavaScript
function array_column(a,i,ok) { return a.reduce((c,v,k) => ok===undefined ? [c[k]=v[i],c][1] : [c[v[ok]]=v[i],c][1],Array.isArray(a[0])?[]:{}) }
```
Longer version (formatted differently):
```JavaScript
function array_column(a,i,ok) {
      return a.reduce((c,v,k) => { 
                  		if(ok===undefined) {
		                  	c[k]=v[i];
                              } else {
                  			c[v[ok]]=v[i]
		                  }
                  		return c; 
	}, Array.isArray(a[0])?[]:{} )
}
```
Example:
```JavaScript
array_column(arrayA,2)   // [ 11, 14, 17 ]
array_column(arrayA,3)   // [ 12, 15, undefined ]
array_column(arrayB,'data')  // Object { 0: "ONE", 1: "TWO", 2: "THREE" }
array_column(arrayB,'data','b') // Object { b1: "ONE", b2: "TWO", b3: "THREE" }
```
### Using reduce method returning Array or Object (if no OUTPUT-KEY/INDEX COLUMN NAME return array, otherwise return Object type):\
function array_column(a,i,ok) { return a.reduce((c,v,k) => ok===undefined ? [c[k]=v[i],c][1] : [c[v[ok]]=v[i],c][1],ok===undefined?[]:{}) }
```JavaScript
array_column(arrayA,3) // Array(3) [ 12, 15, undefined ]
array_column(arrayA,3,1) // Object { 2: 12, 4: 15, 5: undefined }
array_column(arrayB,'data')  // Object { 0: "ONE", 1: "TWO", 2: "THREE" } // Array(3) [ "ONE", "TWO", "THREE" ]
array_column(arrayB,'data','b') // Object { b1: "ONE", b2: "TWO", b3: "THREE" } // Object { b1: "ONE", b2: "TWO", b3: "THREE" }
```

### Using recursion - simplified version:\
(Without OUTPUT-KEY/INDEX COLUMN NAME, just output array of values of the specified column/index/key)
```Javascript
function array_column(a,i) { return a.length ? [  ...a[0].length?[a[0][i]]:[] , ...array_column(a.slice(1),i) ]:[]; }
```
```JavaScript
array_column(a,2)   // [ 11, 14, 17 ]
array_column(a,3)   // [ 12, 15, undefined ]
```



(c) Ram Narula You can use this information, kindly do give credit: [github rambkk](https://github.com/rambkk) - [pluslab.net](https://pluslab.net)\
*Please drop a line to say hello and let me know what kind of project you are working on :-)*
