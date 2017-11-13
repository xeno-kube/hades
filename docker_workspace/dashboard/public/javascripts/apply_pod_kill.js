function apply_pod_kill() {
  var do_pod_kill = document.getElementById("kill-checkbox").checked
  var Minute = document.getElementById("kill-Minute").value
  var Hour = document.getElementById("kill-Hour").value
  var Day_of_the_Month = document.getElementById("kill-Day_of_the_Month").value
  var Month_of_the_Year = document.getElementById("kill-Month_of_the_Year").value
  var Day_of_the_Week = document.getElementById("kill-Day_of_the_Week").value

  // send request
  var http = new XMLHttpRequest();
  var url = "http://"+hostname+":8000/apply_pod_kill";

  var params = ""
  params += "do_pod_kill="+do_pod_kill
  params += "&Minute="+Minute
  params += "&Hour="+Hour
  params += "&Day_of_the_Month="+Day_of_the_Month
  params += "&Month_of_the_Year="+Month_of_the_Year
  params += "&Day_of_the_Week="+Day_of_the_Week

  http.open("POST", url, true);

  //Send the proper header information along with the request
  http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  http.onreadystatechange = function() {//Call a function when the state changes.
      if(http.readyState == 4 && http.status == 200) {
          console.log("apply_pod_kill response: " +http.responseText);
      }
  }
  http.send(params);
}
