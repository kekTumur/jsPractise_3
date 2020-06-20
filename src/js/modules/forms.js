
export default class Forms {
    constructor(forms) {
        this.forms = document.querySelectorAll(forms);
        this.inputs = document.querySelectorAll('input');
        this.message = {
            loading: 'Загрузка',
            success: 'Спасибо! Скоро мы с вами свяжемся',
            failure: 'Что то пошло не так',
            spinner: 'assets/img/spinner.gif',
            ok: 'assets/img/ok.png',
            fail: 'assets/img/fail.png'
        };
        this.path = 'assets/quiestion.php';
    }

    clearInputs() {
        this.inputs.forEach(item => {
            item.value = '';
        });
    }

    checkMailInputs() {
        const mailInputs = document.querySelectorAll('[type="email"]');

        mailInputs.forEach(item => {
            item.addEventListener('keypress', e => {
                if (e.key.match(/[^a-z 0-9 @ \.]/ig)) {
                    e.preventDefault();
                }
            });
        });
    }

    async postData(url, data) {
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: "POST",
            body: data
        });
    
        return await res.text();
    }

    init() {
        this.forms.forEach(item => {
            item.addEventListener('submit', e => {
                e.preventDefault();

                let statusMessage = document.createElement('div');
                statusMessage.style.cssText =  `
                    margin-top: 15px;
                    font-size: 18px;
                    color: grey;
                `;
                item.parentNode.appendChild(statusMessage);

                statusMessage.textContent = this.message.loading;

                const formData = new FormData(item);
                this.postData(this.path, formData)
                    .then(res => {
                        console.log(res);
                        statusMessage.textContent = this.message.success;
                    })
                    .catch(() => statusMessage.textContent = this.message.failure)
                    .finally(() => {
                        this.clearInputs();
                        setTimeout(() => statusMessage.remove(), 2000);
                    });
            });
        });
    }
}