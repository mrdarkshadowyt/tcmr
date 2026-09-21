// ==========================================
// GOOGLE APPS SCRIPT URL
// ==========================================

const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbx5JArpGjRFW23PJ8zAJhc_0CShXyzhbVIGFYecc_FQIl6qDxrILEpd_TlyN1bqMfCegQ/exec";


// ==========================================
// GET FORM ELEMENTS
// ==========================================

const form =
    document.getElementById("teamForm");

const submitButton =
    document.getElementById("submitButton");

const errorMessage =
    document.getElementById("errorMessage");

const successMessage =
    document.getElementById("success");

const logoInput =
    document.getElementById("teamLogo");


// ==========================================
// LOGO PREVIEW ELEMENTS
// ==========================================

const logoPreview =
    document.getElementById("logoPreview");

const uploadBox =
    document.querySelector(".logo-upload-box");


// ==========================================
// LOGO VALIDATION + PREVIEW
// ==========================================

logoInput.addEventListener("change", function () {

    const file = this.files[0];


    // ------------------------------
    // NO FILE SELECTED
    // ------------------------------

    if (!file) {

        if (uploadBox) {
            uploadBox.classList.remove("has-image");
        }

        if (logoPreview) {
            logoPreview.src = "";
        }

        return;
    }


    // ------------------------------
    // MAX FILE SIZE
    // ------------------------------

    const maxSize =
        10 * 1024 * 1024;


    if (file.size > maxSize) {

        alert(
            "Team logo must be less than 10 MB."
        );

        this.value = "";

        if (uploadBox) {
            uploadBox.classList.remove("has-image");
        }

        if (logoPreview) {
            logoPreview.src = "";
        }

        return;
    }


    // ------------------------------
    // CHECK IMAGE TYPE
    // ------------------------------

    if (!file.type.startsWith("image/")) {

        alert(
            "Please upload an image file."
        );

        this.value = "";

        if (uploadBox) {
            uploadBox.classList.remove("has-image");
        }

        if (logoPreview) {
            logoPreview.src = "";
        }

        return;
    }


    // ------------------------------
    // CREATE IMAGE PREVIEW
    // ------------------------------

    const reader =
        new FileReader();


    reader.onload = function (event) {

        if (logoPreview) {

            logoPreview.src =
                event.target.result;
        }


        if (uploadBox) {

            uploadBox.classList.add(
                "has-image"
            );
        }

    };


    reader.readAsDataURL(file);

});


// ==========================================
// FORM SUBMISSION
// ==========================================

form.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        // ==================================
        // VALIDATE FORM
        // ==================================

        if (!form.checkValidity()) {

            form.reportValidity();

            return;
        }


        // ==================================
        // BUTTON STATE
        // ==================================

        submitButton.disabled = true;

        submitButton.innerText =
            "REGISTERING...";

        errorMessage.style.display =
            "none";


        // ==================================
        // COLLECT FORM DATA
        // ==================================

        const formData =
            new FormData(form);

        const data = {};


        formData.forEach(
            (value, key) => {


                // ------------------------------
                // FILE INPUT
                // ------------------------------

             if (value instanceof File) {

    if (value.name) {

        const base64 = await fileToBase64(value);

        data[key] = {
            fileName: value.name,
            mimeType: value.type,
            base64: base64
        };

    } else {

        data[key] = "";

    }

}


                // ------------------------------
                // NORMAL INPUT
                // ------------------------------

                else {

                    data[key] = value;
                }

            }
        );


        // ==================================
        // SEND TO GOOGLE SHEETS
        // ==================================

        try {

            await fetch(
                GOOGLE_SCRIPT_URL,
                {
                    method: "POST",

                    mode: "no-cors",

                    headers: {
                        "Content-Type":
                            "text/plain;charset=utf-8"
                    },

                    body:
                        JSON.stringify(data)
                }
            );


            // ==================================
            // SHOW SUCCESS
            // ==================================

            form.style.display =
                "none";

            successMessage.style.display =
                "block";


            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }


        // ==================================
        // ERROR
        // ==================================

        catch (error) {

            console.error(
                "Registration error:",
                error
            );


            errorMessage.style.display =
                "block";


            submitButton.disabled =
                false;


            submitButton.innerText =
                "⚡ ASSEMBLE TEAM";

        }

    }
);