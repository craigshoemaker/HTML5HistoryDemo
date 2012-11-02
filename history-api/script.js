$(function () {

    function getPageName() {
        var 
            pathName = window.location.pathname,
            pageName = "";

        if (pathName.indexOf("/") != -1) {
            pageName = pathName.split("/").pop();
        } else {
            pageName = pathName;
        }

        return pageName;
    }

    function navigateToPage() {

        var pageName = getPageName();

        $.get(pageName, function (response) {

            var 
            // Wrap the resulting HTML string with a parent node
            // so jQuery can properly select against it.
                markup = $("<div>" + response + "</div>"),

            // Extract the fragment out of the markup.
                fragment = markup.find(".fragment").html();

            $("#content-host").html(fragment);
        });
    }

    $("a[data-role='ajax']").click(function (e) {
        if (Modernizr.history) {
            e.preventDefault();
            var pageName = $(this).attr("href");
            window.history.pushState(null, "", pageName);
            navigateToPage();
        }
    });

    // Chrome & Safari (WebKit browsers) raise the popstate 
    // event when the page loads. All other browsers only 
    // raise this event when the forward or back buttons are
    // clicked. Therefore, the '_popStateEventCount'
    // (in conjunction with '$.browser.webkit') allows the page 
    // to skip running the contents of popstate event handler 
    // during page load so the content is not loaded twice in 
    // WebKit browsers.
    var _popStateEventCount = 0;

    // This event only fires in browsers that implement 
    // the HTML5 History APIs. 
    //
    // IMPORTANT:   The use of single quotes here is required 
    //              for full browser support.
    //
    //                Ex: Safari will not fire the event 
    //                    if you use: $(window).on("popstate"
    $(window).on('popstate', function (e) {

        this._popStateEventCount++;

        if ($.browser.webkit && this._popStateEventCount == 1) {
            return;
        }

        // The 'e.originalEvent.state' property gives 
        // you access to the state argument passed into 
        // the 'pushState' function, but browser support 
        // is inconsistent (Safari). Normally you might
        // pass in the destination page name using the 
        // state object to the event arguments here, but 
        // since support is unreliable, this demo 
        // extracts the current page from  the 
        // 'window.location' value.

        navigateToPage();
    });

});