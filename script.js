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
// LOGO VALIDATION
// ==========================================

logoInput.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) {
        return;
    }

    const maxSize =
        10 * 1024 * 1024;

    if (file.size > maxSize) {

        alert(
            "Team logo must be less than 10 MB."
        );

        this.value = "";

        return;
    }


    if (!file.type.startsWith("image/")) {

        alert(
            "Please upload an image file."
        );

        this.value = "";

        return;
    }

});


// ==========================================
// FORM SUBMISSION
// ==========================================

form.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        // ------------------------------
        // VALIDATE FORM
        // ------------------------------

        if (!form.checkValidity()) {

            form.reportValidity();

            return;
        }


        // ------------------------------
        // BUTTON STATE
        // ------------------------------

        submitButton.disabled = true;

        submitButton.innerText =
            "REGISTERING...";

        errorMessage.style.display =
            "none";


        // ------------------------------
        // COLLECT FORM DATA
        // ------------------------------

        const formData =
            new FormData(form);

        const data = {};


        formData.forEach(
            (value, key) => {

                if (value instanceof File) {

                    if (value.name) {

                        data[key] =
                            value.name;

                    } else {

                        data[key] = "";

                    }

                } else {

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


            // ------------------------------
            // SHOW SUCCESS
            // ------------------------------

            form.style.display =
                "none";

            successMessage.style.display =
                "block";


            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });


        } catch (error) {

            console.error(
                "Registration error:",
                error
            );


            // ------------------------------
            // SHOW ERROR
            // ------------------------------

            errorMessage.style.display =
                "block";


            submitButton.disabled =
                false;

            submitButton.innerText =
                "⚡ ASSEMBLE TEAM";

        }

    }
);