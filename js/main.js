document.addEventListener('DOMContentLoaded', () => { //wait until everything loaded

  const cards = document.getElementsByClassName("card"); //array of card li's
  const names = document.getElementsByClassName("name");
  const emails = document.getElementsByClassName("email");
  const cities = document.getElementsByClassName("city");
  let users = [];
  let userNames = [];
  let userEmails = [];
  let userPictures = [];
  let userCities = [];
  let userPhones = [];
  let userStreets = [];
  let userStates = [];
  let userPostCodes = [];
  let userAges = [];
  const popUp = document.getElementById('popUp')
  const button = document.getElementById('close');
  const  modalPicture = document.getElementById("modal_picture");
  const  modalName = document.getElementById("modal_name");
  const  modalEmail = document.getElementById("modal_email");
  const  modalCell= document.getElementById("modal_cellphone");
  const  modalAddress= document.getElementById("modal_address");
  const  modalBirthday= document.getElementById("modal_birthdate");



//STEP 1

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
    users.forEach(employee => userCities.push((employee.location.city.charAt(0).toUpperCase() + employee.location.city.slice(1) )))
    users.forEach(employee => userPhones.push((employee.phone)))
    users.forEach(employee => userStreets.push((employee.location.street))) //need to capitalize streets!!!
    users.forEach(employee => userStates.push((employee.location.state.charAt(0).toUpperCase() + employee.location.state.slice(1))))
    users.forEach(employee => userPostCodes.push((employee.location.postcode)))
    users.forEach(employee => userAges.push((employee.dob.age))) //Need to convert these ages to birthdates
    printImage(userPictures, cards) //prints profile pics into cards
    printInfo(userNames, names) //prints names into cards
    printInfo(userEmails, emails) //prints emails into cards
    printInfo(userCities, cities) //prints cities into cards
  }

  getUsers(); //got 12 users and added them to the users array


function printImage(users, arr){ //adds profile pictures to every card
  for (let i = 0; i< arr.length; i += 1) {
    arr[i].innerHTML += '<img src="' + users[i]+ '">';
  }
}

function printInfo(userInfo, arr){ //adds user info to the cards
  for (let i = 0; i< arr.length; i += 1) {
    arr[i].textContent += userInfo[i];
  }
}



//STEP 2

// Click event to display modal div and button to close it

document.addEventListener("click", function(e){
  if (event.target.className === 'card') {
    popUp.style.display = 'block'
    console.log(event.target)
  }
});


button.addEventListener('click', function(event) {
  popUp.style.display = 'none'
});






}); //closing tags addEventListener'DOMContentLoaded'
