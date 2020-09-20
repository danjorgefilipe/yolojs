// here are the utilities that are used in seagull.js



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
    return Math.round(nums.reduce((a, b) => a + b) / nums.length);
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