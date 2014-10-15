$(document).ready(function(){
    if( $(".toggle_xrow_mobile_menu").length )
    {
        if ( $(".toggle_xrow_mobile_menu[data-current_node]").length )
        {
            var current_node_id = $(".toggle_xrow_mobile_menu").data("current_node");
        }
        else
        {
            var current_node_id = false;
        }
        if ( $(".toggle_xrow_mobile_menu[data-root_node]").length )
        {
            var root_node_id = $(".toggle_xrow_mobile_menu").data("root_node");
        }
        else
        {
            var root_node_id = false;
        }
        
        mobileMenuGetChildren(false, current_node_id, root_node_id, root_node_id);

        $("body").append('<div class="xrow-mobile-menu-layer"></div>');

        $(".toggle_xrow_mobile_menu").on('click', function(){
            $(".xrow-mobile-menu-layer").fadeIn("slow");
            $(".xrow-mobile-menu").animate({left: "0px"}, 200);
            //window.scrollTo(0, 0);
            $("body").css({
                overflow: "hidden"
            });
        });

        $(".xrow-mobile-menu-layer").on('click', function(){
            $(this).fadeOut("slow");
            $(".xrow-mobile-menu").animate({
                left: "-" + $(".xrow-mobile-menu").outerWidth() + "px"
                }, 200);
            $("body").css({
                overflow: "auto"
            });
        });
    }
});

function mobileMenuGetChildren(object, current_node_id, root_node_id)
{
    if (object == false)
    {
        var menu_url = false;
    }
    else
    {
        var menu_url = $(object).data("nodeid");
    }
    $(".xrow-mobile-menu span").click(function(){
        $(".xrow-mobile-menu").animate({ scrollTop: 0 }, 0);
    });

    if( $(object).find("ul").length == false )
    {
    	 $.ajax({
             url: $.ez.root_url + 'xrowmobilemenu/view/' + menu_url + "/" + current_node_id + "/" + root_node_id,
             type: "GET",
             crossDomain: true,
             success: function (data) {
                 if (object == false)
                 {
                     $("body").append(data);
                     $(".xrow-mobile-menu").find(".children").each(function(){
                         $(this).one("mouseenter", function(){
                             mobileMenuGetChildren($(this), current_node_id, root_node_id);
                         });
                     });
                 }
                 else
                 {
                     $(object).append(data);
                     $(object).find(".children").each(function(){
                         $(this).one("mouseenter", function(){
                             mobileMenuGetChildren($(this), current_node_id, root_node_id);
                         });
                     });
                 }
                 $(".closemenu").on('click', function(){
                     $(".xrow-mobile-menu-layer").fadeOut("slow");
                     $(".xrow-mobile-menu").animate({
                         left: "-" + $(".xrow-mobile-menu").outerWidth() + "px"
                         }, 200);
                     $("body").css({
                         overflow: "auto"
                     });
                 });
                 $(".xrow-mobile-menu span").click(function(){
                     var clicked = $(this);
                     $(".xrow-mobile-menu > ul").animate({
                         left: parseInt( -1 * $(clicked).data("depth") * $(".xrow-mobile-menu").outerWidth() ) + "px",
                     }, 100, function(){
                         if( $(clicked).hasClass("back") )
                         {
                             $(clicked).closest("li.depth-" + $(clicked).data("depth")).removeClass("active");
                         }
                     });
                     if( $(clicked).hasClass("back") == false )
                     {
                         $(clicked).closest("li").first().addClass("active");
                     }
                 });
             },
             error: function (xhr, status) {
                 console.log("error menu");
             }
         });
    }
    else
    {
        $(".xrow-mobile-menu > ul").animate({
            left: parseInt( -1 * $(clicked).data("depth") * $(".xrow-mobile-menu").outerWidth() ) + "px",
        }, 100, function(){
            if( $(clicked).hasClass("back") )
            {
                $(clicked).closest("li.depth-" + $(clicked).data("depth")).removeClass("active");
            }
        });
        if( $(clicked).hasClass("back") == false )
        {
            $(clicked).closest("li").first().addClass("active");
        }
    }
}