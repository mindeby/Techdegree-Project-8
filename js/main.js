document.addEventListener('DOMContentLoaded', () => { //wait until everything loaded

  const test = document.getElementById('test');



  function fetchData(url){
    return fetch(url)
      .then(res => res.json()) //simplify code, reusability
      .catch(error => console.log('It seems we have a problem', error)) //error handling
  }

function printImage(data){
  test.innerHTML += '<img src="' + data + '">';
}

  fetch('https://randomuser.me/api/')
  return fetchData('https://randomuser.me/api/')
  .then(data => printImage(data.results[0].picture.large))  //get access to the data in the api






















}); //closing tags addEventListener'DOMContentLoaded'
