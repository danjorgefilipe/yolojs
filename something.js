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
  let i = 0
  temp = [];
  final = [];




  for(i; i < imageData.length; i++) {
    
    if(i % 10000 == 0 && i != 0) {
      let max = average(temp)
      final.push(max)
      temp = [];
    }
    else {
      temp.push(imageData[i])
    }
  };


// var c = document.createElement("c");

let c = document.getElementById("c");

  var ctx2 = c.getContext('2d');

  // create the imageData object
  var dataImage = ctx2.createImageData(img.width , img.height );
  // browsers supporting TypedArrays
  if (dataImage.data.set) {
    dataImage.data.set(final);
  } else {
    // IE9
    final.forEach(function(val, i) {
      dataImage.data[i] = val;
    });
  }


  ctx2.putImageData(dataImage, 0, 0);
  console.log(final)
  console.timeEnd();

  document.getElementById('test').innerHTML="["+final.join()+"]";

  var randoms = [...Array(10)].map(() => Math.floor(Math.random() * 9));

  document.getElementById('test2').innerHTML="["+randoms.join()+"]";

  var randoms2 = [...Array(10)].map(() => Math.floor(Math.random() * 9));

  document.getElementById('test3').innerHTML="["+randoms2.join()+"]";






}

// ------------------------------------------------------------------------




// utils ------------------------------------------------------------------------------------------
function reshape(array, n) {
  return compact(
    array.map(function (el, i) {
      if (i % n === 0) {
        return array.slice(i, i + n);
      }
    })
  );
}

function compact(array) {
  let resIndex = 0;
  const result = [];

  if (array == null) {
    return result;
  }

  for (const value of array) {
    if (value) {
      result[resIndex++] = value;
    }
  }
  return result;
}

function average(nums) {
  return Math.round(nums.reduce((a, b) => (a + b)) / nums.length);
}

// bla = reshape([1,2,3,4,5,6,7,8,9], 3)
// bla2 = bla.forEach(el => {
//     re = reshape(el,1)
//     console.log('re', re)
// });
// console.log(bla)

// using several filters for this one, do a convolution
function convolution(vec1, vec2) {
  var disp = 0;
  var convVec = [];
  for (j = 0; j < vec2.length; j++) {
    convVec.push(vec1[0] * vec2[j]);
  }
  disp = disp + 1;
  for (i = 1; i < vec1.length; i++) {
    for (j = 0; j < vec2.length; j++) {
      if (disp + j !== convVec.length) {
        convVec[disp + j] = convVec[disp + j] + vec1[i] * vec2[j];
      } else {
        convVec.push(vec1[i] * vec2[j]);
      }
    }
    disp = disp + 1;
  }
  return convVec;
}

// vecA = [2,3,2,1]
// vecB = [4,1,2,3]
// ans = convolution(vecA, vecB);
// console.log('ans---> ',ans)

//   var randoms = [...Array(10)].map(() => Math.floor(Math.random() * 9));

//   console.log(randoms)

// backward ----------------------------------------------------------------------------
