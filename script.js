// ==========================================
// GOOGLE APPS SCRIPT URL
// ==========================================

const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbx5JArpGjRFW23PJ8zAJhc_0CShXyzhbVIGFYecc_FQIl6qDxrILEpd_TlyN1bqMfCegQ/exec";


// ==========================================
// MAIN PAGE URL
// ==========================================
//
// CHANGE THIS if your main page has a different URL.
//

const MAIN_PAGE_URL = "index.html";


// ==========================================
// DISCORD SERVER URL
// ==========================================

const DISCORD_URL =
    "https://discord.gg/fHHMKfqKj";


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


// ==========================================
// FORM SUBMISSION
// ==========================================

if (form) {

    form.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            // ======================================
            // VALIDATE FORM
            // ======================================

            if (!form.checkValidity()) {

                form.reportValidity();

                return;
            }


            // ======================================
            // BUTTON LOADING STATE
            // ======================================

            if (submitButton) {

                submitButton.disabled = true;

                submitButton.innerText =
                    "REGISTERING...";

            }


            if (errorMessage) {

                errorMessage.style.display =
                    "none";

            }


            // ======================================
            // GET FORM DATA
            // ======================================

            const formData =
                new FormData(form);

            const data = {};


            formData.forEach(
                function (value, key) {

                    if (value instanceof File) {

                        data[key] =
                            value.name || "";

                    } else {

                        data[key] =
                            value;

                    }

                }
            );


            // ======================================
            // SEND DATA TO GOOGLE SHEETS
            // ======================================

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
                // REGISTRATION SUCCESS
                // ==================================

                form.style.display =
                    "none";


                if (successMessage) {

                    successMessage.style.display =
                        "block";


                    // ==================================
                    // BACK TO MAIN PAGE LINK
                    // ==================================

                    const backLink =
                        document.createElement("a");

                    backLink.href =
                        MAIN_PAGE_URL;

                    backLink.innerText =
                        "← BACK TO MAIN PAGE";

                    backLink.style.display =
                        "inline-block";

                    backLink.style.marginTop =
                        "25px";

                    backLink.style.color =
                        "#8b5cff";

                    backLink.style.fontSize =
                        "18px";

                    backLink.style.fontWeight =
                        "700";

                    backLink.style.textDecoration =
                        "none";

                    backLink.style.letterSpacing =
                        "1px";


                    // Hover effect

                    backLink.addEventListener(
                        "mouseenter",
                        function () {

                            backLink.style.textDecoration =
                                "underline";

                        }
                    );


                    backLink.addEventListener(
                        "mouseleave",
                        function () {

                            backLink.style.textDecoration =
                                "none";

                        }
                    );


                    // ==================================
                    // DISCORD LINK
                    // ==================================

                    const discordLink =
                        document.createElement("a");

                    discordLink.href =
                        DISCORD_URL;

                    discordLink.innerText =
                        "JOIN OUR DISCORD";

                    discordLink.target =
                        "_blank";

                    discordLink.rel =
                        "noopener noreferrer";

                    discordLink.style.display =
                        "inline-block";

                    discordLink.style.marginTop =
                        "15px";

                    discordLink.style.marginLeft =
                        "15px";

                    discordLink.style.color =
                        "#5865F2";

                    discordLink.style.fontSize =
                        "18px";

                    discordLink.style.fontWeight =
                        "700";

                    discordLink.style.textDecoration =
                        "none";

                    discordLink.style.letterSpacing =
                        "1px";


                    // Hover effect

                    discordLink.addEventListener(
                        "mouseenter",
                        function () {

                            discordLink.style.textDecoration =
                                "underline";

                        }
                    );


                    discordLink.addEventListener(
                        "mouseleave",
                        function () {

                            discordLink.style.textDecoration =
                                "none";

                        }
                    );


                    // ==================================
                    // ADD LINKS TO SUCCESS MESSAGE
                    // ==================================

                    successMessage.appendChild(
                        backLink
                    );

                    successMessage.appendChild(
                        discordLink
                    );

                }


                // ==================================
                // SCROLL TO SUCCESS MESSAGE
                // ==================================

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });


            } catch (error) {

                console.error(
                    "Registration error:",
                    error
                );


                // ==================================
                // SHOW ERROR
                // ==================================

                if (errorMessage) {

                    errorMessage.style.display =
                        "block";

                }


                if (submitButton) {

                    submitButton.disabled =
                        false;

                    submitButton.innerText =
                        "⚡ ASSEMBLE TEAM";

                }

            }

        }
    );

}