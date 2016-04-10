var jsonfile = require('jsonfile')
var file = 'data.json'
var DigitalOcean = require('do-wrapper'),
  api = new DigitalOcean(
    '3ebd8c6f8da07881b79fd16075c14948d20504e90945bf3116acbd40fe378edb', 10);

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
    for (i in droplets.body.droplets) {
      var droplet = droplets.body.droplets[i].id;
      api.dropletsDelete(droplet, function(err, res) {
        console.log(res);
        return process.exit();
      });
    }
  });
}

module.exports = {
  createDroplet,
  getAllofDroplet,
  deleteAll
}
