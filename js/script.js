"use strict"

import tabs from "./modules/tabs";
import modal from "./modules/modal";
import timer from "./modules/timer";
import cards from "./modules/cards";
import calculator from "./modules/calculator";
import slider  from "./modules/slider";

document.addEventListener('DOMContentLoaded', () => {
    tabs();
    modal();
    timer();
    cards();
    calculator();
    slider();
});
