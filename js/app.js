// *******************************navbar**********************************

const navbarBtn = document.querySelector(".mobile-navbar-btn")
const navbar = document.querySelector(".header")


const toggelNavbar = () => {
    navbar.classList.toggle("active")
}
navbarBtn.addEventListener("click", toggelNavbar)

// *****************************login form**********************************
const userBtn = document.querySelector(".user")
const loginForm = document.querySelector(".login-form")

var toggelLoginForm = () => {
    loginForm.classList.toggle("activeloginForm")
}

// if(userBtn.addEventListener){
userBtn.addEventListener("click", toggelLoginForm)
// }

//****************************show-pizza************************************

const showPizza = document.querySelector(".show-pizza .awesome")
let itemCounts = document.querySelector(".item-count")

function genratePizzaShop(){
    pizzaArrayObject.forEach((pizza) => {
        showPizza.innerHTML += `
                <div class="pizza-box">
                    <div class="awesome-icons">
                    <ion-icon name="share-social-outline"></ion-icon>
                        <ion-icon name="heart-outline"></ion-icon>
                    </div>
                    <div class="pizza-img">
                        <img src="${pizza.pizzaImg}">
                    </div>
                    <div class="pizza-name"><h4>${pizza.pizzaName}</h4></div>
                    <div class="pizza-des"><p>${pizza.pizzaDescription}</p></div>
                    <div class="pizza-price">
                        <h3>&#8377; ${pizza.pizzaPrice}</h3>
                        <button onclick = "addToCart(${pizza.id})">ORDER NOW</button>
                    </div>
                </div>
        `
    })
}

genratePizzaShop();



let pizzaCart = JSON.parse(localStorage.getItem("data")) || []
let totalItem = 0


function addToCart(id){
    if(pizzaCart.some((pizza) => pizza.id === id)){
        alert("pizza already in cart")
    }else{
        const pizzaItem = pizzaArrayObject.find((pizza)=>pizza.id === id)
        pizzaCart.push(pizzaItem)
        let totalItem = localStorage.getItem('items')
        totalItem++
        itemCounts.innerHTML = totalItem > 0 ? totalItem : 0
        localStorage.setItem('items',totalItem)
    }
    localStorage.setItem("data" , JSON.stringify(pizzaCart))
}

function navUpdate1(){
    let totalItem = localStorage.getItem('items')
    itemCounts.innerHTML = totalItem
}
navUpdate1();