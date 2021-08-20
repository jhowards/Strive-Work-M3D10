window.onload = async () => {
  const categories = await grabCategories();
  console.log(categories);

  if (categories.length !== 0) {
    generateCards(categories);
  }
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

const generateCards = async (categories) => {
  const mainBody = document.getElementById("mainBody");
  mainBody.innerHTML = "";

  for (let i = 0; i < categories.length; i++) {
    let category = categories[i];
    const movies = await grabMovies(category);
    console.log(movies);
    mainBody.innerHTML += `<section class="mt-5">
      <div class="section-title">
        <div class="text-ellipsis d-inline-block">
          <h4 class="text-white mb-3 netflix-font first-h4">${category}</h4>
        </div>
      </div>
      <div
       id = "${category}Body"
        class="
          row
          mx-n1
          row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5
        "
      >
        </div>
      </div>
    </section>`;

    const categoryBody = document.getElementById(category + "Body");
    for (let i = 0; i < movies.length; i++) {
      categoryBody.innerHTML += `
        <div class="col px-1">
        <div class="position-relative">
          <img
            src="${movies[i].imageUrl}"
            class="img-fluid rounded mb-2 mb-sm-0"
            alt=" "
          />
        </div>
      </div>
        `;
    }
  }
};
