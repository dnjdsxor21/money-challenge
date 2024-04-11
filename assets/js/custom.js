$(document).ready(function(){
	"use strict";
    
        /*==================================
* Author        : "ThemeSine"
* Template Name : Khanas HTML Template
* Version       : 1.0
==================================== */



/*=========== TABLE OF CONTENTS ===========
1. Scroll To Top 
2. Smooth Scroll spy
3. Progress-bar
4. owl carousel
5. welcome animation support
======================================*/

    // 1. Scroll To Top 
		$(window).on('scroll',function () {
			if ($(this).scrollTop() > 600) {
				$('.return-to-top').fadeIn();
			} else {
				$('.return-to-top').fadeOut();
			}
		});
		$('.return-to-top').on('click',function(){
				$('html, body').animate({
				scrollTop: 0
			}, 1500);
			return false;
		});
	
	
	
	// 2. Smooth Scroll spy
		
		// $('.header-area').sticky({
        //    topSpacing:0
        // });
		
		// //=============

		// $('li.smooth-menu a').bind("click", function(event) {
		// 	event.preventDefault();
		// 	var anchor = $(this);
		// 	$('html, body').stop().animate({
		// 		scrollTop: $(anchor.attr('href')).offset().top - 0
		// 	}, 1200,'easeInOutExpo');
		// });
		
		// $('body').scrollspy({
		// 	target:'.navbar-collapse',
		// 	offset:0
		// });

	// 3. Progress-bar
	
		var dataToggleTooTip = $('[data-toggle="tooltip"]');
		var progressBar = $(".progress-bar");
		if (progressBar.length) {
			progressBar.appear(function () {
				dataToggleTooTip.tooltip({
					trigger: 'manual'
				}).tooltip('show');
				progressBar.each(function () {
					var each_bar_width = $(this).attr('aria-valuenow');
					$(this).width(each_bar_width + '%');
				});
			});
		}
	
	// 4. owl carousel
	
		// i. client (carousel)
		
			$('#client').owlCarousel({
				items:7,
				loop:true,
				smartSpeed: 1000,
				autoplay:true,
				dots:false,
				autoplayHoverPause:true,
				responsive:{
						0:{
							items:2
						},
						415:{
							items:2
						},
						600:{
							items:4

						},
						1199:{
							items:4
						},
						1200:{
							items:7
						}
					}
				});
				
				
				$('.play').on('click',function(){
					owl.trigger('play.owl.autoplay',[1000])
				})
				$('.stop').on('click',function(){
					owl.trigger('stop.owl.autoplay')
				})


    // 5. welcome animation support

        $(window).load(function(){
        	$(".header-text h2,.header-text p").removeClass("animated fadeInUp").css({'opacity':'0'});
            $(".header-text a").removeClass("animated fadeInDown").css({'opacity':'0'});
        });

        $(window).load(function(){
        	$(".header-text h2,.header-text p").addClass("animated fadeInUp").css({'opacity':'0'});
            $(".header-text a").addClass("animated fadeInDown").css({'opacity':'0'});
        });

});	

//================================================================
function refreshPage() {
	const txt1 = document.querySelector("#welcome-hero .header-text h2");
	const txt2 = document.querySelector("#welcome-hero .header-text p");
	const txt3 = document.querySelector("#about .single-about-txt h3");
	const txt4 = document.querySelector("#about .single-about-txt p");
	const txt5 = document.querySelector("#content-view .content-txt p");
	const txt6 = document.querySelectorAll("#content .content-container div h3")[0];
	const txt7 = document.querySelectorAll("#content .content-container div p")[0];
	const txt8 = document.querySelectorAll("#content .content-container div h3")[1];
	const txt9 = document.querySelectorAll("#content .content-container div p")[1];
	let elements = [txt1, txt2, txt3, txt4, txt5, txt6, txt7, txt8, txt9];
	for (let i = 0; i < elements.length; i++) {
	if (elements[i] && elements[i].innerText.trim() !== "") {
		elements[i].innerHTML = elements[i].innerText;
		}
	}

	document.querySelectorAll("#content .content-container .content-box").forEach(function(box) {
		if(box.firstElementChild.tagName!="IMG"){

			box.addEventListener('click', function() {
				var content = this.lastElementChild;
				console.log(content);
				  if (content.style.display === 'none') {
					  content.style.display = 'block';
					} else {
					  content.style.display = 'none';
					}
			  });
		}
		
	  });
	  

	

    var menuItems = document.querySelectorAll('.smooth-menu');
    menuItems.forEach(function(item) {
        item.addEventListener('click', function() {
            var link = item.querySelector('a').getAttribute('href');
            window.location.href = link;
        });
    });

	var email = document.querySelector('#apply-email');
	var option = document.querySelector('#apply-value');
	var submitBtn = document.querySelector('#apply-button');
	var pageTitle = document.querySelector("#content-view .content-txt h1").innerText;

	if (pageTitle.includes('스마트')){
		option.value = option[1].value;
	} else if (pageTitle.includes('블로그')){
		option.value = option[2].value;
	}

	submitBtn.addEventListener('click', function(e) { 
		e.preventDefault();
		
		// 이메일 형식을 검증하는 정규 표현식
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		
		// 이메일 형식이 유효한지 검증합니다.
		if (emailRegex.test(email.value)) {
			// 이메일 형식이 유효하면, 서버로 POST 요청을 보냅니다.
			fetch(`/apply/?email=${email.value}&option=${option.value}`, {method:'POST'})
			.then(response => {
				if(response.ok) {
					// 요청이 성공적으로 처리되면, 사용자에게 알림을 띄웁니다.
					alert(`100명 모집시 챌린지를 시작합니다!\n\n이메일: ${email.value}\n챌린지: ${option.value}`);
					// 입력 필드를 초기화합니다.
					email.value = "";
					//option.value = "";
				} else {
					// 서버에서 문제가 발생한 경우, 오류 메시지를 보여줍니다.
					alert("예약 처리 중 문제가 발생했습니다. 다시 시도해주세요.");
				}
			})
			.catch(error => {
				// 네트워크 오류 등의 문제가 발생한 경우, 오류 메시지를 보여줍니다.
				console.error("예약 요청 실패:", error);
				alert("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
			});
		} else {
			// 이메일 형식이 유효하지 않으면, 사용자에게 경고합니다.
			alert("유효하지 않은 이메일 주소입니다. 올바른 이메일 주소를 입력해주세요.");
		}
	});

	var items = document.querySelectorAll('.item-box');
    items.forEach(function(item, index) {
        item.addEventListener('click', function() {
            var link = 'challenge/' + (index + 1);
            window.location.href = link;
        });
    });


};
document.addEventListener('DOMContentLoaded', function() {
	refreshPage();
});
