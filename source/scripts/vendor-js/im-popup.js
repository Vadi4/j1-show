$.fn.imPopup = function() {
    var $this, id, ct_open;
    $this = this;
    id = '';
    $this.on('click', function(e) {
        e.preventDefault();

        ct_open = $(".im-popup._visible").length;

        id = $(this).data('id');
        if ($(id).length) {
            if(ct_open == 0) {
                var offset = window.innerWidth - $(window).width();
                $('body').css({
                    overflow: 'hidden',
                    paddingRight: offset
                });
            }
        };

        var handler = $(this).data('handler');
        var command = $(this).data('command');
        if(handler && command) {
            var data = $(this).data();
            $.ajax({
                url: '/form/',
                data: data,
                dataType: "json",
                success: function(response) {
                    if(!response.result) {
                        console.log(response.message);
                    } else {
                        $(".im-popups " + id).html(response.message);
                    }
                }
            });
        }

        return $(".im-popups " + id).addClass('_visible');
    });
    $('.im-popup .b-popup__close').click(function(e) {
        return e.preventDefault();
    });
    return $('.im-popup').on('click', function(e) {
        if (!$(e.target).hasClass('im-popup-inside') && !$(e.target).parents('.im-popup-inside').length || $(e.target).hasClass('b-popup__close')) {
            var id = '#' + $(this).attr('id');
            if ($('.im-popup._visible').length == 1) {
                setTimeout(function() {
                    $('body').css({
                        overflow: '',
                        paddingRight: ''
                    });
                }, 300);
            }
            return $(".im-popups " + id).removeClass('_visible');
        }
    });
};

$('.im-popup-link').imPopup();