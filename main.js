img="";
status="";
object=[];

function preload(){
    img=loadImage("dog_cat.jpg");
}
function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    video.size(380,380);
    objectdetector=ml5=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status Object Detecting";
}


function modelLoaded(){
    console.log("modelLoaded");
    status=true;
}
function gotResult(error,results){
    if (error){
        console.log(error);
    }else{}
        console.log(results);
    object=results;

}
function draw(){
    image(video,0,0,380,380);
    if(status !=""){
        r=random(255);
        g=random(255);
        b=random(255);
        objectdetector.detect(video,gotResult);
        for(i=0; i<object.length; i++){
            document.getElementById("status").innerHTML="status:object detected";
            document.getElementById("NofObject").innerHTML="Number of Objects Detected Are "+object.length
            fill(r,g,b);
            percent=floor(object[i].confidence* 100);
            text(object[i].label+" "+ percent+"%",object[i].x,object[i].y-10);
            noFill();
            stroke(r,g,b);
            rect(object[i].x,object[i].y,object[i].width,object[i].height);

        }
    }
}