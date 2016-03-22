/**
 * Created by KyrLouca on 5/3/2016.
 */
var httpReq;
var color = 'blue';
var obj = document.querySelector('k-threadList');
var newArray = new Array();

var fillArray = function () {
  //var abc=url.parse(httpReq.url);
  obj.threads=[];
  if(httpReq.readyState === XMLHttpRequest.DONE && httpReq.status === 200) {
    var obj1 = JSON.parse(httpReq.responseText);
    for(var prop in obj1) {
      if(obj1.hasOwnProperty(prop)) {
        obj.push('threads', {id: prop, title: obj1[prop]});
      }
    }
    //alert(httpReq.responseText);
  }
}

httpReq = new XMLHttpRequest();
httpReq.onreadystatechange = fillArray;
httpReq.open('GET', 'http://localhost:8888/tdid', true);
httpReq.send();

newArray.push({id: '900', title: 'nine 900'});
newArray.push({id: '901', title: 'nine 000'});
obj.threads = newArray;

