// ==========================================
// GOOGLE APPS SCRIPT URL
// ==========================================

const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbx5JArpGjRFW23PJ8zAJhc_0CShXyzhbVIGFYecc_FQIl6qDxrILEpd_TlyN1bqMfCegQ/exec";


// ==========================================
// MAIN PAGE URL
// ==========================================

const MAIN_PAGE_URL = "index.html";


// ==========================================
// DISCORD SERVER URL
// ==========================================

const DISCORD_URL =
    "https://discord.gg/fHHMKfqKj";


// ==========================================
// RANK VALUES
// ==========================================

const rankValues = {

    "Bronze 3": 1,
    "Bronze 2": 2,
    "Bronze 1": 3,

    "Silver 3": 4,
    "Silver 2": 5,
    "Silver 1": 6,

    "Gold 3": 7,
    "Gold 2": 8,
    "Gold 1": 9,

    "Platinum 3": 10,
    "Platinum 2": 11,
    "Platinum 1": 12,

    "Diamond 3": 13,
    "Diamond 2": 14,
    "Diamond 1": 15,

    "Grandmaster 3": 16,
    "Grandmaster 2": 17,
    "Grandmaster 1": 18,

    "Celestial 3": 19,
    "Celestial 2": 20,
    "Celestial 1": 21,

    "Eternity 3": 22,
    "Eternity 2": 23,
    "Eternity 1": 24,

    "One Above All 3": 25

};


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
            // CALCULATE TEAM AVERAGE
            // 6 MAIN PLAYERS ONLY
            // ======================================

            const playerRanks = [

                data.player1Rank,
                data.player2Rank,
                data.player3Rank,
                data.player4Rank,
                data.player5Rank,
                data.player6Rank

            ];


            let totalRank = 0;

            let validPlayers = 0;


            playerRanks.forEach(
                function (rank) {

                    if (
                        rank &&
                        rankValues[rank]
                    ) {

                        totalRank +=
                            rankValues[rank];

                        validPlayers++;

                    }

                }
            );


            let teamAverageRank = 0;


            if (validPlayers > 0) {

                teamAverageRank =
                    totalRank / validPlayers;

            }


            // ======================================
            // ROUND AVERAGE TO 2 DECIMAL PLACES
            // ======================================

            teamAverageRank =
                Number(
                    teamAverageRank.toFixed(2)
                );


            // ======================================
            // ADD AVERAGE TO DATA
            // ======================================

            data.teamAverageRank =
                teamAverageRank;


            // ======================================
            // SEND TO GOOGLE SHEETS
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
                // SHOW SUCCESS
                // ==================================

                form.style.display =
                    "none";


                if (successMessage) {

                    successMessage.style.display =
                        "block";


                    // ==================================
                    // BACK TO MAIN PAGE
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


                    // ==================================
                    // ADD LINKS
                    // ==================================

                    successMessage.appendChild(
                        backLink
                    );

                    successMessage.appendChild(
                        discordLink
                    );

                }


                // ==================================
                // SCROLL TOP
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
