var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "name": "Fortune Sam-Olayemi",
  "email": "bolzysam@gmail.com",
  "password": "test1234",
  "passwordConfirm": "test1234"
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://127.0.0.1:3000/signup", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));