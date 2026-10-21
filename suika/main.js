// fruits.js에 있는 FRUITS 변수를 가져온다.
import { FRUITS } from "/suika/fruits.js"

// 모듈 불러오기
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    World = Matter.World;

// 엔진 선언
const engine = Engine.create();

// 렌더(배경) 선언
const render = Render.create({
    engine,
    // 어디에 그릴것인지 -> body에 생성
    element: document.body,
    options: {
        wireframes: false,      // 기본값은 true인데 true일 경우 색 적용이 안됨.
        background: '#F7F4C8',    // 배경 색 지정
        width: 620,
        height: 850,
    },
});

// 벽 배치를 위한 world 선언
const world = engine.world;

// 벽 생성
const leftwall = Bodies.rectangle(15, 395, 30, 790, {
                                // x중심점, y중심점, x길이, y길이
    isStatic: true, // 고정해주는 기능
    render: { fillStyle: '#E6B143'}
})

const rightwall = Bodies.rectangle(605, 395, 30, 790, {
                                 // x중심점, y중심점, x길이, y길이
    isStatic: true, // 고정해주는 기능
    render: { fillStyle: '#E6B143'}
})

const ground = Bodies.rectangle(310, 820, 620, 60, {
                              // x중심점, y중심점, x길이, y길이
    isStatic: true, // 고정해주는 기능
    render: { fillStyle: '#E6B143'}
})

const topLine = Bodies.rectangle(310, 150, 620, 2, {
                              // x중심점, y중심점, x길이, y길이
    isStatic: true, // 고정해주는 기능
    isSensor: true, // 충돌판정을 끄고, 충돌 감지만 함
    render: { fillStyle: '#E6B143'}
})


// 벽 배치
World.add(world, [leftwall, rightwall, ground, topLine]);

// 테스트 실행
Render.run(render);
Runner.run(engine);

// 현재 과일값을 저장할 수 있는 변수
let currentBody = null;
let currentFruit = null;

// 과일 떨어지는 함수
function addFruit() {
    // 무작위로 index값 호출
    const index = Math.floor(Math.random() * 5);
    const fruit = FRUITS[index];

    const body = Bodies.circle(300, 50, fruit.radius, {
        index: index,   // 인덱스 값 저장
        isSleeping : true,  // 시작시 바로 떨어지는게 아니라 멈춤 상태
        render: {
            sprite: { texture: `${fruit.name}.png`},
        },
        restitution: 0.2,
    })

    // 현재 과일 값을 저장
    currentBody = body;
    currentFruit = fruit;

    // 월드에 추가
    World.add(world, body);
}
addFruit();