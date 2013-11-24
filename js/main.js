var addKeywords = function (metaKeywords) {
	var tags = $("<span />")
	.html("<p>"+metaKeywords+"</p>");
	$(company).append(tags);
	keywordCount = keywordCount+1;
}

//var keywordsArray = new Array ();

var getKeywords = function (urlInput, current) {
	var company = current;
	
	$.ajax({
	    url: urlInput,
	    type: 'GET',
	    async: false,
	    success: function(res) { //might need an error as well... remove from list? 
	        var metaKeywords = $(res.responseText).siblings("meta[name='keywords']").attr("content");
	        
	        if (metaKeywords === undefined) {
	        	metaKeywords = $(res.responseText).siblings("meta[name='Keywords']").attr("content");

	        }
	        
	        else {
	        	var tags = $("<span />")
				.html("<p>"+metaKeywords+"</p>");
				$(company).append(tags);
				keywordCount = keywordCount+1;
	        };
	        
			//get description as well at the same time, maybe store keywords in an array?
	    }
	});

}

var listLinks = function () {

	// the ajax call takes the links on the nytm page, and if it is a company name,
	// it pushes it back to the website by displaying the name of the company.

	$.ajax({
	    url: "http://nytm.org/made-in-nyc",
	    type: 'GET',
	    success: function(res) {
	        var ahref = $(res.responseText).find("a");
	        $(ahref).each(function( index ) {
				if (index > 3) {
					if (this.text != "(hiring)") {
						var company = $("<li />")
						.html(this.text);
						$(company).append($("<br />"));

						// when it gets to a company url, it searches for the
						// company's website. It wants to get the metadata of
						// the with the getKeywords function.

						var currentUrl = $(this).attr("href");
					
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
	// this function lists the companies from nytmeetup group.
 	listLinks();
 	// three_multiples(14);
}

$(document).ready(initialise);
