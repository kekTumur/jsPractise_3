import Slider from './slider';

export default class MainSlider extends Slider {
    constructor(btns) {
        super(btns);
    }

    showSlides(n) {
        try {
            this.hanson.style.display = 'none';

            if (n == 3) {
                this.hanson.classList.add('animated', 'fadeInUp');
                setTimeout(() => {
                    this.hanson.style.display = 'block';
                }, 3000);
            } else {
                this.hanson.classList.remove('fadeInUp');
            }
        } catch(e){}

        if (n > this.slides.length) {
            this.slideIndex = 1;
        }

        if (n < 1) {
            this.slideIndex = this.slides.length;
        }

        this.slides.forEach(item => {
            item.style.display = 'none';
        });

        this.slides[this.slideIndex - 1].style.display = 'block';

    }

    plusSlides(n) {
        this.showSlides(this.slideIndex += n);
    }

    bindTriggers() {
        this.btns.forEach(item => {
            item.addEventListener('click', () => {
                this.plusSlides(1);
            });

            item.parentNode.previousElementSibling.addEventListener('click',(e) =>{
                e.preventDefault();
                this.slideIndex = 1;
                this.plusSlides(0);
            });
        });
        document.querySelectorAll('.prevmodule').forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.plusSlides(-1);
            })
        });

        document.querySelectorAll('.nextmodule').forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.plusSlides(1);
            })
        });
    }

    render() {
        if (this.container) {
            try {
                this.hanson = document.querySelector('.hanson');
            } catch(e){}
            this.showSlides(this.slideIndex);
            this.bindTriggers();
        }
    }
}