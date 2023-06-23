// import { Input } from './Input.js';
import { Obj3D } from './Obj3D.js';
// import { Canvas3D } from './Canvas3D.js';
// import { CvWireframe } from './CvWireFrame.js';
import { CvHLines } from './CvHLines.js';
import { Rota3D } from './Rota3D.js';
import { Point3D } from './point3D.js';

let canvas: HTMLCanvasElement;
let graphics: CanvasRenderingContext2D;

canvas = <HTMLCanvasElement>document.getElementById('circlechart');
graphics = canvas.getContext('2d');

let cv: CvHLines;
let obj: Obj3D;
let ang: number = 0;

function leerArchivo(e: any) {
  var archivo = e.target.files[0];
  if (!archivo) {
    return;
  }
  var lector = new FileReader();
  lector.onload = function (e) {
    var contenido = e.target.result;
    mostrarContenido(contenido);
    obj = new Obj3D();
    if (obj.read(contenido)) {
      // sDir = sDir1;
      cv = new CvHLines(graphics, canvas);
      cv.setObj(obj);
      cv.paint();
    }
  };
  lector.readAsText(archivo);
}

function mostrarContenido(contenido: any) {
  var elemento = document.getElementById('contenido-archivo');
  // readObject(new Input(contenido));
  elemento.innerHTML = contenido;
}

function vp(dTheta: number, dPhi: number, fRho: number): void {
  // Viewpoint
  if (obj != undefined) {
    let obj: Obj3D = cv.getObj();
    if (!obj.vp(cv, dTheta, dPhi, fRho))
      alert('datos no validos');
  } else alert('aun no has leído un archivo');
}

function eyeDownFunc() {
  vp(0, 0.1, 1);
}

function eyeUpFunc() {
  vp(0, -0.1, 1);
}

function eyeLeftFunc() {
  vp(-0.1, 0, 1);
}

function eyeRightFunc() {
  vp(0.1, 0, 1);
}

function incrDistFunc() {
  vp(0, 0, 2);
}

function decrDistFunc() {
  vp(0, 0, 0.5);
}

let rotationInProgress = false; // Variable de control


let rotaIzq = -1; 
function pza1IzqFunc() {
  // Comprobar si la rotación está en progreso
  if (rotationInProgress) {
    // Si la rotación está en progreso, detenerla
    rotationInProgress = false;
  } else {
    // Si la rotación no está en progreso, iniciarla
    rotationInProgress = true;
    // Iniciar la rotación
    rotateIzq();
  }
}

function rotateIzq() {
  // Realizar la rotación del objeto
  let af = rotaIzq;
  Rota3D.initRotate(obj.w[1000], obj.w[1001], af * Math.PI / 180);

  for (let i = 101; i <= 140; i++) {
    obj.w[i] = Rota3D.rotate(obj.w[i]);
  }
  Rota3D.initRotate(obj.w[1002], obj.w[1003], af * Math.PI / 180);

  for (let i = 141; i <= 216; i++) {
    obj.w[i] = Rota3D.rotate(obj.w[i]);
  }
  cv.setObj(obj);
  cv.paint();
  if (rotationInProgress) {
    // Si la rotación está en progreso, continuar la rotación en el siguiente frame
    requestAnimationFrame(rotateIzq);
  }
}










let rotationSpeed = 1; // Velocidad de rotación
function pza1DerFunc() {
  // Comprobar si la rotación está en progreso
  if (rotationInProgress) {
    // Si la rotación está en progreso, detenerla
    rotationInProgress = false;
  } else {
    // Si la rotación no está en progreso, iniciarla
    rotationInProgress = true;
    // Iniciar la rotación
    rotateObject();
  }
}

function rotateObject() {
  // Realizar la rotación del objeto
  let af = rotationSpeed;
  Rota3D.initRotate(obj.w[1000], obj.w[1001], af * Math.PI / 180);

  for (let i = 101; i <= 140; i++) {
    obj.w[i] = Rota3D.rotate(obj.w[i]);
  }
  Rota3D.initRotate(obj.w[1002], obj.w[1003], af * Math.PI / 180);

  for (let i = 141; i <= 216; i++) {
    obj.w[i] = Rota3D.rotate(obj.w[i]);
  }
  cv.setObj(obj);
  cv.paint();

  // Comprobar si la rotación aún está en progreso
  if (rotationInProgress) {
    // Si la rotación está en progreso, continuar la rotación en el siguiente frame
    requestAnimationFrame(rotateObject);
  }
}



  let rotaAlas = 1; 
  function pzaAlasFunc() {
  // Comprobar si la rotación está en progreso
  if (rotationInProgress) {
    // Si la rotación está en progreso, detenerla
    rotationInProgress = false;
  } else {
    // Si la rotación no está en progreso, iniciarla
    rotationInProgress = true;
    // Iniciar la rotación
    rotateAlas();
  }
}

function rotateAlas() {
  // Realizar la rotación del objeto
  let af = rotaAlas;
  Rota3D.initRotate(obj.w[1000], obj.w[1001], af * Math.PI / 180);

  for (let i = 101; i <= 140; i++) {
    obj.w[i] = Rota3D.rotate(obj.w[i]);
  }
  cv.setObj(obj);
  cv.paint();

  if (rotationInProgress) {
    // Si la rotación está en progreso, continuar la rotación en el siguiente frame
    requestAnimationFrame(rotateAlas);
  }
}




let rotaAnte = 1; 
function pzaAnteFunc() {
// Comprobar si la rotación está en progreso
if (rotationInProgress) {
  // Si la rotación está en progreso, detenerla
  rotationInProgress = false;
} else {
  // Si la rotación no está en progreso, iniciarla
  rotationInProgress = true;
  // Iniciar la rotación
  rotateAnte();
}
}

function rotateAnte() {
// Realizar la rotación del objeto
let af = rotaAlas;
Rota3D.initRotate(obj.w[1002], obj.w[1003], af * Math.PI / 180);

for (let i = 141; i <= 216; i++) {
  obj.w[i] = Rota3D.rotate(obj.w[i]);
}
cv.setObj(obj);
cv.paint();



if (rotationInProgress) {
  // Si la rotación está en progreso, continuar la rotación en el siguiente frame
  requestAnimationFrame(rotateAnte);
}
}

//incremento de rotacion con la tecla z
function increaseRotationSpeed() {
  rotationSpeed += 1;
}

function init() {
  obj = new Obj3D();
  cv = new CvHLines(graphics, canvas);

  // Asignar eventos a los botones
  document.getElementById('eyeDown').addEventListener('click', eyeDownFunc, false);
  document.getElementById('eyeUp').addEventListener('click', eyeUpFunc, false);
  document.getElementById('eyeLeft').addEventListener('click', eyeLeftFunc, false);
  document.getElementById('eyeRight').addEventListener('click', eyeRightFunc, false);
  document.getElementById('incrDist').addEventListener('click', incrDistFunc, false);
  document.getElementById('decrDist').addEventListener('click', decrDistFunc, false);
  document.getElementById('pza1Izq').addEventListener('click', pza1IzqFunc, false);
  document.getElementById('pza1Der').addEventListener('click', pza1DerFunc, false);
  document.getElementById('pzaAlas').addEventListener('click', pzaAlasFunc, false);
  document.getElementById('pzaAnte').addEventListener('click', pzaAnteFunc, false);
 
  // Asignar evento al input de carga de archivo
  document.getElementById('file-input').addEventListener('change', leerArchivo, false);

  // Asignar evento del teclado
  document.addEventListener('keydown', function (event) {
    switch (event.key) {
      case 'ArrowUp':
        vp(0, -0.1, 1); // Mover hacia arriba
        break;
      case 'ArrowDown':
        vp(0, 0.1, 1); // Mover hacia abajo
        break;
      case 'ArrowLeft':
        vp(-0.1, 0, 1); // Mover hacia la izquierda
        break;
      case 'ArrowRight':
        vp(0.1, 0, 1); // Mover hacia la derecha
        break;
      case 'z':
        increaseRotationSpeed(); // Aumentar la velocidad de rotación
        break;
      default:
        break;
    }
  });
}

init();
//visualizador 3d
let Pix: number, Piy: number;
let Pfx: number, Pfy: number;
let theta = 0.3,
  phi = 1.3,
  SensibilidadX = 0.02,
  SensibilidadY = 0.02;
let flag: boolean = false;

function handleMouse(evento: any) {
  Pix = evento.offsetX;
  Piy = evento.offsetY;
  flag = true;
}

function makeVizualization(evento: any) {
  if (flag) {
    Pfx = evento.offsetX;
    Pfy = evento.offsetY;
    let difX = Pix - Pfx;
    let difY = Pfy - Piy;
    vp(0, 0.1 * difY / 50, 1);
    Piy = Pfy;
    vp(0.1 * difX, 0 / 50, 1);
    Pix = Pfx;
  }
}

function noDraw() {
  flag = false;
}

canvas.addEventListener('mousedown', handleMouse);
canvas.addEventListener('mouseup', noDraw);
canvas.addEventListener('mousemove', makeVizualization);
