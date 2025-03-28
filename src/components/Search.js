// --search component
import {
    searchInputEl,
    searchFormEl,
    jobListSearchEl,
    numberEL,
    base_url_api,
    sortingBtnRecentEl,
    sortingBtnRelevantEl,
    getData,
    state
} from '../common.js';
import renderError from './Error.js';
import renderSpinner from './Spinner.js';
import renderJoblist from './Joblists.js';
import renderPaginationBtns from './Pagination.js';

const submitHandler= async (event)=>{
    // prevent default
    event.preventDefault();
    const searchedText= searchInputEl.value;
    console.log(searchedText);
    // validate the search element
    const forbiddenPattern=/[0-9]/;
    const matchPattern=forbiddenPattern.test(searchedText);
    if(matchPattern){
      renderError('something went wrong...');
      return;
    }
    jobListSearchEl.textContent='';

    // reset sorting job items
    sortingBtnRecentEl.classList.remove('sorting__button--active');
    sortingBtnRelevantEl.classList.add('sorting__button--active');

    searchInputEl.blur();
    // render spinner effect in search list ,which is hidden before
    // spinnerSearchEl.classList.add('spinner--visible');
    renderSpinner('search');

    // fetch the input-value in the server
    try{
        const data = await getData(`${base_url_api}/jobs?search=${searchedText}`);

        const jobItems=data.jobItems;

        state.searchedJobItems =jobItems;
        state.currentPage= 1;
        // remove spinner
        renderSpinner('search');

        numberEL.textContent=jobItems.length;

        // render pagination buttons
        renderPaginationBtns();

        // render job items in job list
        renderJoblist();
    }
    catch(error){
        renderSpinner('search');
        renderError(error.message);
    }

}
searchFormEl.addEventListener('submit',submitHandler);



    // fetch(`${base_url_api}/jobs?search=${searchedText}`)
    // .then((response)=>{
    //     if(!response.ok){
    //        throw new Error('Resource issue (e.g. resource doesn"t exist) or sever issue')
    //     }
    //     return response.json();
    // })
    // .then((data)=>{
    //     // console.log(data.jobItems);
    //     const jobItems=data.jobItems;
    //     // console.log(jobItems)
    //     // spinnerSearchEl.classList.remove('spinner--visible');
    //     renderSpinner('search');
    //     renderJoblist(jobItems);
    //     numberEL.textContent=jobItems.length;
    // })
    // .catch((error)=>{
    //    renderSpinner('search');
    //    renderError(error.message);
    // })


