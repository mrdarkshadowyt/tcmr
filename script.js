// ==========================================
// GOOGLE APPS SCRIPT URL
// ==========================================

const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbx5JArpGjRFW23PJ8zAJhc_0CShXyzhbVIGFYecc_FQIl6qDxrILEpd_TlyN1bqMfCegQ/exec";


// ==========================================
// GET FORM ELEMENTS
// ==========================================

const form = document.getElementById("teamForm");

const submitButton =
    document.getElementById("submitButton");

const errorMessage =
    document.getElementById("errorMessage");

const successMessage =
    document.getElementById("success");


// ==========================================
// CREATE TEST BUTTON
// ==========================================

const testButton = document.createElement("button");

testButton.type = "button";

testButton.id = "testSheetButton";

testButton.innerText =
    "🧪 TEST GOOGLE SHEETS";


// Style the test button
testButton.style.marginTop = "15px";
testButton.style.background =
    "linear-gradient(90deg, #333333, #555555)";
testButton.style.fontSize = "18px";
testButton.style.height = "50px";
testButton.style.cursor = "pointer";


// Put test button below the real submit button
if (submitButton) {

    submitButton.parentNode.insertBefore(
        testButton,
        submitButton.nextSibling
    );

}


// ==========================================
// TEST GOOGLE SHEETS
// ==========================================

testButton.addEventListener(
    "click",
    async function () {

        testButton.disabled = true;

        testButton.innerText =
            "TESTING...";


        // ======================================
        // TEST DATA
        // ======================================

        const testData = {

            teamName:
                "TEST TEAM",

            teamLogo:
                "",

            player1Name:
                "Test Leader",

            player1IGN:
                "TestLeader",

            player1Rank:
                "Eternity",

            contact:
                "9999999999",


            player2Name:
                "Test Player 2",

            player2IGN:
                "TestPlayer2",

            player2Rank:
                "Diamond",


            player3Name:
                "Test Player 3",

            player3IGN:
                "TestPlayer3",

            player3Rank:
                "Gold",


            player4Name:
                "Test Player 4",

            player4IGN:
                "TestPlayer4",

            player4Rank:
                "Platinum",


            player5Name:
                "Test Player 5",

            player5IGN:
                "TestPlayer5",

            player5Rank:
                "Grandmaster",


            player6Name:
                "Test Player 6",

            player6IGN:
                "TestPlayer6",

            player6Rank:
                "Celestial",


            sub1Name:
                "Test Substitute 1",

            sub1IGN:
                "TestSub1",

            sub1Rank:
                "Silver",


            sub2Name:
                "Test Substitute 2",

            sub2IGN:
                "TestSub2",

            sub2Rank:
                "Bronze"

        };


        // ======================================
        // SEND TEST DATA
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
                        JSON.stringify(testData)

                }
            );


            // ==================================
            // TEST RESULT
            // ==================================

            alert(
                "TEST DATA SENT!\n\n" +
                "Now open your Google Sheet and check Sheet1.\n\n" +
                "Look for a row with:\n" +
                "Team Name: TEST TEAM"
            );


        } catch (error) {

            console.error(
                "Test error:",
                error
            );


            alert(
                "TEST FAILED!\n\n" +
                "Check your Google Apps Script deployment."
            );

        }


        // ======================================
        // RESET BUTTON
        // ======================================

        testButton.disabled = false;

        testButton.innerText =
            "🧪 TEST GOOGLE SHEETS";

    }
);


// ==========================================
// REAL FORM SUBMISSION
// ==========================================

if (form) {

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
            // BUTTON LOADING STATE
            // ==================================

            if (submitButton) {

                submitButton.disabled = true;

                submitButton.innerText =
                    "REGISTERING...";

            }


            if (errorMessage) {

                errorMessage.style.display =
                    "none";

            }


            // ==================================
            // COLLECT FORM DATA
            // ==================================

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


                if (successMessage) {

                    successMessage.style.display =
                        "block";

                }


                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });


            } catch (error) {

                console.error(
                    "Registration error:",
                    error
                );


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