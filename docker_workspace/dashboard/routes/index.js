var express = require('express');
var router = express.Router();
var fs = require('fs');
var sh = require('shelljs');

var recent_activity = []

// start watching the activity log
fs.watch("/hades_activity.log", function(eventType, filename) {
  console.log("hades_activity.log updated")
  // console.log(eventType)
  // console.log(filename)

  // read all the lines and put them in the recent_activity array
  fs.readFile('/hades_activity.log', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }

    // write each line to /var/log/hades.log
    lines = data.split('\n')
    lines.forEach(function(line, index) {
      fs.appendFile('/var/log/hades.log', line, function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
    })
  });

  // clear /hades_activity.log
  fs.writeFile("/hades_activity.log", '', function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("/hades_activity.log was cleared!");
  });

  // send request to /update_activity_log
  // var http = new XMLHttpRequest();
  // var url = "http://"+hostname+":8000/update_activity_log";
  //
  // http.onreadystatechange = function() {
  //   if (http.readyState == 4 && http.status == 200) {
  //     console.log("update_activity_log response: " +http.responseText);
  //   }
  // }
  // http.open("GET", url, true); // true for asynchronous
  // http.send(null);
})

fs.appendFile('/hades_activity.log', 'Hello user. I am Hades.', function (err) {
  if (err) throw err;
  console.log('Saved!');
});

// ROUTES BELOW

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hades Dashboard' });
});

router.get('/test', function(req, res, next) {
  fs.writeFile("/tmp/test", "Hey there!", function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("/tmp/test was saved!");
  });
});

router.get('/update_dashboard', function(req, res, next) {
  // Check if configured
  // If not, render "No configuration found" message

  // If there is a kube config, attempt running cluster-info
  // If cluster-info fails, render "Not configured correctly" message

  // If configured correctly, ...

  // get namespace

  // get services

  // get pods

  // get deployments

  // get pvcs

  // get pvs

  // var result = sh.exec("kubectl --help")
  // console.log("kubectl --help : "+result)
});

router.get('/update_activity_log', function(req, res, next) {
  // watch /hades_activity.log
  // on a change we want to return the new stuff in the log

  // res.sendStatus(200)
  res.send("stuff")
});

router.post('/apply_kubeconfig', function(req, res, next) {
  var config = req.body.config
  var user_pem = req.body.user_pem
  var user_key_pem = req.body.user_key_pem

  fs.writeFile("/root/.kube/config", config, function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("/root/.kube/config was saved!");
  });

  fs.writeFile("/root/.kube/user.pem", user_pem, function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("/root/.kube/user.pem was saved!");
  });

  fs.writeFile("/root/.kube/user-key.pem", user_key_pem, function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("/root/.kube/user-key.pem was saved!");
  });
  res.sendStatus(200)
});

router.post('/apply_pod_kill', function(req, res, next) {
  var do_pod_kill = req.body.do_pod_kill
  var Minute = req.body.Minute
  var Hour = req.body.Hour
  var Day_of_the_Month = req.body.Day_of_the_Month
  var Month_of_the_Year = req.body.Month_of_the_Year
  var Day_of_the_Week = req.body.Day_of_the_Week

  fs.readFile('/etc/crontabs/root', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    lines = data.split('\n')
    new_content = ""
    lines.forEach(function(line, index) {
      if(line.endsWith("/usr/local/bin/kill_random_pod")){
        if(do_pod_kill == "true"){
          new_content += Minute + " " + Hour + " " + Day_of_the_Month + " " + Month_of_the_Year + " " + Day_of_the_Week + " " + "/usr/local/bin/kill_random_pod\n"
        } else {
          new_content += "# /usr/local/bin/kill_random_pod\n"
        }
      } else {
        new_content += line+"\n"
      }
    })
    fs.writeFile('/etc/crontabs/root', new_content);
    console.log("/etc/crontabs/root has been re-written")
  });

  res.sendStatus(200)
});

router.post('/apply_pod_stress', function(req, res, next) {
  var do_pod_stress = req.body.do_pod_stress
  var Minute = req.body.Minute
  var Hour = req.body.Hour
  var Day_of_the_Month = req.body.Day_of_the_Month
  var Month_of_the_Year = req.body.Month_of_the_Year
  var Day_of_the_Week = req.body.Day_of_the_Week

  fs.readFile('/etc/crontabs/root', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    lines = data.split('\n')
    new_content = ""
    lines.forEach(function(line, index) {
      if(line.endsWith("/usr/local/bin/stress_random_pod")){
        if(do_pod_stress == "true"){
          new_content += Minute + " " + Hour + " " + Day_of_the_Month + " " + Month_of_the_Year + " " + Day_of_the_Week + " " + "/usr/local/bin/stress_random_pod\n"
        } else {
          new_content += "# /usr/local/bin/stress_random_pod\n"
        }
      } else {
        new_content += line+"\n"
      }
    })
    fs.writeFile('/etc/crontabs/root', new_content);
    console.log("/etc/crontabs/root has been re-written")
  });

  res.sendStatus(200)
});

module.exports = router;
