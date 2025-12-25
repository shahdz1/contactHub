var contactForm = document.getElementById("contact-section");
var contactName = document.getElementById("contactName");
var contactNumber = document.getElementById("contactNumber");
var contactEmail = document.getElementById("contactEmail");
var contactAddress = document.getElementById("contactAddress");
var uploadImage = document.getElementById("uploadImage");
var contactGroup = document.getElementById("contactGroup");
var contactNotes = document.getElementById("contactNotes");
var contactImage = document.getElementById("contactImage");
var addContactBtn = document.getElementById("addContactBtn");
var editContactBtn = document.getElementsByClassName("editContactBtn");
var updateContactBtn = document.getElementById("updateContactBtn");
var noContact = document.getElementById("noContact");
var contactFavorite = document.getElementById("favoriteContact"); 
var contactEmergency = document.getElementById("emergencyContact");
var totalContact = document.getElementsByClassName("totalContact")
var contactInfo = [];
var favContactTotal = document.getElementsByClassName("favContactTotal");
var emergencyContactTotal = document.getElementsByClassName("emergencyContactTotal");
var updatedContact;
if (JSON.parse(localStorage.getItem("all contacts"))) {
    contactInfo = JSON.parse(localStorage.getItem("all contacts"));
    displayContact(contactInfo);
    addToFavourite(contactInfo);
    addToEmergency(contactInfo);
    totalContactCounter();
    favoriteCounter()
    emergencyCounter()
};
function letter(name) {
    var part = name.split(" ");
    var blackbox = "";
    if (part.length >= 2) {
        blackbox = part[0][0].toUpperCase() + part[1][0].toUpperCase();
    }
    else if (part.length === 1 && part[0].length > 0) {
        blackbox = part[0].substring(0, 1).toUpperCase();
    }

    return blackbox;
}
function displayContactForm() {
    contactForm.classList.replace("d-none", "d-block")
};
function closeContactForm() {
    contactForm.classList.replace("d-block", "d-none")
    clearForm()
};
function addContactInfo() {
    if (validFormInput(contactName) && validFormInput(contactEmail) && validFormInput(contactNumber)) {
        for (var i = 0; i < contactInfo.length; i++) {
            if (contactInfo[i].number === contactNumber.value) {
                Swal.fire({
                    icon: "error",
                    title: "Duplicate Phone Number",
                    text: "A contact with this phone number already exists:" + contactInfo[i].name,
                });
                return;
            }
        }
        var contact = {
            name: contactName.value,
            // image: "./images2" + contactImage.value,
            number: contactNumber.value,
            email: contactEmail.value,
            address: contactAddress.value,
            group: contactGroup.value,
            notes: contactNotes.value,
            favorite: contactFavorite.checked,
            emergency: contactEmergency.checked
        };
        contactInfo.push(contact);
        noContact.classList.add("d-none")
        displayContact(contactInfo);
        addToFavourite(contactInfo);
        addToEmergency(contactInfo);
        localStorage.setItem("all contacts", JSON.stringify(contactInfo))
        clearForm();
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Your contact has been saved",
            showConfirmButton: false,
            timer: 1500
        });
        totalContactCounter();
        favoriteCounter();
        emergencyCounter();
        closeContactForm();
    }
};
function clearForm() {
    contactName.value = "";
    contactNumber.value = "";
    contactEmail.value = "";
    contactAddress.value = "";
    contactGroup.value = "";
    contactNotes.value = "";
    contactFavorite.checked = false;
    contactEmergency.checked = false;
};
function displayContact(contactInfo) {
    var blackbox = "";

    if (contactInfo.length === 0) {
        noContact.classList.remove("d-none");
        document.getElementById("contactCard").innerHTML = "";
    } else {
        noContact.classList.add("d-none");
    }
    for (var i = 0; i < contactInfo.length; i++) {
        var imageOrLetter = (contactInfo[i].image && contactInfo[i].image !== "imgs/" && contactInfo[i].image !== "imgs/undefined")
            ? `<img src="${contactInfo[i].image}" class="img-fluid rounded-3 w-100 h-100 object-fit-cover">`
            : `<span>${letter(contactInfo[i].name)}</span>`;
        blackbox += `<div class="col-12 col-md-6">
                                <div class="rounded-4 bg-white contact-holder h-100 d-flex flex-column">
                                    <div class="p-3">
                                        <div class="d-flex gap-3">
                                            <div class="position-relative">
                                                <div
                                                    class="text-white fw-semibold fs-6 d-flex justify-content-center align-items-center img-holder text-uppercase">
                                                ${imageOrLetter}
                                                    </div>
                                            ${contactInfo[i].favorite ? `
                                        <div class="yellow rounded-circle d-flex justify-content-center position-absolute align-items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="8px" height="8px">
                                                <path fill="white" d="M309.5-18.9c-4.1-8-12.4-13.1-21.4-13.1s-17.3 5.1-21.4 13.1L193.1 125.3 33.2 150.7c-8.9 1.4-16.3 7.7-19.1 16.3s-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2s16.9 6.1 25 2L288.1 417.6 432.4 491c8 4.1 17.7 3.3 25-2s11-14.2 9.6-23.2L441.7 305.9 556.1 191.4c6.4-6.4 8.6-15.8 5.8-24.4s-10.1-14.9-19.1-16.3L383 125.3 309.5-18.9z" />
                                            </svg>
                                        </div>` : ""}
                                                ${contactInfo[i].emergency ? `
                                        <div class="red-flow rounded-circle d-flex justify-content-center position-absolute align-items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="8px" height="8px">
                                                <path fill="white" d="M256 107.9L241 87.1C216 52.5 175.9 32 133.1 32 59.6 32 0 91.6 0 165.1l0 2.6c0 23.6 6.2 48 16.6 72.3l106 0c3.2 0 6.1-1.9 7.4-4.9l31.8-76.3c3.7-8.8 12.3-14.6 21.8-14.8s18.3 5.4 22.2 14.1l51.3 113.9 41.4-82.8c4.1-8.1 12.4-13.3 21.5-13.3s17.4 5.1 21.5 13.3l23.2 46.3c1.4 2.7 4.1 4.4 7.2 4.4l123.6 0c10.5-24.3 16.6-48.7 16.6-72.3l0-2.6C512 91.6 452.4 32 378.9 32 336.2 32 296 52.5 271 87.1l-15 20.7zM469.6 288l-97.8 0c-21.2 0-40.6-12-50.1-31l-1.7-3.4-42.5 85.1c-4.1 8.3-12.7 13.5-22 13.3s-17.6-5.7-21.4-14.1l-49.3-109.5-10.5 25.2c-8.7 20.9-29.1 34.5-51.7 34.5l-80.2 0c47.2 73.8 123 141.7 170.4 177.9 12.4 9.4 27.6 14.1 43.1 14.1s30.8-4.6 43.1-14.1C346.6 429.7 422.4 361.8 469.6 288z" />
                                            </svg>
                                        </div>` : ""}
                                            </div>
                                            <div class="pt-1">
                                                <h3 class="text-dark fw-semibold fs-6">${contactInfo[i].name}</h3>
                                                <div class="d-flex  gap-2 align-items-center mt-1">
                                                    <div
                                                        class="svg-info-wrap d-flex justify-content-center align-items-center rounded-3 light-blue">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                                            width="10px" height="10px">
                                                            <path fill="#155dfc"
                                                                d="M160.2 25C152.3 6.1 131.7-3.9 112.1 1.4l-5.5 1.5c-64.6 17.6-119.8 80.2-103.7 156.4 37.1 175 174.8 312.7 349.8 349.8 76.3 16.2 138.8-39.1 156.4-103.7l1.5-5.5c5.4-19.7-4.7-40.3-23.5-48.1l-97.3-40.5c-16.5-6.9-35.6-2.1-47 11.8l-38.6 47.2C233.9 335.4 177.3 277 144.8 205.3L189 169.3c13.9-11.3 18.6-30.4 11.8-47L160.2 25z" />
                                                        </svg>
                                                    </div>
                                                    <span class="text-info fw-medium fs-14">${contactInfo[i].number}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="mt-2">
                                            <div class="d-flex align-items-center gap-2 mb-2">
                                                <div
                                                    class="svg-info-wrap d-flex justify-content-center align-items-center rounded-3 light-purple">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                                        width="10px" height="10px">
                                                        <path fill="#7f22fe"
                                                            d="M48 64c-26.5 0-48 21.5-48 48 0 15.1 7.1 29.3 19.2 38.4l208 156c17.1 12.8 40.5 12.8 57.6 0l208-156c12.1-9.1 19.2-23.3 19.2-38.4 0-26.5-21.5-48-48-48L48 64zM0 196L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-188-198.4 148.8c-34.1 25.6-81.1 25.6-115.2 0L0 196z" />
                                                    </svg>
                                                </div>
                                                <span class="text-info fs-14 fw-normal">${contactInfo[i].email}</span>
                                            </div>
                    ${contactInfo[i].address ? `
    <div class="d-flex align-items-center gap-2 mb-2">
        <div class="svg-info-wrap d-flex justify-content-center align-items-center rounded-3 light-green">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="10px" height="10px">
                <path fill="#009966" d="M0 188.6C0 84.4 86 0 192 0S384 84.4 384 188.6c0 119.3-120.2 262.3-170.4 316.8-11.8 12.8-31.5 12.8-43.3 0-50.2-54.5-170.4-197.5-170.4-316.8zM192 256a64 64 0 1 0 0-128 64 64 0 1 0 0 128z" />
            </svg>
        </div>
        <span class="text-info fs-14 fw-normal">${contactInfo[i].address}</span>
    </div>
                                        ` : ""}
                                        </div>
                                        <div class="gap-1 d-flex mt-3">
                                            ${contactInfo[i].group ? `<span class="light-blue fw-medium py-1 rounded-2 px-2">${contactInfo[i].group}</span>` : ""}
                                            ${contactInfo[i].emergency ? `<span class="light-red fw-medium py-1 px-2 rounded-2 gap-1 d-flex align-items-center">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="10px" height="10px">
        <path fill="#ec003f" d="M256 107.9L241 87.1C216 52.5 175.9 32 133.1 32 59.6 32 0 91.6 0 165.1l0 2.6c0 23.6 6.2 48 16.6 72.3l106 0c3.2 0 6.1-1.9 7.4-4.9l31.8-76.3c3.7-8.8 12.3-14.6 21.8-14.8s18.3 5.4 22.2 14.1l51.3 113.9 41.4-82.8c4.1-8.1 12.4-13.3 21.5-13.3s17.4 5.1 21.5 13.3l23.2 46.3c1.4 2.7 4.1 4.4 7.2 4.4l123.6 0c10.5-24.3 16.6-48.7 16.6-72.3l0-2.6C512 91.6 452.4 32 378.9 32 336.2 32 296 52.5 271 87.1l-15 20.7zM469.6 288l-97.8 0c-21.2 0-40.6-12-50.1-31l-1.7-3.4-42.5 85.1c-4.1 8.3-12.7 13.5-22 13.3s-17.6-5.7-21.4-14.1l-49.3-109.5-10.5 25.2c-8.7 20.9-29.1 34.5-51.7 34.5l-80.2 0c47.2 73.8 123 141.7 170.4 177.9 12.4 9.4 27.6 14.1 43.1 14.1s30.8-4.6 43.1-14.1C346.6 429.7 422.4 361.8 469.6 288z" />
    </svg>
    Emergency
</span>` : ""}
                                        </div>
                                    </div>
                                    <div class="d-flex justify-content-between py-2 px-3 card-footer mt-auto">
                                        <div class="d-flex  align-items-center">
                                            <a href="tel:${contactInfo[i].number}">
                                                <div
                                                    class="svg-info-wrap wh-36 d-flex justify-content-center align-items-center rounded-3 light-green">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                                        width="12px" height="12px">
                                                        <path fill="#009966"
                                                            d="M160.2 25C152.3 6.1 131.7-3.9 112.1 1.4l-5.5 1.5c-64.6 17.6-119.8 80.2-103.7 156.4 37.1 175 174.8 312.7 349.8 349.8 76.3 16.2 138.8-39.1 156.4-103.7l1.5-5.5c5.4-19.7-4.7-40.3-23.5-48.1l-97.3-40.5c-16.5-6.9-35.6-2.1-47 11.8l-38.6 47.2C233.9 335.4 177.3 277 144.8 205.3L189 169.3c13.9-11.3 18.6-30.4 11.8-47L160.2 25z" />
                                                    </svg>
                                                </div>
                                            </a>
                                            <button class="border-0 bg-transparent">
                                                <div
                                                    class="svg-info-wrap wh-36 d-flex justify-content-center align-items-center rounded-3 light-purple">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                                        width="12px" height="12px">
                                                        <path fill="#7f22fe"
                                                            d="M48 64c-26.5 0-48 21.5-48 48 0 15.1 7.1 29.3 19.2 38.4l208 156c17.1 12.8 40.5 12.8 57.6 0l208-156c12.1-9.1 19.2-23.3 19.2-38.4 0-26.5-21.5-48-48-48L48 64zM0 196L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-188-198.4 148.8c-34.1 25.6-81.1 25.6-115.2 0L0 196z" />
                                                    </svg>
                                                </div>
                                            </button>
                                        </div>
                                        <div class="d-flex align-items-center gap-2">
                                            <button  onclick="toggleFavorite(${i})"
                                                class="rounded-3 border-0 wh-36 d-flex justify-content-center bg-transparent align-items-center"><svg
                                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"
                                                    width="14px" height="14px">
                                                    <path fill="${contactInfo[i].favorite ? '#facc15' : '#6a7282'}"
                                                        d="M309.5-18.9c-4.1-8-12.4-13.1-21.4-13.1s-17.3 5.1-21.4 13.1L193.1 125.3 33.2 150.7c-8.9 1.4-16.3 7.7-19.1 16.3s-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2s16.9 6.1 25 2L288.1 417.6 432.4 491c8 4.1 17.7 3.3 25-2s11-14.2 9.6-23.2L441.7 305.9 556.1 191.4c6.4-6.4 8.6-15.8 5.8-24.4s-10.1-14.9-19.1-16.3L383 125.3 309.5-18.9z" />
                                                </svg>
                                            </button>
                                            <button  onclick="toggleEmergency(${i})"
                                                class=" wh-36 rounded-3 border-0 d-flex bg-transparent justify-content-center align-items-center"><svg
                                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                                    width="14px" height="14px">
                                                    <path fill="${contactInfo[i].emergency ? '#ec003f' : '#6a7282'}"
                                                        d="M256 107.9L241 87.1C216 52.5 175.9 32 133.1 32 59.6 32 0 91.6 0 165.1l0 2.6c0 23.6 6.2 48 16.6 72.3l106 0c3.2 0 6.1-1.9 7.4-4.9l31.8-76.3c3.7-8.8 12.3-14.6 21.8-14.8s18.3 5.4 22.2 14.1l51.3 113.9 41.4-82.8c4.1-8.1 12.4-13.3 21.5-13.3s17.4 5.1 21.5 13.3l23.2 46.3c1.4 2.7 4.1 4.4 7.2 4.4l123.6 0c10.5-24.3 16.6-48.7 16.6-72.3l0-2.6C512 91.6 452.4 32 378.9 32 336.2 32 296 52.5 271 87.1l-15 20.7zM469.6 288l-97.8 0c-21.2 0-40.6-12-50.1-31l-1.7-3.4-42.5 85.1c-4.1 8.3-12.7 13.5-22 13.3s-17.6-5.7-21.4-14.1l-49.3-109.5-10.5 25.2c-8.7 20.9-29.1 34.5-51.7 34.5l-80.2 0c47.2 73.8 123 141.7 170.4 177.9 12.4 9.4 27.6 14.1 43.1 14.1s30.8-4.6 43.1-14.1C346.6 429.7 422.4 361.8 469.6 288z" />
                                                </svg>
                                            </button>
                                            <button 
                                                class="editContactBtn  rounded-3 wh-36 bg-transparent border-0 d-flex justify-content-center align-items-center" onclick="editContact(${i})"><svg
                                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                                    width="14px" height="14px">
                                                    <path fill="#6a7282"
                                                        d="M352.9 21.2L308 66.1 445.9 204 490.8 159.1C504.4 145.6 512 127.2 512 108s-7.6-37.6-21.2-51.1L455.1 21.2C441.6 7.6 423.2 0 404 0s-37.6 7.6-51.1 21.2zM274.1 100L58.9 315.1c-10.7 10.7-18.5 24.1-22.6 38.7L.9 481.6c-2.3 8.3 0 17.3 6.2 23.4s15.1 8.5 23.4 6.2l127.8-35.5c14.6-4.1 27.9-11.8 38.7-22.6L412 237.9 274.1 100z" />
                                                </svg>
                                            </button>
                                            <button onclick="deletContact(${i})"
                                                class="delet rounded-3 wh-36 bg-transparent border-0 d-flex justify-content-center align-items-center"><svg
                                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                                                    width="14px" height="14px">
                                                    <path fill="#6a7282"
                                                        d="M136.7 5.9L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-8.7-26.1C306.9-7.2 294.7-16 280.9-16L167.1-16c-13.8 0-26 8.8-30.4 21.9zM416 144L32 144 53.1 467.1C54.7 492.4 75.7 512 101 512L347 512c25.3 0 46.3-19.6 47.9-44.9L416 144z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                </div>`
    }
    document.getElementById("contactCard").innerHTML = blackbox;
};
function editContact(editedContact) {
    updatedContact = editedContact;
    contactName.value = contactInfo[editedContact].name;
    contactNumber.value = contactInfo[editedContact].number;
    contactEmail.value = contactInfo[editedContact].email;
    contactAddress.value = contactInfo[editedContact].address;
    contactGroup.value = contactInfo[editedContact].group;
    contactNotes.value = contactInfo[editedContact].notes;
    contactFavorite.checked = contactInfo[editedContact].favorite;
    contactEmergency.checked = contactInfo[editedContact].emergency;
    document.getElementById("addContactBtn").classList.add("d-none");
    document.getElementById("updateContactBtn").classList.remove("d-none");
    displayContactForm()
};
function updateContact() {
    if (validFormInput(contactName) && validFormInput(contactEmail) && validFormInput(contactNumber)) {
        for (var i = 0; i < contactInfo.length; i++) {
            if (contactInfo[i].number === contactNumber.value && i !== updatedContact) {
                Swal.fire({
                    icon: "error",
                    title: "Duplicate Phone Number",
                    text: "A contact with this phone number already exists:" + contactInfo[i].name,
                });
                return;
            }
        }
        contactInfo[updatedContact].name = contactName.value;
        contactInfo[updatedContact].number = contactNumber.value;
        contactInfo[updatedContact].email = contactEmail.value;
        contactInfo[updatedContact].address = contactAddress.value;
        contactInfo[updatedContact].group = contactGroup.value;
        contactInfo[updatedContact].notes = contactNotes.value;
        contactInfo[updatedContact].favorite = contactFavorite.checked;
        contactInfo[updatedContact].emergency = contactEmergency.checked;
        localStorage.setItem("all contacts", JSON.stringify(contactInfo));
        displayContact(contactInfo);
                addToFavourite(contactInfo);
        addToEmergency(contactInfo);
        clearForm()
        document.getElementById("addContactBtn").classList.remove("d-none");
        document.getElementById("updateContactBtn").classList.add("d-none");
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Contact Updated Successfully",
            showConfirmButton: false,
            timer: 1500
        });
        emergencyCounter()
        closeContactForm()
        favoriteCounter()
        totalContactCounter()
    }
};
function deletContact(deletedContact) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            contactInfo.splice(deletedContact, 1);
            localStorage.setItem("all contacts", JSON.stringify(contactInfo));
            displayContact(contactInfo)
            totalContactCounter()
            emergencyCounter()
            favoriteCounter()
            Swal.fire({
                title: "Deleted!",
                text: "Your contact has been deleted.",
                icon: "success"
            });
        }
    });
};
function search(element) {
    var matchedResults = []
    for (var i = 0; i < contactInfo.length; i++) {
        if (contactInfo[i].name.toLowerCase().includes(element.value.toLowerCase())
            || contactInfo[i].email.toLowerCase().includes(element.value.toLowerCase())
            || contactInfo[i].number.toLowerCase().includes(element.value.toLowerCase())
        ) {
            matchedResults.push(contactInfo[i])
        }
    }
    displayContact(matchedResults)
};
function validFormInput(element) {
    var regex = {
        contactName: /^[\u0621-\u064Aa-zA-Z\s]{2,50}$/,
        contactNumber: /^(?:\+20|20|01)[0-9]{9}$/,
        contactEmail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    };
    var isvalid = regex[element.id].test(element.value);
    if (isvalid) {
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        element.nextElementSibling.classList.replace("d-block", "d-none")
    }
    else {
        element.classList.remove("is-valid");
        element.classList.add("is-invalid");
        element.nextElementSibling.classList.replace("d-none", "d-block")
    }
    var allValid = contactName.classList.contains("is-valid") && contactNumber.classList.contains("is-valid");
    addContactBtn.disabled = !allValid;
    updateContactBtn.disabled = !allValid;
    return isvalid;
};
function totalContactCounter() {
    for (var i = 0; i < totalContact.length; i++) {
        totalContact[i].innerHTML = contactInfo.length;
    };
};
function toggleFavorite(index) {
    contactInfo[index].favorite = !contactInfo[index].favorite;
    localStorage.setItem("all contacts", JSON.stringify(contactInfo));
    displayContact(contactInfo);
    addToFavourite(contactInfo);
    favoriteCounter()
    emergencyCounter()
};
function toggleEmergency(index) {
    contactInfo[index].emergency = !contactInfo[index].emergency;
    localStorage.setItem("all contacts", JSON.stringify(contactInfo));
    displayContact(contactInfo);
    addToEmergency(contactInfo);
    emergencyCounter()
};
function addToFavourite(contacts) {
    var blackbox = "";
    var hasFavorite = false;
    var favoriteList = document.getElementById("favoriteList");
    for (var i = 0; i < contacts.length; i++) {
        if (contacts[i].favorite) {
            hasFavorite = true;
            var imageOrLetter = (contacts[i].image && contacts[i].image !== "imgs/" && contacts[i].image !== "imgs/undefined")
                ? `<img src="${contacts[i].image}" class="img-fluid rounded-3 w-100 h-100 object-fit-cover">`
                : `<span>${letter(contacts[i].name)}</span>`;
            blackbox += `<div class="col-12 fav">
                                            <div class="d-flex gap-3 px-2 bg-light mb-2 rounded-3 align-items-center ">
                                                <div>
                                                    <div
                                                        class="text-white fw-semibold fs-14 d-flex justify-content-center align-items-center img-holder text-uppercase">
                                                        ${imageOrLetter}
                                                    </div>
                                                </div>
                                                <div class="w-50 mt-3 ">
                                                    <h4 class="text-dark mb-0 fw-medium fs-14">
                                                        ${contacts[i].name}
                                                    </h4>
                                                    <p class="text-info fs-12 fw-medium">
                                                        ${contacts[i].number}
                                                    </p>
                                                </div>
                                                <a href="tel:${contacts[i].number}" class="ms-auto">
                                                    <div
                                                        class="svg-info-wrap wh-36 d-flex justify-content-center align-items-center rounded-3 light-green">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                                            width="12px" height="12px">
                                                            <path fill="#009966"
                                                                d="M160.2 25C152.3 6.1 131.7-3.9 112.1 1.4l-5.5 1.5c-64.6 17.6-119.8 80.2-103.7 156.4 37.1 175 174.8 312.7 349.8 349.8 76.3 16.2 138.8-39.1 156.4-103.7l1.5-5.5c5.4-19.7-4.7-40.3-23.5-48.1l-97.3-40.5c-16.5-6.9-35.6-2.1-47 11.8l-38.6 47.2C233.9 335.4 177.3 277 144.8 205.3L189 169.3c13.9-11.3 18.6-30.4 11.8-47L160.2 25z" />
                                                        </svg>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                `;
        }
    }
    if (hasFavorite) {
        favoriteList.innerHTML = blackbox;
    } else {
        favoriteList.innerHTML = `
            <div class="text-center contact-wrapper">
                <p class="text-info fs-14 fw-normal">No favourite yet</p>
            </div>`;
    }
    localStorage.setItem("all contacts", JSON.stringify(contacts));
}
function addToEmergency(contacts) {
    var blackbox = "";
    var hasEmergency = false;
    var emergencyList = document.getElementById("emergencyList");
    for (var i = 0; i < contacts.length; i++) {
        if (contacts[i].emergency) {
            hasEmergency = true;
            var imageOrLetter = (contacts[i].image && contacts[i].image !== "imgs/" && contacts[i].image !== "imgs/undefined")
                ? `<img src="${contacts[i].image}" class="img-fluid rounded-3 w-100 h-100 object-fit-cover">`
                : `<span>${letter(contacts[i].name)}</span>`;
            blackbox += ` <div class="col-12 col-md-6 col-xl-12 fav">
                                        <div class="d-flex gap-3 px-2 bg-light mb-2 rounded-3 align-items-center ">
                                            <div>
                                                <div
                                                    class="text-white fw-semibold fs-14 d-flex justify-content-center align-items-center img-holder text-uppercase">
                                                    ${imageOrLetter}
                                                </div>
                                            </div>
                                            <div class="w-50 mt-3 ">
                                                <h4 class="text-dark mb-0 fw-medium fs-14">
                                                    ${contacts[i].name}
                                                </h4>
                                                <p class="text-info fs-12 fw-medium">
                                                    ${contacts[i].number}
                                                </p>
                                            </div>
                                            <a href="tel:${contacts[i].number}" class="ms-auto"> 
                                                <div
                                                    class="svg-info-wrap wh-36 d-flex justify-content-center align-items-center rounded-3 light-red">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                                        width="12px" height="12px">
                                                        <path fill="#FF2056"
                                                            d="M160.2 25C152.3 6.1 131.7-3.9 112.1 1.4l-5.5 1.5c-64.6 17.6-119.8 80.2-103.7 156.4 37.1 175 174.8 312.7 349.8 349.8 76.3 16.2 138.8-39.1 156.4-103.7l1.5-5.5c5.4-19.7-4.7-40.3-23.5-48.1l-97.3-40.5c-16.5-6.9-35.6-2.1-47 11.8l-38.6 47.2C233.9 335.4 177.3 277 144.8 205.3L189 169.3c13.9-11.3 18.6-30.4 11.8-47L160.2 25z" />
                                                    </svg>
                                                </div>
                                            </a>
                                        </div>
                                    </div>`;
        }
    }
    if (hasEmergency) {
        emergencyList.innerHTML = blackbox;
    } else {
        emergencyList.innerHTML = `
            <div class="text-center contact-wrapper" >
                <p class="text-info fs-14 fw-normal">No favourite yet</p>
            </div>`;
    }
    localStorage.setItem("all contacts", JSON.stringify(contacts));
}

function favoriteCounter() {
    var count = 0;
    for (var i = 0; i < contactInfo.length; i++) {
        if (contactInfo[i].favorite === true) {
            count++;
        }
    }
    for (var j = 0; j < favContactTotal.length; j++) {
        favContactTotal[j].innerHTML = count;
    }
}
function emergencyCounter() {
    var count = 0;
    for (var i = 0; i < contactInfo.length; i++) {
        if (contactInfo[i].emergency === true) {
            count++;
        }
    }
    for (var j = 0; j < emergencyContactTotal.length; j++) {
        emergencyContactTotal[j].innerHTML = count;
    }
}