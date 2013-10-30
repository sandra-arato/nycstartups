var getKeywords = function (urlInput, current) {
	var company = current;
	
	$.ajax({		//make this call syncronous by setting async:false
	    url: urlInput,
	    type: 'GET',
	    success: function(res) { //might need an error as well... remove from list?
	        var metaKeywords = $(res.responseText).siblings("meta[name='Keywords']").attr("content");
	        var tags = $("<span />")
			.html(this.text);
			// .css("color", "red");
			$(company).append(tags);
			//get description as well at the same time, maybe store keywords in an array?
	    }
	});

}

var listLinks = function () {
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
 	listLinks();
}

$(document).ready(initialise);
