function modal() {
    //Modal window

    //Show modal window
    const modal = document.querySelector('.modal'),
        modalTrigger = document.querySelectorAll('[data-modal]');

    const hideModalWindow = () => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    };

    const showModalWindow = () => {
        clearTimeout(modalId);
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    };

    const showModalByScroll = () => {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight ) {
            showModalWindow();
            window.removeEventListener('scroll', showModalByScroll);
            clearTimeout(modalId);
        }
    };

    modalTrigger.forEach(btn => btn.addEventListener('click', showModalWindow));


    modal.addEventListener('click', event => {
        if (event.target === modal || event.target.getAttribute('data-close') === '') hideModalWindow();
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && modal.style.display !== "none") hideModalWindow();
    });

    const modalId = setTimeout(showModalWindow, 15000);

    window.addEventListener('scroll', showModalByScroll);

    //Send modal windows info to server
    const forms = document.querySelectorAll("form");

    const message = {
        loading: "img/form/spinner.svg",
        success: "Форма отправлена",
        failure: "Ошибка",
    }

    forms.forEach(form => {
        bindPostData(form);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: data
        });

        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement("img");
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement("afterend", statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                })
                .catch(() => {
                    showThanksModal(message.failure);
                })
                .finally(() => {
                    form.reset();
                });
        })
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector(".modal__dialog");

        prevModalDialog.style.display = "none";
        showModalWindow();

        const thanksModal = document.createElement("div");
        thanksModal.classList.add("modal__dialog");
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector(".modal").append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.style.display = "block";
            hideModalWindow();
        }, 4000);
    }
}

export default modal;