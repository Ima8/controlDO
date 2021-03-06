var jsonfile = require('jsonfile')
var file = 'data.json'
var DigitalOcean = require('do-wrapper'),
  api = new DigitalOcean(
    '4bb1dadaa692e943ce38558859feb0af9259fde695a79b3961001e6c259560c7', 10);

function createDroplet(name, size) {
  api.dropletsCreate({
    "name": name, //"client",
    "region": "sgp1",
    "size": size, //"512mb",
    "image": "ubuntu-14-04-x64",
    "ssh_keys": null,
    "backups": false,
    "ipv6": true,
    "user_data": null,
    "private_networking": null
  }, function(err, res) {
    if (err) {
      console.log(err);
    } else {
      jsonfile.writeFile(file, res, function(err) {
        if (err) console.error(err)
        return process.exit();
      })
    }
  });

}

function getAllofDroplet() {
  api.dropletsGetAll({}, function(err, droplets) {
    //console.log(droplets);
    size = droplets.body.droplets.length;
    text = "";
    for (var i in droplets.body.droplets) {
      ip = droplets.body.droplets[i].networks.v4[0].ip_address;
      console.log(ip);
    }
    jsonfile.writeFile(file, droplets, function(err) {
      if (err) console.error(err)
      return process.exit();
    })
  });
}


// del all
function deleteAll() {
  api.dropletsGetAll({}, function(err, droplets) {
    //console.log(droplets);
    var count=-1;
    for (j in droplets.body.droplets) {
      count++;    
    }
    for (i in droplets.body.droplets) {
      var droplet = droplets.body.droplets[i].id;
      api.dropletsDelete(droplet, function(err, res) {
        console.log(res);
	console.log(count+"<<count"+i)
	if(count==i) return process.exit();
      });
    }
  });
}

module.exports = {
  createDroplet,
  getAllofDroplet,
  deleteAll
}
