// // import{
// //     state,
// //     bookmarksBtnEL,
// //     jobListBookmarksEl,
// //     jobDetailsEl
    
// // } from '../common.js'
// // import renderJoblist from './Joblists.js'


// // const clickHandler=(event)=>{

// //     if(!event.target.className.includes('bookmark')){
// //         return;
// //     }

// //     // now we have to update the state by adding the active item to bookmark array
// //     state.bookmarkJobItems.push(state.activeJobItem);

// //     // update bookmark icon
// //     document.querySelector('.job-info__bookmark-icon').classList.toggle('job-info__bookmark-icon--bookmarked');

// // }

// // const mouseEnterHandler=(event)=>{
// //     bookmarksBtnEL.classList.add('bookmarks-btn--active');
// //     jobListBookmarksEl.classList.add('job-list--visible');

// //     renderJoblist('bookmarks-jobList')
// // }

// // const mouseLeaveHandler=(event)=>{
// //     bookmarksBtnEL.classList.remove('bookmarks-btn--active')
// //     jobListBookmarksEl.classList.remove('job-list--visible');
// // }

// // jobDetailsEl.addEventListener('click',clickHandler)
// // jobListBookmarksEl.addEventListener('mouseleave',mouseLeaveHandler);
// // bookmarksBtnEL.addEventListener('mouseenter',mouseEnterHandler);




// // new one.....
import {
    state,
    bookmarksBtnEL,
    jobDetailsEl,
    jobListBookmarksEl

}from '../common.js'
import renderJoblist from './Joblists.js'

const clickHandler=(event)=>{
    
  if(!event.target.className.includes('bookmark')){
    return
  }

  if(state.bookmarkJobItems.some((bookmarkJobItem)=>bookmarkJobItem.id === state.activeJobItem.id)){
     state.bookmarkJobItems = state.bookmarkJobItems.filter(bookmarkJobItem => bookmarkJobItem.id !== state.activeJobItem.id);
  }
  else{
    state.bookmarkJobItems.push(state.activeJobItem);
}

 localStorage.setItem('bookmarkJobItems',JSON.stringify(state.bookmarkJobItems));

  document.querySelector('.job-info__bookmark-icon').classList.toggle('job-info__bookmark-icon--bookmarked');


  // for adding the bookmark icon -- the blue tag....
  renderJoblist();
}

const mouseEnterHandler=()=>{
    bookmarksBtnEL.classList.add('bookmarks-btn--active');
    jobListBookmarksEl.classList.add('job-list--visible');
    renderJoblist('bookmarks');
}

const mouseLeaveHandler=()=>{
    bookmarksBtnEL.classList.remove('bookmarks-btn--active');
    jobListBookmarksEl.classList.remove('job-list--visible')
}
jobDetailsEl.addEventListener('click',clickHandler)
bookmarksBtnEL.addEventListener('mouseenter', mouseEnterHandler);
jobListBookmarksEl.addEventListener('mouseleave', mouseLeaveHandler);






// jobListBookmarksEl.addEventListener('mouseleave', mouseLeaveHandler);