var Engine = Matter.Engine,     // 엔진 변수
    Render = Matter.Render,     // 렌더 변수(그리기)
    Runner = Matter.Runner,     // 러너 변수(구동)
    Bodies = Matter.Bodies,     // 바디 변수(물리엔진이 적용할 객체)
    World = Matter.World;       // 월드 변수(물리엔진이 적용되는 세계)

// 엔진 선언
const engine = Engine.create();

// 벽 배치를 위한 엔진 선언
const world = engine.world;

// 왼쪽 벽 생성
const leftWall = Bodies.rectangle(15, 395, 30, 790, {
    isStatic : true,
    render: { fillStyle: '#E6B143' }
})

const rightWall = Bodies.rectangle(605, 395, 30, 790, {
    isStatic : true,
    render: { fillStyle: '#E6B143' }
})

const ground = Bodies.rectangle(310, 820, 620, 60, {
    isStatic : true,
    render: { fillStyle: '#E6B143' }
})

const topLine = Bodies.rectangle(310, 150, 620, 2, {
    isStatic : true,
    render: { fillStyle: '#E6B143' }
})

// 렌더 선언(배경)
const render = Render.create({
    engine,
    element: document.body, // html문서 body에 생성
    options: {              // 렌더링에 적용할 다양한 옵션(s꼭 붙여야함)
        wireframes: false,      // 선으로만 구현할 것인지, 색이나 이미지 적용할 것인지
        background: '#F7F4C8',  // 배경색 설정
        width: 620,             // 너비
        height: 850,            // 높이
    }
})

// 벽 배치
World.add(world, [leftWall, rightWall, ground, topLine])

// 실행
Render.run(render);
Runner.run(engine);