var controlDO = require('./controlDO')

var menuHandler;

// Initialize
function initialize() {
  showMain();
  process.stdin.setEncoding('utf8');
  process.stdin.on('readable', checkMenu);

  function checkMenu() {
    var input = process.stdin.read();
    if (input !== null) {
      menuHandler(input.trim());
    }
  }
}

// Main
function showMain() {
  console.log(
    '1 = Create Droplet . . .' + '\n' +
    '2 = Delete ALL Droplet' + '\n' +
    '3 = Get all ip' + '\n' +
    '4 = Exit' + '\n\n' +
    'Choose number, then press ENTER:'
  );

  menuHandler = function(input) {
    switch (input) {
      case '1':
        showSubCreate();
        break;
      case '2':
        controlDO.deleteAll();
        break;
      case '3':
        controlDO.getAllofDroplet();
        break;
      case '4':
        process.exit();
        break;
      default:
        showMain();
    }
  };
}

// Sub
function showSubCreate() {
  console.log(
    '-----------------------------' + '\n' +
    '1 = RAM 512mb' + '\n' +
    '2 = RAM 1GB' + '\n\n' +
    '3 = RAM 2GB' + '\n\n' +
    'Choose number, then press ENTER:'
  );

  menuHandler = function(input) {
    console.log(
      'Name : '
    );
    menuHandler = function(input2) {

      switch (input) {
        case '1':
          ram = "512mb";
          break;
        case '2':
          ram = "1gb";
          break;
        case '3':
          ram = "2gb";
          break;
        default:
          ram = "512mb";
      }
      name = input2;
      console.log("Droplet : " + ram + "\nname : " + name);
      controlDO.createDroplet(name, ram)
    };
  };
}

initialize();
