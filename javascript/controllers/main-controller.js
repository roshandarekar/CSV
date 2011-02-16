MainController = function(app) { with (app) {
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
                            $("#MyTable").find("span.edit").click(function(){
                                alert($(this).find('tr[name=1]').attr("id"));
                                context .render('templates/Edit-Data.template',{'type':'old'})
                                        .replace("#sidebar-content")
                            })
                        })
                        .then(function() {
                            context .render('templates/Menu.template')
                                    .replace("#section-menu")
                                    .then(function() {
                                        $("#create").click(function(){
                                            context .render('templates/Edit-Data.template',{'type':'new'})
                                                    .replace("#sidebar-content")
                                            //var k=$('#form').find('input[name=id]').val()
                                            //context .render('templates/Edit.template',{"ID":"k","NAME":"$(this).find('input[name=name]').val()","ADMIN_ID":"$(this).find('input[name=admin]').val()","EXPIRY":"$(this).find('input[name=exp]').val()"})
                                            //        .replace("#ADD")
                                        })
                                    })
                                    .then('#Save_Row').click(function(){
                                        alert("Clicked On Submit");
                                        //context .render('templates/Edit.template',{"ID":"k","NAME":"$(this).find('input[name=name]').val()","ADMIN_ID":"$(this).find('input[name=admin]').val()","EXPIRY":"$(this).find('input[name=exp]').val()"})
                                        //        .replace("#ADD")
                                    })
                        })
                        /*.then(function() {
                            $("#form").find("button[id='submit']").click(function(){
                                console.log("In The Submit");
                                var k=$('#form').find('input[name=id]').val()
                                if($("#form").find("input[name=id]").attr('id')=="id_old")
                                    alert($("#form").find("input[name=id]").attr('id').replace('id_'));
                                    context .render('templates/Edit.template',{"ID":k,"NAME":"$(this).find('input[name=name]').val()","ADMIN_ID":"$(this).find('input[name=admin]').val()","EXPIRY":$(this).find('input[name=exp]').val()})
                                            .replace("#ADD")
                            })
                        })*/
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