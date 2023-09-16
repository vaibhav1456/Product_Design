const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnim(){
    var tl = gsap.timeline();

    tl.from("#nav", {
        y: '-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut,
    })
    .to(".boundingelem", {
        y:0,
        ease: Expo.easeInOut,
        duration: 2,
        delay:-1,
        staggee: .2
    })
    .from("#herofooter", {
        y: -10,
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut,
        delay: -1
    })
    
    
}  
 
var timeout;

function circleMouseChange(){
    //define default scale value
    var xscale=1;
    var yscale=1;

    var xprev =0;
    var yprev =0;

    window.addEventListener("mousemove", function(dets){
       var xdiff = dets.clientX-xprev;
       var ydiff = dets.clientY-yprev;
       
       clearTimeout(timeout);
       xscale = gsap.utils.clamp(.8, 1.2, xdiff);
       yscale = gsap.utils.clamp(.8, 1.2, ydiff);

       xprev = dets.clientX;
       yprev = dets.clientY;

       circleMouseFollower(xscale, yscale);

       timeout = setTimeout(function(){
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
       }, 100);
    });
}

function circleMouseFollower(xscale, yscale){
    window.addEventListener("mousemove", function(dets){
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    })
} 

circleMouseFollower();
circleMouseChange();
firstPageAnim();

document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate=0;
    var diffrot =0;
    
    elem.addEventListener("mouseleave", function(details){
        var diff = details.clientY - elem.getBoundingClientRect().top;
        diffrot  = details.clientX - rotate;
        rotate = details.clientX;
        gsap.to(elem.querySelector("img"),{
              opacity: 0,
              ease: Power3,
              duration : 0.5,
          });
      });

    elem.addEventListener("mousemove", function(details){
      var diff = details.clientY - elem.getBoundingClientRect().top;
      diffrot  = details.clientX - rotate;
      rotate = details.clientX;
      gsap.to(elem.querySelector("img"),{
            opacity: 1,
            ease: Power3,
            top: diff,
            left: details.clientX,
            rotate: gsap.utils.clamp(-40,40, diffrot * .8),
        });
    }); 
});