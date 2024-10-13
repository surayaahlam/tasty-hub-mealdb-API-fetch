const loadFood = async () => {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/categories.php`
    );
    const data = await response.json();
    const foods = data.categories;
    displayFoods(foods);
  };
  
  loadFood();
  
  const displayFoods = (foods) => {
    const card = document.getElementById("card-container");
    card.innerHTML = "";
    foods.forEach((food) => {
      const {
        strCategory,
        strCategoryThumb,
        strCategoryDescription,
      } = food;
      const description = strCategoryDescription.slice(0, 120);
  
      const div = document.createElement("div");
      div.innerHTML = `
                  <div class="card card-side bg-base-100 shadow-xl flex flex-col md:flex-row">
                      <figure>
                        <img class="bg-cover w-full"
                          src="${strCategoryThumb}"
                          alt="food" />
                      </figure>
                      <div class="card-body items-start">
                        <h2 class="card-title pb-5">${strCategory}</h2>
                        <p class="text-gray-400">${description}....</p>
                        <button onclick="openCatagory('${strCategory}')" class="link text-yellow-400">View Details</button>
                      </div>
                  </div>
          `;
      card.appendChild(div);
    });
  };
  
  // for showing modal
  const openCatagory = (category) => {
    const getFoodWithId = async () => {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      const data = await response.json();
      const foodItems = data.meals;
      displayCataryData(foodItems);
    };
    getFoodWithId();
  
    const displayCataryData = (id) => {
      const cardData = document.getElementById("card-parent");
      const mainCard = document.getElementById('card-container')
      mainCard.innerHTML = "";
      id.forEach((items) => {
        const {strMeal, strMealThumb, idMeal} = items;
        const div = document.createElement("div");
        div.innerHTML = `
                  <div class="card card-side bg-base-100 shadow-xl flex-col">
                      <div>
                        <img class="w-auto rounded-xl"
                          src="${strMealThumb}"
                          alt="food" />
                      </div>
                      <div class="card-body items-start">
                        <h2 class="text-2xl card-title pb-5">${strMeal.slice(0,16)} ...</h2>
                        <p class="text-gray-400"></p>
                        <button onclick="openModal('${idMeal}')" class="btn btn-warning">View Details</button>
                      </div>
                  </div>
          `;
        cardData.appendChild(div);
      });
    };
  };
  
  const openModal=(idMeal)=>{
      const getFoodDetails = async(id) =>{
          const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
          const data = await response.json();
          const meals = data.meals;
          showFoodDetails(meals);
      }
      getFoodDetails(idMeal);
  
  
      const showFoodDetails = (meals) =>{
          const meal = meals[0];
          const {strMeal, strCategory, strMealThumb, strArea, strInstructions, strYoutube} = meal
          const strInstruction = strInstructions.slice(0, 140);
          const modalBox = document.getElementById('modal-box');
          modalBox.innerHTML = "";
          const div = document.createElement('div');
          div.innerHTML = `
              <div>
                  <div><h1 class="text-2xl font-bold py-3">${strMeal}</h1></div>
                  <hr/ class="pb-5">
                  <div class="w-full"><img class="w-8/12 mx-auto rounded-xl" src="${strMealThumb}"/></div>
                  <div class="flex flex-col gap-3 py-5 justify-center">
                      <p class="text-gray-500"><span class="font-bold text-black">Category :</span>${strCategory?strCategory:"Not Available"}</p>
                      <p class="text-gray-500"><span class="font-bold text-black">Area :</span>${strArea?strArea:"Not Available"}</p>
                      <p class="text-gray-500"><span class="font-bold text-black">Instructions :</span>${strInstruction}
                          <button class="link text-blue-600">...Learn More
                      </button></p>
                      <div class="text-gray-500"><span class="font-bold text-black">YouTube :</span>
                          <a href="${strYoutube}">Watch On Youtube</a>
                      </div>
                      <div class="flex justify-end">
                          <div class="modal-action">
                              <form method="dialog">
                                  <button class="btn btn-error">Close</button>
                              </form>
                           </div>
                      </div>
                  </div>
              </div>    
          `;
          modalBox.appendChild(div);
      }
      foodModal.showModal()
  }
  
  
  loadPrevious =() =>{
      const cardbody = document.getElementById('card-parent');
      cardbody.innerHTML = "";
      loadFood();
  }