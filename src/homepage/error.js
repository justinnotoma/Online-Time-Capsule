export function createErrorToast(error) {
    const errorParts = error["message"].split(':')

        const toast = document.createElement('div')
        toast.innerHTML = `
            <p id="error-code"> <strong>Error ${errorParts[0]}:</strong> </p>
            <p id="error-message">${errorParts[1]}</p>
            <i class='bx bx-x remove'></i>
        `

        toast.classList.add('toast')
        toast.classList.add('show-animation')

        document.querySelector('body').append(toast)

        toastRemoveBtn()
}

function toastRemoveBtn() {
    // create a function this delete toast when click
    const removeToast = (element) => {
        const elementParent = element.target.parentElement

        // Hide toast animation
        elementParent.classList.remove('show-animation')
        setTimeout(() => { elementParent.classList.add('hide-animation') }, 100);

        // Remove toast element
        setTimeout(() => { element.target.parentElement.remove() }, 1000);
    }

    // Get all the removeBtns, and add the "removeToast" function to them
    const removeBtns = document.getElementsByClassName('remove')
    for(const removeBtn of removeBtns) {
        removeBtn.removeEventListener('click', removeToast)
        removeBtn.addEventListener('click', removeToast)
    }
}