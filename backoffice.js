window.onload = async () => {
  let urlID = new URLSearchParams(window.location.search)
    .toString()
    .slice(0, -1);

  if (urlID) {
    let heading = document.getElementById("editHeading");
    heading.innerText = "Edit Movie:";
    let saveBtn = document.getElementById("saveBtn");
    saveBtn.onclick = function () {
      editMovie(urlID);
    };
  } else {
    let saveBtn = document.getElementById("saveBtn");
    saveBtn.onclick = function () {
      addMovie();
    };
  }
};

addMovie = () => {
  let movieName = document.getElementById("movieTitleForm").value;
  let movieImage = document.getElementById("movieImageForm").value;
  let movieDescription = document.getElementById("movieDescriptionForm").value;
  let movieCategory = document.getElementById("movieCategoryForm").value;

  let movie = {
    name: movieName,
    description: movieDescription,
    category: movieCategory,
    imageUrl: movieImage,
  };

  addToAPI(movie);
};

addToAPI = (movie) => {
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDgyYmM1YTEwOWJiYzAwMTVlNDA1ZGQiLCJpYXQiOjE2Mjk0NTIyNzgsImV4cCI6MTYzMDY2MTg3OH0.Udj1GYOhQEcl86grsjygbRG8JgzuBVAp2oSj8s6SJTY"
  );
  myHeaders.append("Content-Type", "application/json");

  var data = JSON.stringify(movie);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: data,
    redirect: "follow",
  };

  fetch("https://striveschool-api.herokuapp.com/api/movies/", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
  alert("Movie added!");
  clearForms();
};

clearForms = () => {
  document.getElementById("movieTitleForm").value = "";
  document.getElementById("movieImageForm").value = "";
  document.getElementById("movieDescriptionForm").value = "";
  document.getElementById("movieCategoryForm").value = "";
};

const editMovies = async () => {
  let body = document.getElementById("mainbody");
  body.innerHTML = `<div class="container">
    <p id="movieTitle" class="editprofiletext mb-3 mt-5 display-4 text-center">All Movies</p>
    <hr style="max-width: 800px; margin: auto" />
      </div>
      <div id="maincontainer" class="container-fluid d-flex flex-column">
      `;
  let moviescounter = 0;
  const categories = await grabCategories();
  for (let i = 0; i < categories.length; i++) {
    if (categories.length !== 0) {
      let category = categories[i];
      const movies = await grabMovies(category);
      console.log(movies);

      for (let i = 0; i < movies.length; i++) {
        let maincontainer = document.getElementById("maincontainer");
        let id = movies[i]._id;
        console.log("id is" + id);
        maincontainer.innerHTML += `
        
        <img id="movieImage" class="mt-2 mb-2 movieimg mx-auto" src="${movies[i].imageUrl}" alt="">
        <div class="container-fluid pl-3 ml-3">
        <p class="font-weight-bold text-center h4" id="movieTitle">${movies[i].name}</p>
          <p class="font-weight-bold" id="movieCategory">${movies[i].category}</p>
          <p id="movieDescription">${movies[i].description}</p>
        </div>
      
        </div>
          <div class="container d-flex">
          <button type="button" id="editBtn" class="btn btn-secondary savebtn mt-2 mb-4 mx-auto">
            EDIT
          </button>
          <button type="button" onclick="deleteMovie(\""${id}"\") id="deleteBtn" class="btn btn-secondary savebtn mt-2 mb-4 mx-auto">
          DELETE
        </button>
          
           </div>
           <hr class="mb-4 style="max-width: 800px; margin: auto" />
          `;
        let deleteBtn = document.getElementById("deleteBtn");
        deleteBtn.onclick = function () {
          deleteMovie(id);
        };
        moviescounter += 1;
      }
    } else {
      alert("There are no movies to display!");
    }
  }
};

const grabMovies = async (category) => {
  let myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDgyYmM1YTEwOWJiYzAwMTVlNDA1ZGQiLCJpYXQiOjE2Mjk0NTIyNzgsImV4cCI6MTYzMDY2MTg3OH0.Udj1GYOhQEcl86grsjygbRG8JgzuBVAp2oSj8s6SJTY"
  );

  let requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  const response = await fetch(
    "https://striveschool-api.herokuapp.com/api/movies/" + category,
    requestOptions
  );

  results = await response.json();
  return results;
};

const grabCategories = async () => {
  let myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDgyYmM1YTEwOWJiYzAwMTVlNDA1ZGQiLCJpYXQiOjE2Mjk0NTIyNzgsImV4cCI6MTYzMDY2MTg3OH0.Udj1GYOhQEcl86grsjygbRG8JgzuBVAp2oSj8s6SJTY"
  );

  let requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  const response = await fetch(
    "https://striveschool-api.herokuapp.com/api/movies/",
    requestOptions
  );

  results = await response.json();
  return results;
};

const deleteMovie = async (id) => {
  // alert(id);
  confirm("Are you sure you want to delete id: " + id + "?");
};

const editMovie = async (id) => {
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDgyYmM1YTEwOWJiYzAwMTVlNDA1ZGQiLCJpYXQiOjE2Mjk0NTIyNzgsImV4cCI6MTYzMDY2MTg3OH0.Udj1GYOhQEcl86grsjygbRG8JgzuBVAp2oSj8s6SJTY"
  );
  myHeaders.append("Content-Type", "application/json");

  let movieName = document.getElementById("movieTitleForm").value;
  let movieImage = document.getElementById("movieImageForm").value;
  let movieDescription = document.getElementById("movieDescriptionForm").value;
  let movieCategory = document.getElementById("movieCategoryForm").value;

  let movie = JSON.stringify({
    name: movieName,
    description: movieDescription,
    category: movieCategory,
    imageUrl: movieImage,
  });

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: movie,
    redirect: "follow",
  };

  fetch(
    "https://striveschool-api.herokuapp.com/api/movies/" + id,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
    })
    .catch((error) => console.log("error", error));
  alert("Movie edited!");
};
