function update_dashboard() {
  // send request
  var http = new XMLHttpRequest();
  var url = "http://"+hostname+":8000/update_dashboard";

  http.open("GET", url, true);

  //Send the proper header information along with the request
  http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  http.onreadystatechange = function() {//Call a function when the state changes.
      if(http.readyState == 4 && http.status == 200) {
          console.log("update_dashboard response: " +http.responseText);
      }
  }
  http.send();
}
