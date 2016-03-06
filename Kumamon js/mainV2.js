/**
 * Created by lizekang on 16-1-28.
 */
var dancingTime = 15;
var stoptime = 30;
var existtime = 5;
var totaltime = 0;
var showtime  = 10;
var gointotime = 2;
var bugtime = 0;

var audio_background = document.querySelector('#miku-music');
var audio = document.querySelector('.music');
var audio0 = document.querySelector('#music0');
var audio1 = document.querySelector('#music1');
var audio2 = document.querySelector('#music2');
var audio3 = document.querySelector('#music3');
var audio4 = document.querySelector('#music4');
var audio6 = document.querySelector('#music6');
var audio5 = document.querySelector('#music5');

var text = document.querySelector('.text');
var text0 = document.querySelector('#text0');
var text1 = document.querySelector('#text1');
var text2 = document.querySelector('#text2');
var text3 = document.querySelector('#text3');
var text4 = document.querySelector('#text4');
var text5 = document.querySelector('#text5');
var text6 = document.querySelector('#text6');


var loader = new Array(8);
var modle =new Array(6);
modle[0] = "dongzuo/hip.vmd";
modle[1] = "模型/动作/wer.vmd";
modle[2] = "dongzuo/crazy.vmd";
modle[3] = "dongzuo/dance.vmd";
modle[4] = "dongzuo/wait.vmd";
modle[5] = "dongzuo/hungry.vmd";


var moxing = new Array(11);
moxing[0] = 'kumamon.pmd';
moxing[1] = 'girls/1.pmd';
moxing[2] = 'girls/2.pmd';
moxing[3] = 'girls/3.pmd';
moxing[4] = 'girls/4.pmd';
moxing[5] = 'girls/5.pmd';
moxing[6] = 'girls/6.pmd';
moxing[7] = 'girls/7.pmd';
moxing[8] = 'girls/8.pmd';
moxing[9] = 'girls/9.pmd';
moxing[10] = 'girls/10.pmd';

var mystraw1= 0,mystraw2 = 0;

var play = true;
var mute = false;
var music = false;
var dance = false;
var container1,container2;
var currentmoudle = 0;
var willmoudle = 1;
var current_container = 2;
var temp;
var changecount = 0;
var changecount0 = 0;
var changecount1 = 0;
var changecount2 = 0;
var changecount3 = 0;
var changecount4 = 0;
var changecount5 = 0;
var cooo = 0;
var booo = 0;
var today,intHours,intMinutes,intSeconds;
var girlmoudle = 0;
var previousbug = 0;

var mesh, camera, scene, renderer;

var directionalLight;

var ikSolver;

var windowWidth  = window.innerWidth;
var windowHeight = window.innerHeight;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var clock = new THREE.Clock();

init(1);
animate();
function initchangecount(num){
    switch (num){
        case 0:
            changecount = 0;
            changecount1 = 0;
            changecount2 = 0;
            changecount3 = 0;
            changecount4 = 0;
            changecount5 = 0;
            break;
        case 1:
            changecount = 0;
            changecount0 = 0;
            changecount2 = 0;
            changecount3 = 0;
            changecount4 = 0;
            changecount5 = 0;
            break;
        case 2:
            changecount = 0;
            changecount0 = 0;
            changecount1 = 0;
            changecount3 = 0;
            changecount4 = 0;
            changecount5 = 0;
            break;
        case 3:
            changecount = 0;
            changecount0 = 0;
            changecount1 = 0;
            changecount2 = 0;
            changecount4 = 0;
            changecount5 = 0;
            break;
        case 4:
            changecount = 0;
            changecount0 = 0;
            changecount1 = 0;
            changecount2 = 0;
            changecount3 = 0;
            changecount5 = 0;
            break;
        case 5:
            changecount = 0;
            changecount0 = 0;
            changecount1 = 0;
            changecount2 = 0;
            changecount3 = 0;
            changecount4 = 0;
            break;
        case 6:
            changecount5 = 0;
            changecount0 = 0;
            changecount1 = 0;
            changecount2 = 0;
            changecount3 = 0;
            changecount4 = 0;
    }
}
function swap (){
    temp = willmoudle;
    willmoudle = currentmoudle;
    currentmoudle = temp;
}

function myremove (flag){
    if (flag == 1)
        container1.remove();
    if (flag == 2)
        container2.remove();
}
function load (moudlekind,actionkind){

    var onProgress = function ( xhr ) {
        if ( xhr.lengthComputable ) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log( Math.round(percentComplete, 2) + '% downloaded' );
        }
    };

    var onError = function ( xhr ) {
    };
    loader[0] = new THREE.MMDLoader();
    loader[0].load( moxing[girlmoudle], modle[actionkind], function ( object ) {

        audio_background.play();
        audio_background.loop = true;

        mesh = object;

        mesh.position.y = -10;
        scene.add( mesh );

        var animation = new THREE.Animation( mesh, mesh.geometry.animation );
        animation.play();

        var morphAnimation = new THREE.MorphAnimation2( mesh, mesh.geometry.morphAnimation );
        morphAnimation.pause();

        ikSolver = new THREE.CCDIKSolver( mesh );

    }, onProgress, onError );
}

function init(flag) {
     container2 = document.createElement( 'div' );
    document.body.appendChild( container2 );

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
    camera.position.z = 300;
    // scene

    scene = new THREE.Scene();

    camera.lookAt(scene.position);


    var ambient = new THREE.AmbientLight( 0x444444 );
    scene.add( ambient );

    directionalLight = new THREE.DirectionalLight( 0xFFEEDD );
    directionalLight.position.set( -1, 1, 1 ).normalize();
    scene.add( directionalLight );
    load(0,flag);

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( windowWidth, windowHeight );
    container2.appendChild( renderer.domElement );
    window.addEventListener( 'resize', onWindowResize, false );
}

function changeaction (flag,actionkind) {
    cooo = 0;
    if (current_container == 1 &&cooo == 0 ) {
        console.log("current1");
         container2 = document.createElement('div');
        document.body.appendChild(container2);

        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
        camera.position.z = 35;
        // scene

        scene = new THREE.Scene();

        camera.lookAt(scene.position);


        var ambient = new THREE.AmbientLight(0x444444);
        scene.add(ambient);

        directionalLight = new THREE.DirectionalLight(0xFFEEDD);
        directionalLight.position.set(-1, 1, 1).normalize();
        scene.add(directionalLight);
        if (flag ==1) {
            load(willmoudle, actionkind);
            cooo = 1;
            swap();
        }
        else
            load(currentmoudle,actionkind);
        renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(windowWidth, windowHeight);
        container2.appendChild(renderer.domElement);
        window.addEventListener('resize', onWindowResize, false);
        current_container = 2;


    }
    console.log(cooo+"cooo");
    if (current_container == 2&& cooo ==0){
        console.log("current2");
         container1 = document.createElement('div');
        document.body.appendChild(container1);

        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
        camera.position.z = 35;
        // scene

        scene = new THREE.Scene();

        camera.lookAt(scene.position);


        var ambient = new THREE.AmbientLight(0x444444);
        scene.add(ambient);

        directionalLight = new THREE.DirectionalLight(0xFFEEDD);
        directionalLight.position.set(-1, 1, 1).normalize();
        scene.add(directionalLight);
        if (flag ==1) {
            load(willmoudle, actionkind);
            cooo = 1;
            swap();
        }
        else
        load(currentmoudle,actionkind);
        console.log("ilovedt");
        renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(windowWidth, windowHeight);
        container1.appendChild(renderer.domElement);
        window.addEventListener('resize', onWindowResize, false);
        current_container = 1;

    }
}

function changing (flag,delta,actionkind){
    booo = 0;
    if (current_container == 1 && booo ==0) {
        myremove(1);
        changeaction(flag, actionkind);
        //myremove(1);
        booo = 1;

    }
    if (current_container == 2&&booo ==0){
        myremove(2);
        changeaction(flag, actionkind);
        //myremove(2);
        booo =1;

    }
}



function onWindowResize() {
    windowWidth  = window.innerWidth;
    windowHeight = window.innerHeight;
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = windowWidth / windowHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( windowWidth, windowHeight );
}


function animate() {
    requestAnimationFrame( animate );
    var delta = clock.getDelta();
    render(delta);
}

function render(delta) {

    if( mesh && play ) {
        /*
         * 将getDelta的调用放在if判定的外部很重要哦
         * */
        //var delta = clock.getDelta();
        today = new Date();
        intHours = today.getHours();
        intMinutes = today.getMinutes();
        intSeconds = today.getSeconds();
        if (intHours == 13 && intMinutes == 31 && intSeconds <= 10) {
            initchangecount(6);
            THREE.AnimationHandler.update(delta);
            text0.style.display = 'none';
            text1.style.display = 'none';
            text2.style.display = 'none';
            text3.style.display = 'none';
            text4.style.display = 'none';
            text6.style.display = 'block';
            audio_background.pause();
            audio6.play();
            audio6.loop = false;
            if (mute) {
                audio_background.volume = 0;
            } else if (music) {
                audio_background.volume = 1;
                audio_background.playbackRate = 1;
            } else {
                audio_background.volume = 0.5;
                audio_background.playbackRate = 0.5;
            }
        }
        else{

            audio_background.play ();
            if (totaltime <= 60) {
                if (existtime > 0 ) {
                    initchangecount(0);
                    dancingTime -= delta;
                    existtime -= delta;
                    totaltime += delta;
                    if (gointotime>0){
                        gointotime -=delta;
                        camera.position.z -=delta*125;
                    }
                    else if (gointotime>-3){
                        gointotime -= delta;
                        camera.position.z -= delta*4;
                    }
                    THREE.AnimationHandler.update(delta);
                    text0.style.display = 'block';
                    text1.style.display = 'none';
                    text2.style.display = 'none';
                    text3.style.display = 'none';
                    text4.style.display = 'none';
                    text6.style.display = 'none';
                    directionalLight.color.setHex(0xFFEEDD);
                    if (changecount0 == 0&& currentmoudle == 0) {
                        audio_background.pause();
                        audio0.play();
                        audio0.loop = false;
                        changecount0 = 1;
                    }
                    if (mute) {
                        audio_background.volume = 0;
                    } else {
                        audio_background.volume = 1;
                        audio_background.playbackRate = 1;
                    }
                }

                else if (bugtime > 0) {
                    initchangecount(3);
                    bugtime -= delta;
                    THREE.AnimationHandler.update(delta);

                    text0.style.display = 'none';
                    text1.style.display = 'none';
                    text2.style.display = 'none';
                    text3.style.display = 'block';
                    text4.style.display = 'none';
                    text6.style.display = 'none';
                    directionalLight.color.setHex(0xFFEEDD);
                    if (changecount3 == 0&&currentmoudle == 0){
                        //changing(0,1,0);
                        //changecount3 = 1;
                    audio_background.pause();
                    audio3.play();
                    audio3.loop = false;
                }
                    if (mute) {
                        audio_background.volume = 0;
                    } else {
                        audio_background.volume = 1;
                        audio_background.playbackRate = 1;
                    }
                }
                else if (dancingTime > 0 || dance) {
                    initchangecount(6);
                    dancingTime -= delta;
                    stoptime -= delta;
                    totaltime += delta;
                    THREE.AnimationHandler.update(delta);
                    text0.style.display = 'none';
                    text1.style.display = 'none';
                    text2.style.display = 'none';
                    text3.style.display = 'none';
                    text4.style.display = 'none';
                    text6.style.display = 'none';
                    directionalLight.color.setHex(0xFFEEDD);
                    //if (changecount == 0) {
                    //    console.log("fuck");
                    //    changing(0,1,4);
                    //    changecount = 1;
                    //}
                    if (mute) {
                        audio_background.volume = 0;
                    } else {
                        audio_background.volume = 1;
                        audio_background.playbackRate = 1;
                    }
                } else if (stoptime > 0) {
                    initchangecount(1);
                    stoptime -= delta;
                    text0.style.display = 'none';
                    text1.style.display = 'block';
                    text2.style.display = 'none';
                    text3.style.display = 'none';
                    text4.style.display = 'none';
                    text6.style.display = 'none';
                    directionalLight.color.setHex(0xFF9999);
                    THREE.AnimationHandler.update(delta);
                    if (changecount1 == 0&&currentmoudle == 0){
                    //    changing(0,1,2);
                    //    changecount1 = 1;
                         audio_background.pause();
                        audio1.play();
                         audio1.loop = false;
                        changecount1 = 1;
                    }
                    if (mute) {
                        audio_background.volume = 0;
                    } else if (music) {
                        audio_background.volume = 1;
                        audio_background.playbackRate = 1;
                    } else {
                        audio_background.volume = 0.5;
                        audio_background.playbackRate = 0.5;
                    }

                }
                else {
                    initchangecount(2);
                    THREE.AnimationHandler.update(0.0005);
                    text0.style.display = 'none';
                    text1.style.display = 'none';
                    text2.style.display = 'block';
                    text3.style.display = 'none';
                    text4.style.display = 'none';
                    text6.style.display = 'none';
                    directionalLight.color.setHex(0xFF9999);
                    if (changecount2 == 0&&currentmoudle == 0){
                        audio_background.pause();
                        audio2.play();
                        audio2.loop = false;
                        changecount2 = 1;
                    }

                    if (mute) {
                        audio_background.volume = 0;
                    } else if (music) {
                        audio_background.volume = 1;
                        audio_background.playbackRate = 1;
                    } else {
                        audio_background.volume = 0.5;
                        audio_background.playbackRate = 0.5;
                    }
                }
            }
            else if (showtime > 0) {
                initchangecount(4);
                showtime -= delta;
                THREE.AnimationHandler.update(0.010);
                text0.style.display = 'none';
                text1.style.display = 'none';
                text2.style.display = 'none';
                text3.style.display = 'none';
                text4.style.display = 'block';
                text6.style.display = 'none';
                directionalLight.color.setHex(0xFF9999);
                if (changecount4 == 0&&currentmoudle == 0){
                    //audio_background.pause();
                    audio4.play();
                    audio.loop = false;
                    changecount4 = 1;
                }


                if (mute) {
                    audio_background.volume = 0;
                } else if (music) {
                    audio_background.volume = 1;
                    audio_background.playbackRate = 1;
                } else {
                    audio_background.volume = 0.5;
                    audio_background.playbackRate = 0.5;
                }
            }
            else {
                totaltime = 0;
                showtime = 10;
            }
        }
            if (ikSolver) {
                ikSolver.update();
            }
        }
    camera.updateProjectionMatrix();
    renderer.render( scene, camera );
}


/*
 * 交互控制模块
 * */

var Control = function(){
    this.render = renderer;
    this.camera = camera;
    this.scene = scene;
};
Control.prototype = {
    addFrame: function(s){
        var seconds = s ? s : 3;
        dancingTime = seconds;
        stoptime = 30;
        mystraw1 = 0;
        mystraw2 = 0;
    },
    bugappear:function(bugs){
        if (bugs - previousbug >1){
            bugtime = 3;
        }
        previousbug = bugs;
    },
    change:function (){
        //if (flag == true){
        //    console.log("23333333");
        //    changing(0,1,3);
        //    console.log("555555555");
        //}
        //else {
        //    changing(1,1,4);
        //}
        //container1.remove();
        //changeaction(0,3);
        girlmoudle=Math.ceil(Math.random()*10); //萌妹随机数
        if (currentmoudle == 0) {
            changing(1,1,3);
        }
        else {
            changing(1, 1, 3);
        }
    },
    play: function(){
        play = true;
        audio_background.play();
    },
    //bug :function (flag) {
    //    switch(flag){
    //
    //    }
    //},
    pause: function(){
        play = false;
        audio_background.pause();
    },
    mute: function(flag) {
        mute = flag;
    },
    music: function(flag){
        music = flag;
        audio_background.volume = 1;
        audio_background.playbackRate = 1;
    },
    dance: function(flag){
        dance = flag;

    }

};
var control = new Control();
