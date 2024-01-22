$(document).ready(function(){
    
    
    let images = [
        {
            bg:'Images/puppy.mp4',
            desc:'The sand is the most gentle hue of gold, almost earthen and muted, the humble star of the scene.',
            title:'Say beach!',
            hs_img:'Images/beach-img.avif',
            sound:'Images/small-waves.mp3'
        },
        {
            bg:'Images/rainy_day.mp4',
            desc:"Rainy streets may bring about a sense of nostalgia, tranquility, or even melancholy, depending on the individual's perspective",
            title:'Reflective.',
            hs_img:'Images/street-img.avif',
            sound:'Images/rain-city.mp3'
        },
        {
            bg:'Images/mountains_fog.mp4',
            desc:'The woods in the morning embrace a serene hush, where sunlight filters through the canopy and the air is filled with the awakening whispers of nature.',
            title:'Enchanting.',
            hs_img:'Images/morning-img.jpg',
            sound:'Images/wildlife.mp3'
        },
        {
            bg:'Images/waterfall.mp4',
            desc:"Waterfalls in the forest cascade down moss-covered rocks, creating a serene symphony of nature's beauty and tranquility.",
            title:'Cascading.',
            hs_img:'Images/forest-img.avif',
            sound:'Images/waterfall.mp3'
        }
    ]

    var sliderInterval;
    var sliderTimeout;
    var animateTimeout;

    changeSlide($('.side-bar li:first-child'))
    function initSlider(){
        return setInterval(changeSlide,8000);
    }
    function changeSlide(next) {
        clearTimeout(animateTimeout);
    
        const sliderElements = $('.ls, .animate-bg-col div, .animate-bg-col-sm div');
        sliderElements.toggleClass('left-slider right-slider');
    
        animateTimeout = setTimeout(() => {
            $('#title,.desc').toggleClass('animate-slide-up animate-slide-down');
            const currentIndex = $('.side-bar li').index(next || $('.side-bar li.active-pointer'));
            const newIndex = (next ? currentIndex : currentIndex + 1) % $('.side-bar li').length;
    
            $('.side-bar li.pointer').removeClass('active-pointer');
            $(`.side-bar li:eq(${newIndex})`).addClass('active-pointer');
    
            loadDetails(newIndex);
    
            if (next) {
                $('.grow').removeClass('animate-grow')
                sliderTimeout = setTimeout(() => {
                    $('.grow').addClass('animate-grow').dequeue();
                    sliderInterval = initSlider();
                },5000)
            }
        }, 250);
    }
    
    $('.side-bar li.pointer').on('click',function(){
        clearInterval(sliderInterval)
        clearTimeout(sliderTimeout)
        changeSlide($(this))
    })

    function loadDetails(index){
        $('#main-img source').attr('src',images[index].bg)
        $('#main-img')[0].load()
        $('#title').text(images[index].title)
        $('#hs-img').attr('src',images[index].hs_img)
        $('.desc p').text(images[index].desc)
        $('#audio').attr('src',images[index].sound)
        $('#audio')[0].play()
    }
    
    $('*[data-toggle-panel]').click(function(){
        $($(this).data('panel-id')).css('display','block')
    })
    $('.panel-bg').click((e) => $(e.target).css('display', 'none'));

    $('.panel-bg *').on('click',(e) => e.stopPropagation())

    $('i.audio').click(function(){
        let mute = $(this).hasClass('fa-volume-high');
        $(this).next('audio')[0].muted = mute;
        $(this).toggleClass('fa-volume-high fa-volume-xmark')
    })
    $('.side-bar').on('mousewheel DOMMouseScroll',function(e){
        var eo = e.originalEvent;
        var xy = eo.wheelDelta || -eo.detail;
        var isScrollUp = xy /120 > 0;
        clearInterval(sliderInterval)
        clearTimeout(sliderTimeout)
        const currentIndex = $('.side-bar li').index($('.side-bar li.active-pointer'));
        const newIndex = (currentIndex + (isScrollUp ? -1 : 1)) % $('.side-bar li').length;
        changeSlide($(`.side-bar li:eq(${newIndex})`))
    })
})