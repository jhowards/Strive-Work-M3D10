window.onload = async () => {
  let saveBtn = document.getElementById("saveBtn");
  saveBtn.onclick = function () {
    addMovie();
  };
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
};

clearForms = () => {
  document.getElementById("movieTitleForm").value = "";
  document.getElementById("movieImageForm").value = "";
  document.getElementById("movieDescriptionForm").value = "";
  document.getElementById("movieCategoryForm").value = "";
};

deleteMovies = () => {
  let body = document.getElementById("mainbody");
  mainbody.innerHTML = "";
};
