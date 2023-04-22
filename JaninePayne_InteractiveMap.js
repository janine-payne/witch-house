(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"JaninePayne_InteractiveMap_atlas_1", frames: [[0,225,601,223],[603,404,545,223],[0,0,705,223],[707,0,378,402],[1087,0,378,402],[1467,0,378,402]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if((deltaFrame >= 0) && this.ignorePause){
					cjs.MovieClip.prototype.play.call(this);
					this.ignorePause = false;
				}
				else if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
				else if(deltaFrame <= -2){
					cjs.MovieClip.prototype.stop.call(this);
					this.ignorePause = true;
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.Bitmap1 = function() {
	this.initialize(ss["JaninePayne_InteractiveMap_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap14 = function() {
	this.initialize(img.Bitmap14);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2547,2549);


(lib.Bitmap15 = function() {
	this.initialize(img.Bitmap15);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2553,2545);


(lib.Bitmap16 = function() {
	this.initialize(img.Bitmap16);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2550,2544);


(lib.Bitmap2 = function() {
	this.initialize(ss["JaninePayne_InteractiveMap_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap3 = function() {
	this.initialize(ss["JaninePayne_InteractiveMap_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.blood = function() {
	this.initialize(img.blood);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.bone = function() {
	this.initialize(img.bone);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.bonepngcopy = function() {
	this.initialize(img.bonepngcopy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.boo1 = function() {
	this.initialize(img.boo1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.boo1pngcopy = function() {
	this.initialize(img.boo1pngcopy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.boo2 = function() {
	this.initialize(img.boo2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.boo3 = function() {
	this.initialize(img.boo3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.boo4 = function() {
	this.initialize(img.boo4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.boo5 = function() {
	this.initialize(img.boo5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.boo6 = function() {
	this.initialize(img.boo6);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.boo7 = function() {
	this.initialize(img.boo7);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.boo8 = function() {
	this.initialize(img.boo8);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.candlescopy = function() {
	this.initialize(img.candlescopy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.cat1 = function() {
	this.initialize(img.cat1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.cat10 = function() {
	this.initialize(img.cat10);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.cat12 = function() {
	this.initialize(img.cat12);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.cat14 = function() {
	this.initialize(img.cat14);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.cat16 = function() {
	this.initialize(img.cat16);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.cat18 = function() {
	this.initialize(img.cat18);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.cat20 = function() {
	this.initialize(img.cat20);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.cat22 = function() {
	this.initialize(img.cat22);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.cat24 = function() {
	this.initialize(img.cat24);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.cat4 = function() {
	this.initialize(img.cat4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.cat6 = function() {
	this.initialize(img.cat6);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.cat8 = function() {
	this.initialize(img.cat8);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.Cauldron1 = function() {
	this.initialize(img.Cauldron1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.Cauldron10 = function() {
	this.initialize(img.Cauldron10);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.Cauldron13 = function() {
	this.initialize(img.Cauldron13);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.Cauldron16 = function() {
	this.initialize(img.Cauldron16);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.Cauldron19 = function() {
	this.initialize(img.Cauldron19);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.Cauldron22 = function() {
	this.initialize(img.Cauldron22);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.Cauldron4 = function() {
	this.initialize(img.Cauldron4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.Cauldron7 = function() {
	this.initialize(img.Cauldron7);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.cursor = function() {
	this.initialize(img.cursor);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.Envelope_1 = function() {
	this.initialize(img.Envelope_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.Envelope_1pngcopy = function() {
	this.initialize(img.Envelope_1pngcopy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.Envelope_1pngcopy2 = function() {
	this.initialize(img.Envelope_1pngcopy2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.Envelope_2 = function() {
	this.initialize(img.Envelope_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.Envelope_3 = function() {
	this.initialize(img.Envelope_3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.Envelope_4 = function() {
	this.initialize(img.Envelope_4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.Envelope_5 = function() {
	this.initialize(img.Envelope_5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.Envelope_6 = function() {
	this.initialize(img.Envelope_6);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.Explosion1pngcopy = function() {
	this.initialize(img.Explosion1pngcopy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3300,2550);


(lib.Explosion10 = function() {
	this.initialize(img.Explosion10);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3300,2550);


(lib.Explosion11 = function() {
	this.initialize(img.Explosion11);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3300,2550);


(lib.Explosion12 = function() {
	this.initialize(img.Explosion12);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3300,2550);


(lib.Explosion13pngcopy = function() {
	this.initialize(img.Explosion13pngcopy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3300,2550);


(lib.Explosion2 = function() {
	this.initialize(img.Explosion2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3300,2550);


(lib.Explosion3 = function() {
	this.initialize(img.Explosion3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3300,2550);


(lib.Explosion4 = function() {
	this.initialize(img.Explosion4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3300,2550);


(lib.Explosion5 = function() {
	this.initialize(img.Explosion5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3300,2550);


(lib.Explosion6 = function() {
	this.initialize(img.Explosion6);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3300,2550);


(lib.Explosion7 = function() {
	this.initialize(img.Explosion7);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3300,2550);


(lib.Explosion8 = function() {
	this.initialize(img.Explosion8);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3300,2550);


(lib.Explosion9 = function() {
	this.initialize(img.Explosion9);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3300,2550);


(lib.Eye1 = function() {
	this.initialize(ss["JaninePayne_InteractiveMap_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.Eye2 = function() {
	this.initialize(ss["JaninePayne_InteractiveMap_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.ghostblush1 = function() {
	this.initialize(img.ghostblush1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.ghostblush1pngcopy = function() {
	this.initialize(img.ghostblush1pngcopy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.ghostblush11 = function() {
	this.initialize(img.ghostblush11);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.ghostblush13 = function() {
	this.initialize(img.ghostblush13);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.ghostblush15 = function() {
	this.initialize(img.ghostblush15);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.ghostblush16 = function() {
	this.initialize(img.ghostblush16);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.ghostblush3 = function() {
	this.initialize(img.ghostblush3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.ghostblush5 = function() {
	this.initialize(img.ghostblush5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.ghostblush7 = function() {
	this.initialize(img.ghostblush7);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.ghostblush9 = function() {
	this.initialize(img.ghostblush9);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.happyghost1 = function() {
	this.initialize(img.happyghost1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.happyghost10 = function() {
	this.initialize(img.happyghost10);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.happyghost2 = function() {
	this.initialize(img.happyghost2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.happyghost3 = function() {
	this.initialize(img.happyghost3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.happyghost5 = function() {
	this.initialize(img.happyghost5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.happyghost6 = function() {
	this.initialize(img.happyghost6);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.happyghost7 = function() {
	this.initialize(img.happyghost7);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.happyghost8 = function() {
	this.initialize(img.happyghost8);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.happyghost9 = function() {
	this.initialize(img.happyghost9);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.Hooray1 = function() {
	this.initialize(img.Hooray1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.Hooray2 = function() {
	this.initialize(img.Hooray2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.Hooray3 = function() {
	this.initialize(img.Hooray3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.Hooray4 = function() {
	this.initialize(img.Hooray4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.Hooray5 = function() {
	this.initialize(img.Hooray5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.Janine_P_InteractiveGame101 = function() {
	this.initialize(img.Janine_P_InteractiveGame101);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3684,4500);


(lib.lavender = function() {
	this.initialize(img.lavender);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.Layer4 = function() {
	this.initialize(ss["JaninePayne_InteractiveMap_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.letterr = function() {
	this.initialize(img.letterr);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1912,2617);


(lib.poison = function() {
	this.initialize(img.poison);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.pumkin = function() {
	this.initialize(img.pumkin);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.Skelly_Dance1pngcopy3 = function() {
	this.initialize(img.Skelly_Dance1pngcopy3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.Skelly_Dance3pngcopy2 = function() {
	this.initialize(img.Skelly_Dance3pngcopy2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.Skelly_Dance5pngcopy2 = function() {
	this.initialize(img.Skelly_Dance5pngcopy2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.Skelly_Dance7pngcopy2 = function() {
	this.initialize(img.Skelly_Dance7pngcopy2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.skull = function() {
	this.initialize(img.skull);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.smoke11 = function() {
	this.initialize(img.smoke11);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.smoke13 = function() {
	this.initialize(img.smoke13);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.smoke15 = function() {
	this.initialize(img.smoke15);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.smoke17 = function() {
	this.initialize(img.smoke17);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.smoke19 = function() {
	this.initialize(img.smoke19);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.smoke2 = function() {
	this.initialize(img.smoke2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.smoke21 = function() {
	this.initialize(img.smoke21);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.smoke24 = function() {
	this.initialize(img.smoke24);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.smoke3 = function() {
	this.initialize(img.smoke3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.smoke5 = function() {
	this.initialize(img.smoke5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.smoke7 = function() {
	this.initialize(img.smoke7);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.smoke9 = function() {
	this.initialize(img.smoke9);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.tears = function() {
	this.initialize(img.tears);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.Torch1pngcopy = function() {
	this.initialize(img.Torch1pngcopy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.Torch10 = function() {
	this.initialize(img.Torch10);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.Torch11 = function() {
	this.initialize(img.Torch11);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.Torch12 = function() {
	this.initialize(img.Torch12);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.Torch13 = function() {
	this.initialize(img.Torch13);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.Torch14 = function() {
	this.initialize(img.Torch14);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.Torch15 = function() {
	this.initialize(img.Torch15);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.Torch16 = function() {
	this.initialize(img.Torch16);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.Torch17 = function() {
	this.initialize(img.Torch17);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.Torch18 = function() {
	this.initialize(img.Torch18);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.Torch19 = function() {
	this.initialize(img.Torch19);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.Torch2 = function() {
	this.initialize(img.Torch2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.Torch20 = function() {
	this.initialize(img.Torch20);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.Torch21 = function() {
	this.initialize(img.Torch21);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.Torch22 = function() {
	this.initialize(img.Torch22);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.Torch3 = function() {
	this.initialize(img.Torch3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.Torch4 = function() {
	this.initialize(img.Torch4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.Torch5 = function() {
	this.initialize(img.Torch5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.Torch6 = function() {
	this.initialize(img.Torch6);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.Torch7 = function() {
	this.initialize(img.Torch7);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.Torch8 = function() {
	this.initialize(img.Torch8);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.Torch9 = function() {
	this.initialize(img.Torch9);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.unicornblood = function() {
	this.initialize(img.unicornblood);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.Untitled_Artwork22 = function() {
	this.initialize(img.Untitled_Artwork22);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.wavyskelly1 = function() {
	this.initialize(img.wavyskelly1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.wavyskelly1pngcopy4 = function() {
	this.initialize(img.wavyskelly1pngcopy4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.wavyskelly10 = function() {
	this.initialize(img.wavyskelly10);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.wavyskelly11 = function() {
	this.initialize(img.wavyskelly11);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.wavyskelly12 = function() {
	this.initialize(img.wavyskelly12);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.wavyskelly13 = function() {
	this.initialize(img.wavyskelly13);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.wavyskelly14 = function() {
	this.initialize(img.wavyskelly14);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.wavyskelly15 = function() {
	this.initialize(img.wavyskelly15);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.wavyskelly16 = function() {
	this.initialize(img.wavyskelly16);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.wavyskelly17 = function() {
	this.initialize(img.wavyskelly17);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.wavyskelly18 = function() {
	this.initialize(img.wavyskelly18);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.wavyskelly19 = function() {
	this.initialize(img.wavyskelly19);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.wavyskelly20 = function() {
	this.initialize(img.wavyskelly20);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.wavyskelly21 = function() {
	this.initialize(img.wavyskelly21);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.wavyskelly22 = function() {
	this.initialize(img.wavyskelly22);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.wavyskelly23 = function() {
	this.initialize(img.wavyskelly23);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.wavyskelly24 = function() {
	this.initialize(img.wavyskelly24);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.wavyskelly25 = function() {
	this.initialize(img.wavyskelly25);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.wavyskelly3 = function() {
	this.initialize(img.wavyskelly3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.wavyskelly4 = function() {
	this.initialize(img.wavyskelly4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.wavyskelly5 = function() {
	this.initialize(img.wavyskelly5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.wavyskelly6 = function() {
	this.initialize(img.wavyskelly6);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.wavyskelly7 = function() {
	this.initialize(img.wavyskelly7);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.wavyskelly8 = function() {
	this.initialize(img.wavyskelly8);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.wavyskelly9 = function() {
	this.initialize(img.wavyskelly9);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.youdidit_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Bitmap3();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.youdidit_mc, new cjs.Rectangle(0,0,705,223), null);


(lib.unicornblood_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.unicornblood();
	this.instance.setTransform(0,0,0.0365,0.0365);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.unicornblood_mc, new cjs.Rectangle(0,0,109.4,109.4), null);


(lib.torch_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// torch
	this.instance = new lib.Torch1pngcopy();

	this.instance_1 = new lib.Torch2();

	this.instance_2 = new lib.Torch3();

	this.instance_3 = new lib.Torch4();

	this.instance_4 = new lib.Torch5();

	this.instance_5 = new lib.Torch6();

	this.instance_6 = new lib.Torch7();

	this.instance_7 = new lib.Torch8();

	this.instance_8 = new lib.Torch9();

	this.instance_9 = new lib.Torch10();

	this.instance_10 = new lib.Torch11();

	this.instance_11 = new lib.Torch12();

	this.instance_12 = new lib.Torch13();

	this.instance_13 = new lib.Torch14();

	this.instance_14 = new lib.Torch15();

	this.instance_15 = new lib.Torch16();

	this.instance_16 = new lib.Torch17();

	this.instance_17 = new lib.Torch18();

	this.instance_18 = new lib.Torch19();

	this.instance_19 = new lib.Torch20();

	this.instance_20 = new lib.Torch21();

	this.instance_21 = new lib.Torch22();

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_12}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_14}]},1).to({state:[{t:this.instance_15}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_17}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_19}]},1).to({state:[{t:this.instance_20}]},1).to({state:[{t:this.instance_21}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.tears_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.tears();
	this.instance.setTransform(0,0,0.0467,0.0467);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.tears_mc, new cjs.Rectangle(0,0,140.1,140.1), null);


(lib.stop_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Bitmap14();
	this.instance.setTransform(0,0,0.0151,0.0151);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,38.5,38.5);


(lib.startingletter_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.letterr();
	this.instance.setTransform(0,0,0.2685,0.2685);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.startingletter_mc, new cjs.Rectangle(0,0,513.4,702.7), null);


(lib.smoky_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.smoke2();
	this.instance.setTransform(-28,-25);

	this.instance_1 = new lib.smoke3();

	this.instance_2 = new lib.smoke5();

	this.instance_3 = new lib.smoke7();

	this.instance_4 = new lib.smoke9();

	this.instance_5 = new lib.smoke11();

	this.instance_6 = new lib.smoke13();

	this.instance_7 = new lib.smoke15();

	this.instance_8 = new lib.smoke17();

	this.instance_9 = new lib.smoke19();

	this.instance_10 = new lib.smoke21();

	this.instance_11 = new lib.smoke24();

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},2).to({state:[{t:this.instance_2}]},2).to({state:[{t:this.instance_3}]},2).to({state:[{t:this.instance_4}]},2).to({state:[{t:this.instance_5}]},2).to({state:[{t:this.instance_6}]},2).to({state:[{t:this.instance_7}]},2).to({state:[{t:this.instance_8}]},2).to({state:[{t:this.instance_9}]},2).to({state:[{t:this.instance_10}]},2).to({state:[{t:this.instance_11}]},2).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-28,-25,3028,3025);


(lib.skull_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.skull();
	this.instance.setTransform(0,0,0.0363,0.0363);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.skull_mc, new cjs.Rectangle(0,0,109,109), null);


(lib.skellywave_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.wavyskelly1();
	this.instance.setTransform(0,0,0.0436,0.0436);

	this.instance_1 = new lib.wavyskelly3();
	this.instance_1.setTransform(0,0,0.0436,0.0436);

	this.instance_2 = new lib.wavyskelly4();
	this.instance_2.setTransform(0,0,0.0436,0.0436);

	this.instance_3 = new lib.wavyskelly5();
	this.instance_3.setTransform(0,0,0.0436,0.0436);

	this.instance_4 = new lib.wavyskelly6();
	this.instance_4.setTransform(0,0,0.0436,0.0436);

	this.instance_5 = new lib.wavyskelly7();
	this.instance_5.setTransform(0,0,0.0436,0.0436);

	this.instance_6 = new lib.wavyskelly8();
	this.instance_6.setTransform(0,0,0.0436,0.0436);

	this.instance_7 = new lib.wavyskelly9();
	this.instance_7.setTransform(0,0,0.0436,0.0436);

	this.instance_8 = new lib.wavyskelly10();
	this.instance_8.setTransform(0,0,0.0436,0.0436);

	this.instance_9 = new lib.wavyskelly11();
	this.instance_9.setTransform(0,0,0.0436,0.0436);

	this.instance_10 = new lib.wavyskelly12();
	this.instance_10.setTransform(0,0,0.0436,0.0436);

	this.instance_11 = new lib.wavyskelly13();
	this.instance_11.setTransform(0,0,0.0436,0.0436);

	this.instance_12 = new lib.wavyskelly14();
	this.instance_12.setTransform(0,0,0.0436,0.0436);

	this.instance_13 = new lib.wavyskelly15();
	this.instance_13.setTransform(0,0,0.0436,0.0436);

	this.instance_14 = new lib.wavyskelly16();
	this.instance_14.setTransform(0,0,0.0436,0.0436);

	this.instance_15 = new lib.wavyskelly17();
	this.instance_15.setTransform(0,0,0.0436,0.0436);

	this.instance_16 = new lib.wavyskelly18();
	this.instance_16.setTransform(0,0,0.0436,0.0436);

	this.instance_17 = new lib.wavyskelly19();
	this.instance_17.setTransform(0,0,0.0436,0.0436);

	this.instance_18 = new lib.wavyskelly20();
	this.instance_18.setTransform(0,0,0.0436,0.0436);

	this.instance_19 = new lib.wavyskelly21();
	this.instance_19.setTransform(0,0,0.0436,0.0436);

	this.instance_20 = new lib.wavyskelly22();
	this.instance_20.setTransform(0,0,0.0436,0.0436);

	this.instance_21 = new lib.wavyskelly23();
	this.instance_21.setTransform(0,0,0.0436,0.0436);

	this.instance_22 = new lib.wavyskelly24();
	this.instance_22.setTransform(0,0,0.0436,0.0436);

	this.instance_23 = new lib.wavyskelly25();
	this.instance_23.setTransform(0,0,0.0436,0.0436);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2},{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_12}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_14}]},1).to({state:[{t:this.instance_15}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_17}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_19}]},1).to({state:[{t:this.instance_20}]},1).to({state:[{t:this.instance_21}]},1).to({state:[{t:this.instance_22}]},1).to({state:[{t:this.instance_23}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,130.7,130.7);


(lib.skeldance_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.wavyskelly1pngcopy4();
	this.instance.setTransform(0,0,0.0539,0.0539);

	this.instance_1 = new lib.Skelly_Dance1pngcopy3();
	this.instance_1.setTransform(0,0,0.0539,0.0539);

	this.instance_2 = new lib.Skelly_Dance3pngcopy2();
	this.instance_2.setTransform(0,0,0.0539,0.0539);

	this.instance_3 = new lib.Skelly_Dance5pngcopy2();
	this.instance_3.setTransform(0,0,0.0539,0.0539);

	this.instance_4 = new lib.Skelly_Dance7pngcopy2();
	this.instance_4.setTransform(0,0,0.0539,0.0539);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},2).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_3}]},3).to({state:[{t:this.instance_4}]},3).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,161.8,161.8);


(lib.replay_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Bitmap1();
	this.instance.setTransform(22,0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({scaleX:1.0867,scaleY:1.2874,x:0,y:-32},0).to({_off:true},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-32,653.1,287.1);


(lib.pumpkin_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.pumkin();
	this.instance.setTransform(0,0,0.0449,0.0449);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.pumpkin_mc, new cjs.Rectangle(0,0,134.7,134.7), null);


(lib.poison_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.poison();
	this.instance.setTransform(0,0,0.0312,0.0312);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.poison_mc, new cjs.Rectangle(0,0,93.6,93.6), null);


(lib.play_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Bitmap15();
	this.instance.setTransform(0,0,0.0148,0.0148);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,37.9,37.8);


(lib.pause_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Bitmap16();
	this.instance.setTransform(0,0,0.015,0.015);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,38.2,38.1);


(lib.mrghost_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Untitled_Artwork22();
	this.instance.setTransform(0,0,0.0179,0.0179);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,53.7,53.7);


(lib.lavender_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.lavender();
	this.instance.setTransform(137.95,0,0.0467,0.0467,80.2297);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.lavender_mc, new cjs.Rectangle(0,0,161.7,161.7), null);


(lib.happyghost_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.happyghost1();
	this.instance.setTransform(0,0,0.0574,0.0574);

	this.instance_1 = new lib.happyghost2();
	this.instance_1.setTransform(0,0,0.0574,0.0574);

	this.instance_2 = new lib.happyghost3();
	this.instance_2.setTransform(0,0,0.0574,0.0574);

	this.instance_3 = new lib.happyghost5();
	this.instance_3.setTransform(0,0,0.0574,0.0574);

	this.instance_4 = new lib.happyghost6();
	this.instance_4.setTransform(0,0,0.0574,0.0574);

	this.instance_5 = new lib.happyghost7();
	this.instance_5.setTransform(0,0,0.0574,0.0574);

	this.instance_6 = new lib.happyghost8();
	this.instance_6.setTransform(0,0,0.0574,0.0574);

	this.instance_7 = new lib.happyghost9();
	this.instance_7.setTransform(0,0,0.0574,0.0574);

	this.instance_8 = new lib.happyghost10();
	this.instance_8.setTransform(0,0,0.0574,0.0574);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_8}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,172.1,172.1);


(lib.ghost_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.ghostblush1();
	this.instance.setTransform(0,0,0.0454,0.0454);

	this.instance_1 = new lib.ghostblush1pngcopy();
	this.instance_1.setTransform(0,0,0.0454,0.0454);

	this.instance_2 = new lib.ghostblush3();
	this.instance_2.setTransform(0,0,0.0454,0.0454);

	this.instance_3 = new lib.ghostblush5();
	this.instance_3.setTransform(0,0,0.0454,0.0454);

	this.instance_4 = new lib.ghostblush7();
	this.instance_4.setTransform(0,0,0.0454,0.0454);

	this.instance_5 = new lib.ghostblush9();
	this.instance_5.setTransform(0,0,0.0454,0.0454);

	this.instance_6 = new lib.ghostblush11();
	this.instance_6.setTransform(0,0,0.0454,0.0454);

	this.instance_7 = new lib.ghostblush13();
	this.instance_7.setTransform(0,0,0.0454,0.0454);

	this.instance_8 = new lib.ghostblush15();
	this.instance_8.setTransform(0,0,0.0454,0.0454);

	this.instance_9 = new lib.ghostblush16();
	this.instance_9.setTransform(0,0,0.0454,0.0454);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance},{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_9}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,136.2,136.2);


(lib.eye2_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Eye1();
	this.instance.setTransform(0,0,0.4122,0.4122);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.eye2_mc, new cjs.Rectangle(0,0,155.8,165.7), null);


(lib.eye_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Eye2();
	this.instance.setTransform(0,0,0.4122,0.4122);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.eye_mc, new cjs.Rectangle(0,0,155.8,165.7), null);


(lib.explosion_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Explosion13pngcopy();
	this.instance.setTransform(0,0,0.2702,0.4268);

	this.instance_1 = new lib.Explosion1pngcopy();
	this.instance_1.setTransform(0,0,0.2702,0.4268);

	this.instance_2 = new lib.Explosion2();
	this.instance_2.setTransform(0,0,0.2702,0.4268);

	this.instance_3 = new lib.Explosion3();
	this.instance_3.setTransform(0,0,0.2702,0.4268);

	this.instance_4 = new lib.Explosion4();
	this.instance_4.setTransform(0,0,0.2702,0.4268);

	this.instance_5 = new lib.Explosion5();
	this.instance_5.setTransform(0,0,0.2702,0.4268);

	this.instance_6 = new lib.Explosion6();
	this.instance_6.setTransform(0,0,0.2702,0.4268);

	this.instance_7 = new lib.Explosion7();
	this.instance_7.setTransform(0,0,0.2702,0.4268);

	this.instance_8 = new lib.Explosion8();
	this.instance_8.setTransform(0,0,0.2702,0.4268);

	this.instance_9 = new lib.Explosion9();
	this.instance_9.setTransform(0,0,0.2702,0.4268);

	this.instance_10 = new lib.Explosion10();
	this.instance_10.setTransform(0,0,0.2702,0.4268);

	this.instance_11 = new lib.Explosion11();
	this.instance_11.setTransform(0,0,0.2702,0.4268);

	this.instance_12 = new lib.Explosion12();
	this.instance_12.setTransform(0,0,0.2702,0.4268);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_12}]},1).to({state:[{t:this.instance}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,891.6,1088.4);


(lib.envelope1_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Envelope_1();
	this.instance.setTransform(0,0,0.0494,0.0494);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,148.2,148.2);


(lib.envelope = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Envelope_1pngcopy2();
	this.instance.setTransform(0,0,0.0479,0.0479);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.envelope, new cjs.Rectangle(0,0,143.8,143.8), null);


(lib.cursor_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.cursor();
	this.instance.setTransform(0,0,0.0509,0.0509);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.cursor_mc, new cjs.Rectangle(0,0,152.8,152.8), null);


(lib.counter_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3B343D").s().p("AgyA/QgHgDABgOIAEhgQAAgIAEgDQADgCAEABQAEABACAEQADAFgBAKIgBBUQAAALgDAEQgEAGgFAAIgEAAgAAFA4QgNAAgIgFQgIgGgCgNQgCgHACgPQAEgfAHgOQAFgJAGgEQAHgFAOABQAUACAKALQAGAIACAOQAEAZgEAPQgGAYgUAHQgGACgLAAIgHAAgAAIgjQgDABgDAFIgFANIgEAXIgCAQQgBAHACADQAEAFALAAQAPAAAGgEQAHgFADgKQACgHAAgKQAAgLgDgJQgCgIgGgEIgLgDIgJgCIgBAAg");
	this.shape.setTransform(5.6813,6.3344);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#3B343D").s().p("AAFA8QgEgDABgKIAEgXQACgNACgFIgKAAQgMAAgIgDQgHgDgFgEQgDgCgCgFQgDgFABgHIACgOIACgIIAEgIQAIgIAGgBIAPgBIAGABQAFABAGAGQAFAEAAADQAAAEgFADQgJgIgSABIgEABQgEACgCAGIgBAKQgDAKACACIAFAEQAJADAKAAIAEAAIAEgEIAHgJQAFgGABgDIABgIQACgGADgCQAEgDAGADQAFAEgCAKQgCANgHAZIgJAzQgCAGgFACIgDABQgEAAgDgEg");
	this.shape_1.setTransform(4.0893,7.1558);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#3B343D").s().p("AgaAwQgFgFgBgKQgBgMAEgJQAFgLAJgCQgMgJgDgPQgCgIACgFQADgGAKgEQARgJAKAEQANAFADAQQACAMgKAMQAJAHADADQADAFAAAKQgBAOgHALQgFAHgFADQgGADgNAAQgRgBgFgGgAAAAIIgEADIgFAEQgEADgCACIgBAHQAAAFACACQACACAFAAIAIgBQAFABABgCIADgDIADgKQAAgBAAgBQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQgBgBAAAAIgIgFIgCAAIAAAAgAgHglIgCABQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAIAEAIQABADAFACIACABQABAAAAAAQABgBAAAAQAAgBABAAQAAgBAAAAIAEgHIgBgFIgCgDIgDgCIgEAAQgEAAgDABg");
	this.shape_2.setTransform(4.0159,7.45);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#3B343D").s().p("AgGA3QgIgEAFgPQAJgoAMgYQgTgBgVgHQgIgDgBgEQgCgEAEgEQADgEAEAAQAEgBANAEQALAEAPAAQAQgBAEAFQAFAEgCAJIgHANQgOAYgFAcQgCAMgCAEQgDAEgEABIgDABIgEgBg");
	this.shape_3.setTransform(3.9583,7.9219);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#3B343D").s().p("AgPA0QgNgFgFgLQgDgIABgOQACgqASgSQAGgHAGAAQADAAADADQADADgBADQAAADgFAFQgLALgBAPQALgKALAAQAPAAAHAKQAHAKgDANQgCANgHAKQgIALgLAFQgGACgFAAQgGAAgGgCgAAIAHIgCACQgFAEAAACIgBADIgBACQgBACABAFQAHAAADgJIAAgCIABgCQAAgFACgCIgCgBIgCABg");
	this.shape_4.setTransform(4.7986,7.8375);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#3B343D").s().p("AggA+QgIgDAAgHQAAgEADgEIAIgEIAZgHQAFgEAFgIIAGgPIgGgBQgHAAgJAMIgJALQgDADgEABQgGAAgEgHQgCgEAAgJIgBgkQAAgKgBgCIgCgHQAAgEAEgCIAHgDQAKgDARgCIAagEIAJgBQAGAAADADQAFAGgEAGQgDAEgIACQgZAHgYADIAAAaQAKgHAEgCQAFgCAHABIALABIAHAEIAGAFQABACABAGIgBALIgDAKIgIAOQgDAFgGAFQgOAMgRADIgHAAIgGgBg");
	this.shape_5.setTransform(6.2763,7.3138);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#3B343D").s().p("AAPA3QgEgDgBgGQgBgGABgKIAAgRQgMACgQAAQgHAAgDgDQgEgDABgKQADgSAIgcQACgIAFAAQAFgCADAHIAAALIgIAjIAVgCQAEgOAAgQIACgOQACgDADgBQAEgCADABQAEADABAJQACARgBAXIgCAoQgBALgCADQgEAGgEAAQgCAAgCgCg");
	this.shape_6.setTransform(5.3451,8.4294);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#3B343D").s().p("AgQA6IgIgDIgGgDIgFgHQgDgFABgFQACgHAFgCQAIgCAGAJIAEAFIAGAAIAMAAQADgBAFgFQAFgFAAgCQAAgEgCgEQgFgHgIgCIgMgBQgJgBAAgGQgBgGAHgDQAEgCAHgBIAIgEQAEgDAAgDQACgEgCgDQgDgGgGgEQgDgEgEAAQgDAAgEADIgGAEQgDADgCgBQgEAAgCgDQgBgDAAgEQAAgCAEgEQAHgHAKgBQAKAAAIAFQAFADAHAJIAEAGQABAFAAAFQABAKgDAFIgGAHQAMAIAGAOIABAGQAAAEgEAHQgJASgMADQgFACgKAAIgOgBg");
	this.shape_7.setTransform(5.5708,7.3727);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#3B343D").s().p("AADA2IgdgBIgJgBQgFgCgBgFQgBgCACgGIAHgNQAFgJAJgKIATgWIAGgKQACgHgFgEQgDgCgGAAIgJABQgDABgCAFIgFAGQgFAEgEgEQgFgEACgFIAFgGIAGgIQADgEAEgBIAIAAIAIAAIAHABQAFABAEAGIAGAGIACAIIgBALQgBAFgEAEQgNASgGAJIgQAUIAQAAQAKAAAFABIANACIAKgBQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAIADAEQADAGgDAEQgCAFgKABIgCAAIgYgCg");
	this.shape_8.setTransform(5.4768,7.6042);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#3B343D").s().p("AAHA/QgEgDAAgIIABgMQgEgMAAgHQACgJgBgEIgBgGQgBgDABgFIAAgKQAAgGgDgNQgDAAgEAEQgEAEgDABQgEACgDgFQgDgFADgFIAHgIIAKgLQAFgGACAAQAAAAABAAQAAAAAAAAQABAAAAgBQAAAAgBAAQAGACAEAHIAEAMIABAMIADARIAAAOIACAEIAAAKQAAAIADAQIABAKIABAGIAAAGQgCAFgHACIgDAAQgEAAgDgDg");
	this.shape_9.setTransform(4.9183,7.7111);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,11.4,14.3);


(lib.cauldron_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Cauldron1();
	this.instance.setTransform(-493,1776,0.097,0.097);

	this.instance_1 = new lib.Cauldron4();
	this.instance_1.setTransform(-493,1776,0.097,0.097);

	this.instance_2 = new lib.Cauldron7();
	this.instance_2.setTransform(-493,1776,0.097,0.097);

	this.instance_3 = new lib.Cauldron10();
	this.instance_3.setTransform(-493,1776,0.097,0.097);

	this.instance_4 = new lib.Cauldron13();
	this.instance_4.setTransform(-493,1776,0.097,0.097);

	this.instance_5 = new lib.Cauldron16();
	this.instance_5.setTransform(-493,1776,0.097,0.097);

	this.instance_6 = new lib.Cauldron19();
	this.instance_6.setTransform(-493,1776,0.097,0.097);

	this.instance_7 = new lib.Cauldron22();
	this.instance_7.setTransform(-493,1776,0.097,0.097);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance_1}]},2).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},2).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},2).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},2).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_5}]},2).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_6}]},2).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_7}]},2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-493,1776,291,291);


(lib.cat_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.cat1();
	this.instance.setTransform(77,645,0.058,0.058);

	this.instance_1 = new lib.cat4();
	this.instance_1.setTransform(77,645,0.058,0.058);

	this.instance_2 = new lib.cat6();
	this.instance_2.setTransform(77,645,0.058,0.058);

	this.instance_3 = new lib.cat8();
	this.instance_3.setTransform(77,645,0.058,0.058);

	this.instance_4 = new lib.cat10();
	this.instance_4.setTransform(77,645,0.058,0.058);

	this.instance_5 = new lib.cat12();
	this.instance_5.setTransform(77,645,0.058,0.058);

	this.instance_6 = new lib.cat14();
	this.instance_6.setTransform(77,645,0.058,0.058);

	this.instance_7 = new lib.cat16();
	this.instance_7.setTransform(77,645,0.058,0.058);

	this.instance_8 = new lib.cat18();
	this.instance_8.setTransform(77,645,0.058,0.058);

	this.instance_9 = new lib.cat20();
	this.instance_9.setTransform(77,645,0.058,0.058);

	this.instance_10 = new lib.cat22();
	this.instance_10.setTransform(77,645,0.058,0.058);

	this.instance_11 = new lib.cat24();
	this.instance_11.setTransform(77,645,0.058,0.058);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(77,645,173.9,173.89999999999998);


(lib.candles_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.candlescopy();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.candles_mc, new cjs.Rectangle(0,0,3000,3000), null);


(lib.booframe_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.boo1pngcopy();

	this.instance_1 = new lib.boo1();
	this.instance_1.setTransform(0,0,0.0111,0.0111);

	this.instance_2 = new lib.boo2();

	this.instance_3 = new lib.boo3();

	this.instance_4 = new lib.boo4();

	this.instance_5 = new lib.boo5();

	this.instance_6 = new lib.boo6();

	this.instance_7 = new lib.boo7();

	this.instance_8 = new lib.boo8();

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_8}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib.bone2_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.bonepngcopy();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.bone2_mc, new cjs.Rectangle(0,0,3000,3000), null);


(lib.bone_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.bone();
	this.instance.setTransform(0,0,0.1454,0.1454);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.bone_mc, new cjs.Rectangle(0,0,436.2,436.2), null);


(lib.blood_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.blood();
	this.instance.setTransform(-455,67,0.0528,0.0528);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.blood_mc, new cjs.Rectangle(-455,67,158.5,158.5), null);


(lib.torch_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_2 = function() {
		playSound("firewav");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(2).call(this.frame_2).wait(1));

	// Layer_1
	this.torch_mc = new lib.torch_mc();
	this.torch_mc.name = "torch_mc";
	this.torch_mc.setTransform(58.8,58.75,0.0392,0.0392,0,0,180,1498,1500.5);

	this.timeline.addTween(cjs.Tween.get(this.torch_mc).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,117.5,117.5);


(lib.timer_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_1000 = function() {
		this.stop();
		
		this.replay_btn.addEventListener("click",refreshPage.bind(this));
		
		function refreshPage (){
			location.reload();
			return false;
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(1000).call(this.frame_1000).wait(1));

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#CDC1CE").ss(2,1,1).p("AsJiGIYTAAIAAENI4TAAg");
	this.shape.setTransform(76.775,12.6);

	this.timeline.addTween(cjs.Tween.get(this.shape).to({_off:true},1000).wait(1));

	// healthbar
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#99929A").s().p("AsJCHIAAkNIYTAAIAAENg");
	this.shape_1.setTransform(76.775,12.55);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#99929A").s().p("AsICHIAAkNIYRAAIAAENg");
	this.shape_2.setTransform(76.85,12.55);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#99929A").s().p("AsHCHIAAkNIYPAAIAAENg");
	this.shape_3.setTransform(76.925,12.55);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#99929A").s().p("AsGCHIAAkNIYNAAIAAENg");
	this.shape_4.setTransform(77,12.55);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#99929A").s().p("AsFCHIAAkNIYLAAIAAENg");
	this.shape_5.setTransform(77.175,12.55);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#99929A").s().p("AsECHIAAkNIYJAAIAAENg");
	this.shape_6.setTransform(77.25,12.55);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#99929A").s().p("AsDCHIAAkNIYHAAIAAENg");
	this.shape_7.setTransform(77.325,12.55);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#99929A").s().p("AsCCHIAAkNIYFAAIAAENg");
	this.shape_8.setTransform(77.4,12.55);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#999299").s().p("AsBCHIAAkNIYDAAIAAENg");
	this.shape_9.setTransform(77.55,12.55);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#999299").s().p("AsACHIAAkNIYBAAIAAENg");
	this.shape_10.setTransform(77.625,12.55);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#999199").s().p("AsACHIAAkNIYAAAIAAENg");
	this.shape_11.setTransform(77.7,12.55);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#999199").s().p("Ar/CHIAAkNIX/AAIAAENg");
	this.shape_12.setTransform(77.775,12.55);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#999199").s().p("Ar+CHIAAkNIX9AAIAAENg");
	this.shape_13.setTransform(77.85,12.55);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#999199").s().p("Ar9CHIAAkNIX7AAIAAENg");
	this.shape_14.setTransform(77.95,12.55);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#999199").s().p("Ar8CHIAAkNIX5AAIAAENg");
	this.shape_15.setTransform(78.025,12.55);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#999199").s().p("Ar8CHIAAkNIX4AAIAAENg");
	this.shape_16.setTransform(78.1,12.55);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#999199").s().p("Ar7CHIAAkNIX3AAIAAENg");
	this.shape_17.setTransform(78.175,12.55);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#999199").s().p("Ar6CHIAAkNIX1AAIAAENg");
	this.shape_18.setTransform(78.25,12.55);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#999199").s().p("Ar5CHIAAkNIXzAAIAAENg");
	this.shape_19.setTransform(78.325,12.55);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#999199").s().p("Ar5CHIAAkNIXyAAIAAENg");
	this.shape_20.setTransform(78.4,12.55);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#999199").s().p("Ar4CHIAAkNIXxAAIAAENg");
	this.shape_21.setTransform(78.475,12.55);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#999199").s().p("Ar3CHIAAkNIXvAAIAAENg");
	this.shape_22.setTransform(78.55,12.55);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#999199").s().p("Ar2CHIAAkNIXtAAIAAENg");
	this.shape_23.setTransform(78.625,12.55);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#999199").s().p("Ar1CHIAAkNIXrAAIAAENg");
	this.shape_24.setTransform(78.725,12.55);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#999199").s().p("Ar0CHIAAkNIXpAAIAAENg");
	this.shape_25.setTransform(78.8,12.55);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#999199").s().p("ArzCHIAAkNIXnAAIAAENg");
	this.shape_26.setTransform(78.95,12.55);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#999198").s().p("AryCHIAAkNIXlAAIAAENg");
	this.shape_27.setTransform(79.025,12.55);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#999198").s().p("ArxCHIAAkNIXjAAIAAENg");
	this.shape_28.setTransform(79.1,12.55);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#999198").s().p("ArwCHIAAkNIXhAAIAAENg");
	this.shape_29.setTransform(79.25,12.55);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#999198").s().p("ArvCHIAAkNIXfAAIAAENg");
	this.shape_30.setTransform(79.325,12.55);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#999198").s().p("ArvCHIAAkNIXeAAIAAENg");
	this.shape_31.setTransform(79.4,12.55);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#999098").s().p("AruCHIAAkNIXcAAIAAENg");
	this.shape_32.setTransform(79.5,12.55);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#999098").s().p("ArtCHIAAkNIXbAAIAAENg");
	this.shape_33.setTransform(79.575,12.55);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#999098").s().p("ArsCHIAAkNIXZAAIAAENg");
	this.shape_34.setTransform(79.65,12.55);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#999098").s().p("ArrCHIAAkNIXXAAIAAENg");
	this.shape_35.setTransform(79.725,12.55);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#999098").s().p("ArrCHIAAkNIXWAAIAAENg");
	this.shape_36.setTransform(79.8,12.55);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#999098").s().p("ArqCHIAAkNIXVAAIAAENg");
	this.shape_37.setTransform(79.875,12.55);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#999098").s().p("ArpCHIAAkNIXTAAIAAENg");
	this.shape_38.setTransform(79.95,12.55);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#999098").s().p("AroCHIAAkNIXRAAIAAENg");
	this.shape_39.setTransform(80.025,12.55);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#999098").s().p("ArnCHIAAkNIXPAAIAAENg");
	this.shape_40.setTransform(80.1,12.55);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#999098").s().p("ArnCHIAAkNIXOAAIAAENg");
	this.shape_41.setTransform(80.2,12.55);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#999098").s().p("ArmCHIAAkNIXNAAIAAENg");
	this.shape_42.setTransform(80.275,12.55);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#999098").s().p("ArlCHIAAkNIXLAAIAAENg");
	this.shape_43.setTransform(80.35,12.55);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#999098").s().p("ArkCHIAAkNIXJAAIAAENg");
	this.shape_44.setTransform(80.425,12.55);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#999098").s().p("ArjCHIAAkNIXHAAIAAENg");
	this.shape_45.setTransform(80.5,12.55);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#999097").s().p("ArjCHIAAkNIXHAAIAAENg");
	this.shape_46.setTransform(80.575,12.55);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#999097").s().p("AriCHIAAkNIXFAAIAAENg");
	this.shape_47.setTransform(80.65,12.55);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#999097").s().p("ArhCHIAAkNIXDAAIAAENg");
	this.shape_48.setTransform(80.725,12.55);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#999097").s().p("ArhCHIAAkNIXCAAIAAENg");
	this.shape_49.setTransform(80.8,12.55);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#999097").s().p("ArgCHIAAkNIXBAAIAAENg");
	this.shape_50.setTransform(80.875,12.55);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#999097").s().p("ArfCHIAAkNIW/AAIAAENg");
	this.shape_51.setTransform(80.975,12.55);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#999097").s().p("AreCHIAAkNIW9AAIAAENg");
	this.shape_52.setTransform(81.05,12.55);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#999097").s().p("ArdCHIAAkNIW7AAIAAENg");
	this.shape_53.setTransform(81.125,12.55);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#998F97").s().p("ArdCHIAAkNIW6AAIAAENg");
	this.shape_54.setTransform(81.2,12.55);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#998F97").s().p("ArcCHIAAkNIW5AAIAAENg");
	this.shape_55.setTransform(81.275,12.55);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#998F97").s().p("ArbCHIAAkNIW3AAIAAENg");
	this.shape_56.setTransform(81.35,12.55);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#998F97").s().p("AraCHIAAkNIW1AAIAAENg");
	this.shape_57.setTransform(81.425,12.55);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#998F97").s().p("ArZCHIAAkNIWzAAIAAENg");
	this.shape_58.setTransform(81.5,12.55);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#998F97").s().p("ArYCHIAAkNIWxAAIAAENg");
	this.shape_59.setTransform(81.675,12.55);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#998F97").s().p("ArXCHIAAkNIWvAAIAAENg");
	this.shape_60.setTransform(81.75,12.55);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#998F97").s().p("ArWCHIAAkNIWtAAIAAENg");
	this.shape_61.setTransform(81.825,12.55);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#998F97").s().p("ArVCHIAAkNIWrAAIAAENg");
	this.shape_62.setTransform(81.9,12.55);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#998F96").s().p("ArUCHIAAkNIWpAAIAAENg");
	this.shape_63.setTransform(82.05,12.55);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#998F96").s().p("ArTCHIAAkNIWnAAIAAENg");
	this.shape_64.setTransform(82.125,12.55);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#998F96").s().p("ArTCHIAAkNIWmAAIAAENg");
	this.shape_65.setTransform(82.2,12.55);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#998F96").s().p("ArSCHIAAkNIWlAAIAAENg");
	this.shape_66.setTransform(82.275,12.55);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#998F96").s().p("ArRCHIAAkNIWjAAIAAENg");
	this.shape_67.setTransform(82.35,12.55);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#998F96").s().p("ArQCHIAAkNIWhAAIAAENg");
	this.shape_68.setTransform(82.45,12.55);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#998F96").s().p("ArPCHIAAkNIWfAAIAAENg");
	this.shape_69.setTransform(82.525,12.55);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#998F96").s().p("ArPCHIAAkNIWeAAIAAENg");
	this.shape_70.setTransform(82.6,12.55);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#998F96").s().p("ArOCHIAAkNIWdAAIAAENg");
	this.shape_71.setTransform(82.675,12.55);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#998F96").s().p("ArNCHIAAkNIWbAAIAAENg");
	this.shape_72.setTransform(82.75,12.55);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#998F96").s().p("ArMCHIAAkNIWZAAIAAENg");
	this.shape_73.setTransform(82.825,12.55);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#998F96").s().p("ArMCHIAAkNIWYAAIAAENg");
	this.shape_74.setTransform(82.9,12.55);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#998E96").s().p("ArLCHIAAkNIWXAAIAAENg");
	this.shape_75.setTransform(82.975,12.55);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#998E96").s().p("ArKCHIAAkNIWVAAIAAENg");
	this.shape_76.setTransform(83.05,12.55);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#998E96").s().p("ArJCHIAAkNIWTAAIAAENg");
	this.shape_77.setTransform(83.125,12.55);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#998E96").s().p("ArICHIAAkNIWRAAIAAENg");
	this.shape_78.setTransform(83.225,12.55);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#998E96").s().p("ArHCHIAAkNIWPAAIAAENg");
	this.shape_79.setTransform(83.3,12.55);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#998E96").s().p("ArGCHIAAkNIWNAAIAAENg");
	this.shape_80.setTransform(83.45,12.55);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#998E95").s().p("ArFCHIAAkNIWLAAIAAENg");
	this.shape_81.setTransform(83.525,12.55);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#998E95").s().p("ArECHIAAkNIWJAAIAAENg");
	this.shape_82.setTransform(83.6,12.55);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#998E95").s().p("ArDCHIAAkNIWHAAIAAENg");
	this.shape_83.setTransform(83.75,12.55);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#998E95").s().p("ArCCHIAAkNIWFAAIAAENg");
	this.shape_84.setTransform(83.825,12.55);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#998E95").s().p("ArCCHIAAkNIWEAAIAAENg");
	this.shape_85.setTransform(83.9,12.55);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#998E95").s().p("ArBCHIAAkNIWCAAIAAENg");
	this.shape_86.setTransform(84,12.55);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#998E95").s().p("ArACHIAAkNIWBAAIAAENg");
	this.shape_87.setTransform(84.075,12.55);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#998E95").s().p("Aq/CHIAAkNIV/AAIAAENg");
	this.shape_88.setTransform(84.15,12.55);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#998E95").s().p("Aq+CHIAAkNIV9AAIAAENg");
	this.shape_89.setTransform(84.225,12.55);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#998E95").s().p("Aq+CHIAAkNIV8AAIAAENg");
	this.shape_90.setTransform(84.3,12.55);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#998E95").s().p("Aq9CHIAAkNIV7AAIAAENg");
	this.shape_91.setTransform(84.375,12.55);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#998E95").s().p("Aq8CHIAAkNIV5AAIAAENg");
	this.shape_92.setTransform(84.45,12.55);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#998E95").s().p("Aq7CHIAAkNIV3AAIAAENg");
	this.shape_93.setTransform(84.525,12.55);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#998E95").s().p("Aq6CHIAAkNIV1AAIAAENg");
	this.shape_94.setTransform(84.6,12.55);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#998D95").s().p("Aq5CHIAAkNIVzAAIAAENg");
	this.shape_95.setTransform(84.775,12.55);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#998D95").s().p("Aq4CHIAAkNIVxAAIAAENg");
	this.shape_96.setTransform(84.85,12.55);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#998D95").s().p("Aq3CHIAAkNIVvAAIAAENg");
	this.shape_97.setTransform(84.925,12.55);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#998D94").s().p("Aq2CHIAAkNIVtAAIAAENg");
	this.shape_98.setTransform(85,12.55);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#998D94").s().p("Aq1CHIAAkNIVrAAIAAENg");
	this.shape_99.setTransform(85.15,12.55);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#998D94").s().p("Aq0CHIAAkNIVpAAIAAENg");
	this.shape_100.setTransform(85.225,12.55);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#998D94").s().p("Aq0CHIAAkNIVoAAIAAENg");
	this.shape_101.setTransform(85.3,12.55);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#998D94").s().p("AqzCHIAAkNIVnAAIAAENg");
	this.shape_102.setTransform(85.375,12.55);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#998D94").s().p("AqyCHIAAkNIVlAAIAAENg");
	this.shape_103.setTransform(85.475,12.55);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#998D94").s().p("AqxCHIAAkNIVjAAIAAENg");
	this.shape_104.setTransform(85.55,12.55);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#998D94").s().p("AqwCHIAAkNIVhAAIAAENg");
	this.shape_105.setTransform(85.625,12.55);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#998D94").s().p("AqwCHIAAkNIVgAAIAAENg");
	this.shape_106.setTransform(85.7,12.55);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#998D94").s().p("AqvCHIAAkNIVfAAIAAENg");
	this.shape_107.setTransform(85.775,12.55);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#998D94").s().p("AquCHIAAkNIVdAAIAAENg");
	this.shape_108.setTransform(85.85,12.55);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#998D94").s().p("AqtCHIAAkNIVbAAIAAENg");
	this.shape_109.setTransform(85.925,12.55);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#998D94").s().p("AqsCHIAAkNIVZAAIAAENg");
	this.shape_110.setTransform(86,12.55);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#998D94").s().p("AqrCHIAAkNIVXAAIAAENg");
	this.shape_111.setTransform(86.15,12.55);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#998D94").s().p("AqqCHIAAkNIVVAAIAAENg");
	this.shape_112.setTransform(86.25,12.55);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#998D94").s().p("AqpCHIAAkNIVTAAIAAENg");
	this.shape_113.setTransform(86.325,12.55);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#998D94").s().p("AqoCHIAAkNIVRAAIAAENg");
	this.shape_114.setTransform(86.4,12.55);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#998C93").s().p("AqoCHIAAkNIVRAAIAAENg");
	this.shape_115.setTransform(86.475,12.55);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#998C93").s().p("AqnCHIAAkNIVPAAIAAENg");
	this.shape_116.setTransform(86.55,12.55);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#998C93").s().p("AqmCHIAAkNIVNAAIAAENg");
	this.shape_117.setTransform(86.625,12.55);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#998C93").s().p("AqmCHIAAkNIVMAAIAAENg");
	this.shape_118.setTransform(86.7,12.55);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#998C93").s().p("AqlCHIAAkNIVLAAIAAENg");
	this.shape_119.setTransform(86.775,12.55);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#998C93").s().p("AqkCHIAAkNIVJAAIAAENg");
	this.shape_120.setTransform(86.85,12.55);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#998C93").s().p("AqjCHIAAkNIVHAAIAAENg");
	this.shape_121.setTransform(86.95,12.55);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#998C93").s().p("AqiCHIAAkNIVFAAIAAENg");
	this.shape_122.setTransform(87.025,12.55);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#998C93").s().p("AqiCHIAAkNIVEAAIAAENg");
	this.shape_123.setTransform(87.1,12.55);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#998C93").s().p("AqhCHIAAkNIVDAAIAAENg");
	this.shape_124.setTransform(87.175,12.55);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#998C93").s().p("AqgCHIAAkNIVBAAIAAENg");
	this.shape_125.setTransform(87.25,12.55);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#998C93").s().p("AqfCHIAAkNIU/AAIAAENg");
	this.shape_126.setTransform(87.325,12.55);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#998C93").s().p("AqfCHIAAkNIU+AAIAAENg");
	this.shape_127.setTransform(87.4,12.55);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#998C93").s().p("AqeCHIAAkNIU9AAIAAENg");
	this.shape_128.setTransform(87.475,12.55);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#998C93").s().p("AqdCHIAAkNIU7AAIAAENg");
	this.shape_129.setTransform(87.55,12.55);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#998C93").s().p("AqcCHIAAkNIU5AAIAAENg");
	this.shape_130.setTransform(87.625,12.55);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#998C93").s().p("AqbCHIAAkNIU3AAIAAENg");
	this.shape_131.setTransform(87.725,12.55);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#998C93").s().p("AqaCHIAAkNIU1AAIAAENg");
	this.shape_132.setTransform(87.8,12.55);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#998C93").s().p("AqZCHIAAkNIUzAAIAAENg");
	this.shape_133.setTransform(87.95,12.55);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#998C92").s().p("AqYCHIAAkNIUxAAIAAENg");
	this.shape_134.setTransform(88.025,12.55);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#998C92").s().p("AqXCHIAAkNIUvAAIAAENg");
	this.shape_135.setTransform(88.1,12.55);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#998B92").s().p("AqWCHIAAkNIUtAAIAAENg");
	this.shape_136.setTransform(88.25,12.55);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#998B92").s().p("AqVCHIAAkNIUrAAIAAENg");
	this.shape_137.setTransform(88.325,12.55);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#998B92").s().p("AqVCHIAAkNIUqAAIAAENg");
	this.shape_138.setTransform(88.4,12.55);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#998B92").s().p("AqUCHIAAkNIUoAAIAAENg");
	this.shape_139.setTransform(88.5,12.55);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#998B92").s().p("AqTCHIAAkNIUnAAIAAENg");
	this.shape_140.setTransform(88.575,12.55);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#998B92").s().p("AqSCHIAAkNIUlAAIAAENg");
	this.shape_141.setTransform(88.65,12.55);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#998B92").s().p("AqRCHIAAkNIUjAAIAAENg");
	this.shape_142.setTransform(88.725,12.55);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#998B92").s().p("AqRCHIAAkNIUiAAIAAENg");
	this.shape_143.setTransform(88.8,12.55);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#998B92").s().p("AqQCHIAAkNIUhAAIAAENg");
	this.shape_144.setTransform(88.875,12.55);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#998B92").s().p("AqPCHIAAkNIUfAAIAAENg");
	this.shape_145.setTransform(88.95,12.55);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#998B92").s().p("AqOCHIAAkNIUdAAIAAENg");
	this.shape_146.setTransform(89.025,12.55);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#998B92").s().p("AqNCHIAAkNIUbAAIAAENg");
	this.shape_147.setTransform(89.1,12.55);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#998B92").s().p("AqMCHIAAkNIUZAAIAAENg");
	this.shape_148.setTransform(89.275,12.55);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#998B92").s().p("AqLCHIAAkNIUXAAIAAENg");
	this.shape_149.setTransform(89.35,12.55);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#998B92").s().p("AqKCHIAAkNIUVAAIAAENg");
	this.shape_150.setTransform(89.425,12.55);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#998B91").s().p("AqJCHIAAkNIUTAAIAAENg");
	this.shape_151.setTransform(89.5,12.55);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#998B91").s().p("AqICHIAAkNIURAAIAAENg");
	this.shape_152.setTransform(89.65,12.55);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#998B91").s().p("AqHCHIAAkNIUPAAIAAENg");
	this.shape_153.setTransform(89.725,12.55);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#998B91").s().p("AqHCHIAAkNIUOAAIAAENg");
	this.shape_154.setTransform(89.8,12.55);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#998B91").s().p("AqGCHIAAkNIUNAAIAAENg");
	this.shape_155.setTransform(89.875,12.55);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#998B91").s().p("AqFCHIAAkNIULAAIAAENg");
	this.shape_156.setTransform(89.975,12.55);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#998A91").s().p("AqECHIAAkNIUJAAIAAENg");
	this.shape_157.setTransform(90.05,12.55);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#998A91").s().p("AqDCHIAAkNIUHAAIAAENg");
	this.shape_158.setTransform(90.125,12.55);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#998A91").s().p("AqDCHIAAkNIUGAAIAAENg");
	this.shape_159.setTransform(90.2,12.55);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#998A91").s().p("AqCCHIAAkNIUFAAIAAENg");
	this.shape_160.setTransform(90.275,12.55);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#998A91").s().p("AqBCHIAAkNIUDAAIAAENg");
	this.shape_161.setTransform(90.35,12.55);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#998A91").s().p("AqACHIAAkNIUBAAIAAENg");
	this.shape_162.setTransform(90.425,12.55);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#998A91").s().p("Ap/CHIAAkNIT/AAIAAENg");
	this.shape_163.setTransform(90.5,12.55);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#998A91").s().p("Ap+CHIAAkNIT9AAIAAENg");
	this.shape_164.setTransform(90.65,12.55);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#998A91").s().p("Ap9CHIAAkNIT7AAIAAENg");
	this.shape_165.setTransform(90.75,12.55);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#998A91").s().p("Ap8CHIAAkNIT5AAIAAENg");
	this.shape_166.setTransform(90.825,12.55);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#998A91").s().p("Ap7CHIAAkNIT3AAIAAENg");
	this.shape_167.setTransform(90.9,12.55);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#998A90").s().p("Ap7CHIAAkNIT3AAIAAENg");
	this.shape_168.setTransform(90.975,12.55);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#998A90").s().p("Ap6CHIAAkNIT1AAIAAENg");
	this.shape_169.setTransform(91.05,12.55);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#998A90").s().p("Ap5CHIAAkNITzAAIAAENg");
	this.shape_170.setTransform(91.125,12.55);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#998A90").s().p("Ap5CHIAAkNITyAAIAAENg");
	this.shape_171.setTransform(91.2,12.55);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#998A90").s().p("Ap4CHIAAkNITxAAIAAENg");
	this.shape_172.setTransform(91.275,12.55);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#998A90").s().p("Ap3CHIAAkNITvAAIAAENg");
	this.shape_173.setTransform(91.35,12.55);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#998A90").s().p("Ap2CHIAAkNITtAAIAAENg");
	this.shape_174.setTransform(91.45,12.55);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("#998A90").s().p("Ap1CHIAAkNITrAAIAAENg");
	this.shape_175.setTransform(91.525,12.55);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("#998A90").s().p("Ap1CHIAAkNITqAAIAAENg");
	this.shape_176.setTransform(91.6,12.55);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("#998A90").s().p("Ap0CHIAAkNITpAAIAAENg");
	this.shape_177.setTransform(91.675,12.55);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("#998990").s().p("ApzCHIAAkNITnAAIAAENg");
	this.shape_178.setTransform(91.75,12.55);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f("#998990").s().p("ApyCHIAAkNITlAAIAAENg");
	this.shape_179.setTransform(91.825,12.55);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f("#998990").s().p("ApyCHIAAkNITkAAIAAENg");
	this.shape_180.setTransform(91.9,12.55);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f("#998990").s().p("ApxCHIAAkNITjAAIAAENg");
	this.shape_181.setTransform(91.975,12.55);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f("#998990").s().p("ApwCHIAAkNIThAAIAAENg");
	this.shape_182.setTransform(92.05,12.55);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f("#998990").s().p("ApvCHIAAkNITfAAIAAENg");
	this.shape_183.setTransform(92.125,12.55);

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f("#998990").s().p("ApuCHIAAkNITdAAIAAENg");
	this.shape_184.setTransform(92.225,12.55);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f("#998990").s().p("AptCHIAAkNITbAAIAAENg");
	this.shape_185.setTransform(92.3,12.55);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f("#99898F").s().p("ApsCHIAAkNITZAAIAAENg");
	this.shape_186.setTransform(92.45,12.55);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f("#99898F").s().p("AprCHIAAkNITXAAIAAENg");
	this.shape_187.setTransform(92.525,12.55);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f("#99898F").s().p("ApqCHIAAkNITVAAIAAENg");
	this.shape_188.setTransform(92.6,12.55);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f("#99898F").s().p("AppCHIAAkNITTAAIAAENg");
	this.shape_189.setTransform(92.75,12.55);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f("#99898F").s().p("ApoCHIAAkNITRAAIAAENg");
	this.shape_190.setTransform(92.825,12.55);

	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.f("#99898F").s().p("ApoCHIAAkNITQAAIAAENg");
	this.shape_191.setTransform(92.9,12.55);

	this.shape_192 = new cjs.Shape();
	this.shape_192.graphics.f("#99898F").s().p("ApnCHIAAkNITOAAIAAENg");
	this.shape_192.setTransform(93,12.55);

	this.shape_193 = new cjs.Shape();
	this.shape_193.graphics.f("#99898F").s().p("ApmCHIAAkNITNAAIAAENg");
	this.shape_193.setTransform(93.075,12.55);

	this.shape_194 = new cjs.Shape();
	this.shape_194.graphics.f("#99898F").s().p("AplCHIAAkNITLAAIAAENg");
	this.shape_194.setTransform(93.15,12.55);

	this.shape_195 = new cjs.Shape();
	this.shape_195.graphics.f("#99898F").s().p("ApkCHIAAkNITJAAIAAENg");
	this.shape_195.setTransform(93.225,12.55);

	this.shape_196 = new cjs.Shape();
	this.shape_196.graphics.f("#99898F").s().p("ApkCHIAAkNITIAAIAAENg");
	this.shape_196.setTransform(93.3,12.55);

	this.shape_197 = new cjs.Shape();
	this.shape_197.graphics.f("#99898F").s().p("ApjCHIAAkNITHAAIAAENg");
	this.shape_197.setTransform(93.375,12.55);

	this.shape_198 = new cjs.Shape();
	this.shape_198.graphics.f("#99898F").s().p("ApiCHIAAkNITFAAIAAENg");
	this.shape_198.setTransform(93.45,12.55);

	this.shape_199 = new cjs.Shape();
	this.shape_199.graphics.f("#99888F").s().p("AphCHIAAkNITDAAIAAENg");
	this.shape_199.setTransform(93.525,12.55);

	this.shape_200 = new cjs.Shape();
	this.shape_200.graphics.f("#99888F").s().p("ApgCHIAAkNITBAAIAAENg");
	this.shape_200.setTransform(93.6,12.55);

	this.shape_201 = new cjs.Shape();
	this.shape_201.graphics.f("#99888F").s().p("ApfCHIAAkNIS/AAIAAENg");
	this.shape_201.setTransform(93.775,12.55);

	this.shape_202 = new cjs.Shape();
	this.shape_202.graphics.f("#99888F").s().p("ApeCHIAAkNIS9AAIAAENg");
	this.shape_202.setTransform(93.85,12.55);

	this.shape_203 = new cjs.Shape();
	this.shape_203.graphics.f("#99888E").s().p("ApdCHIAAkNIS7AAIAAENg");
	this.shape_203.setTransform(93.925,12.55);

	this.shape_204 = new cjs.Shape();
	this.shape_204.graphics.f("#99888E").s().p("ApcCHIAAkNIS5AAIAAENg");
	this.shape_204.setTransform(94,12.55);

	this.shape_205 = new cjs.Shape();
	this.shape_205.graphics.f("#99888E").s().p("ApbCHIAAkNIS3AAIAAENg");
	this.shape_205.setTransform(94.15,12.55);

	this.shape_206 = new cjs.Shape();
	this.shape_206.graphics.f("#99888E").s().p("ApaCHIAAkNIS1AAIAAENg");
	this.shape_206.setTransform(94.225,12.55);

	this.shape_207 = new cjs.Shape();
	this.shape_207.graphics.f("#99888E").s().p("ApaCHIAAkNIS0AAIAAENg");
	this.shape_207.setTransform(94.3,12.55);

	this.shape_208 = new cjs.Shape();
	this.shape_208.graphics.f("#99888E").s().p("ApZCHIAAkNISzAAIAAENg");
	this.shape_208.setTransform(94.375,12.55);

	this.shape_209 = new cjs.Shape();
	this.shape_209.graphics.f("#99888E").s().p("ApYCHIAAkNISxAAIAAENg");
	this.shape_209.setTransform(94.45,12.55);

	this.shape_210 = new cjs.Shape();
	this.shape_210.graphics.f("#99888E").s().p("ApXCHIAAkNISvAAIAAENg");
	this.shape_210.setTransform(94.55,12.55);

	this.shape_211 = new cjs.Shape();
	this.shape_211.graphics.f("#99888E").s().p("ApWCHIAAkNIStAAIAAENg");
	this.shape_211.setTransform(94.625,12.55);

	this.shape_212 = new cjs.Shape();
	this.shape_212.graphics.f("#99888E").s().p("ApWCHIAAkNISsAAIAAENg");
	this.shape_212.setTransform(94.7,12.55);

	this.shape_213 = new cjs.Shape();
	this.shape_213.graphics.f("#99888E").s().p("ApVCHIAAkNISrAAIAAENg");
	this.shape_213.setTransform(94.775,12.55);

	this.shape_214 = new cjs.Shape();
	this.shape_214.graphics.f("#99888E").s().p("ApUCHIAAkNISpAAIAAENg");
	this.shape_214.setTransform(94.85,12.55);

	this.shape_215 = new cjs.Shape();
	this.shape_215.graphics.f("#99888E").s().p("ApTCHIAAkNISnAAIAAENg");
	this.shape_215.setTransform(94.925,12.55);

	this.shape_216 = new cjs.Shape();
	this.shape_216.graphics.f("#99888E").s().p("ApSCHIAAkNISlAAIAAENg");
	this.shape_216.setTransform(95,12.55);

	this.shape_217 = new cjs.Shape();
	this.shape_217.graphics.f("#99888E").s().p("ApRCHIAAkNISjAAIAAENg");
	this.shape_217.setTransform(95.15,12.55);

	this.shape_218 = new cjs.Shape();
	this.shape_218.graphics.f("#99888E").s().p("ApQCHIAAkNIShAAIAAENg");
	this.shape_218.setTransform(95.25,12.55);

	this.shape_219 = new cjs.Shape();
	this.shape_219.graphics.f("#99878E").s().p("ApPCHIAAkNISfAAIAAENg");
	this.shape_219.setTransform(95.325,12.55);

	this.shape_220 = new cjs.Shape();
	this.shape_220.graphics.f("#99878E").s().p("ApOCHIAAkNISdAAIAAENg");
	this.shape_220.setTransform(95.4,12.55);

	this.shape_221 = new cjs.Shape();
	this.shape_221.graphics.f("#99878D").s().p("ApOCHIAAkNISdAAIAAENg");
	this.shape_221.setTransform(95.475,12.55);

	this.shape_222 = new cjs.Shape();
	this.shape_222.graphics.f("#99878D").s().p("ApNCHIAAkNISbAAIAAENg");
	this.shape_222.setTransform(95.55,12.55);

	this.shape_223 = new cjs.Shape();
	this.shape_223.graphics.f("#99878D").s().p("ApMCHIAAkNISZAAIAAENg");
	this.shape_223.setTransform(95.625,12.55);

	this.shape_224 = new cjs.Shape();
	this.shape_224.graphics.f("#99878D").s().p("ApMCHIAAkNISYAAIAAENg");
	this.shape_224.setTransform(95.7,12.55);

	this.shape_225 = new cjs.Shape();
	this.shape_225.graphics.f("#99878D").s().p("ApLCHIAAkNISXAAIAAENg");
	this.shape_225.setTransform(95.775,12.55);

	this.shape_226 = new cjs.Shape();
	this.shape_226.graphics.f("#99878D").s().p("ApKCHIAAkNISVAAIAAENg");
	this.shape_226.setTransform(95.85,12.55);

	this.shape_227 = new cjs.Shape();
	this.shape_227.graphics.f("#99878D").s().p("ApJCHIAAkNISTAAIAAENg");
	this.shape_227.setTransform(95.925,12.55);

	this.shape_228 = new cjs.Shape();
	this.shape_228.graphics.f("#99878D").s().p("ApICHIAAkNISRAAIAAENg");
	this.shape_228.setTransform(96.025,12.55);

	this.shape_229 = new cjs.Shape();
	this.shape_229.graphics.f("#99878D").s().p("ApICHIAAkNISQAAIAAENg");
	this.shape_229.setTransform(96.1,12.55);

	this.shape_230 = new cjs.Shape();
	this.shape_230.graphics.f("#99878D").s().p("ApHCHIAAkNISPAAIAAENg");
	this.shape_230.setTransform(96.175,12.55);

	this.shape_231 = new cjs.Shape();
	this.shape_231.graphics.f("#99878D").s().p("ApGCHIAAkNISNAAIAAENg");
	this.shape_231.setTransform(96.25,12.55);

	this.shape_232 = new cjs.Shape();
	this.shape_232.graphics.f("#99878D").s().p("ApFCHIAAkNISLAAIAAENg");
	this.shape_232.setTransform(96.325,12.55);

	this.shape_233 = new cjs.Shape();
	this.shape_233.graphics.f("#99878D").s().p("ApFCHIAAkNISKAAIAAENg");
	this.shape_233.setTransform(96.4,12.55);

	this.shape_234 = new cjs.Shape();
	this.shape_234.graphics.f("#99878D").s().p("ApECHIAAkNISJAAIAAENg");
	this.shape_234.setTransform(96.475,12.55);

	this.shape_235 = new cjs.Shape();
	this.shape_235.graphics.f("#99878D").s().p("ApDCHIAAkNISHAAIAAENg");
	this.shape_235.setTransform(96.55,12.55);

	this.shape_236 = new cjs.Shape();
	this.shape_236.graphics.f("#99878D").s().p("ApCCHIAAkNISFAAIAAENg");
	this.shape_236.setTransform(96.625,12.55);

	this.shape_237 = new cjs.Shape();
	this.shape_237.graphics.f("#99878D").s().p("ApBCHIAAkNISDAAIAAENg");
	this.shape_237.setTransform(96.725,12.55);

	this.shape_238 = new cjs.Shape();
	this.shape_238.graphics.f("#99878D").s().p("ApACHIAAkNISBAAIAAENg");
	this.shape_238.setTransform(96.8,12.55);

	this.shape_239 = new cjs.Shape();
	this.shape_239.graphics.f("#99878C").s().p("Ao/CHIAAkNIR/AAIAAENg");
	this.shape_239.setTransform(96.95,12.55);

	this.shape_240 = new cjs.Shape();
	this.shape_240.graphics.f("#99878C").s().p("Ao+CHIAAkNIR9AAIAAENg");
	this.shape_240.setTransform(97.025,12.55);

	this.shape_241 = new cjs.Shape();
	this.shape_241.graphics.f("#99868C").s().p("Ao9CHIAAkNIR7AAIAAENg");
	this.shape_241.setTransform(97.1,12.55);

	this.shape_242 = new cjs.Shape();
	this.shape_242.graphics.f("#99868C").s().p("Ao8CHIAAkNIR5AAIAAENg");
	this.shape_242.setTransform(97.25,12.55);

	this.shape_243 = new cjs.Shape();
	this.shape_243.graphics.f("#99868C").s().p("Ao7CHIAAkNIR3AAIAAENg");
	this.shape_243.setTransform(97.325,12.55);

	this.shape_244 = new cjs.Shape();
	this.shape_244.graphics.f("#99868C").s().p("Ao7CHIAAkNIR2AAIAAENg");
	this.shape_244.setTransform(97.4,12.55);

	this.shape_245 = new cjs.Shape();
	this.shape_245.graphics.f("#99868C").s().p("Ao6CHIAAkNIR0AAIAAENg");
	this.shape_245.setTransform(97.5,12.55);

	this.shape_246 = new cjs.Shape();
	this.shape_246.graphics.f("#99868C").s().p("Ao5CHIAAkNIRzAAIAAENg");
	this.shape_246.setTransform(97.575,12.55);

	this.shape_247 = new cjs.Shape();
	this.shape_247.graphics.f("#99868C").s().p("Ao4CHIAAkNIRxAAIAAENg");
	this.shape_247.setTransform(97.65,12.55);

	this.shape_248 = new cjs.Shape();
	this.shape_248.graphics.f("#99868C").s().p("Ao3CHIAAkNIRvAAIAAENg");
	this.shape_248.setTransform(97.725,12.55);

	this.shape_249 = new cjs.Shape();
	this.shape_249.graphics.f("#99868C").s().p("Ao3CHIAAkNIRuAAIAAENg");
	this.shape_249.setTransform(97.8,12.55);

	this.shape_250 = new cjs.Shape();
	this.shape_250.graphics.f("#99868C").s().p("Ao2CHIAAkNIRtAAIAAENg");
	this.shape_250.setTransform(97.875,12.55);

	this.shape_251 = new cjs.Shape();
	this.shape_251.graphics.f("#99868C").s().p("Ao1CHIAAkNIRrAAIAAENg");
	this.shape_251.setTransform(97.95,12.55);

	this.shape_252 = new cjs.Shape();
	this.shape_252.graphics.f("#99868C").s().p("Ao0CHIAAkNIRpAAIAAENg");
	this.shape_252.setTransform(98.025,12.55);

	this.shape_253 = new cjs.Shape();
	this.shape_253.graphics.f("#99868C").s().p("AozCHIAAkNIRnAAIAAENg");
	this.shape_253.setTransform(98.1,12.55);

	this.shape_254 = new cjs.Shape();
	this.shape_254.graphics.f("#99868C").s().p("AoyCHIAAkNIRlAAIAAENg");
	this.shape_254.setTransform(98.275,12.55);

	this.shape_255 = new cjs.Shape();
	this.shape_255.graphics.f("#99868C").s().p("AoxCHIAAkNIRjAAIAAENg");
	this.shape_255.setTransform(98.35,12.55);

	this.shape_256 = new cjs.Shape();
	this.shape_256.graphics.f("#99868B").s().p("AowCHIAAkNIRhAAIAAENg");
	this.shape_256.setTransform(98.425,12.55);

	this.shape_257 = new cjs.Shape();
	this.shape_257.graphics.f("#99868B").s().p("AovCHIAAkNIRfAAIAAENg");
	this.shape_257.setTransform(98.5,12.55);

	this.shape_258 = new cjs.Shape();
	this.shape_258.graphics.f("#99868B").s().p("AouCHIAAkNIRdAAIAAENg");
	this.shape_258.setTransform(98.65,12.55);

	this.shape_259 = new cjs.Shape();
	this.shape_259.graphics.f("#99868B").s().p("AotCHIAAkNIRbAAIAAENg");
	this.shape_259.setTransform(98.725,12.55);

	this.shape_260 = new cjs.Shape();
	this.shape_260.graphics.f("#99858B").s().p("AotCHIAAkNIRaAAIAAENg");
	this.shape_260.setTransform(98.8,12.55);

	this.shape_261 = new cjs.Shape();
	this.shape_261.graphics.f("#99858B").s().p("AosCHIAAkNIRZAAIAAENg");
	this.shape_261.setTransform(98.875,12.55);

	this.shape_262 = new cjs.Shape();
	this.shape_262.graphics.f("#99858B").s().p("AorCHIAAkNIRXAAIAAENg");
	this.shape_262.setTransform(98.95,12.55);

	this.shape_263 = new cjs.Shape();
	this.shape_263.graphics.f("#99858B").s().p("AoqCHIAAkNIRVAAIAAENg");
	this.shape_263.setTransform(99.05,12.55);

	this.shape_264 = new cjs.Shape();
	this.shape_264.graphics.f("#99858B").s().p("AopCHIAAkNIRTAAIAAENg");
	this.shape_264.setTransform(99.125,12.55);

	this.shape_265 = new cjs.Shape();
	this.shape_265.graphics.f("#99858B").s().p("AopCHIAAkNIRSAAIAAENg");
	this.shape_265.setTransform(99.2,12.55);

	this.shape_266 = new cjs.Shape();
	this.shape_266.graphics.f("#99858B").s().p("AooCHIAAkNIRRAAIAAENg");
	this.shape_266.setTransform(99.275,12.55);

	this.shape_267 = new cjs.Shape();
	this.shape_267.graphics.f("#99858B").s().p("AonCHIAAkNIRPAAIAAENg");
	this.shape_267.setTransform(99.35,12.55);

	this.shape_268 = new cjs.Shape();
	this.shape_268.graphics.f("#99858B").s().p("AomCHIAAkNIRNAAIAAENg");
	this.shape_268.setTransform(99.425,12.55);

	this.shape_269 = new cjs.Shape();
	this.shape_269.graphics.f("#99858B").s().p("AolCHIAAkNIRLAAIAAENg");
	this.shape_269.setTransform(99.5,12.55);

	this.shape_270 = new cjs.Shape();
	this.shape_270.graphics.f("#99858B").s().p("AokCHIAAkNIRJAAIAAENg");
	this.shape_270.setTransform(99.65,12.55);

	this.shape_271 = new cjs.Shape();
	this.shape_271.graphics.f("#99858B").s().p("AojCHIAAkNIRHAAIAAENg");
	this.shape_271.setTransform(99.75,12.55);

	this.shape_272 = new cjs.Shape();
	this.shape_272.graphics.f("#99858B").s().p("AoiCHIAAkNIRFAAIAAENg");
	this.shape_272.setTransform(99.825,12.55);

	this.shape_273 = new cjs.Shape();
	this.shape_273.graphics.f("#99858A").s().p("AohCHIAAkNIRDAAIAAENg");
	this.shape_273.setTransform(99.9,12.55);

	this.shape_274 = new cjs.Shape();
	this.shape_274.graphics.f("#99858A").s().p("AogCHIAAkNIRBAAIAAENg");
	this.shape_274.setTransform(100.05,12.55);

	this.shape_275 = new cjs.Shape();
	this.shape_275.graphics.f("#99858A").s().p("AofCHIAAkNIQ/AAIAAENg");
	this.shape_275.setTransform(100.125,12.55);

	this.shape_276 = new cjs.Shape();
	this.shape_276.graphics.f("#99858A").s().p("AofCHIAAkNIQ+AAIAAENg");
	this.shape_276.setTransform(100.2,12.55);

	this.shape_277 = new cjs.Shape();
	this.shape_277.graphics.f("#99858A").s().p("AoeCHIAAkNIQ9AAIAAENg");
	this.shape_277.setTransform(100.275,12.55);

	this.shape_278 = new cjs.Shape();
	this.shape_278.graphics.f("#99858A").s().p("AodCHIAAkNIQ7AAIAAENg");
	this.shape_278.setTransform(100.35,12.55);

	this.shape_279 = new cjs.Shape();
	this.shape_279.graphics.f("#99858A").s().p("AocCHIAAkNIQ5AAIAAENg");
	this.shape_279.setTransform(100.425,12.55);

	this.shape_280 = new cjs.Shape();
	this.shape_280.graphics.f("#99858A").s().p("AobCHIAAkNIQ3AAIAAENg");
	this.shape_280.setTransform(100.525,12.55);

	this.shape_281 = new cjs.Shape();
	this.shape_281.graphics.f("#99848A").s().p("AobCHIAAkNIQ2AAIAAENg");
	this.shape_281.setTransform(100.6,12.55);

	this.shape_282 = new cjs.Shape();
	this.shape_282.graphics.f("#99848A").s().p("AoaCHIAAkNIQ1AAIAAENg");
	this.shape_282.setTransform(100.675,12.55);

	this.shape_283 = new cjs.Shape();
	this.shape_283.graphics.f("#99848A").s().p("AoZCHIAAkNIQzAAIAAENg");
	this.shape_283.setTransform(100.75,12.55);

	this.shape_284 = new cjs.Shape();
	this.shape_284.graphics.f("#99848A").s().p("AoYCHIAAkNIQxAAIAAENg");
	this.shape_284.setTransform(100.825,12.55);

	this.shape_285 = new cjs.Shape();
	this.shape_285.graphics.f("#99848A").s().p("AoYCHIAAkNIQwAAIAAENg");
	this.shape_285.setTransform(100.9,12.55);

	this.shape_286 = new cjs.Shape();
	this.shape_286.graphics.f("#99848A").s().p("AoXCHIAAkNIQvAAIAAENg");
	this.shape_286.setTransform(100.975,12.55);

	this.shape_287 = new cjs.Shape();
	this.shape_287.graphics.f("#99848A").s().p("AoWCHIAAkNIQtAAIAAENg");
	this.shape_287.setTransform(101.05,12.55);

	this.shape_288 = new cjs.Shape();
	this.shape_288.graphics.f("#99848A").s().p("AoVCHIAAkNIQrAAIAAENg");
	this.shape_288.setTransform(101.125,12.55);

	this.shape_289 = new cjs.Shape();
	this.shape_289.graphics.f("#99848A").s().p("AoUCHIAAkNIQpAAIAAENg");
	this.shape_289.setTransform(101.225,12.55);

	this.shape_290 = new cjs.Shape();
	this.shape_290.graphics.f("#99848A").s().p("AoTCHIAAkNIQnAAIAAENg");
	this.shape_290.setTransform(101.3,12.55);

	this.shape_291 = new cjs.Shape();
	this.shape_291.graphics.f("#998489").s().p("AoTCHIAAkNIQnAAIAAENg");
	this.shape_291.setTransform(101.375,12.55);

	this.shape_292 = new cjs.Shape();
	this.shape_292.graphics.f("#998489").s().p("AoSCHIAAkNIQlAAIAAENg");
	this.shape_292.setTransform(101.45,12.55);

	this.shape_293 = new cjs.Shape();
	this.shape_293.graphics.f("#998489").s().p("AoRCHIAAkNIQjAAIAAENg");
	this.shape_293.setTransform(101.525,12.55);

	this.shape_294 = new cjs.Shape();
	this.shape_294.graphics.f("#998489").s().p("AoQCHIAAkNIQhAAIAAENg");
	this.shape_294.setTransform(101.6,12.55);

	this.shape_295 = new cjs.Shape();
	this.shape_295.graphics.f("#998489").s().p("AoPCHIAAkNIQfAAIAAENg");
	this.shape_295.setTransform(101.75,12.55);

	this.shape_296 = new cjs.Shape();
	this.shape_296.graphics.f("#998489").s().p("AoOCHIAAkNIQdAAIAAENg");
	this.shape_296.setTransform(101.825,12.55);

	this.shape_297 = new cjs.Shape();
	this.shape_297.graphics.f("#998489").s().p("AoOCHIAAkNIQcAAIAAENg");
	this.shape_297.setTransform(101.9,12.55);

	this.shape_298 = new cjs.Shape();
	this.shape_298.graphics.f("#998489").s().p("AoNCHIAAkNIQaAAIAAENg");
	this.shape_298.setTransform(102,12.55);

	this.shape_299 = new cjs.Shape();
	this.shape_299.graphics.f("#998489").s().p("AoMCHIAAkNIQZAAIAAENg");
	this.shape_299.setTransform(102.075,12.55);

	this.shape_300 = new cjs.Shape();
	this.shape_300.graphics.f("#998489").s().p("AoLCHIAAkNIQXAAIAAENg");
	this.shape_300.setTransform(102.15,12.55);

	this.shape_301 = new cjs.Shape();
	this.shape_301.graphics.f("#998489").s().p("AoKCHIAAkNIQVAAIAAENg");
	this.shape_301.setTransform(102.225,12.55);

	this.shape_302 = new cjs.Shape();
	this.shape_302.graphics.f("#998489").s().p("AoKCHIAAkNIQUAAIAAENg");
	this.shape_302.setTransform(102.3,12.55);

	this.shape_303 = new cjs.Shape();
	this.shape_303.graphics.f("#998389").s().p("AoJCHIAAkNIQTAAIAAENg");
	this.shape_303.setTransform(102.375,12.55);

	this.shape_304 = new cjs.Shape();
	this.shape_304.graphics.f("#998389").s().p("AoICHIAAkNIQRAAIAAENg");
	this.shape_304.setTransform(102.45,12.55);

	this.shape_305 = new cjs.Shape();
	this.shape_305.graphics.f("#998389").s().p("AoHCHIAAkNIQPAAIAAENg");
	this.shape_305.setTransform(102.525,12.55);

	this.shape_306 = new cjs.Shape();
	this.shape_306.graphics.f("#998389").s().p("AoGCHIAAkNIQNAAIAAENg");
	this.shape_306.setTransform(102.6,12.55);

	this.shape_307 = new cjs.Shape();
	this.shape_307.graphics.f("#998389").s().p("AoFCHIAAkNIQLAAIAAENg");
	this.shape_307.setTransform(102.775,12.55);

	this.shape_308 = new cjs.Shape();
	this.shape_308.graphics.f("#998389").s().p("AoECHIAAkNIQJAAIAAENg");
	this.shape_308.setTransform(102.85,12.55);

	this.shape_309 = new cjs.Shape();
	this.shape_309.graphics.f("#998388").s().p("AoDCHIAAkNIQHAAIAAENg");
	this.shape_309.setTransform(102.925,12.55);

	this.shape_310 = new cjs.Shape();
	this.shape_310.graphics.f("#998388").s().p("AoCCHIAAkNIQFAAIAAENg");
	this.shape_310.setTransform(103,12.55);

	this.shape_311 = new cjs.Shape();
	this.shape_311.graphics.f("#998388").s().p("AoBCHIAAkNIQDAAIAAENg");
	this.shape_311.setTransform(103.15,12.55);

	this.shape_312 = new cjs.Shape();
	this.shape_312.graphics.f("#998388").s().p("AoACHIAAkNIQBAAIAAENg");
	this.shape_312.setTransform(103.225,12.55);

	this.shape_313 = new cjs.Shape();
	this.shape_313.graphics.f("#998388").s().p("AoACHIAAkNIQAAAIAAENg");
	this.shape_313.setTransform(103.3,12.55);

	this.shape_314 = new cjs.Shape();
	this.shape_314.graphics.f("#998388").s().p("An/CHIAAkNIP/AAIAAENg");
	this.shape_314.setTransform(103.375,12.55);

	this.shape_315 = new cjs.Shape();
	this.shape_315.graphics.f("#998388").s().p("An+CHIAAkNIP9AAIAAENg");
	this.shape_315.setTransform(103.45,12.55);

	this.shape_316 = new cjs.Shape();
	this.shape_316.graphics.f("#998388").s().p("An9CHIAAkNIP7AAIAAENg");
	this.shape_316.setTransform(103.55,12.55);

	this.shape_317 = new cjs.Shape();
	this.shape_317.graphics.f("#998388").s().p("An8CHIAAkNIP5AAIAAENg");
	this.shape_317.setTransform(103.625,12.55);

	this.shape_318 = new cjs.Shape();
	this.shape_318.graphics.f("#998388").s().p("An8CHIAAkNIP4AAIAAENg");
	this.shape_318.setTransform(103.7,12.55);

	this.shape_319 = new cjs.Shape();
	this.shape_319.graphics.f("#998388").s().p("An7CHIAAkNIP3AAIAAENg");
	this.shape_319.setTransform(103.775,12.55);

	this.shape_320 = new cjs.Shape();
	this.shape_320.graphics.f("#998388").s().p("An6CHIAAkNIP1AAIAAENg");
	this.shape_320.setTransform(103.85,12.55);

	this.shape_321 = new cjs.Shape();
	this.shape_321.graphics.f("#998388").s().p("An5CHIAAkNIPzAAIAAENg");
	this.shape_321.setTransform(103.925,12.55);

	this.shape_322 = new cjs.Shape();
	this.shape_322.graphics.f("#998388").s().p("An4CHIAAkNIPxAAIAAENg");
	this.shape_322.setTransform(104,12.55);

	this.shape_323 = new cjs.Shape();
	this.shape_323.graphics.f("#998288").s().p("An4CHIAAkNIPxAAIAAENg");
	this.shape_323.setTransform(104.075,12.55);

	this.shape_324 = new cjs.Shape();
	this.shape_324.graphics.f("#998288").s().p("An3CHIAAkNIPvAAIAAENg");
	this.shape_324.setTransform(104.15,12.55);

	this.shape_325 = new cjs.Shape();
	this.shape_325.graphics.f("#998288").s().p("An2CHIAAkNIPtAAIAAENg");
	this.shape_325.setTransform(104.25,12.55);

	this.shape_326 = new cjs.Shape();
	this.shape_326.graphics.f("#998288").s().p("An1CHIAAkNIPrAAIAAENg");
	this.shape_326.setTransform(104.325,12.55);

	this.shape_327 = new cjs.Shape();
	this.shape_327.graphics.f("#998287").s().p("An0CHIAAkNIPpAAIAAENg");
	this.shape_327.setTransform(104.4,12.55);

	this.shape_328 = new cjs.Shape();
	this.shape_328.graphics.f("#998287").s().p("AnzCHIAAkNIPnAAIAAENg");
	this.shape_328.setTransform(104.55,12.55);

	this.shape_329 = new cjs.Shape();
	this.shape_329.graphics.f("#998287").s().p("AnyCHIAAkNIPlAAIAAENg");
	this.shape_329.setTransform(104.625,12.55);

	this.shape_330 = new cjs.Shape();
	this.shape_330.graphics.f("#998287").s().p("AnyCHIAAkNIPkAAIAAENg");
	this.shape_330.setTransform(104.7,12.55);

	this.shape_331 = new cjs.Shape();
	this.shape_331.graphics.f("#998287").s().p("AnxCHIAAkNIPjAAIAAENg");
	this.shape_331.setTransform(104.775,12.55);

	this.shape_332 = new cjs.Shape();
	this.shape_332.graphics.f("#998287").s().p("AnwCHIAAkNIPhAAIAAENg");
	this.shape_332.setTransform(104.85,12.55);

	this.shape_333 = new cjs.Shape();
	this.shape_333.graphics.f("#998287").s().p("AnvCHIAAkNIPfAAIAAENg");
	this.shape_333.setTransform(104.925,12.55);

	this.shape_334 = new cjs.Shape();
	this.shape_334.graphics.f("#998287").s().p("AnuCHIAAkNIPdAAIAAENg");
	this.shape_334.setTransform(105.025,12.55);

	this.shape_335 = new cjs.Shape();
	this.shape_335.graphics.f("#998287").s().p("AnuCHIAAkNIPcAAIAAENg");
	this.shape_335.setTransform(105.1,12.55);

	this.shape_336 = new cjs.Shape();
	this.shape_336.graphics.f("#998287").s().p("AntCHIAAkNIPbAAIAAENg");
	this.shape_336.setTransform(105.175,12.55);

	this.shape_337 = new cjs.Shape();
	this.shape_337.graphics.f("#998287").s().p("AnsCHIAAkNIPZAAIAAENg");
	this.shape_337.setTransform(105.25,12.55);

	this.shape_338 = new cjs.Shape();
	this.shape_338.graphics.f("#998287").s().p("AnrCHIAAkNIPXAAIAAENg");
	this.shape_338.setTransform(105.325,12.55);

	this.shape_339 = new cjs.Shape();
	this.shape_339.graphics.f("#998287").s().p("AnrCHIAAkNIPWAAIAAENg");
	this.shape_339.setTransform(105.4,12.55);

	this.shape_340 = new cjs.Shape();
	this.shape_340.graphics.f("#998287").s().p("AnqCHIAAkNIPVAAIAAENg");
	this.shape_340.setTransform(105.475,12.55);

	this.shape_341 = new cjs.Shape();
	this.shape_341.graphics.f("#998287").s().p("AnpCHIAAkNIPTAAIAAENg");
	this.shape_341.setTransform(105.55,12.55);

	this.shape_342 = new cjs.Shape();
	this.shape_342.graphics.f("#998287").s().p("AnoCHIAAkNIPRAAIAAENg");
	this.shape_342.setTransform(105.625,12.55);

	this.shape_343 = new cjs.Shape();
	this.shape_343.graphics.f("#998287").s().p("AnnCHIAAkNIPPAAIAAENg");
	this.shape_343.setTransform(105.7,12.55);

	this.shape_344 = new cjs.Shape();
	this.shape_344.graphics.f("#998287").s().p("AnmCHIAAkNIPNAAIAAENg");
	this.shape_344.setTransform(105.8,12.55);

	this.shape_345 = new cjs.Shape();
	this.shape_345.graphics.f("#998186").s().p("AnmCHIAAkNIPNAAIAAENg");
	this.shape_345.setTransform(105.875,12.55);

	this.shape_346 = new cjs.Shape();
	this.shape_346.graphics.f("#998186").s().p("AnlCHIAAkNIPLAAIAAENg");
	this.shape_346.setTransform(105.95,12.55);

	this.shape_347 = new cjs.Shape();
	this.shape_347.graphics.f("#998186").s().p("AnkCHIAAkNIPJAAIAAENg");
	this.shape_347.setTransform(106.025,12.55);

	this.shape_348 = new cjs.Shape();
	this.shape_348.graphics.f("#998186").s().p("AnjCHIAAkNIPHAAIAAENg");
	this.shape_348.setTransform(106.1,12.55);

	this.shape_349 = new cjs.Shape();
	this.shape_349.graphics.f("#998186").s().p("AniCHIAAkNIPFAAIAAENg");
	this.shape_349.setTransform(106.25,12.55);

	this.shape_350 = new cjs.Shape();
	this.shape_350.graphics.f("#998186").s().p("AnhCHIAAkNIPDAAIAAENg");
	this.shape_350.setTransform(106.325,12.55);

	this.shape_351 = new cjs.Shape();
	this.shape_351.graphics.f("#998186").s().p("AnhCHIAAkNIPCAAIAAENg");
	this.shape_351.setTransform(106.4,12.55);

	this.shape_352 = new cjs.Shape();
	this.shape_352.graphics.f("#998186").s().p("AngCHIAAkNIPBAAIAAENg");
	this.shape_352.setTransform(106.475,12.55);

	this.shape_353 = new cjs.Shape();
	this.shape_353.graphics.f("#998186").s().p("AnfCHIAAkNIO/AAIAAENg");
	this.shape_353.setTransform(106.575,12.55);

	this.shape_354 = new cjs.Shape();
	this.shape_354.graphics.f("#998186").s().p("AneCHIAAkNIO9AAIAAENg");
	this.shape_354.setTransform(106.65,12.55);

	this.shape_355 = new cjs.Shape();
	this.shape_355.graphics.f("#998186").s().p("AndCHIAAkNIO7AAIAAENg");
	this.shape_355.setTransform(106.725,12.55);

	this.shape_356 = new cjs.Shape();
	this.shape_356.graphics.f("#998186").s().p("AndCHIAAkNIO6AAIAAENg");
	this.shape_356.setTransform(106.8,12.55);

	this.shape_357 = new cjs.Shape();
	this.shape_357.graphics.f("#998186").s().p("AncCHIAAkNIO5AAIAAENg");
	this.shape_357.setTransform(106.875,12.55);

	this.shape_358 = new cjs.Shape();
	this.shape_358.graphics.f("#998186").s().p("AnbCHIAAkNIO3AAIAAENg");
	this.shape_358.setTransform(106.95,12.55);

	this.shape_359 = new cjs.Shape();
	this.shape_359.graphics.f("#998186").s().p("AnaCHIAAkNIO1AAIAAENg");
	this.shape_359.setTransform(107.025,12.55);

	this.shape_360 = new cjs.Shape();
	this.shape_360.graphics.f("#998186").s().p("AnZCHIAAkNIOzAAIAAENg");
	this.shape_360.setTransform(107.1,12.55);

	this.shape_361 = new cjs.Shape();
	this.shape_361.graphics.f("#998186").s().p("AnYCHIAAkNIOxAAIAAENg");
	this.shape_361.setTransform(107.25,12.55);

	this.shape_362 = new cjs.Shape();
	this.shape_362.graphics.f("#998185").s().p("AnXCHIAAkNIOvAAIAAENg");
	this.shape_362.setTransform(107.35,12.55);

	this.shape_363 = new cjs.Shape();
	this.shape_363.graphics.f("#998185").s().p("AnWCHIAAkNIOtAAIAAENg");
	this.shape_363.setTransform(107.425,12.55);

	this.shape_364 = new cjs.Shape();
	this.shape_364.graphics.f("#998185").s().p("AnVCHIAAkNIOrAAIAAENg");
	this.shape_364.setTransform(107.5,12.55);

	this.shape_365 = new cjs.Shape();
	this.shape_365.graphics.f("#998085").s().p("AnUCHIAAkNIOpAAIAAENg");
	this.shape_365.setTransform(107.65,12.55);

	this.shape_366 = new cjs.Shape();
	this.shape_366.graphics.f("#998085").s().p("AnTCHIAAkNIOnAAIAAENg");
	this.shape_366.setTransform(107.725,12.55);

	this.shape_367 = new cjs.Shape();
	this.shape_367.graphics.f("#998085").s().p("AnTCHIAAkNIOmAAIAAENg");
	this.shape_367.setTransform(107.8,12.55);

	this.shape_368 = new cjs.Shape();
	this.shape_368.graphics.f("#998085").s().p("AnSCHIAAkNIOlAAIAAENg");
	this.shape_368.setTransform(107.875,12.55);

	this.shape_369 = new cjs.Shape();
	this.shape_369.graphics.f("#998085").s().p("AnRCHIAAkNIOjAAIAAENg");
	this.shape_369.setTransform(107.95,12.55);

	this.shape_370 = new cjs.Shape();
	this.shape_370.graphics.f("#998085").s().p("AnQCHIAAkNIOhAAIAAENg");
	this.shape_370.setTransform(108.05,12.55);

	this.shape_371 = new cjs.Shape();
	this.shape_371.graphics.f("#998085").s().p("AnPCHIAAkNIOfAAIAAENg");
	this.shape_371.setTransform(108.125,12.55);

	this.shape_372 = new cjs.Shape();
	this.shape_372.graphics.f("#998085").s().p("AnPCHIAAkNIOeAAIAAENg");
	this.shape_372.setTransform(108.2,12.55);

	this.shape_373 = new cjs.Shape();
	this.shape_373.graphics.f("#998085").s().p("AnOCHIAAkNIOdAAIAAENg");
	this.shape_373.setTransform(108.275,12.55);

	this.shape_374 = new cjs.Shape();
	this.shape_374.graphics.f("#998085").s().p("AnNCHIAAkNIObAAIAAENg");
	this.shape_374.setTransform(108.35,12.55);

	this.shape_375 = new cjs.Shape();
	this.shape_375.graphics.f("#998085").s().p("AnMCHIAAkNIOZAAIAAENg");
	this.shape_375.setTransform(108.425,12.55);

	this.shape_376 = new cjs.Shape();
	this.shape_376.graphics.f("#998085").s().p("AnLCHIAAkNIOXAAIAAENg");
	this.shape_376.setTransform(108.5,12.55);

	this.shape_377 = new cjs.Shape();
	this.shape_377.graphics.f("#998085").s().p("AnKCHIAAkNIOVAAIAAENg");
	this.shape_377.setTransform(108.65,12.55);

	this.shape_378 = new cjs.Shape();
	this.shape_378.graphics.f("#998085").s().p("AnJCHIAAkNIOTAAIAAENg");
	this.shape_378.setTransform(108.725,12.55);

	this.shape_379 = new cjs.Shape();
	this.shape_379.graphics.f("#998085").s().p("AnICHIAAkNIORAAIAAENg");
	this.shape_379.setTransform(108.825,12.55);

	this.shape_380 = new cjs.Shape();
	this.shape_380.graphics.f("#998084").s().p("AnHCHIAAkNIOPAAIAAENg");
	this.shape_380.setTransform(108.9,12.55);

	this.shape_381 = new cjs.Shape();
	this.shape_381.graphics.f("#998084").s().p("AnGCHIAAkNIONAAIAAENg");
	this.shape_381.setTransform(109.05,12.55);

	this.shape_382 = new cjs.Shape();
	this.shape_382.graphics.f("#998084").s().p("AnFCHIAAkNIOLAAIAAENg");
	this.shape_382.setTransform(109.125,12.55);

	this.shape_383 = new cjs.Shape();
	this.shape_383.graphics.f("#998084").s().p("AnFCHIAAkNIOKAAIAAENg");
	this.shape_383.setTransform(109.2,12.55);

	this.shape_384 = new cjs.Shape();
	this.shape_384.graphics.f("#998084").s().p("AnECHIAAkNIOJAAIAAENg");
	this.shape_384.setTransform(109.275,12.55);

	this.shape_385 = new cjs.Shape();
	this.shape_385.graphics.f("#998084").s().p("AnDCHIAAkNIOHAAIAAENg");
	this.shape_385.setTransform(109.35,12.55);

	this.shape_386 = new cjs.Shape();
	this.shape_386.graphics.f("#997F84").s().p("AnCCHIAAkNIOFAAIAAENg");
	this.shape_386.setTransform(109.425,12.55);

	this.shape_387 = new cjs.Shape();
	this.shape_387.graphics.f("#997F84").s().p("AnBCHIAAkNIODAAIAAENg");
	this.shape_387.setTransform(109.525,12.55);

	this.shape_388 = new cjs.Shape();
	this.shape_388.graphics.f("#997F84").s().p("AnBCHIAAkNIOCAAIAAENg");
	this.shape_388.setTransform(109.6,12.55);

	this.shape_389 = new cjs.Shape();
	this.shape_389.graphics.f("#997F84").s().p("AnACHIAAkNIOBAAIAAENg");
	this.shape_389.setTransform(109.675,12.55);

	this.shape_390 = new cjs.Shape();
	this.shape_390.graphics.f("#997F84").s().p("Am/CHIAAkNIN/AAIAAENg");
	this.shape_390.setTransform(109.75,12.55);

	this.shape_391 = new cjs.Shape();
	this.shape_391.graphics.f("#997F84").s().p("Am+CHIAAkNIN9AAIAAENg");
	this.shape_391.setTransform(109.825,12.55);

	this.shape_392 = new cjs.Shape();
	this.shape_392.graphics.f("#997F84").s().p("Am+CHIAAkNIN8AAIAAENg");
	this.shape_392.setTransform(109.9,12.55);

	this.shape_393 = new cjs.Shape();
	this.shape_393.graphics.f("#997F84").s().p("Am9CHIAAkNIN7AAIAAENg");
	this.shape_393.setTransform(109.975,12.55);

	this.shape_394 = new cjs.Shape();
	this.shape_394.graphics.f("#997F84").s().p("Am8CHIAAkNIN5AAIAAENg");
	this.shape_394.setTransform(110.05,12.55);

	this.shape_395 = new cjs.Shape();
	this.shape_395.graphics.f("#997F84").s().p("Am7CHIAAkNIN3AAIAAENg");
	this.shape_395.setTransform(110.125,12.55);

	this.shape_396 = new cjs.Shape();
	this.shape_396.graphics.f("#997F84").s().p("Am6CHIAAkNIN1AAIAAENg");
	this.shape_396.setTransform(110.2,12.55);

	this.shape_397 = new cjs.Shape();
	this.shape_397.graphics.f("#997F84").s().p("Am5CHIAAkNINzAAIAAENg");
	this.shape_397.setTransform(110.3,12.55);

	this.shape_398 = new cjs.Shape();
	this.shape_398.graphics.f("#997F83").s().p("Am5CHIAAkNINzAAIAAENg");
	this.shape_398.setTransform(110.375,12.55);

	this.shape_399 = new cjs.Shape();
	this.shape_399.graphics.f("#997F83").s().p("Am4CHIAAkNINxAAIAAENg");
	this.shape_399.setTransform(110.45,12.55);

	this.shape_400 = new cjs.Shape();
	this.shape_400.graphics.f("#997F83").s().p("Am3CHIAAkNINvAAIAAENg");
	this.shape_400.setTransform(110.525,12.55);

	this.shape_401 = new cjs.Shape();
	this.shape_401.graphics.f("#997F83").s().p("Am2CHIAAkNINtAAIAAENg");
	this.shape_401.setTransform(110.6,12.55);

	this.shape_402 = new cjs.Shape();
	this.shape_402.graphics.f("#997F83").s().p("Am1CHIAAkNINrAAIAAENg");
	this.shape_402.setTransform(110.75,12.55);

	this.shape_403 = new cjs.Shape();
	this.shape_403.graphics.f("#997F83").s().p("Am0CHIAAkNINpAAIAAENg");
	this.shape_403.setTransform(110.825,12.55);

	this.shape_404 = new cjs.Shape();
	this.shape_404.graphics.f("#997F83").s().p("Am0CHIAAkNINoAAIAAENg");
	this.shape_404.setTransform(110.9,12.55);

	this.shape_405 = new cjs.Shape();
	this.shape_405.graphics.f("#997F83").s().p("AmzCHIAAkNINnAAIAAENg");
	this.shape_405.setTransform(110.975,12.55);

	this.shape_406 = new cjs.Shape();
	this.shape_406.graphics.f("#997F83").s().p("AmyCHIAAkNINlAAIAAENg");
	this.shape_406.setTransform(111.075,12.55);

	this.shape_407 = new cjs.Shape();
	this.shape_407.graphics.f("#997E83").s().p("AmxCHIAAkNINjAAIAAENg");
	this.shape_407.setTransform(111.15,12.55);

	this.shape_408 = new cjs.Shape();
	this.shape_408.graphics.f("#997E83").s().p("AmwCHIAAkNINhAAIAAENg");
	this.shape_408.setTransform(111.225,12.55);

	this.shape_409 = new cjs.Shape();
	this.shape_409.graphics.f("#997E83").s().p("AmwCHIAAkNINgAAIAAENg");
	this.shape_409.setTransform(111.3,12.55);

	this.shape_410 = new cjs.Shape();
	this.shape_410.graphics.f("#997E83").s().p("AmvCHIAAkNINfAAIAAENg");
	this.shape_410.setTransform(111.375,12.55);

	this.shape_411 = new cjs.Shape();
	this.shape_411.graphics.f("#997E83").s().p("AmuCHIAAkNINdAAIAAENg");
	this.shape_411.setTransform(111.45,12.55);

	this.shape_412 = new cjs.Shape();
	this.shape_412.graphics.f("#997E83").s().p("AmtCHIAAkNINbAAIAAENg");
	this.shape_412.setTransform(111.525,12.55);

	this.shape_413 = new cjs.Shape();
	this.shape_413.graphics.f("#997E83").s().p("AmsCHIAAkNINZAAIAAENg");
	this.shape_413.setTransform(111.6,12.55);

	this.shape_414 = new cjs.Shape();
	this.shape_414.graphics.f("#997E83").s().p("AmrCHIAAkNINXAAIAAENg");
	this.shape_414.setTransform(111.75,12.55);

	this.shape_415 = new cjs.Shape();
	this.shape_415.graphics.f("#997E82").s().p("AmqCHIAAkNINVAAIAAENg");
	this.shape_415.setTransform(111.85,12.55);

	this.shape_416 = new cjs.Shape();
	this.shape_416.graphics.f("#997E82").s().p("AmpCHIAAkNINTAAIAAENg");
	this.shape_416.setTransform(111.925,12.55);

	this.shape_417 = new cjs.Shape();
	this.shape_417.graphics.f("#997E82").s().p("AmoCHIAAkNINRAAIAAENg");
	this.shape_417.setTransform(112,12.55);

	this.shape_418 = new cjs.Shape();
	this.shape_418.graphics.f("#997E82").s().p("AmnCHIAAkNINPAAIAAENg");
	this.shape_418.setTransform(112.15,12.55);

	this.shape_419 = new cjs.Shape();
	this.shape_419.graphics.f("#997E82").s().p("AmmCHIAAkNINNAAIAAENg");
	this.shape_419.setTransform(112.225,12.55);

	this.shape_420 = new cjs.Shape();
	this.shape_420.graphics.f("#997E82").s().p("AmmCHIAAkNINMAAIAAENg");
	this.shape_420.setTransform(112.3,12.55);

	this.shape_421 = new cjs.Shape();
	this.shape_421.graphics.f("#997E82").s().p("AmlCHIAAkNINLAAIAAENg");
	this.shape_421.setTransform(112.375,12.55);

	this.shape_422 = new cjs.Shape();
	this.shape_422.graphics.f("#997E82").s().p("AmkCHIAAkNINJAAIAAENg");
	this.shape_422.setTransform(112.45,12.55);

	this.shape_423 = new cjs.Shape();
	this.shape_423.graphics.f("#997E82").s().p("AmjCHIAAkNINHAAIAAENg");
	this.shape_423.setTransform(112.55,12.55);

	this.shape_424 = new cjs.Shape();
	this.shape_424.graphics.f("#997E82").s().p("AmiCHIAAkNINFAAIAAENg");
	this.shape_424.setTransform(112.625,12.55);

	this.shape_425 = new cjs.Shape();
	this.shape_425.graphics.f("#997E82").s().p("AmiCHIAAkNINEAAIAAENg");
	this.shape_425.setTransform(112.7,12.55);

	this.shape_426 = new cjs.Shape();
	this.shape_426.graphics.f("#997E82").s().p("AmhCHIAAkNINDAAIAAENg");
	this.shape_426.setTransform(112.775,12.55);

	this.shape_427 = new cjs.Shape();
	this.shape_427.graphics.f("#997E82").s().p("AmgCHIAAkNINBAAIAAENg");
	this.shape_427.setTransform(112.85,12.55);

	this.shape_428 = new cjs.Shape();
	this.shape_428.graphics.f("#997D82").s().p("AmfCHIAAkNIM/AAIAAENg");
	this.shape_428.setTransform(112.925,12.55);

	this.shape_429 = new cjs.Shape();
	this.shape_429.graphics.f("#997D82").s().p("AmeCHIAAkNIM9AAIAAENg");
	this.shape_429.setTransform(113,12.55);

	this.shape_430 = new cjs.Shape();
	this.shape_430.graphics.f("#997D82").s().p("AmdCHIAAkNIM7AAIAAENg");
	this.shape_430.setTransform(113.15,12.55);

	this.shape_431 = new cjs.Shape();
	this.shape_431.graphics.f("#997D82").s().p("AmcCHIAAkNIM5AAIAAENg");
	this.shape_431.setTransform(113.225,12.55);

	this.shape_432 = new cjs.Shape();
	this.shape_432.graphics.f("#997D81").s().p("AmbCHIAAkNIM3AAIAAENg");
	this.shape_432.setTransform(113.325,12.55);

	this.shape_433 = new cjs.Shape();
	this.shape_433.graphics.f("#997D81").s().p("AmaCHIAAkNIM1AAIAAENg");
	this.shape_433.setTransform(113.4,12.55);

	this.shape_434 = new cjs.Shape();
	this.shape_434.graphics.f("#997D81").s().p("AmZCHIAAkNIMzAAIAAENg");
	this.shape_434.setTransform(113.55,12.55);

	this.shape_435 = new cjs.Shape();
	this.shape_435.graphics.f("#997D81").s().p("AmYCHIAAkNIMxAAIAAENg");
	this.shape_435.setTransform(113.625,12.55);

	this.shape_436 = new cjs.Shape();
	this.shape_436.graphics.f("#997D81").s().p("AmYCHIAAkNIMwAAIAAENg");
	this.shape_436.setTransform(113.7,12.55);

	this.shape_437 = new cjs.Shape();
	this.shape_437.graphics.f("#997D81").s().p("AmXCHIAAkNIMvAAIAAENg");
	this.shape_437.setTransform(113.775,12.55);

	this.shape_438 = new cjs.Shape();
	this.shape_438.graphics.f("#997D81").s().p("AmWCHIAAkNIMtAAIAAENg");
	this.shape_438.setTransform(113.85,12.55);

	this.shape_439 = new cjs.Shape();
	this.shape_439.graphics.f("#997D81").s().p("AmVCHIAAkNIMrAAIAAENg");
	this.shape_439.setTransform(113.925,12.55);

	this.shape_440 = new cjs.Shape();
	this.shape_440.graphics.f("#997D81").s().p("AmUCHIAAkNIMpAAIAAENg");
	this.shape_440.setTransform(114.025,12.55);

	this.shape_441 = new cjs.Shape();
	this.shape_441.graphics.f("#997D81").s().p("AmUCHIAAkNIMoAAIAAENg");
	this.shape_441.setTransform(114.1,12.55);

	this.shape_442 = new cjs.Shape();
	this.shape_442.graphics.f("#997D81").s().p("AmTCHIAAkNIMnAAIAAENg");
	this.shape_442.setTransform(114.175,12.55);

	this.shape_443 = new cjs.Shape();
	this.shape_443.graphics.f("#997D81").s().p("AmSCHIAAkNIMlAAIAAENg");
	this.shape_443.setTransform(114.25,12.55);

	this.shape_444 = new cjs.Shape();
	this.shape_444.graphics.f("#997D81").s().p("AmRCHIAAkNIMjAAIAAENg");
	this.shape_444.setTransform(114.325,12.55);

	this.shape_445 = new cjs.Shape();
	this.shape_445.graphics.f("#997D81").s().p("AmRCHIAAkNIMiAAIAAENg");
	this.shape_445.setTransform(114.4,12.55);

	this.shape_446 = new cjs.Shape();
	this.shape_446.graphics.f("#997D81").s().p("AmQCHIAAkNIMhAAIAAENg");
	this.shape_446.setTransform(114.475,12.55);

	this.shape_447 = new cjs.Shape();
	this.shape_447.graphics.f("#997D81").s().p("AmPCHIAAkNIMfAAIAAENg");
	this.shape_447.setTransform(114.55,12.55);

	this.shape_448 = new cjs.Shape();
	this.shape_448.graphics.f("#997D81").s().p("AmOCHIAAkNIMdAAIAAENg");
	this.shape_448.setTransform(114.625,12.55);

	this.shape_449 = new cjs.Shape();
	this.shape_449.graphics.f("#997C81").s().p("AmNCHIAAkNIMbAAIAAENg");
	this.shape_449.setTransform(114.7,12.55);

	this.shape_450 = new cjs.Shape();
	this.shape_450.graphics.f("#997C80").s().p("AmMCHIAAkNIMZAAIAAENg");
	this.shape_450.setTransform(114.8,12.55);

	this.shape_451 = new cjs.Shape();
	this.shape_451.graphics.f("#997C80").s().p("AmLCHIAAkNIMXAAIAAENg");
	this.shape_451.setTransform(114.95,12.55);

	this.shape_452 = new cjs.Shape();
	this.shape_452.graphics.f("#997C80").s().p("AmKCHIAAkNIMVAAIAAENg");
	this.shape_452.setTransform(115.025,12.55);

	this.shape_453 = new cjs.Shape();
	this.shape_453.graphics.f("#997C80").s().p("AmJCHIAAkNIMTAAIAAENg");
	this.shape_453.setTransform(115.1,12.55);

	this.shape_454 = new cjs.Shape();
	this.shape_454.graphics.f("#997C80").s().p("AmICHIAAkNIMRAAIAAENg");
	this.shape_454.setTransform(115.25,12.55);

	this.shape_455 = new cjs.Shape();
	this.shape_455.graphics.f("#997C80").s().p("AmHCHIAAkNIMPAAIAAENg");
	this.shape_455.setTransform(115.325,12.55);

	this.shape_456 = new cjs.Shape();
	this.shape_456.graphics.f("#997C80").s().p("AmHCHIAAkNIMOAAIAAENg");
	this.shape_456.setTransform(115.4,12.55);

	this.shape_457 = new cjs.Shape();
	this.shape_457.graphics.f("#997C80").s().p("AmGCHIAAkNIMNAAIAAENg");
	this.shape_457.setTransform(115.475,12.55);

	this.shape_458 = new cjs.Shape();
	this.shape_458.graphics.f("#997C80").s().p("AmFCHIAAkNIMLAAIAAENg");
	this.shape_458.setTransform(115.6,12.55);

	this.shape_459 = new cjs.Shape();
	this.shape_459.graphics.f("#997C80").s().p("AmECHIAAkNIMJAAIAAENg");
	this.shape_459.setTransform(115.675,12.55);

	this.shape_460 = new cjs.Shape();
	this.shape_460.graphics.f("#997C80").s().p("AmDCHIAAkNIMHAAIAAENg");
	this.shape_460.setTransform(115.825,12.55);

	this.shape_461 = new cjs.Shape();
	this.shape_461.graphics.f("#997C80").s().p("AmCCHIAAkNIMFAAIAAENg");
	this.shape_461.setTransform(115.9,12.55);

	this.shape_462 = new cjs.Shape();
	this.shape_462.graphics.f("#997C80").s().p("AmBCHIAAkNIMDAAIAAENg");
	this.shape_462.setTransform(115.975,12.55);

	this.shape_463 = new cjs.Shape();
	this.shape_463.graphics.f("#997C80").s().p("AmACHIAAkNIMBAAIAAENg");
	this.shape_463.setTransform(116.125,12.55);

	this.shape_464 = new cjs.Shape();
	this.shape_464.graphics.f("#997C80").s().p("Al/CHIAAkNIL/AAIAAENg");
	this.shape_464.setTransform(116.2,12.55);

	this.shape_465 = new cjs.Shape();
	this.shape_465.graphics.f("#997C80").s().p("Al+CHIAAkNIL9AAIAAENg");
	this.shape_465.setTransform(116.275,12.55);

	this.shape_466 = new cjs.Shape();
	this.shape_466.graphics.f("#997C7F").s().p("Al9CHIAAkNIL7AAIAAENg");
	this.shape_466.setTransform(116.375,12.55);

	this.shape_467 = new cjs.Shape();
	this.shape_467.graphics.f("#997B7F").s().p("Al9CHIAAkNIL7AAIAAENg");
	this.shape_467.setTransform(116.45,12.55);

	this.shape_468 = new cjs.Shape();
	this.shape_468.graphics.f("#997B7F").s().p("Al8CHIAAkNIL5AAIAAENg");
	this.shape_468.setTransform(116.525,12.55);

	this.shape_469 = new cjs.Shape();
	this.shape_469.graphics.f("#997B7F").s().p("Al7CHIAAkNIL3AAIAAENg");
	this.shape_469.setTransform(116.6,12.55);

	this.shape_470 = new cjs.Shape();
	this.shape_470.graphics.f("#997B7F").s().p("Al6CHIAAkNIL1AAIAAENg");
	this.shape_470.setTransform(116.675,12.55);

	this.shape_471 = new cjs.Shape();
	this.shape_471.graphics.f("#997B7F").s().p("Al5CHIAAkNIL0AAIAAENg");
	this.shape_471.setTransform(116.75,12.55);

	this.shape_472 = new cjs.Shape();
	this.shape_472.graphics.f("#997B7F").s().p("Al5CHIAAkNILzAAIAAENg");
	this.shape_472.setTransform(116.825,12.55);

	this.shape_473 = new cjs.Shape();
	this.shape_473.graphics.f("#997B7F").s().p("Al4CHIAAkNILxAAIAAENg");
	this.shape_473.setTransform(116.9,12.55);

	this.shape_474 = new cjs.Shape();
	this.shape_474.graphics.f("#997B7F").s().p("Al3CHIAAkNILvAAIAAENg");
	this.shape_474.setTransform(116.975,12.55);

	this.shape_475 = new cjs.Shape();
	this.shape_475.graphics.f("#997B7F").s().p("Al1CHIAAkNILsAAIAAENg");
	this.shape_475.setTransform(117.15,12.55);

	this.shape_476 = new cjs.Shape();
	this.shape_476.graphics.f("#997B7F").s().p("Al1CHIAAkNILrAAIAAENg");
	this.shape_476.setTransform(117.225,12.55);

	this.shape_477 = new cjs.Shape();
	this.shape_477.graphics.f("#997B7F").s().p("Al0CHIAAkNILpAAIAAENg");
	this.shape_477.setTransform(117.3,12.55);

	this.shape_478 = new cjs.Shape();
	this.shape_478.graphics.f("#997B7F").s().p("AlzCHIAAkNILnAAIAAENg");
	this.shape_478.setTransform(117.375,12.55);

	this.shape_479 = new cjs.Shape();
	this.shape_479.graphics.f("#997B7F").s().p("AlyCHIAAkNILlAAIAAENg");
	this.shape_479.setTransform(117.525,12.55);

	this.shape_480 = new cjs.Shape();
	this.shape_480.graphics.f("#997B7F").s().p("AlxCHIAAkNILjAAIAAENg");
	this.shape_480.setTransform(117.6,12.55);

	this.shape_481 = new cjs.Shape();
	this.shape_481.graphics.f("#997B7F").s().p("AlwCHIAAkNILhAAIAAENg");
	this.shape_481.setTransform(117.675,12.55);

	this.shape_482 = new cjs.Shape();
	this.shape_482.graphics.f("#997B7F").s().p("AlvCHIAAkNILgAAIAAENg");
	this.shape_482.setTransform(117.75,12.55);

	this.shape_483 = new cjs.Shape();
	this.shape_483.graphics.f("#997B7E").s().p("AlvCHIAAkNILfAAIAAENg");
	this.shape_483.setTransform(117.85,12.55);

	this.shape_484 = new cjs.Shape();
	this.shape_484.graphics.f("#997B7E").s().p("AluCHIAAkNILdAAIAAENg");
	this.shape_484.setTransform(117.925,12.55);

	this.shape_485 = new cjs.Shape();
	this.shape_485.graphics.f("#997B7E").s().p("AltCHIAAkNILbAAIAAENg");
	this.shape_485.setTransform(118,12.55);

	this.shape_486 = new cjs.Shape();
	this.shape_486.graphics.f("#997B7E").s().p("AlsCHIAAkNILZAAIAAENg");
	this.shape_486.setTransform(118.075,12.55);

	this.shape_487 = new cjs.Shape();
	this.shape_487.graphics.f("#997B7E").s().p("AlrCHIAAkNILYAAIAAENg");
	this.shape_487.setTransform(118.15,12.55);

	this.shape_488 = new cjs.Shape();
	this.shape_488.graphics.f("#997A7E").s().p("AlrCHIAAkNILXAAIAAENg");
	this.shape_488.setTransform(118.225,12.55);

	this.shape_489 = new cjs.Shape();
	this.shape_489.graphics.f("#997A7E").s().p("AlqCHIAAkNILVAAIAAENg");
	this.shape_489.setTransform(118.3,12.55);

	this.shape_490 = new cjs.Shape();
	this.shape_490.graphics.f("#997A7E").s().p("AlpCHIAAkNILTAAIAAENg");
	this.shape_490.setTransform(118.375,12.55);

	this.shape_491 = new cjs.Shape();
	this.shape_491.graphics.f("#997A7E").s().p("AloCHIAAkNILRAAIAAENg");
	this.shape_491.setTransform(118.525,12.55);

	this.shape_492 = new cjs.Shape();
	this.shape_492.graphics.f("#997A7E").s().p("AlnCHIAAkNILPAAIAAENg");
	this.shape_492.setTransform(118.625,12.55);

	this.shape_493 = new cjs.Shape();
	this.shape_493.graphics.f("#997A7E").s().p("AlmCHIAAkNILNAAIAAENg");
	this.shape_493.setTransform(118.7,12.55);

	this.shape_494 = new cjs.Shape();
	this.shape_494.graphics.f("#997A7E").s().p("AllCHIAAkNILLAAIAAENg");
	this.shape_494.setTransform(118.775,12.55);

	this.shape_495 = new cjs.Shape();
	this.shape_495.graphics.f("#997A7E").s().p("AlkCHIAAkNILJAAIAAENg");
	this.shape_495.setTransform(118.925,12.55);

	this.shape_496 = new cjs.Shape();
	this.shape_496.graphics.f("#997A7E").s().p("AljCHIAAkNILHAAIAAENg");
	this.shape_496.setTransform(119,12.55);

	this.shape_497 = new cjs.Shape();
	this.shape_497.graphics.f("#997A7E").s().p("AliCHIAAkNILFAAIAAENg");
	this.shape_497.setTransform(119.075,12.55);

	this.shape_498 = new cjs.Shape();
	this.shape_498.graphics.f("#997A7E").s().p("AlhCHIAAkNILDAAIAAENg");
	this.shape_498.setTransform(119.225,12.55);

	this.shape_499 = new cjs.Shape();
	this.shape_499.graphics.f("#997A7D").s().p("AlgCHIAAkNILBAAIAAENg");
	this.shape_499.setTransform(119.325,12.55);

	this.shape_500 = new cjs.Shape();
	this.shape_500.graphics.f("#997A7D").s().p("AlfCHIAAkNIK/AAIAAENg");
	this.shape_500.setTransform(119.4,12.55);

	this.shape_501 = new cjs.Shape();
	this.shape_501.graphics.f("#997A7D").s().p("AleCHIAAkNIK9AAIAAENg");
	this.shape_501.setTransform(119.475,12.55);

	this.shape_502 = new cjs.Shape();
	this.shape_502.graphics.f("#997A7D").s().p("AldCHIAAkNIK8AAIAAENg");
	this.shape_502.setTransform(119.55,12.55);

	this.shape_503 = new cjs.Shape();
	this.shape_503.graphics.f("#997A7D").s().p("AldCHIAAkNIK7AAIAAENg");
	this.shape_503.setTransform(119.625,12.55);

	this.shape_504 = new cjs.Shape();
	this.shape_504.graphics.f("#997A7D").s().p("AlcCHIAAkNIK5AAIAAENg");
	this.shape_504.setTransform(119.7,12.55);

	this.shape_505 = new cjs.Shape();
	this.shape_505.graphics.f("#997A7D").s().p("AlbCHIAAkNIK3AAIAAENg");
	this.shape_505.setTransform(119.775,12.55);

	this.shape_506 = new cjs.Shape();
	this.shape_506.graphics.f("#997A7D").s().p("AlaCHIAAkNIK2AAIAAENg");
	this.shape_506.setTransform(119.85,12.55);

	this.shape_507 = new cjs.Shape();
	this.shape_507.graphics.f("#997A7D").s().p("AlaCHIAAkNIK1AAIAAENg");
	this.shape_507.setTransform(119.925,12.55);

	this.shape_508 = new cjs.Shape();
	this.shape_508.graphics.f("#99797D").s().p("AlZCHIAAkNIKzAAIAAENg");
	this.shape_508.setTransform(120,12.55);

	this.shape_509 = new cjs.Shape();
	this.shape_509.graphics.f("#99797D").s().p("AlYCHIAAkNIKxAAIAAENg");
	this.shape_509.setTransform(120.1,12.55);

	this.shape_510 = new cjs.Shape();
	this.shape_510.graphics.f("#99797D").s().p("AlXCHIAAkNIKvAAIAAENg");
	this.shape_510.setTransform(120.175,12.55);

	this.shape_511 = new cjs.Shape();
	this.shape_511.graphics.f("#99797D").s().p("AlWCHIAAkNIKtAAIAAENg");
	this.shape_511.setTransform(120.325,12.55);

	this.shape_512 = new cjs.Shape();
	this.shape_512.graphics.f("#99797D").s().p("AlVCHIAAkNIKrAAIAAENg");
	this.shape_512.setTransform(120.4,12.55);

	this.shape_513 = new cjs.Shape();
	this.shape_513.graphics.f("#99797D").s().p("AlUCHIAAkNIKpAAIAAENg");
	this.shape_513.setTransform(120.475,12.55);

	this.shape_514 = new cjs.Shape();
	this.shape_514.graphics.f("#99797D").s().p("AlTCHIAAkNIKnAAIAAENg");
	this.shape_514.setTransform(120.625,12.55);

	this.shape_515 = new cjs.Shape();
	this.shape_515.graphics.f("#99797D").s().p("AlSCHIAAkNIKlAAIAAENg");
	this.shape_515.setTransform(120.7,12.55);

	this.shape_516 = new cjs.Shape();
	this.shape_516.graphics.f("#99797C").s().p("AlRCHIAAkNIKjAAIAAENg");
	this.shape_516.setTransform(120.775,12.55);

	this.shape_517 = new cjs.Shape();
	this.shape_517.graphics.f("#99797C").s().p("AlQCHIAAkNIKhAAIAAENg");
	this.shape_517.setTransform(120.875,12.55);

	this.shape_518 = new cjs.Shape();
	this.shape_518.graphics.f("#99797C").s().p("AlPCHIAAkNIKfAAIAAENg");
	this.shape_518.setTransform(121.025,12.55);

	this.shape_519 = new cjs.Shape();
	this.shape_519.graphics.f("#99797C").s().p("AlOCHIAAkNIKdAAIAAENg");
	this.shape_519.setTransform(121.1,12.55);

	this.shape_520 = new cjs.Shape();
	this.shape_520.graphics.f("#99797C").s().p("AlNCHIAAkNIKbAAIAAENg");
	this.shape_520.setTransform(121.175,12.55);

	this.shape_521 = new cjs.Shape();
	this.shape_521.graphics.f("#99797C").s().p("AlMCHIAAkNIKaAAIAAENg");
	this.shape_521.setTransform(121.25,12.55);

	this.shape_522 = new cjs.Shape();
	this.shape_522.graphics.f("#99797C").s().p("AlMCHIAAkNIKZAAIAAENg");
	this.shape_522.setTransform(121.325,12.55);

	this.shape_523 = new cjs.Shape();
	this.shape_523.graphics.f("#99797C").s().p("AlLCHIAAkNIKXAAIAAENg");
	this.shape_523.setTransform(121.4,12.55);

	this.shape_524 = new cjs.Shape();
	this.shape_524.graphics.f("#99797C").s().p("AlKCHIAAkNIKVAAIAAENg");
	this.shape_524.setTransform(121.475,12.55);

	this.shape_525 = new cjs.Shape();
	this.shape_525.graphics.f("#99797C").s().p("AlICHIAAkNIKSAAIAAENg");
	this.shape_525.setTransform(121.65,12.55);

	this.shape_526 = new cjs.Shape();
	this.shape_526.graphics.f("#99787C").s().p("AlICHIAAkNIKRAAIAAENg");
	this.shape_526.setTransform(121.725,12.55);

	this.shape_527 = new cjs.Shape();
	this.shape_527.graphics.f("#99787C").s().p("AlHCHIAAkNIKPAAIAAENg");
	this.shape_527.setTransform(121.8,12.55);

	this.shape_528 = new cjs.Shape();
	this.shape_528.graphics.f("#99787C").s().p("AlGCHIAAkNIKNAAIAAENg");
	this.shape_528.setTransform(121.875,12.55);

	this.shape_529 = new cjs.Shape();
	this.shape_529.graphics.f("#99787C").s().p("AlFCHIAAkNIKLAAIAAENg");
	this.shape_529.setTransform(122.025,12.55);

	this.shape_530 = new cjs.Shape();
	this.shape_530.graphics.f("#99787C").s().p("AlECHIAAkNIKJAAIAAENg");
	this.shape_530.setTransform(122.1,12.55);

	this.shape_531 = new cjs.Shape();
	this.shape_531.graphics.f("#99787C").s().p("AlDCHIAAkNIKHAAIAAENg");
	this.shape_531.setTransform(122.175,12.55);

	this.shape_532 = new cjs.Shape();
	this.shape_532.graphics.f("#99787B").s().p("AlCCHIAAkNIKGAAIAAENg");
	this.shape_532.setTransform(122.25,12.55);

	this.shape_533 = new cjs.Shape();
	this.shape_533.graphics.f("#99787B").s().p("AlCCHIAAkNIKFAAIAAENg");
	this.shape_533.setTransform(122.35,12.55);

	this.shape_534 = new cjs.Shape();
	this.shape_534.graphics.f("#99787B").s().p("AlBCHIAAkNIKDAAIAAENg");
	this.shape_534.setTransform(122.425,12.55);

	this.shape_535 = new cjs.Shape();
	this.shape_535.graphics.f("#99787B").s().p("AlACHIAAkNIKBAAIAAENg");
	this.shape_535.setTransform(122.5,12.55);

	this.shape_536 = new cjs.Shape();
	this.shape_536.graphics.f("#99787B").s().p("Ak/CHIAAkNIJ/AAIAAENg");
	this.shape_536.setTransform(122.575,12.55);

	this.shape_537 = new cjs.Shape();
	this.shape_537.graphics.f("#99787B").s().p("Ak+CHIAAkNIJ+AAIAAENg");
	this.shape_537.setTransform(122.65,12.55);

	this.shape_538 = new cjs.Shape();
	this.shape_538.graphics.f("#99787B").s().p("Ak+CHIAAkNIJ9AAIAAENg");
	this.shape_538.setTransform(122.725,12.55);

	this.shape_539 = new cjs.Shape();
	this.shape_539.graphics.f("#99787B").s().p("Ak9CHIAAkNIJ7AAIAAENg");
	this.shape_539.setTransform(122.8,12.55);

	this.shape_540 = new cjs.Shape();
	this.shape_540.graphics.f("#99787B").s().p("Ak8CHIAAkNIJ5AAIAAENg");
	this.shape_540.setTransform(122.875,12.55);

	this.shape_541 = new cjs.Shape();
	this.shape_541.graphics.f("#99787B").s().p("Ak7CHIAAkNIJ3AAIAAENg");
	this.shape_541.setTransform(123.025,12.55);

	this.shape_542 = new cjs.Shape();
	this.shape_542.graphics.f("#99787B").s().p("Ak6CHIAAkNIJ1AAIAAENg");
	this.shape_542.setTransform(123.125,12.55);

	this.shape_543 = new cjs.Shape();
	this.shape_543.graphics.f("#99787B").s().p("Ak5CHIAAkNIJzAAIAAENg");
	this.shape_543.setTransform(123.2,12.55);

	this.shape_544 = new cjs.Shape();
	this.shape_544.graphics.f("#99787B").s().p("Ak4CHIAAkNIJxAAIAAENg");
	this.shape_544.setTransform(123.275,12.55);

	this.shape_545 = new cjs.Shape();
	this.shape_545.graphics.f("#99787B").s().p("Ak3CHIAAkNIJvAAIAAENg");
	this.shape_545.setTransform(123.425,12.55);

	this.shape_546 = new cjs.Shape();
	this.shape_546.graphics.f("#99777B").s().p("Ak2CHIAAkNIJtAAIAAENg");
	this.shape_546.setTransform(123.5,12.55);

	this.shape_547 = new cjs.Shape();
	this.shape_547.graphics.f("#99777B").s().p("Ak1CHIAAkNIJrAAIAAENg");
	this.shape_547.setTransform(123.575,12.55);

	this.shape_548 = new cjs.Shape();
	this.shape_548.graphics.f("#99777B").s().p("Ak0CHIAAkNIJpAAIAAENg");
	this.shape_548.setTransform(123.725,12.55);

	this.shape_549 = new cjs.Shape();
	this.shape_549.graphics.f("#99777A").s().p("AkzCHIAAkNIJnAAIAAENg");
	this.shape_549.setTransform(123.825,12.55);

	this.shape_550 = new cjs.Shape();
	this.shape_550.graphics.f("#99777A").s().p("AkyCHIAAkNIJlAAIAAENg");
	this.shape_550.setTransform(123.9,12.55);

	this.shape_551 = new cjs.Shape();
	this.shape_551.graphics.f("#99777A").s().p("AkxCHIAAkNIJjAAIAAENg");
	this.shape_551.setTransform(123.975,12.55);

	this.shape_552 = new cjs.Shape();
	this.shape_552.graphics.f("#99777A").s().p("AkwCHIAAkNIJiAAIAAENg");
	this.shape_552.setTransform(124.05,12.55);

	this.shape_553 = new cjs.Shape();
	this.shape_553.graphics.f("#99777A").s().p("AkwCHIAAkNIJhAAIAAENg");
	this.shape_553.setTransform(124.125,12.55);

	this.shape_554 = new cjs.Shape();
	this.shape_554.graphics.f("#99777A").s().p("AkvCHIAAkNIJfAAIAAENg");
	this.shape_554.setTransform(124.2,12.55);

	this.shape_555 = new cjs.Shape();
	this.shape_555.graphics.f("#99777A").s().p("AkuCHIAAkNIJdAAIAAENg");
	this.shape_555.setTransform(124.275,12.55);

	this.shape_556 = new cjs.Shape();
	this.shape_556.graphics.f("#99777A").s().p("AktCHIAAkNIJcAAIAAENg");
	this.shape_556.setTransform(124.35,12.55);

	this.shape_557 = new cjs.Shape();
	this.shape_557.graphics.f("#99777A").s().p("AktCHIAAkNIJbAAIAAENg");
	this.shape_557.setTransform(124.425,12.55);

	this.shape_558 = new cjs.Shape();
	this.shape_558.graphics.f("#99777A").s().p("AksCHIAAkNIJZAAIAAENg");
	this.shape_558.setTransform(124.5,12.55);

	this.shape_559 = new cjs.Shape();
	this.shape_559.graphics.f("#99777A").s().p("AkrCHIAAkNIJXAAIAAENg");
	this.shape_559.setTransform(124.6,12.55);

	this.shape_560 = new cjs.Shape();
	this.shape_560.graphics.f("#99777A").s().p("AkqCHIAAkNIJVAAIAAENg");
	this.shape_560.setTransform(124.675,12.55);

	this.shape_561 = new cjs.Shape();
	this.shape_561.graphics.f("#99777A").s().p("AkpCHIAAkNIJTAAIAAENg");
	this.shape_561.setTransform(124.825,12.55);

	this.shape_562 = new cjs.Shape();
	this.shape_562.graphics.f("#99777A").s().p("AkoCHIAAkNIJRAAIAAENg");
	this.shape_562.setTransform(124.9,12.55);

	this.shape_563 = new cjs.Shape();
	this.shape_563.graphics.f("#99777A").s().p("AknCHIAAkNIJPAAIAAENg");
	this.shape_563.setTransform(124.975,12.55);

	this.shape_564 = new cjs.Shape();
	this.shape_564.graphics.f("#99777A").s().p("AkmCHIAAkNIJNAAIAAENg");
	this.shape_564.setTransform(125.125,12.55);

	this.shape_565 = new cjs.Shape();
	this.shape_565.graphics.f("#99777A").s().p("AklCHIAAkNIJLAAIAAENg");
	this.shape_565.setTransform(125.2,12.55);

	this.shape_566 = new cjs.Shape();
	this.shape_566.graphics.f("#997679").s().p("AkkCHIAAkNIJJAAIAAENg");
	this.shape_566.setTransform(125.275,12.55);

	this.shape_567 = new cjs.Shape();
	this.shape_567.graphics.f("#997679").s().p("AkjCHIAAkNIJHAAIAAENg");
	this.shape_567.setTransform(125.375,12.55);

	this.shape_568 = new cjs.Shape();
	this.shape_568.graphics.f("#997679").s().p("AkiCHIAAkNIJFAAIAAENg");
	this.shape_568.setTransform(125.525,12.55);

	this.shape_569 = new cjs.Shape();
	this.shape_569.graphics.f("#997679").s().p("AkhCHIAAkNIJDAAIAAENg");
	this.shape_569.setTransform(125.6,12.55);

	this.shape_570 = new cjs.Shape();
	this.shape_570.graphics.f("#997679").s().p("AkgCHIAAkNIJBAAIAAENg");
	this.shape_570.setTransform(125.675,12.55);

	this.shape_571 = new cjs.Shape();
	this.shape_571.graphics.f("#997679").s().p("AkfCHIAAkNIJAAAIAAENg");
	this.shape_571.setTransform(125.75,12.55);

	this.shape_572 = new cjs.Shape();
	this.shape_572.graphics.f("#997679").s().p("AkfCHIAAkNII/AAIAAENg");
	this.shape_572.setTransform(125.825,12.55);

	this.shape_573 = new cjs.Shape();
	this.shape_573.graphics.f("#997679").s().p("AkeCHIAAkNII9AAIAAENg");
	this.shape_573.setTransform(125.9,12.55);

	this.shape_574 = new cjs.Shape();
	this.shape_574.graphics.f("#997679").s().p("AkdCHIAAkNII7AAIAAENg");
	this.shape_574.setTransform(125.975,12.55);

	this.shape_575 = new cjs.Shape();
	this.shape_575.graphics.f("#997679").s().p("AkbCHIAAkNII4AAIAAENg");
	this.shape_575.setTransform(126.15,12.55);

	this.shape_576 = new cjs.Shape();
	this.shape_576.graphics.f("#997679").s().p("AkbCHIAAkNII3AAIAAENg");
	this.shape_576.setTransform(126.225,12.55);

	this.shape_577 = new cjs.Shape();
	this.shape_577.graphics.f("#997679").s().p("AkaCHIAAkNII1AAIAAENg");
	this.shape_577.setTransform(126.3,12.55);

	this.shape_578 = new cjs.Shape();
	this.shape_578.graphics.f("#997679").s().p("AkZCHIAAkNIIzAAIAAENg");
	this.shape_578.setTransform(126.375,12.55);

	this.shape_579 = new cjs.Shape();
	this.shape_579.graphics.f("#997679").s().p("AkYCHIAAkNIIxAAIAAENg");
	this.shape_579.setTransform(126.525,12.55);

	this.shape_580 = new cjs.Shape();
	this.shape_580.graphics.f("#997679").s().p("AkXCHIAAkNIIvAAIAAENg");
	this.shape_580.setTransform(126.6,12.55);

	this.shape_581 = new cjs.Shape();
	this.shape_581.graphics.f("#997679").s().p("AkWCHIAAkNIItAAIAAENg");
	this.shape_581.setTransform(126.675,12.55);

	this.shape_582 = new cjs.Shape();
	this.shape_582.graphics.f("#997678").s().p("AkVCHIAAkNIIsAAIAAENg");
	this.shape_582.setTransform(126.75,12.55);

	this.shape_583 = new cjs.Shape();
	this.shape_583.graphics.f("#997678").s().p("AkVCHIAAkNIIrAAIAAENg");
	this.shape_583.setTransform(126.825,12.55);

	this.shape_584 = new cjs.Shape();
	this.shape_584.graphics.f("#997678").s().p("AkUCHIAAkNIIpAAIAAENg");
	this.shape_584.setTransform(126.925,12.55);

	this.shape_585 = new cjs.Shape();
	this.shape_585.graphics.f("#997678").s().p("AkTCHIAAkNIInAAIAAENg");
	this.shape_585.setTransform(127,12.55);

	this.shape_586 = new cjs.Shape();
	this.shape_586.graphics.f("#997578").s().p("AkSCHIAAkNIIlAAIAAENg");
	this.shape_586.setTransform(127.075,12.55);

	this.shape_587 = new cjs.Shape();
	this.shape_587.graphics.f("#997578").s().p("AkRCHIAAkNIIkAAIAAENg");
	this.shape_587.setTransform(127.15,12.55);

	this.shape_588 = new cjs.Shape();
	this.shape_588.graphics.f("#997578").s().p("AkRCHIAAkNIIjAAIAAENg");
	this.shape_588.setTransform(127.225,12.55);

	this.shape_589 = new cjs.Shape();
	this.shape_589.graphics.f("#997578").s().p("AkQCHIAAkNIIhAAIAAENg");
	this.shape_589.setTransform(127.3,12.55);

	this.shape_590 = new cjs.Shape();
	this.shape_590.graphics.f("#997578").s().p("AkPCHIAAkNIIfAAIAAENg");
	this.shape_590.setTransform(127.375,12.55);

	this.shape_591 = new cjs.Shape();
	this.shape_591.graphics.f("#997578").s().p("AkOCHIAAkNIIdAAIAAENg");
	this.shape_591.setTransform(127.525,12.55);

	this.shape_592 = new cjs.Shape();
	this.shape_592.graphics.f("#997578").s().p("AkNCHIAAkNIIbAAIAAENg");
	this.shape_592.setTransform(127.625,12.55);

	this.shape_593 = new cjs.Shape();
	this.shape_593.graphics.f("#997578").s().p("AkMCHIAAkNIIZAAIAAENg");
	this.shape_593.setTransform(127.7,12.55);

	this.shape_594 = new cjs.Shape();
	this.shape_594.graphics.f("#997578").s().p("AkLCHIAAkNIIXAAIAAENg");
	this.shape_594.setTransform(127.775,12.55);

	this.shape_595 = new cjs.Shape();
	this.shape_595.graphics.f("#997578").s().p("AkKCHIAAkNIIVAAIAAENg");
	this.shape_595.setTransform(127.925,12.55);

	this.shape_596 = new cjs.Shape();
	this.shape_596.graphics.f("#997578").s().p("AkJCHIAAkNIITAAIAAENg");
	this.shape_596.setTransform(128,12.55);

	this.shape_597 = new cjs.Shape();
	this.shape_597.graphics.f("#997578").s().p("AkICHIAAkNIIRAAIAAENg");
	this.shape_597.setTransform(128.075,12.55);

	this.shape_598 = new cjs.Shape();
	this.shape_598.graphics.f("#997577").s().p("AkHCHIAAkNIIPAAIAAENg");
	this.shape_598.setTransform(128.225,12.55);

	this.shape_599 = new cjs.Shape();
	this.shape_599.graphics.f("#997577").s().p("AkGCHIAAkNIINAAIAAENg");
	this.shape_599.setTransform(128.3,12.55);

	this.shape_600 = new cjs.Shape();
	this.shape_600.graphics.f("#997577").s().p("AkFCHIAAkNIILAAIAAENg");
	this.shape_600.setTransform(128.4,12.55);

	this.shape_601 = new cjs.Shape();
	this.shape_601.graphics.f("#997577").s().p("AkECHIAAkNIIJAAIAAENg");
	this.shape_601.setTransform(128.475,12.55);

	this.shape_602 = new cjs.Shape();
	this.shape_602.graphics.f("#997577").s().p("AkDCHIAAkNIIIAAIAAENg");
	this.shape_602.setTransform(128.55,12.55);

	this.shape_603 = new cjs.Shape();
	this.shape_603.graphics.f("#997577").s().p("AkDCHIAAkNIIHAAIAAENg");
	this.shape_603.setTransform(128.625,12.55);

	this.shape_604 = new cjs.Shape();
	this.shape_604.graphics.f("#997577").s().p("AkCCHIAAkNIIFAAIAAENg");
	this.shape_604.setTransform(128.7,12.55);

	this.shape_605 = new cjs.Shape();
	this.shape_605.graphics.f("#997477").s().p("AkBCHIAAkNIIDAAIAAENg");
	this.shape_605.setTransform(128.775,12.55);

	this.shape_606 = new cjs.Shape();
	this.shape_606.graphics.f("#997477").s().p("AkACHIAAkNIICAAIAAENg");
	this.shape_606.setTransform(128.85,12.55);

	this.shape_607 = new cjs.Shape();
	this.shape_607.graphics.f("#997477").s().p("AkACHIAAkNIIBAAIAAENg");
	this.shape_607.setTransform(128.925,12.55);

	this.shape_608 = new cjs.Shape();
	this.shape_608.graphics.f("#997477").s().p("Aj/CHIAAkNIH/AAIAAENg");
	this.shape_608.setTransform(129,12.55);

	this.shape_609 = new cjs.Shape();
	this.shape_609.graphics.f("#997477").s().p("Aj+CHIAAkNIH9AAIAAENg");
	this.shape_609.setTransform(129.075,12.55);

	this.shape_610 = new cjs.Shape();
	this.shape_610.graphics.f("#997477").s().p("Aj9CHIAAkNIH7AAIAAENg");
	this.shape_610.setTransform(129.175,12.55);

	this.shape_611 = new cjs.Shape();
	this.shape_611.graphics.f("#997477").s().p("Aj8CHIAAkNIH5AAIAAENg");
	this.shape_611.setTransform(129.325,12.55);

	this.shape_612 = new cjs.Shape();
	this.shape_612.graphics.f("#997477").s().p("Aj7CHIAAkNIH3AAIAAENg");
	this.shape_612.setTransform(129.4,12.55);

	this.shape_613 = new cjs.Shape();
	this.shape_613.graphics.f("#997477").s().p("Aj6CHIAAkNIH1AAIAAENg");
	this.shape_613.setTransform(129.475,12.55);

	this.shape_614 = new cjs.Shape();
	this.shape_614.graphics.f("#997477").s().p("Aj5CHIAAkNIHzAAIAAENg");
	this.shape_614.setTransform(129.625,12.55);

	this.shape_615 = new cjs.Shape();
	this.shape_615.graphics.f("#997477").s().p("Aj4CHIAAkNIHxAAIAAENg");
	this.shape_615.setTransform(129.7,12.55);

	this.shape_616 = new cjs.Shape();
	this.shape_616.graphics.f("#997476").s().p("Aj3CHIAAkNIHvAAIAAENg");
	this.shape_616.setTransform(129.775,12.55);

	this.shape_617 = new cjs.Shape();
	this.shape_617.graphics.f("#997476").s().p("Aj2CHIAAkNIHuAAIAAENg");
	this.shape_617.setTransform(129.85,12.55);

	this.shape_618 = new cjs.Shape();
	this.shape_618.graphics.f("#997476").s().p("Aj2CHIAAkNIHtAAIAAENg");
	this.shape_618.setTransform(129.95,12.55);

	this.shape_619 = new cjs.Shape();
	this.shape_619.graphics.f("#997476").s().p("Aj1CHIAAkNIHrAAIAAENg");
	this.shape_619.setTransform(130.025,12.55);

	this.shape_620 = new cjs.Shape();
	this.shape_620.graphics.f("#997476").s().p("Aj0CHIAAkNIHpAAIAAENg");
	this.shape_620.setTransform(130.1,12.55);

	this.shape_621 = new cjs.Shape();
	this.shape_621.graphics.f("#997476").s().p("AjzCHIAAkNIHnAAIAAENg");
	this.shape_621.setTransform(130.175,12.55);

	this.shape_622 = new cjs.Shape();
	this.shape_622.graphics.f("#997476").s().p("AjyCHIAAkNIHmAAIAAENg");
	this.shape_622.setTransform(130.25,12.55);

	this.shape_623 = new cjs.Shape();
	this.shape_623.graphics.f("#997476").s().p("AjyCHIAAkNIHlAAIAAENg");
	this.shape_623.setTransform(130.325,12.55);

	this.shape_624 = new cjs.Shape();
	this.shape_624.graphics.f("#997476").s().p("AjxCHIAAkNIHjAAIAAENg");
	this.shape_624.setTransform(130.4,12.55);

	this.shape_625 = new cjs.Shape();
	this.shape_625.graphics.f("#997476").s().p("AjwCHIAAkNIHhAAIAAENg");
	this.shape_625.setTransform(130.475,12.55);

	this.shape_626 = new cjs.Shape();
	this.shape_626.graphics.f("#997376").s().p("AjwCHIAAkNIHhAAIAAENg");
	this.shape_626.setTransform(130.55,12.55);

	this.shape_627 = new cjs.Shape();
	this.shape_627.graphics.f("#997376").s().p("AjuCHIAAkNIHeAAIAAENg");
	this.shape_627.setTransform(130.65,12.55);

	this.shape_628 = new cjs.Shape();
	this.shape_628.graphics.f("#997376").s().p("AjuCHIAAkNIHdAAIAAENg");
	this.shape_628.setTransform(130.725,12.55);

	this.shape_629 = new cjs.Shape();
	this.shape_629.graphics.f("#997376").s().p("AjtCHIAAkNIHbAAIAAENg");
	this.shape_629.setTransform(130.8,12.55);

	this.shape_630 = new cjs.Shape();
	this.shape_630.graphics.f("#997376").s().p("AjsCHIAAkNIHZAAIAAENg");
	this.shape_630.setTransform(130.875,12.55);

	this.shape_631 = new cjs.Shape();
	this.shape_631.graphics.f("#997376").s().p("AjrCHIAAkNIHXAAIAAENg");
	this.shape_631.setTransform(131.025,12.55);

	this.shape_632 = new cjs.Shape();
	this.shape_632.graphics.f("#997376").s().p("AjqCHIAAkNIHVAAIAAENg");
	this.shape_632.setTransform(131.1,12.55);

	this.shape_633 = new cjs.Shape();
	this.shape_633.graphics.f("#997376").s().p("AjpCHIAAkNIHTAAIAAENg");
	this.shape_633.setTransform(131.175,12.55);

	this.shape_634 = new cjs.Shape();
	this.shape_634.graphics.f("#997375").s().p("AjoCHIAAkNIHSAAIAAENg");
	this.shape_634.setTransform(131.25,12.55);

	this.shape_635 = new cjs.Shape();
	this.shape_635.graphics.f("#997375").s().p("AjoCHIAAkNIHRAAIAAENg");
	this.shape_635.setTransform(131.325,12.55);

	this.shape_636 = new cjs.Shape();
	this.shape_636.graphics.f("#997375").s().p("AjnCHIAAkNIHPAAIAAENg");
	this.shape_636.setTransform(131.425,12.55);

	this.shape_637 = new cjs.Shape();
	this.shape_637.graphics.f("#997375").s().p("AjmCHIAAkNIHNAAIAAENg");
	this.shape_637.setTransform(131.5,12.55);

	this.shape_638 = new cjs.Shape();
	this.shape_638.graphics.f("#997375").s().p("AjlCHIAAkNIHLAAIAAENg");
	this.shape_638.setTransform(131.575,12.55);

	this.shape_639 = new cjs.Shape();
	this.shape_639.graphics.f("#997375").s().p("AjkCHIAAkNIHKAAIAAENg");
	this.shape_639.setTransform(131.65,12.55);

	this.shape_640 = new cjs.Shape();
	this.shape_640.graphics.f("#997375").s().p("AjkCHIAAkNIHJAAIAAENg");
	this.shape_640.setTransform(131.725,12.55);

	this.shape_641 = new cjs.Shape();
	this.shape_641.graphics.f("#997375").s().p("AjjCHIAAkNIHHAAIAAENg");
	this.shape_641.setTransform(131.8,12.55);

	this.shape_642 = new cjs.Shape();
	this.shape_642.graphics.f("#997375").s().p("AjiCHIAAkNIHFAAIAAENg");
	this.shape_642.setTransform(131.875,12.55);

	this.shape_643 = new cjs.Shape();
	this.shape_643.graphics.f("#997375").s().p("AjhCHIAAkNIHDAAIAAENg");
	this.shape_643.setTransform(132.025,12.55);

	this.shape_644 = new cjs.Shape();
	this.shape_644.graphics.f("#997375").s().p("AjgCHIAAkNIHBAAIAAENg");
	this.shape_644.setTransform(132.125,12.55);

	this.shape_645 = new cjs.Shape();
	this.shape_645.graphics.f("#997375").s().p("AjfCHIAAkNIG/AAIAAENg");
	this.shape_645.setTransform(132.2,12.55);

	this.shape_646 = new cjs.Shape();
	this.shape_646.graphics.f("#997375").s().p("AjeCHIAAkNIG9AAIAAENg");
	this.shape_646.setTransform(132.275,12.55);

	this.shape_647 = new cjs.Shape();
	this.shape_647.graphics.f("#997275").s().p("AjeCHIAAkNIG9AAIAAENg");
	this.shape_647.setTransform(132.35,12.55);

	this.shape_648 = new cjs.Shape();
	this.shape_648.graphics.f("#997275").s().p("AjdCHIAAkNIG7AAIAAENg");
	this.shape_648.setTransform(132.425,12.55);

	this.shape_649 = new cjs.Shape();
	this.shape_649.graphics.f("#997275").s().p("AjcCHIAAkNIG5AAIAAENg");
	this.shape_649.setTransform(132.5,12.55);

	this.shape_650 = new cjs.Shape();
	this.shape_650.graphics.f("#997275").s().p("AjbCHIAAkNIG3AAIAAENg");
	this.shape_650.setTransform(132.575,12.55);

	this.shape_651 = new cjs.Shape();
	this.shape_651.graphics.f("#997274").s().p("AjaCHIAAkNIG1AAIAAENg");
	this.shape_651.setTransform(132.725,12.55);

	this.shape_652 = new cjs.Shape();
	this.shape_652.graphics.f("#997274").s().p("AjZCHIAAkNIGzAAIAAENg");
	this.shape_652.setTransform(132.8,12.55);

	this.shape_653 = new cjs.Shape();
	this.shape_653.graphics.f("#997274").s().p("AjYCHIAAkNIGxAAIAAENg");
	this.shape_653.setTransform(132.9,12.55);

	this.shape_654 = new cjs.Shape();
	this.shape_654.graphics.f("#997274").s().p("AjXCHIAAkNIGvAAIAAENg");
	this.shape_654.setTransform(132.975,12.55);

	this.shape_655 = new cjs.Shape();
	this.shape_655.graphics.f("#997274").s().p("AjWCHIAAkNIGuAAIAAENg");
	this.shape_655.setTransform(133.05,12.55);

	this.shape_656 = new cjs.Shape();
	this.shape_656.graphics.f("#997274").s().p("AjWCHIAAkNIGtAAIAAENg");
	this.shape_656.setTransform(133.125,12.55);

	this.shape_657 = new cjs.Shape();
	this.shape_657.graphics.f("#997274").s().p("AjVCHIAAkNIGrAAIAAENg");
	this.shape_657.setTransform(133.2,12.55);

	this.shape_658 = new cjs.Shape();
	this.shape_658.graphics.f("#997274").s().p("AjUCHIAAkNIGpAAIAAENg");
	this.shape_658.setTransform(133.275,12.55);

	this.shape_659 = new cjs.Shape();
	this.shape_659.graphics.f("#997274").s().p("AjTCHIAAkNIGoAAIAAENg");
	this.shape_659.setTransform(133.35,12.55);

	this.shape_660 = new cjs.Shape();
	this.shape_660.graphics.f("#997274").s().p("AjTCHIAAkNIGnAAIAAENg");
	this.shape_660.setTransform(133.425,12.55);

	this.shape_661 = new cjs.Shape();
	this.shape_661.graphics.f("#997274").s().p("AjSCHIAAkNIGlAAIAAENg");
	this.shape_661.setTransform(133.5,12.55);

	this.shape_662 = new cjs.Shape();
	this.shape_662.graphics.f("#997274").s().p("AjRCHIAAkNIGjAAIAAENg");
	this.shape_662.setTransform(133.575,12.55);

	this.shape_663 = new cjs.Shape();
	this.shape_663.graphics.f("#997274").s().p("AjQCHIAAkNIGhAAIAAENg");
	this.shape_663.setTransform(133.675,12.55);

	this.shape_664 = new cjs.Shape();
	this.shape_664.graphics.f("#997274").s().p("AjPCHIAAkNIGfAAIAAENg");
	this.shape_664.setTransform(133.825,12.55);

	this.shape_665 = new cjs.Shape();
	this.shape_665.graphics.f("#997274").s().p("AjOCHIAAkNIGdAAIAAENg");
	this.shape_665.setTransform(133.9,12.55);

	this.shape_666 = new cjs.Shape();
	this.shape_666.graphics.f("#997274").s().p("AjNCHIAAkNIGbAAIAAENg");
	this.shape_666.setTransform(133.975,12.55);

	this.shape_667 = new cjs.Shape();
	this.shape_667.graphics.f("#997174").s().p("AjNCHIAAkNIGbAAIAAENg");
	this.shape_667.setTransform(134.05,12.55);

	this.shape_668 = new cjs.Shape();
	this.shape_668.graphics.f("#997174").s().p("AjMCHIAAkNIGZAAIAAENg");
	this.shape_668.setTransform(134.125,12.55);

	this.shape_669 = new cjs.Shape();
	this.shape_669.graphics.f("#997173").s().p("AjLCHIAAkNIGXAAIAAENg");
	this.shape_669.setTransform(134.2,12.55);

	this.shape_670 = new cjs.Shape();
	this.shape_670.graphics.f("#997173").s().p("AjKCHIAAkNIGVAAIAAENg");
	this.shape_670.setTransform(134.275,12.55);

	this.shape_671 = new cjs.Shape();
	this.shape_671.graphics.f("#997173").s().p("AjJCHIAAkNIGUAAIAAENg");
	this.shape_671.setTransform(134.35,12.55);

	this.shape_672 = new cjs.Shape();
	this.shape_672.graphics.f("#997173").s().p("AjJCHIAAkNIGTAAIAAENg");
	this.shape_672.setTransform(134.45,12.55);

	this.shape_673 = new cjs.Shape();
	this.shape_673.graphics.f("#997173").s().p("AjICHIAAkNIGRAAIAAENg");
	this.shape_673.setTransform(134.525,12.55);

	this.shape_674 = new cjs.Shape();
	this.shape_674.graphics.f("#997173").s().p("AjHCHIAAkNIGPAAIAAENg");
	this.shape_674.setTransform(134.6,12.55);

	this.shape_675 = new cjs.Shape();
	this.shape_675.graphics.f("#997173").s().p("AjGCHIAAkNIGNAAIAAENg");
	this.shape_675.setTransform(134.675,12.55);

	this.shape_676 = new cjs.Shape();
	this.shape_676.graphics.f("#997173").s().p("AjFCHIAAkNIGMAAIAAENg");
	this.shape_676.setTransform(134.75,12.55);

	this.shape_677 = new cjs.Shape();
	this.shape_677.graphics.f("#997173").s().p("AjFCHIAAkNIGLAAIAAENg");
	this.shape_677.setTransform(134.825,12.55);

	this.shape_678 = new cjs.Shape();
	this.shape_678.graphics.f("#997173").s().p("AjECHIAAkNIGJAAIAAENg");
	this.shape_678.setTransform(134.9,12.55);

	this.shape_679 = new cjs.Shape();
	this.shape_679.graphics.f("#997173").s().p("AjDCHIAAkNIGHAAIAAENg");
	this.shape_679.setTransform(134.975,12.55);

	this.shape_680 = new cjs.Shape();
	this.shape_680.graphics.f("#997173").s().p("AjBCHIAAkNIGEAAIAAENg");
	this.shape_680.setTransform(135.15,12.55);

	this.shape_681 = new cjs.Shape();
	this.shape_681.graphics.f("#997173").s().p("AjBCHIAAkNIGDAAIAAENg");
	this.shape_681.setTransform(135.225,12.55);

	this.shape_682 = new cjs.Shape();
	this.shape_682.graphics.f("#997173").s().p("AjACHIAAkNIGBAAIAAENg");
	this.shape_682.setTransform(135.3,12.55);

	this.shape_683 = new cjs.Shape();
	this.shape_683.graphics.f("#997173").s().p("Ai/CHIAAkNIF/AAIAAENg");
	this.shape_683.setTransform(135.375,12.55);

	this.shape_684 = new cjs.Shape();
	this.shape_684.graphics.f("#997173").s().p("Ai+CHIAAkNIF9AAIAAENg");
	this.shape_684.setTransform(135.525,12.55);

	this.shape_685 = new cjs.Shape();
	this.shape_685.graphics.f("#997173").s().p("Ai9CHIAAkNIF7AAIAAENg");
	this.shape_685.setTransform(135.6,12.55);

	this.shape_686 = new cjs.Shape();
	this.shape_686.graphics.f("#997172").s().p("Ai8CHIAAkNIF5AAIAAENg");
	this.shape_686.setTransform(135.675,12.55);

	this.shape_687 = new cjs.Shape();
	this.shape_687.graphics.f("#997172").s().p("Ai7CHIAAkNIF4AAIAAENg");
	this.shape_687.setTransform(135.75,12.55);

	this.shape_688 = new cjs.Shape();
	this.shape_688.graphics.f("#997072").s().p("Ai7CHIAAkNIF3AAIAAENg");
	this.shape_688.setTransform(135.825,12.55);

	this.shape_689 = new cjs.Shape();
	this.shape_689.graphics.f("#997072").s().p("Ai6CHIAAkNIF1AAIAAENg");
	this.shape_689.setTransform(135.925,12.55);

	this.shape_690 = new cjs.Shape();
	this.shape_690.graphics.f("#997072").s().p("Ai5CHIAAkNIFzAAIAAENg");
	this.shape_690.setTransform(136,12.55);

	this.shape_691 = new cjs.Shape();
	this.shape_691.graphics.f("#997072").s().p("Ai4CHIAAkNIFxAAIAAENg");
	this.shape_691.setTransform(136.075,12.55);

	this.shape_692 = new cjs.Shape();
	this.shape_692.graphics.f("#997072").s().p("Ai3CHIAAkNIFwAAIAAENg");
	this.shape_692.setTransform(136.15,12.55);

	this.shape_693 = new cjs.Shape();
	this.shape_693.graphics.f("#997072").s().p("Ai3CHIAAkNIFvAAIAAENg");
	this.shape_693.setTransform(136.225,12.55);

	this.shape_694 = new cjs.Shape();
	this.shape_694.graphics.f("#997072").s().p("Ai2CHIAAkNIFtAAIAAENg");
	this.shape_694.setTransform(136.3,12.55);

	this.shape_695 = new cjs.Shape();
	this.shape_695.graphics.f("#997072").s().p("Ai1CHIAAkNIFrAAIAAENg");
	this.shape_695.setTransform(136.375,12.55);

	this.shape_696 = new cjs.Shape();
	this.shape_696.graphics.f("#997072").s().p("Ai0CHIAAkNIFpAAIAAENg");
	this.shape_696.setTransform(136.525,12.55);

	this.shape_697 = new cjs.Shape();
	this.shape_697.graphics.f("#997072").s().p("AizCHIAAkNIFnAAIAAENg");
	this.shape_697.setTransform(136.625,12.55);

	this.shape_698 = new cjs.Shape();
	this.shape_698.graphics.f("#997072").s().p("AiyCHIAAkNIFlAAIAAENg");
	this.shape_698.setTransform(136.7,12.55);

	this.shape_699 = new cjs.Shape();
	this.shape_699.graphics.f("#997072").s().p("AixCHIAAkNIFjAAIAAENg");
	this.shape_699.setTransform(136.775,12.55);

	this.shape_700 = new cjs.Shape();
	this.shape_700.graphics.f("#997072").s().p("AiwCHIAAkNIFhAAIAAENg");
	this.shape_700.setTransform(136.925,12.55);

	this.shape_701 = new cjs.Shape();
	this.shape_701.graphics.f("#997072").s().p("AivCHIAAkNIFfAAIAAENg");
	this.shape_701.setTransform(137,12.55);

	this.shape_702 = new cjs.Shape();
	this.shape_702.graphics.f("#997072").s().p("AiuCHIAAkNIFdAAIAAENg");
	this.shape_702.setTransform(137.075,12.55);

	this.shape_703 = new cjs.Shape();
	this.shape_703.graphics.f("#997071").s().p("AitCHIAAkNIFbAAIAAENg");
	this.shape_703.setTransform(137.225,12.55);

	this.shape_704 = new cjs.Shape();
	this.shape_704.graphics.f("#997071").s().p("AisCHIAAkNIFZAAIAAENg");
	this.shape_704.setTransform(137.3,12.55);

	this.shape_705 = new cjs.Shape();
	this.shape_705.graphics.f("#997071").s().p("AirCHIAAkNIFXAAIAAENg");
	this.shape_705.setTransform(137.4,12.55);

	this.shape_706 = new cjs.Shape();
	this.shape_706.graphics.f("#997071").s().p("AiqCHIAAkNIFVAAIAAENg");
	this.shape_706.setTransform(137.475,12.55);

	this.shape_707 = new cjs.Shape();
	this.shape_707.graphics.f("#997071").s().p("AipCHIAAkNIFUAAIAAENg");
	this.shape_707.setTransform(137.55,12.55);

	this.shape_708 = new cjs.Shape();
	this.shape_708.graphics.f("#996F71").s().p("AipCHIAAkNIFTAAIAAENg");
	this.shape_708.setTransform(137.625,12.55);

	this.shape_709 = new cjs.Shape();
	this.shape_709.graphics.f("#996F71").s().p("AioCHIAAkNIFRAAIAAENg");
	this.shape_709.setTransform(137.7,12.55);

	this.shape_710 = new cjs.Shape();
	this.shape_710.graphics.f("#996F71").s().p("AinCHIAAkNIFPAAIAAENg");
	this.shape_710.setTransform(137.775,12.55);

	this.shape_711 = new cjs.Shape();
	this.shape_711.graphics.f("#996F71").s().p("AimCHIAAkNIFOAAIAAENg");
	this.shape_711.setTransform(137.85,12.55);

	this.shape_712 = new cjs.Shape();
	this.shape_712.graphics.f("#996F71").s().p("AimCHIAAkNIFNAAIAAENg");
	this.shape_712.setTransform(137.925,12.55);

	this.shape_713 = new cjs.Shape();
	this.shape_713.graphics.f("#996F71").s().p("AilCHIAAkNIFLAAIAAENg");
	this.shape_713.setTransform(138,12.55);

	this.shape_714 = new cjs.Shape();
	this.shape_714.graphics.f("#996F71").s().p("AikCHIAAkNIFJAAIAAENg");
	this.shape_714.setTransform(138.075,12.55);

	this.shape_715 = new cjs.Shape();
	this.shape_715.graphics.f("#996F71").s().p("AijCHIAAkNIFHAAIAAENg");
	this.shape_715.setTransform(138.175,12.55);

	this.shape_716 = new cjs.Shape();
	this.shape_716.graphics.f("#996F71").s().p("AiiCHIAAkNIFFAAIAAENg");
	this.shape_716.setTransform(138.325,12.55);

	this.shape_717 = new cjs.Shape();
	this.shape_717.graphics.f("#996F71").s().p("AihCHIAAkNIFDAAIAAENg");
	this.shape_717.setTransform(138.4,12.55);

	this.shape_718 = new cjs.Shape();
	this.shape_718.graphics.f("#996F71").s().p("AigCHIAAkNIFBAAIAAENg");
	this.shape_718.setTransform(138.475,12.55);

	this.shape_719 = new cjs.Shape();
	this.shape_719.graphics.f("#996F71").s().p("AifCHIAAkNIE/AAIAAENg");
	this.shape_719.setTransform(138.625,12.55);

	this.shape_720 = new cjs.Shape();
	this.shape_720.graphics.f("#996F70").s().p("AieCHIAAkNIE9AAIAAENg");
	this.shape_720.setTransform(138.7,12.55);

	this.shape_721 = new cjs.Shape();
	this.shape_721.graphics.f("#996F70").s().p("AidCHIAAkNIE7AAIAAENg");
	this.shape_721.setTransform(138.775,12.55);

	this.shape_722 = new cjs.Shape();
	this.shape_722.graphics.f("#996F70").s().p("AicCHIAAkNIE6AAIAAENg");
	this.shape_722.setTransform(138.85,12.55);

	this.shape_723 = new cjs.Shape();
	this.shape_723.graphics.f("#996F70").s().p("AicCHIAAkNIE5AAIAAENg");
	this.shape_723.setTransform(138.95,12.55);

	this.shape_724 = new cjs.Shape();
	this.shape_724.graphics.f("#996F70").s().p("AibCHIAAkNIE3AAIAAENg");
	this.shape_724.setTransform(139.025,12.55);

	this.shape_725 = new cjs.Shape();
	this.shape_725.graphics.f("#996F70").s().p("AiaCHIAAkNIE1AAIAAENg");
	this.shape_725.setTransform(139.1,12.55);

	this.shape_726 = new cjs.Shape();
	this.shape_726.graphics.f("#996F70").s().p("AiZCHIAAkNIEzAAIAAENg");
	this.shape_726.setTransform(139.175,12.55);

	this.shape_727 = new cjs.Shape();
	this.shape_727.graphics.f("#996F70").s().p("AiYCHIAAkNIEyAAIAAENg");
	this.shape_727.setTransform(139.25,12.55);

	this.shape_728 = new cjs.Shape();
	this.shape_728.graphics.f("#996F70").s().p("AiYCHIAAkNIExAAIAAENg");
	this.shape_728.setTransform(139.325,12.55);

	this.shape_729 = new cjs.Shape();
	this.shape_729.graphics.f("#996E70").s().p("AiXCHIAAkNIEvAAIAAENg");
	this.shape_729.setTransform(139.4,12.55);

	this.shape_730 = new cjs.Shape();
	this.shape_730.graphics.f("#996E70").s().p("AiWCHIAAkNIEtAAIAAENg");
	this.shape_730.setTransform(139.475,12.55);

	this.shape_731 = new cjs.Shape();
	this.shape_731.graphics.f("#996E70").s().p("AiVCHIAAkNIErAAIAAENg");
	this.shape_731.setTransform(139.625,12.55);

	this.shape_732 = new cjs.Shape();
	this.shape_732.graphics.f("#996E70").s().p("AiUCHIAAkNIEpAAIAAENg");
	this.shape_732.setTransform(139.725,12.55);

	this.shape_733 = new cjs.Shape();
	this.shape_733.graphics.f("#996E70").s().p("AiTCHIAAkNIEnAAIAAENg");
	this.shape_733.setTransform(139.8,12.55);

	this.shape_734 = new cjs.Shape();
	this.shape_734.graphics.f("#996E70").s().p("AiSCHIAAkNIElAAIAAENg");
	this.shape_734.setTransform(139.875,12.55);

	this.shape_735 = new cjs.Shape();
	this.shape_735.graphics.f("#996E70").s().p("AiRCHIAAkNIEjAAIAAENg");
	this.shape_735.setTransform(140.025,12.55);

	this.shape_736 = new cjs.Shape();
	this.shape_736.graphics.f("#996E70").s().p("AiQCHIAAkNIEhAAIAAENg");
	this.shape_736.setTransform(140.1,12.55);

	this.shape_737 = new cjs.Shape();
	this.shape_737.graphics.f("#996E6F").s().p("AiPCHIAAkNIEfAAIAAENg");
	this.shape_737.setTransform(140.175,12.55);

	this.shape_738 = new cjs.Shape();
	this.shape_738.graphics.f("#996E6F").s().p("AiOCHIAAkNIEeAAIAAENg");
	this.shape_738.setTransform(140.25,12.55);

	this.shape_739 = new cjs.Shape();
	this.shape_739.graphics.f("#996E6F").s().p("AiOCHIAAkNIEdAAIAAENg");
	this.shape_739.setTransform(140.325,12.55);

	this.shape_740 = new cjs.Shape();
	this.shape_740.graphics.f("#996E6F").s().p("AiNCHIAAkNIEbAAIAAENg");
	this.shape_740.setTransform(140.425,12.55);

	this.shape_741 = new cjs.Shape();
	this.shape_741.graphics.f("#996E6F").s().p("AiMCHIAAkNIEZAAIAAENg");
	this.shape_741.setTransform(140.5,12.55);

	this.shape_742 = new cjs.Shape();
	this.shape_742.graphics.f("#996E6F").s().p("AiLCHIAAkNIEXAAIAAENg");
	this.shape_742.setTransform(140.575,12.55);

	this.shape_743 = new cjs.Shape();
	this.shape_743.graphics.f("#996E6F").s().p("AiKCHIAAkNIEWAAIAAENg");
	this.shape_743.setTransform(140.65,12.55);

	this.shape_744 = new cjs.Shape();
	this.shape_744.graphics.f("#996E6F").s().p("AiKCHIAAkNIEVAAIAAENg");
	this.shape_744.setTransform(140.725,12.55);

	this.shape_745 = new cjs.Shape();
	this.shape_745.graphics.f("#996E6F").s().p("AiJCHIAAkNIETAAIAAENg");
	this.shape_745.setTransform(140.8,12.55);

	this.shape_746 = new cjs.Shape();
	this.shape_746.graphics.f("#996E6F").s().p("AiICHIAAkNIERAAIAAENg");
	this.shape_746.setTransform(140.875,12.55);

	this.shape_747 = new cjs.Shape();
	this.shape_747.graphics.f("#996E6F").s().p("AiHCHIAAkNIEPAAIAAENg");
	this.shape_747.setTransform(141.025,12.55);

	this.shape_748 = new cjs.Shape();
	this.shape_748.graphics.f("#996D6F").s().p("AiGCHIAAkNIENAAIAAENg");
	this.shape_748.setTransform(141.1,12.55);

	this.shape_749 = new cjs.Shape();
	this.shape_749.graphics.f("#996D6F").s().p("AiFCHIAAkNIELAAIAAENg");
	this.shape_749.setTransform(141.2,12.55);

	this.shape_750 = new cjs.Shape();
	this.shape_750.graphics.f("#996D6F").s().p("AiECHIAAkNIEJAAIAAENg");
	this.shape_750.setTransform(141.275,12.55);

	this.shape_751 = new cjs.Shape();
	this.shape_751.graphics.f("#996D6F").s().p("AiDCHIAAkNIEHAAIAAENg");
	this.shape_751.setTransform(141.425,12.55);

	this.shape_752 = new cjs.Shape();
	this.shape_752.graphics.f("#996D6F").s().p("AiCCHIAAkNIEFAAIAAENg");
	this.shape_752.setTransform(141.5,12.55);

	this.shape_753 = new cjs.Shape();
	this.shape_753.graphics.f("#996D6F").s().p("AiBCHIAAkNIEDAAIAAENg");
	this.shape_753.setTransform(141.575,12.55);

	this.shape_754 = new cjs.Shape();
	this.shape_754.graphics.f("#996D6E").s().p("AiBCHIAAkNIEDAAIAAENg");
	this.shape_754.setTransform(141.65,12.55);

	this.shape_755 = new cjs.Shape();
	this.shape_755.graphics.f("#996D6E").s().p("AiACHIAAkNIEBAAIAAENg");
	this.shape_755.setTransform(141.725,12.55);

	this.shape_756 = new cjs.Shape();
	this.shape_756.graphics.f("#996D6E").s().p("Ah/CHIAAkNID/AAIAAENg");
	this.shape_756.setTransform(141.8,12.55);

	this.shape_757 = new cjs.Shape();
	this.shape_757.graphics.f("#996D6E").s().p("Ah+CHIAAkNID9AAIAAENg");
	this.shape_757.setTransform(141.9,12.55);

	this.shape_758 = new cjs.Shape();
	this.shape_758.graphics.f("#996D6E").s().p("Ah9CHIAAkNID7AAIAAENg");
	this.shape_758.setTransform(141.975,12.55);

	this.shape_759 = new cjs.Shape();
	this.shape_759.graphics.f("#996D6E").s().p("Ah8CHIAAkNID6AAIAAENg");
	this.shape_759.setTransform(142.05,12.55);

	this.shape_760 = new cjs.Shape();
	this.shape_760.graphics.f("#996D6E").s().p("Ah8CHIAAkNID5AAIAAENg");
	this.shape_760.setTransform(142.125,12.55);

	this.shape_761 = new cjs.Shape();
	this.shape_761.graphics.f("#996D6E").s().p("Ah7CHIAAkNID3AAIAAENg");
	this.shape_761.setTransform(142.2,12.55);

	this.shape_762 = new cjs.Shape();
	this.shape_762.graphics.f("#996D6E").s().p("Ah6CHIAAkNID1AAIAAENg");
	this.shape_762.setTransform(142.275,12.55);

	this.shape_763 = new cjs.Shape();
	this.shape_763.graphics.f("#996D6E").s().p("Ah5CHIAAkNID0AAIAAENg");
	this.shape_763.setTransform(142.35,12.55);

	this.shape_764 = new cjs.Shape();
	this.shape_764.graphics.f("#996D6E").s().p("Ah5CHIAAkNIDzAAIAAENg");
	this.shape_764.setTransform(142.425,12.55);

	this.shape_765 = new cjs.Shape();
	this.shape_765.graphics.f("#996D6E").s().p("Ah4CHIAAkNIDxAAIAAENg");
	this.shape_765.setTransform(142.5,12.55);

	this.shape_766 = new cjs.Shape();
	this.shape_766.graphics.f("#996D6E").s().p("Ah3CHIAAkNIDvAAIAAENg");
	this.shape_766.setTransform(142.575,12.55);

	this.shape_767 = new cjs.Shape();
	this.shape_767.graphics.f("#996D6E").s().p("Ah2CHIAAkNIDtAAIAAENg");
	this.shape_767.setTransform(142.675,12.55);

	this.shape_768 = new cjs.Shape();
	this.shape_768.graphics.f("#996D6E").s().p("Ah1CHIAAkNIDrAAIAAENg");
	this.shape_768.setTransform(142.825,12.55);

	this.shape_769 = new cjs.Shape();
	this.shape_769.graphics.f("#996C6E").s().p("Ah0CHIAAkNIDpAAIAAENg");
	this.shape_769.setTransform(142.9,12.55);

	this.shape_770 = new cjs.Shape();
	this.shape_770.graphics.f("#996C6E").s().p("AhzCHIAAkNIDnAAIAAENg");
	this.shape_770.setTransform(142.975,12.55);

	this.shape_771 = new cjs.Shape();
	this.shape_771.graphics.f("#996C6D").s().p("AhyCHIAAkNIDlAAIAAENg");
	this.shape_771.setTransform(143.125,12.55);

	this.shape_772 = new cjs.Shape();
	this.shape_772.graphics.f("#996C6D").s().p("AhxCHIAAkNIDjAAIAAENg");
	this.shape_772.setTransform(143.2,12.55);

	this.shape_773 = new cjs.Shape();
	this.shape_773.graphics.f("#996C6D").s().p("AhwCHIAAkNIDhAAIAAENg");
	this.shape_773.setTransform(143.275,12.55);

	this.shape_774 = new cjs.Shape();
	this.shape_774.graphics.f("#996C6D").s().p("AhvCHIAAkNIDgAAIAAENg");
	this.shape_774.setTransform(143.35,12.55);

	this.shape_775 = new cjs.Shape();
	this.shape_775.graphics.f("#996C6D").s().p("AhuCHIAAkNIDeAAIAAENg");
	this.shape_775.setTransform(143.45,12.55);

	this.shape_776 = new cjs.Shape();
	this.shape_776.graphics.f("#996C6D").s().p("AhuCHIAAkNIDdAAIAAENg");
	this.shape_776.setTransform(143.525,12.55);

	this.shape_777 = new cjs.Shape();
	this.shape_777.graphics.f("#996C6D").s().p("AhtCHIAAkNIDbAAIAAENg");
	this.shape_777.setTransform(143.6,12.55);

	this.shape_778 = new cjs.Shape();
	this.shape_778.graphics.f("#996C6D").s().p("AhsCHIAAkNIDZAAIAAENg");
	this.shape_778.setTransform(143.675,12.55);

	this.shape_779 = new cjs.Shape();
	this.shape_779.graphics.f("#996C6D").s().p("AhrCHIAAkNIDYAAIAAENg");
	this.shape_779.setTransform(143.75,12.55);

	this.shape_780 = new cjs.Shape();
	this.shape_780.graphics.f("#996C6D").s().p("AhrCHIAAkNIDXAAIAAENg");
	this.shape_780.setTransform(143.825,12.55);

	this.shape_781 = new cjs.Shape();
	this.shape_781.graphics.f("#996C6D").s().p("AhqCHIAAkNIDVAAIAAENg");
	this.shape_781.setTransform(143.9,12.55);

	this.shape_782 = new cjs.Shape();
	this.shape_782.graphics.f("#996C6D").s().p("AhpCHIAAkNIDTAAIAAENg");
	this.shape_782.setTransform(143.975,12.55);

	this.shape_783 = new cjs.Shape();
	this.shape_783.graphics.f("#996C6D").s().p("AhoCHIAAkNIDRAAIAAENg");
	this.shape_783.setTransform(144.125,12.55);

	this.shape_784 = new cjs.Shape();
	this.shape_784.graphics.f("#996C6D").s().p("AhnCHIAAkNIDPAAIAAENg");
	this.shape_784.setTransform(144.225,12.55);

	this.shape_785 = new cjs.Shape();
	this.shape_785.graphics.f("#996C6D").s().p("AhmCHIAAkNIDNAAIAAENg");
	this.shape_785.setTransform(144.3,12.55);

	this.shape_786 = new cjs.Shape();
	this.shape_786.graphics.f("#996C6D").s().p("AhlCHIAAkNIDLAAIAAENg");
	this.shape_786.setTransform(144.375,12.55);

	this.shape_787 = new cjs.Shape();
	this.shape_787.graphics.f("#996C6D").s().p("AhkCHIAAkNIDJAAIAAENg");
	this.shape_787.setTransform(144.525,12.55);

	this.shape_788 = new cjs.Shape();
	this.shape_788.graphics.f("#996C6D").s().p("AhjCHIAAkNIDHAAIAAENg");
	this.shape_788.setTransform(144.6,12.55);

	this.shape_789 = new cjs.Shape();
	this.shape_789.graphics.f("#996B6C").s().p("AhiCHIAAkNIDFAAIAAENg");
	this.shape_789.setTransform(144.675,12.55);

	this.shape_790 = new cjs.Shape();
	this.shape_790.graphics.f("#996B6C").s().p("AhhCHIAAkNIDEAAIAAENg");
	this.shape_790.setTransform(144.75,12.55);

	this.shape_791 = new cjs.Shape();
	this.shape_791.graphics.f("#996B6C").s().p("AhhCHIAAkNIDDAAIAAENg");
	this.shape_791.setTransform(144.825,12.55);

	this.shape_792 = new cjs.Shape();
	this.shape_792.graphics.f("#996B6C").s().p("AhgCHIAAkNIDBAAIAAENg");
	this.shape_792.setTransform(144.925,12.55);

	this.shape_793 = new cjs.Shape();
	this.shape_793.graphics.f("#996B6C").s().p("AhfCHIAAkNIC/AAIAAENg");
	this.shape_793.setTransform(145,12.55);

	this.shape_794 = new cjs.Shape();
	this.shape_794.graphics.f("#996B6C").s().p("AheCHIAAkNIC9AAIAAENg");
	this.shape_794.setTransform(145.075,12.55);

	this.shape_795 = new cjs.Shape();
	this.shape_795.graphics.f("#996B6C").s().p("AhdCHIAAkNIC8AAIAAENg");
	this.shape_795.setTransform(145.15,12.55);

	this.shape_796 = new cjs.Shape();
	this.shape_796.graphics.f("#996B6C").s().p("AhdCHIAAkNIC7AAIAAENg");
	this.shape_796.setTransform(145.225,12.55);

	this.shape_797 = new cjs.Shape();
	this.shape_797.graphics.f("#996B6C").s().p("AhcCHIAAkNIC5AAIAAENg");
	this.shape_797.setTransform(145.3,12.55);

	this.shape_798 = new cjs.Shape();
	this.shape_798.graphics.f("#996B6C").s().p("AhbCHIAAkNIC3AAIAAENg");
	this.shape_798.setTransform(145.375,12.55);

	this.shape_799 = new cjs.Shape();
	this.shape_799.graphics.f("#996B6C").s().p("AhaCHIAAkNIC1AAIAAENg");
	this.shape_799.setTransform(145.525,12.55);

	this.shape_800 = new cjs.Shape();
	this.shape_800.graphics.f("#996B6C").s().p("AhZCHIAAkNICzAAIAAENg");
	this.shape_800.setTransform(145.6,12.55);

	this.shape_801 = new cjs.Shape();
	this.shape_801.graphics.f("#996B6C").s().p("AhYCHIAAkNICxAAIAAENg");
	this.shape_801.setTransform(145.7,12.55);

	this.shape_802 = new cjs.Shape();
	this.shape_802.graphics.f("#996B6C").s().p("AhXCHIAAkNICvAAIAAENg");
	this.shape_802.setTransform(145.775,12.55);

	this.shape_803 = new cjs.Shape();
	this.shape_803.graphics.f("#996B6C").s().p("AhWCHIAAkNICtAAIAAENg");
	this.shape_803.setTransform(145.925,12.55);

	this.shape_804 = new cjs.Shape();
	this.shape_804.graphics.f("#996B6C").s().p("AhVCHIAAkNICrAAIAAENg");
	this.shape_804.setTransform(146,12.55);

	this.shape_805 = new cjs.Shape();
	this.shape_805.graphics.f("#996B6C").s().p("AhUCHIAAkNICpAAIAAENg");
	this.shape_805.setTransform(146.075,12.55);

	this.shape_806 = new cjs.Shape();
	this.shape_806.graphics.f("#996B6B").s().p("AhUCHIAAkNICpAAIAAENg");
	this.shape_806.setTransform(146.15,12.55);

	this.shape_807 = new cjs.Shape();
	this.shape_807.graphics.f("#996B6B").s().p("AhTCHIAAkNICnAAIAAENg");
	this.shape_807.setTransform(146.225,12.55);

	this.shape_808 = new cjs.Shape();
	this.shape_808.graphics.f("#996B6B").s().p("AhSCHIAAkNIClAAIAAENg");
	this.shape_808.setTransform(146.3,12.55);

	this.shape_809 = new cjs.Shape();
	this.shape_809.graphics.f("#996A6B").s().p("AhRCHIAAkNICjAAIAAENg");
	this.shape_809.setTransform(146.4,12.55);

	this.shape_810 = new cjs.Shape();
	this.shape_810.graphics.f("#996A6B").s().p("AhQCHIAAkNIChAAIAAENg");
	this.shape_810.setTransform(146.475,12.55);

	this.shape_811 = new cjs.Shape();
	this.shape_811.graphics.f("#996A6B").s().p("AhPCHIAAkNICgAAIAAENg");
	this.shape_811.setTransform(146.55,12.55);

	this.shape_812 = new cjs.Shape();
	this.shape_812.graphics.f("#996A6B").s().p("AhPCHIAAkNICfAAIAAENg");
	this.shape_812.setTransform(146.625,12.55);

	this.shape_813 = new cjs.Shape();
	this.shape_813.graphics.f("#996A6B").s().p("AhOCHIAAkNICdAAIAAENg");
	this.shape_813.setTransform(146.7,12.55);

	this.shape_814 = new cjs.Shape();
	this.shape_814.graphics.f("#996A6B").s().p("AhNCHIAAkNICbAAIAAENg");
	this.shape_814.setTransform(146.775,12.55);

	this.shape_815 = new cjs.Shape();
	this.shape_815.graphics.f("#996A6B").s().p("AhMCHIAAkNICaAAIAAENg");
	this.shape_815.setTransform(146.85,12.55);

	this.shape_816 = new cjs.Shape();
	this.shape_816.graphics.f("#996A6B").s().p("AhMCHIAAkNICZAAIAAENg");
	this.shape_816.setTransform(146.925,12.55);

	this.shape_817 = new cjs.Shape();
	this.shape_817.graphics.f("#996A6B").s().p("AhLCHIAAkNICXAAIAAENg");
	this.shape_817.setTransform(147,12.55);

	this.shape_818 = new cjs.Shape();
	this.shape_818.graphics.f("#996A6B").s().p("AhKCHIAAkNICVAAIAAENg");
	this.shape_818.setTransform(147.075,12.55);

	this.shape_819 = new cjs.Shape();
	this.shape_819.graphics.f("#996A6B").s().p("AhJCHIAAkNICTAAIAAENg");
	this.shape_819.setTransform(147.175,12.55);

	this.shape_820 = new cjs.Shape();
	this.shape_820.graphics.f("#996A6B").s().p("AhICHIAAkNICRAAIAAENg");
	this.shape_820.setTransform(147.325,12.55);

	this.shape_821 = new cjs.Shape();
	this.shape_821.graphics.f("#996A6B").s().p("AhHCHIAAkNICPAAIAAENg");
	this.shape_821.setTransform(147.4,12.55);

	this.shape_822 = new cjs.Shape();
	this.shape_822.graphics.f("#996A6B").s().p("AhGCHIAAkNICNAAIAAENg");
	this.shape_822.setTransform(147.475,12.55);

	this.shape_823 = new cjs.Shape();
	this.shape_823.graphics.f("#996A6A").s().p("AhFCHIAAkNICLAAIAAENg");
	this.shape_823.setTransform(147.625,12.55);

	this.shape_824 = new cjs.Shape();
	this.shape_824.graphics.f("#996A6A").s().p("AhECHIAAkNICJAAIAAENg");
	this.shape_824.setTransform(147.7,12.55);

	this.shape_825 = new cjs.Shape();
	this.shape_825.graphics.f("#996A6A").s().p("AhDCHIAAkNICHAAIAAENg");
	this.shape_825.setTransform(147.775,12.55);

	this.shape_826 = new cjs.Shape();
	this.shape_826.graphics.f("#996A6A").s().p("AhCCHIAAkNICGAAIAAENg");
	this.shape_826.setTransform(147.85,12.55);

	this.shape_827 = new cjs.Shape();
	this.shape_827.graphics.f("#996A6A").s().p("AhBCHIAAkNICEAAIAAENg");
	this.shape_827.setTransform(147.95,12.55);

	this.shape_828 = new cjs.Shape();
	this.shape_828.graphics.f("#996A6A").s().p("AhBCHIAAkNICDAAIAAENg");
	this.shape_828.setTransform(148.025,12.55);

	this.shape_829 = new cjs.Shape();
	this.shape_829.graphics.f("#996A6A").s().p("AhACHIAAkNICBAAIAAENg");
	this.shape_829.setTransform(148.1,12.55);

	this.shape_830 = new cjs.Shape();
	this.shape_830.graphics.f("#99696A").s().p("Ag/CHIAAkNIB/AAIAAENg");
	this.shape_830.setTransform(148.175,12.55);

	this.shape_831 = new cjs.Shape();
	this.shape_831.graphics.f("#99696A").s().p("Ag+CHIAAkNIB+AAIAAENg");
	this.shape_831.setTransform(148.25,12.55);

	this.shape_832 = new cjs.Shape();
	this.shape_832.graphics.f("#99696A").s().p("Ag+CHIAAkNIB9AAIAAENg");
	this.shape_832.setTransform(148.325,12.55);

	this.shape_833 = new cjs.Shape();
	this.shape_833.graphics.f("#99696A").s().p("Ag9CHIAAkNIB7AAIAAENg");
	this.shape_833.setTransform(148.4,12.55);

	this.shape_834 = new cjs.Shape();
	this.shape_834.graphics.f("#99696A").s().p("Ag8CHIAAkNIB5AAIAAENg");
	this.shape_834.setTransform(148.475,12.55);

	this.shape_835 = new cjs.Shape();
	this.shape_835.graphics.f("#99696A").s().p("Ag7CHIAAkNIB3AAIAAENg");
	this.shape_835.setTransform(148.625,12.55);

	this.shape_836 = new cjs.Shape();
	this.shape_836.graphics.f("#99696A").s().p("Ag6CHIAAkNIB1AAIAAENg");
	this.shape_836.setTransform(148.725,12.55);

	this.shape_837 = new cjs.Shape();
	this.shape_837.graphics.f("#99696A").s().p("Ag5CHIAAkNIBzAAIAAENg");
	this.shape_837.setTransform(148.8,12.55);

	this.shape_838 = new cjs.Shape();
	this.shape_838.graphics.f("#99696A").s().p("Ag4CHIAAkNIBxAAIAAENg");
	this.shape_838.setTransform(148.875,12.55);

	this.shape_839 = new cjs.Shape();
	this.shape_839.graphics.f("#99696A").s().p("Ag3CHIAAkNIBvAAIAAENg");
	this.shape_839.setTransform(149.025,12.55);

	this.shape_840 = new cjs.Shape();
	this.shape_840.graphics.f("#996969").s().p("Ag2CHIAAkNIBtAAIAAENg");
	this.shape_840.setTransform(149.1,12.55);

	this.shape_841 = new cjs.Shape();
	this.shape_841.graphics.f("#996969").s().p("Ag1CHIAAkNIBrAAIAAENg");
	this.shape_841.setTransform(149.175,12.55);

	this.shape_842 = new cjs.Shape();
	this.shape_842.graphics.f("#996969").s().p("Ag0CHIAAkNIBqAAIAAENg");
	this.shape_842.setTransform(149.25,12.55);

	this.shape_843 = new cjs.Shape();
	this.shape_843.graphics.f("#996969").s().p("Ag0CHIAAkNIBpAAIAAENg");
	this.shape_843.setTransform(149.325,12.55);

	this.shape_844 = new cjs.Shape();
	this.shape_844.graphics.f("#996969").s().p("AgzCHIAAkNIBnAAIAAENg");
	this.shape_844.setTransform(149.4,12.55);

	this.shape_845 = new cjs.Shape();
	this.shape_845.graphics.f("#996969").s().p("AgyCHIAAkNIBlAAIAAENg");
	this.shape_845.setTransform(149.5,12.55);

	this.shape_846 = new cjs.Shape();
	this.shape_846.graphics.f("#996969").s().p("AgxCHIAAkNIBjAAIAAENg");
	this.shape_846.setTransform(149.575,12.55);

	this.shape_847 = new cjs.Shape();
	this.shape_847.graphics.f("#996969").s().p("AgwCHIAAkNIBiAAIAAENg");
	this.shape_847.setTransform(149.65,12.55);

	this.shape_848 = new cjs.Shape();
	this.shape_848.graphics.f("#996969").s().p("AgwCHIAAkNIBhAAIAAENg");
	this.shape_848.setTransform(149.725,12.55);

	this.shape_849 = new cjs.Shape();
	this.shape_849.graphics.f("#996969").s().p("AgvCHIAAkNIBfAAIAAENg");
	this.shape_849.setTransform(149.8,12.55);

	this.shape_850 = new cjs.Shape();
	this.shape_850.graphics.f("#996969").s().p("AguCHIAAkNIBdAAIAAENg");
	this.shape_850.setTransform(149.875,12.55);

	this.shape_851 = new cjs.Shape();
	this.shape_851.graphics.f("#996869").s().p("AguCHIAAkNIBdAAIAAENg");
	this.shape_851.setTransform(149.95,12.55);

	this.shape_852 = new cjs.Shape();
	this.shape_852.graphics.f("#996869").s().p("AgtCHIAAkNIBbAAIAAENg");
	this.shape_852.setTransform(150.025,12.55);

	this.shape_853 = new cjs.Shape();
	this.shape_853.graphics.f("#996869").s().p("AgsCHIAAkNIBZAAIAAENg");
	this.shape_853.setTransform(150.1,12.55);

	this.shape_854 = new cjs.Shape();
	this.shape_854.graphics.f("#996869").s().p("AgrCHIAAkNIBXAAIAAENg");
	this.shape_854.setTransform(150.2,12.55);

	this.shape_855 = new cjs.Shape();
	this.shape_855.graphics.f("#996869").s().p("AgqCHIAAkNIBVAAIAAENg");
	this.shape_855.setTransform(150.275,12.55);

	this.shape_856 = new cjs.Shape();
	this.shape_856.graphics.f("#996869").s().p("AgpCHIAAkNIBTAAIAAENg");
	this.shape_856.setTransform(150.425,12.55);

	this.shape_857 = new cjs.Shape();
	this.shape_857.graphics.f("#996869").s().p("AgoCHIAAkNIBRAAIAAENg");
	this.shape_857.setTransform(150.5,12.55);

	this.shape_858 = new cjs.Shape();
	this.shape_858.graphics.f("#996868").s().p("AgnCHIAAkNIBPAAIAAENg");
	this.shape_858.setTransform(150.575,12.55);

	this.shape_859 = new cjs.Shape();
	this.shape_859.graphics.f("#996868").s().p("AgmCHIAAkNIBNAAIAAENg");
	this.shape_859.setTransform(150.725,12.55);

	this.shape_860 = new cjs.Shape();
	this.shape_860.graphics.f("#996868").s().p("AglCHIAAkNIBLAAIAAENg");
	this.shape_860.setTransform(150.8,12.55);

	this.shape_861 = new cjs.Shape();
	this.shape_861.graphics.f("#996868").s().p("AgkCHIAAkNIBJAAIAAENg");
	this.shape_861.setTransform(150.875,12.55);

	this.shape_862 = new cjs.Shape();
	this.shape_862.graphics.f("#996868").s().p("AgjCHIAAkNIBHAAIAAENg");
	this.shape_862.setTransform(150.975,12.55);

	this.shape_863 = new cjs.Shape();
	this.shape_863.graphics.f("#996868").s().p("AgiCHIAAkNIBGAAIAAENg");
	this.shape_863.setTransform(151.05,12.55);

	this.shape_864 = new cjs.Shape();
	this.shape_864.graphics.f("#996868").s().p("AgiCHIAAkNIBFAAIAAENg");
	this.shape_864.setTransform(151.125,12.55);

	this.shape_865 = new cjs.Shape();
	this.shape_865.graphics.f("#996868").s().p("AghCHIAAkNIBDAAIAAENg");
	this.shape_865.setTransform(151.2,12.55);

	this.shape_866 = new cjs.Shape();
	this.shape_866.graphics.f("#996868").s().p("AggCHIAAkNIBBAAIAAENg");
	this.shape_866.setTransform(151.275,12.55);

	this.shape_867 = new cjs.Shape();
	this.shape_867.graphics.f("#996868").s().p("AgfCHIAAkNIBAAAIAAENg");
	this.shape_867.setTransform(151.35,12.55);

	this.shape_868 = new cjs.Shape();
	this.shape_868.graphics.f("#996868").s().p("AgfCHIAAkNIA/AAIAAENg");
	this.shape_868.setTransform(151.425,12.55);

	this.shape_869 = new cjs.Shape();
	this.shape_869.graphics.f("#996868").s().p("AgeCHIAAkNIA9AAIAAENg");
	this.shape_869.setTransform(151.5,12.55);

	this.shape_870 = new cjs.Shape();
	this.shape_870.graphics.f("#996868").s().p("AgdCHIAAkNIA7AAIAAENg");
	this.shape_870.setTransform(151.575,12.55);

	this.shape_871 = new cjs.Shape();
	this.shape_871.graphics.f("#996768").s().p("AgcCHIAAkNIA5AAIAAENg");
	this.shape_871.setTransform(151.675,12.55);

	this.shape_872 = new cjs.Shape();
	this.shape_872.graphics.f("#996768").s().p("AgbCHIAAkNIA3AAIAAENg");
	this.shape_872.setTransform(151.825,12.55);

	this.shape_873 = new cjs.Shape();
	this.shape_873.graphics.f("#996768").s().p("AgaCHIAAkNIA1AAIAAENg");
	this.shape_873.setTransform(151.9,12.55);

	this.shape_874 = new cjs.Shape();
	this.shape_874.graphics.f("#996768").s().p("AgZCHIAAkNIAzAAIAAENg");
	this.shape_874.setTransform(151.975,12.55);

	this.shape_875 = new cjs.Shape();
	this.shape_875.graphics.f("#996767").s().p("AgYCHIAAkNIAxAAIAAENg");
	this.shape_875.setTransform(152.125,12.55);

	this.shape_876 = new cjs.Shape();
	this.shape_876.graphics.f("#996767").s().p("AgXCHIAAkNIAvAAIAAENg");
	this.shape_876.setTransform(152.2,12.55);

	this.shape_877 = new cjs.Shape();
	this.shape_877.graphics.f("#996767").s().p("AgWCHIAAkNIAtAAIAAENg");
	this.shape_877.setTransform(152.275,12.55);

	this.shape_878 = new cjs.Shape();
	this.shape_878.graphics.f("#996767").s().p("AgVCHIAAkNIAsAAIAAENg");
	this.shape_878.setTransform(152.35,12.55);

	this.shape_879 = new cjs.Shape();
	this.shape_879.graphics.f("#996767").s().p("AgUCHIAAkNIAqAAIAAENg");
	this.shape_879.setTransform(152.45,12.55);

	this.shape_880 = new cjs.Shape();
	this.shape_880.graphics.f("#996767").s().p("AgUCHIAAkNIApAAIAAENg");
	this.shape_880.setTransform(152.525,12.55);

	this.shape_881 = new cjs.Shape();
	this.shape_881.graphics.f("#996767").s().p("AgTCHIAAkNIAnAAIAAENg");
	this.shape_881.setTransform(152.6,12.55);

	this.shape_882 = new cjs.Shape();
	this.shape_882.graphics.f("#996767").s().p("AgSCHIAAkNIAlAAIAAENg");
	this.shape_882.setTransform(152.675,12.55);

	this.shape_883 = new cjs.Shape();
	this.shape_883.graphics.f("#996767").s().p("AgRCHIAAkNIAkAAIAAENg");
	this.shape_883.setTransform(152.75,12.55);

	this.shape_884 = new cjs.Shape();
	this.shape_884.graphics.f("#996767").s().p("AgRCHIAAkNIAjAAIAAENg");
	this.shape_884.setTransform(152.825,12.55);

	this.shape_885 = new cjs.Shape();
	this.shape_885.graphics.f("#996767").s().p("AgQCHIAAkNIAhAAIAAENg");
	this.shape_885.setTransform(152.9,12.55);

	this.shape_886 = new cjs.Shape();
	this.shape_886.graphics.f("#996767").s().p("AgPCHIAAkNIAfAAIAAENg");
	this.shape_886.setTransform(152.975,12.55);

	this.shape_887 = new cjs.Shape();
	this.shape_887.graphics.f("#996767").s().p("AgOCHIAAkNIAdAAIAAENg");
	this.shape_887.setTransform(153.125,12.55);

	this.shape_888 = new cjs.Shape();
	this.shape_888.graphics.f("#996767").s().p("AgNCHIAAkNIAbAAIAAENg");
	this.shape_888.setTransform(153.225,12.55);

	this.shape_889 = new cjs.Shape();
	this.shape_889.graphics.f("#996767").s().p("AgMCHIAAkNIAZAAIAAENg");
	this.shape_889.setTransform(153.3,12.55);

	this.shape_890 = new cjs.Shape();
	this.shape_890.graphics.f("#996767").s().p("AgLCHIAAkNIAXAAIAAENg");
	this.shape_890.setTransform(153.375,12.55);

	this.shape_891 = new cjs.Shape();
	this.shape_891.graphics.f("#996667").s().p("AgLCHIAAkNIAXAAIAAENg");
	this.shape_891.setTransform(153.45,12.55);

	this.shape_892 = new cjs.Shape();
	this.shape_892.graphics.f("#996667").s().p("AgKCHIAAkNIAVAAIAAENg");
	this.shape_892.setTransform(153.525,12.55);

	this.shape_893 = new cjs.Shape();
	this.shape_893.graphics.f("#996666").s().p("AgJCHIAAkNIATAAIAAENg");
	this.shape_893.setTransform(153.6,12.55);

	this.shape_894 = new cjs.Shape();
	this.shape_894.graphics.f("#996666").s().p("AgICHIAAkNIARAAIAAENg");
	this.shape_894.setTransform(153.675,12.55);

	this.shape_895 = new cjs.Shape();
	this.shape_895.graphics.f("#996666").s().p("AgHCHIAAkNIAQAAIAAENg");
	this.shape_895.setTransform(153.75,12.55);

	this.shape_896 = new cjs.Shape();
	this.shape_896.graphics.f("#996666").s().p("AgHCHIAAkNIAPAAIAAENg");
	this.shape_896.setTransform(153.825,12.55);

	this.shape_897 = new cjs.Shape();
	this.shape_897.graphics.f("#996666").s().p("AgGCHIAAkNIANAAIAAENg");
	this.shape_897.setTransform(153.9,12.55);

	this.shape_898 = new cjs.Shape();
	this.shape_898.graphics.f("#996666").s().p("AgFCHIAAkNIALAAIAAENg");
	this.shape_898.setTransform(154,12.55);

	this.shape_899 = new cjs.Shape();
	this.shape_899.graphics.f("#996666").s().p("AgECHIAAkNIAJAAIAAENg");
	this.shape_899.setTransform(154.075,12.55);

	this.shape_900 = new cjs.Shape();
	this.shape_900.graphics.f("#996666").s().p("AgDCHIAAkNIAIAAIAAENg");
	this.shape_900.setTransform(154.15,12.55);

	this.shape_901 = new cjs.Shape();
	this.shape_901.graphics.f("#996666").s().p("AgDCHIAAkNIAHAAIAAENg");
	this.shape_901.setTransform(154.225,12.55);

	this.shape_902 = new cjs.Shape();
	this.shape_902.graphics.f("#996666").s().p("AgCCHIAAkNIAFAAIAAENg");
	this.shape_902.setTransform(154.3,12.55);

	this.instance = new lib.Bitmap2();
	this.instance.setTransform(152,-503);

	this.replay_btn = new lib.replay_btn();
	this.replay_btn.name = "replay_btn";
	this.replay_btn.setTransform(396.4,423.8,1,1,0,0,0,300.5,111.5);
	new cjs.ButtonHelper(this.replay_btn, 0, 1, 2);

	this.explosion_mc = new lib.explosion_mc();
	this.explosion_mc.name = "explosion_mc";
	this.explosion_mc.setTransform(378.75,21.1,1,1,0,0,0,445.8,544.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1}]}).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4,p:{x:77}}]},1).to({state:[{t:this.shape_4,p:{x:77.075}}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8,p:{x:77.4}}]},1).to({state:[{t:this.shape_8,p:{x:77.475}}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_24}]},1).to({state:[{t:this.shape_25,p:{x:78.8}}]},1).to({state:[{t:this.shape_25,p:{x:78.875}}]},1).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_28,p:{x:79.1}}]},1).to({state:[{t:this.shape_28,p:{x:79.175}}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_31}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_33}]},1).to({state:[{t:this.shape_34}]},1).to({state:[{t:this.shape_35}]},1).to({state:[{t:this.shape_36}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_38}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_41}]},1).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_43}]},1).to({state:[{t:this.shape_44}]},1).to({state:[{t:this.shape_45}]},1).to({state:[{t:this.shape_46}]},1).to({state:[{t:this.shape_47}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_49}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_51}]},1).to({state:[{t:this.shape_52}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_54}]},1).to({state:[{t:this.shape_55}]},1).to({state:[{t:this.shape_56}]},1).to({state:[{t:this.shape_57}]},1).to({state:[{t:this.shape_58,p:{x:81.5}}]},1).to({state:[{t:this.shape_58,p:{x:81.575}}]},1).to({state:[{t:this.shape_59}]},1).to({state:[{t:this.shape_60}]},1).to({state:[{t:this.shape_61}]},1).to({state:[{t:this.shape_62,p:{x:81.9}}]},1).to({state:[{t:this.shape_62,p:{x:81.975}}]},1).to({state:[{t:this.shape_63}]},1).to({state:[{t:this.shape_64}]},1).to({state:[{t:this.shape_65}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_67}]},1).to({state:[{t:this.shape_68}]},1).to({state:[{t:this.shape_69}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_71}]},1).to({state:[{t:this.shape_72}]},1).to({state:[{t:this.shape_73}]},1).to({state:[{t:this.shape_74}]},1).to({state:[{t:this.shape_75}]},1).to({state:[{t:this.shape_76}]},1).to({state:[{t:this.shape_77}]},1).to({state:[{t:this.shape_78}]},1).to({state:[{t:this.shape_79,p:{x:83.3}}]},1).to({state:[{t:this.shape_79,p:{x:83.375}}]},1).to({state:[{t:this.shape_80}]},1).to({state:[{t:this.shape_81}]},1).to({state:[{t:this.shape_82,p:{x:83.6}}]},1).to({state:[{t:this.shape_82,p:{x:83.675}}]},1).to({state:[{t:this.shape_83}]},1).to({state:[{t:this.shape_84}]},1).to({state:[{t:this.shape_85}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_87}]},1).to({state:[{t:this.shape_88}]},1).to({state:[{t:this.shape_89}]},1).to({state:[{t:this.shape_90}]},1).to({state:[{t:this.shape_91}]},1).to({state:[{t:this.shape_92}]},1).to({state:[{t:this.shape_93}]},1).to({state:[{t:this.shape_94,p:{x:84.6}}]},1).to({state:[{t:this.shape_94,p:{x:84.675}}]},1).to({state:[{t:this.shape_95}]},1).to({state:[{t:this.shape_96}]},1).to({state:[{t:this.shape_97}]},1).to({state:[{t:this.shape_98,p:{x:85}}]},1).to({state:[{t:this.shape_98,p:{x:85.075}}]},1).to({state:[{t:this.shape_99}]},1).to({state:[{t:this.shape_100}]},1).to({state:[{t:this.shape_101}]},1).to({state:[{t:this.shape_102}]},1).to({state:[{t:this.shape_103}]},1).to({state:[{t:this.shape_104}]},1).to({state:[{t:this.shape_105}]},1).to({state:[{t:this.shape_106}]},1).to({state:[{t:this.shape_107}]},1).to({state:[{t:this.shape_108}]},1).to({state:[{t:this.shape_109}]},1).to({state:[{t:this.shape_110,p:{x:86}}]},1).to({state:[{t:this.shape_110,p:{x:86.075}}]},1).to({state:[{t:this.shape_111}]},1).to({state:[{t:this.shape_112}]},1).to({state:[{t:this.shape_113}]},1).to({state:[{t:this.shape_114}]},1).to({state:[{t:this.shape_115}]},1).to({state:[{t:this.shape_116}]},1).to({state:[{t:this.shape_117}]},1).to({state:[{t:this.shape_118}]},1).to({state:[{t:this.shape_119}]},1).to({state:[{t:this.shape_120}]},1).to({state:[{t:this.shape_121}]},1).to({state:[{t:this.shape_122}]},1).to({state:[{t:this.shape_123}]},1).to({state:[{t:this.shape_124}]},1).to({state:[{t:this.shape_125}]},1).to({state:[{t:this.shape_126}]},1).to({state:[{t:this.shape_127}]},1).to({state:[{t:this.shape_128}]},1).to({state:[{t:this.shape_129}]},1).to({state:[{t:this.shape_130}]},1).to({state:[{t:this.shape_131}]},1).to({state:[{t:this.shape_132,p:{x:87.8}}]},1).to({state:[{t:this.shape_132,p:{x:87.875}}]},1).to({state:[{t:this.shape_133}]},1).to({state:[{t:this.shape_134}]},1).to({state:[{t:this.shape_135,p:{x:88.1}}]},1).to({state:[{t:this.shape_135,p:{x:88.175}}]},1).to({state:[{t:this.shape_136}]},1).to({state:[{t:this.shape_137}]},1).to({state:[{t:this.shape_138}]},1).to({state:[{t:this.shape_139}]},1).to({state:[{t:this.shape_140}]},1).to({state:[{t:this.shape_141}]},1).to({state:[{t:this.shape_142}]},1).to({state:[{t:this.shape_143}]},1).to({state:[{t:this.shape_144}]},1).to({state:[{t:this.shape_145}]},1).to({state:[{t:this.shape_146}]},1).to({state:[{t:this.shape_147,p:{x:89.1}}]},1).to({state:[{t:this.shape_147,p:{x:89.175}}]},1).to({state:[{t:this.shape_148}]},1).to({state:[{t:this.shape_149}]},1).to({state:[{t:this.shape_150}]},1).to({state:[{t:this.shape_151,p:{x:89.5}}]},1).to({state:[{t:this.shape_151,p:{x:89.575}}]},1).to({state:[{t:this.shape_152}]},1).to({state:[{t:this.shape_153}]},1).to({state:[{t:this.shape_154}]},1).to({state:[{t:this.shape_155}]},1).to({state:[{t:this.shape_156}]},1).to({state:[{t:this.shape_157}]},1).to({state:[{t:this.shape_158}]},1).to({state:[{t:this.shape_159}]},1).to({state:[{t:this.shape_160}]},1).to({state:[{t:this.shape_161}]},1).to({state:[{t:this.shape_162}]},1).to({state:[{t:this.shape_163,p:{x:90.5}}]},1).to({state:[{t:this.shape_163,p:{x:90.575}}]},1).to({state:[{t:this.shape_164}]},1).to({state:[{t:this.shape_165}]},1).to({state:[{t:this.shape_166}]},1).to({state:[{t:this.shape_167}]},1).to({state:[{t:this.shape_168}]},1).to({state:[{t:this.shape_169}]},1).to({state:[{t:this.shape_170}]},1).to({state:[{t:this.shape_171}]},1).to({state:[{t:this.shape_172}]},1).to({state:[{t:this.shape_173}]},1).to({state:[{t:this.shape_174}]},1).to({state:[{t:this.shape_175}]},1).to({state:[{t:this.shape_176}]},1).to({state:[{t:this.shape_177}]},1).to({state:[{t:this.shape_178}]},1).to({state:[{t:this.shape_179}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_181}]},1).to({state:[{t:this.shape_182}]},1).to({state:[{t:this.shape_183}]},1).to({state:[{t:this.shape_184}]},1).to({state:[{t:this.shape_185,p:{x:92.3}}]},1).to({state:[{t:this.shape_185,p:{x:92.375}}]},1).to({state:[{t:this.shape_186}]},1).to({state:[{t:this.shape_187}]},1).to({state:[{t:this.shape_188,p:{x:92.6}}]},1).to({state:[{t:this.shape_188,p:{x:92.675}}]},1).to({state:[{t:this.shape_189}]},1).to({state:[{t:this.shape_190}]},1).to({state:[{t:this.shape_191}]},1).to({state:[{t:this.shape_192}]},1).to({state:[{t:this.shape_193}]},1).to({state:[{t:this.shape_194}]},1).to({state:[{t:this.shape_195}]},1).to({state:[{t:this.shape_196}]},1).to({state:[{t:this.shape_197}]},1).to({state:[{t:this.shape_198}]},1).to({state:[{t:this.shape_199}]},1).to({state:[{t:this.shape_200,p:{x:93.6}}]},1).to({state:[{t:this.shape_200,p:{x:93.675}}]},1).to({state:[{t:this.shape_201}]},1).to({state:[{t:this.shape_202}]},1).to({state:[{t:this.shape_203}]},1).to({state:[{t:this.shape_204,p:{x:94}}]},1).to({state:[{t:this.shape_204,p:{x:94.075}}]},1).to({state:[{t:this.shape_205}]},1).to({state:[{t:this.shape_206}]},1).to({state:[{t:this.shape_207}]},1).to({state:[{t:this.shape_208}]},1).to({state:[{t:this.shape_209}]},1).to({state:[{t:this.shape_210}]},1).to({state:[{t:this.shape_211}]},1).to({state:[{t:this.shape_212}]},1).to({state:[{t:this.shape_213}]},1).to({state:[{t:this.shape_214}]},1).to({state:[{t:this.shape_215}]},1).to({state:[{t:this.shape_216,p:{x:95}}]},1).to({state:[{t:this.shape_216,p:{x:95.075}}]},1).to({state:[{t:this.shape_217}]},1).to({state:[{t:this.shape_218}]},1).to({state:[{t:this.shape_219}]},1).to({state:[{t:this.shape_220}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_222}]},1).to({state:[{t:this.shape_223}]},1).to({state:[{t:this.shape_224}]},1).to({state:[{t:this.shape_225}]},1).to({state:[{t:this.shape_226}]},1).to({state:[{t:this.shape_227}]},1).to({state:[{t:this.shape_228}]},1).to({state:[{t:this.shape_229}]},1).to({state:[{t:this.shape_230}]},1).to({state:[{t:this.shape_231}]},1).to({state:[{t:this.shape_232}]},1).to({state:[{t:this.shape_233}]},1).to({state:[{t:this.shape_234}]},1).to({state:[{t:this.shape_235}]},1).to({state:[{t:this.shape_236}]},1).to({state:[{t:this.shape_237}]},1).to({state:[{t:this.shape_238,p:{x:96.8}}]},1).to({state:[{t:this.shape_238,p:{x:96.875}}]},1).to({state:[{t:this.shape_239}]},1).to({state:[{t:this.shape_240}]},1).to({state:[{t:this.shape_241,p:{x:97.1}}]},1).to({state:[{t:this.shape_241,p:{x:97.175}}]},1).to({state:[{t:this.shape_242}]},1).to({state:[{t:this.shape_243}]},1).to({state:[{t:this.shape_244}]},1).to({state:[{t:this.shape_245}]},1).to({state:[{t:this.shape_246}]},1).to({state:[{t:this.shape_247}]},1).to({state:[{t:this.shape_248}]},1).to({state:[{t:this.shape_249}]},1).to({state:[{t:this.shape_250}]},1).to({state:[{t:this.shape_251}]},1).to({state:[{t:this.shape_252}]},1).to({state:[{t:this.shape_253,p:{x:98.1}}]},1).to({state:[{t:this.shape_253,p:{x:98.175}}]},1).to({state:[{t:this.shape_254}]},1).to({state:[{t:this.shape_255}]},1).to({state:[{t:this.shape_256}]},1).to({state:[{t:this.shape_257,p:{x:98.5}}]},1).to({state:[{t:this.shape_257,p:{x:98.575}}]},1).to({state:[{t:this.shape_258}]},1).to({state:[{t:this.shape_259}]},1).to({state:[{t:this.shape_260}]},1).to({state:[{t:this.shape_261}]},1).to({state:[{t:this.shape_262}]},1).to({state:[{t:this.shape_263}]},1).to({state:[{t:this.shape_264}]},1).to({state:[{t:this.shape_265}]},1).to({state:[{t:this.shape_266}]},1).to({state:[{t:this.shape_267}]},1).to({state:[{t:this.shape_268}]},1).to({state:[{t:this.shape_269,p:{x:99.5}}]},1).to({state:[{t:this.shape_269,p:{x:99.575}}]},1).to({state:[{t:this.shape_270}]},1).to({state:[{t:this.shape_271}]},1).to({state:[{t:this.shape_272}]},1).to({state:[{t:this.shape_273,p:{x:99.9}}]},1).to({state:[{t:this.shape_273,p:{x:99.975}}]},1).to({state:[{t:this.shape_274}]},1).to({state:[{t:this.shape_275}]},1).to({state:[{t:this.shape_276}]},1).to({state:[{t:this.shape_277}]},1).to({state:[{t:this.shape_278}]},1).to({state:[{t:this.shape_279}]},1).to({state:[{t:this.shape_280}]},1).to({state:[{t:this.shape_281}]},1).to({state:[{t:this.shape_282}]},1).to({state:[{t:this.shape_283}]},1).to({state:[{t:this.shape_284}]},1).to({state:[{t:this.shape_285}]},1).to({state:[{t:this.shape_286}]},1).to({state:[{t:this.shape_287}]},1).to({state:[{t:this.shape_288}]},1).to({state:[{t:this.shape_289}]},1).to({state:[{t:this.shape_290}]},1).to({state:[{t:this.shape_291}]},1).to({state:[{t:this.shape_292}]},1).to({state:[{t:this.shape_293}]},1).to({state:[{t:this.shape_294,p:{x:101.6}}]},1).to({state:[{t:this.shape_294,p:{x:101.675}}]},1).to({state:[{t:this.shape_295}]},1).to({state:[{t:this.shape_296}]},1).to({state:[{t:this.shape_297}]},1).to({state:[{t:this.shape_298}]},1).to({state:[{t:this.shape_299}]},1).to({state:[{t:this.shape_300}]},1).to({state:[{t:this.shape_301}]},1).to({state:[{t:this.shape_302}]},1).to({state:[{t:this.shape_303}]},1).to({state:[{t:this.shape_304}]},1).to({state:[{t:this.shape_305}]},1).to({state:[{t:this.shape_306,p:{x:102.6}}]},1).to({state:[{t:this.shape_306,p:{x:102.675}}]},1).to({state:[{t:this.shape_307}]},1).to({state:[{t:this.shape_308}]},1).to({state:[{t:this.shape_309}]},1).to({state:[{t:this.shape_310,p:{x:103}}]},1).to({state:[{t:this.shape_310,p:{x:103.075}}]},1).to({state:[{t:this.shape_311}]},1).to({state:[{t:this.shape_312}]},1).to({state:[{t:this.shape_313}]},1).to({state:[{t:this.shape_314}]},1).to({state:[{t:this.shape_315}]},1).to({state:[{t:this.shape_316}]},1).to({state:[{t:this.shape_317}]},1).to({state:[{t:this.shape_318}]},1).to({state:[{t:this.shape_319}]},1).to({state:[{t:this.shape_320}]},1).to({state:[{t:this.shape_321}]},1).to({state:[{t:this.shape_322}]},1).to({state:[{t:this.shape_323}]},1).to({state:[{t:this.shape_324}]},1).to({state:[{t:this.shape_325}]},1).to({state:[{t:this.shape_326}]},1).to({state:[{t:this.shape_327,p:{x:104.4}}]},1).to({state:[{t:this.shape_327,p:{x:104.475}}]},1).to({state:[{t:this.shape_328}]},1).to({state:[{t:this.shape_329}]},1).to({state:[{t:this.shape_330}]},1).to({state:[{t:this.shape_331}]},1).to({state:[{t:this.shape_332}]},1).to({state:[{t:this.shape_333}]},1).to({state:[{t:this.shape_334}]},1).to({state:[{t:this.shape_335}]},1).to({state:[{t:this.shape_336}]},1).to({state:[{t:this.shape_337}]},1).to({state:[{t:this.shape_338}]},1).to({state:[{t:this.shape_339}]},1).to({state:[{t:this.shape_340}]},1).to({state:[{t:this.shape_341}]},1).to({state:[{t:this.shape_342}]},1).to({state:[{t:this.shape_343}]},1).to({state:[{t:this.shape_344}]},1).to({state:[{t:this.shape_345}]},1).to({state:[{t:this.shape_346}]},1).to({state:[{t:this.shape_347}]},1).to({state:[{t:this.shape_348,p:{x:106.1}}]},1).to({state:[{t:this.shape_348,p:{x:106.175}}]},1).to({state:[{t:this.shape_349}]},1).to({state:[{t:this.shape_350}]},1).to({state:[{t:this.shape_351}]},1).to({state:[{t:this.shape_352}]},1).to({state:[{t:this.shape_353}]},1).to({state:[{t:this.shape_354}]},1).to({state:[{t:this.shape_355}]},1).to({state:[{t:this.shape_356}]},1).to({state:[{t:this.shape_357}]},1).to({state:[{t:this.shape_358}]},1).to({state:[{t:this.shape_359}]},1).to({state:[{t:this.shape_360,p:{x:107.1}}]},1).to({state:[{t:this.shape_360,p:{x:107.175}}]},1).to({state:[{t:this.shape_361}]},1).to({state:[{t:this.shape_362}]},1).to({state:[{t:this.shape_363}]},1).to({state:[{t:this.shape_364,p:{x:107.5}}]},1).to({state:[{t:this.shape_364,p:{x:107.575}}]},1).to({state:[{t:this.shape_365}]},1).to({state:[{t:this.shape_366}]},1).to({state:[{t:this.shape_367}]},1).to({state:[{t:this.shape_368}]},1).to({state:[{t:this.shape_369}]},1).to({state:[{t:this.shape_370}]},1).to({state:[{t:this.shape_371}]},1).to({state:[{t:this.shape_372}]},1).to({state:[{t:this.shape_373}]},1).to({state:[{t:this.shape_374}]},1).to({state:[{t:this.shape_375}]},1).to({state:[{t:this.shape_376,p:{x:108.5}}]},1).to({state:[{t:this.shape_376,p:{x:108.575}}]},1).to({state:[{t:this.shape_377}]},1).to({state:[{t:this.shape_378}]},1).to({state:[{t:this.shape_379}]},1).to({state:[{t:this.shape_380,p:{x:108.9}}]},1).to({state:[{t:this.shape_380,p:{x:108.975}}]},1).to({state:[{t:this.shape_381}]},1).to({state:[{t:this.shape_382}]},1).to({state:[{t:this.shape_383}]},1).to({state:[{t:this.shape_384}]},1).to({state:[{t:this.shape_385}]},1).to({state:[{t:this.shape_386}]},1).to({state:[{t:this.shape_387}]},1).to({state:[{t:this.shape_388}]},1).to({state:[{t:this.shape_389}]},1).to({state:[{t:this.shape_390}]},1).to({state:[{t:this.shape_391}]},1).to({state:[{t:this.shape_392}]},1).to({state:[{t:this.shape_393}]},1).to({state:[{t:this.shape_394}]},1).to({state:[{t:this.shape_395}]},1).to({state:[{t:this.shape_396}]},1).to({state:[{t:this.shape_397}]},1).to({state:[{t:this.shape_398}]},1).to({state:[{t:this.shape_399}]},1).to({state:[{t:this.shape_400}]},1).to({state:[{t:this.shape_401,p:{x:110.6}}]},1).to({state:[{t:this.shape_401,p:{x:110.675}}]},1).to({state:[{t:this.shape_402}]},1).to({state:[{t:this.shape_403}]},1).to({state:[{t:this.shape_404}]},1).to({state:[{t:this.shape_405}]},1).to({state:[{t:this.shape_406}]},1).to({state:[{t:this.shape_407}]},1).to({state:[{t:this.shape_408}]},1).to({state:[{t:this.shape_409}]},1).to({state:[{t:this.shape_410}]},1).to({state:[{t:this.shape_411}]},1).to({state:[{t:this.shape_412}]},1).to({state:[{t:this.shape_413,p:{x:111.6}}]},1).to({state:[{t:this.shape_413,p:{x:111.675}}]},1).to({state:[{t:this.shape_414}]},1).to({state:[{t:this.shape_415}]},1).to({state:[{t:this.shape_416}]},1).to({state:[{t:this.shape_417,p:{x:112}}]},1).to({state:[{t:this.shape_417,p:{x:112.075}}]},1).to({state:[{t:this.shape_418}]},1).to({state:[{t:this.shape_419}]},1).to({state:[{t:this.shape_420}]},1).to({state:[{t:this.shape_421}]},1).to({state:[{t:this.shape_422}]},1).to({state:[{t:this.shape_423}]},1).to({state:[{t:this.shape_424}]},1).to({state:[{t:this.shape_425}]},1).to({state:[{t:this.shape_426}]},1).to({state:[{t:this.shape_427}]},1).to({state:[{t:this.shape_428}]},1).to({state:[{t:this.shape_429,p:{x:113}}]},1).to({state:[{t:this.shape_429,p:{x:113.075}}]},1).to({state:[{t:this.shape_430}]},1).to({state:[{t:this.shape_431}]},1).to({state:[{t:this.shape_432}]},1).to({state:[{t:this.shape_433,p:{x:113.4}}]},1).to({state:[{t:this.shape_433,p:{x:113.475}}]},1).to({state:[{t:this.shape_434}]},1).to({state:[{t:this.shape_435}]},1).to({state:[{t:this.shape_436}]},1).to({state:[{t:this.shape_437}]},1).to({state:[{t:this.shape_438}]},1).to({state:[{t:this.shape_439}]},1).to({state:[{t:this.shape_440}]},1).to({state:[{t:this.shape_441}]},1).to({state:[{t:this.shape_442}]},1).to({state:[{t:this.shape_443}]},1).to({state:[{t:this.shape_444}]},1).to({state:[{t:this.shape_445}]},1).to({state:[{t:this.shape_446}]},1).to({state:[{t:this.shape_447}]},1).to({state:[{t:this.shape_448}]},1).to({state:[{t:this.shape_449}]},1).to({state:[{t:this.shape_450,p:{x:114.8}}]},1).to({state:[{t:this.shape_450,p:{x:114.875}}]},1).to({state:[{t:this.shape_451}]},1).to({state:[{t:this.shape_452}]},1).to({state:[{t:this.shape_453,p:{x:115.1}}]},1).to({state:[{t:this.shape_453,p:{x:115.175}}]},1).to({state:[{t:this.shape_454}]},1).to({state:[{t:this.shape_455}]},1).to({state:[{t:this.shape_456}]},1).to({state:[{t:this.shape_457}]},1).to({state:[{t:this.shape_458}]},1).to({state:[{t:this.shape_459,p:{x:115.675}}]},1).to({state:[{t:this.shape_459,p:{x:115.75}}]},1).to({state:[{t:this.shape_460}]},1).to({state:[{t:this.shape_461}]},1).to({state:[{t:this.shape_462,p:{x:115.975}}]},1).to({state:[{t:this.shape_462,p:{x:116.05}}]},1).to({state:[{t:this.shape_463}]},1).to({state:[{t:this.shape_464}]},1).to({state:[{t:this.shape_465}]},1).to({state:[{t:this.shape_466}]},1).to({state:[{t:this.shape_467}]},1).to({state:[{t:this.shape_468}]},1).to({state:[{t:this.shape_469}]},1).to({state:[{t:this.shape_470}]},1).to({state:[{t:this.shape_471}]},1).to({state:[{t:this.shape_472}]},1).to({state:[{t:this.shape_473}]},1).to({state:[{t:this.shape_474,p:{x:116.975}}]},1).to({state:[{t:this.shape_474,p:{x:117.05}}]},1).to({state:[{t:this.shape_475}]},1).to({state:[{t:this.shape_476}]},1).to({state:[{t:this.shape_477}]},1).to({state:[{t:this.shape_478,p:{x:117.375}}]},1).to({state:[{t:this.shape_478,p:{x:117.45}}]},1).to({state:[{t:this.shape_479}]},1).to({state:[{t:this.shape_480}]},1).to({state:[{t:this.shape_481}]},1).to({state:[{t:this.shape_482}]},1).to({state:[{t:this.shape_483}]},1).to({state:[{t:this.shape_484}]},1).to({state:[{t:this.shape_485}]},1).to({state:[{t:this.shape_486}]},1).to({state:[{t:this.shape_487}]},1).to({state:[{t:this.shape_488}]},1).to({state:[{t:this.shape_489}]},1).to({state:[{t:this.shape_490,p:{x:118.375}}]},1).to({state:[{t:this.shape_490,p:{x:118.45}}]},1).to({state:[{t:this.shape_491}]},1).to({state:[{t:this.shape_492}]},1).to({state:[{t:this.shape_493}]},1).to({state:[{t:this.shape_494,p:{x:118.775}}]},1).to({state:[{t:this.shape_494,p:{x:118.85}}]},1).to({state:[{t:this.shape_495}]},1).to({state:[{t:this.shape_496}]},1).to({state:[{t:this.shape_497,p:{x:119.075}}]},1).to({state:[{t:this.shape_497,p:{x:119.15}}]},1).to({state:[{t:this.shape_498}]},1).to({state:[{t:this.shape_499}]},1).to({state:[{t:this.shape_500}]},1).to({state:[{t:this.shape_501}]},1).to({state:[{t:this.shape_502}]},1).to({state:[{t:this.shape_503}]},1).to({state:[{t:this.shape_504}]},1).to({state:[{t:this.shape_505}]},1).to({state:[{t:this.shape_506}]},1).to({state:[{t:this.shape_507}]},1).to({state:[{t:this.shape_508}]},1).to({state:[{t:this.shape_509}]},1).to({state:[{t:this.shape_510,p:{x:120.175}}]},1).to({state:[{t:this.shape_510,p:{x:120.25}}]},1).to({state:[{t:this.shape_511}]},1).to({state:[{t:this.shape_512}]},1).to({state:[{t:this.shape_513,p:{x:120.475}}]},1).to({state:[{t:this.shape_513,p:{x:120.55}}]},1).to({state:[{t:this.shape_514}]},1).to({state:[{t:this.shape_515}]},1).to({state:[{t:this.shape_516}]},1).to({state:[{t:this.shape_517,p:{x:120.875}}]},1).to({state:[{t:this.shape_517,p:{x:120.95}}]},1).to({state:[{t:this.shape_518}]},1).to({state:[{t:this.shape_519}]},1).to({state:[{t:this.shape_520}]},1).to({state:[{t:this.shape_521}]},1).to({state:[{t:this.shape_522}]},1).to({state:[{t:this.shape_523}]},1).to({state:[{t:this.shape_524,p:{x:121.475}}]},1).to({state:[{t:this.shape_524,p:{x:121.55}}]},1).to({state:[{t:this.shape_525}]},1).to({state:[{t:this.shape_526}]},1).to({state:[{t:this.shape_527}]},1).to({state:[{t:this.shape_528,p:{x:121.875}}]},1).to({state:[{t:this.shape_528,p:{x:121.95}}]},1).to({state:[{t:this.shape_529}]},1).to({state:[{t:this.shape_530}]},1).to({state:[{t:this.shape_531}]},1).to({state:[{t:this.shape_532}]},1).to({state:[{t:this.shape_533}]},1).to({state:[{t:this.shape_534}]},1).to({state:[{t:this.shape_535}]},1).to({state:[{t:this.shape_536}]},1).to({state:[{t:this.shape_537}]},1).to({state:[{t:this.shape_538}]},1).to({state:[{t:this.shape_539}]},1).to({state:[{t:this.shape_540,p:{x:122.875}}]},1).to({state:[{t:this.shape_540,p:{x:122.95}}]},1).to({state:[{t:this.shape_541}]},1).to({state:[{t:this.shape_542}]},1).to({state:[{t:this.shape_543}]},1).to({state:[{t:this.shape_544,p:{x:123.275}}]},1).to({state:[{t:this.shape_544,p:{x:123.35}}]},1).to({state:[{t:this.shape_545}]},1).to({state:[{t:this.shape_546}]},1).to({state:[{t:this.shape_547,p:{x:123.575}}]},1).to({state:[{t:this.shape_547,p:{x:123.65}}]},1).to({state:[{t:this.shape_548}]},1).to({state:[{t:this.shape_549}]},1).to({state:[{t:this.shape_550}]},1).to({state:[{t:this.shape_551}]},1).to({state:[{t:this.shape_552}]},1).to({state:[{t:this.shape_553}]},1).to({state:[{t:this.shape_554}]},1).to({state:[{t:this.shape_555}]},1).to({state:[{t:this.shape_556}]},1).to({state:[{t:this.shape_557}]},1).to({state:[{t:this.shape_558}]},1).to({state:[{t:this.shape_559}]},1).to({state:[{t:this.shape_560,p:{x:124.675}}]},1).to({state:[{t:this.shape_560,p:{x:124.75}}]},1).to({state:[{t:this.shape_561}]},1).to({state:[{t:this.shape_562}]},1).to({state:[{t:this.shape_563,p:{x:124.975}}]},1).to({state:[{t:this.shape_563,p:{x:125.05}}]},1).to({state:[{t:this.shape_564}]},1).to({state:[{t:this.shape_565}]},1).to({state:[{t:this.shape_566}]},1).to({state:[{t:this.shape_567,p:{x:125.375}}]},1).to({state:[{t:this.shape_567,p:{x:125.45}}]},1).to({state:[{t:this.shape_568}]},1).to({state:[{t:this.shape_569}]},1).to({state:[{t:this.shape_570}]},1).to({state:[{t:this.shape_571}]},1).to({state:[{t:this.shape_572}]},1).to({state:[{t:this.shape_573}]},1).to({state:[{t:this.shape_574,p:{x:125.975}}]},1).to({state:[{t:this.shape_574,p:{x:126.05}}]},1).to({state:[{t:this.shape_575}]},1).to({state:[{t:this.shape_576}]},1).to({state:[{t:this.shape_577}]},1).to({state:[{t:this.shape_578,p:{x:126.375}}]},1).to({state:[{t:this.shape_578,p:{x:126.45}}]},1).to({state:[{t:this.shape_579}]},1).to({state:[{t:this.shape_580}]},1).to({state:[{t:this.shape_581}]},1).to({state:[{t:this.shape_582}]},1).to({state:[{t:this.shape_583}]},1).to({state:[{t:this.shape_584}]},1).to({state:[{t:this.shape_585}]},1).to({state:[{t:this.shape_586}]},1).to({state:[{t:this.shape_587}]},1).to({state:[{t:this.shape_588}]},1).to({state:[{t:this.shape_589}]},1).to({state:[{t:this.shape_590,p:{x:127.375}}]},1).to({state:[{t:this.shape_590,p:{x:127.45}}]},1).to({state:[{t:this.shape_591}]},1).to({state:[{t:this.shape_592}]},1).to({state:[{t:this.shape_593}]},1).to({state:[{t:this.shape_594,p:{x:127.775}}]},1).to({state:[{t:this.shape_594,p:{x:127.85}}]},1).to({state:[{t:this.shape_595}]},1).to({state:[{t:this.shape_596}]},1).to({state:[{t:this.shape_597,p:{x:128.075}}]},1).to({state:[{t:this.shape_597,p:{x:128.15}}]},1).to({state:[{t:this.shape_598}]},1).to({state:[{t:this.shape_599}]},1).to({state:[{t:this.shape_600}]},1).to({state:[{t:this.shape_601}]},1).to({state:[{t:this.shape_602}]},1).to({state:[{t:this.shape_603}]},1).to({state:[{t:this.shape_604}]},1).to({state:[{t:this.shape_605}]},1).to({state:[{t:this.shape_606}]},1).to({state:[{t:this.shape_607}]},1).to({state:[{t:this.shape_608}]},1).to({state:[{t:this.shape_609}]},1).to({state:[{t:this.shape_610,p:{x:129.175}}]},1).to({state:[{t:this.shape_610,p:{x:129.25}}]},1).to({state:[{t:this.shape_611}]},1).to({state:[{t:this.shape_612}]},1).to({state:[{t:this.shape_613,p:{x:129.475}}]},1).to({state:[{t:this.shape_613,p:{x:129.55}}]},1).to({state:[{t:this.shape_614}]},1).to({state:[{t:this.shape_615}]},1).to({state:[{t:this.shape_616}]},1).to({state:[{t:this.shape_617}]},1).to({state:[{t:this.shape_618}]},1).to({state:[{t:this.shape_619}]},1).to({state:[{t:this.shape_620}]},1).to({state:[{t:this.shape_621}]},1).to({state:[{t:this.shape_622}]},1).to({state:[{t:this.shape_623}]},1).to({state:[{t:this.shape_624}]},1).to({state:[{t:this.shape_625}]},1).to({state:[{t:this.shape_626}]},1).to({state:[{t:this.shape_627}]},1).to({state:[{t:this.shape_628}]},1).to({state:[{t:this.shape_629}]},1).to({state:[{t:this.shape_630,p:{x:130.875}}]},1).to({state:[{t:this.shape_630,p:{x:130.95}}]},1).to({state:[{t:this.shape_631}]},1).to({state:[{t:this.shape_632}]},1).to({state:[{t:this.shape_633}]},1).to({state:[{t:this.shape_634}]},1).to({state:[{t:this.shape_635}]},1).to({state:[{t:this.shape_636}]},1).to({state:[{t:this.shape_637}]},1).to({state:[{t:this.shape_638}]},1).to({state:[{t:this.shape_639}]},1).to({state:[{t:this.shape_640}]},1).to({state:[{t:this.shape_641}]},1).to({state:[{t:this.shape_642,p:{x:131.875}}]},1).to({state:[{t:this.shape_642,p:{x:131.95}}]},1).to({state:[{t:this.shape_643}]},1).to({state:[{t:this.shape_644}]},1).to({state:[{t:this.shape_645}]},1).to({state:[{t:this.shape_646}]},1).to({state:[{t:this.shape_647}]},1).to({state:[{t:this.shape_648}]},1).to({state:[{t:this.shape_649}]},1).to({state:[{t:this.shape_650,p:{x:132.575}}]},1).to({state:[{t:this.shape_650,p:{x:132.65}}]},1).to({state:[{t:this.shape_651}]},1).to({state:[{t:this.shape_652}]},1).to({state:[{t:this.shape_653}]},1).to({state:[{t:this.shape_654}]},1).to({state:[{t:this.shape_655}]},1).to({state:[{t:this.shape_656}]},1).to({state:[{t:this.shape_657}]},1).to({state:[{t:this.shape_658}]},1).to({state:[{t:this.shape_659}]},1).to({state:[{t:this.shape_660}]},1).to({state:[{t:this.shape_661}]},1).to({state:[{t:this.shape_662}]},1).to({state:[{t:this.shape_663,p:{x:133.675}}]},1).to({state:[{t:this.shape_663,p:{x:133.75}}]},1).to({state:[{t:this.shape_664}]},1).to({state:[{t:this.shape_665}]},1).to({state:[{t:this.shape_666}]},1).to({state:[{t:this.shape_667}]},1).to({state:[{t:this.shape_668}]},1).to({state:[{t:this.shape_669}]},1).to({state:[{t:this.shape_670}]},1).to({state:[{t:this.shape_671}]},1).to({state:[{t:this.shape_672}]},1).to({state:[{t:this.shape_673}]},1).to({state:[{t:this.shape_674}]},1).to({state:[{t:this.shape_675}]},1).to({state:[{t:this.shape_676}]},1).to({state:[{t:this.shape_677}]},1).to({state:[{t:this.shape_678}]},1).to({state:[{t:this.shape_679,p:{x:134.975}}]},1).to({state:[{t:this.shape_679,p:{x:135.05}}]},1).to({state:[{t:this.shape_680}]},1).to({state:[{t:this.shape_681}]},1).to({state:[{t:this.shape_682}]},1).to({state:[{t:this.shape_683,p:{x:135.375}}]},1).to({state:[{t:this.shape_683,p:{x:135.45}}]},1).to({state:[{t:this.shape_684}]},1).to({state:[{t:this.shape_685}]},1).to({state:[{t:this.shape_686}]},1).to({state:[{t:this.shape_687}]},1).to({state:[{t:this.shape_688}]},1).to({state:[{t:this.shape_689}]},1).to({state:[{t:this.shape_690}]},1).to({state:[{t:this.shape_691}]},1).to({state:[{t:this.shape_692}]},1).to({state:[{t:this.shape_693}]},1).to({state:[{t:this.shape_694}]},1).to({state:[{t:this.shape_695,p:{x:136.375}}]},1).to({state:[{t:this.shape_695,p:{x:136.45}}]},1).to({state:[{t:this.shape_696}]},1).to({state:[{t:this.shape_697}]},1).to({state:[{t:this.shape_698}]},1).to({state:[{t:this.shape_699,p:{x:136.775}}]},1).to({state:[{t:this.shape_699,p:{x:136.85}}]},1).to({state:[{t:this.shape_700}]},1).to({state:[{t:this.shape_701}]},1).to({state:[{t:this.shape_702,p:{x:137.075}}]},1).to({state:[{t:this.shape_702,p:{x:137.15}}]},1).to({state:[{t:this.shape_703}]},1).to({state:[{t:this.shape_704}]},1).to({state:[{t:this.shape_705}]},1).to({state:[{t:this.shape_706}]},1).to({state:[{t:this.shape_707}]},1).to({state:[{t:this.shape_708}]},1).to({state:[{t:this.shape_709}]},1).to({state:[{t:this.shape_710}]},1).to({state:[{t:this.shape_711}]},1).to({state:[{t:this.shape_712}]},1).to({state:[{t:this.shape_713}]},1).to({state:[{t:this.shape_714}]},1).to({state:[{t:this.shape_715,p:{x:138.175}}]},1).to({state:[{t:this.shape_715,p:{x:138.25}}]},1).to({state:[{t:this.shape_716}]},1).to({state:[{t:this.shape_717}]},1).to({state:[{t:this.shape_718,p:{x:138.475}}]},1).to({state:[{t:this.shape_718,p:{x:138.55}}]},1).to({state:[{t:this.shape_719}]},1).to({state:[{t:this.shape_720}]},1).to({state:[{t:this.shape_721}]},1).to({state:[{t:this.shape_722}]},1).to({state:[{t:this.shape_723}]},1).to({state:[{t:this.shape_724}]},1).to({state:[{t:this.shape_725}]},1).to({state:[{t:this.shape_726}]},1).to({state:[{t:this.shape_727}]},1).to({state:[{t:this.shape_728}]},1).to({state:[{t:this.shape_729}]},1).to({state:[{t:this.shape_730,p:{x:139.475}}]},1).to({state:[{t:this.shape_730,p:{x:139.55}}]},1).to({state:[{t:this.shape_731}]},1).to({state:[{t:this.shape_732}]},1).to({state:[{t:this.shape_733}]},1).to({state:[{t:this.shape_734,p:{x:139.875}}]},1).to({state:[{t:this.shape_734,p:{x:139.95}}]},1).to({state:[{t:this.shape_735}]},1).to({state:[{t:this.shape_736}]},1).to({state:[{t:this.shape_737}]},1).to({state:[{t:this.shape_738}]},1).to({state:[{t:this.shape_739}]},1).to({state:[{t:this.shape_740}]},1).to({state:[{t:this.shape_741}]},1).to({state:[{t:this.shape_742}]},1).to({state:[{t:this.shape_743}]},1).to({state:[{t:this.shape_744}]},1).to({state:[{t:this.shape_745}]},1).to({state:[{t:this.shape_746,p:{x:140.875}}]},1).to({state:[{t:this.shape_746,p:{x:140.95}}]},1).to({state:[{t:this.shape_747}]},1).to({state:[{t:this.shape_748}]},1).to({state:[{t:this.shape_749}]},1).to({state:[{t:this.shape_750,p:{x:141.275}}]},1).to({state:[{t:this.shape_750,p:{x:141.35}}]},1).to({state:[{t:this.shape_751}]},1).to({state:[{t:this.shape_752}]},1).to({state:[{t:this.shape_753}]},1).to({state:[{t:this.shape_754}]},1).to({state:[{t:this.shape_755}]},1).to({state:[{t:this.shape_756}]},1).to({state:[{t:this.shape_757}]},1).to({state:[{t:this.shape_758}]},1).to({state:[{t:this.shape_759}]},1).to({state:[{t:this.shape_760}]},1).to({state:[{t:this.shape_761}]},1).to({state:[{t:this.shape_762}]},1).to({state:[{t:this.shape_763}]},1).to({state:[{t:this.shape_764}]},1).to({state:[{t:this.shape_765}]},1).to({state:[{t:this.shape_766}]},1).to({state:[{t:this.shape_767,p:{x:142.675}}]},1).to({state:[{t:this.shape_767,p:{x:142.75}}]},1).to({state:[{t:this.shape_768}]},1).to({state:[{t:this.shape_769}]},1).to({state:[{t:this.shape_770,p:{x:142.975}}]},1).to({state:[{t:this.shape_770,p:{x:143.05}}]},1).to({state:[{t:this.shape_771}]},1).to({state:[{t:this.shape_772}]},1).to({state:[{t:this.shape_773}]},1).to({state:[{t:this.shape_774}]},1).to({state:[{t:this.shape_775}]},1).to({state:[{t:this.shape_776}]},1).to({state:[{t:this.shape_777}]},1).to({state:[{t:this.shape_778}]},1).to({state:[{t:this.shape_779}]},1).to({state:[{t:this.shape_780}]},1).to({state:[{t:this.shape_781}]},1).to({state:[{t:this.shape_782,p:{x:143.975}}]},1).to({state:[{t:this.shape_782,p:{x:144.05}}]},1).to({state:[{t:this.shape_783}]},1).to({state:[{t:this.shape_784}]},1).to({state:[{t:this.shape_785}]},1).to({state:[{t:this.shape_786,p:{x:144.375}}]},1).to({state:[{t:this.shape_786,p:{x:144.45}}]},1).to({state:[{t:this.shape_787}]},1).to({state:[{t:this.shape_788}]},1).to({state:[{t:this.shape_789}]},1).to({state:[{t:this.shape_790}]},1).to({state:[{t:this.shape_791}]},1).to({state:[{t:this.shape_792}]},1).to({state:[{t:this.shape_793}]},1).to({state:[{t:this.shape_794}]},1).to({state:[{t:this.shape_795}]},1).to({state:[{t:this.shape_796}]},1).to({state:[{t:this.shape_797}]},1).to({state:[{t:this.shape_798,p:{x:145.375}}]},1).to({state:[{t:this.shape_798,p:{x:145.45}}]},1).to({state:[{t:this.shape_799}]},1).to({state:[{t:this.shape_800}]},1).to({state:[{t:this.shape_801}]},1).to({state:[{t:this.shape_802,p:{x:145.775}}]},1).to({state:[{t:this.shape_802,p:{x:145.85}}]},1).to({state:[{t:this.shape_803}]},1).to({state:[{t:this.shape_804}]},1).to({state:[{t:this.shape_805}]},1).to({state:[{t:this.shape_806}]},1).to({state:[{t:this.shape_807}]},1).to({state:[{t:this.shape_808}]},1).to({state:[{t:this.shape_809}]},1).to({state:[{t:this.shape_810}]},1).to({state:[{t:this.shape_811}]},1).to({state:[{t:this.shape_812}]},1).to({state:[{t:this.shape_813}]},1).to({state:[{t:this.shape_814}]},1).to({state:[{t:this.shape_815}]},1).to({state:[{t:this.shape_816}]},1).to({state:[{t:this.shape_817}]},1).to({state:[{t:this.shape_818}]},1).to({state:[{t:this.shape_819,p:{x:147.175}}]},1).to({state:[{t:this.shape_819,p:{x:147.25}}]},1).to({state:[{t:this.shape_820}]},1).to({state:[{t:this.shape_821}]},1).to({state:[{t:this.shape_822,p:{x:147.475}}]},1).to({state:[{t:this.shape_822,p:{x:147.55}}]},1).to({state:[{t:this.shape_823}]},1).to({state:[{t:this.shape_824}]},1).to({state:[{t:this.shape_825}]},1).to({state:[{t:this.shape_826}]},1).to({state:[{t:this.shape_827}]},1).to({state:[{t:this.shape_828}]},1).to({state:[{t:this.shape_829}]},1).to({state:[{t:this.shape_830}]},1).to({state:[{t:this.shape_831}]},1).to({state:[{t:this.shape_832}]},1).to({state:[{t:this.shape_833}]},1).to({state:[{t:this.shape_834,p:{x:148.475}}]},1).to({state:[{t:this.shape_834,p:{x:148.55}}]},1).to({state:[{t:this.shape_835}]},1).to({state:[{t:this.shape_836}]},1).to({state:[{t:this.shape_837}]},1).to({state:[{t:this.shape_838,p:{x:148.875}}]},1).to({state:[{t:this.shape_838,p:{x:148.95}}]},1).to({state:[{t:this.shape_839}]},1).to({state:[{t:this.shape_840}]},1).to({state:[{t:this.shape_841}]},1).to({state:[{t:this.shape_842}]},1).to({state:[{t:this.shape_843}]},1).to({state:[{t:this.shape_844}]},1).to({state:[{t:this.shape_845}]},1).to({state:[{t:this.shape_846}]},1).to({state:[{t:this.shape_847}]},1).to({state:[{t:this.shape_848}]},1).to({state:[{t:this.shape_849}]},1).to({state:[{t:this.shape_850}]},1).to({state:[{t:this.shape_851}]},1).to({state:[{t:this.shape_852}]},1).to({state:[{t:this.shape_853}]},1).to({state:[{t:this.shape_854}]},1).to({state:[{t:this.shape_855,p:{x:150.275}}]},1).to({state:[{t:this.shape_855,p:{x:150.35}}]},1).to({state:[{t:this.shape_856}]},1).to({state:[{t:this.shape_857}]},1).to({state:[{t:this.shape_858,p:{x:150.575}}]},1).to({state:[{t:this.shape_858,p:{x:150.65}}]},1).to({state:[{t:this.shape_859}]},1).to({state:[{t:this.shape_860}]},1).to({state:[{t:this.shape_861}]},1).to({state:[{t:this.shape_862}]},1).to({state:[{t:this.shape_863}]},1).to({state:[{t:this.shape_864}]},1).to({state:[{t:this.shape_865}]},1).to({state:[{t:this.shape_866}]},1).to({state:[{t:this.shape_867}]},1).to({state:[{t:this.shape_868}]},1).to({state:[{t:this.shape_869}]},1).to({state:[{t:this.shape_870}]},1).to({state:[{t:this.shape_871,p:{x:151.675}}]},1).to({state:[{t:this.shape_871,p:{x:151.75}}]},1).to({state:[{t:this.shape_872}]},1).to({state:[{t:this.shape_873}]},1).to({state:[{t:this.shape_874,p:{x:151.975}}]},1).to({state:[{t:this.shape_874,p:{x:152.05}}]},1).to({state:[{t:this.shape_875}]},1).to({state:[{t:this.shape_876}]},1).to({state:[{t:this.shape_877}]},1).to({state:[{t:this.shape_878}]},1).to({state:[{t:this.shape_879}]},1).to({state:[{t:this.shape_880}]},1).to({state:[{t:this.shape_881}]},1).to({state:[{t:this.shape_882}]},1).to({state:[{t:this.shape_883}]},1).to({state:[{t:this.shape_884}]},1).to({state:[{t:this.shape_885}]},1).to({state:[{t:this.shape_886,p:{x:152.975}}]},1).to({state:[{t:this.shape_886,p:{x:153.05}}]},1).to({state:[{t:this.shape_887}]},1).to({state:[{t:this.shape_888}]},1).to({state:[{t:this.shape_889}]},1).to({state:[{t:this.shape_890}]},1).to({state:[{t:this.shape_891}]},1).to({state:[{t:this.shape_892}]},1).to({state:[{t:this.shape_893}]},1).to({state:[{t:this.shape_894}]},1).to({state:[{t:this.shape_895}]},1).to({state:[{t:this.shape_896}]},1).to({state:[{t:this.shape_897}]},1).to({state:[{t:this.shape_898}]},1).to({state:[{t:this.shape_899}]},1).to({state:[{t:this.shape_900}]},1).to({state:[{t:this.shape_901}]},1).to({state:[{t:this.shape_902}]},1).to({state:[{t:this.explosion_mc},{t:this.replay_btn},{t:this.instance}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-67,-523,891.6,1090.4);


(lib.skelly_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.wavyskelly1();
	this.instance.setTransform(0,0,0.0436,0.0436);

	this.skellywave_mc = new lib.skellywave_mc();
	this.skellywave_mc.name = "skellywave_mc";
	this.skellywave_mc.setTransform(65.3,65.3,1,1,0,0,0,65.3,65.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.skellywave_mc}]},1).to({state:[{t:this.skellywave_mc}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,130.7,130.7);


(lib.hooray_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.instance = new lib.youdidit_mc();
	this.instance.setTransform(654.5,935.7,1,1,0,0,0,352.5,111.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(10));

	// Layer_1
	this.instance_1 = new lib.Hooray1();
	this.instance_1.setTransform(0,0,0.3623,0.3623);

	this.instance_2 = new lib.Hooray2();
	this.instance_2.setTransform(0,0,0.3623,0.3623);

	this.instance_3 = new lib.Hooray3();
	this.instance_3.setTransform(0,0,0.3623,0.3623);

	this.instance_4 = new lib.Hooray4();
	this.instance_4.setTransform(0,0,0.3623,0.3623);

	this.instance_5 = new lib.Hooray5();
	this.instance_5.setTransform(0,0,0.3623,0.3623);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).to({state:[{t:this.instance_2}]},2).to({state:[{t:this.instance_3}]},2).to({state:[{t:this.instance_4}]},2).to({state:[{t:this.instance_5}]},2).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,1086.8,1086.8);


(lib.happyghost_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_2 = function() {
		playSound("ghostsoundwav");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(2).call(this.frame_2).wait(1));

	// Layer_1
	this.instance = new lib.happyghost1();
	this.instance.setTransform(0,0,0.0574,0.0574);

	this.happyghost_mc = new lib.happyghost_mc();
	this.happyghost_mc.name = "happyghost_mc";
	this.happyghost_mc.setTransform(86,86,1,1,0,0,0,86,86);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.happyghost_mc}]},2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,172.1,172.1);


(lib.ghost_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_2 = function() {
		playSound("ES_EvilLaugh3SFXProducerwav");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(2).call(this.frame_2).wait(1));

	// Layer_1
	this.instance = new lib.ghostblush1();
	this.instance.setTransform(0,2,0.0454,0.0454);

	this.ghost_mc = new lib.ghost_mc();
	this.ghost_mc.name = "ghost_mc";
	this.ghost_mc.setTransform(68.1,68.1,1,1,0,0,0,68.1,68.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.ghost_mc}]},2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,136.2,138.2);


(lib.envelope1_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Envelope_1pngcopy();
	this.instance.setTransform(0,0,0.0479,0.0479);

	this.envelope1_btn = new lib.envelope1_btn();
	this.envelope1_btn.name = "envelope1_btn";
	this.envelope1_btn.setTransform(4.05,3.55,0.0479,0.0479,0,0,0,73,73);
	new cjs.ButtonHelper(this.envelope1_btn, 0, 1, 1);

	this.instance_1 = new lib.Envelope_2();
	this.instance_1.setTransform(0,0,0.0479,0.0479);

	this.instance_2 = new lib.Envelope_3();
	this.instance_2.setTransform(0,0,0.0479,0.0479);

	this.instance_3 = new lib.Envelope_4();
	this.instance_3.setTransform(0,0,0.0479,0.0479);

	this.instance_4 = new lib.Envelope_5();
	this.instance_4.setTransform(0,0,0.0479,0.0479);

	this.instance_5 = new lib.Envelope_6();
	this.instance_5.setTransform(0,0,0.0479,0.0479);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.envelope1_btn},{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},3).to({state:[{t:this.instance_4}]},3).to({state:[{t:this.instance_5}]},3).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,143.8,143.8);


(lib.danceskel_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_2 = function() {
		playSound("discowav");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(2).call(this.frame_2).wait(1));

	// Layer_1
	this.instance = new lib.wavyskelly1pngcopy4();
	this.instance.setTransform(0,0,0.0539,0.0539);

	this.skeldance_mc = new lib.skeldance_mc();
	this.skeldance_mc.name = "skeldance_mc";
	this.skeldance_mc.setTransform(80.9,80.9,1,1,0,0,0,80.9,80.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.skeldance_mc}]},1).to({state:[{t:this.skeldance_mc}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,161.8,161.8);


(lib.cat_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_2 = function() {
		playSound("catmeow14536");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(2).call(this.frame_2).wait(1));

	// Layer_1
	this.instance = new lib.cat1();
	this.instance.setTransform(0,0,0.058,0.058);

	this.instance_1 = new lib.cat_mc();
	this.instance_1.setTransform(1423,855,1,1,0,0,0,1500,1500);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,173.9,173.9);


(lib.envelopee_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// envelope
	this.envelope = new lib.envelope();
	this.envelope.name = "envelope";
	this.envelope.setTransform(71.9,71.9,1,1,0,0,0,71.9,71.9);

	this.envelope1_mc = new lib.envelope1_mc();
	this.envelope1_mc.name = "envelope1_mc";
	this.envelope1_mc.setTransform(74.1,74.1,1,1,0,0,0,74.1,74.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.envelope}]}).to({state:[{t:this.envelope1_mc}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,143.8,143.8);


// stage content:
(lib.JaninePayne_InteractiveMap = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0];
	this.streamSoundSymbolsList[0] = [{id:"WitchThemeSong",startFrame:0,endFrame:1,loop:1,offset:0},{id:"WitchThemeSong",startFrame:0,endFrame:1,loop:1,offset:0},{id:"WitchThemeSong",startFrame:0,endFrame:1,loop:1,offset:0}];
	this.isSingleFrame = false;
	// timeline functions:
	this.frame_0 = function() {
		if(this.isSingleFrame) {
			return;
		}
		if(this.totalFrames == 1) {
			this.isSingleFrame = true;
		}
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("WitchThemeSong",0);
		this.InsertIntoSoundStreamData(soundInstance,0,1,1);
		var soundInstance = playSound("WitchThemeSong",0);
		this.InsertIntoSoundStreamData(soundInstance,0,1,1);
		var soundInstance = playSound("WitchThemeSong",0);
		this.InsertIntoSoundStreamData(soundInstance,0,1,1);
		this.stop();
		this.startingletter_mc.visible = false;
		this.counter_mc.stop();
		this.hooray_mc.visible = false;
		
		// Character Eye Tracking
		
		stage.enableMouseOver(30);
		var _this = this;
		
		stage.on('stagemousemove', function (e) {
		
			var radians = Math.atan2(e.localY - _this.eye_mc.y, e.localX - _this.eye_mc.x);
			var degrees = radians * (180 / Math.PI);
			_this.eye_mc.rotation = degrees - 90;
		
		});
		
		stage.enableMouseOver(30);
		var _this = this;
		
		stage.on('stagemousemove', function (e) {
		
			var radians = Math.atan2(e.localY - _this.eye2_mc.y, e.localX - _this.eye2_mc.x);
			var degrees = radians * (180 / Math.PI);
			_this.eye2_mc.rotation = degrees - 90;
		
		});
		
		//Cursor
		
		this.stage.cursor = "none";
		this.cursor_mc.mouseEnabled = false;
		this.addEventListener("tick", CustomMouseCursor.bind(this));
		
		function CustomMouseCursor() {
			this.cursor_mc.x = stage.mouseX / stage.scaleX;
			this.cursor_mc.y = stage.mouseY / stage.scaleY;
		}
		
		// Play, Pause, Stop, music
		
		var _this = this;
		
		_this.play_btn.on('click', function () {
		
			if (_this.WitchThemeSong)
				_this.WitchThemeSong.play();
			else
				_this.WitchThemeSong = createjs.Sound.play("WitchThemeSong");
		});
		
		this.stop_btn.on("click", function () {
			if (_this.WitchThemeSong) {
				_this.WitchThemeSong.stop();
				_this.WitchThemeSong = null;
			}
		});
		
		this.pause_btn.on("click", function () {
			if (_this.WitchThemeSong)
				_this.WitchThemeSong.paused = true;
		});
		
		
		// Letter
		
		this.envelopee_btn.addEventListener("click", ClickToHide.bind(this));
		
		function ClickToHide() {
			this.startingletter_mc.visible = !this.startingletter_mc.visible;
		}
		
		// Drag Items
		
		this.poison_mc.addEventListener("pressmove", ClickToDrag.bind(this));
		this.blood_mc.addEventListener("pressmove", ClickToDrag.bind(this));
		this.tears_mc.addEventListener("pressmove", ClickToDrag.bind(this));
		this.pumpkin_mc.addEventListener("pressmove", ClickToDrag.bind(this));
		this.unicornblood_mc.addEventListener("pressmove", ClickToDrag.bind(this));
		this.lavender_mc.addEventListener("pressmove", ClickToDrag.bind(this));
		this.skull_mc.addEventListener("pressmove", ClickToDrag.bind(this));
		this.bone_mc.addEventListener("pressmove", ClickToDrag.bind(this));
		this.bone2_mc.addEventListener("pressmove", ClickToDrag.bind(this));
		this.candles_mc.addEventListener("pressmove", ClickToDrag.bind(this));
		
		function ClickToDrag(e) {
			var p = stage.globalToLocal(e.stageX, e.stageY);
			e.currentTarget.x = p.x;
			e.currentTarget.y = p.y;
		}
		
		this.skull_mc.addEventListener("click", CheckPosition.bind(this));
		this.lavender_mc.addEventListener("click", CheckPosition.bind(this));
		this.unicornblood_mc.addEventListener("click", CheckPosition.bind(this));
		this.pumpkin_mc.addEventListener("click", CheckPosition.bind(this));
		this.tears_mc.addEventListener("click", CheckPosition.bind(this));
		this.poison_mc.addEventListener("click", CheckPosition.bind(this));
		this.blood_mc.addEventListener("click", CheckPosition.bind(this));
		this.bone_mc.addEventListener("click", CheckPosition.bind(this));
		this.bone2_mc.addEventListener("click", CheckPosition.bind(this));
		this.candles_mc.addEventListener("click", CheckPosition.bind(this));
		
		var ingredientsAdded = 0;
		
		function CheckPosition(e) {
			
			if(CheckForInCauldron(e.currentTarget.x, e.currentTarget.y)) {
				e.currentTarget.visible = false;
				ingredientsAdded++;
				this.counter_mc.gotoAndStop(this.counter_mc.currentFrame+1);
				
				if( ingredientsAdded >= 10) {
					this.hooray_mc.visible = true;
				}
			} 
		}
		
		
		function CheckForInCauldron(my_x,my_y) {
			//alert(my_x + ", " + my_y);
			
			if (my_x > 280 && my_x < 418 && my_y > 655 && my_y < 805) {
				return true;
			}
			return false;
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// cursor
	this.cursor_mc = new lib.cursor_mc();
	this.cursor_mc.name = "cursor_mc";
	this.cursor_mc.setTransform(572.2,937.65,1,1,0,0,0,29.2,27.7);

	this.timeline.addTween(cjs.Tween.get(this.cursor_mc).wait(1));

	// hooray
	this.hooray_mc = new lib.hooray_mc();
	this.hooray_mc.name = "hooray_mc";
	this.hooray_mc.setTransform(442.4,524.4,1,1,0,0,0,543.4,543.4);

	this.timeline.addTween(cjs.Tween.get(this.hooray_mc).wait(1));

	// timer
	this.timer_mc = new lib.timer_mc();
	this.timer_mc.name = "timer_mc";
	this.timer_mc.setTransform(127.9,522.45,1,1,0,0,0,77.4,12.6);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#CBB0B2").ss(2,1,1).p("AsFh9IYLAAIAAD7I4LAAg");
	this.shape.setTransform(127.9,522.475);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.timer_mc}]}).wait(1));

	// itemcounter
	this.counter_mc = new lib.counter_mc();
	this.counter_mc.name = "counter_mc";
	this.counter_mc.setTransform(54.95,61.7,5.1975,5.1975,0,0,0,5.8,6.2);

	this.timeline.addTween(cjs.Tween.get(this.counter_mc).wait(1));

	// letter
	this.startingletter_mc = new lib.startingletter_mc();
	this.startingletter_mc.name = "startingletter_mc";
	this.startingletter_mc.setTransform(600.6,462.3,1,1,0,0,0,256.6,351.3);

	this.timeline.addTween(cjs.Tween.get(this.startingletter_mc).wait(1));

	// candles
	this.candles_mc = new lib.candles_mc();
	this.candles_mc.name = "candles_mc";
	this.candles_mc.setTransform(576.65,440.8,0.0224,0.0224,0,0,0,1502.2,1502.2);

	this.timeline.addTween(cjs.Tween.get(this.candles_mc).wait(1));

	// bone
	this.bone_mc = new lib.bone_mc();
	this.bone_mc.name = "bone_mc";
	this.bone_mc.setTransform(111.55,1019.25,0.146,0.146,29.9952,0,0,218.6,218.3);

	this.timeline.addTween(cjs.Tween.get(this.bone_mc).wait(1));

	// bone2
	this.bone2_mc = new lib.bone2_mc();
	this.bone2_mc.name = "bone2_mc";
	this.bone2_mc.setTransform(694.85,962.4,0.031,0.031,45,0,0,1502.7,1502.7);

	this.timeline.addTween(cjs.Tween.get(this.bone2_mc).wait(1));

	// lavender
	this.lavender_mc = new lib.lavender_mc();
	this.lavender_mc.name = "lavender_mc";
	this.lavender_mc.setTransform(806.9,707.65,1,1,0,0,0,80.9,80.9);

	this.timeline.addTween(cjs.Tween.get(this.lavender_mc).wait(1));

	// unicornblood
	this.unicornblood_mc = new lib.unicornblood_mc();
	this.unicornblood_mc.name = "unicornblood_mc";
	this.unicornblood_mc.setTransform(789.8,625.95,1.2928,1.2928,0,0,0,54.7,54.7);

	this.timeline.addTween(cjs.Tween.get(this.unicornblood_mc).wait(1));

	// pumpkin
	this.pumpkin_mc = new lib.pumpkin_mc();
	this.pumpkin_mc.name = "pumpkin_mc";
	this.pumpkin_mc.setTransform(584.95,254.8,1.4892,1.4892,0,0,0,64.1,62.3);

	this.timeline.addTween(cjs.Tween.get(this.pumpkin_mc).wait(1));

	// skull
	this.skull_mc = new lib.skull_mc();
	this.skull_mc.name = "skull_mc";
	this.skull_mc.setTransform(525.55,455.4,1,1,0,0,0,54.5,54.5);

	this.timeline.addTween(cjs.Tween.get(this.skull_mc).wait(1));

	// tears
	this.tears_mc = new lib.tears_mc();
	this.tears_mc.name = "tears_mc";
	this.tears_mc.setTransform(600.85,733.1,0.7209,0.7209,0,0,0,70.1,70);

	this.timeline.addTween(cjs.Tween.get(this.tears_mc).wait(1));

	// poison
	this.poison_mc = new lib.poison_mc();
	this.poison_mc.name = "poison_mc";
	this.poison_mc.setTransform(589.8,649.8,1,1,0,0,0,46.8,46.8);

	this.timeline.addTween(cjs.Tween.get(this.poison_mc).wait(1));

	// blood
	this.blood_mc = new lib.blood_mc();
	this.blood_mc.name = "blood_mc";
	this.blood_mc.setTransform(696.75,774.9,0.6177,0.6177,0,0,0,-375.7,146.3);

	this.timeline.addTween(cjs.Tween.get(this.blood_mc).wait(1));

	// cauldron
	this.cauldron_mc = new lib.cauldron_mc();
	this.cauldron_mc.name = "cauldron_mc";
	this.cauldron_mc.setTransform(2198.7,247.15,1,1,0,0,0,1500,1500);

	this.timeline.addTween(cjs.Tween.get(this.cauldron_mc).wait(1));

	// envelope
	this.envelopee_btn = new lib.envelopee_btn();
	this.envelopee_btn.name = "envelopee_btn";
	this.envelopee_btn.setTransform(47,310);
	new cjs.ButtonHelper(this.envelopee_btn, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.envelopee_btn).wait(1));

	// booframe
	this.booframe_mc = new lib.booframe_mc();
	this.booframe_mc.name = "booframe_mc";
	this.booframe_mc.setTransform(745.65,342.2,0.0137,0.0137);

	this.timeline.addTween(cjs.Tween.get(this.booframe_mc).wait(1));

	// ghostt
	this.ghost_btn = new lib.ghost_btn();
	this.ghost_btn.name = "ghost_btn";
	this.ghost_btn.setTransform(677.1,216.1,1,1,0,0,0,68.1,68.1);
	new cjs.ButtonHelper(this.ghost_btn, 0, 1, 2);

	this.timeline.addTween(cjs.Tween.get(this.ghost_btn).wait(1));

	// happyghost
	this.happyghost_btn = new lib.happyghost_btn();
	this.happyghost_btn.name = "happyghost_btn";
	this.happyghost_btn.setTransform(501,204,1,1,0,0,0,86,86);
	new cjs.ButtonHelper(this.happyghost_btn, 0, 1, 2);

	this.timeline.addTween(cjs.Tween.get(this.happyghost_btn).wait(1));

	// Torch
	this.torch_btn = new lib.torch_btn();
	this.torch_btn.name = "torch_btn";
	this.torch_btn.setTransform(400.25,927.4,1,1,0,0,0,58.7,58.7);
	new cjs.ButtonHelper(this.torch_btn, 0, 1, 2);

	this.timeline.addTween(cjs.Tween.get(this.torch_btn).wait(1));

	// pause_btn
	this.pause_btn = new lib.pause_btn();
	this.pause_btn.name = "pause_btn";
	this.pause_btn.setTransform(76.1,467.1,1,1,0,0,0,19.1,19.1);
	new cjs.ButtonHelper(this.pause_btn, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.pause_btn).wait(1));

	// play_btn
	this.play_btn = new lib.play_btn();
	this.play_btn.name = "play_btn";
	this.play_btn.setTransform(125.9,466.9,1,1,0,0,0,18.9,18.9);
	new cjs.ButtonHelper(this.play_btn, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.play_btn).wait(1));

	// stop_btn
	this.stop_btn = new lib.stop_btn();
	this.stop_btn.name = "stop_btn";
	this.stop_btn.setTransform(178.2,466.2,1,1,0,0,0,19.2,19.2);
	new cjs.ButtonHelper(this.stop_btn, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.stop_btn).wait(1));

	// eye1_mc
	this.eye_mc = new lib.eye_mc();
	this.eye_mc.name = "eye_mc";
	this.eye_mc.setTransform(107.3,258.6,1,1,14.9992,0,0,70.2,95.8);

	this.timeline.addTween(cjs.Tween.get(this.eye_mc).wait(1));

	// eye2_mc
	this.eye2_mc = new lib.eye2_mc();
	this.eye2_mc.name = "eye2_mc";
	this.eye2_mc.setTransform(143.7,259.15,1,1,14.9992,0,0,104.7,97.1);

	this.timeline.addTween(cjs.Tween.get(this.eye2_mc).wait(1));

	// character_mc
	this.instance = new lib.Layer4();
	this.instance.setTransform(39,162,0.4122,0.4122);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// ghost_frame
	this.instance_1 = new lib.mrghost_btn();
	this.instance_1.setTransform(459,589);
	new cjs.ButtonHelper(this.instance_1, 0, 1, 2);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// dancingskelly
	this.danceskel_btn = new lib.danceskel_btn();
	this.danceskel_btn.name = "danceskel_btn";
	this.danceskel_btn.setTransform(286.6,966.9,1,1,0,0,0,80.9,80.9);
	new cjs.ButtonHelper(this.danceskel_btn, 0, 1, 2);

	this.timeline.addTween(cjs.Tween.get(this.danceskel_btn).wait(1));

	// skeleton
	this.skelly_btn = new lib.skelly_btn();
	this.skelly_btn.name = "skelly_btn";
	this.skelly_btn.setTransform(198.95,974.4,1.1913,1.1913,0,0,0,65.3,65.4);
	new cjs.ButtonHelper(this.skelly_btn, 0, 1, 2);

	this.timeline.addTween(cjs.Tween.get(this.skelly_btn).wait(1));

	// cat
	this.cat_btn = new lib.cat_btn();
	this.cat_btn.name = "cat_btn";
	this.cat_btn.setTransform(788.5,1072.5,1,1,0,0,0,711.5,427.5);
	new cjs.ButtonHelper(this.cat_btn, 0, 1, 2);

	this.timeline.addTween(cjs.Tween.get(this.cat_btn).wait(1));

	// smoke
	this.smoky_mc = new lib.smoky_mc();
	this.smoky_mc.name = "smoky_mc";
	this.smoky_mc.setTransform(230.5,142.55,0.1049,0.1049,0,0,0,1500.9,1500.4);

	this.timeline.addTween(cjs.Tween.get(this.smoky_mc).wait(1));

	// Illustration
	this.instance_2 = new lib.Janine_P_InteractiveGame101();
	this.instance_2.setTransform(0,0,0.2383,0.2383);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(338,517,647.8,555.5999999999999);
// library properties:
lib.properties = {
	id: '096305A26FE3C744B96AE023B2FFDDC0',
	width: 878,
	height: 1072,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/Bitmap14.jpg?1682121261126", id:"Bitmap14"},
		{src:"images/Bitmap15.jpg?1682121261126", id:"Bitmap15"},
		{src:"images/Bitmap16.jpg?1682121261126", id:"Bitmap16"},
		{src:"images/blood.png?1682121261126", id:"blood"},
		{src:"images/bone.png?1682121261126", id:"bone"},
		{src:"images/bonepngcopy.png?1682121261126", id:"bonepngcopy"},
		{src:"images/boo1.png?1682121261126", id:"boo1"},
		{src:"images/boo1pngcopy.png?1682121261126", id:"boo1pngcopy"},
		{src:"images/boo2.png?1682121261126", id:"boo2"},
		{src:"images/boo3.png?1682121261126", id:"boo3"},
		{src:"images/boo4.png?1682121261126", id:"boo4"},
		{src:"images/boo5.png?1682121261126", id:"boo5"},
		{src:"images/boo6.png?1682121261126", id:"boo6"},
		{src:"images/boo7.png?1682121261126", id:"boo7"},
		{src:"images/boo8.png?1682121261126", id:"boo8"},
		{src:"images/candlescopy.png?1682121261126", id:"candlescopy"},
		{src:"images/cat1.png?1682121261126", id:"cat1"},
		{src:"images/cat10.png?1682121261126", id:"cat10"},
		{src:"images/cat12.png?1682121261126", id:"cat12"},
		{src:"images/cat14.png?1682121261126", id:"cat14"},
		{src:"images/cat16.png?1682121261126", id:"cat16"},
		{src:"images/cat18.png?1682121261126", id:"cat18"},
		{src:"images/cat20.png?1682121261126", id:"cat20"},
		{src:"images/cat22.png?1682121261126", id:"cat22"},
		{src:"images/cat24.png?1682121261126", id:"cat24"},
		{src:"images/cat4.png?1682121261126", id:"cat4"},
		{src:"images/cat6.png?1682121261126", id:"cat6"},
		{src:"images/cat8.png?1682121261126", id:"cat8"},
		{src:"images/Cauldron1.png?1682121261126", id:"Cauldron1"},
		{src:"images/Cauldron10.png?1682121261126", id:"Cauldron10"},
		{src:"images/Cauldron13.png?1682121261126", id:"Cauldron13"},
		{src:"images/Cauldron16.png?1682121261126", id:"Cauldron16"},
		{src:"images/Cauldron19.png?1682121261126", id:"Cauldron19"},
		{src:"images/Cauldron22.png?1682121261126", id:"Cauldron22"},
		{src:"images/Cauldron4.png?1682121261126", id:"Cauldron4"},
		{src:"images/Cauldron7.png?1682121261126", id:"Cauldron7"},
		{src:"images/cursor.png?1682121261126", id:"cursor"},
		{src:"images/Envelope_1.png?1682121261126", id:"Envelope_1"},
		{src:"images/Envelope_1pngcopy.png?1682121261126", id:"Envelope_1pngcopy"},
		{src:"images/Envelope_1pngcopy2.png?1682121261126", id:"Envelope_1pngcopy2"},
		{src:"images/Envelope_2.png?1682121261126", id:"Envelope_2"},
		{src:"images/Envelope_3.png?1682121261126", id:"Envelope_3"},
		{src:"images/Envelope_4.png?1682121261126", id:"Envelope_4"},
		{src:"images/Envelope_5.png?1682121261126", id:"Envelope_5"},
		{src:"images/Envelope_6.png?1682121261126", id:"Envelope_6"},
		{src:"images/Explosion1pngcopy.png?1682121261126", id:"Explosion1pngcopy"},
		{src:"images/Explosion10.png?1682121261126", id:"Explosion10"},
		{src:"images/Explosion11.png?1682121261126", id:"Explosion11"},
		{src:"images/Explosion12.png?1682121261126", id:"Explosion12"},
		{src:"images/Explosion13pngcopy.png?1682121261126", id:"Explosion13pngcopy"},
		{src:"images/Explosion2.png?1682121261126", id:"Explosion2"},
		{src:"images/Explosion3.png?1682121261126", id:"Explosion3"},
		{src:"images/Explosion4.png?1682121261126", id:"Explosion4"},
		{src:"images/Explosion5.png?1682121261126", id:"Explosion5"},
		{src:"images/Explosion6.png?1682121261126", id:"Explosion6"},
		{src:"images/Explosion7.png?1682121261126", id:"Explosion7"},
		{src:"images/Explosion8.png?1682121261126", id:"Explosion8"},
		{src:"images/Explosion9.png?1682121261126", id:"Explosion9"},
		{src:"images/ghostblush1.png?1682121261127", id:"ghostblush1"},
		{src:"images/ghostblush1pngcopy.png?1682121261127", id:"ghostblush1pngcopy"},
		{src:"images/ghostblush11.png?1682121261127", id:"ghostblush11"},
		{src:"images/ghostblush13.png?1682121261127", id:"ghostblush13"},
		{src:"images/ghostblush15.png?1682121261127", id:"ghostblush15"},
		{src:"images/ghostblush16.png?1682121261127", id:"ghostblush16"},
		{src:"images/ghostblush3.png?1682121261127", id:"ghostblush3"},
		{src:"images/ghostblush5.png?1682121261127", id:"ghostblush5"},
		{src:"images/ghostblush7.png?1682121261127", id:"ghostblush7"},
		{src:"images/ghostblush9.png?1682121261127", id:"ghostblush9"},
		{src:"images/happyghost1.png?1682121261127", id:"happyghost1"},
		{src:"images/happyghost10.png?1682121261127", id:"happyghost10"},
		{src:"images/happyghost2.png?1682121261127", id:"happyghost2"},
		{src:"images/happyghost3.png?1682121261127", id:"happyghost3"},
		{src:"images/happyghost5.png?1682121261127", id:"happyghost5"},
		{src:"images/happyghost6.png?1682121261127", id:"happyghost6"},
		{src:"images/happyghost7.png?1682121261127", id:"happyghost7"},
		{src:"images/happyghost8.png?1682121261127", id:"happyghost8"},
		{src:"images/happyghost9.png?1682121261127", id:"happyghost9"},
		{src:"images/Hooray1.png?1682121261127", id:"Hooray1"},
		{src:"images/Hooray2.png?1682121261127", id:"Hooray2"},
		{src:"images/Hooray3.png?1682121261127", id:"Hooray3"},
		{src:"images/Hooray4.png?1682121261127", id:"Hooray4"},
		{src:"images/Hooray5.png?1682121261127", id:"Hooray5"},
		{src:"images/Janine_P_InteractiveGame101.png?1682121261127", id:"Janine_P_InteractiveGame101"},
		{src:"images/lavender.png?1682121261127", id:"lavender"},
		{src:"images/letterr.png?1682121261127", id:"letterr"},
		{src:"images/poison.png?1682121261127", id:"poison"},
		{src:"images/pumkin.png?1682121261127", id:"pumkin"},
		{src:"images/Skelly_Dance1pngcopy3.png?1682121261127", id:"Skelly_Dance1pngcopy3"},
		{src:"images/Skelly_Dance3pngcopy2.png?1682121261127", id:"Skelly_Dance3pngcopy2"},
		{src:"images/Skelly_Dance5pngcopy2.png?1682121261127", id:"Skelly_Dance5pngcopy2"},
		{src:"images/Skelly_Dance7pngcopy2.png?1682121261127", id:"Skelly_Dance7pngcopy2"},
		{src:"images/skull.png?1682121261127", id:"skull"},
		{src:"images/smoke11.png?1682121261127", id:"smoke11"},
		{src:"images/smoke13.png?1682121261127", id:"smoke13"},
		{src:"images/smoke15.png?1682121261127", id:"smoke15"},
		{src:"images/smoke17.png?1682121261127", id:"smoke17"},
		{src:"images/smoke19.png?1682121261127", id:"smoke19"},
		{src:"images/smoke2.png?1682121261127", id:"smoke2"},
		{src:"images/smoke21.png?1682121261127", id:"smoke21"},
		{src:"images/smoke24.png?1682121261127", id:"smoke24"},
		{src:"images/smoke3.png?1682121261127", id:"smoke3"},
		{src:"images/smoke5.png?1682121261127", id:"smoke5"},
		{src:"images/smoke7.png?1682121261127", id:"smoke7"},
		{src:"images/smoke9.png?1682121261127", id:"smoke9"},
		{src:"images/tears.png?1682121261127", id:"tears"},
		{src:"images/Torch1pngcopy.png?1682121261127", id:"Torch1pngcopy"},
		{src:"images/Torch10.png?1682121261127", id:"Torch10"},
		{src:"images/Torch11.png?1682121261127", id:"Torch11"},
		{src:"images/Torch12.png?1682121261127", id:"Torch12"},
		{src:"images/Torch13.png?1682121261127", id:"Torch13"},
		{src:"images/Torch14.png?1682121261127", id:"Torch14"},
		{src:"images/Torch15.png?1682121261127", id:"Torch15"},
		{src:"images/Torch16.png?1682121261127", id:"Torch16"},
		{src:"images/Torch17.png?1682121261127", id:"Torch17"},
		{src:"images/Torch18.png?1682121261127", id:"Torch18"},
		{src:"images/Torch19.png?1682121261127", id:"Torch19"},
		{src:"images/Torch2.png?1682121261127", id:"Torch2"},
		{src:"images/Torch20.png?1682121261127", id:"Torch20"},
		{src:"images/Torch21.png?1682121261127", id:"Torch21"},
		{src:"images/Torch22.png?1682121261127", id:"Torch22"},
		{src:"images/Torch3.png?1682121261127", id:"Torch3"},
		{src:"images/Torch4.png?1682121261127", id:"Torch4"},
		{src:"images/Torch5.png?1682121261127", id:"Torch5"},
		{src:"images/Torch6.png?1682121261127", id:"Torch6"},
		{src:"images/Torch7.png?1682121261127", id:"Torch7"},
		{src:"images/Torch8.png?1682121261127", id:"Torch8"},
		{src:"images/Torch9.png?1682121261127", id:"Torch9"},
		{src:"images/unicornblood.png?1682121261127", id:"unicornblood"},
		{src:"images/Untitled_Artwork22.png?1682121261127", id:"Untitled_Artwork22"},
		{src:"images/wavyskelly1.png?1682121261127", id:"wavyskelly1"},
		{src:"images/wavyskelly1pngcopy4.png?1682121261127", id:"wavyskelly1pngcopy4"},
		{src:"images/wavyskelly10.png?1682121261127", id:"wavyskelly10"},
		{src:"images/wavyskelly11.png?1682121261127", id:"wavyskelly11"},
		{src:"images/wavyskelly12.png?1682121261127", id:"wavyskelly12"},
		{src:"images/wavyskelly13.png?1682121261127", id:"wavyskelly13"},
		{src:"images/wavyskelly14.png?1682121261127", id:"wavyskelly14"},
		{src:"images/wavyskelly15.png?1682121261127", id:"wavyskelly15"},
		{src:"images/wavyskelly16.png?1682121261127", id:"wavyskelly16"},
		{src:"images/wavyskelly17.png?1682121261127", id:"wavyskelly17"},
		{src:"images/wavyskelly18.png?1682121261127", id:"wavyskelly18"},
		{src:"images/wavyskelly19.png?1682121261127", id:"wavyskelly19"},
		{src:"images/wavyskelly20.png?1682121261127", id:"wavyskelly20"},
		{src:"images/wavyskelly21.png?1682121261127", id:"wavyskelly21"},
		{src:"images/wavyskelly22.png?1682121261127", id:"wavyskelly22"},
		{src:"images/wavyskelly23.png?1682121261127", id:"wavyskelly23"},
		{src:"images/wavyskelly24.png?1682121261127", id:"wavyskelly24"},
		{src:"images/wavyskelly25.png?1682121261127", id:"wavyskelly25"},
		{src:"images/wavyskelly3.png?1682121261127", id:"wavyskelly3"},
		{src:"images/wavyskelly4.png?1682121261127", id:"wavyskelly4"},
		{src:"images/wavyskelly5.png?1682121261127", id:"wavyskelly5"},
		{src:"images/wavyskelly6.png?1682121261127", id:"wavyskelly6"},
		{src:"images/wavyskelly7.png?1682121261127", id:"wavyskelly7"},
		{src:"images/wavyskelly8.png?1682121261127", id:"wavyskelly8"},
		{src:"images/wavyskelly9.png?1682121261127", id:"wavyskelly9"},
		{src:"images/JaninePayne_InteractiveMap_atlas_1.png?1682121260408", id:"JaninePayne_InteractiveMap_atlas_1"},
		{src:"sounds/catmeow14536.mp3?1682121261127", id:"catmeow14536"},
		{src:"sounds/discowav.mp3?1682121261127", id:"discowav"},
		{src:"sounds/ES_EvilLaugh3SFXProducerwav.mp3?1682121261127", id:"ES_EvilLaugh3SFXProducerwav"},
		{src:"sounds/firewav.mp3?1682121261127", id:"firewav"},
		{src:"sounds/ghostsoundwav.mp3?1682121261127", id:"ghostsoundwav"},
		{src:"sounds/WitchThemeSong.mp3?1682121261127", id:"WitchThemeSong"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['096305A26FE3C744B96AE023B2FFDDC0'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;