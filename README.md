# Javascript-array_column
Javascript array_column function like PHP\
An attempt to create a Javascript function to work like PHP's array_column.\
(c) Ram Narula You can use this information, kindly do give credit: [github rambkk](https://github.com/rambkk) - [pluslab.net](https://pluslab.net)\
*Please drop a line to say hello and let me know what kind of project you are working on :-)*

So the general syntax should be:
```JavaScript
array_column(ARRAY, KEY/INDEX COLUMN for output, (optional) OUTPUT KEY/INDEX COLUMN to be used as key/index for the output)
```

(If KEY/INDEX COLUMN is null, the output will be the full ARRAY re-indexed with KEY/INDEX COLUMN)


Requirement: might require Javascript ES6

NOTE: works on ARRAY of arrays and ARRAY of associative array objects\
NOTE: Javascript (ES6) handling of array with holes/sparse array is different from PHP, so output might have 'empty' items
NOTE: For more information, lookup PHP array_column

## All examples using these declarations
```JavaScript
arrayA=[
    [1,2,11,12],
    [2,4,14,15],
    [3,5,17]
]

arrayB=[ 
        {a:'a1',b:'b1',data:'ONE'},
        {a:'a2',b:'b2',data:'TWO'},
        {a:'a3',b:'b3',data:'THREE'}
]


```
  
### Recursive function returning Array or Object {} - if no OUTPUT KEY/INDEX COLUMN return array, otherwise return Object {}:
```Javascript
function array_column(a,i,ok) { 
	return a.length ? typeof ok==='undefined' ? [ a[0][i]              , ...array_column(a.slice(1),i,ok) ]
						  : { [a[0][ok]] : i===null?a[0]:a[0][i] , ...array_column(a.slice(1),i,ok) }
			:[]							
}

//Example:
array_column(arrayA,2)   	// Array(3) [ 11, 14, 17 ]
array_column(arrayA,3) 		// Array(3) [ 12, 15, undefined ]
array_column(arrayA,3,1)	// Object { 2: 12, 4: 15, 5: undefined }
array_column(arrayA,0,3)	// Object { 12: 1, 15: 2, undefined: 3 }
array_column(arrayB,'data')  	// Array(3) [ "ONE", "TWO", "THREE" ]
array_column(arrayB,'data','b') // Object { b1: "ONE", b2: "TWO", b3: "THREE" }
array_column(arrayA,null,1)	// Object { 2: [ 1, 2, 11, 12 ], 4: [ 2, 4, 14, 15 ], 5: [ 3, 5, 17 ] }
array_column(arrayB,null,'data')	// Object {
						ONE:  { a: "a1", b: "b1", data: "ONE"   },
						TWO:  { a: "a2", b: "b2", data: "TWO"   },
						THREE:{ a: "a3", b: "b3", data: "THREE" }
						}
```
  
### Using reduce method returning Array or Object - if no OUTPUT KEY/INDEX COLUMN return array, otherwise return Object {}:
```JavaScript
function array_column(a,i,ok) { return a.reduce((c,v,k) => typeof ok==='undefined' ? [c[k]=v[i],c][1] : [c[v[ok]]=i===null?v:v[i],c][1],ok===undefined?[]:{}) }
// Example:
array_column(arrayA,2)   	// Array(3) [ 11, 14, 17 ]
array_column(arrayA,3) 		// Array(3) [ 12, 15, undefined ]
array_column(arrayA,3,1)	// Object { 2: 12, 4: 15, 5: undefined }
array_column(arrayA,0,3)	// Object { 12: 1, 15: 2, undefined: 3 }
array_column(arrayB,'data')  	// Array(3) [ "ONE", "TWO", "THREE" ]
array_column(arrayB,'data','b') // Object { b1: "ONE", b2: "TWO", b3: "THREE" }
array_column(arrayA,null,1)	// Object { 2: [ 1, 2, 11, 12 ], 4: [ 2, 4, 14, 15 ], 5: [ 3, 5, 17 ] }
array_column(arrayB,null,'data')	// Object {
						ONE:  { a: "a1", b: "b1", data: "ONE"   },
						TWO:  { a: "a2", b: "b2", data: "TWO"   },
						THREE:{ a: "a3", b: "b3", data: "THREE" }
						}
```
  
### Using reduce method, ALWAYS returning Array []:
```JavaScript
function array_column(a,i,ok) { return a.reduce((c,v,k) => ok===undefined ? [c[k]=v[i],c][1] : [c[v[ok]]=i===null?v:v[i],c][1],[]) }
// Example:
array_column(arrayA,2)   	// Array(3) [ 11, 14, 17 ]
array_column(arrayA,3)   	// Array(3) [ 12, 15, undefined ]
array_column(arrayA,3,1) 	// [ <2 empty slots>, 12, <1 empty slot>, 15, undefined ]  (simplified: Array [1]=12, [3]=15, [3]=undefined)
array_column(arrayA,0,3) 	// [ <10 empty slots>, 12, 15 ] 
array_column(arrayB,'data') 	// Array(3) [ "ONE", "TWO", "THREE" ]
array_column(arrayB,'data','b') // Array []   b1: "ONE", b2: "TWO", b3: "THREE"
```
  
### Using reduce method, ALWAYS returning Object {}:
```JavaScript
function array_column(a,i,ok) { return a.reduce((c,v,k) => ok===undefined ? [c[k]=v[i],c][1] : [c[v[ok]]=i===null?v:v[i],c][1],{}) }

// Example:
array_column(arrayA,2)   	// Object { 0: 11, 1: 14, 2: 17 }
array_column(arrayA,3)   	// Object { 0: 12, 1: 15, 2: undefined }
array_column(arrayA,3,1)	// Object { 2: 12, 4: 15, 5: undefined }
array_column(arrayA,0,3)	// Object { 12: 1, 15: 2, undefined: 3 }
array_column(arrayB,'data')  	// Object { 0: "ONE", 1: "TWO", 2: "THREE" }
array_column(arrayB,'data','b') // Object { b1: "ONE", b2: "TWO", b3: "THREE" }
```
  
### Using reduce method returning Array or Object depending on the type of first item of ARRAY:
```JavaScript
function array_column(a,i,ok) { return a.reduce((c,v,k) => ok===undefined ? [c[k]=v[i],c][1] : [c[v[ok]]=i===null?v:v[i],c][1],Array.isArray(a[0])?[]:{}) }

// Example:
array_column(arrayA,2)   	// Array(3) [ 11, 14, 17 ]
array_column(arrayA,3)   	// Array(3) [ 12, 15, undefined ]
array_column(arrayA,3,1)	// Array(6) [ <2 empty slots>, 12, <1 empty slot>, 15, undefined ]
array_column(arrayA,0,3)	// Array(16) [ <12 empty slots>, 1, <2 empty slots>, 2 ]
array_column(arrayB,'data')  	// Object { 0: "ONE", 1: "TWO", 2: "THREE" }
array_column(arrayB,'data','b') // Object { b1: "ONE", b2: "TWO", b3: "THREE" }
```
  
Longer version of "Using reduce method returning Array or Object depending on the type of first item of ARRAY" just to demonstrate clarity:
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


(c) Ram Narula You can use this information, kindly do give credit: [github rambkk](https://github.com/rambkk) - [pluslab.net](https://pluslab.net)\
*Please drop a line to say hello and let me know what kind of project you are working on :-)*
