
var winW, winH; var docW, docH; var pgW;
var fsCarData = {};
fsCarData.mainContainer = '#fsCContainer';
fsCarData.allImgs = new Array();
$.fn.fsCarousel = function()
{
	var fsC = this;

	 $(fsC).children('img').each(function(i){
	 	$(fsCarData.allImgs[i]).addClass('fsImg'); 
	 });
	///////////////// Throttle resize so its not firing constantly
	$(window).resize(function(){$.fn.throttleResize();});

	////////////////////////////////////////////// RESIZE SITE TO FIT ANY SHAPE SCREEN
	$.fn.resizeFXNS = function()
	{ 
	getUserDims();

		$.fn.fsImgResize = function()
		{	
			var imgRatio;
			var newH = winH;
			var newW = pgW;
				if($(this).height() == 0)
				{
					$(this).height(newH);
				}
			else if((newH*2)<newW)
			  {	
			  	 $(this).css({'left': '0px'});		
				  var oldH = $(this).height();
				 imgRatio = oldH/$(this).width();
				 newH = newW*imgRatio; 			  
			  }
			else{
				   var oldW = $(this).width();
				   imgRatio = oldW/$(this).height();
				   newW = newH*imgRatio;
				  	var adjL = -0.5* Math.abs(pgW-newW) 
				   $(this).css({'left': adjL+'px'});
				}

			$(this).css({'width': newW+'px','height':newH+'px'});		
		}

		$('.fsImg').fsImgResize();	
}


var rBusy = false; var resizeThrottletimer;
	$.fn.throttleResize = function()
		{
		   if(rBusy){return;}
			else
			{
				clearTimeout(resizeThrottletimer);
				resizeThrottletimer = undefined;
				rBusy = true;
				resizeThrottletimer = setTimeout(execResize,500);
			}
			
			function execResize()
			{	
				firingNum2++;
				rBusy = false;
				$.fn.resizeFXNS();
				clearTimeout(resizeThrottletimer);
				resizeThrottletimer = undefined;
			}	
		} 


		$.fn.noCSS3Support = function()
		{	
			var myChildDivs = new Array();
			$(this).children('div').each(function(i){myChildDivs[i]=this; $(this).css('display','none');});

			var cDiv = 0;
			var dTotal = myChildDivs.length;
			$(myChildDivs[cDiv]).fadeIn(1000);
			setInterval(function(){		
				  var nDiv = cDiv + 1;
				  if(nDiv == dTotal)
					{
						nDiv = 0;
					}
			  $(myChildDivs[nDiv]).fadeIn(3000);
			  $(myChildDivs[cDiv]).fadeOut(3000, function(){
			  cDiv = nDiv});}, 6000);
		}

		if(!Modernizr.cssanimations) //// use modernizer for the fallback
		{
			$(fsC).noCSS3Support();
		}

	///// begin!
	$.fn.resizeFXNS();
	$(fsC).fadeTo(600,1);

}

