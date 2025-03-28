// -- Global constant values
export const default_display_time=3500;
export const base_url_api='https://bytegrad.com/course-assets/js/2/api';
export const Result_per_page = 7;

// global selectors
export const bookmarksBtnEL=document.querySelector('.bookmarks-btn');
export const errorEl=document.querySelector('.error');
export const errorTextEl=document.querySelector('.error__text');
export const jobDetailsEl=document.querySelector('.job-details');
export const jobDetailsContentEl=document.querySelector('.job-details__content');
export const jobListBookmarksEl=document.querySelector('.job-list--bookmarks');
export const jobListSearchEl=document.querySelector('.job-list--searched');
export const numberEL=document.querySelector('.count__number');
export const paginationEL=document.querySelector('.pagination');
export const paginationBtnNextEL=document.querySelector('.pagination__button--next');
export const paginationBtnBackEL=document.querySelector('.pagination__button--back');
export const paginationNumberNextEL=document.querySelector('.pagination__number--next');
export const paginationNumberBackEL=document.querySelector('.pagination__number--back');
export const searchFormEl=document.querySelector('.search');
export const searchInputEl=document.querySelector('.search__input');
export const sortingEl=document.querySelector('.sorting');
export const sortingBtnRelevantEl=document.querySelector('.sorting__button--relevant');
export const sortingBtnRecentEl=document.querySelector('.sorting__button--recent');
export const spinnerSearchEl=document.querySelector('.spinner--search');
export const spinnerJobDetailsEl=document.querySelector('.spinner--job-details');

// state
export const state ={
    searchedJobItems :[],
    bookmarkJobItems:[],
    activeJobItem :{},
    currentPage :1,
};


// helper function
export const getData= async(completeUrl)=>{
    const response= await fetch(completeUrl)
    const data =await response.json();
    if(!response.ok){
        throw new Error(data.description)
    }
    return data;
};