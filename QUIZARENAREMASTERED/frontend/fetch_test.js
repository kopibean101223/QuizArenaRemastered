fetch('http://localhost:3000/api/questions')
  .then(res => res.json().then(data => ({status: res.status, body: data})))
  .then(data => console.log(JSON.stringify(data, null, 2)))
  .catch(err => console.error(err));
