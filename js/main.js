document.addEventListener('DOMContentLoaded', () => { //wait until everything loaded

  const cards = document.getElementsByClassName("card");
  const card_container = document.getElementById("card_container");
  const names = document.getElementsByClassName("name");
  const profile_pic = document.getElementsByClassName("profile_picture");
  const emails = document.getElementsByClassName("email");
  const cities = document.getElementsByClassName("city");
  const popUp = document.getElementById('popUp')
  const button = document.getElementById('close');
  const  modalPicture = document.getElementById("modal_picture");
  const  modalCity = document.getElementById("modal_city");
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
  let getCurrentIdElements = [];
  let counter = 0;



// Automatically generating the base html
  function generateHtml(){
    card_container.innerHTML = setColumns(3, 100)
    card_container.innerHTML += setCards(3, 4)
  }

  function setColumns(number, width){ //automatically generate columns
    let colHtml = '<colgroup>'
    for (let i = 0; i < number; i += 1){
      colHtml += '<col style ="width:' + width + 'px">'
    }

    colHtml += '</colgroup>'
    return colHtml
  }

  function setCards(numberCards, numberRows){ //automatically insert cards inside rows
    let cardHtml = '<tr>'
    for (let i = 0; i < numberRows; i += 1){
      for (let i = 0; i < numberCards; i += 1){
        cardHtml += `<td class ="card">
        <div class="profile_picture"></div>
        <ul class="employee_information">
        <li class="name"></li>
        <li class="email"></li>
        <li class="city"></li>
        </ul></td>`
      }
      cardHtml += '</tr>'
    }
    return cardHtml
  }

generateHtml();

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
    users.forEach(employee => {
      userNames.push((capitalize(employee.name.first))+' '+ (capitalize(employee.name.last)))
      userEmails.push((employee.email))
      userPictures.push((employee.picture.large))
      userCities.push((capitalize(employee.location.city)))
      userPhones.push((employee.phone))
      userBirthDates.push((employee.dob.date.substring(0,10)))
      userAddress.push( (capitalize(employee.location.street) + ", ") + ((capitalize(employee.location.city) + ", ") + (capitalize(employee.location.state) + ", ") + (employee.location.postcode) ) )
    })
    printImage(userPictures, profile_pic) //prints profile pics into cards
    printInfo(userNames, names) //prints names into cards
    printInfo(userEmails, emails) //prints emails into cards
    printInfo(userCities, cities) //prints cities into cards

  } //end of getEmployee function


  document.addEventListener("click", function(e){ //begin listener event
      if (event.target.className === 'card' || event.target.className === 'name' || event.target.className === 'email' || event.target.className === 'city' || event.target.className === 'pic' ) {
        popUp.style.display = 'block' //shows modal window

        for (let i = 0; i< cards.length; i += 1) {
          document.getElementsByClassName(event.target.className)[i].setAttribute("id", i);
        }
        modalReset()
        addModalContent()

      } else if (event.target.id === 'close') {
        popUp.style.display = 'none'
        modalReset()
    } else if (event.target.id === 'next') {
      modalReset()
      addModalContentNext()
    } else if (event.target.id === 'before') {
      modalReset()
      addModalContentBefore()
    }
  }); //end of listener event


  function capitalize(string){
      return string.toLowerCase().replace( /\b./g, function(a){ return a.toUpperCase(); } );
  }; //capitalize info

  getUsers(); //got 12 users and added them to the users array


function printImage(users, arr){ //adds profile pictures to every card
  for (let i = 0; i< arr.length; i += 1) {
    arr[i].innerHTML += '<img class="pic" src="' + users[i]+ '">';
  }
}

function printInfo(userInfo, arr){ //adds user info to the cards
  for (let i = 0; i< arr.length; i += 1) {
    arr[i].textContent += userInfo[i];
  }
}


function modalReset () { //when closing button it resets
  modalPicture.innerHTML =[];
  modalName.textContent = [];
  modalEmail.textContent = [];
  modalCell.textContent = [];
  modalAddress.textContent = [];
  modalBirthday.textContent = [];
  count = 0
}

function addModalContent(){
  counter = event.target.id
  modalPicture.innerHTML += '<img src="' + userPictures[counter]+ '">';
  modalName.textContent = userNames[counter];
  modalEmail.textContent = userEmails[counter];
  modalCity.textContent = userCities[counter];
  modalCell.textContent = userPhones[counter];
  modalAddress.textContent = userAddress[counter];
  let test = userBirthDates[counter]
  let year = test.substr(0,4);
  let month = test.substr(5,2);
  let day = test.substr(8);
  modalBirthday.textContent = 'Birthday: ' + day + '/' + month + '/' + year;
  console.log(counter)
}

function addModalContentNext(){
  let count2 = counter++;
  modalPicture.innerHTML += '<img src="' + userPictures[(count2 + 1)]+ '">';
  modalName.textContent = userNames[(count2 + 1)];
  modalEmail.textContent = userEmails[(count2 + 1)];
  modalCity.textContent = userCities[(count2 + 1)];
  modalCell.textContent = userPhones[(count2 + 1)];
  modalAddress.textContent = userAddress[(count2 + 1)];
  let test = userBirthDates[(count2 + 1)]
  let year = test.substr(0,4);
  let month = test.substr(5,2);
  let day = test.substr(8);
  modalBirthday.textContent = 'Birthday: ' + day + '/' + month + '/' + year;
  console.log(counter)
}

function addModalContentBefore(){
  let count3 = counter--;
  modalPicture.innerHTML += '<img src="' + userPictures[(count3 - 1)]+ '">';
  modalName.textContent = userNames[(count3 - 1)];
  modalEmail.textContent = userEmails[(count3 - 1)];
  modalCity.textContent = userCities[(count3 - 1)];
  modalCell.textContent = userPhones[(count3 - 1)];
  modalAddress.textContent = userAddress[(count3 - 1)];
  let test = userBirthDates[(count3 - 1)]
  let year = test.substr(0,4);
  let month = test.substr(5,2);
  let day = test.substr(8);
  modalBirthday.textContent = 'Birthday: ' + day + '/' + month + '/' + year;
  console.log(counter)
}


}); //closing tags addEventListener'DOMContentLoaded'


/*
document.addEventListener("click", function(e){
  modalReset()
  if (event.target.id === 'next' ) {
    addModalContent(0,1)
  } else if (event.target.id === 'before') {
    addModalContent(1,0)
  }
});

*/
