const axios = require("axios");

function cards() {
    //Menu cards
    class MenuItem {
        constructor(imgSrc, imgAlt, title, description, price, parentSelector, ...classes) {
            this.imgSrc = imgSrc;
            this.imgAlt = imgAlt;
            this.title = title;
            this.description = description;
            this.price = price;
            this.classes = classes.length === 0 ? ['menu__item'] : classes;
            this.transfer = 27;
            this.parent = document.querySelector(parentSelector);
            this.convertPriceToUAH();
        }

        render() {
            const element = document.createElement('div');
            this.classes.forEach(item => element.classList.add(item));

            element.innerHTML = `
                <img src="${this.imgSrc}" alt="${this.imgAlt}">
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.description}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
        `;

            this.parent.append(element);
        }

        convertPriceToUAH() {
            this.price *= this.transfer;
        }
    }


    axios.get("http://localhost:3000/menu")
        .then(response => response.data.forEach(({img, altimg, title, descr, price}) => {
            new MenuItem(img, altimg, title, descr, price, ".cards .container").render();
        }));
}

export default cards;