function tabs() {
    //Tabs

    const tabheaderItems = document.querySelector(".tabheader__items"),
        tabs = document.querySelectorAll(".tabheader__item"),
        tabContents = document.querySelectorAll(".tabcontent");

    function hideAllTabs() {
        tabContents.forEach( (item) => {
            item.style.display = "none";
        });

        tabs.forEach( item => {
            item.classList.remove("tabheader__item_active");
        });
    }

    function displayOneTab(i = 0) {
        tabContents[i].style.display = "block";
        tabs[i].classList.add("tabheader__item_active");
    }

    hideAllTabs();
    displayOneTab();

    tabheaderItems.addEventListener("click", event => {
        const divTarget = event.target;
        if (divTarget === tabheaderItems) return;

        tabs.forEach( (item, i) => {
            if (item === divTarget) {
                hideAllTabs();
                displayOneTab(i);
            }
        });
    });
}

export default tabs;