import Slider from './slider';

export default class MiniSlider extends Slider {
    constructor(container, next, prev, activeClass, animate, autoPlay) {
        super(container, next, prev, activeClass, animate, autoPlay);
    }

    decorizeSlides() {
        this.slides.forEach(item => {
            item.classList.remove(this.activeClass);
            if (this.animate) {
                item.querySelector('.card__title').style.opacity = '0.4';
                item.querySelector('.card__controls-arrow').style.opacity = '0';
            }
        });

        if (!this.slides[0].closest('button')){
            this.slides[0].classList.add(this.activeClass);
        }

        this.slides[0].classList.add(this.activeClass);

        if (this.animate) {
            this.slides[0].querySelector('.card__title').style.opacity = '1';
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
        }
    }

    bindTriggers() {
        this.next.addEventListener('click', () => this.nextSlide());

        this.prev.addEventListener('click', () => {

            for (let i = this.slides.length - 1; i > 0; i--) {
                if (this.slides[i].tagName !== "BUTTON") {
                    let active = this.slides[i];
                    this.container.insertBefore(active, this.slides[0]);
                    this.decorizeSlides();
                    break;
                }
            }   
            
            
        });
    }

    nextSlide() {
        if (this.slides[1].tagName == 'BUTTON' && this.slides[2].tagName == 'BUTTON') {
            this.container.appendChild(this.slides[0]);
            this.container.appendChild(this.slides[1]);
            this.container.appendChild(this.slides[2]);
            this.decorizeSlides();
        } else if (this.slides[1].tagName == 'BUTTON') {
            this.container.appendChild(this.slides[0]);
            this.container.appendChild(this.slides[1]);
            this.decorizeSlides();
        } else {
            this.container.appendChild(this.slides[0]);
            this.decorizeSlides();
            this.decorizeSlides();
        }
    }

    init() {
        try {
            this.container.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
            align-items: start';
        `;
            this.bindTriggers();
            this.decorizeSlides();

            if (this.autoPlay) {
                setInterval(() => this.nextSlide(), 5000);
            }
        } catch(e){}
    } 
}