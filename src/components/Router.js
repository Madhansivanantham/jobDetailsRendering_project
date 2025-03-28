import {
  base_url_api,
  jobDetailsContentEl,
  getData,
  state
}from "../common.js"
import renderSpinner from "./Spinner.js";
import renderError from "./Error.js";
import renderJobDetails from "./JobDetails.js";
import renderJoblist from "./Joblists.js";

const eventLoader = async (event)=>{
   const id = window.location.hash.substring(1);
//    shows the job item details whenever there is an id in url
// means there is click event and want to share this details
   if(id){

    document.querySelectorAll('.job-item--active').forEach((jobItemWithActiveClass)=> jobItemWithActiveClass.classList.remove('job-item--active'));
    jobDetailsContentEl.textContent= '';
    renderSpinner('job-details');

    try{
        const data = await getData(`${base_url_api}/jobs/${id}`);

        const { jobItem }=data;

    //  update the active job item 
        state.activeJobItem = jobItem ;

        renderJoblist();
        // remove spinner
        renderSpinner('job-details');
        renderJobDetails(jobItem);
    }
    catch(error){
        renderSpinner('job-details');
        renderError(error.message);
    }

   }
}

window.addEventListener('DOMContentLoaded' ,eventLoader)

