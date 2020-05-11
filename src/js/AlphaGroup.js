import {ALPHA_ARR} from './constants';

export class AlphaGroup {
    constructor(parentNode, toggleClass, classBase) {
        this.parent = parentNode;
        this.toggleClass = toggleClass;
        this.classBase = classBase;
    }

    get activeChar() {
        return this._activeChar;
    }

    render () {
        const alphaArrWithNum = [...ALPHA_ARR, 'Num'];
        const alphaContainer = document.createElement('div');
        alphaContainer.classList.add('alpha');

        alphaArrWithNum.forEach((element) => {
            const letter = document.createElement('div');
            letter.setAttribute('class', `alphachar alpha${element}`);
            letter.innerHTML = (element === 'Num' ? '#' : element);
            alphaContainer.appendChild(letter);

            letter.addEventListener('click', () => {
                const selectedLetterArr = this.parent.querySelectorAll('.activechar');
                if (selectedLetterArr.length > 0) {
                    selectedLetterArr.forEach(el => {
                        el.classList.remove('activechar');
                    })
                }
                const newSelectedLetterArr = this.parent.querySelectorAll(`.alphachar.alpha${element}`);
                if (newSelectedLetterArr.length > 0) {
                    newSelectedLetterArr.forEach(el => {
                        el.classList.add('activechar');
                    })
                }
                this._activeChar = element;

                const shownOrgArr = document.querySelectorAll(`.${this.toggleClass}`);
                shownOrgArr.forEach(org => {
                    org.classList.remove(this.toggleClass);
                });
                const selectedOrgArr = document.querySelectorAll(`.${element + this.classBase}`);
                selectedOrgArr.forEach(org => {
                    org.classList.add(this.toggleClass);
                });


            }, false);
        });

        this.parent.appendChild(alphaContainer);
    }
}