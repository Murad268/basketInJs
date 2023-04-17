const container = document.querySelector(".main__container");
const containerBasket = document.querySelector(".basket__container");
let basket = JSON.parse(localStorage.getItem("basket")) || {};
let basketPageElements = products.filter(product => basket.hasOwnProperty(product.id));

function renderItems(elements, container) { 
   container.innerHTML = ""
      elements.forEach(product => {
   let button = !basket.hasOwnProperty(product.id)?`<button data-id=${product.id} class="add">səbətə əlavə et</button>`:`<button data-id=${product.id} class="remove">səbətdən sil</button>`     
      const element = 
      `
         <div class="goods">
            <div class="goods__img">
               <img src="${product.src}" alt="">
            </div>
            <div class="main__wr">
               <div class="goods__title">${product.name}</div>
               <div class="goods__price">${product.price}$</div>
            </div>
           ${button}
         </div>
      `
      container.insertAdjacentHTML('beforeend', element)
   })



}


function renderBasket(elements, container) {
   container.innerHTML = ""
   elements.forEach(product => {
      const element = 
      `
         <div class="goods">
            <div class="goods__img">
               <img src="${product.src}" alt="">
            </div>
            <div class="main__wr">
               <div class="goods__title">${product.name}</div>
               <div class="goods__price">${product.price}$</div>
            </div>
            <div class="btns">
               <div data-id=${product.id} class="increase"><i class="fa fa-minus-circle" aria-hidden="true"></i></div>
               <div class="count">${basket[product.id]}</div>
               <div data-id=${product.id} class="descrease"><i class="fa fa-plus-circle" aria-hidden="true"></i></div>
            </div>
         </div>
      `
      container.insertAdjacentHTML('beforeend', element)
   })
}


function addRemove(id, process) {
   if(process === "add") {
      if(basket.hasOwnProperty(id)) {
         return
      }
      basket[id] = 1;
   } else {
      if(!basket.hasOwnProperty(id)) {
         return
      }
      delete basket[id]
   }
   localStorage.setItem("basket", JSON.stringify(basket));
}

const findId = (el) => el.target.getAttribute("data-id");


document.addEventListener("click", e => {
   if(e.target.classList.contains("add")) {
      const id = findId(e);
      const element = products.filter(el => el.id === +id);
      addRemove(element[0].id, "add");
      renderItems(products, container)
   }
})


document.addEventListener("click", e => {
   if(e.target.classList.contains("remove")) {
      const id = findId(e);
      const element = products.filter(el => el.id === +id);
      addRemove(element[0].id, 'remove');
      renderItems(products, container)
   }
})



document.addEventListener("click", e => {
   if(e.target.parentElement.classList.contains("descrease")) {
      const id = e.target.parentElement.getAttribute("data-id");
      basket[+id] = basket[+id]+1;
      localStorage.setItem("basket", JSON.stringify(basket));
      renderBasket(basketPageElements, containerBasket)
   }
})



document.addEventListener("click", e => {
   if(e.target.parentElement.classList.contains("increase")) {
      const id = e.target.parentElement.getAttribute("data-id");
      if(basket[+id]>1) {
         basket[+id] = basket[+id]-1;
      }
      renderBasket(basketPageElements, containerBasket)
      localStorage.setItem("basket", JSON.stringify(basket));
   }
})