let currentUser;



document?.getElementById("loginForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("inputEmail").value;
    const password = document.getElementById("inputPassword").value;
    fetch(`http://localhost:3000/user?email=${email}`)
      .then((response) => response.json())
      .then((data) => {
        let user = data[0];
        showerror = document.getElementsByClassName("loginerror")[0];
        if (!user) {
          showerror.innerText = "please signup the users";
        } else if (password != user?.password) {
          showerror.innerText = "password dont match";
        } else {
          currentUser = user;
          try {
            const requestOptions = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(currentUser),
            };
            
            fetch("http://localhost:3000/currentUser", requestOptions)
              .then(response => response.json())
              .then(data => {
                console.log('Post request successful:', data);
              })
              .catch(error => {
                console.error('Error making POST request:', error);
              });
            
          } catch (error) {
            
          }
          finally{
            window.location.href = 'index.html';
          }


          
        }

        setTimeout(() => {
          showerror.innerText = "";
        }, 2000);

      })
      .catch((error) => {
        console.error("Error:", error);
      });
});


function logout(){

  console.log("logout called")
  console.log(currentUser)
  const apiUrl = `http://localhost:3000/currentUser/${currentUser.id}`;

// Configuration for the fetch request
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      // You might need additional headers depending on your server configuration
    },
  };

// Make the fetch request
  fetch(apiUrl, requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      console.log('User deleted successfully');
    })
    .catch(error => {
      console.error('Error deleting user:', error);
    });
}


document?.getElementById("signupForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("signupEmail").value;
    const fullname = document.getElementById("signupFullName").value;
    const username = document.getElementById("signupUserName").value;
    const password = document.getElementById("signupPassword").value;


    fetch(`http://localhost:3000/user?email=${email}`)
      .then((response) => response.json())
      .then((data) => {
        let user = data[0];
        showerror = document.getElementsByClassName("signuperror")[0];
        if (user) {
          showerror.innerText = "User already exists";
        } else {
          let user ={
            "name":fullname,
            "userName":username,
            "email":email,
            "profileImage":"/xyz",
            "password":password,
            "favourites":[]
          }

          fetch('http://localhost:3000/user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
          }).then((data)=>{

            currentUser = user;
            try {
              const requestOptions = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(currentUser),
              };
              
              fetch("http://localhost:3000/currentUser", requestOptions)
                .then(response => response.json())
                .then(data => {
                  console.log('Post request successful:', data);
                })
                .catch(error => {
                  console.error('Error making POST request:', error);
                });
              
            } catch (error) {
              
            }
            finally{
              window.location.href = 'index.html';
            }
            
            window.location.href = 'index.html';

          })
          .catch(error => {
            console.error('Error:', error);
          });
        
        }

        setTimeout(() => {
          showerror.innerText = "";
        }, 2000);

      })
      .catch((error) => {
        console.error("Error:", error);
      });

     
});








isUser()
function isUser(){

  fetch(`http://localhost:3000/currentUser`).then(response=>response.json()).then((currentUserArray)=>{

    currentUser = currentUserArray[0];
    
    let navButton = document.getElementById( "profileBar" );
      if(!currentUser){

        navButton.innerHTML=
        `
        <a href="/login.html"><button type="button" >LogIn</button></a>
        <a href="/signup.html"><button type="button" >Signup</button></a>
        `

      }else{


        navButton.innerHTML=`
        <a href="/userProfile" class="flex flex-row ">
        <img class="imageRound" src=${currentUser.profileImage} />
        <li>${currentUser.userName}</li>
        </a>
        `
      }

  })

}


function favourits(){

  let ele = document.getElementById("searchs");
  document.getElementById("searchHeading").innerText = "Favourits";

  let innerh = currentUser?.favourites.map((book)=>(
    `<div onclick="setAudioPath('${book.audioPath}')" class="item">
      <img src="${book.bookImage}" />
      <div class="play">
        <span class="${book.isPlaying?"fa fa-pause":"fa fa-play"}"></span>
      </div>
      <h4>${book.bookName}</h4>
      <p>${book.bookAuthor}</p>
      <P>${book.bookAuthor}</P>
    </div>`
  ))
  ele.innerHTML = innerh;

}



function addToFavourit(bookIndex){

let audioBook = books[bookIndex];

  if(!currentUser?.favourite?.includes(audioBook)){
    currentUser.favourite.push(audioBook);
  }

}





function changePassword(newPassword) {
let olPassword = prompt("Enter your old password");
  if(oldPassword === currentUser.password){
    currentUser.password = newPassword;
  }else{
    console.error("Old password is not correct");
  }
}



// function addRating(bookId, rating){
// let book = books.filter((book)=>book.bookId === bookId);
// let bookrating = book.ratings.filter((rating)=>rating.name === currentUser.userName) ;
// if(!bookrating){
//   book.ratings.push({
//     name:currentUser.userName,
//     rating:rating
//   })
// }else{
//   let index = book.ratings.indexOf(bookrating);
//   bookrating.rating = rating;
//   book.ratings[index] = bookrating;

// }
// }



// function search(toSearch){

// let searchResult = books.filter((book)=>book.bookName.includes(toSearch)||book.author.includes(toSearch));

// }


function search(){
  searchInput  = "5min" || document.getElementById('').value;

  fetch("http://localhost:3000/books").then((response)=>response.json()).then((books)=>{

  console.log(books)

    searches = books.filter((book)=>{
      return book.bookName==searchInput || book.bookAuthor==searchInput;
    })

    console.log(searches)

  })


}


async function onScriptLoad(){


  let ele = document.getElementsByClassName("allbooks")[0];
  Motivation  =   `
  <div class="spotify-playlists">
  <h2>Motivation</h2>
  <div class="list">
  ${await generSearch("Motivation")}
  </div>
  </div>`;
  Horror  =  `
  <div class="spotify-playlists">
  <h2>Horror</h2>
  <div class="list">
  ${await generSearch("Horror")}
  </div>
  </div>`
  Fantasy  = await  `
  <div class="spotify-playlists">
  <h2>Fantasy</h2>
  <div class="list">
  ${await generSearch("Fantasy")}
  </div>
  </div>`
  ele.innerHTML = Motivation + Horror + Fantasy;

}
onScriptLoad()

function generSearch(gener){

   return fetch("http://localhost:3000/books").then(response=>response.json()).then(data=>{
    generArray =  data.filter((book)=>book.genre==gener)
  
    return generArray.map((book)=>(
      `<div onclick="setAudioPath('${book.audioPath}')" class="item">
        <img src="${book.bookImage}" />
        <div class="play">
          <span class="${book.isPlaying?"fa fa-pause":"fa fa-play"}"></span>
        </div>
        <h4>${book.bookName}</h4>
        <p>${book.bookAuthor}</p>
        <P>${book.bookAuthor}</P>
      </div>`
    ))

  })

}


function setAudioPath(path){

  let atag = document.getElementById("audioPlayer")

  atag.src = path;

  atag.play()

}



function languageSearch(language){

  fetch("http://localhost:3000/books").then(response=>response.json()).then(books=>{


    languageArray =  books.filter((book)=>book.languagetype==language)

  let results = languageArray.map((book)=>(
    `<div onclick="setAudioPath('${book.audioPath}')" class="item">
    <img src="${book.bookImage}" />
    <div class="play">
      <span class="${book.isPlaying?"fa fa-pause":"fa fa-play"}"></span>
    </div>
    <h4>${book.bookName}</h4>
    <p>${book.bookAuthor}</p>
    <P>${book.bookAuthor}</P>
  </div>`
  ))

  let ele = document.getElementById("searchs");
  document.getElementById("searchHeading").innerText= "language : "+ language;
  let innerh = results;
  ele.innerHTML = innerh;

  })




}

languageSearch("English")


function search(searchValue){
  console.log("searchstarted")


  return fetch("http://localhost:3000/books").then(response=>response.json()).then(data=>{
    booksArray =  data.filter((book)=>book.genre==searchValue || book.bookAuthor==searchValue || book.id==searchValue || book.languagetype==searchValue || book.bookName == searchValue)
    booksArray;
    console.log(booksArray)
  
    return booksArray.map((book)=>(
      `<div onclick="setAudioPath('${book.audioPath}')" class="item">
        <img src="${book.bookImage}" />
        <div class="play">
          <span class="${book.isPlaying?"fa fa-pause":"fa fa-play"}"></span>
        </div>
        <h4>${book.bookName}</h4>
        <p>${book.bookAuthor}</p>
        <P>${book.bookAuthor}</P>
      </div>`
    ))

  })


}


async function addSearchele() {
  let ele = document.getElementById("searchs");
  let searchValue = document.getElementById("searchBar").value;
  document.getElementById("searchHeading").innerText=searchValue;
  let innerh = await search(searchValue);
  ele.innerHTML = innerh;
}


