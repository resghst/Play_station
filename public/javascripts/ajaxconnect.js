// var queryobj = {
//   "path": "urlpath",
//   "method": "methodType",
//   "data": {
//     querydata
//   }
// }

var ajaxfun = (ajaxquery, callback)=>{
  $.ajax({
    url: ajaxquery.path,
    method: ajaxquery.method,
    data: { query :JSON.stringify(ajaxquery.data)},
    dataType: "json",
    success : function(res){ callback(res) }
  })
}