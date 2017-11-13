function apply_kubeconfig() {
  // get congif
  config = document.getElementById("config").value

  // get pem
  user_pem = document.getElementById("user_pem").value

  // get key pem
  user_key_pem = document.getElementById("user_key_pem").value

  console.log(config)
  console.log(user_pem)
  console.log(user_key_pem)

  // send request
  var http = new XMLHttpRequest();
  var url = "http://"+hostname+":8000/apply_kubeconfig";
  var params = "config="+config+"&user_pem="+user_pem+"&user_key_pem="+user_key_pem;
  http.open("POST", url, true);

  //Send the proper header information along with the request
  http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  http.onreadystatechange = function() {//Call a function when the state changes.
      if(http.readyState == 4 && http.status == 200) {
          console.log("apply_kubeconfig response: " +http.responseText);
      }
  }
  http.send(params);
}
