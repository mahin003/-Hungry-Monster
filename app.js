//Defined all id 
const foodName = document.getElementById('FoodSearch');
const SearchButton = document.getElementById('Trigger');
const foodList = document.getElementById('foods');
const warning = document.getElementById('warning');
const ingredient = document.getElementById("foodsIngredients");

//array to store ingredient 
var IngredientList = []


//button function
SearchButton.addEventListener('click', function () {
    foodList.innerHTML = '';
    if (foodName.value == '') {
        warning.style.display = 'block';
    }
    else {
        warning.style.display = 'none';
        FoodListShow(foodName.value);
    }
})

//shows searched food results
function FoodListShow(name) {
    const FoodListApi = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
    fetch(FoodListApi)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.meals != null) {
                data.meals.map(element => {
                    // console.log(element)
                    const foodDiv = document.createElement('div');
                    foodDiv.className = 'col-md-3 foodContainer';
                    //console.log(data.meals.idMeal," ",data.meals.strMeal);
                    //defineing element to show food search result
                    const foodInfo = `
               <div onclick="FoodDetails('${element.idMeal}')" class="border rounded text-center h-80 mb-6" data-bs-toggle="modal" data-bs-target="#exampleModal">
               <img class="img-thumbnail" src="${element.strMealThumb}" alt="">
              <h6 class="py-2 px-2 f-name">${element.strMeal}</h6>
               </div>
                    `;
                    foodDiv.innerHTML = foodInfo;
                    foodList.appendChild(foodDiv);
                });
            }
            else {
                warning.style.display = 'block';
            }
        })
}

// function to print ingredinets 
FoodDetails = mealId => {
    const food_api = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(food_api)
        .then(res => res.json())
        .then(data => {
            // collecting all ingredient in a array
            for (let i = 1; ; i++) {

                //console.log(data.meals[0][`strIngredient${i}`]);
                if (data.meals[0][`strIngredient${i}`]) {
                    IngredientList.push(`${data.meals[0][`strMeasure${i}`]} of ${data.meals[0][`strIngredient${i}`]}`);
                } else {
                    break;
                }
            }
            //console.log(IngredientList);
            //define elements to show ingredient list
            const foodIngredientInfo = `
            <img class="img-thumbnail rounded mb-3 ingImg" src="${data.meals[0].strMealThumb}" alt="">
            <h2>${data.meals[0].strMeal}</h2>
            <h5 class="pt-3 pb-2"><i class="icon-fire icons"></i> Ingredients</h5>
            <ul class="list-unstyled mb-1">
            ${IngredientList.map((ingredient) => `<li>${ingredient}</li>`).join('')}
            </ul>
            `;
            ingredient.innerHTML = foodIngredientInfo;

        });
}
