export const ALPHA_ARR = [...Array(26)].map((val, i) => String.fromCharCode(i + 65));
export const MEMBER_TYPE_OPEN_TAG = '<p class="organisation_member_type"><a href="/membership/membership-types/?utm_source=blog&utm_medium=display&utm_campaign=membership" title="click for information on GSMA Membership">';
export const MEMBER_TYPE_CLOSE_TAG = '</a></p>';
export const CATEGORY_DATA = {
    associate: {
        taxID: 4543,
        toggleClass: 'showchar',
        classBase: 'char',
        orderby: 'title'
    },
    full: {
        taxID: 4544,
        toggleClass: 'showcountry',
        classBase: 'ctry',
        orderby: 'country',
    }
};
export const PER_PAGE = 60;
export const ALPHA_NUM_ARR = ['num', ...ALPHA_ARR];