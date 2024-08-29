const cartContainer = document.querySelector(".cart-item-container")
const total = document.querySelector(".total")
let itemCount = document.querySelector(".item-count")

let data = JSON.parse(localStorage.getItem("data"))

function generateCartItems(){
    data.forEach((pizza) => {
        cartContainer.innerHTML += `
        <div class="cart-item">
            <div class="pizza-name-img">
                <div class="pizza-img">
                    <img src="${pizza.pizzaImg}" alt="img">
                </div>
                <div class="pizza-name">
                    <h4>${pizza.pizzaName}</h4>
                    <button class="remove-btn" onclick="removeItem(${pizza.id})">Remove</button>
                </div>
            </div>
            
            <div class="item-quantity">
                <button onclick = "changeNumberOfUnit('plus',${pizza.id})">+</button>
                <h4>${pizza.numberOfUnit}</h4>
                <button onclick = "changeNumberOfUnit('minus',${pizza.id})">-</button>
            </div>
    
            <div class="item-price">
                <h4>&#8377; ${pizza.pizzaPrice}</h4>
            </div>
        </div>
        ` 
    });
}

generateCartItems();

function update(){
    generateCartItems();
    renderSubTotal();
    localStorage.setItem("data",JSON.stringify(data))
}

function changeNumberOfUnit(action,id){
    cartContainer.innerHTML = ""
    data = data.map((pizza) =>{
        let numberOfUnit = pizza.numberOfUnit
        if(pizza.id === id){
            if(action === "plus"){
                numberOfUnit++
            }else if(action === "minus"  && numberOfUnit > 1){
                numberOfUnit--
            }
        }
        return{...pizza,numberOfUnit}
    })
    update();
}

function renderSubTotal(){
    let totalItem = 0
    let totalPrice = 0
    let tax = 100
    data.forEach((pizza) => {
        totalItem += pizza.numberOfUnit
        totalPrice += pizza.numberOfUnit * pizza.pizzaPrice
    })
    let finalTotal = totalPrice + tax
        total.innerHTML = `
        <div class="subtotal">
            <h4>Subtotal</h4>
            <h4>&#8377; ${totalPrice}</h4>
        </div>
        <div class="tax">
            <h4>Tax</h4>
            <h4>&#8377; ${tax}</h4>
        </div>
        <div class="final-toal">
            <h4>Total</h4>
            <h4>&#8377; ${finalTotal}</h4>
        </div>
        <div class="checkoutbtn">
            <button>Proceed To Checkout</button>
        </div>
    `
        itemCount.innerHTML = totalItem > 0 ? totalItem : 0
        localStorage.setItem("items", totalItem)
}

renderSubTotal();

function removeItem(id){
    data = data.filter((pizza) => pizza.id !== id)
    update();
    location.reload()
}