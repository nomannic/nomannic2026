// chapter4 주석7 왼쪽, 오른쪽 이동 제한
// 강도진, 김관우, 장현우, 김무영 ♥

// fruits.js에 있는 FRUITS 변수를 가져온다.
import { FRUITS } from "/suika/fruits.js"

// 모듈 불러오기
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    World = Matter.World,
    // 바디 추가
    Body = Matter.Body,
    // 이벤트 추가
    Events = Matter.Events;

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
// 키 조작을 제어하는 변수 생성
let disableAction = false;

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
        restitution: 0.2,   // 튕기는 강도
    })

    // 현재 과일 값을 저장
    currentBody = body;
    currentFruit = fruit;

    // 월드에 추가
    World.add(world, body);
}

// 키보드 입력받기
window.onkeydown = ( event ) => {
    // 제어 조작 변수가 true 경우 바로 리턴
    if (disableAction)
        return;

    switch(event.code) {
        case "KeyA":
            Body.setPosition(currentBody, {
                x: currentBody.position.x - 10,
                y: currentBody.position.y
            });
            break;
        case "KeyD":
            Body.setPosition(currentBody, {
                x: currentBody.position.x + 10,
                y: currentBody.position.y
            });
            break;
        // 과일 떨어트리기
        case "KeyS":
            currentBody.isSleeping = false;
            disableAction = true;

            setTimeout(() => {
                // 새로운 과일 추가
                addFruit();
                disableAction = false;
            }, 1000);
            break;
    }
}

// 이벤트 사용
Events.on(engine, "collisionStart", (event) => {
    // 콜리전 이벤트 발생시 생기는 모든 오브젝트를 비교
    event.pairs.forEach((collision) => {
        // 기존 과일의 index를 저장
        const index = collision.bodyA.index;
        
        // 같은 과일일 경우
        if (collision.bodyA.index == collision.bodyB.index) {
            World.remove(world, [collision.bodyA, collision.bodyB])

            // 저장한 index값에 +1을 더해 새로 제작
            const newFruit = FRUITS[index + 1];
            const newBody = Bodies.circle(
            collision.collision.supports[0].x,
            collision.collision.supports[0].y,
            newFruit.radius,
            {
                // 과일이 합쳐졌으므로 index값 1 증가
                index : index + 1,
                // 렌더링 새로 해주기
                render : { sprite: { texture: `${newFruit.name}.png`}}
            }
        )

        World.add(world, newBody);
        }      
    })

        

});

addFruit();