function sidebar_click(item) {
   console.log(item + " clicked")
   document.getElementById("dashboard_btn").style.backgroundColor = "DarkGray";
   document.getElementById("pod_kill_btn").style.backgroundColor = "DarkGray";
   document.getElementById("pod_stress_btn").style.backgroundColor = "DarkGray";
   document.getElementById("configure_btn").style.backgroundColor = "DarkGray";
   document.getElementById("about_btn").style.backgroundColor = "DarkGray";

   document.getElementById(item+"_btn").style.backgroundColor = "SlateGray";

   document.getElementById("dashboard_screen").style.visibility = "hidden";
   document.getElementById("pod_kill_screen").style.visibility = "hidden";
   document.getElementById("pod_stress_screen").style.visibility = "hidden";
   document.getElementById("configure_screen").style.visibility = "hidden";
   document.getElementById("about_screen").style.visibility = "hidden";

   document.getElementById(item+"_screen").style.visibility = "visible";

   document.getElementById("dashboard_screen").style.height = "0%";
   document.getElementById("pod_kill_screen").style.height = "0%";
   document.getElementById("pod_stress_screen").style.height = "0%";
   document.getElementById("configure_screen").style.height = "0%";
   document.getElementById("about_screen").style.height = "0%";

   document.getElementById(item+"_screen").style.height = "100%";

   if(item === "dashboard"){
     update_activity_log()
   }
}
