import{
    sortingEl,
    state,
    sortingBtnRelevantEl,
    sortingBtnRecentEl
} from "../common.js"
import renderJoblist from "./Joblists.js";
import renderPaginationBtns from "./Pagination.js";

const clickHandler=(event)=>{
    const clickedEl= event.target.closest('.sorting__button');
    // stop function if the clicked element is not we wanted
    if(!clickedEl){
        return;
    }


    // to render recent items so that state have to go to initial
    // then only the job items shows the relevant one
    state.currentPage =1;


    // check the clicked element for recent or relevant
    const recent =clickedEl.className.includes('--recent')?true : false;
    if(recent){
      sortingBtnRecentEl.classList.add('sorting__button--active');
      sortingBtnRelevantEl.classList.remove('sorting__button--active')
    }
    else{
      sortingBtnRecentEl.classList.remove('sorting__button--active');
      sortingBtnRelevantEl.classList.add('sorting__button--active')
    }

    if(recent){
    state.searchedJobItems.sort((a,b)=>{
        return a.daysAgo - b.daysAgo;
    })
    }
    else{
    state.searchedJobItems.sort((a,b)=>{
        return b.relevanceScore - a.relevanceScore;
    })
    }

    // reset pagination buttons to make sure in the first page
    renderPaginationBtns()

    // render job items
    renderJoblist();
}
sortingEl.addEventListener('click',clickHandler)