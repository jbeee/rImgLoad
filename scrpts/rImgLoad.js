///check if key design and transition features are supported by  the users browsers
if (!Modernizr.csstransitions){ CSS3T=false; };

////// any object from json or server data
var imgData = 
{
    "loadImg":
    {
    	"src":"http://www.jbee.io/demos/rImgLoad/graphics/jBeeLG1.png",
    	"size":"10700000"
    },
    "images":[   ///// T = Thumbnail, M = Mobile, S= Standard, R = Retina			
					{
						"type":"fsCarData1",
						"T": "http://www.jbee.io/demos/rImgLoad/graphics/bg1_TH.jpg",   
		  			 	"M": "http://www.jbee.io/demos/rImgLoad/graphics/bg1_M.jpg",	
						"S": "http://www.jbee.io/demos/rImgLoad/graphics/bg1_HD.jpg",	
		    			"R": "http://www.jbee.io/demos/rImgLoad/graphics/bg1_R.jpg"		
		    		},	
					{			
						"type":"fsCarData1",
						"T": "http://www.jbee.io/demos/rImgLoad/graphics/bg2_TH.jpg",
		  			 	"M": "http://www.jbee.io/demos/rImgLoad/graphics/bg2_M.jpg",
						"S": "http://www.jbee.io/demos/rImgLoad/graphics/bg2_HD.jpg",
		    			"R": "http://www.jbee.io/demos/rImgLoad/graphics/bg2_R.jpg"
		    		},				    
					{			
						"type":"fsCarData1",
						"T": "http://www.jbee.io/demos/rImgLoad/graphics/bg3_TH.jpg",
		  			 	"M": "http://www.jbee.io/demos/rImgLoad/graphics/bg3_M.jpg",
						"S": "http://www.jbee.io/demos/rImgLoad/graphics/bg3_HD.jpg",
		    			"R": "http://www.jbee.io/demos/rImgLoad/graphics/bg3_R.jpg"
		    		},				    
					{			
						"type":"fsCarData1",
						"T": "http://www.jbee.io/demos/rImgLoad/graphics/bg4_TH.jpg",
		  			 	"M": "http://www.jbee.io/demos/rImgLoad/graphics/bg4_M.jpg",
						"S": "http://www.jbee.io/demos/rImgLoad/graphics/bg4_HD.jpg",
		    			"R": "http://www.jbee.io/demos/rImgLoad/graphics/bg4_R.jpg"
		    		}				    			
			  ]
		     
 }

var winW; var winH; var docW; var docH; var pgW;
$.fn.rImgLoad = function(options)
{ 
	var rIL = this;
	rIL.results = '';
	rIL.opt = $.extend({minDownloadSpeed: 2, numImgsIfSlow: 2}, options);
	rIL.busy=false;
	rIL.tLoaded=0;
	rIL.tTotal=0;
	rIL.done=false;
	rIL.speedLD = false;			//// default to standard sizes
	rIL.screenLD = 'S';

	rIL.loadImgC = document.createElement('div'); ////loadImage Container Div
	$(rIL.loadImgC).addClass('loadImageContainer');
    $(rIL).append(rIL.loadImgC);

	rIL.loader = document.createElement('div'); ////progress-bar Container Div
	$(rIL.loader).addClass('progress');

   rIL.loadStatus = document.createElement('div'); ////progress-bar Div
   rIL.loadImg=$('<img />'); /// loading image element


	//////////////////////////////////////////////// LOAD THE Images
	rIL.loadAllTheImgs = function()  //// loadtheimagesFxn
	{
		rIL.tTotal = rIL.slowLD?rIL.opt.numImgsIfSlow:imgData.images.length;
		console.log(rIL.tTotal);
		$(rIL.loadStatus).addClass('done10'); //Move our statusbar a little


		for (var i = 0; i < rIL.tTotal; i++) { 
		{
		  fsCarData.allImgs[i]=$('<img />');

		  $(fsCarData.allImgs[i]).load(function(){
		  	var image = this;
		  		loadStatus(); ///updates loading bar
		  		$(fsCarData.mainContainer).append(image);
		  	});	

		 $(fsCarData.allImgs[i]).attr('src',imgData.images[i][rIL.screenLD]); 
		}

	}
}

/****** Get Screen Size mins, DPI, and Download Speeds to determin Which image files to fetch */
rIL.getRestrictions = function(){

	rIL.results += '<p>Your Screen Resolution is: '+ winW + 'px by '+ winH+'px<br>';
		if((winW > 2000)||(winH < 2000)|| (window.devicePixelRatio > 2))		
		{
			///if its a large screen or HD-dpi is detected, load the retina
			rIL.results += '<br>You have a large enough screen or HD worthy dpi so you get larger retina-ready images.</p>';
			rIL.screenLD = 'R';	
		}	
		else if(winW < 1050) //// excludes Standard-Res tablets in portrait mode (window width == 1080px)
		{
			rIL.results += '<br>You have a small enough screen that you get mobile images.</p>';
			rIL.screenLD = 'M';		
		}
		else
		{
			rIL.results += '<br>Your screen is neither too big or too small, so you get standard size images.</p>';
		}

	rIL.startDL = (new Date()).getTime();  /// start timer;
	rIL.startImgSize = imgData.loadImg.size;  /// the size of the load-test image
	$(rIL.loadImg).attr('src',imgData.loadImg.src); /// start loading the test image		
	$(rIL.loadImg).load(function(){    
			$(rIL.loadImgC).append(rIL.loadImg)  ///and once its loaded, show it 
			$(rIL.loadImgC).append(rIL.loader); //// we're ready to start loading, so append the loaders
			$(rIL.loader).append(rIL.loadStatus);
			$(rIL.loadImgC).fadeIn(300);		


			  var duration = ((new Date()).getTime() - rIL.startDL) / 1000;  //calculate how long it took 
			  var speedMbs = (rIL.startImgSize/(duration*1048576)); /// and convert that to Mbs (standard measure of internet speeds)
			  rIL.results += '<p>Your Internet Download Speed was: '+ speedMbs.toFixed(3) + ' Mbs per second';
			  if(speedMbs < rIL.opt.minDownloadSpeed)/// check if it meats the minimum speed reqs
			  {
			  	rIL.slowLD = true;
			  	 rIL.results +=  '<br>Thats below the minimum of <em>'+rIL.opt.minDownloadSpeed+'Mb per second</em>, so only <em>'+ rIL.opt.numImgsIfSlow +'</em> of the <em>'+ fsCarData.allImgs.length +'</em> images will be loaded</p>';
			  }
			  else if(speedMbs > 45)
			  {
			  	rIL.results +='The image was either already stored in cache or you have a great connection';
			  	rIL.results +=  '<br>Thats well above the minimum of <em>'+rIL.opt.minDownloadSpeed+'</em>, so all <em>'+ fsCarData.allImgs.length +'</em> images will be loaded</p>';
			  }
			  else
			  {
			  	 rIL.results +=  '<br>Thats above the minimum of <em>'+rIL.opt.minDownloadSpeed+'</em>, so all <em>'+ fsCarData.allImgs.length +'</em> images will be loaded</p>';
			  }
			  rIL.loadAllTheImgs();
			});
	}
 


	function loadStatus(){
	rIL.tLoaded++;
	if(rIL.busy){return};
		rIL.busy=true;
		setTimeout(function(){
								var pLoaded=(rIL.tLoaded/rIL.tTotal)*100;
							   	if(pLoaded<=25)
							   	{
							   		$(rIL.loadStatus).addClass('done25');							   		
							   	}
							   	else if((pLoaded>25)&&(pLoaded<=60))
							   	{
							   		$(rIL.loadStatus).addClass('done50');
							   	}
							    else if((pLoaded>60)&&(pLoaded<80))
							   	{
							   		$(rIL.loadStatus).addClass('done75');
							   	}
							   	else
							   	{
							   		$(rIL.loadStatus).addClass('done100');
							   	}




								rIL.busy=false;
								if(rIL.tLoaded==rIL.tTotal)
									{
										rIL.done=true;
										 allLoaded();
						     		}

						     },210)
			}

	function allLoaded()
	{	
		////// you're all loaded. Do things now!	
		$(rIL.loader).fadeOut(500,function(){
			$(fsCarData.mainContainer).fsCarousel();
			$(rIL.loader).remove();
			$(rIL.loadImgC).append('<div id="theResults">'+rIL.results+'</div>')
		});
	}



	rIL.getRestrictions();

}

function getUserDims()
	{
		
		winW = $(window).width();
		pgW =  winW * 1.1; 	
		winH = $(window).height();
		docW = $( document ).width();
		docH = $( document ).height();
		
	}
getUserDims();
$('#logoPage').rImgLoad();




