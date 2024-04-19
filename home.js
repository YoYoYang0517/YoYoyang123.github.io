var btn = document.querySelector('.footer');
var submitBtn = document.querySelector('.submit');
var tip = document.querySelector('#tip');
var list = document.querySelector('#list');
var answerInput = document.getElementById('Alist');
var list2 = document.querySelector('#list2');

var card = [
    '星星有多重？:8公克:8g',
    '什麼動物最愛貼在牆上？:海豹:海豹',
    '什麼龍最輕(猜一物)?:保麗龍:保麗龍',
    '白蘿蔔喝醉了，會變成什麼？:紅蘿蔔:紅蘿蔔',
    '牙醫靠什麼吃飯？:嘴巴:牙齒',
    '什麼布切不斷？:瀑布:瀑布',
    '結婚後不生孩子的美女怎麼稱呼？:絕代佳人:絕代佳人',
    '身穿著金色衣服的人(猜成語)?:一鳴驚人:一鳴驚人',
    '什麼職業比大學生厲害？:鎖匠:鎖匠',
    '什麼布不能做衣服？:瀑布:剪刀石頭布',
    '偷什麼東西不犯法？:偷笑:笑',
    '如果動物園失火了，最先逃出來的是哪一種動物？:人:人',
    '哪項比賽是往後跑的？:拔河:拔河',
    '什麼東西比細菌還小？:細菌的兒子:細菌的兒子',
    '你的爸爸的妹妹的堂弟的表哥的爸爸與你叔叔的兒子的嫂子是什麼關係:親戚關係:親戚',
    '用什麼可以解開所有的謎:謎底:謎底',
    '楚楚的生日在三月三十日，請問是哪年的三月三十日:每年的三月三十日:每年',
    '哪兒的海不產魚:辭海:辭海',
    '全世界死亡率最高的地方在哪裡:在床上:床上',
    '離過五十次婚的女人(猜一成語):前功盡棄:前功盡棄',
    '我有鑰匙，但打不開鎖。 我是什麼？:鋼琴:鍵盤',
    '當貝克漢姆主罰點球時，他會擊中哪裡？:球:球',
    '什麼東西有13個心臟，但沒有其他器官？:撲克牌:一副撲克牌',
    '哪三個不為零的數字，無論相加還是相乘，都會給出相同的答案？:一、二、三:1、2、3',
    '半真半假。（打一字）:值:值',
    '乘人不在。（打一字）:乖:乖',
    '拿不出手。（打一字）:合:合',
    '昨日不可留。（打一字）:乍:乍',
    '六十天。（打一字）:朋:朋',
    '東洋兵。（打一字）:暈:暉',
    '我沒有他有，天沒有地有。（打一字）:也:也',
];

var formattedCards = card.map(function(line) {
    var parts = line.split(':');
    return {
        question: parts[0],
        answer1: parts[1],
        answer2: parts[2]
    };
});

var animationFrameId; // 用於儲存動畫帧的ID

function startBalloonAnimation() {
    const canvas = document.getElementById('balloonCanvas');
    const ctx = canvas.getContext('2d');

    // 設定畫布大小
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 創建氣球對象
    class Balloon {
        constructor(color, x, y, radius) {
            this.color = color;
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.velocity = { x: Math.random() - 0.5, y: 1 + Math.random() * 3 };
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.closePath();
        }

        update() {
            this.draw();
            this.x += this.velocity.x;
            this.y += this.velocity.y;

            // 當氣球移動到畫布底部以下時，重置位置到頂部
            if (this.y - this.radius > canvas.height) {
                this.y = -this.radius;
                this.x = Math.random() * canvas.width;
            }
        }
    }

    // 創建多個氣球
    const balloons = [];
    for (let i = 0; i < 50; i++) {
        let radius = 10 + Math.random() * 20; // 半徑10至30之間
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let color = `hsl(${Math.random() * 360}, 50%, 50%)`; // 隨機顏色
        balloons.push(new Balloon(color, x, y, radius));
    }

    // 動畫函數
    function animate() {
        animationFrameId = requestAnimationFrame(animate);
        console.log('Animation Frame ID: ', animationFrameId);
        ctx.clearRect(0, 0, canvas.width, canvas.height); // 清空畫布

        balloons.forEach(balloon => {
            balloon.update();
        });
    }

    animate();
}

function stopBalloonAnimation() {
    console.log('Stopping Animation Frame ID: ', animationFrameId);
    cancelAnimationFrame(animationFrameId); // 停止動畫
}

var isButtonActive = true;

var selectedCard = selectNewCard();

function selectNewCard() {
    var randomIndex = Math.floor(Math.random() * formattedCards.length);
    return formattedCards[randomIndex];
}


btn.onclick = function() {
    if(isButtonActive) {
        btn.style.background = '#f1516c';
        btn.style.borderColor = '#db2745';
        tip.style.display = 'block';
        list.innerHTML = '';
        list2.innerHTML = '';

        stopBalloonAnimation(); 
        document.getElementById('balloonCanvas').style.display = 'none';
        selectedCard = selectNewCard();

        var listItem = document.createElement('div');
        listItem.innerHTML = selectedCard.question;
        list.appendChild(listItem);
        var judge = document.createElement('div');
        list.appendChild(judge);

        setTimeout(function() {
            btn.style.background = '#2ab8ff';
            btn.style.borderColor = '#2193cc'; 
            isButtonActive = true;
        }, 500);        

        isButtonActive = false;
    }
};

submitBtn.onclick = function() {
    console.log("Submit button clicked");
    var userAnswer = answerInput.value.trim();  // Get user input
    var judge = document.createElement('div');
    if (userAnswer === selectedCard.answer1 || userAnswer === selectedCard.answer2) {
        judge.innerHTML = '答對了!';
        document.getElementById('balloonCanvas').style.display = 'block';
        startBalloonAnimation();
    } else {
        judge.innerHTML = '再接再厲!';
        document.getElementById('balloonCanvas').style.display = 'none';
        stopBalloonAnimation();
    }
    list2.appendChild(judge);  // Show the result
    answerInput.value = '';  // Clear the input for next question
};