// welcome to something.js, where we do something to make something happen

// first things fisrt, get the image from somewhere

// version 1 for testing, get the image from a file in the repo

// version 2 for webcam, get the userMedia or whatever it is called

// get the pixel matrix from the image and separate it in 3 diffrent layers,
// from there get a soemhting x somehting x 3 matrix ready to get into the neural net flow.

// do convolutions till you get a 7 x 7 x 1024 matrix, the same as
// darknet c++ architecture but more shitty looking, you know, js is not the best looking
// coding language out there. You know the ugly girl in the party that nobody talks to, unless
// you are truly desperate, thats js.

// get it into a normal deep net, 4096 neurons, keep going

// end up with a 7 x 7 x 30
// this 7 x 7 x 30 has the | (x, y, w , h, obj score) and class probality |

// save the numbers, thats what you need, wheights, bias ect

// made for 60 fps at 720p webcam , max netwrork time should be bellow 16 ms

// foward ------------------------------------------------------------------------------

var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var imageData;

document.getElementById("myFile").onchange = function (evt) {
  var tgt = evt.target || window.event.srcElement,
    files = tgt.files;

  // FileReader support
  if (FileReader && files && files.length) {
    var fr = new FileReader();
    fr.onload = () => showImage(fr);
    fr.readAsDataURL(files[0]);
  }
};

function showImage(fileReader) {
  var img = document.getElementById("myImage");
  img.onload = () => getImageData(img);
  img.src = fileReader.result;
}

function getImageData(img) {
  ctx.drawImage(img, 0, 0);

  imageData = ctx.getImageData(0, 0, img.width, img.height).data;
  console.time();

  //maxpool
  let i = 0;
  temp = [];
  final = [];
  for (i; i < imageData.length; i++) {
    if (i % 30000 == 0 && i != 0) {
      let max = average(temp);
      final.push(max);
      temp = [];
    } else {
      temp.push(imageData[i]);
    }
  }

  // var c = document.createElement("c");

  let c = document.getElementById("c");

  var ctx2 = c.getContext("2d");

  // create the imageData object
  var dataImage = ctx2.createImageData(img.width, img.height);
  // browsers supporting TypedArrays
  if (dataImage.data.set) {
    dataImage.data.set(final);
  } else {
    // IE9
    final.forEach(function (val, i) {
      dataImage.data[i] = val;
    });
  }

  ctx2.putImageData(dataImage, 0, 0);
  console.log(final);

  document.getElementById("test").innerHTML = "[" + final.join() + "]";

  var w1 = [...Array(33)].map(() => Math.floor(Math.random() * 9));

  document.getElementById("test2").innerHTML = "[" + w1.join() + "]";

  var w2 = [...Array(12)].map(() => Math.floor(Math.random() * 101));

  document.getElementById("test3").innerHTML = "[" + w2.join() + "]";

  // generate neural network to pass the data, one for the bouding boxes

  const m = 2;
  const b = 12;

  //neuron with sigmoid
  const sigmoid = (x) => 1 / (1 + Math.pow(Math.E, -(m * x + b)));


  let arr = [1,2,3]

  const neuron = (arr) => {

    //dot product between pixles and weights


  }
 

let a = [[1, 3, -5]]
let b2 = [[4], [-2], [-1]]

arrayy = []

result = null;

// a . b = ab^t       a times b where b is transposed
const dotProduct = (a,b2) => {
  let i = 0;
  for( i; i < a.length; i++) {
    console.log(a[i])
    arrayy.push(a[i]*b2[i])
  }
  result = arrayy.reduce(function(prev, cur) {
    return prev + cur;
  })
}

dotProduct(final,w1)

console.log(sigmoid(result))






  // one for classification










  console.timeEnd();
}

// ------------------------------------------------------------------------


// backward ----------------------------------------------------------------------------
