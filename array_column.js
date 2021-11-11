/* Javascript-array_column
 * Javascript array_column function like PHP
 * An attempt to create a Javascript function to work like PHP's array_column.
 * (c) Ram Narula You can use this information, kindly do give credit: github.com/rambkk - pluslab.net
 * Please drop a line to say hello and let me know what kind of project you are working on :-)
 *
 * So the general syntax should be:
 *
 * array_column(ARRAY, KEY/INDEX COLUMN for output, (optional) OUTPUT KEY/INDEX COLUMN to be used as key/index for the output)
 *
 * (If KEY/INDEX COLUMN is null, the output will be the full ARRAY re-indexed with KEY/INDEX COLUMN)
 *
 * Version: array_column v0.11 (initial release)
 *
 * Requirement: might require Javascript ES6
 *
 * NOTE: works on ARRAY of arrays and ARRAY of associative array objects
 * NOTE: Javascript (ES6) handling of array with holes/sparse array is different from PHP, so output might have 'empty' items
 * NOTE: For more information, lookup PHP array_column
*/

//Recursive function returning Array or Object {} - if no OUTPUT KEY/INDEX COLUMN return array, otherwise return Object {}:
function array_column(a,i,ok) { 
	return a.length ? typeof ok==='undefined' ? [ a[0][i]              , ...array_column(a.slice(1),i,ok) ]
						  : { [a[0][ok]] : i===null?a[0]:a[0][i] , ...array_column(a.slice(1),i,ok) }
			:[]							
}

// Using reduce method returning Array or Object - if no OUTPUT KEY/INDEX COLUMN return array, otherwise return Object {}:
function array_column(a,i,ok) { return a.reduce((c,v,k) => typeof ok==='undefined' ? [c[k]=v[i],c][1] : [c[v[ok]]=i===null?v:v[i],c][1],ok===undefined?[]:{}) }

// Using reduce method, ALWAYS returning Array []:
function array_column(a,i,ok) { return a.reduce((c,v,k) => ok===undefined ? [c[k]=v[i],c][1] : [c[v[ok]]=i===null?v:v[i],c][1],[]) }

// Using reduce method, ALWAYS returning Object {}:
function array_column(a,i,ok) { return a.reduce((c,v,k) => ok===undefined ? [c[k]=v[i],c][1] : [c[v[ok]]=i===null?v:v[i],c][1],{}) }

// Using reduce method returning Array or Object depending on the type of first item of ARRAY:
function array_column(a,i,ok) { return a.reduce((c,v,k) => ok===undefined ? [c[k]=v[i],c][1] : [c[v[ok]]=i===null?v:v[i],c][1],Array.isArray(a[0])?[]:{}) }

// Longer version of "Using reduce method returning Array or Object depending on the type of first item of ARRAY" just to demonstrate clarity:
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

/*
 * (c) Ram Narula You can use this information, kindly do give credit: github.com/rambkk - pluslab.net
 * Please drop a line to say hello and let me know what kind of project you are working on :-)
 */
