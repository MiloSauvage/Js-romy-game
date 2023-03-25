console.log("starting..")

const canvas = document.getElementById('canvas');
const score = document.getElementById('score');
const endScreen = document.getElementById('endScreen');

gameOver = 10;
loopPlay = false;


function start(){
    count = 0
    getFaster = 6000;

    // remettre à 0
    canvas.innerHTML = '';
    score.innerHTML = count;

    // make sure to not play loop several times
    // mettre sous if
    loopPlay = true
    if (loopPlay === true){
        game();
    }

    function game(){
        let randomTime = Math.random() * getFaster + 1000;

        if (getFaster > 2500){
            getFaster = getFaster * 0.95;
        }

        setTimeout(() =>{
            if (canvas.childElementCount >= gameOver){
                youLose();
            }
            Pop();
            game();
        }, randomTime);

        console.log(getFaster);
    }


    const youLose = () => {
        endScreen.innerHTML = `<div class="gameOver">Perdu trop de romy <br/>score : ${count} </div>`;
        endScreen.style.visibility = 'visible';
        endScreen.style.opacity = '1';
        loopPlay = false;
        canvas.innerHTML = '';
      };

}

function Pop(){
    let vanGogh = new Image();
    vanGogh.src = "./media/basic-pics/romy.jpg";
    // ajoute la class .vanGogh du css
    vanGogh.classList.add('vanGogh');

    // conne les coordpnner du spawn de l'immage
    vanGogh.style.top = Math.random() * 500 + 'px';
    vanGogh.style.left = Math.random() * 500 + 'px';

    // calcul de la taille de l'image
    let x, y;
    x = (Math.random() * 100) + 30;
    y = x;

    // insersion des tailles dans la css
    
    vanGogh.style.setProperty('--x', `${ x }px`);
    vanGogh.style.setProperty('--y', `${ y }px`);

    let plusMinus = Math.random() < 0.5 ? -1 : 1;
    let trX = Math.random() * 500 * plusMinus;
    let trY = Math.random() * 500 * plusMinus;
    vanGogh.style.setProperty('--trX', `${ trX }%`);
    vanGogh.style.setProperty('--trY', `${ trY }%`);

    // insertion de l'image dans le canvas
    canvas.appendChild(vanGogh);

    // bit de parité
    // console.log("pop OK")
}

document.addEventListener('click', function(e){
    let targetElement = e.target || e.srcElement;

    if (targetElement.classList.contains('vanGogh')){
        targetElement.remove();
        count++;
        score.innerHTML = count;
    }

    // console.log(targetElement);
})

endScreen.addEventListener('click', () => {
    loopPlay = false;
    canvas.innerHTML = '';
    setTimeout(() => {
    start();
    endScreen.style.opacity = '0';
    endScreen.style.visibility = 'hidden';
    }, 2500);
    
});