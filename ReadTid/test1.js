/**
 * Created by KyrLouca on 21/3/2016.
 */
var obj={'a':3,'c':4};

var ar1= Object.getOwnPropertyNames(obj);

var ar1=Object.keys(obj).map(function(key) {
  r1 = new Object();
  r1.Id = key;
  r1.Tdid = obj[key];
  return r1;

})
//var ar1=Object.keys(obj).map(key=>{return {[key]:obj[key]}})


console.log(ar1)
