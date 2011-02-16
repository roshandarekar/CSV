MainController = function(app) { with (app) {

	bind('save-row', function(e, data) {
       	
       	alert("sidebar form submitted");
    });
		

        app.get('#/List',function(context)
            {
                context .render('templates/List-View.template', [ { "details" : "list-details" } , { "details" : "shown data" }] )
                        .replace("#main-content")
                        .then (function(){
                            $('.basetable').tableHover();
                            $("#MyTable").tablesorter();
                        })
                        .then(function() {
                            $('#chckhead').click(function() {
                                if (this.checked==false) {
                                    $('.chcktb1').attr('checked','')
                                }
                                else{
                                    $('.chcktb1').attr('checked','true')
                                }
                                return true;
                            });
                        })
                        .then(function() {

                            $("#MyTable").find("span.edit").click(function() {

								
								var id = $(this).attr("id").replace("row_",'');
								
								$.getJSON("/api/Book/" + id , function(json) {

                                	context .render('templates/Edit-Data.template', json)
                                        	.replace("#sidebar-content")
											then( function(html) {

												$('#Save_Row').click(function(){
                     								
                     								context.trigger("save-row");
                     							})
											})
								});

                            });

                        })

               context .render('templates/Menu.template')
               		.replace("#section-menu")
                    .then(function() {
                            $("#create").click(function() {

                                context .render('templates/Edit-Data.template',{'id':'new'})
                                		.replace("#sidebar-content")
										.then( function(html) {

											$('#Save_Row').click(function(){
                     							
                     							context.trigger("save-row");
                     						})
										})

                             })
                     })
                     
                    
        });
//==============================IMPORT==========================================
        app.get('#/Import',function(context)
        {
                context.render('templates/List-View.template')
                       .appendTo('#main-content')
                       .then(function() {
                       		$('.basetable').tableHover();
                        })
                        .then (function(){
                         $('.basetable').tableHover();
                         $("#MyTable").tablesorter();
                     })
                     .then(function() {
                         $('#chckhead').click(function() {
                             if (this.checked==false) {
                                 $('.chcktb1').attr('checked','')
                             }else{
                                 context.log("Yahoo1");
                                $('.chcktb1').attr('checked','true')
                             }
                             return true;
                         });
                     })
                       .then(function() {
                            context.load('templates/Edit-Data.template')
                                   .then(function( content) {
                                         $.facebox( content );
                                   });
                       })
            context.load('templates/Edit-Data.template')
                   .then(function( content) {
			$.facebox( content );
                   });
        });
//=================================EXPORT=======================================
        app.get('#/Export',function(context)
        {
              context.redirect("#Export");
        });
}}
