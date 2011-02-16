/* Created by jankoatwarpspeed.com */

(function($) {
    $.fn.formToWizard = function(options) {
        options = $.extend({  
            submitButton: "#submit" ,
            stepElements:"fieldset",
            next:"#next",
            prev:"#prev",
            navContainer:"#steps",
            stepPrefix:"#step"

        }, options); 
        
        var element = this;

        var steps = $(element).find(options.stepElements);
        var count = steps.size();
        var submmitButtonName =  options.submitButton;
        var prefix = options.stepPrefix;
        $(submmitButtonName).hide();
		
		var navContainer = options.navContainer;

        // 2
        //$(element).before("<ul id='steps'></ul>");

        steps.each(function(i) {

        });
/*
        steps.each(function(i) {
            $(this).wrap("<div id='step" + i + "'></div>");
            $(this).append("<p id='step" + i + "commands'></p>");

            // 2
            var name = $(this).find("legend").html();
            $("#steps").append("<li id='stepDesc" + i + "'>Step " + (i + 1) + "<span>" + name + "</span></li>");

            if (i == 0) {
                createNextButton(i);
                selectStep(i);
            }
            else if (i == count - 1) {
                $("#step" + i).hide();
                createPrevButton(i);
            }
            else {
                $("#step" + i).hide();
                createPrevButton(i);
                createNextButton(i);
            }
        });
*/
      function createPrevButton(i) {
            var stepName = "step" + i;
            $("#" + stepName + "commands").append("<a href='#' id='" + stepName + "Prev' class='prev'>< Back</a>");

            $("#" + stepName + "Prev").bind("click", function(e) {
                $("#" + stepName).hide();
                $("#step" + (i - 1)).show();
                $(submmitButtonName).hide();
                selectStep(i - 1);
            });
        }

        function createNextButton(i) {
            var stepName = "step" + i;
            //$("#" + stepName + "commands").append("<a href='#' id='" + stepName + "Next' class='next'>Next ></a>");

            $("#" + stepName + "Next").bind("click", function(e) {
                $("#" + stepName).hide();
                $("#step" + (i + 1)).show();
                if (i + 2 == count)
                    $(submmitButtonName).show();
                selectStep(i + 1);
            });
        }

        function selectStep(i) {
            $(navContainer).find("li").removeClass("active");
            $(prefix + i).addClass("active");

            $(prefix + i).next("li").addClass("upcoming");
            $(prefix + i).prev("li").addClass("visited");
        }
		$(option.next).bind("click", function(e) {

			// remove 'step' from 'step4' to get 4
            var currentStep = $(navContainer).find("li.active").attr("id").replace("step","");
            if (parseInt(currentStep) < (count -1) ) 
            selectStep((parseInt(currentStep) + 1));
        });
        $(option.prev).bind("click", function(e) {

            var currentStep = $(navContainer).find("li.active").attr("id").replace("step","");
       		if (parseInt(currentStep) > 0) 
       		selectStep((parseInt(currentStep) - 1));
       });
    }
})(jQuery); 
