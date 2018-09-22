    var topics = ["happy", "sad", "mad", "excited", "overwhelmed", "giggly", "energetic", "tired", "thoughtful", "dreamy", "strategic", "shocked"];
    var topic;
    var API_KEY = "&api_key=oQW5XcImDe7EKQdtmIjnWOYO3Vh0Q6K7";
    var queryURL;

    generateButtons();

    function generateButtons() {
    
        for (var j = 0; j < topics.length; j++) {
            var button = $("<button>");

            button.attr("data-topic", topics[j]);
            button.attr("class", "btn btn-primary topicBtn");
            button.text(topics[j]);
            button.appendTo("#buttonDiv");
            
        };
    

        $(".topicBtn").on("click", function() {
            topic = $(this).attr("data-topic");
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + API_KEY + "&rating=pg-13&limit=10";
    
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
            
                console.log(response);
    
                var results = response.data;
    
                for (var i = 0; i < 10; i++) {
    
                var topicDiv = $("<div>");
                topicDiv.attr("class", "imgResults");
            
                var p = $("<p>").text("Rating: " + results[i].rating);
            
                var topicImage = $("<img>");
                topicImage.attr("class", "gif");
                topicImage.attr("src", results[i].images.fixed_height_still.url);
                topicImage.attr("data-still", results[i].images.fixed_height_still.url);
                topicImage.attr("data-animate", results[i].images.fixed_height.url);
                topicImage.attr("data-state", "still");
                topicDiv.prepend(p);
                topicDiv.prepend(topicImage);
                $("#gifsDiv").prepend(topicDiv);

                };
                animate();
    
            });

        });

    };

      
    function animate() {
        $(".gif").on("click", function() {
            var state = $(this).attr('data-state');

            if (state === 'still') {
                $(this).attr('src', $(this).attr('data-animate'));
                $(this).attr('data-state','animate');
            } else if (state === 'animate') {
                $(this).attr('src', $(this).attr('data-still'));
                $(this).attr('data-state','still');
            };

        });
    };
    
    $("#addEmotion").on("click", function(event) {

        event.preventDefault();
        var emotionGiven = $("#emotionInput").val().trim();

        if (emotionGiven !== ""){
            topics.push(emotionGiven);
            $("#emotionInput").val("");
        }

        addNew()
        
    });
    
    function addNew() {
        $("#buttonDiv").empty();
        generateButtons();
    };