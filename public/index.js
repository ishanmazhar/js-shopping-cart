// Define addToCart function
// Define removeFromCart function
// Define clearCart function 
// Define storeItemsInLocalStorage function 
// Define getItems function
// Define removeFromLS function 

// let shopItem = document.getElementsByClassName('shop-item-title');
// let shopItemPrice = document.getElementsByClassName('shop-item-price');

let addToCartButtons = document.getElementsByClassName('shop-item-btn');
for (let i = 0; i < addToCartButtons.length; i++) {
    addToCartButtons[i].addEventListener('click', addToCart);
}

function addToCart(event) {
    let button = event.target;
    shopItem = button.parentElement.parentElement;
    let title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    let price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    addItemsToCart(title, price);
}

function addItemsToCart(title, price) {
    let cartItems = document.createElement('div');
    let cart = document.getElementsByClassName('cart')[0];
    let cartItemTitle = document.getElementsByClassName('cart-item-title');

    for(let i = 0; i < cartItemTitle.length; i++) {
        if(cartItemTitle[i].innerHTML == title) {
            alert('Already Added to Cart!');
            return
        } 
    }

    let cartRowItems = `
        <div class="row cart-item">
            <div class="col-3">
                <span class="cart-item-title">${title}</span>
            </div>
            <div class="col-3">
                <span class="cart-price">${price}</span>
            </div>
            <div class="col-3 cart-quantity cart-column">
                <label>Quantity</label>
                <input class="cart-quantity-input" type="number" value="1">
            </div><br><br>
            <div class="col-3">
                <button class="btn btn-danger" type="button">REMOVE</button>
            </div>
        </div>`
    cartItems.innerHTML = cartRowItems; 
    
    cart.append(cartItems); 

    cartItems.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', changeQuantity);
    cartItems.getElementsByClassName('btn-danger')[0].addEventListener('click', removeItems);
    cartCounter();
    updateTotal();
    document.getElementsByClassName('cart-empty')[0].innerHTML = '';
    let cartEmpty = document.getElementsByClassName('cart-empty')[0];
    if(cartEmpty == "Cart Is Empty!") {
        console.log('empty');
        cartEmpty.remove();

    }
    // document.getElementsByClassName('cart-empty')[0].remove();
    // console.log(title);
    // console.log(price);
}

function changeQuantity(event) {
    let input = event.target;
    if(isNaN(input.value) == true || input.value <= 0) {
        input.value = 1;
    }
    cartCounter();
    updateTotal();
}

function removeItems(event) {
    let removeButton = event.target;
    removeButton.parentElement.parentElement.remove();
    // console.log("clicked");
    cartCounter();
    updateTotal();

}

function updateTotal() {
    let cartItemsContainer = document.getElementsByClassName('cart')[0];
    let cartRows = cartItemsContainer.getElementsByClassName('row');
    let total = 0;
    for(let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i];
        var price = cartRow.getElementsByClassName('cart-price')[0].innerText;
        var quantity = cartRow.getElementsByClassName('cart-quantity-input')[0].value;
        var itemPrice = parseFloat(price.replace('Tk ', '')); 
        total = total + itemPrice * quantity;
    }
    document.getElementsByClassName('cart-total-price')[0].innerText = 'Tk ' + total;

    // console.log(itemPrice);
    // console.log(quantity);
    // console.log(total);
}

function cartCounter() {
    let cartItem = document.getElementsByClassName('cart-item');
    let counter = 0;
    for (let i = 0; i < cartItem.length; i++) {
        counter += 1;
    }
    document.getElementsByClassName('cart-counter')[0].innerHTML = counter;
    if(counter == 0) {
        document.getElementsByClassName('cart-empty')[0].innerHTML = 'Cart Is Empty!';
    }
    console.log(counter);
}

document.getElementsByClassName('purchase')[0].addEventListener('click', purchaseClicked);

function purchaseClicked() {
    let cart = document.getElementsByClassName('cart')[0];
    alert("Thank you for your purchase!");
    while(cart.firstChild) {
        cart.removeChild(cart.firstChild);
    }
    document.getElementsByClassName('cart-empty')[0].innerHTML = "Cart Is Empty!";
    cartCounter();
    updateTotal();  
}

