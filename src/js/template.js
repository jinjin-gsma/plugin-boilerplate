import {CATEGORY_DATA, PER_PAGE} from './constants.js';
import {AlphaGroup} from './AlphaGroup.js';
import {Organisation} from './Organisation.js';

let ENDPOINT_BASE = `${window.location.protocol}//${window.location.hostname}/membership/wp-json/wp/v2/organisation/`;
let CONTAINER;
let MEMBER_TYPE = 'associate';
let TOTAL_PAGES = 0;
let CURRENT_PAGE = 1;
let ALPHA_GROUP;

export function init() {
    CONTAINER = document.querySelector('.memberpage') || document.createElement('section');
    MEMBER_TYPE = CONTAINER.classList.contains('full-member') ? 'full' : 'associate';

    ALPHA_GROUP = new AlphaGroup(CONTAINER, CATEGORY_DATA[MEMBER_TYPE].toggleClass, CATEGORY_DATA[MEMBER_TYPE].classBase);
    ALPHA_GROUP.render();

    ENDPOINT_BASE += `?organisation_categories=${CATEGORY_DATA[MEMBER_TYPE].taxID}&orderby=${CATEGORY_DATA[MEMBER_TYPE].orderby}&order=asc&per_page=${PER_PAGE}`;
    fetchData(ENDPOINT_BASE, fetchCallback);
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

function fetchCallback(data) {
    renderOrganisations(data);

    CURRENT_PAGE === 1 && ALPHA_GROUP.render();

    CURRENT_PAGE += 1;
    if (CURRENT_PAGE <= TOTAL_PAGES) {
        const endpoint = `${ENDPOINT_BASE}&page=${CURRENT_PAGE}`;
        fetchData(endpoint, fetchCallback);
    }
}

function renderOrganisations (data) {
    const activeChar = ALPHA_GROUP.activeChar;
    data.forEach(post => {
        const orgElement = new Organisation(post);
        if (!activeChar ||
            MEMBER_TYPE === 'full' && activeChar === orgElement.countryLetter ||
            MEMBER_TYPE === 'associate' && activeChar === orgElement.titleStartWith)
        {
            orgElement.toggleClass = CATEGORY_DATA[MEMBER_TYPE].toggleClass;
        }
        let orgContainer;
        if (MEMBER_TYPE === 'associate' && CONTAINER.querySelector(`.${orgElement.firstLetterClass}`)) {
            orgContainer = CONTAINER.querySelector(`.${orgElement.firstLetterClass}`).parentNode;
        } else if (MEMBER_TYPE === 'full' && CONTAINER.querySelector(`.${post.meta.country.replace(/\W/g, '')}`)) {
            orgContainer = CONTAINER.querySelector(`.${post.meta.country.replace(/\W/g, '')}`);
        } else {
            orgContainer = document.createElement('div');
            orgContainer.classList.add('organisations');

            if (MEMBER_TYPE === 'full') {
                const countryNameContainer = document.createElement('h3');
                countryNameContainer.classList.add('countryname', `${orgElement.countryLetter}ctry`);
                if (!activeChar || activeChar === orgElement.countryLetter) {
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
        orgElement.parent = orgContainer;
        orgElement.render();
    });
}