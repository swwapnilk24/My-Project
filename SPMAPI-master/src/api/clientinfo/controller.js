import {success, notFound} from '../../services/response/'
// import {createTestAccount} from '../helpers/mailhelper'

exports.clientinfo = function (req, res, next) {
  // res.json(req.user);
  const dns = require('dns')
  const ip = req.connection.remoteAddress
  const path = require('path')
  const userName = process.env['USERPROFILE'].split(path.sep)[2]
  const loginId = path.join('domainName', userName)
  res.writeHead(200, {'Content-Type': 'text/html'})
  dns.reverse(ip, function (err, hostnames) {
    res.write('Ip: ' + ip + '<br />' + 'userName: ' + userName + '<br />' + 'loginId: ' + loginId + '<br />')
    res.end('Your hostname(s) are ' + hostnames.join('; '))
  })

  // dns.resolve4('archive.org', (err, addresses) => {
  //   if (err) throw err;
  
  //   console.log(`addresses: ${JSON.stringify(addresses)}`);
  
  //   addresses.forEach((a) => {
  //     dns.reverse(a, (err, hostnames) => {
  //       if (err) {
  //         throw err;
  //       }
  //       console.log(`reverse for ${a}: ${JSON.stringify(hostnames)}`);
  //       res.write('Addresses: ' + JSON.stringify(hostnames) + '<br />')
  //       res.end('Your hostname(s) are ')
  //     });
  //   });
  // });


//   const nodeSSPI = require('node-sspi')
//   const nodeSSPIObj = new nodeSSPI({
//     retrieveGroups: true
//   })
//   nodeSSPIObj.authenticate(req, res, function (err) {
//     res.finished || next()
//   })
//   const out =
//     'Hello ' +
//     req.connection.user +
//     '! Your sid is ' +
//     req.connection.userSid +
//     ' and you belong to following groups:<br/><ul>'
//   res.send(out)
}
