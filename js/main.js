document.addEventListener('DOMContentLoaded', () => { //wait until everything loaded

  const cards = document.getElementsByClassName("card"); //array of card li's
  const names = document.getElementsByClassName("name");
  let users = [];

  function fetchData(url){
    return fetch(url)
      .then(res => res.json())
      .catch(error => console.log('It seems we have a problem with the server', error)) //error handling
  } //simplify code, reusability, convert data to json

  function getUsers(){ //get 12 users
    for (let i = 0; i<=12; i += 1) {
      Promise.all([
      fetch('https://randomuser.me/api/?results=12&inc=name, picture, email, location, login, phone, dob &noinfo &nat=US')
      ])
      return fetchData('https://randomuser.me/api/?results=12&inc=name, picture, email, location, login, phone, dob &noinfo &nat=US')
      .then(data => getEmployee(data.results))
    }
  }

  function getEmployee(data){ //pass this function to access each employee inside users
    users = data
    console.log(users[0].name.first)
  }


  getUsers(); //got 12 users and added them to the users array

function printImage(users, arr){ //adds profile pictures to every card
  for (let i = 0; i< arr.length; i += 1) {
    arr[i].innerHTML += '<img src="' + users[i].picture.large + '">';
  }
}



/*
fetch('https://randomuser.me/api/?results=12&inc=name, picture, email, location, login, phone, dob &noinfo &nat=US')
return fetchData('https://randomuser.me/api/?results=12&inc=name, picture, email, location, login, phone, dob &noinfo &nat=US')
.then(data => printImage(data.results[0].picture.large, cards))
*/





/*
  function getRandomPhraseAsArray(arr) { //get a random phrase & split it
      const randomPhrase = arr[Math.floor(Math.random()* arr.length)];
    }

*/















}); //closing tags addEventListener'DOMContentLoaded'
