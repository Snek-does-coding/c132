prediction1=""
prediction2=""

Webcam.set({
    width:350,
    height:350,
    image_format: 'png',
    png_quality:90
});

camera=document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri)
    {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    })
}

console.log('ml5 version:', ml5.version);

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/OVYU_1p1m/model.json',modelLoaded);

function modelLoaded()
{
    console.log("model loaded");
}

function speak()
{
    var synth = window.speechSynthesis;
    speak_data_1 = "and the first prediction is:" + prediction1;
    speak_data_2 = "and the next prediction is:" + prediction2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        document.getElementById("result_hand_name").innerHTML = results[0].label;
        document.getElementById("result_hand_name2").innerHTML = results[1].label;
        prediction1 = results[0].label
        prediction2 = results[1].label
        speak()
            {
                    if(results[0].label == "Proper mask")
                    {
                        document.getElementById("update_hand").innerHTML = "&#128567";
                    }
                    {
                    if(results[0].label == "Improper mask")
                    {
                            document.getElementById("update_hand").innerHTML = "&#128529";
                    }
                    if(results[0].label == "No mask")
                    {
                            document.getElementById("update_hand").innerHTML = "&#128577";
                    }
                    if(results[1].label == "Proper mask")
                    {
                        document.getElementById("update_hand2").innerHTML = "&#128567";
                    }
                    {
                    if(results[1].label == "Improper mask")
                    {
                            document.getElementById("update_hand2").innerHTML = "&#128529";
                    }
                    if(results[1].label == "No mask")
                    {
                            document.getElementById("update_hand2").innerHTML = "&#128577";
                    }

                }
            }
        }
    }
}