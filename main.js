let container;
let scene;
let camera;
let renderer;
let text;
let mesh;
let ADD = 0.06,
  theta = 0;

function init() {
  container = document.querySelector("#scene-container");

  scene = new THREE.Scene();
  scene.background = new THREE.Color("black");

  const fov = 70;
  const aspect = container.clientWidth / container.clientHeight;
  const near = 1;
  const far = 100;

  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 5, 40);

  const light = new THREE.DirectionalLight(0xffffff, 5.0);
  light.position.set(10, 10, 10);
  scene.add(light);

  const loader = new THREE.FontLoader();
  loader.load("../vender/helvetiker_regular.typeface.json", (font) => {
    createGeometry(font);
  });

  console.log(text);
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  renderer.gammaFactor = 2.2;
  renderer.gammaOutput = true;

  container.appendChild(renderer.domElement);

  render();
}

function createGeometry(font) {
  let titles =
    "Maybe,\nYou may have seen it somewhere\nBut,\nplease do not worry,\nIt has nothing to do with a certain movie\nThat song is in your head,\nNot because of this video";

  let geometry = new THREE.TextGeometry(titles, {
    font: font,
    size: 3.5,
    height: 0.2,
  });

  let material = new THREE.MeshBasicMaterial({ color: 0xffd400 });
  text = new THREE.Mesh(geometry, material);

  text.position.y = -30;
  text.position.x = -40;
  text.rotation.x = -0.9;
  scene.add(text);
}

function render() {
  requestAnimationFrame(render);
  text.position.z -= ADD;
  text.position.y += ADD / 2;
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener("resize", onWindowResize);

init();
