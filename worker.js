let currentPixels = null;
const R_OFFSET = 0;
const G_OFFSET = 1;
const B_OFFSET = 2;

function getIndex(x, y, width){
 return (x+y*width)*4; 
}

function clamp(value){
  return Math.max(0, Math.min(Math.floor(value), 255));
}

function addBlue(x,y, value, width){
  const index = getIndex(x,y, width) + B_OFFSET;
  const currentValue = currentPixels[index];
  currentPixels[index] = clamp(currentValue+value);
}

function addRed(x,y, value, width){
  const index = getIndex(x,y, width) + R_OFFSET;
  const currentValue = currentPixels[index];
  currentPixels[index] = clamp(currentValue+value);
}

function processImage(originalPixels, imgData, width, height){
  currentPixels = originalPixels.slice();
  for (let i = 0; i< height; i++){
    for (let j=0; j< width; j++){
      addBlue(j,i,100, width);
    } 
  } 
  
  for (let i=0; i< imgData.data.length; i++){
    imgData.data[i] = currentPixels[i];
  }
  postMessage(imgData);
}

function processImageRed(originalPixels, imgData, width, height){
  currentPixels = originalPixels.slice();
  for (let i = 0; i< height; i++){
    for (let j=0; j< width; j++){
      addRed(j,i,100, width);
    } 
  }  
  for (let i=0; i< imgData.data.length; i++){
    imgData.data[i] = currentPixels[i];
  }
  postMessage(imgData);
}

onmessage = function(event){
  if (event.data[0] !== null && event.data[1] !== null && typeof(event.data[2]) === "number" && typeof(event.data[3]) === "number" && event.data[4] === "Blue"){
    processImage(event.data[0], event.data[1], event.data[2], event.data[3]);
  }
  if (event.data[0] !== null && event.data[1] !== null && typeof(event.data[2]) === "number" && typeof(event.data[3]) === "number" && event.data[4] === "Red"){
    processImageRed(event.data[0], event.data[1], event.data[2], event.data[3]);
  }
}