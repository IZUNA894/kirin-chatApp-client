var addTimestamp = function(msg){
  var Msg = {};
  Msg.value =msg;
  //Msg.time = moment(new Date().getTime(),"LT");
  Msg.time = moment().format('LT');

  //console.log(Msg);
  return Msg;
};
function makeMsg(msg){
  var Msg = addTimestamp(msg);
  return Msg;
}
console.log("hello from util.js");
function sayHello(){
  console.log("hhhh");
}
$(document).ready(function(){
  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
    console.log("tooltip activated");
  })
});
//module.exports = makeMsg;
