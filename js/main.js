var getKeywords = function (urlInput, current) {
	company = current;
	var tags = $("<span />")
	.html("the address is " + urlInput);
	$(company).append(tags);

	
	// $.ajax({
	//     url: urlInput,
	//     type: 'GET',
	//     success: function(res) {
	//         var metaKeywords = $(res.responseText).siblings("meta[name='Keywords']").attr("content");
	//         var tags = $("<span />")
	// 		.html(this.text);
	// 		// .css("color", "red");
	// 		$("#current").append(tags);
	//     }
	// });
}

// var getDescription = function (urlInput) {

// 	$.ajax({
// 	    url: urlInput,
// 	    type: 'GET',
// 	    success: function(res) {
// 	        var metaDescription = $(res.responseText).siblings("meta[name='Description']").attr("content");
// 	        $("p").html(metaDescription);
// 	    }
// 	});
// }



// var companyRequest = function () {
// 	for (var i = 0; i < 2; i++) {
// 		console.log("in companyRequest");
// 		var currentUrl = $(this).attr("href");
// 		console.log(currentUrl);
// 		getKeywords(currentUrl);
// 	};
	
// }

var listLinks = function () {
	$.ajax({
	    url: "http://nytm.org/made-in-nyc",
	    type: 'GET',
	    success: function(res) {
	        var ahref = $(res.responseText).find("a");
	        $(ahref).each(function( index ) {
				// console.log( index + ": " + $(this).attr("href") );
				if (index > 3) {
					if (this.text != "(hiring)") {
						var currentUrl = $(this).attr("href");
						var company = $("<li />")
						.html(this.text)
						$(company).append($("<br />"));
						// .css("color", "red");
						//here comes the data enquiry
						// var tags = $("<span />")
						// .html("testing Keywords a lot of them. lorem ipsum. cross domain ajax jquery ajax other sort elements ignore etc.");
						// $(company).append(tags);


						// console.log(currentUrl);
						getKeywords(currentUrl, company);
						$("ul").append(company);
						$(company).css("visibility", "visible");
					};
				};
			});
	        
	    }
	});
}

function initialise() {
	console.log("initalisation started...");
	// $('#container').load('http://www.vinylgrafik.hu'); // SERIOUSLY!
 	listLinks();
	// getKeywords("http://www.vinylgrafik.hu");
}

$(document).ready(initialise);
