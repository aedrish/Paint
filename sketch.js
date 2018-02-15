let pixelSize;
var paths = [];
var currentPath = [];
var drawColor;
var backgroundColor;
var canv;
function setup() {
  canv = createCanvas(windowWidth, windowHeight-150);
  pixelSize = createSlider(1, 50, 10, 1);
  pixelSize.position(10, height+15);
  drawColor = color(0,0,0);
  backgroundColor = color(255,255,255);
  addBackgroundButton();
  addSaveButton();
  addColorButton(color(0, 0, 0), 150, height+10);           //zwart
  addColorButton(color(255, 255, 255), 200, height+10);     //wit
  addColorButton(color(255, 0, 0), 250, height+10);         //red
  addColorButton(color(0,255,0), 300, height+10);           //Lime
  addColorButton(color(0,0,255), 350, height+10);           //Blue
  addColorButton(color(255, 255, 0), 400, height+10);       //Yellow
  addColorButton(color(0, 255, 255), 450, height+10);       //Cyan
  addColorButton(color(255, 0, 255), 500, height+10);       //Magenta
  addColorButton(color(192, 192, 192), 150, height+60);     //Silver
  addColorButton(color(128, 128, 128), 200,height+60);      //Gray
  addColorButton(color(128, 0, 0), 250, height+60);         //Maroon
  addColorButton(color(128, 128, 0), 300, height+60);       //Olive
  addColorButton(color(0, 128, 0), 350, height+60);         //Green
  addColorButton(color(128, 0, 128), 400, height+60);       //Purple
  addColorButton(color(0, 128, 128), 450, height+60);       //Teal
  addColorButton(color(0, 0, 128), 500, height+60);         //Navy
}

function addSaveButton() {
    let button = createButton('save');
    button.position(555, height+10)
    button.style('width', '100px')
    button.style('height', '100px');
    button.mousePressed(() => saveCanvas(canv, 'myCanvas', 'jpg'));
}

function addBackgroundButton() {
    let button = createButton('background');
    button.position(45, height+60);
    button.style('width', '100px');
    button.style('height', '50px');
    button.mousePressed(() => {backgroundColor = drawColor; paths = [];});
}

function addColorButton(color, x, y) {
    let button = createButton(null);
    button.position(x, y);
    button.style('border', ' 2px solid black');
    button.style('background-color', color);
    button.style('width', '50px');
    button.style('height', '50px');
    button.mousePressed(() => ChangeColor(color));
}

function ChangeColor(color) {
    drawColor = color;
}

function windowResized() {
  createCanvas(windowWidth, windowHeight-150);
}

function draw() {
    background(backgroundColor);
    for( var i = 0; i < paths.length; i++) { //all paths
        for(var j = 1; j < paths[i].length; j++) {
            stroke(paths[i][j].color);
            strokeWeight(paths[i][j].size);
            line(paths[i][j].vec.x, paths[i][j].vec.y, paths[i][j -1].vec.x, paths[i][j - 1].vec.y);
        }
    }
    for(var i = 1; i < currentPath.length; i++) {
        stroke(currentPath[i].color);
        strokeWeight(currentPath[i].size);
        line(currentPath[i].vec.x, currentPath[i].vec.y, currentPath[i - 1].vec.x, currentPath[i - 1].vec.y);
    }
    strokeWeight();

    if(drawColor.levels[0] === 255 && drawColor.levels[1] === 255 && drawColor.levels[2] === 255) {
        fill(color(0,0,0));
        ellipse(mouseX, mouseY, pixelSize.value()+1, pixelSize.value()+1);
    }
    fill(drawColor);
    ellipse(mouseX, mouseY, pixelSize.value(), pixelSize.value());

}

function mouseDragged() {
    if(mouseIsPressed) {
        if(mouseY < height) {
            currentPath.push(new Path(mouseX, mouseY, pixelSize.value(), drawColor));
        }
    }
}

function mousePressed() {
    currentPath.push(new Path(mouseX, mouseY, pixelSize.value(), drawColor));
    currentPath.push(new Path(mouseX, mouseY, pixelSize.value(), drawColor));

}

function mouseReleased() {
    paths [paths.length] = currentPath;
    currentPath = [];
}

function Path(x, y, size, color) {
    this.vec = createVector(x, y);
    this.size = size;
    this.color = color;
}
