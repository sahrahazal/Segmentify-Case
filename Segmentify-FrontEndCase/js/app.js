var mocks = data.responses[0][0].params;
var sliderContainer = document.querySelector('[slider]');
var menu = document.getElementById('menu');
var popup = document.querySelector('[popup]');

function setCategories() {
    mocks.userCategories.forEach(function (item, index) {
        itemName = item;
        if (item.includes(">")){
            const userCategory = item.split(">");
            itemName = userCategory[userCategory.length - 1];
            if (itemName.length > 25) {
                itemName = itemName.substr(0, 25) + "..."
            }  
        }                   
        var menuItem = '<li class="menu-item ' + (index === 0 ? 'active' : '') + '"  onclick="categoryClickHandler(\'' + item + '\',this)">' + itemName + '</li>';
        menu.innerHTML += menuItem;
    });
}
function closePopup() {
    popup.style.display = "none";
}

function showPopup() {

    if (popup.style.display === "flex") {
        return false;
    }
    else {
        popup.style.display = "flex";
        setTimeout(() => {
            popup.style.display = "none";
        }, 3000);
    }
}

function setSliderItems(products) {
    sliderContainer.innerHTML = '';
    mocks.recommendedProducts[products].forEach(function (item) {
        var sliderItem = '<div class="swiper-slide">';
        sliderItem+='<div class="product">';
        sliderItem += '<img class="img-fluid swiper-lazy" data-src="' + item.image + '" alt="' + item.name + '"><div class="swiper-lazy-preloader"></div>';
        sliderItem += '<h3 class="product-name">' + item.name + '</h3>';
        sliderItem += '<h4 class="product-price">' + item.priceText + '</h4>';
        sliderItem += '<h6 class="cargo-text"> <div fill="#36b458" id="freeCargo" name="freeCargo" width="16" height="16" radius="0" class="ndodpt-1 jJBuGx" color="inherit"><svg width="16" height="16" viewBox="0 0 24 24" fill="#36b458"><path d="M23.808 9.733L21.552 6.6A1.421 1.421 0 0020.4 6h-4.08V4.5c0-.828-.645-1.5-1.44-1.5H1.44C.645 3 0 3.672 0 4.5v12c0 .828.645 1.5 1.44 1.5h1.44c0 1.657 1.29 3 2.88 3 1.59 0 2.88-1.343 2.88-3h5.76c0 1.657 1.29 3 2.88 3 1.59 0 2.88-1.343 2.88-3h1.92c1.06 0 1.92-.895 1.92-2v-5.667c0-.216-.067-.427-.192-.6zM5.76 20c-1.06 0-1.92-.895-1.92-2s.86-2 1.92-2 1.92.895 1.92 2c-.001 1.104-.86 1.999-1.92 2zm11.52 0c-1.06 0-1.92-.895-1.92-2s.86-2 1.92-2 1.92.895 1.92 2c-.001 1.104-.86 1.999-1.92 2zm5.76-9h-6.72V7h4.08c.15 0 .293.075.384.2l2.256 3.133V11z"></path></svg></div> <span>Ücretsiz Kargo</span></h6>';
        sliderItem += '<button onclick="showPopup()" class="add-cart-btn"><span>Sepete Ekle</span></button>';
        sliderItem +='</div>';
        sliderItem += '</div>';
        sliderContainer.innerHTML += sliderItem;
    });
}

function categoryClickHandler(category, element) {

    setSliderItems(category)
    var menuItems = document.getElementsByClassName('menu-item');
    if (menuItems && menuItems.length > 0) {

        menuItems = Array.prototype.slice.call(menuItems);
        menuItems.forEach(function (item) {
            item.classList.remove('active');
        });

        element.classList.add('active');
    }
}

window.addEventListener('load', function () {
    new Swiper('.swiper', {
        slidesPerView: "5",
        spaceBetween: 0,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        preloadImages: false,
        lazy: {
            loadPrevNext: true,
            loadPrevNextAmount: 2
      },
      breakpoints: {
        230: {
            slidesPerView: 2
        },
        991: {
            slidesPerView: 5
        },
        1200: {
            slidesPerView: 5
        }}
    });

    setCategories();
    setSliderItems(mocks.userCategories[0]);
});

