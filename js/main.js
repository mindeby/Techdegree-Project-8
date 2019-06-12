document.addEventListener('DOMContentLoaded', () => { //wait until everything loaded

  const cards = document.getElementsByClassName("card"); //array of card li's
  const names = document.getElementsByClassName("name");
  const emails = document.getElementsByClassName("email");
  const cities = document.getElementsByClassName("city");
  let users = [];
  let userNames = [];
  let userEmails = [];
  let userPictures = [];
  let userCity = [];

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
    users.forEach(employee => userNames.push((employee.name.first.charAt(0).toUpperCase() + employee.name.first.slice(1) )+' '+(employee.name.last.charAt(0).toUpperCase() + employee.name.last.slice(1))))
    users.forEach(employee => userEmails.push((employee.email)))
    users.forEach(employee => userPictures.push((employee.picture.large)))
    users.forEach(employee => userCity.push((employee.location.city.charAt(0).toUpperCase() + employee.location.city.slice(1) )))
    console.log(userNames)
    console.log(userEmails)
    console.log(userPictures)
    console.log(userCity)
    printImage(userPictures, cards)
  }

  getUsers(); //got 12 users and added them to the users array


function printImage(users, arr){ //adds profile pictures to every card
  for (let i = 0; i< arr.length; i += 1) {
    arr[i].innerHTML += '<img src="' + users[i]+ '">';
  }
}

















}); //closing tags addEventListener'DOMContentLoaded'
