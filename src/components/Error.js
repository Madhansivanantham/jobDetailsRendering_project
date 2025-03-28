import{
    errorEl,
    errorTextEl,
    default_display_time
}
from '../common.js'
const renderError=(message)=>{
    errorEl.classList.add('error--visible');
        errorTextEl.textContent= message;
        setTimeout(()=>{
            errorEl.classList.remove('error--visible')
        },default_display_time)

};
export default renderError;