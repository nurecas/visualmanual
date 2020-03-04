 // Classifier Variable
 let classifier;
 // Model URL
 let imageModelURL = 'https://teachablemachine.withgoogle.com/models/s379EsNn/';

 // Video
 let video;
 let flippedVideo;
 // To store the classification
 let label = "";
let img;
 // Load the model first
 function preload() {
     classifier = ml5.imageClassifier(imageModelURL + 'model.json');
     img = loadImage('data/logo.jpg');
 }

function setup() {
     createCanvas(400, 660);
     // Create the video
     //video = createCapture(VIDEO);
     

     var constraints = {
         audio: false,
         video: {
             facingMode: "environment"
         }
     };
     video = createCapture(constraints);
     video.size(400, 660);
     video.hide();

     flippedVideo = ml5.flipImage(video)
     // Start classifying
     classifyVideo();
 }

 function draw() {
     background(0);
     // Draw the video
     image(video, 0, 0);

     // Draw the label
     fill(255);
     textSize(30);
     textAlign(CENTER);
     text(label, width / 2, height - 60);
     image(img, 10, height-100, 100, 52);
 }

 // Get a prediction for the current video frame
 function classifyVideo() {
     flippedVideo = ml5.flipImage(video)
     classifier.classify(flippedVideo, gotResult);
 }

 // When we get a result
 function gotResult(error, results) {
     // If there is an error
     if (error) {
         console.error(error);
         return;
     }
     // The results are in an array ordered by confidence.
     // console.log(results[0]);
     if(results[0].confidence>0.85){
     label = results[0].label;
     }
     else{
     label = "...";
     }
     flippedImage.remove();
     // Classifiy again!
     classifyVideo();
 }
