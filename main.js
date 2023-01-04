song ="";
statusModel="";
objects=[];

function preload()
{
video=createCapture(VIDEO);
video.size(380, 380);
video.hide();
song = loadSound("alarm.wav");
}

function setup()
{
    canvas= createCanvas(380, 380);
    canvas.center();
}

function start()
{
    objectDetection=ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById('status').innerHTML = "Status : Detecting Objects";
}

function draw()
{
    image(video, 0, 0, 380, 380);
   if (statusModel !=""){
    objectDetection.detect(video, gotResult) ;           
    for (i = 0; i < objects.length; i++) 
    {
        if(objects[i].label == "person"){
            document.getElementById("status").innerHTML="Human Detected";
           song.stop();
        }else{
            document.getElementById("status").innerHTML="Human NOT Detected";
          song.play(); 
        }
        if(objects.length <0){
            document.getElementById("status").innerHTML="Human NOT Detected";
          song.play();
        }
    }
}
}

function modelLoaded()
{
    console.log("Model Loaded!");
    statusModel = true;
}

function gotResult(error,result)
{
 if (error)
 {
    console.error(error);
 }
 console.log(result);
 objects=result;
}