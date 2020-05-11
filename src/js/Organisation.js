/*global php_var*/
import {
    MEMBER_TYPE_OPEN_TAG,
    MEMBER_TYPE_CLOSE_TAG
} from './constants';

let DEFAULT_LOGO;
let ASSOCIATE_MEMBER_STR;
let FULL_MEMBER_STR;

export class Organisation {
    constructor(post, parent) {
        this._post = post;
        this._parent = parent;

        this._countryLetter = post.meta.country ? post.meta.country.charAt(0).toUpperCase() : '';
        this._titleStartWith = post.title.rendered.charAt(0);
        this._firstLetterClass = isNaN(this._titleStartWith) ?
            `${this._titleStartWith}char` :
            'Numchar';

        if (typeof php_var !== 'undefined') {
            DEFAULT_LOGO = php_var.default_logo;
            ASSOCIATE_MEMBER_STR = php_var.associate_member_str;
            FULL_MEMBER_STR = php_var.full_member_str;
        }
    }

    get countryLetter() {
        return this._countryLetter;
    }

    get firstLetterClass() {
        return this._firstLetterClass;
    }

    get titleStartWith() {
        return this._titleStartWith;
    }

    set parent(parentNode) {
        this._parent = parentNode;
    }

    set toggleClass(className) {
        this._toggleClass = className;
    }

    render() {
        const post = this._post;

        const orgElement = document.createElement('div');
        orgElement.classList.add('aorganisation');

        orgElement.classList.add(`${this._countryLetter}ctry`);
        orgElement.classList.add('clickable_organisation');

        orgElement.classList.add(this._firstLetterClass);

        orgElement.setAttribute('data-categories', post.meta.member_type);

        orgElement.setAttribute('id', `post-${post.id}`);

        this._toggleClass && orgElement.classList.add(this._toggleClass);

        const logoContainer = document.createElement('div');
        logoContainer.classList.add('organisation_logo');
        const logoElement = document.createElement('img');
        const logo = post.meta.logo && post.meta.logo.url ?
            post.meta.logo.sizes.medium :
            DEFAULT_LOGO;
        logoElement.setAttribute('src', logo);
        logoContainer.appendChild(logoElement);

        // start of desc box
        const descBoxContainer = document.createElement('div');
        descBoxContainer.setAttribute('class', `descbox descbox-${post.id}`);
        const descBoxElement = document.createElement('div');
        descBoxElement.classList.add('descbox_inner');

        const memberType = post.meta.member_type;
        descBoxElement.innerHTML = `<h3>${post.title.rendered}</h3>`
        if (memberType !== '0') {
            descBoxElement.innerHTML += `${MEMBER_TYPE_OPEN_TAG}
                ${post.meta.member_type === 'Associate' ? ASSOCIATE_MEMBER_STR : FULL_MEMBER_STR}
            ${MEMBER_TYPE_CLOSE_TAG}`;
        }
        const contentElement = document.createElement('p');
        contentElement.innerHTML = post.content.rendered;

        const socialbuttons = document.createElement('div');
        socialbuttons.classList.add('socialbuttons');
        if (post.meta.contact_email) {
            socialbuttons.innerHTML += `<a href="mailto:${post.meta.contact_email}"><i class="fas fa-envelope"></i></a>`;
        }
        if (post.meta.Website) {
            socialbuttons.innerHTML += `<a target="_blank" href="${post.meta.Website}"><i class="fas fa-at"></i><span>${post.meta.Website}</span></a>`
        }
        if (post.meta.website) {
            socialbuttons.innerHTML += `<a target="_blank" href="${post.meta.website}"><i class="fas fa-at"></i><span>${post.meta.website}</span></a>`
        }
        if (post.meta.twitter) {
            socialbuttons.innerHTML += `<a target="_blank" href="https://twitter.com/${post.meta.twitter}"><i class="fab fa-twitter"></i><span>${post.meta.twitter}</span></a>`;
        }
        if (post.meta.facebook) {
            socialbuttons.innerHTML += `<a target="_blank" href="${post.meta.facebook}"><i class="fab fa-facebook"></i></a>`;
        }
        if (post.meta.linkedin) {
            socialbuttons.innerHTML += `<a target="_blank" href="${post.meta.linkedin}"><i class="fab fa-linkedin"></i></a>`;
        }
        descBoxElement.appendChild(contentElement);
        descBoxElement.appendChild(socialbuttons);
        descBoxContainer.appendChild(descBoxElement);
        // end of desc box

        orgElement.appendChild(logoContainer);
        orgElement.appendChild(descBoxContainer);

        orgElement.addEventListener('click', () => {
            const selectedOrg = document.querySelector('.aorganisation.show_descbox');

            if (selectedOrg && selectedOrg !== orgElement) {
                selectedOrg.classList.remove('show_descbox');
                selectedOrg.querySelector('.descbox.show_descbox').classList.remove('show_descbox');
                descBoxContainer.classList.toggle('show_descbox');
                orgElement.classList.toggle('show_descbox');
            } else if (!selectedOrg || selectedOrg === orgElement) {
                descBoxContainer.classList.toggle('show_descbox');
                orgElement.classList.toggle('show_descbox');
            }

        }, false);

        this._parent.appendChild(orgElement);
    }
}
