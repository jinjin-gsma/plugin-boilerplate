/*global php_var*/
import {
    ALPHA_ARR,
    MEMBER_TYPE_OPEN_TAG,
    MEMBER_TYPE_CLOSE_TAG,
    CATEGORY_DATA,
    PER_PAGE,
    ALPHA_NUM_ARR
} from './constants.js';

let ENDPOINT_BASE = `${window.location.protocol}//${window.location.hostname}/membership/wp-json/wp/v2/organisation/`;
let CONTAINER;
let MEMBER_TYPE = 'associate';
let DEFAULT_LOGO = '';
let ASSOCIATE_MEMBER_STR = '';
let FULL_MEMBER_STR = '';
let TOTAL_PAGES = 0;
let CURRENT_PAGE = 1;
let ACTIVE_CHAR = '';

export function init() {
    if (typeof php_var !== 'undefined') {
        console.log(php_var);
        DEFAULT_LOGO = php_var.default_logo;
        ASSOCIATE_MEMBER_STR = php_var.associate_member_str;
        FULL_MEMBER_STR = php_var.full_member_str;
    }
    console.log(ALPHA_NUM_ARR);
    CONTAINER = document.querySelector('.memberpage') || document.createElement('section');
    MEMBER_TYPE = CONTAINER.classList.contains('full-member') ? 'full' : 'associate';

    renderAlpha();

    ENDPOINT_BASE += `?organisation_categories=${CATEGORY_DATA[MEMBER_TYPE].taxID}&orderby=${CATEGORY_DATA[MEMBER_TYPE].orderby}&order=asc&per_page=${PER_PAGE}`;
    fetchData(ENDPOINT_BASE, fetchCallBack);
}

function fetchData(API, callback) {
    fetch(API)
        .then(
            (res) => {
                console.log(res.headers.get('x-wp-total'));
                !TOTAL_PAGES && (TOTAL_PAGES = res.headers.get('x-wp-totalpages'));
                console.log(res.headers.get('x-wp-totalpages'));
                return res.json();
            }
        )
        .then(
            (result) => {
                console.log(result);
                callback(result);
            },
            (error) => {
                console.log(error);
            }
        )
}

function fetchCallBack(data) {
    renderOrganisations(data);

    CURRENT_PAGE === 1 && renderAlpha();

    CURRENT_PAGE += 1;
    if (CURRENT_PAGE <= TOTAL_PAGES) {
        const endpoint = `${ENDPOINT_BASE}&page=${CURRENT_PAGE}`;
        fetchData(endpoint, fetchCallBack);
    }
}

function renderAlpha() {
    const alphaArrWithNum = [...ALPHA_ARR, 'Num'];
    const alphaContainer = document.createElement('div');
    alphaContainer.classList.add('alpha');

    alphaArrWithNum.forEach((element) => {
        const letter = document.createElement('div');
        letter.setAttribute('class', `alphachar alpha${element}`);
        letter.innerHTML = (element === 'Num' ? '#' : element);
        alphaContainer.appendChild(letter);

        letter.addEventListener('click', () => {
            const selectedLetterArr = CONTAINER.querySelectorAll('.activechar');
            if (selectedLetterArr.length > 0) {
                selectedLetterArr.forEach(el => {
                    el.classList.remove('activechar');
                })
            }
            const newSelectedLetterArr = CONTAINER.querySelectorAll(`.alphachar.alpha${element}`);
            if (newSelectedLetterArr.length > 0) {
                newSelectedLetterArr.forEach(el => {
                    el.classList.add('activechar');
                })
            }
            ACTIVE_CHAR = element;

            const shownOrgArr = document.querySelectorAll(`.${CATEGORY_DATA[MEMBER_TYPE].toggleClass}`);
            shownOrgArr.forEach(org => {
                org.classList.remove(CATEGORY_DATA[MEMBER_TYPE].toggleClass);
            });
            const selectedOrgArr = document.querySelectorAll(`.${element + CATEGORY_DATA[MEMBER_TYPE].classBase}`);
            selectedOrgArr.forEach(org => {
                org.classList.add(CATEGORY_DATA[MEMBER_TYPE].toggleClass);
            });

        }, false);
    });

    CONTAINER.appendChild(alphaContainer);
}

function renderOrganisations (data) {
    data.forEach(post => {

        const orgElement = document.createElement('div');
        orgElement.classList.add('aorganisation');

        const countryLetter = post.meta.country ? post.meta.country.charAt(0).toUpperCase() : '';
        orgElement.classList.add(`${countryLetter}ctry`);
        orgElement.classList.add('clickable_organisation');

        const titleStartWith = post.title.rendered.charAt(0);
        const firstLetterClass = isNaN(titleStartWith) ?
            `${titleStartWith}char` :
            'Numchar';
        orgElement.classList.add(firstLetterClass);

        orgElement.setAttribute('data-categories', post.meta.member_type);

        orgElement.setAttribute('id', `post-${post.id}`);

        // display all orgs to start
        if (!ACTIVE_CHAR ||
            MEMBER_TYPE === 'full' && ACTIVE_CHAR === countryLetter ||
            MEMBER_TYPE === 'associate' && ACTIVE_CHAR === titleStartWith)
        {
            orgElement.classList.add(CATEGORY_DATA[MEMBER_TYPE].toggleClass);
        }

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

        let orgContainer;
        if (MEMBER_TYPE === 'associate' && CONTAINER.querySelector(`.${firstLetterClass}`)) {
            orgContainer = CONTAINER.querySelector(`.${firstLetterClass}`).parentNode;
        } else if (MEMBER_TYPE === 'full' && CONTAINER.querySelector(`.${post.meta.country.replace(/\W/g, '')}`)) {
            orgContainer = CONTAINER.querySelector(`.${post.meta.country.replace(/\W/g, '')}`);
        } else {
            orgContainer = document.createElement('div');
            orgContainer.classList.add('organisations');

            if (MEMBER_TYPE === 'full') {
                const countryNameContainer = document.createElement('h3');
                countryNameContainer.classList.add('countryname', `${countryLetter}ctry`);
                if (!ACTIVE_CHAR || ACTIVE_CHAR === countryLetter) {
                    countryNameContainer.classList.add(CATEGORY_DATA[MEMBER_TYPE].toggleClass);
                }

                countryNameContainer.innerHTML = post.meta.country;
                CURRENT_PAGE === 1 ?
                    CONTAINER.appendChild(countryNameContainer) :
                    CONTAINER.insertBefore(countryNameContainer, CONTAINER.lastChild);
                orgContainer.classList.add(post.meta.country.replace(/\W/g, ''));
            }
            CURRENT_PAGE === 1 ?
                CONTAINER.appendChild(orgContainer) :
                CONTAINER.insertBefore(orgContainer, CONTAINER.lastChild);
        }
        orgContainer.appendChild(orgElement);
    });
}