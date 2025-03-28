import{
    paginationEL,
    paginationBtnNextEL,
    paginationBtnBackEL,
    paginationNumberNextEL,
    paginationNumberBackEL,
    state,
    Result_per_page
}
from "../common.js"
import renderJoblist from "./Joblists.js";

// render pagination button
const renderPaginationBtns =()=>{
    // display back button
    if(state.currentPage >=2){
        paginationBtnBackEL.classList.remove('pagination__button--hidden')
    }
    else{
        paginationBtnBackEL.classList.add('pagination__button--hidden')
    }
    //  display and disable the next button
    if((state.searchedJobItems.length - state.currentPage * Result_per_page)<=0){
        paginationBtnNextEL.classList.add('pagination__button--hidden')
    }
    else{
        paginationBtnNextEL.classList.remove('pagination__button--hidden')
    }

    // update pagination - page numbers
    paginationNumberNextEL.textContent = state.currentPage + 1;
    paginationNumberBackEL.textContent = state.currentPage - 1;

    // blur the buttons 
    paginationBtnBackEL.blur();
    paginationBtnNextEL.blur();
}

const clickHandler=(event)=>{
    const clickedButtonEl = event.target.closest('.pagination__button');
    // stop function if clicked element is not we wanted i.e not click event in button
    if(!clickedButtonEl){
        return;
    }
    const nextPage = clickedButtonEl.className.includes('--next')? true : false ;
    // update the current page , if the user clicks the next btn then 
    // he wants to navigate to other page so increment one
    nextPage ? state.currentPage++ : state.currentPage-- ;

    // render pagination button
    renderPaginationBtns();

    // render job items for that page
    renderJoblist();
}

paginationEL.addEventListener('click',clickHandler);
export default renderPaginationBtns;