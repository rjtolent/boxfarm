var url  = require('url'),
    sys  = require('sys'),
    express = require('express'),
    childProc = require('child_process'),
    http=require('http');
    var path = require('path')

var app = express();
var server = http.createServer(app);

console.log( "simulated_task started." );
const simTask = childProc.execFile('python', [ "simulated_task.py" ], (err, stdout, stderr) => {
  if (err) {
    console.log( "simulated_task died." );
    // node couldn't execute the command
    return;
  }

  // the *entire* stdout and stderr (buffered)
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});

console.log( simTask.pid );

// Runs the callback when simulated_task ends successfully (somehow).
simTask.stdout.on(
  "data",
  data => {
    console.log( "Data from simulated_task:" );
    console.log( data );
  }
);

/*
setTimeout(
  () => {
    console.log( "simulated_task ended." );
    simTask.kill( 'SIGINT' );
  },
  5000
);
*/

// If the childProc is called? Would run the code below?

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'assets')));
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

app.get('/', function(req, res){
    res.render('home');
});

app.listen(4000);
sys.puts('server running ' + 'now ' + Date.now());

