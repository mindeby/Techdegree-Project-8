document.addEventListener('DOMContentLoaded', () => { //wait until everything loaded

  const cards = document.getElementsByClassName("card");
  const names = document.getElementsByClassName("name");
  const emails = document.getElementsByClassName("email");
  const cities = document.getElementsByClassName("city");
  const popUp = document.getElementById('popUp')
  const button = document.getElementById('close');
  const  modalPicture = document.getElementById("modal_picture");
  const  modalName = document.getElementById("modal_name");
  const  modalEmail = document.getElementById("modal_email");
  const  modalCell= document.getElementById("modal_cellphone");
  const  modalAddress= document.getElementById("modal_address");
  const  modalBirthday= document.getElementById("modal_birthdate");

  let users = [];
  let userNames = [];
  let userEmails = [];
  let userPictures = [];
  let userCities = [];
  let userPhones = [];
  let userBirthDates = [];
  let userAddress =[];

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
    users.forEach(employee => userNames.push((capitalize(employee.name.first))+' '+ (capitalize(employee.name.last))))
    users.forEach(employee => userEmails.push((employee.email)))
    users.forEach(employee => userPictures.push((employee.picture.large)))
    users.forEach(employee => userCities.push((employee.location.city.charAt(0).toUpperCase() + employee.location.city.slice(1) )))
    users.forEach(employee => userPhones.push((employee.phone)))
    users.forEach(employee => userBirthDates.push((employee.dob.date.substring(0,10))))
    users.forEach(employee => userAddress.push( (capitalize(employee.location.street) + ", ") + ((capitalize(employee.location.city) + ", ") + (capitalize(employee.location.state) + ", ") + (employee.location.postcode) ) ))

    printImage(userPictures, cards) //prints profile pics into cards
    printInfo(userNames, names) //prints names into cards
    printInfo(userEmails, emails) //prints emails into cards
    printInfo(userCities, cities) //prints cities into cards

    document.addEventListener("click", function(e){ //begin listener event
        modalReset()

        popUp.style.display = 'block' //shows modal window

        let count = event.target.id //gets index of selected card

        addModalContent()

        if (event.target.id === 'close' ){
          popUp.style.display = 'none'
        }
    }); //end of listener event
  }

  function capitalize(string){
      return string.toLowerCase().replace( /\b./g, function(a){ return a.toUpperCase(); } );
  }; //capitalize address

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


function modalReset () {
  modalPicture.innerHTML =[];
  modalName.textContent = [];
  modalEmail.textContent = [];
  modalCell.textContent = [];
  modalAddress.textContent = [];
  modalBirthday.textContent = [];
}

//Automatically generating html for card

function addModalContent(){
  let count = event.target.id
  modalPicture.innerHTML += '<img src="' + userPictures[count]+ '">';
  modalName.textContent = userNames[count];
  modalEmail.textContent = userEmails[count];
  modalCell.textContent = userPhones[count];
  modalAddress.textContent = userAddress[count];
  modalBirthday.textContent = userBirthDates[count];
}







//STEP 2

// Click event to display modal div and button to close it

//Object.entries(cards).map((object) => { console.log(object[0]) });
for (let i = 0; i< cards.length; i += 1) {
  document.getElementsByClassName("card")[i].setAttribute("id", i);
}






/*
document.addEventListener("click", function(e){
  if (event.target.className === 'card' ) {
    popUp.style.display = 'block'
  }
});



button.addEventListener('click', function(event) {
  popUp.style.display = 'none'
});
*/



  // Object.entries(cards).map((object) => { console.log(object[0]) });


}); //closing tags addEventListener'DOMContentLoaded'
