!function(){"use strict";const e="https://bytegrad.com/course-assets/js/2/api",t=document.querySelector(".bookmarks-btn"),o=document.querySelector(".error"),s=document.querySelector(".error__text"),a=document.querySelector(".job-details"),i=document.querySelector(".job-details__content"),n=document.querySelector(".job-list--bookmarks"),c=document.querySelector(".job-list--searched"),r=document.querySelector(".count__number"),l=document.querySelector(".pagination"),b=document.querySelector(".pagination__button--next"),d=document.querySelector(".pagination__button--back"),m=document.querySelector(".pagination__number--next"),_=document.querySelector(".pagination__number--back"),u=document.querySelector(".search"),v=document.querySelector(".search__input"),f=document.querySelector(".sorting"),g=document.querySelector(".sorting__button--relevant"),k=document.querySelector(".sorting__button--recent"),p=document.querySelector(".spinner--search"),j=document.querySelector(".spinner--job-details"),h={searchedJobItems:[],bookmarkJobItems:[],activeJobItem:{},currentPage:1},y=async e=>{const t=await fetch(e),o=await t.json();if(!t.ok)throw new Error(o.description);return o};var L=e=>{o.classList.add("error--visible"),s.textContent=e,setTimeout((()=>{o.classList.remove("error--visible")}),3500)},I=e=>{("search"===e?p:j).classList.toggle("spinner--visible")},$=e=>{const t=`\n           <img src="${e.coverImgURL}" alt="#" class="job-details__cover-img">\n\n           <a class="apply-btn" href="${e.companyURL}" target="_blank">Apply <i class="fa-solid fa-square-arrow-up-right apply-btn__icon"></i></a>\n\n           <section class="job-info">\n               <div class="job-info__left">\n                   <div class="job-info__badge">${e.badgeLetters}</div>\n                   <div class="job-info__below-badge">\n                       <time class="job-info__time">${e.daysAgo}d</time>\n                       <button class="job-info__bookmark-btn">\n                           <i class="fa-solid fa-bookmark job-info__bookmark-icon ${h.bookmarkJobItems.some((t=>t.id===e.id))&&"job-info__bookmark-icon--bookmarked"}"></i>\n                       </button>\n                   </div>\n               </div>\n               <div class="job-info__right">\n                   <h2 class="second-heading">${e.title}</h2>\n                   <p class="job-info__company">${e.company}</p>\n                   <p class="job-info__description">${e.description}</p>\n                   <div class="job-info__extras">\n                       <p class="job-info__extra"><i class="fa-solid fa-clock job-info__extra-icon"></i> ${e.duration}</p>\n                       <p class="job-info__extra"><i class="fa-solid fa-money-bill job-info__extra-icon"></i> ${e.salary}</p>\n                       <p class="job-info__extra"><i class="fa-solid fa-location-dot job-info__extra-icon"></i> ${e.location}</p>\n                   </div>\n               </div>\n           </section>\n\n           <div class="job-details__other">\n               <section class="qualifications">\n                   <div class="qualifications__left">\n                       <h4 class="fourth-heading">Qualifications</h4>\n                       <p class="qualifications__sub-text">Other qualifications may apply</p>\n                   </div>\n                   <ul class="qualifications__list">\n                       ${e.qualifications.map((e=>`<li class="qualifications__item">${e}</li>`)).join("")}\n                   </ul>\n               </section>\n               \n               <section class="reviews">\n                   <div class="reviews__left">\n                       <h4 class="fourth-heading">Company reviews</h4>\n                       <p class="reviews__sub-text">Recent things people are saying</p>\n                   </div>\n                   <ul class="reviews__list">\n                       ${e.reviews.map((e=>`<li class="reviews__item">${e}</li>`)).join("")}\n                   </ul>\n               </section>\n           </div>\n\n           <footer class="job-details__footer">\n               <p class="job-details__footer-text">If possible, please reference that you found the job on <span class="u-bold">rmtDev</span>, we would really appreciate it!</p>\n           </footer>\n       `;i.innerHTML=t};const q=(e="search")=>{const t="search"===e?c:n;let o;t.innerHTML="","search"===e?o=h.searchedJobItems.slice(7*h.currentPage-7,7*h.currentPage):"bookmarks"===e&&(o=h.bookmarkJobItems),o.forEach((e=>{const o=`\n               <li class="job-item ${h.activeJobItem.id===e.id?"job-item--active":""}">\n                     <a class="job-item__link" href="${e.id}">\n                       <div class="job-item__badge">${e.badgeLetters}</div>\n                          <div class="job-item__middle">\n                           <h3 class="third-heading">${e.title}</h3>\n                               <p class="job-item__company">${e.company}</p>\n                                <div class="job-item__extras">\n                                <p class="job-item__extra"><i class="fa-solid fa-clock job-item__extra-icon"></i> ${e.duration}</p>\n                                                  <p class="job-item__extra"><i class="fa-solid fa-money-bill job-item__extra-icon"></i> ${e.salary}</p>\n                                    <p class="job-item__extra"><i class="fa-solid fa-location-dot job-item__extra-icon"></i> ${e.location}</p>\n                                              </div>\n                                          </div>\n                              <div class="job-item__right">\n                                <i class="fa-solid fa-bookmark job-item__bookmark-icon ${h.bookmarkJobItems.some((t=>t.id===e.id))&&"job-item__bookmark-icon--bookmarked"}"></i>\n                              <time class="job-item__time">${e.daysAgo}d</time>\n                          </div>\n                        </a>\n               </li>`;t.insertAdjacentHTML("beforeend",o)}))},S=async t=>{t.preventDefault();const o=t.target.closest(".job-item");document.querySelectorAll(".job-item--active").forEach((e=>e.classList.remove("job-item--active"))),i.innerHTML="",I("job-details");const s=o.children[0].getAttribute("href"),a=[...h.searchedJobItems,...h.bookmarkJobItems];h.activeJobItem=a.find((e=>e.id===+s)),q(),history.pushState(null,"",`/#${s}`);try{const t=await y(`${e}/jobs/${s}`),{jobItem:o}=t;I("job-details"),$(o)}catch(e){I("job-details"),L(e.message)}};c.addEventListener("click",S),n.addEventListener("click",S);var J=q;const x=()=>{h.currentPage>=2?d.classList.remove("pagination__button--hidden"):d.classList.add("pagination__button--hidden"),h.searchedJobItems.length-7*h.currentPage<=0?b.classList.add("pagination__button--hidden"):b.classList.remove("pagination__button--hidden"),m.textContent=h.currentPage+1,_.textContent=h.currentPage-1,d.blur(),b.blur()};l.addEventListener("click",(e=>{const t=e.target.closest(".pagination__button");t&&(t.className.includes("--next")?h.currentPage++:h.currentPage--,x(),J())}));var w=x;u.addEventListener("submit",(async t=>{t.preventDefault();const o=v.value;if(console.log(o),/[0-9]/.test(o))L("something went wrong...");else{c.textContent="",k.classList.remove("sorting__button--active"),g.classList.add("sorting__button--active"),v.blur(),I("search");try{const t=(await y(`${e}/jobs?search=${o}`)).jobItems;h.searchedJobItems=t,h.currentPage=1,I("search"),r.textContent=t.length,w(),J()}catch(e){I("search"),L(e.message)}}})),f.addEventListener("click",(e=>{const t=e.target.closest(".sorting__button");if(!t)return;h.currentPage=1;const o=!!t.className.includes("--recent");o?(k.classList.add("sorting__button--active"),g.classList.remove("sorting__button--active")):(k.classList.remove("sorting__button--active"),g.classList.add("sorting__button--active")),o?h.searchedJobItems.sort(((e,t)=>e.daysAgo-t.daysAgo)):h.searchedJobItems.sort(((e,t)=>t.relevanceScore-e.relevanceScore)),w(),J()})),window.addEventListener("DOMContentLoaded",(async t=>{const o=window.location.hash.substring(1);if(o){document.querySelectorAll(".job-item--active").forEach((e=>e.classList.remove("job-item--active"))),i.textContent="",I("job-details");try{const t=await y(`${e}/jobs/${o}`),{jobItem:s}=t;h.activeJobItem=s,J(),I("job-details"),$(s)}catch(e){I("job-details"),L(e.message)}}})),a.addEventListener("click",(e=>{e.target.className.includes("bookmark")&&(h.bookmarkJobItems.some((e=>e.id===h.activeJobItem.id))?h.bookmarkJobItems=h.bookmarkJobItems.filter((e=>e.id!==h.activeJobItem.id)):h.bookmarkJobItems.push(h.activeJobItem),localStorage.setItem("bookmarkJobItems",JSON.stringify(h.bookmarkJobItems)),document.querySelector(".job-info__bookmark-icon").classList.toggle("job-info__bookmark-icon--bookmarked"),J())})),t.addEventListener("mouseenter",(()=>{t.classList.add("bookmarks-btn--active"),n.classList.add("job-list--visible"),J("bookmarks")})),n.addEventListener("mouseleave",(()=>{t.classList.remove("bookmarks-btn--active"),n.classList.remove("job-list--visible")}));const E=localStorage.getItem("bookmarkJobItems");E&&(h.bookmarkJobItems=JSON.parse(E))}();