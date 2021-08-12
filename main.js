function getElem(selector)
{
	return document.querySelector(selector);
}
function getElems(selector)
{
	return document.querySelectorAll(selector);
}
function toggle(elemTarget )
{
	var elem= (elemTarget);
	var elemStyle=getComputedStyle(elem);

	// console.log(elemStyle.display);
	if(elemStyle.display!='none')
	{
		addCss(elem, {'top': '0%'});
		setTimeout(function(e){
			addCss(elem,{'display': 'block', 'top': '-30%'});
		}, 400);
		setTimeout(function(e){
			addCss(elem,{'top': '-40%'});
		},800);
		setTimeout(function(e){
			addCss(elem,{'top': '100%'});
			close(elem);
		},1000);
		// close(elem);
	}else {
		show(elem);
		addCss(elem, {'top': '-40%', 'overflow-y': 'scroll'});
		setTimeout(function(e){
			addCss(elem,{'display': 'block', 'top': '-25%'});
		}, 400);
		setTimeout(function(e){
			addCss(elem,{'top': '-15%'});
		},600);
		setTimeout(function(e){
			addCss(elem,{'top': '-5%'});
		},800);
		setTimeout(function(e){
			addCss(elem,{'top': '0%'});
		},1000);
	}

}
function showMenus()
{
	var menuBt=document.querySelectorAll('.menuBt');  
	var menus=document.querySelectorAll('.menuHide'); 

}
function showMobileMenu()
{
	var bt=getElem('#mobileMenuBt');
	var leftBar=getElem('#mobileMenuLeftBar'); 
	var hideMenu=document.createElement('div');

	hideMenu.textContent='x';

	// addCss(leftBar, {posit})
	addCss(hideMenu, {
			'position':'absolute', 
			'top': '5px', 
			'right':'32px', 
			'font-weight': 'bold',
			 'border': '2px solid #4ad', 
			 'border-radius': '100%',
			  'padding': '5px',
			 'width': '32px',
			 'height': '32px',
			 'text-align': 'center',
			 'cursor': 'pointer'
			});

	addChild(leftBar,hideMenu);

	addClick(hideMenu,function(){
			toggle(leftBar);
			//destroy(hideMenu);
	});
	addClick(bt, function(){
		toggle(leftBar);
	});
 
}
function acceptCookies()
{
	var bt=document.querySelector('.acceptCookies');
	var cookiesBar=document.querySelector('.cookiesBar');

	addClick(bt,function(){
		var php=new PhpChat();

		php.getPage(bt.href, function(e){
			console.log(e);
		});

		close(cookiesBar); 
	});
	 
}

function showNewsLetter()
{
	var newsLetter=document.querySelector('.stickyNewsLetter');
	var hideNL=document.createElement('div');

	newsLetter.appendChild(hideNL);

	hideNL.style.position='absolute';
	hideNL.style.top='5px';
	hideNL.style.right='5px';
	hideNL.textContent='x';
	hideNL.style.color='#fff';

	newsLetter.style.display='block';
	


	hideNL.addEventListener('click',function(e){
		newsLetter.style.display='none';
	});
}
function showPromoModal()
{
	document.addEventListener( 'DOMContentLoaded', function () {
		// new Splide( '#image-slider' ).mount();
		new Splide('#image-slider',{
			'type': 'loop',
			'cover' : true,
			'heightRatio':0.5,
			'autoplay': true,
		}).mount();
	} ); 
	setTimeout(function(){

	MicroModal.show('modal-1');
	}, 2500);
}
function addChild(parent,elem)
{
	parent.appendChild(elem);
}
function addClick(elem,fallback)
{
	var codeFallback=fallback;
	elem.addEventListener('click',function(e){
		e.preventDefault();
		codeFallback();
	});
}
function close(elem)
{
	elem.style.display='none';
}
function show(elem)
{
	elem.style.display='block';
}
function addCss(elem, css)
{
	for(var i in css)
	{
		elem.style[i]=css[i];
	}
}
function destroy(elem)
{
	elem.parentNode.removeChild(elem);
}
function toggleBt(buttonsSelector, menusSelector)
{
	var buttons=getElems(buttonsSelector);
	var menus=getElems(menusSelector);

	var menuEvt=function(bt,menu)
	{
		var hideMenu=document.createElement('div');

		hideMenu.textContent='x';

		addCss(hideMenu, {
			'position':'fixed', 
			'top': '5px', 
			'right':'32px', 
			'font-weight': 'bold',
			 'border': '2px solid #4ad', 
			 'border-radius': '100%',
			  'padding': '5px',
			 'width': '32px',
			 'height': '32px',
			 'text-align': 'center',
			 'cursor': 'pointer'
			});

		addChild(menu,hideMenu);

		addClick(hideMenu,function(){
			toggle(menu);
			//destroy(hideMenu);
		});

		addClick(bt,function(){
			toggle(menu); 

		});
	};
	for(var i=0,c=menus.length;i<c;i++)
	{
		menuEvt(buttons[i], menus[i]);
	}
}
function mainfallback()
{
	try{
		toggleBt('.toggleBt', '.toggleMenu');
	}catch(e)
	{

	}
	try{showMobileMenu();}catch(e){

	}
	try{
		acceptCookies();
	}catch(e){
	}
	try{
		showNewsLetter();
 	}catch(e){

 	}
 	try{
 		showPromoModal();
 	}catch(e)
 	{

 	}
}
(function(){
	mainfallback();
})();