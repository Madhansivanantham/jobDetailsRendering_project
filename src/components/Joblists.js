// --search item component
import{
    jobListSearchEl,
    jobDetailsContentEl,
    base_url_api,
    state,
    getData,
    Result_per_page,
    jobListBookmarksEl
} from '../common.js'
import renderSpinner from './Spinner.js';
import renderJobDetails from './JobDetails.js';
import renderError from './Error.js';

// render jobdetails 
const renderJoblist=(whichJobList ='search')=>{
  
  const jobListEl =whichJobList === 'search' ?jobListSearchEl : jobListBookmarksEl;
  // remove previous job items
    jobListEl.innerHTML='';


    // determine the job items that should be rendered
    let jobItems;
    if(whichJobList === 'search'){
      jobItems =  state.searchedJobItems.slice(state.currentPage *  Result_per_page - Result_per_page , state.currentPage * Result_per_page);
    }
    else if( whichJobList === 'bookmarks'){
      jobItems = state.bookmarkJobItems;
    }

    // display job items
     jobItems.forEach((jobItem)=>{
            
        // now render the jobitems data, which is the data we fetched from the server
          // and add it to the search page
      
          const searchedJobDetailsHTML=`
               <li class="job-item ${state.activeJobItem.id === jobItem.id ? 'job-item--active' : ''}">
                     <a class="job-item__link" href="${jobItem.id}">
                       <div class="job-item__badge">${jobItem.badgeLetters}</div>
                          <div class="job-item__middle">
                           <h3 class="third-heading">${jobItem.title}</h3>
                               <p class="job-item__company">${jobItem.company}</p>
                                <div class="job-item__extras">
                                <p class="job-item__extra"><i class="fa-solid fa-clock job-item__extra-icon"></i> ${jobItem.duration}</p>
                                                  <p class="job-item__extra"><i class="fa-solid fa-money-bill job-item__extra-icon"></i> ${jobItem.salary}</p>
                                    <p class="job-item__extra"><i class="fa-solid fa-location-dot job-item__extra-icon"></i> ${jobItem.location}</p>
                                              </div>
                                          </div>
                              <div class="job-item__right">
                                <i class="fa-solid fa-bookmark job-item__bookmark-icon ${state.bookmarkJobItems.some(bookmarkJobItem => bookmarkJobItem.id === jobItem.id) && 'job-item__bookmark-icon--bookmarked'}"></i>
                              <time class="job-item__time">${jobItem.daysAgo}d</time>
                          </div>
                        </a>
               </li>`
                          
                      jobListEl.insertAdjacentHTML('beforeend',searchedJobDetailsHTML);
           })
           }


const clickHandler= async(event)=>{
    //  prevent default 
    event.preventDefault();
    // console.log('clicked....');
    const jobItemEl=event.target.closest('.job-item');
    // we have to check weather the previous list item have that class 
    // so whenever we use that query selector the fetch call did not give the response
    // so the result should be null then we can have a null value
    // to rectify that we need to use this format..
    // document.querySelector('.job-item--active')&& document.querySelector('.job-item--active').classList.remove('job-item--active');
    document.querySelectorAll('.job-item--active').forEach((jobItemWithActiveClass)=> jobItemWithActiveClass.classList.remove('job-item--active'));

    // jobItemEl.classList.add('job-item--active');
    // remove tha meta-text content
    jobDetailsContentEl.innerHTML='';
    // spinner effect
    // spinnerJobDetailsEl.classList.add('spinner--visible');
    renderSpinner('job-details');
    // the id of clicked jobitem
    const id=jobItemEl.children[0].getAttribute('href');

    
    // update active job item to ensure active class
    const allJobItems = [...state.searchedJobItems, ...state.bookmarkJobItems];
    state.activeJobItem =allJobItems.find(jobItem => jobItem.id === +id);

    // render search job list to add active class
    renderJoblist();
    
    history.pushState(null, '', `/#${id}`)
    // console.log(id)
    // fetch the clicked item data from the server
    try{
        const data = await getData(`${base_url_api}/jobs/${id}`);

        const {jobItem}=data;
        // remove spinner
        renderSpinner('job-details');
        renderJobDetails(jobItem);
    }
    catch(error){
        renderSpinner('job-details');
        renderError(error.message);
    }
    }
jobListSearchEl.addEventListener('click',clickHandler);
jobListBookmarksEl.addEventListener('click',clickHandler);
export default renderJoblist;
     


  // fetch(`${base_url_api}/jobs/${id}`)
    // .then((response)=>{
    //     if(!response.ok){
    //        throw new Error('Resource issue (e.g. resource doesn"t exist) or sever issue');
    //     }
    //     return response.json();
    // })
    // .then((data)=>{
    //     // spinnerJobDetailsEl.classList.remove('spinner--visible');
    //     renderSpinner('job-details');
    //     const {jobItem}=data;
    //     console.log(jobItem);

    //      // render job details
    //     renderJobDetails(jobItem);
    
    // })
    // .catch(error=>{
    //     renderSpinner('search');
    //     renderError(error.message)
    // })