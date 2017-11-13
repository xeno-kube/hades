function apply_pod_stress() {
  var do_pod_kill = document.getElementById("stress-checkbox").value
  var Minute = document.getElementById("stress-Minute").value
  var Hour = document.getElementById("stress-Hour").value
  var Day_of_the_Month = document.getElementById("stress-Day_of_the_Month").value
  var Month_of_the_Year = document.getElementById("stress-Month_of_the_Year").value
  var Day_of_the_Week = document.getElementById("stress-Day_of_the_Week").value

  // send request
  var http = new XMLHttpRequest();
  var url = "http://"+hostname+":8000/apply_pod_stress";

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
          console.log("apply_pod_stress response: " +http.responseText);
      }
  }
  http.send(params);
}
