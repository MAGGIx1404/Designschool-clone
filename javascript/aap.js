// hamburger animation start

const html = document.documentElement;
const toggle = document.getElementById("toggle");
const circle = document.getElementById("bg-circle");
const circleWidth = circle.clientWidth;

// circle size set

const getVpdr = () => {
  const vph = Math.pow(html.offsetHeight, 2.2); // Height
  const vpw = Math.pow(html.offsetWidth, 2.2); // Width
  const vpd = Math.sqrt(vph + vpw); // Diagonal
  return (vpd * 2) / circleWidth; // Circle radius
};

// open navbar
const openNavbar = () => {
  const openTimeline = new TimelineMax();
  openTimeline.to(".navbar", 0, { display: "flex" });
  openTimeline.to("#bg-circle", 1.5, {
    scale: getVpdr(),
    ease: Expo.easeInOut,
  });
  openTimeline.staggerFromTo(
    ".navbar ul li",
    0.5,
    { y: 25, opacity: 0 },
    { y: 0, opacity: 1 },
    0.1,
    1
  );
};

// close navbar
const closeNavbar = () => {
  const closeTimeline = new TimelineMax();
  closeTimeline.staggerFromTo(
    ".navbar ul li",
    0.5,
    { y: 0, opacity: 1, delay: 0.5 },
    { y: 25, opacity: 0 },
    -0.1
  );
  closeTimeline.to("#bg-circle", 1, {
    scale: 0,
    ease: Expo.easeInOut,
    delay: -0.5,
  });
  closeTimeline.to(".navbar", 0, { display: "none" });
};

let isOpen = false;

toggle.onclick = function () {
  if (isOpen) {
    this.classList.remove("active");
    closeNavbar();
  } else {
    this.classList.add("active");
    openNavbar();
  }
  isOpen = !isOpen;
};

// responsive size

window.onresize = () => {
  gsap.to("#bg-circle", 1, { scale: getVpdr(), ease: Expo.easeInOut });
};

// hamburger animation end

// cursor setting

function funMouse() {
  // get canvas
  const canvas = document.querySelector(".js--canvas");
  const canvasContext = canvas.getContext("2d");

  // set canvas size
  let canvasWidth = (canvas.width = window.innerWidth);
  let canvasHeight = (canvas.height = window.innerHeight);

  // get mouse position
  let mouseX = canvasWidth / 2;
  let mouseY = canvasHeight / 2;

  // create circles
  let circle = {
    radius: 12,
    lastX: mouseX,
    lastY: mouseY,
  };

  let miniCircle = {
    radius: 3,
    lastX: mouseX,
    lastY: mouseY,
  };

  // get all data-hover elements
  // obvi this is better one a web page with more than one anchor tag
  const elements = [...document.querySelectorAll("a")];

  // resize canvas function
  var resizeCanvas = function resizeCanvas() {
    canvasWidth = canvas.width = window.innerWidth;
    canvasHeight = canvas.height = window.innerHeight;
  };

  // create var holding mouseRender function
  var mouseRender = function mouseRender() {
    // clear canvas so no colours or styles overlap
    canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);

    // get circles x-coordinate and y-coordinate based on mouse coordinates
    // the small circle has a slight delay due to the last parms passed
    circle.lastX = lerp(circle.lastX, mouseX, 0.5);
    circle.lastY = lerp(circle.lastY, mouseY, 0.5);

    miniCircle.lastX = lerp(miniCircle.lastX, mouseX, 0.1);
    miniCircle.lastY = lerp(miniCircle.lastY, mouseY, 0.1);

    // create first circle
    canvasContext.beginPath();
    canvasContext.arc(
      circle.lastX,
      circle.lastY,
      circle.radius,
      0,
      Math.PI * 2,
      false
    );
    canvasContext.lineWidth = 2;
    canvasContext.strokeStyle = " #e3306d";
    canvasContext.stroke();
    canvasContext.closePath();

    // create small/second circle
    canvasContext.beginPath();
    canvasContext.arc(
      miniCircle.lastX,
      miniCircle.lastY,
      miniCircle.radius,
      0,
      Math.PI * 2,
      false
    );
    canvasContext.fillStyle = "#f157ef";
    canvasContext.fill();
    canvasContext.closePath();

    // render/draw mouse by calling requestAnimationFrame() and passing itself through
    requestAnimationFrame(mouseRender);
  };

  // mouseInit function
  var mouseInit = function mouseInit() {
    // render/draw mouse by calling requestAnimationFrame() and passing mouseRender
    requestAnimationFrame(mouseRender);

    // on mouse move update coordinates
    window.addEventListener("mousemove", function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // update canvas size on window resize
    window.addEventListener("resize", resizeCanvas, false);

    // style mouse on hover function
    function on() {
      canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);
      canvasContext.beginPath();
      canvasContext.arc(
        circle.lastX,
        circle.lastY,
        circle.radius,
        0,
        Math.PI * 2,
        false
      );
      canvasContext.lineWidth = 3;
      canvasContext.strokeStyle = "#e3306d";
      canvasContext.stroke();
      canvasContext.closePath();

      requestAnimationFrame(on);
    }

    function off() {
      canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);
      canvasContext.beginPath();
      canvasContext.arc(
        circle.lastX,
        circle.lastY,
        circle.radius,
        0,
        Math.PI * 2,
        false
      );
      canvasContext.lineWidth = 2;
      canvasContext.strokeStyle = "#e3306d";
      canvasContext.stroke();
      canvasContext.closePath();

      canvasContext.beginPath();
      canvasContext.arc(
        miniCircle.lastX,
        miniCircle.lastY,
        miniCircle.radius,
        0,
        Math.PI * 2,
        false
      );
      canvasContext.fillStyle = "#f157ef";
      canvasContext.fill();
      canvasContext.closePath();

      requestAnimationFrame(off);
    }

    let tween = TweenMax.to(circle, 0.25, {
      radius: circle.radius * 2.5,
      ease: Power1.easeInOut,
      paused: true,
    });

    elements.forEach((el) => {
      el.addEventListener(
        "mouseenter",
        () => {
          on();
        },
        false
      );
      el.addEventListener(
        "mouseleave",
        () => {
          off();
        },
        false
      );
      el.addEventListener(
        "mouseenter",
        () => {
          tween.play();
        },
        false
      );
      el.addEventListener(
        "mouseleave",
        () => {
          tween.reverse();
        },
        false
      );
    });
  };

  var lerp = function lerp(a, b, n) {
    return (1 - n) * a + n * b;
  };

  //init the mouse function
  mouseInit();
}

funMouse();

//scroll settings (smooth scroll)

var body = document.body;

var scroller = {
  target: document.querySelector("#scroll-container"),
  ease: 0.08,
  endY: 0,
  y: 0,
  resizeRequest: 1,
  scrollRequest: 0,
};

var requestId = null;

TweenLite.set(scroller.target, {
  rotation: 0.01,
  force3D: true,
});

window.addEventListener("load", onLoad);

function onLoad() {
  updateScroller();
  window.focus();
  window.addEventListener("resize", onResize);
  document.addEventListener("scroll", onScroll);
}

function updateScroller() {
  var resized = scroller.resizeRequest > 0;

  if (resized) {
    var height = scroller.target.clientHeight;
    // body.style.height = height + "px";
    scroller.resizeRequest = 0;
  }

  var scrollY = window.pageYOffset || html.scrollTop || body.scrollTop || 0;

  scroller.endY = scrollY;
  scroller.y += (scrollY - scroller.y) * scroller.ease;

  if (Math.abs(scrollY - scroller.y) < 0.05 || resized) {
    scroller.y = scrollY;
    scroller.scrollRequest = 0;
  }

  TweenLite.set(scroller.target, {
    y: -scroller.y,
  });

  requestId =
    scroller.scrollRequest > 0 ? requestAnimationFrame(updateScroller) : null;
}

function onScroll() {
  scroller.scrollRequest++;
  if (!requestId) {
    requestId = requestAnimationFrame(updateScroller);
  }
}

function onResize() {
  scroller.resizeRequest++;
  if (!requestId) {
    requestId = requestAnimationFrame(updateScroller);
  }
}
