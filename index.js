$(document).ready(function () {
    $("body").tooltip({ selector: '[data-toggle=tooltip]' });

    $(".rating").each(function() {
        let rating = $(this).attr("rate");
        for(let i = 0; i < 5; ++i) {
            let star = $("<i></i>");
            star.addClass("fa");
            star.addClass("mx-1");
            if(i < rating) {
                star.addClass("fa-star");
            } else {
                star.addClass("fa-star-o");
            }
            $(this).append(star);
        }
    })
});