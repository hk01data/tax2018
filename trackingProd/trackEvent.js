// Function to get session_id
function getSessionId() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    if (document.cookie.match(/hk01_session/)) {
        return (document.cookie.match(/hk01_session=([\w\-]+)/)[1]);
    } else {
        var temp_uid = s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
        var d = new Date();
        d.setTime(d.getTime() + (30 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = "hk01_session=" + temp_uid + ";" + expires +
            ";path=/;domain=." + window.location.host.match(/([^\.]+(\.[^\.]+)?)$/)[1];
        return (temp_uid);
    }
}

// Function to get anonymous_id from cookie
function getAnonymousId() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    if (document.cookie.match(/hk01_annonymous_id/)) {
        return (document.cookie.match(/hk01_annonymous_id=([\w\-]+)/)[1]);
    } else {
        var temp_uid = s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
        var d = new Date();
        d.setTime(d.getTime() + (3650 * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = "hk01_annonymous_id=" + temp_uid + ";" + expires +
            ";path=/;domain=." + window.location.host.match(/([^\.]+(\.[^\.]+)?)$/)[1];
        return (temp_uid);
    }
}

// Initialize the tracker client
var myTracker = new trackerClient({
    GA: {
        trackingId: ["UA-70981149-1", "UA-70981149-36", "UA-125354638-7"] // UA-125354638-7 is the profile for hk01data editorial team
    },
    Piwik: {
        trackingUrl: "https://track.hk01.com/v2/piwik.php",  // replace with your piwik tracking url
        siteId: 6,  // replace with your piwik site ID
        userId: getAnonymousId(), // replace with user ID, should be same as MEMBER_ID/ANONYMOUS_ID
        isSPA: true // if the page is single page application
    }
}, false);

/* Config the selected article detail */
const page_path = "研數所/993251/【計稅機2024】";
const author = "\u7c21\u6d69\u5fb7, \u9673\u5609\u6167, \u856d\u8f1d\u6d69";  // 簡浩德, 陳嘉慧, 蕭輝浩
const channel = "\u7814\u6578\u6240"; // 研數所
const section = "\u7814\u6578\u6240"; // 研數所
const article_id = "993251";

function fireArticlePV(url) {
    try {
        // Send Pageview for article
        myTracker.pageView({
            GA: true,
            Piwik: false
        }, {
                1: author,
                2: section,
                3: channel,
                5: article_id
            }, "https://www.hk01.com/" + page_path + url, page_path + url);

        console.log("fire Article PV");
    }
    catch (err) {
        console.log(err.message);
    }

}

function fireMapPV(url) {
    try {
        myTracker.disableGA({
            'UA-70981149-1': true, // production
            'UA-125354638-7': true, // hk01 data
            'UA-70981149-36': false // data team 
        });

        // Send Pageview for Map
        myTracker.pageView({
            GA: true,
            Piwik: true
        }, {}, url, removehash(window.location.href).replace(window.location.origin, ''));

        myTracker.resetGAFlags();
        console.log("fire Map PV");
    }
    catch (err) {
        console.log(err.message);
    }

}

function fireEvent(cat, act, lab) {
    try {
        console.log(cat, act, lab);
        myTracker.fire(
            {
                GA: true,
                Piwik: true
            },
            {
                category: cat,
                action: act,
                label: JSON.stringify(lab),
                nonInteraction: false,
                customDimensions: {
                    //[DIMENSION_ARTICLE_AUTHOR]: "Eric"
                }
            }
        );
    }
    catch (err) {
        console.log(err.message);
    }
}

function removehash(string) {
    return string.replace("#", "/");
}

export {
    myTracker,
    getSessionId,
    getAnonymousId,
    fireArticlePV,
    fireMapPV,
    fireEvent,
    removehash
}
