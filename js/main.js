window.addEventListener('DOMContentLoaded', function() {
	'user scrict';
	//Tab
	let tab = document.querySelectorAll('.info-header-tab'),
			info = document.querySelector('.info-header'),
			tabContent = document.querySelectorAll('.info-tabcontent');

	// console.log(info);
	// console.log(tab);
	// console.log(tabContent);

	
	function hideTabContent(a) {
		for (let i = a; i < tabContent.length; i++) {
			tabContent[i].classList.remove('show');
			tabContent[i].classList.add('hide');
		}
	}
	hideTabContent(1);

	function showTabContent(b) {
		if (tabContent[b].classList.contains('hide')) {
				tabContent[b].classList.remove('hide');
				tabContent[b].classList.add('show');
		}
	}

	info.addEventListener('click', function(event) {
		let target = event.target;
		if (target && target.classList.contains('info-header-tab')) {
				for(let i = 0; i < tab.length; i++) {
						if (target == tab[i]) {
								hideTabContent(0);
								showTabContent(i);
								break;
						}
				}
		}
		
	});



	//Timer

	let deadline = '2020-04-08';

	function getTimeRemaining(endtime) {
		let t = Date.parse(endtime) - Date.parse(new Date()),
				seconds = Math.floor((t/1000) % 60),
				minutes = Math.floor((t/1000/60) % 60),
				hours =Math.floor(t/(1000*60*60));
		// edded day
		// hours =Math.floor((t/1000*60*60) % 24),
		// day =Math.floor((t/(1000*60*60*24)));

		return {
			'total' : t,
			'hours' : hours,
			'minutes' : minutes,
			'seconds' : seconds
		};
	}
	function setClock(id, endtime) {
		let timer = document.getElementById(id),
				hours = timer.querySelector('.hours'),
				minutes = timer.querySelector('.minutes'),
				seconds = timer.querySelector('.seconds'),
				timeInterval = setInterval(updateClock, 1000);

		function updateClock() {
			let t = getTimeRemaining(endtime);

			function addZero(num) {
				if (num < 9) {
					return '0' + num;
				}else return num;
			}
			hours.textContent = addZero(t.hours);
			minutes.textContent = addZero(t.minutes);
			seconds.textContent = addZero(t.seconds);

			if (t.total <=0) {
				clearInterval(timeInterval);
				hours.textContent = '00';
				minutes.textContent = '00';
				seconds.textContent = '00';

			}
		}
	}

	setClock('timer', deadline);



	//Modal

	let more = document.querySelector('.more'),
			overlay = document.querySelector('.overlay'),
			close = document.querySelector('.popup-close');
			
	more.addEventListener('click', function() {
		overlay.style.display = 'block';
		this.classList.add('more-splash');
		document.body.style.overflow = 'hidden';
	});

	close.addEventListener('click', function() {
		overlay.style.display = 'none';
		more.classList.remove('more-splash');
		document.body.style.overflow = '';

	}); 
	//slider

	let slideIdex = 1,
			slides = document.querySelectorAll('.slider-item'),
			prev = document.querySelector('.prev'),
			next = document.querySelector('.next'),
			dotsWrap = document.querySelector('.slider-dots'),
			dots = document.querySelectorAll('.dot');
	showSlides(slideIdex);
	function showSlides(n) {
		if(n > slides.length) {
			slideIdex = 1;
		} 
		if (n < 1) {
			slideIdex = slides.length;
		}
		slides.forEach((item) => item.style.display = 'none');
		// for (let i = 0; i < slides.length; i++) {
		// 	slides[i].style.display = 'none';
		// }
		dots.forEach((item) => item.classList.remove('dot-active'));
		slides[slideIdex - 1].style.display = 'block';
		dots[slideIdex -1].classList.add('dot-active');

	}
	function plusSlides(n) {
		showSlides(slideIdex += n);
	}
	function currentSlide(n) {
		showSlides(slideIdex = n);
	}

	prev.addEventListener('click', function() {
		plusSlides(-1);
	});
	next.addEventListener('click', function() {
		plusSlides(1);
	});

	dotsWrap.addEventListener('click', function(event) {
		for (let i = 0; i < dots.length + 1; i++) {
			if(event.target.classList.contains('dot') && event.target == dots[i-1]) {
				currentSlide(i);
			}
		}
	});
	//calc
	let persons = document.querySelectorAll('.counter-block-input')[0],
			restDays = document.querySelectorAll('.counter-block-input')[1],
			place = document.getElementById('select'),
			totalValue = document.getElementById('total'),
			personsSum = 0,
			daysSum =  0,
			total = 0;

	totalValue.innerHTML = 0;

	persons.addEventListener('change', function() {
		personsSum = +this.value;
		total = (daysSum + personsSum)*4000;
		if(restDays.value == '' || persons.value == '') {
			totalValue.innerHTML = 0;
		}else {
			totalValue.innerHTML = total;
		}
	});

	restDays.addEventListener('change', function() {
		daysSum = +this.value;
		total = (daysSum + personsSum)*4000;
		if(persons.value == '' || restDays.value == '') {
			totalValue.innerHTML = 0;
		}else {
			totalValue.innerHTML = total;
		}
	});

	place.addEventListener('change', function() {

		if(restDays.value == '' || persons.value == '') {
			totalValue.innerHTML = 0;
		}else {
			let a = total;

			totalValue.innerHTML = a * this.options[this.selectedIndex].value;
		}
	});


});

