export default class Accordion {
    constructor(selector, btnSelector) {
        this.wrapper = document.querySelectorAll(selector);
        this.btn = btnSelector;
    }

    showContent(msg) {
        msg.classList.add('animated');

        if (msg.style.display === 'block') {
            msg.classList.remove('slideInDown');
            msg.classList.add('fadeOutUp');
            
            msg.style.display = 'none';
        } else {
            msg.classList.remove('fadeOutUp');
            msg.classList.add('slideInDown');

            msg.style.display = 'block';
        }
    }

    init() {
        this.wrapper.forEach(item => {
            const btn = item.querySelector(this.btn),
                  msg = item.nextElementSibling;
            btn.addEventListener('click', () => {
                this.showContent(msg);
            });
        });
    }
}