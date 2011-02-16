MainController = function(app) { with (app) {
var id,name,Admin_Id,Expiry;
        bind('save-row', function(e, data) {
            alert("sidebar form submitted");
            id=$('#form').find("input[name=ID]").val()
            alert(id);
            name=$('#form').find("input[name=Name]").val()
            alert(name);
            Admin_Id=$('#form').find("input[name=Admin_Id]").val()
            alert(Admin_Id);
            Expiry=$('#form').find("input[name=Expiry]").val()
            alert(Expiry)
            
        });
        bind('edit-n-hover',function(e,data){

            
                    $('.basetable').tableHover();
                    $("#MyTable").tablesorter();
                    $("#MyTable").find("span.edit").click(function() {
                        var id = $(this).attr("id").replace("row_",'');
                        alert(id);
                        $.getJSON("api/Table.json",function(json){
                            context.render('templates/Edit-Data.template',{"id":id,"data": json})
                                    .replace("#sidebar-content")
                                    .then( function(html) {
                                        $('#Save_Row').click(function(){
                                            context.trigger("save-row");
                                        })
                                    })
                         })
                    })
                    $("#MyTable").find("span.delete").click(function() {
                        var id = $(this).attr("id").replace("row_",'');
                        alert(id);
                        var k=$('#form').find("input[type=hidden]").val()
                        alert(k);
                        $(this).parent("td").parent("tr").remove();
                        $("#MyTable").trigger("update");
                    })
           
        })
        /*bind('new-row', function(e, data) {
            alert("new row inserted");
            context.render('templates/New_Row.template')
                    .appendTo("#ADD")

        });*/

        app.get('#/List',function(context)  {
            context .render('templates/List-View.template')
                    .replace("#main-content")
                    .then (function(){
                        this.load("api/Table.json")
                            .then(function(json){
                                context.render('templates/Edit.template',{"data":json})
                                       .replace("#ADD")
                                       .then(function(){
                                           context.trigger("edit-n-hover");
                                       })
                            })
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
        context .render('templates/Menu.template')
        	.replace("#section-menu")
                .then(function() {
                    $("#create").click(function() {
                        context .render('templates/Edit-Data.template',{'data':'new'})
                                .replace("#sidebar-content")
                                .then( function(html) {
                                    $('#Save_Row').click(function(){
                                        context .trigger("save-row");
                                        context .render('templates/New_Row.template',{"data":{"ID":id,"Name":name,"Admin_Id":Admin_Id,"Expiry":Expiry}})
                                                .appendTo("#ADD")
                                                .then(function(){
                                                    context .trigger("edit-n-hover");
                                                })
                                    })
                                })
                    })
                })
                .then(function() {
                    $("#delete").click(function() {
                        alert("Delete All");
                        if($('#chckhead').checked=="true")
                            {
                                alert('Selected All');
                                $("#ADD").remove();
                            }
                        else
                            {
                                alert("Invalid ")
                            }
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
