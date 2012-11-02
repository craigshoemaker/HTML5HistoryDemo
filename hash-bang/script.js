
$(function () {

    function navigateToPage() {

        var
            hash = window.location.hash,
            pageName = "";

        if (hash != "") {

            // change '#!/page1.html' to 'page1.html'
            pageName = hash.substring(3, hash.length);

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
    }

    $("a[data-role='ajax']").click(function (e) {
        e.preventDefault();
        window.location.hash = "!/" + $(this).attr("href");
    });

    $(window).on("hashchange", function () {
        navigateToPage();
    });

    navigateToPage();
});