// const jsonFile = require('./contct.json');
const fs = require('fs');
const csv=require('csvtojson')

async function init() {
  const jsonFile = await csv().fromFile('./cct.csv');
  
  gloHeaders = ['0705', '0805', '0807', '0811', '0815', '0905'];

  const gloNumbers = [];

  // Condition for Glo Number
  const gloCondition = (numHeader) =>
    gloHeaders.some((num) => num === numHeader);

  // Convert all to String
  const stringPhone = jsonFile.map((contact) => {
    contact.Phone = String(contact.Phone);
    return contact;
  });

  stringPhone.forEach((contact) => {
    // 1.) if number starts with +234
    if (contact.Phone.slice(0, 4) === '+234') {
      const numHeader = `0${contact.Phone.slice(5, 8)}`;
      gloCondition(numHeader) ? gloNumbers.push(contact) : '';
    }
    // else
    gloCondition(contact.Phone.slice(0, 4)) ? gloNumbers.push(contact) : '';
  });

  const son = JSON.stringify(gloNumbers);
  fs.writeFileSync('./Glo numbers.json', son, 'utf-8');
  console.log(gloNumbers);
}

init();
