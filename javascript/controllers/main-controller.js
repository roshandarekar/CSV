MainController = function(app) { with (app) {
                var id,name,Admin_Id,Expiry;
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$BEFORE APP$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
            app.before(/^#\/List/, function(context) {
                context.log("inisde table");
        	context.render('templates/Menu.template').replace("#section-menu");
                context.render('templates/Pager.template').replace("#sidebar-content");
                $("table").trigger("update");
            })
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$BEFORE APP$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$USE BIND$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
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
//------------------------------------------------------------------------------
            bind('Process',function(){
                var context=this
//=======================================TO EDIT DATA===========================
                    $("#MyTable").find("span.edit").click(function(ev) {
                        var id = $(this).attr("id").replace("row_",'');
                        alert(id);
                        $.getJSON("api/Table.json",function(json){
                            context .render('templates/Edit-Data.template',{"id":id,"data":json})
                                    .replace("#EDIT")
                                    .then( function(html) {
                                        $('#Save_Row').click(function(){
                                            context.trigger("save-row");
                                        })
                                    })
                        })
                    });
//======================================TO DELETE ROW===========================
                    $("#MyTable").find("span.delete").click(function() {
                        $(this).unbind("click");
                        $(this).siblings().unbind("click");
                        $(this).parent("td").siblings().css("text-decoration", "line-through");
                    });
//=====================================TO SELECT ALL CHECKBOX===================
                    $('#chckhead').click(function() {
                        if (this.checked==false) {
                            $('.chcktb1').attr('checked','')
                        }
                        else{
                            $('.chcktb1').attr('checked','true')
                        }
                        return true;
                    });
//========================================TO EXPAND=============================
                    $("#MyTable").find("a.expand").click(function() {
                        var id = $(this).attr("id").replace("row_",'');
                        alert(id);
                        $.getJSON("api/Table.json",function(json){
                            context .load('templates/Edit-Data.template',{"id":id,"data":json})
                                    .then(function(content){
                                        $.facebox( content );
                                    })
                        })
                    });
})
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$USE BIND$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$GET APP$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
            app.get('#/List',function(context)  {
                context .render('templates/List-View.template')
                        .replace("#main-content")
                        .then (function(){
//===============================TO LOAD ROWS USING JSON========================
                            $.getJSON("api/Table.json",function(json){
                                context .render('templates/Edit.template',{"data":json})
                                        .replace("#ADD")
                                        .then(function(){
                                            context.trigger("Process");
                                        })
//======================================TO INSERT NEW ROW=======================
                                        .then(function(){
                                            $("#create").click(function() {
                                                context .render('templates/Edit-Data.template',{'data':'new'})
                                                        .replace("#EDIT")
                                                        .then( function(html) {
                                                            $('#Save_Row').click(function(){
                                                                context .trigger("save-row");
                                                                context .render('templates/Edit-Data.template',{"data":{"ID":"id","Name":"name","Admin_Id":"Admin_Id","Expiry":"Expiry"}})
                                                                        .appendTo("#ADD")
                                                                        .then(function(){
                                                                            context .trigger("Process")
                                                                        })
                                                                })
                                                        })
                                            });
//=======================================TO DELETE ALL/SELECTED ROWS============
                                            $("#delete").click(function() {
                                                var checkboxes = $("#MyTable > tbody").find(":checked");
                                                    if ($("#chckhead").attr("checked")) {
                                                        alert('Selected All');
                                                        $("#ADD").remove();
                                                    }
                                                    else {
                                                        $.each(checkboxes, function(n, box){
                                                        // box is individual checkbox
                                                            var id = $(box).parent("td").siblings("td:first").text();
                                                            $("#row_"+id).unbind("click");
                                                            $("#row_"+id).siblings().unbind("click");
                                                            $("#row_"+id).parent("td").siblings().css("text-decoration", "line-through");
                                                        })
                                                    }
                                            });
//====================================FOR IMPORT LIVE BOX=======================
                                            $("#Import").click(function(){
                                                context .load('templates/Import-View.template')
                                                        .then(function( content) {
                                                            $.facebox( content );
                                                         });
                                            });
//====================================FOR EXPORT LIVE BOX=======================
                                            $("#Export").click(function(){
                                                context .load("templates/Export-View.template")
                                                        .then(function(content){
                                                            $.facebox(content);
                                                        });
                                                });
//====================================FOR SEARCH LIVE BOX=======================
                                            $("#Search1").click(function(){
                                                context .load("templates/Search.template")
                                                        .then(function(content){
                                                            $.facebox(content);
                                                        });
                                            });
//=======================================FOR TABLESORTER/TABLEPAGER=============
                                            $("#MyTable").tablesorter()
                                                         .tablesorterPager({ container : $("#pager") , positionFixed: false})
                                        })
                            })
                        })
            });
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$GET APP$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
}}