// 페이지 이동 함수
function goToPage(page) {
  window.location.href = page;
}

// 햄버거 메뉴 토글
let hamBtn = document.querySelector(".hamBtn");
let menuItems = document.querySelector(".hamBtn_menu");

hamBtn.addEventListener('click', clickFn);

function clickFn() {
  menuItems.classList.toggle('active');
}

// 커스텀 커서 추적
const cursor = document.getElementById('customCursor');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = `${e.pageX}px`;
  cursor.style.top = `${e.pageY}px`;
});

// 비디오 종료 이벤트 처리 및 fade-out 효과 추가
const video = document.getElementById('videoForWeb');
const video_m = document.getElementById('videoForWeb_m');
const divmov = document.getElementById('mov');
const divmov_m = document.getElementById('mov_m');
const staticScreen = document.getElementById('main');
const returnMovieButton = document.getElementById('returnMovieButton');
const returnMovieButton_m = document.getElementById('returnMovieButton_m');
const text = document.getElementById('text');
const mobile = "mobile"
const userAgent = navigator.userAgent || navigator.vendor || window.opera;
const isMobileDevice = /android|iphone|ipad|ipod|windows phone/i.test(userAgent);

// 처음 staticScreen 숨기기
//movieNotDisplay(mobile)
//movieNotDisplay()

// Fade-out 효과 함수
function fadeOut(element) {
  let opacity = 1; // 초기 opacity 값
  const fade = setInterval(() => {
    opacity -= 0.05; // opacity를 점진적으로 감소
    element.style.opacity = opacity;

    if (opacity <= 0) {
      clearInterval(fade);
      element.style.display = 'none'; // 완전히 투명해지면 display:none 처리
      movieNotDisplay()  // 콜백 함수 실행
    }
  }, 50); // 50ms 간격으로 opacity 조정
}

// PC 버전 비디오 종료 시 동작
video.addEventListener('ended', () => {
  fadeOut(divmov);
});

video_m.addEventListener('ended', () => {
  fadeOut(divmov_m);
});

//로고 눌러도 다시 영상으로 돌아가지 않도록
let url = new URL(window.location.href);
let params = url.searchParams;
const hasVisited = params.get('hasVisited')
if (hasVisited) {
  movieNotDisplay()
} else {
  movieDisplay()
}

returnMovieButton.addEventListener("click", function() {
  movieDisplay();
  divmov.style.opacity = 1;
  divmov_m.style.opacity = 1;
});
returnMovieButton_m.addEventListener("click", function() {
  movieDisplay();
  divmov.style.opacity = 1;
  divmov_m.style.opacity = 1;
});

returnMovieButton.addEventListener("mouseover", function() {
  returnMovieButton.src = "img/movie_hover.png"
});
returnMovieButton.addEventListener('mouseout', () => {
  returnMovieButton.src = "img/movie.png"
});

function moviePlay() {

  if (isMobileDevice) {
    video_m.pause();
    video_m.currentTime = 0; // 영상 시작 위치를 0초로 설정
    video_m.play(); // 비디오 재생
  } else {
    video.pause();
    video.currentTime = 0; // 영상 시작 위치를 0초로 설정
    video.play(); // 비디오 재생
  }

}


function movieNotDisplay() {
  if (isMobileDevice) {
    divmov_m.style.display = 'none';
    screenDisplay()
  } else {
    divmov.style.display = 'none';
    screenDisplay()
  }
}

function movieDisplay() {
  if (isMobileDevice) {
    divmov_m.style.display = 'block';
  } else {
    divmov.style.display = 'block';
  }
  screenNotDisplay()
  moviePlay();
}


function screenDisplay() {
  staticScreen.style.display = 'flex';
  text.style.display = 'block';
  if (!isMobileDevice) {
    returnMovieButton.style.display = 'block';
  }
}

function screenNotDisplay() {
  staticScreen.style.display = 'none';
  text.style.display = 'none';
  if (!isMobileDevice) {
returnMovieButton.style.display = 'none';
  }
}
