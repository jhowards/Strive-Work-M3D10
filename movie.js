window.onload = () => {
  //   let urlID = new URLSearchParams(window.location.search)
  //     .toString()
  //     .slice(0, -1);

  let params = new URLSearchParams(window.location.search);
  let id = params.get("a");
  let name = params.get("b");
  let category = params.get("c");
  let description = params.get("d");
  let image = params.get("e");

  if (id) {
    generatePage(id, name, category, description, image);
    // history.replaceState({}, null, "/movie.html");
  } else {
    alert("Error");
  }
};

generatePage = async (id, name, category, description, image) => {
  const movieTitle = document.getElementById("movieTitle");
  const movieImage = document.getElementById("movieImage");
  const movieCategory = document.getElementById("movieCategory");
  const movieDescription = document.getElementById("movieDescription");
  movieTitle.innerText = name;
  movieImage.src = image;
  movieCategory.innerText = category;
  movieDescription.innerText = description;
  const editButton = document.getElementById("editBtn");
  // editButton.href = "/backoffice.html";
  editButton.setAttribute("href", "/backoffice.html?" + id);
};
