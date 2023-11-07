'use strict';
var TCH = {
    init: function () {
        var that = this;
        that.initViews();
        that.initScript();
        that.searchScript();
        that.menuMobile();
        that.loadPage();
    },
    initViews: function () {
        var view = window.shop.template,
            that = this;
        switch (view) {
            case 'index':
                that.indexScript();
                //that.getImageInstagram();
                //that.getStoreIndex();
                break;
            case 'collection':
            case 'collection.tea':
            case 'collection.coffee':
                that.collectionScript();
                break;
            case 'search':
                break;
            case 'product':
                that.productScript();
                break;
            case 'blog':
                break;
            case 'article.store':
                that.storeScript();
                break;
            case 'page.contact':
                break;
            case 'page.brand-story':
                break;
            case 'page.stores':
                break;
            case 'page.store':
                that.initMap();
                break;
            case 'blog':
                that.getImageInstagramBlog();
                break;
            case 'page.all-store':
                that.initAllStore();
                break;
            case 'page.rewards':
                break;
            case 'page.trungthu':
                that.initMidAutumn();
                break;
            case 'page.trungthu2020':
                that.initMidAutumn2020();
                break;
            case 'page.rewards-2019':
                that.initRewardNew();
                break;
            case 'page.truyxuatnguongoc':
                that.scrollGallery();
                that.scriptTXNG();
                break;
            case 'page':
                break;
            default:
        }
    },
    loadPage: function () {
        $('.loader_overlay').addClass('loaded');
    },
    initScript: function () {
        /* Variant Product loop */
        $('.variant_product_loop').change(function () {
            var that = $(this);
            $(this).parents('.variant_product_item').find('.price_product_item').html(that.attr('data-price'));
        });
        $('.view_more_human').click(function () {
            $('.human_item_more').removeClass('hidden');
            $(this).hide();
        });
        $('#fixed-hotline-support').on('click', function () {
            $('#support_confirm').modal('show');
        })
        $('#support_confirm button.confirm_call').on('click', function () {
            $('#fixed-hotline-support + a').get(0).click();
            $('#support_confirm').modal('hide');
        });
        /* Slider top frame*/
        if ($(window).width() < 992) {
            $('.header-meta-list').owlCarousel({
                nav: false,
                dots: false,
                items: 1,
                loop: true,
                autoplay: true,
                autoplayTimeout: "7" ? "7" * 1000 : 7000,
                autoplayHoverPause: true,
            });
        }

    },
    indexScript: function () {
        /* Slider index */
        var owlSliderIndex = $('#owl_slide');
        owlSliderIndex.owlCarousel({
            nav: false,
            dotsSpeed: 400,
            dots: true,
            mouseDrag: false,
            loop: true,
            items: 1,
            autoplayHoverPause: true,
            autoplay: true,
            autoplayTimeout: 6000
        });
        owlSliderIndex.on('changed.owl.carousel translated.owl.carousel initialized.owl.carousel', function (event) {
            $("#owl_slide .owl-item .hrv-banner-caption").css('display', 'none');
            $("#owl_slide .owl-item .hrv-banner-caption").removeClass('hrv-caption')
            $("#owl_slide .owl-item.active .hrv-banner-caption").css('display', 'block');

            var heading = $('#owl_slide .owl-item.active .hrv-banner-caption').clone().removeClass();
            $('#owl_slide .owl-item.active .hrv-banner-caption').remove();
            $('#owl_slide .owl-item.active>.item').append(heading);
            $('#owl_slide .owl-item.active>.item>div').addClass('hrv-banner-caption hrv-caption');
        });
        var owlSliderDot = $('#owl_slide .owl-dot');
        owlSliderDot.each(function () {
            var indexTemp = parseInt($(this).index());
            var index = 0;
            if (index < 10) {
                index = "0" + (indexTemp + 1);
            } else {
                index = (indexTemp + 1);
            }
            $(this).html("<span class='dot-border'></span><span class='dot-number'>" + index + "</span>");
        });
        $('#owl_slide .owl-dots').wrap('<div class="container wrap-dots"></div>');
        $('#owl_slide .item').click(function () {
            window.location = $(this).attr('data-href');
        })
        /* Slider view more scroll */
        $('.fixed-scroll-down').on('click', function (e) {
            var height = $(window).scrollTop() + $(window).height();
            $('html, body').animate({
                scrollTop: height
            }, 1000);
        });
        /* Get Blog top */
        /*
        var str_url = encodeURIComponent('((blogid:article>=0)&&(tag:article=top))');
        $.ajax({
            url: "/search?q=filter=("+str_url+")&view=blog_top",
            async: false,
            success:function(data){
                $(".top_blog_home").html(data);
            }
        });
        */

        /* Slider Store */

        var $storeSlider = $('.store_slider').owlCarousel({
            nav: true,
            dots: true,
            loop: false,
            items: 1,
            mouseDrag: true,
            autoplay: false,
            navText: ['<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M10.4375 14.6667H26.6668V17.3334H10.4375L17.5895 24.4854L15.7042 26.3707L5.3335 16.0001L15.7042 5.62939L17.5895 7.51473L10.4375 14.6667Z" fill="white"/> </svg>', '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M21.5616 14.6667L14.4096 7.51473L16.2949 5.62939L26.6656 16.0001L16.2949 26.3707L14.4096 24.4854L21.5616 17.3334H5.33228V14.6667H21.5616Z" fill="white"/> </svg>'],
        });
        $storeSlider.on('changed.owl.carousel', function (event) {
            $('.store_slider_nav .nav_prev').toggleClass('disabled', $(this).find('> .owl-nav .owl-prev').hasClass('disabled'));
            $('.store_slider_nav .nav_next').toggleClass('disabled', $(this).find('> .owl-nav .owl-next').hasClass('disabled'));
        });
        $('.store_slider_nav > a').on('click', function (e) {
            e.preventDefault();
            if ($(this).is('.nav_prev')) {
                $storeSlider.trigger('prev.owl.carousel');
            } else {
                $storeSlider.trigger('next.owl.carousel');
            }
        });

        var $imagesSlider = $('.store_slider_img .image_slider');
        $imagesSlider.on('initialized.owl.carousel', function () {
            var self = this;
            setTimeout(function () {
                var dotsWidth = $(self).find('.owl-dots').width();
                var owlItemWidth = $(self).find('.owl-item:eq(0)').width();
                $(self).find('.owl-dots').css('left', (owlItemWidth - dotsWidth) / 2);
                $(self).find('.owl-next').css('left', owlItemWidth - 60)
            }, 0);
        });
        $imagesSlider.owlCarousel({
            nav: true,
            dots: true,
            loop: true,
            items: 1,
            mouseDrag: false,
            touchDrag: false,
            autoplay: true,
            autoplayTimeout: 7000,
            navText: ['<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M13.0466 18.3333H33.3333V21.6666H13.0466L21.9866 30.6066L19.63 32.9633L6.66663 20L19.63 7.03662L21.9866 9.39329L13.0466 18.3333Z" fill="white"/> </svg>', '<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M26.9534 18.3333L18.0134 9.39329L20.3701 7.03662L33.3334 20L20.3701 32.9633L18.0134 30.6066L26.9534 21.6666H6.66675V18.3333H26.9534Z" fill="white"/> </svg>'],
        });

        //debugger;
        /* Slider index banner new*/
        $('.banner_home .owl-carousel').owlCarousel({
            nav: true,
            dots: true,
            items: 1,
            loop: true,
            autoplay: true,
            autoplayTimeout: ("5" * 1000) || 7000,
        });
    },
    createCookie: function (name, value, hours) {
        if (hours) {
            var date = new Date();
            date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        } else var expires = "";
        document.cookie = name + "=" + value + expires + "; path=/";
    },
    readCookie: function (name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    },
    searchScript: function () {
        /* search */
        $('.search a').click(function () {
            $(this).parents('.search').find('.search_input_wrap').toggle();
        });
        /*$('.search_form').submit(function(e){
                e.preventDefault();
                var thatForm = $(this), input_type = thatForm.find('input[name="follow"]:checked').val(),
                        val_search = thatForm.find('input[name="q"]').val(),
                        collection_id = thatForm.find('input[name="collection_id_search"]').val();
                if(input_type == 'product'){
                    if(val_search == ''){
                        var q = '((collectionid:product='+collection_id+'))';
                    }else{
                        var q = '((collectionid:product='+collection_id+')&&(title:product**' + val_search + '))';
                    }
                    window.location = '/search?q=filter=(' + encodeURIComponent(q) + ')';
                }
            });*/
    },
    menuMobile: function () {
        /* Menu mobile */
        $('#showmenu-mobile').click(function (e) {
            e.preventDefault();
            $(".header_menu").addClass("show");
            $('#opacity').addClass("opacity_body");
            $('body').addClass("overflow_hidden");
        });
        $('#opacity,.icon_close_menu, .closemenu-mobile').click(function (e) {
            e.preventDefault();
            $(".header_menu").removeClass("show");
            $('#opacity').removeClass("opacity_body");
            $('body').removeClass("overflow_hidden");
        });
        $(".more").on("click", function () {
            var icon_fa = $('.icon_more').attr('data-icon');
            if (icon_fa == 'plus') {
                $('.icon_more').attr('data-icon', 'minus');
            } else {
                $('.icon_more').attr('data-icon', 'plus');
            }
        });
        if ($(window).width() < 992) {
            $('.has_child > a').on('click', function (e) {
                e.preventDefault();
                $(this).siblings('.menu_child').slideToggle();
            });
        }
    },
    collectionScript: function () {
        var that = this;
        var fixed_element_height = $('header').outerHeight() + 20;
        var fixed_element_height_mb = $('header').outerHeight() + $('.stikySidebar').outerHeight() + 20;
        var firstLoad = false;

        $('body')
            .on('click', '.menu_scroll_link', function (e) {
                console.log(1);
                e.preventDefault();
                e.stopPropagation();
                var $this = $(this);

                $('.sidebar_menu a').removeClass('child_active active');
                $this.next('.sidebar_menu_lv2').slideDown();
                $this.addClass('active');
                history.replaceState(null, '', $this.attr('data-url'));
                if ($this.hasClass('view_all')) {
                    $('.block_menu_item').fadeIn();
                    $("html, body").animate({scrollTop: $('.border_right_before').offset().top - fixed_element_height});
                    return;
                }

                $("html, body").animate({scrollTop: $('.border_right_before').offset().top - fixed_element_height}).promise().then(function () {
                    //debugger;
                    $('.block_menu_item[data-parent-target="' + $this.attr('data-parent-id') + '"]').fadeIn();
                    $('.block_menu_item:not([data-parent-target="' + $this.attr('data-parent-id') + '"])').hide();
                });

            })
            .on('change', '.sidebar_menu select', function () {
                var $this = $(this);
                if ($this.val() === 'null') {
                    $('.block_menu_item').fadeIn();
                    $("html, body").animate({scrollTop: $('.border_right_before').offset().top - fixed_element_height_mb}, "500");
                    return;
                }
                $("html, body").animate({scrollTop: $('.border_right_before').offset().top - fixed_element_height_mb}, "500", function () {
                    $($this.val()).fadeIn().siblings().hide();
                });
            })
            .on('click', '.sidebar_menu_lv2 a', function (e) {
                e.preventDefault();
                var $this = $(this);
                $('.sidebar_menu a').removeClass('child_active active');
                $this.addClass('active').closest('.sidebar_menu_lv2').slideDown().prev().addClass('child_active');
                history.replaceState(null, '', $this.attr('data-url'));


                $("html, body").animate({scrollTop: $('.border_right_before').offset().top - fixed_element_height}).promise().then(function () {
                    $('.block_menu_item' + $this.attr('href')).fadeIn();
                    $('.block_menu_item:not(' + $this.attr('href') + ')').hide();
                });

            })


        $('.sidebar_menu a.active').trigger('click');


        //$('.menu_scroll_link:eq(' + (window.linkActive) + ')').addClass('active');
        //$('.sidebar_menu select').val($('.sidebar_menu select option:eq(' + window.linkActive  + ')').val());
        /*
        if($('.menu_scroll_link:eq(' + (window.linkActive) + ')').hasClass('view_all') || $('.sidebar_menu select').val() === 'null') {
            $('.block_menu_item').fadeIn();
        } else {
            $('.block_menu_item:eq(' + (window.linkActive - 1) + ')').fadeIn();
        }*/

    },
    scrollSidebar: function () {
        var prevLink = null;
        /*
            $(window).scroll(function(){
                $('.sidebar_menu ul li, .sidebar_menu select option').each(function(){
                    debugger;
                    var currLink = $(this),
                            elementLink = $(currLink).prop('tagName') === 'OPTION' ? $(currLink.val()) : $(currLink.find('a').attr('href'));

                    if($(window).scrollTop() > (elementLink.offset().top - 500) && elementLink.offset().top + elementLink.height() > $(window).scrollTop()){
                        if(prevLink && prevLink.index() !== currLink.index()) {
                            if($(window).width() < 992) {
                                $('.sidebar_menu select').val(currLink.val());
                            } else {
                                //$('.sidebar_menu ul li a').removeClass('active');
                                //currLink.find('a').addClass('active');
                            }
                        }
                        prevLink = currLink;
                    }
                })
            })
            */
    },
    // Kiểm tra Id lớn nhất
    myArrayMax: function (arr) {
        var len = arr.length, max = '';
        while (len--) {
            if (arr[len].id > max) {
                max = arr[len].id;
            }
        }
        return max;
    },
    // Trả lỗi khi người dùng không cho phép lấy vị trí hiện tại
    handleLocationError: function (browserHasGeolocation, infoWindow, pos, map) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
    },
    // Đổ dữ liệu tỉnh thành
    getState: function (map, arr) {
        var state = '', boolState = false, state2 = '', state = '', boolAll = false, that = this,
            district = '', boolDistrict = false, district2 = '', district = '', html_store_item = '',
            infoWindow = new google.maps.InfoWindow(), marker, markers = [];
        var imagePath = {
            url: "//file.hstatic.net/1000075078/file/group_2773.svg", // url
            scaledSize: new google.maps.Size(24, 24), // scaled size
            origin: new google.maps.Point(0, 0), // origin
            anchor: new google.maps.Point(0, 0) // anchor
        };
        // Sort Data trả về theo Tỉnh thành và quận huyện
        var arrStore = arr.sort(function (a, b) {
            if (a.district_name === null) {
                return 1;
            } else if (b.district_name === null) {
                return -1;
            } else {
                return a.state_name.localeCompare(b.state_name) || a.district_name.localeCompare(b.district_name);
            }
        });
        // Each
        console.log(arrStore);
        $.each(arrStore, function (i, store) {
            state2 = state.split('-');
            district2 = district.split('-');
            if (store.id == '367' || store.district_name == null) return true;
            for (var c = 0; c < state2.length - 1; c++) {
                if (state2[c].toLowerCase() == store.state_name.toLowerCase()) {
                    boolState = true;
                    break;
                } else {
                    boolAll = true;
                }
            }
            for (var c = 0; c < district2.length - 1; c++) {

                if (district2[c].toLowerCase() == store.district_name.toLowerCase()) {
                    boolDistrict = true;
                    break;
                } else {
                    boolAll = true;
                }
            }
            if (boolState == false && boolDistrict == false && boolAll == true) {
                html_store_item += '</div>';
            }
            if (boolState == false) {
                html_store_item += '<div class="dropdown_select_store_item" data-state="' + that.slug(store.state_name) + '"><div class="dropdown_select_store_state">' + store.state_name + '</div>';
            }
            if (boolDistrict == false) {
                html_store_item += '<div class="dropdown_select_store_district" data-district="' + store.district_name + '">' + store.district_name + '</div>';
            }
            boolState = false;
            boolDistrict = false;
            boolAll = false;
            state = state + store.state_name + '-';
            if (store.district_name == null) {
                district = district + 'null' + '-';
            } else {
                district = district + store.district_name + '-';
            }
            var test = new google.maps.LatLng(store.latitude, store.longitude)
            console.log(test);
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(store.latitude, store.longitude),
                title: store.external_name,
                icon: imagePath,
                map: map
            });
            markers.push(marker);
            google.maps.event.addListener(marker, 'click', (function (marker) {
                return function () {
                    infoWindow.setContent("<h3 style='text-align: center;margin: 0;font-size:14px;color:#000;'>" + store.external_name + "</h3><p style='margin: 0;'>" + store.street + "</p>");
                   // debugger;
                    infoWindow.open(map, marker);
                }
            })(marker));
        });
        window.markers = markers;
        $('.dropdown_select_store').html(html_store_item);
    },
    // Thêm button lấy GPS
    addYourLocationButton: function (map, marker, arr) {
        var that = this;
        var controlDiv = document.createElement('div');

        var firstChild = document.createElement('button');
        firstChild.style.backgroundColor = '#fff';
        firstChild.style.border = 'none';
        firstChild.style.outline = 'none';
        firstChild.style.width = '28px';
        firstChild.style.height = '28px';
        firstChild.style.borderRadius = '2px';
        firstChild.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)';
        firstChild.style.cursor = 'pointer';
        firstChild.style.marginRight = '10px';
        firstChild.style.padding = '0px';
        firstChild.title = 'Your Location';
        firstChild.id = 'geolocationBtn';
        controlDiv.appendChild(firstChild);

        var secondChild = document.createElement('div');
        secondChild.style.margin = '5px';
        secondChild.style.width = '18px';
        secondChild.style.height = '18px';
        secondChild.style.backgroundImage = 'url(https://maps.gstatic.com/tactile/mylocation/mylocation-sprite-1x.png)';
        secondChild.style.backgroundSize = '180px 18px';
        secondChild.style.backgroundPosition = '0px 0px';
        secondChild.style.backgroundRepeat = 'no-repeat';
        secondChild.id = 'geolocationIcon';
        firstChild.appendChild(secondChild);

        controlDiv.index = 1;
        map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv);

        google.maps.event.addListener(map, 'dragend', function () {
            $('#geolocationIcon').css('background-position', '0px 0px');
        });
        firstChild.addEventListener('click', function () {
            that.getMyLocation(marker, function (position) {
                var position_lat = '', position_lng = '';
                if (position.code == 1) {
                    position_lat == '';
                    position_lng == '';
                } else {
                    position_lat = position.coords.latitude;
                    position_lng = position.coords.longitude;
                }
                that.loopStore(arr, position_lat, position_lng);
            });
        });
    },
    // Lấy dữ liệu GPS
    getMyLocation: function (marker, callback) {
        var imgX = '0';
        var animationInterval = setInterval(function () {
            if (imgX == '-18') imgX = '0';
            else imgX = '-18';
            $('#geolocationIcon').css('background-position', imgX + 'px 0px');
        }, 500);

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                marker.setPosition(latlng);
                clearInterval(animationInterval);
                $('#geolocationIcon').css('background-position', '-144px 0px');
                callback(position);
            }, function (position) {
                clearInterval(animationInterval);
                $('#geolocationIcon').css('background-position', '-144px 0px');
                callback(position);
            });
        } else {
            clearInterval(animationInterval);
            $('#geolocationIcon').css('background-position', '0px 0px');
        }
    },
    // Get Store Default
    getStoreDefault: function (arr) {
        var html = '', img1 = '', img2 = '', img3 = '';
        $.each(arr, function (i, store) {
            if (store.id == '367') return true;
            if (store.state_name == 'Hồ Chí Minh') {
                if (store.images[0] != undefined) {
                    img1 = store.images[0].replace(/(^\w+:|^)/, '');
                } else {
                    img1 = '';
                }
                if (store.images[1] != undefined) {
                    img2 = store.images[1].replace(/(^\w+:|^)/, '');
                } else {
                    img2 = '';
                }
                if (store.images[2] != undefined) {
                    img3 = store.images[2].replace(/(^\w+:|^)/, '');
                } else {
                    img3 = '';
                }
                html += '<li class="item"><div class="img-store">';
                html += '<img src="' + store.images[0].replace(/(^\w+:|^)/, '') + '" alt="' + store.external_name + '"/></div><div class="info">';
                html += '<h3>' + store.external_name + '</h3><p>' + store.street + ', ' + store.state_name + '</p>';
                html += '<a class="view_popup_store" onclick="TCH.openModal(this)" href="javascript:void(0)" data-name="' + store.external_name + '" data-fulladdress="' + store.address.full_address + '" data-image1="' + img1 + '" data-image2="' + img2 + '" data-image3="' + img3 + '" data-latlng="' + store.latitude + ',' + store.longitude + '">Chi tiết cửa hàng</a></div></li>';
            }
        })
        $('.list-address ul').html(html);
    },
    // Loop data Store
    loopStore: function (arr, position_lat, position_lng) {
        var that = this, distanceKM = '', arrLists = [], i, html = '', img1 = '', img2 = '', img3 = '';
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        $.each(arr, function (i, store) {
            if (position_lat == '' && position_lng == '') {

            } else {
                $('.list-address').show();
                /*distanceKM = that.getDistanceFromLatLonInKm(Number(position.coords.latitude),Number(position.coords.longitude), Number(store.latitude), Number(store.longitude));*/
                var formLatLng = new google.maps.LatLng(Number(position_lat), Number(position_lng));
                var toLatLng = new google.maps.LatLng(Number(store.latitude), Number(store.longitude));
                distanceKM = google.maps.geometry.spherical.computeDistanceBetween(formLatLng, toLatLng);
                arrLists.push({'index': i, 'id': store.id, 'met': distanceKM});
            }
        });
        if (arrLists.length != 0) {
            arrLists.sort(function (a, b) {
                return a.met - b.met;
            });
            $.each(arrLists, function (i, store) {
                var changeMetToKM = 0;
                if (store.id == '367') {
                    return true;
                }
                if (store.met < 1000) {
                    changeMetToKM = Math.round(store.met) + 'm';
                } else {
                    changeMetToKM = Math.round((store.met / 1000) * 100) / 100 + ' km';
                }
                if (arr[store.index].images[0] != undefined) {
                    img1 = arr[store.index].images[0].replace(/(^\w+:|^)/, '');
                } else {
                    img1 = '';
                }
                if (arr[store.index].images[1] != undefined) {
                    img2 = arr[store.index].images[1].replace(/(^\w+:|^)/, '');
                } else {
                    img2 = '';
                }
                if (arr[store.index].images[2] != undefined) {
                    img3 = arr[store.index].images[2].replace(/(^\w+:|^)/, '');
                } else {
                    img3 = '';
                }
                html += '<li class="item"><div class="img-store">';
                html += '<img src="' + arr[store.index].images[0].replace(/(^\w+:|^)/, '') + '" alt="' + arr[store.index].external_name + '"/></div><div class="info">';
                html += '<h3>' + arr[store.index].external_name + '</h3><p>' + arr[store.index].street + ', ' + arr[store.index].state_name + '</p>';
                html += '<a class="view_popup_store" onclick="TCH.openModal(this)" href="javascript:void(0)" data-name="' + arr[store.index].external_name + '" data-fulladdress="' + arr[store.index].address.full_address + '" data-image1="' + img1 + '" data-image2="' + img2 + '" data-image3="' + img3 + '" data-latlng="' + arr[store.index].latitude + ',' + arr[store.index].longitude + '">Chi tiết cửa hàng</a><span>' + changeMetToKM + ' </span></div></li>';
                if (i == 4) return false;
            })
            $('.list-address ul').html(html);
        }
    },
    // Loop Store by District
    loopStoreDistrict: function (map, arr, district_select, position_lat, position_lng) {
        var that = this, html = '', count = 0, distanceKM = '', changeMetToKM = '',
            img1 = '', img2 = '', img3 = '';
        $.each(arr, function (i, store) {
            var str = '';
            if (position_lat == '' || position_lng == '') {
                if (store.district_name == null)
                    str == '';
                else
                    str = store.district_name.toLowerCase();

                if (str == district_select) {
                    if (store.images[0] != undefined) {
                        img1 = store.images[0].replace(/(^\w+:|^)/, '');
                    } else {
                        img1 = '';
                    }
                    if (store.images[1] != undefined) {
                        img2 = store.images[1].replace(/(^\w+:|^)/, '');
                    } else {
                        img2 = '';
                    }
                    if (store.images[2] != undefined) {
                        img3 = store.images[2].replace(/(^\w+:|^)/, '');
                    } else {
                        img3 = '';
                    }
                    html += '<li class="item"><div class="img-store">';
                    html += '<img src="' + store.images[0].replace(/(^\w+:|^)/, '') + '" alt="' + store.external_name + '"/></div><div class="info">';
                    html += '<h3>' + store.external_name + '</h3><p>' + store.street + ', ' + store.state_name + '</p>';
                    html += '<a class="view_popup_store" onclick="TCH.openModal(this)" href="javascript:void(0)" data-name="' + store.external_name + '" data-fulladdress="' + store.address.full_address + '" data-image1="' + img1 + '" data-image2="' + img2 + '" data-image3="' + img3 + '" data-latlng="' + store.latitude + ',' + store.longitude + '">Chi tiết cửa hàng</a></div></li>';
                    count++;
                }
            } else {
                if (store.district_name == null)
                    str == '';
                else
                    str = store.district_name.toLowerCase();

                if (str == district_select) {
                    if (store.images[0] != undefined) {
                        img1 = store.images[0].replace(/(^\w+:|^)/, '');
                    } else {
                        img1 = '';
                    }
                    if (store.images[1] != undefined) {
                        img2 = store.images[1].replace(/(^\w+:|^)/, '');
                    } else {
                        img2 = '';
                    }
                    if (store.images[2] != undefined) {
                        img3 = store.images[2].replace(/(^\w+:|^)/, '');
                    } else {
                        img3 = '';
                    }
                    var formLatLng = new google.maps.LatLng(Number(position_lat), Number(position_lng));
                    var toLatLng = new google.maps.LatLng(Number(store.latitude), Number(store.longitude));
                    distanceKM = google.maps.geometry.spherical.computeDistanceBetween(formLatLng, toLatLng);

                    if (distanceKM < 1000) {
                        changeMetToKM = Math.round(distanceKM) + 'm';
                    } else {
                        changeMetToKM = Math.round((distanceKM / 1000) * 100) / 100 + ' km';
                    }
                    html += '<li class="item"><div class="img-store">';
                    html += '<img src="' + store.images[0].replace(/(^\w+:|^)/, '') + '" alt="' + store.external_name + '"/></div><div class="info">';
                    html += '<h3>' + store.external_name + '</h3><p>' + store.street + ', ' + store.state_name + '</p>';
                    html += '<a class="view_popup_store" onclick="TCH.openModal(this)" href="javascript:void(0)" data-name="' + store.external_name + '" data-fulladdress="' + store.address.full_address + '" data-image1="' + img1 + '" data-image2="' + img2 + '" data-image3="' + img3 + '" data-latlng="' + store.latitude + ',' + store.longitude + '">Chi tiết cửa hàng</a><span>' + changeMetToKM + ' </span></div></li>';
                    count++;
                }
            }
        });
        $('.list-address ul').html(html);
        $('.list-address').show();
    },
    openModal: function (ele) {
        var name = $(ele).data("name"),
            fullAddress = $(ele).data("fulladdress"),
            image1 = $(ele).data("image1"),
            image2 = $(ele).data("image2"),
            image3 = $(ele).data("image3"),
            latlng = $(ele).data("latlng"),
            html_right = '<div class="swiper-container"><div class="swiper-wrapper">';
        if (image1 != '' || image2 != '' || image3 != '') {
            if (image1 != '') {
                html_right += '<div class="swiper-slide modal_map_image_item"><div class="modal_map_bg_image" style="background-image:url(' + image1.replace(/(^\w+:|^)/, '') + ')"></div></div>';
            }
            if (image2 != '') {
                html_right += '<div class="swiper-slide modal_map_image_item"><div class="modal_map_bg_image" style="background-image:url(' + image2.replace(/(^\w+:|^)/, '') + ')"></div></div>';
            }
            if (image3 != '') {
                html_right += '<div class="swiper-slide modal_map_image_item"><div class="modal_map_bg_image" style="background-image:url(' + image3.replace(/(^\w+:|^)/, '') + ')"></div></div>';
            }
        }
        html_right += '</div><div class="modal-button-prev swiper-button-prev"><i class="fas fa-caret-left fa-7x"></i></div><div class="modal-button-next swiper-button-next"><i class="fas fa-caret-right fa-7x"></i></div></div>';
        if (name != '') {
            $('.title_map_modal').html(name);
        }
        if (fullAddress != '') {
            $('.modal_map_address').html('<i class="fas fa-map-marker-alt"></i><span>' + fullAddress + '</span>');
        }
        if (latlng != '' || latlng != null) {
            $('.btn_open_map').attr('href', 'https://www.google.com/maps/search/?api=1&query=' + latlng);
        }

        $('.modal_map_image').html(html_right);

        $('#modalMap').modal('show');
        setTimeout(function () {
            var swiper = new Swiper('.modal_map_image .swiper-container', {
                slidesPerView: 'auto',
                spaceBetween: 30,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: false,
                },
                navigation: {
                    nextEl: '.modal-button-next',
                    prevEl: '.modal-button-prev',
                },
            });

        }, 300);
    },
    initMap: function () {
        var that = this;
        var sessionStore = '';
        if (sessionStorage.getItem('store') == undefined || sessionStorage.getItem('store') == null) {
            var jqxhr = $.get("https://api.thecoffeehouse.com/api/get_all_store", function (stores) {
                console.log(stores);
                sessionStore = JSON.stringify(stores);
                sessionStorage.setItem('store', JSON.stringify(stores));
            });
            jqxhr.always(function () {
                var arrStore = JSON.parse(sessionStore);

                // Khai báo biến

                var start_lng = "106.687147000", start_lat = "10.773043000";
                var map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 7,
                    center: new google.maps.LatLng(10.9777365, 104.9041829),
                });
                var marker = new google.maps.Marker({
                    map: map,
                    animation: google.maps.Animation.DROP
                });

                // Đổ dữ liệu của tỉnh thành
                that.getState(map, arrStore);

                // Thêm btn lấy vị trí hiện tại
                that.addYourLocationButton(map, marker, arrStore);

                // Kiểm tra và lấy vị trị hiện tại
                that.getMyLocation(marker, function (position) {
                    var position_lat = '', position_lng = '';

                    if (position.code == 1) {
                        position_lat == '';
                        position_lng == '';
                        that.getStoreDefault(arrStore);
                    } else {
                        position_lat = position.coords.latitude;
                        position_lng = position.coords.longitude;
                    }
                    that.loopStore(arrStore, position_lat, position_lng);
                });

                $('.btn_select_store').on('click', function () {
                    if ($(this).parents('.group_select_store').hasClass('open')) {
                        $(this).next().slideUp('fast');
                        $(this).parents('.group_select_store').removeClass('open');
                    } else {
                        $(this).parents('.group_select_store').addClass('open');
                        $(this).next().css({'display': '-ms-flexbox', 'display': '-webkit-flex', 'display': 'flex'});
                    }
                });
                $('.dropdown_select_store_district').on('click', function () {
                    var district = $(this).data('district').toLowerCase();
                    $(this).parents('.group_select_store').find('.btn_select_store').html($(this).text());
                    $(this).parents('.group_select_store').find('.dropdown_select_store').slideUp('fast');
                    $(this).parents('.group_select_store').removeClass('open');
                    that.getMyLocation(marker, function (position) {
                        var position_lat = '', position_lng = '';
                        if (position.code == 1) {
                            position_lat == '';
                            position_lng == '';
                        } else {
                            position_lat = position.coords.latitude;
                            position_lng = position.coords.longitude;
                        }
                        that.loopStoreDistrict(map, arrStore, district, position_lat, position_lng);
                    });
                });

            });
        } else {
            sessionStore = sessionStorage.getItem('store');

            var arrStore = JSON.parse(sessionStore);

            // Khai báo biến

            var start_lng = "106.687147000", start_lat = "10.773043000";
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 7,
                center: new google.maps.LatLng(10.9777365, 104.9041829),
            });
            var marker = new google.maps.Marker({
                map: map,
                animation: google.maps.Animation.DROP
            });

            // Đổ dữ liệu của tỉnh thành
            that.getState(map, arrStore);

            // Thêm btn lấy vị trí hiện tại
            that.addYourLocationButton(map, marker, arrStore);

            // Kiểm tra và lấy vị trị hiện tại
            that.getMyLocation(marker, function (position) {
                var position_lat = '', position_lng = '';

                if (position.code == 1) {
                    position_lat == '';
                    position_lng == '';
                    that.getStoreDefault(arrStore);
                } else {
                    position_lat = position.coords.latitude;
                    position_lng = position.coords.longitude;
                }
                that.loopStore(arrStore, position_lat, position_lng);
            });

            $('.btn_select_store').on('click', function () {
                if ($(this).parents('.group_select_store').hasClass('open')) {
                    $(this).next().slideUp('fast');
                    $(this).parents('.group_select_store').removeClass('open');
                } else {
                    $(this).parents('.group_select_store').addClass('open');
                    $(this).next().css({'display': '-ms-flexbox', 'display': '-webkit-flex', 'display': 'flex'});
                }
            });
            $('.dropdown_select_store_district').on('click', function () {
                var district = $(this).data('district').toLowerCase();
                $(this).parents('.group_select_store').find('.btn_select_store').html($(this).text());
                $(this).parents('.group_select_store').find('.dropdown_select_store').slideUp('fast');
                $(this).parents('.group_select_store').removeClass('open');
                that.getMyLocation(marker, function (position) {
                    var position_lat = '', position_lng = '';
                    if (position.code == 1) {
                        position_lat == '';
                        position_lng == '';
                    } else {
                        position_lat = position.coords.latitude;
                        position_lng = position.coords.longitude;
                    }
                    that.loopStoreDistrict(map, arrStore, district, position_lat, position_lng);
                });
            });


        }

    },
    slug: function (str) {
        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g, "-");
        str = str.replace(/-+-/g, "-"); //thay thế 2- thành 1-
        str = str.replace(/^\-+|\-+$/g, "");
        return str;
    },
    initAllStore: function () {
        var that = this;
        var state = '', boolState = false, state2 = '', state = '', boolAll = false, boolStore = false,
            district = '', boolDistrict = false, district2 = '', district = '', html_store_item = '', img1 = '',
            img2 = '', img3 = '';
        // Sort Data trả về theo Tỉnh thành và quận huyện
        $.get("https://api.thecoffeehouse.com/api/get_all_store", function (stores) {
            var arrStoreTemp = JSON.stringify(stores);
            var arrStore = JSON.parse(arrStoreTemp).sort(function (a, b) {
                if (a.district_name === null) {
                    return 1;
                } else if (b.district_name === null) {
                    return -1;
                } else {
                    return a.state_name.localeCompare(b.state_name) || a.district_name.localeCompare(b.district_name);
                }
            });
            // Each
            $.each(arrStore, function (i, store) {
                state2 = state.split('-');
                district2 = district.split('-');
                if (store.id == '367' || store.district_name == null) return true;
                for (var c = 0; c < state2.length - 1; c++) {
                    if (state2[c].toLowerCase() == store.state_name.toLowerCase()) {
                        boolState = true;
                        break;
                    } else {
                        boolAll = true;
                    }
                }
                for (var c = 0; c < district2.length - 1; c++) {
                    var checkNull = '';
                    if (district2[c].toLowerCase() == store.district_name.toLowerCase()) {
                        boolDistrict = true;
                        break;
                    } else {
                        boolAll = true;
                        boolStore = false;
                    }
                }
                if (boolState == true && boolDistrict == false && boolStore == false) {
                    html_store_item += '</div></div>';
                }
                if (boolState == false && boolDistrict == false && boolAll == true) {
                    html_store_item += '</div></div></div></div>';
                }
                if (boolState == false) {
                    html_store_item += '<div class="list_all_store_item" data-state="' + that.slug(store.state_name) + '"><h2 class="list_all_store_state section_heading line_after_heading line_after_heading_section">' + store.state_name + '</h2><div class="lists_all_store_district clearfix">';
                }
                if (boolDistrict == false) {
                    html_store_item += '<div class="list_all_store_district"><h3 class="list_all_store_district_name" data-district="' + store.district_name + '">' + store.district_name + '</h3><div class="list_all_store">';
                    boolStore == true;
                }
                if (store.images[0] != undefined) {
                    img1 = store.images[0].replace(/(^\w+:|^)/, '');
                } else {
                    img1 = '';
                }
                if (store.images[1] != undefined) {
                    img2 = store.images[1].replace(/(^\w+:|^)/, '');
                } else {
                    img2 = '';
                }
                if (store.images[2] != undefined) {
                    img3 = store.images[2].replace(/(^\w+:|^)/, '');
                } else {
                    img3 = '';
                }
                html_store_item += '<a onclick="TCH.openModal(this)" href="javascript:void(0)" data-name="' + store.external_name + '" data-fulladdress="' + store.address.full_address + '" data-image1="' + img1.replace(/(^\w+:|^)/, '') + '" data-image2="' + img2.replace(/(^\w+:|^)/, '') + '" data-image3="' + img3.replace(/(^\w+:|^)/, '') + '" data-latlng="' + store.latitude + ',' + store.longitude + '"><i class="fas fa-map-marker-alt"></i><span>' + store.external_name + '</span></a>';

                boolState = false;
                boolDistrict = false;
                boolAll = false;
                state = state + store.state_name + '-';
                if (store.district_name == null) {
                    district = district + 'null' + '-';
                } else {
                    district = district + store.district_name + '-';
                }
            });
            $('.list_all_store_wrap').html(html_store_item);

            $('.lists_all_store_district').masonry({
                itemSelector: '.list_all_store_district'
            });
        });
    },
    getStoreIndex: function () {
        $.get("https://api.thecoffeehouse.com/api/get_all_store", function (data) {
            //window.stores = data;
            var html = '';
            // Sort Data theo id
            var arrStore = data.sort(function (a, b) {
                return b.id - a.id;
            });
            $.each(arrStore, function (i, store) {
                html += '<div class="store_slider_item"><div class="store_slider_image" style="background-image: url(' + store.images[0].replace(/(^\w+:|^)/, '') + ');"></div>';
                html += '<div class="store_name">' + store.external_name + '</div></div>';
                if (i == 8) return false;
            });
            $('.store_slider_2').html(html);
            $('.store_slider_2').owlCarousel({
                nav: true,
                dots: false,
                margin: 30,
                loop: true,
                mouseDrag: false,
                items: 4,
                autoplayHoverPause: true,
                autoplay: true,
                navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
                autoplayTimeout: 7000,
                responsive: {
                    // breakpoint from 0 up
                    0: {
                        items: 2,
                    },
                    // breakpoint from 480 up
                    480: {
                        items: 2,
                    },
                    // breakpoint from 768 up
                    768: {
                        items: 3,
                    },
                    991: {
                        items: 4,
                    }
                }
            });
        });
    },
    getImageInstagram: function () {
        var feed = new Instafeed({
            get: 'user',
            limit: "8",
            userId: "4087605087",
            //clientId: 'c35f9d868c48411eb187774ec6daa06a',
            accessToken: "4087605087.ad0b1c2.d70f101130b9441c93717b2daef9c5b6",
            target: 'instafeed',
            resolution: 'standard_resolution',
            template: '<a class="instagram_item" href="{{link}}" target="_blank"><div class="instagram_image" style="background-image: url({{image}})"></div><div class="instagram_overlay"><span class="instagram_likecount"><svg class="svg-logo"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-heart"></use></svg>{{likes}} likes</span><p class="instagram_caption">{{caption}}</p></div></a>',
            before: function () {
                $('#instafeed').html('<div class="icon-loading"><div class="uil-ring-css"><div></div></div></div>');
            }, after: function () {
                $('.icon-loading').remove();
            }
        });
        feed.run();
    },
    searchByAddress: function (address) {
        function findClosestN(pt, numberOfResults) {
            var closest = [];
            gmarkers = markers.slice(0, 5);
            for (var i = 0; i < gmarkers.length; i++) {
                gmarkers[i].distance = google.maps.geometry.spherical.computeDistanceBetween(pt, gmarkers[i].getPosition());
                closest.push(gmarkers[i]);
            }
            return closest;
        }

        new google.maps.Geocoder().geocode({
            'address': address
        }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                closest = findClosestN(results[0].geometry.location, 5);
                console.log(closest);
                //closest = closest.splice(0, numberOfResults);
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    },
    parallax: function (e, target, layer) {
        var x = target.homePos.x + (e.pageX - target.homePos.x) / layer;
        var y = target.homePos.y + (e.pageY - target.homePos.y) / layer;
        $(target).css({top: y, left: x});
    },
    parallax2: function (e, target, layer) {
        var x = target.homePos.x + (e.pageX - target.homePos.x) / layer;
        var y = target.homePos.y + ((e.pageY - target.homePos.y) / layer) - 190;
        $(target).css({bottom: y, left: 0});
    },
    initMidAutumn: function () {
        var that = this;
        $('.fixed-scroll-down').on('click', function (e) {
            var height = $(window).scrollTop() + $(window).height();
            $('html, body').animate({
                scrollTop: height
            }, 1000);
        });
        /*var hop1 = document.getElementById('hop1');
            var hop2 = document.getElementById('hop2');
            var mooncakes = document.getElementById('mooncakes');
            var mooncakesBox = document.getElementById('mooncakes_box');
            var mooncakesTitle = document.getElementById('mooncakesTitle');

            hop1.homePos = { x: hop1.offsetLeft, y: hop1.offsetTop };
            hop2.homePos = { x: hop2.offsetLeft, y: hop2.offsetTop };
            mooncakes.homePos = { x: mooncakes.offsetLeft, y: mooncakes.offsetTop };
            mooncakesBox.homePos = { x: mooncakesBox.offsetLeft, y: mooncakesBox.offsetTop };
            mooncakesTitle.homePos = { x: mooncakesTitle.offsetLeft, y: mooncakesTitle.offsetTop };
            $('#mid--autumn__banner--top').mousemove(function (e) {

                that.parallax(e, hop1, 50);
                that.parallax(e, hop2, 100);
                that.parallax(e, mooncakes, 50);
                that.parallax2(e, mooncakesBox, 50);
                that.parallax(e, mooncakesTitle, 50);
            });
            $('.midAutumn-contact-form').on('submit',function(e){
                e.preventDefault();
                var that = $(this);
                var unindexed_array = that.serializeArray();
                var indexed_array = {};
                $.map(unindexed_array, function(n, i){
                    indexed_array[n['name']] = n['value'];
                });
                $.ajax({
                    type: 'POST',
                    url: that.attr('action'),
                    async : false,
                    data: indexed_array,
                    dataType: 'json',
                    complete: function() {
                        $('.md_succes').modal('show');
                        that.trigger('reset');
                    },
                    error: function(XMLHttpRequest, textStatus) {
                        console.log('err', textStatus );
                    }
                });
            });
*/
        /* Slider index */
        var owlSliderIndex = $('#owl_slide');
        owlSliderIndex.owlCarousel({
            nav: false,
            dotsSpeed: 400,
            dots: true,
            mouseDrag: false,
            loop: true,
            items: 1,
            autoplayHoverPause: true,
            autoplay: true,
            autoplayTimeout: 6000
        });
        owlSliderIndex.on('changed.owl.carousel translated.owl.carousel initialized.owl.carousel', function (event) {
            $("#owl_slide .owl-item .hrv-banner-caption").css('display', 'none');
            $("#owl_slide .owl-item .hrv-banner-caption").removeClass('hrv-caption')
            $("#owl_slide .owl-item.active .hrv-banner-caption").css('display', 'block');

            var heading = $('#owl_slide .owl-item.active .hrv-banner-caption').clone().removeClass();
            $('#owl_slide .owl-item.active .hrv-banner-caption').remove();
            $('#owl_slide .owl-item.active>.item').append(heading);
            $('#owl_slide .owl-item.active>.item>div').addClass('hrv-banner-caption hrv-caption');
        });
        var owlSliderDot = $('#owl_slide .owl-dot');
        owlSliderDot.each(function () {
            var indexTemp = parseInt($(this).index());
            var index = 0;
            if (index < 10) {
                index = "0" + (indexTemp + 1);
            } else {
                index = (indexTemp + 1);
            }
            $(this).html("<span class='dot-border'></span><span class='dot-number'>" + index + "</span>");
        });
        $('#owl_slide .owl-dots').wrap('<div class="container wrap-dots"></div>');

        var owlSliderMobile = $('#owlmobile_slide');
        owlSliderMobile.owlCarousel({
            items: 1,
            lazyLoad: true,
            loop: true,
            nav: false,
            dotsSpeed: 400,
            dots: true,
            autoplay: true,
            autoplayTimeout: 6000
        });
        owlSliderMobile.on('changed.owl.carousel translated.owl.carousel initialized.owl.carousel', function (event) {
            $("#owlmobile_slide .owl-item .hrv-banner-caption").css('display', 'none');
            $("#owlmobile_slide .owl-item .hrv-banner-caption").removeClass('hrv-caption')
            $("#owlmobile_slide .owl-item.active .hrv-banner-caption").css('display', 'block');

            var heading = $('#owlmobile_slide .owl-item.active .hrv-banner-caption').clone().removeClass();
            $('#owlmobile_slide .owl-item.active .hrv-banner-caption').remove();
            $('#owlmobile_slide .owl-item.active>.item').append(heading);
            $('#owlmobile_slide .owl-item.active>.item>div').addClass('hrv-banner-caption hrv-caption');
        });
        var owlSliderDotMobile = $('#owlmobile_slide .owl-dot');
        owlSliderDotMobile.each(function () {
            var indexTemp = parseInt($(this).index());
            var index = 0;
            if (index < 10) {
                index = "0" + (indexTemp + 1);
            } else {
                index = (indexTemp + 1);
            }
            $(this).html("<span class='dot-border'></span><span class='dot-number'>" + index + "</span>");
        });
        $('#owlmobile_slide .owl-dots').wrap('<div class="container wrap-dots"></div>');
    },
    scrollBoat: function (elem) {
        var scrollPositionToAnimate = $(elem).offset().top - $(window).height();
        var positionToAnimateTo = $(elem).data('position');
        var postionDefault = $(elem).offset().left;
        $(window).scroll(function () {
            if ($(window).scrollTop() > scrollPositionToAnimate) {
                if ($(elem).position().left < positionToAnimateTo) {
                    $(elem).css({'transform': 'translateX(' + positionToAnimateTo + ')'});
                }
            } else {
                if ($(elem).position().left < 0) {
                    $(elem).css({'transform': 'translateX(' + postionDefault + ')'});
                }
            }
        });
    },
    setHeight: function () {
        var heightPromo = 0;
        var heightBody = 0;
        $('.rewards_new_promotion_item').each(function () {
            if ($(this).find('.rewards_new_promotion_item_content p').height() > heightBody) {
                heightBody = $(this).find('.rewards_new_promotion_item_content p').height();
            }
            if ($(this).height() > heightPromo) {
                heightPromo = $(this).height();
            }
        })
        $('.rewards_new_promotion_item .rewards_new_promotion_item_content p').height(heightBody);
        $('.rewards_new_promotion_item').height(heightPromo);
    },
    initRewardNew: function () {
        var that = this;
        /* Slider */
        var owlSliderIndex = $('#owl_slide');
        owlSliderIndex.owlCarousel({
            nav: true,
            dotsSpeed: 400,
            dots: true,
            mouseDrag: false,
            loop: true,
            items: 1,
            autoplayHoverPause: true,
            navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
            autoplay: true,
            autoplayTimeout: 6000
        });
        owlSliderIndex.on('changed.owl.carousel translated.owl.carousel initialized.owl.carousel', function (event) {
            $("#owl_slide .owl-item .hrv-banner-caption").css('display', 'none');
            $("#owl_slide .owl-item .hrv-banner-caption").removeClass('hrv-caption')
            $("#owl_slide .owl-item.active .hrv-banner-caption").css('display', 'block');

            var heading = $('#owl_slide .owl-item.active .hrv-banner-caption').clone().removeClass();
            $('#owl_slide .owl-item.active .hrv-banner-caption').remove();
            $('#owl_slide .owl-item.active>.item').append(heading);
            $('#owl_slide .owl-item.active>.item>div').addClass('hrv-banner-caption hrv-caption');
        });
        /*var owlSliderDot = $('#owl_slide .owl-dot');
        owlSliderDot.each(function(){
            var indexTemp = parseInt($(this).index());
            var index = 0;
            if(index < 10){
                index = "0" + (indexTemp + 1);
            }else{
                index = (indexTemp + 1);
            }
            $(this).html("<span class='dot-border'></span><span class='dot-number'>"+index+"</span>");
        });
        $('#owl_slide .owl-dots').wrap('<div class="container wrap-dots"></div>');*/
        if ($('.rewards_new_promotion_slider .rewards_new_promotion_wrap').length > 3) {
            var owlReward = $('.rewards_new_promotion_slider');
            owlReward.owlCarousel({
                nav: false,
                dotsSpeed: 400,
                dots: true,
                loop: true,
                margin: 30,
                items: 3,
                autoplayHoverPause: true,
                autoplay: true,
                autoplayTimeout: 6000,
                responsive: {
                    // breakpoint from 0 up
                    0: {
                        items: 2,
                        mouseDrag: false
                    },
                    // breakpoint from 480 up
                    480: {
                        items: 2,
                        mouseDrag: false
                    },
                    // breakpoint from 768 up
                    768: {
                        items: 2,
                    },
                    991: {
                        items: 3,
                    }
                }
            });
        } else {
            $('.rewards_new_promotion_slider').css({
                'display': 'flex',
                'align-items': 'center',
                'justify-content': 'center'
            });
        }
        /*owlReward.on('changed.owl.carousel translated.owl.carousel initialized.owl.carousel', function(event) {
            that.setHeight();
        });*/
        /*$('.rewards_new_header_tab ul a').on('shown.bs.tab', function(){
            $('.rewards_new_tab_body_item').removeClass('animated ');
            $('.rewards_new_tab_body_item').removeAttr('style ');
            var wow = new WOW(
                {
                    boxClass:     'rewards_new_tab_body_item',      // default
                    animateClass: 'animated', // default
                    offset:       0,          // default
                    mobile:       true,       // default
                    live:         true        // default
                }
            )
            wow.init();
        });*/
    },
    scrollGallery: function () {
        var scrollHandle = 0,
            scrollStep = 5, oldScroll = 0,
            parent = $(".txng__2020--btns");

        //Start the scrolling process
        $(".panner").on("mouseenter", function () {
            var data = $(this).data('scrollModifier'),
                direction = parseInt(data, 10);

            $(this).addClass('active');
            startScrolling($(this), direction, scrollStep);

        });

        //Kill the scrolling
        $(".panner").on("mouseleave", function () {
            stopScrolling();
            $(this).removeClass('active');
        });

        parent.scroll(function () {
            $(".panner#panRight").css('right', ((parent.scrollLeft() * -1) + 15));
            $(".panner#panLeft").css('left', (parent.scrollLeft() + 15));
        });


        //Actual handling of the scrolling
        function startScrolling(ele, modifier, step) {
            if (scrollHandle === 0) {
                scrollHandle = setInterval(function () {
                    var newOffset = parent.scrollLeft() + (step * modifier);
                    parent.scrollLeft(newOffset);
                }, 10);
            }
        }

        function stopScrolling() {
            clearInterval(scrollHandle);
            scrollHandle = 0;
        }
    },
    parseQueryString: function () {
        var str = window.location.search;
        var objURL = {};
        str.replace(new RegExp("([^?=&]+)(=([^&]*))?", "g"), function ($0, $1, $2, $3) {
            objURL[$1] = $3;
        });
        objURL.count = function () {
            var count = 0;
            for (var prop in this) {
                if (this.hasOwnProperty(prop))
                    count = count + 1;
            }
            return count - 1;
        };
        return objURL;
    },
    scriptTXNG: function () {
        var that = this;
        jQuery(window).scroll(function () {
            if (jQuery(this).scrollTop() < $('.txng__2020--btns').offset().top) {
                jQuery('.txng__2020--list-btn').removeClass('fixed');
            }
            if (jQuery(this).scrollTop() > $('.txng__2020--btns').offset().top) {
                jQuery('.txng__2020--list-btn').addClass('fixed');
            }
        });
        $('.txng_2020--sanpham-lists').owlCarousel({
            nav: false,
            dots: false,
            margin: 30,
            loop: false,
            items: 3,
            autoplayHoverPause: true,
            autoplay: true,
            navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
            autoplayTimeout: 3000,
            responsive: {
                // breakpoint from 0 up
                0: {
                    items: 2,
                },
                // breakpoint from 480 up
                480: {
                    items: 2,
                },
                // breakpoint from 768 up
                768: {
                    items: 3,
                },
                991: {
                    items: 3,
                }
            }
        });
        $('.txng__2020--btn-item').click(function () {
            var tabindex = $(this).data('tab');
            $('.txng__2020--btn-item').removeClass('active');
            $(this).addClass('active');
            $('.txng__2020--content').hide();
            $('#btn-' + tabindex).show();
            $('html, body').animate({
                scrollTop: ($('.txng__2020--btns').offset().top - 80)
            }, 600);
            var datatitle = $(this).data('title');
            var href = window.location.href;
            if (href.indexOf("?mon") != -1) {
                var splitHref = href.split("?mon=")[0];
                var append = splitHref + "?mon=" + datatitle;
                history.pushState({}, null, append);
            } else {
                var append = href + "?mon=" + datatitle;
                history.pushState({}, null, append);
            }
            $('.txng_2020--sanpham-lists').trigger('destroy.owl.carousel')
            $('.txng_2020--sanpham-lists.btn-' + tabindex).owlCarousel({
                nav: false,
                dots: false,
                margin: 30,
                loop: false,
                items: 3,
                autoplayHoverPause: true,
                autoplay: true,
                navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
                autoplayTimeout: 3000,
                responsive: {
                    // breakpoint from 0 up
                    0: {
                        items: 2,
                    },
                    // breakpoint from 480 up
                    480: {
                        items: 2,
                    },
                    // breakpoint from 768 up
                    768: {
                        items: 3,
                    },
                    991: {
                        items: 3,
                    }
                }
            });
        });
        setTimeout(function () {
            var href = window.location.href
            var hrefNew = that.parseQueryString();
            if (hrefNew.hasOwnProperty("mon")) {
                var splitHref = hrefNew.mon;
                if (splitHref.indexOf("?mon=") != -1) {
                    var newHr = splitHref.split("?mon=")[1];
                    $('.txng__2020--btn-item[data-title="' + newHr + '"]').click();
                } else {
                    $('.txng__2020--btn-item[data-title="' + splitHref + '"]').click();
                }
            }
        }, 600);
    },
    initMidAutumn2020: function () {
        var that = this;
        $('.fixed-scroll-down').on('click', function (e) {
            var height = $(window).scrollTop() + $(window).height();
            $('html, body').animate({
                scrollTop: height
            }, 1000);
        });
        /* Slider index */
        var owlSliderIndex = $('#owl_slide--autumn');
        owlSliderIndex.owlCarousel({
            nav: true,
            dotsSpeed: 400,
            dots: true,
            loop: true,
            mouseDrag: false,
            items: 1,
            navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
            autoplayHoverPause: true,
            autoplay: true,
            autoplayTimeout: 6000
        });
        $('#owl_slide--autumn--product1').owlCarousel({
            nav: true,
            dotsSpeed: 400,
            dots: true,
            loop: true,
            mouseDrag: false,
            items: 1,
            navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
            autoplayHoverPause: true,
            autoplay: true,
            autoplayTimeout: 6000
        });
        $('#owl_slide--autumn--product2').owlCarousel({
            nav: true,
            dotsSpeed: 400,
            mouseDrag: false,
            dots: true,
            loop: true,
            items: 1,
            navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
            autoplayHoverPause: true,
            autoplay: true,
            autoplayTimeout: 6000
        });
        $('#owl_slide--autumn--product3').owlCarousel({
            nav: true,
            dotsSpeed: 400,
            mouseDrag: false,
            dots: true,
            loop: true,
            items: 1,
            navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
            autoplayHoverPause: true,
            autoplay: true,
            autoplayTimeout: 6000
        });

        $('.scroll-down').click(function (e) {
            e.preventDefault();
            console.log($(this).attr('href'));
            var idEle = $($(this).attr('href')).offset().top - 60;
            $('html, body').animate({
                scrollTop: idEle
            }, 1000);
        });
        $('.btn_scroll').click(function (e) {
            e.preventDefault();
            console.log($(this).attr('href'));
            var idEle = $($(this).attr('href')).offset().top - 120;
            $('html, body').animate({
                scrollTop: idEle
            }, 1000);
        });
        setTimeout(function () {
            if (window.location.hash) {
                var newHr = $(window.location.hash).offset().top - 60
                $('html, body').animate({
                    scrollTop: newHr
                }, 1000);
            } else {
                $('.txng__2020--btn-item[data-title="' + splitHref + '"]').click();
            }

        }, 600);
    },
    productScript: function () {
        return;
        setTimeout(function () {
            var $owl = $('.owl-product-detail');
            $owl.on('initialized.owl.carousel', function (property) {
                //debugger;
                var $nextSlide = $(property.target).find(".owl-item").eq(property.item.index + 1);
                if ($nextSlide.find('img').length) {// img
                    $('.utube_video .aspect-ratio').append('<img src="' + $nextSlide.find("img").attr('src') + '"/>')
                } else {// video
                    $('.utube_video .aspect-ratio').append('<video  autoplay="autoplay" muted="muted" loop="loop"> <source src="' + $nextSlide.find("video source").attr('src') + '" type="video/mp4"> </video>')
                }
            });
            $owl.length && $owl.owlCarousel({
                nav: true,
                dots: true,
                loop: true,
                items: 1,
                mouseDrag: true,
                autoplayHoverPause: true,
                autoplay: true,
                navText: ['<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M10.828 11.9997L15.778 16.9497L14.364 18.3637L8 11.9997L14.364 5.63574L15.778 7.04974L10.828 11.9997Z" fill="black" fill-opacity="0.6"/> </svg>', '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M13.1722 11.9997L8.22217 7.04974L9.63617 5.63574L16.0002 11.9997L9.63617 18.3637L8.22217 16.9497L13.1722 11.9997Z" fill="black" fill-opacity="0.6"/> </svg>'],
                autoplayTimeout: 7000
            }).on('changed.owl.carousel', function (property) {
                var $nextSlide = $(property.target).find(".owl-item").eq(property.item.index + 1);

                if ($nextSlide.find('img').length) {// img
                    if ($('.utube_video .aspect-ratio img[src="' + $nextSlide.find("img").attr('src') + '"]').length) {
                        $('.utube_video .aspect-ratio img[src="' + $nextSlide.find("img").attr('src') + '"]').show().siblings().hide();
                    } else {
                        $('.utube_video .aspect-ratio')
                            .append('<img src="' + $nextSlide.find("img").attr('src') + '"/>')
                    }
                } else {// video

                    if ($('.utube_video .aspect-ratio video source[src="' + $nextSlide.find("video source").attr('src') + '"]').length) {
                        $('.utube_video .aspect-ratio video source[src="' + $nextSlide.find("video source").attr('src') + '"]').parent().show().siblings().hide();
                    } else {
                        $('.utube_video .aspect-ratio')
                            .append('<video  autoplay="autoplay" muted="muted" loop="loop"> <source src="' + $nextSlide.find("video source").attr('src') + '" type="video/mp4"> </video>')
                    }
                }

            });
            $('.utube_video .aspect-ratio').on('click', function () {
                $owl.trigger('next.owl.carousel');
            })
        }, 10);
        $('.product-info .product_tabs_header > a').on('click', function (e) {
            e.preventDefault();
            $(this).addClass('active').siblings().removeClass('active');
            $('.product_tabs').find($(this).attr('data-target')).fadeIn().siblings().hide();
        }).eq(0).trigger('click');
    },
    storeScript: function () {
        $(window).width() < 768 && $('.owl-store').owlCarousel({
            nav: true,
            dots: true,
            loop: true,
            items: 1,
            mouseDrag: true,
            autoplayHoverPause: true,
            autoplay: true,
            navText: ['<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M10.828 11.9997L15.778 16.9497L14.364 18.3637L8 11.9997L14.364 5.63574L15.778 7.04974L10.828 11.9997Z" fill="black" fill-opacity="0.6"/> </svg>', '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M13.1722 11.9997L8.22217 7.04974L9.63617 5.63574L16.0002 11.9997L9.63617 18.3637L8.22217 16.9497L13.1722 11.9997Z" fill="black" fill-opacity="0.6"/> </svg>'],
            autoplayTimeout: 7000
        });

    },

}

// lazy background

$(document).ready(function () {

    TCH.init();
    //new WOW().init();
});
