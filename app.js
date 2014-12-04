///////// ARRAY OF THE DATA
/////////////////////////////
dataList = [
    {
        img: "buildbot.jpg",
        name: "რობოტი #1",
        description: "Lorem Ipsum საბეჭდი და ტიპოგრაფიული ინდუსტრიის უშინაარსო ტექსტია. იგი სტანდარტად 1500-იანი წლებიდან იქცა, როდესაც უცნობმა მბეჭდავმა ამწყობ დაზგაზე წიგნის საცდელი ეგზემპლარი დაბეჭდა. მისი ტექსტი არამარტო 5 საუკუნის მანძილზე შემორჩა, არამედ მან დღემდე, ელექტრონული ტიპოგრაფიის დრომდეც უცვლელად მოაღწია. განსაკუთრებული პოპულარობა მას 1960-იან წლებში გამოსულმა Letraset-ის ცნობილმა ტრაფარეტებმა მოუტანა, უფრო მოგვიანებით კი — Aldus PageMaker-ის ტიპის საგამომცემლო პროგრამებმა, რომლებშიც Lorem Ipsum-ის სხვადასხვა ვერსიები იყო ჩაშენებული."
    },
    {
        img: "medibot.jpg",
        title: "რობოტი #2",
        description: "Lorem Ipsum საბეჭდი და ტიპოგრაფიული ინდუსტრიის უშინაარსო ტექსტია. იგი სტანდარტად 1500-იანი წლებიდან იქცა, როდესაც უცნობმა მბეჭდავმა ამწყობ დაზგაზე წიგნის საცდელი ეგზემპლარი დაბეჭდა. მისი ტექსტი არამარტო 5 საუკუნის მანძილზე შემორჩა, არამედ მან დღემდე, ელექტრონული ტიპოგრაფიის დრომდეც უცვლელად მოაღწია. განსაკუთრებული პოპულარობა მას 1960-იან წლებში გამოსულმა Letraset-ის ცნობილმა ტრაფარეტებმა მოუტანა, უფრო მოგვიანებით კი — Aldus PageMaker-ის ტიპის საგამომცემლო პროგრამებმა, რომლებშიც Lorem Ipsum-ის სხვადასხვა ვერსიები იყო ჩაშენებული."
    },
    {
        img: "ripplebot.jpg",
        title: "რობოტი #3",
        description: "Lorem Ipsum საბეჭდი და ტიპოგრაფიული ინდუსტრიის უშინაარსო ტექსტია. იგი სტანდარტად 1500-იანი წლებიდან იქცა, როდესაც უცნობმა მბეჭდავმა ამწყობ დაზგაზე წიგნის საცდელი ეგზემპლარი დაბეჭდა. მისი ტექსტი არამარტო 5 საუკუნის მანძილზე შემორჩა, არამედ მან დღემდე, ელექტრონული ტიპოგრაფიის დრომდეც უცვლელად მოაღწია. განსაკუთრებული პოპულარობა მას 1960-იან წლებში გამოსულმა Letraset-ის ცნობილმა ტრაფარეტებმა მოუტანა, უფრო მოგვიანებით კი — Aldus PageMaker-ის ტიპის საგამომცემლო პროგრამებმა, რომლებშიც Lorem Ipsum-ის სხვადასხვა ვერსიები იყო ჩაშენებული."
    }
];

dataList = "";

/////////////////////////////
// http://rupori.org/problems.json
// http://rupori.org/problems/new?mobile=true&title=problem&description=description

window.addEventListener('load', function () {

    // are we running in native app or in a browser?
    window.isphone = false;
    if(document.URL.indexOf("http://") === -1 
        && document.URL.indexOf("https://") === -1) {
        window.isphone = true;
    }

    if( window.isphone ) {
        document.addEventListener("deviceready", onDeviceReady, false);
    } else {
        onDeviceReady();
    }
    
    function GetGeoLocation() {
        var options = { timeout: 30000, enableHighAccuracy: true };
        navigator.geolocation.getCurrentPosition(GetPosition, PositionError, options);
    }
    function GetPosition(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        // array
        var coordinates = { lat: latitude, lon: longitude};
        complete(coordinates);
    }
    function PositionError() {
        navigator.notification.alert('Could not find the current location.');
    }
    /*function ReverseGeocode(latitude, longitude){
        var reverseGeocoder = new google.maps.Geocoder();
        var currentPosition = new google.maps.LatLng(latitude, longitude);
        reverseGeocoder.geocode({'latLng': currentPosition}, function(results, status) {
     
                if (status == google.maps.GeocoderStatus.OK) {
                        if (results[0]) {
                        navigator.notification.alert('Address : ' + results[0].formatted_address + ',' + 'Type : ' + results[0].types);
                        }
                else {
                        navigator.notification.alert('Unable to detect your address.');
                        }
            } else {
                navigator.notification.alert('Unable to detect your address.');
            }
        });
    }*/

    function complete(coor) {
        // Get Data From Server
        $.ajax({ url: 'http://rupori.org/?mobile=true'+
                        '&lat='+ coor['lat']
                        + '&lon='+ coor['lon']
                        + '&distance=111149',
            success: function(data) {
                loadComplete(data);
            },
            error: function() {
                loadComplete(dataList);
            } 
        });
    };

    function onDeviceReady() {
        alert('device ready');
        var coor = GetGeoLocation();
    }

    new FastClick(document.body);
    ///////////////
    //document.addEventListener("deviceready", onDeviceReady, true);
    ///////////////

     $(".container").css({ "height": document.documentElement.clientHeight + "px" });
     // alert(document.documentElement.clientHeight);

});


function submitForm() {
    // Error handler
    if($( ".title" ).val() == "" && $( ".descrip" ).val() == "")
        $( ".title, .descrip" ).css({ "border-color": "#333333" })
    else if($( ".title" ).val() == ""){
        if($( ".descrip" ).val() != "")
            $( ".descrip" ).css({ "border-color": "#fff" })

        $( ".title" ).css({ "border-color": "#333333" })
    }
    else if($( ".descrip" ).val() == ""){
        if($( ".title" ).val() != "")
            $( ".title" ).css({ "border-color": "#fff" })

        $( ".descrip" ).css({ "border-color": "#333333" })
    }
    else {
        // if forms are not empty
        $( ".addform" ).fadeOut(500, function() {  
            $( ".sending" ).fadeIn(300);
        });
        dataUrl = 'http://rupori.org/problems/new?mobile=true' + 
                    '&title=' + $( ".title" ).val() +
                    '&description=' + $( ".descrip" ).val();

        $.ajax({ url: dataUrl,
            success: function(data) {
                // if forms are not empty
                setTimeout(function(){ 
                    $( ".sending" ).fadeOut(1000, function() {  
                        $( ".addform" ).fadeIn(300);
                    });
                }, 1000);
                
            },
            error: function(data) {
                console.log(data);
            }
        });
    }
}

/////////////////////////////
///// Complete Loading Data
/////////////////////////////
function loadComplete(dataList){

    var slider = new PageSlider($("#container"));
    $(window).on('hashchange', route);

    // The dynamically built HTML pages. In a real-life app,
    // use Handlerbar.js, Mustache.js or another template engine

    /////////////////////////////
    //////////// HOME
    var homePage =
        '<div>' +
            '<div class="header big"><h1><img class="logo" src="images/logo.png"></h1></div>' +
            '<div class="scroller">' +
                '<div class="home-page">' +
                    '<div class="globe"></div>' +
                    '<div class="menu">' +
                        '<a href="#add"><div class="add-btn"></div>' + 
                        '<a href="#list"><div class="near-btn"></div>' + 
                        '<a href="#info"><div class="info-btn"></div>' + 
                        '<a href="#exit"><div class="exit-btn"></div>' +
                    '</div>' +
                    '<div class="domain"><p>© <a href="http://rupori.com" target="_blank">rupori.com</a></p></div>' +
                    '<div class="foot"></div>' +
                '</div>'
            '</div>' +
        '</div>';

    /////////////////////////////
    //////////// ADD
    var addPage =
        '<div>' +
            '<div class="header"><a href="#" class="back">Back</a><h1><img class="logo" src="images/logo.png"></h1></div>' +
            '<div class="scroller">' +
                '<div class="addform">' +
                    '<input type="text" class="title" placeholder="Title">' +
                    '<textarea class="descrip" placeholder="description .."></textarea>' +
                    '<input type="button" class="addbtn" value="ADD" onClick="submitForm()">' +
                '</div>' +
                '<div class="sending"><img src="images/loader.gif"></div>' +
            '</div>' +
        '</div>';

    /////////////////////////////
    //////////// INFO
    var infoPage =
        '<div>' +
            '<div class="header"><a href="#" class="back">Back</a><h1><img class="logo" src="images/logo.png"></h1></div>' +
            '<div class="scroller">' +
                '<div class="partners">' +
                '<img src="partners/undp.png">' +
                '<img src="partners/kotn.jpg">' +
                '<img src="partners/rdfg.jpg">' +
                '<img src="partners/elva.png">' +
                '</div>' +
            '</div>' +
        '</div>';

    /////////////////////////////
    //////////// LIST
    var listPage =
        '<div>' +
            '<div class="header"><a href="#" class="back">Back</a><h1><img class="logo" src="images/logo.png"></h1></div>' +
            '<div class="scroller">' +
                '<ul class="list">';
                $.each(dataList, function( i, v ) {
                    $.each(v, function( index, value ) {
                        if(index == "title")
                            listPage += '<a href="#' + value + '"><li><strong>' + value + '</strong></li></a>'
                    });
                });
        listPage +=
                '</ul>' +
            '</div>' +
        '</div>';

    /////////////////////////////
    //////////// DETAILED
    var detailsPage =
        '<div>' +
            '<div class="header"><a href="#list" class="back">Back</a></div>' +
            '<div class="scroller">' +
                '<div class="details">' +
                    '<h2>{{title}}</h2>' +
                    '<p>{{description}}</p>' +
                '</div>' +
            '</div>' +
        '</div>';


    // Primitive template processing. In a real-life app,
    // use Handlerbar.js, Mustache.js or another template engine
    function merge(tpl, data) {
        return tpl.replace("{{title}}", data.title)
                  .replace("{{description}}", data.description);
    }

    // Basic page routing
    function route(event) {
        var page,
            hash = window.location.hash,
            ind = 0;

            $.each(dataList, function( i, v ) {
                $.each(v, function( index, value ) {
                    if(index == "title" && hash === "#" + value){
                        //console.log("#" + value)
                        page = merge(detailsPage, v);
                        ind = 1;

                        return false;
                    }
                });
            });

        if(!ind){
            if (hash === "#add") {
                page = addPage;
                // slider.slide($(page), "right");
            } else if (hash === "#list") {
                page = listPage;
            } else if (hash === "#info") {
                page = infoPage;
            } else if (hash === "#exit") {
                // exit from app
                /*if (navigator.app)
                   navigator.app.exitApp();
                else if (navigator.device)
                    navigator.device.exitApp();*/

                navigator.notification.confirm(
                    'Do you want to quit', 
                    quitApp, 
                    'QUIT TITLE', 
                    'OK,Cancel'  
                );
            }
            else {
                page = homePage;
            }
        }
        
        slider.slidePage($(page));
    }

    route();

    // Remove Loader, Load View
    $( ".loader" ).fadeOut( 600, function() {
        setTimeout(function(){
            $( "#container" ).fadeIn(300);
        }, 300); 
    });

    $('[placeholder]').parents('form').submit(function() {
      $(this).find('[placeholder]').each(function() {
        var input = $(this);
        if (input.val() == input.attr('placeholder')) {
          input.val('');
        }
      })
    });

    function quitApp(button) {
        if(button == "1")
            navigator.app.exitApp(); 
    }

}
