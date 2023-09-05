var fs = require('fs');

let arr = [];
// Use fs.readFile() method to read the file
for (let index = 0; index < 1378; index++) {
  fs.readFile(`./data/${index}.json`, 'utf8', function (err, data) {
    if (err) throw err;
    // Display the file content
    console.log('FFFFFFFFFFFFFFFFF', data);
    arr.push(JSON.parse(data));
    if (index >= 999) {
      console.log(arr.length);
      fs.writeFileSync(`./allDatas.json`, JSON.stringify(arr));
    }
  });
}
