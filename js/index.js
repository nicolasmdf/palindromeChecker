$(document).ready(function(){
  //timer is declared outside so that it is not overwritten everytime it runs.
  let timerID;
  
  let displayPomo = {
    blink: () => {
      $("#blink").fadeToggle();
      $("#blink2").fadeToggle();
    },
    toggleIcon: () => {
      $("#blink").toggleClass("glyphicon-cog glyphicon-glass");
      $("#blink2").toggleClass("glyphicon-cog glyphicon-glass");
    }
  };
  
  let pomo = {
    workMinutes: 25,
    restMinutes: 1,
    startingWorkMinutes: undefined,
    startingRestMinutes: undefined,
    seconds: 0,
    status: "working",
    display: () => {
      $("#selectedAmountWork").text(pomo.workMinutes);
      $("#selectedAmountRest").text(pomo.restMinutes);
    },
    startTimer: () => {
      timerID = setTimeout(pomo.update, 1000);
    },
    stopTimer: () => clearTimeout(timerID),
    update: () => {
      if (pomo.seconds === 60) {
        if (pomo.workMinutes !== 0) {
          if (pomo.status === "resting") {
            displayPomo.toggleIcon();
            pomo.status = "working";
          }
          pomo.workMinutes--;
          pomo.seconds = 0;
          pomo.display();
        } else {
          if (pomo.status === "working") {
            displayPomo.toggleIcon();
            pomo.status = "resting";
          }
          pomo.restMinutes--;
          pomo.seconds = 0;
          pomo.display();
        }
      }
      if (pomo.workMinutes === 0 && pomo.restMinutes === 0) {
        pomo.stopTimer();
        pomo.restart();
      }
      pomo.seconds++;
      pomo.startTimer(); 
      displayPomo.blink();
    },
    reset: () => {
      pomo.seconds = 0;
      pomo.workMinutes = 25;
      pomo.restMinutes = 1;
      pomo.startingWorkMinutes = undefined;
      pomo.startingRestMinutes = undefined;
      pomo.display();
    },
    restart: () => {
      pomo.seconds = 0;
      pomo.workMinutes = pomo.startingWorkMinutes;
      pomo.restMinutes = pomo.startingRestMinutes;
      pomo.display();
    },

  };
  
  
  
  let buttons = {
    add: (x) => {
      if (pomo[x] >= 0 && pomo[x] < 180) {
        pomo[x]++;
        pomo.display();
      }
    },
    substract: (x) => {
      if (pomo[x] > 0 && pomo[x] < 180) {
        pomo[x]--;
        pomo.display();
      }
    }
  };
 
 $("#substractWork").click(() => {buttons.substract("workMinutes")});
 $("#substractRest").click(() => {buttons.substract("restMinutes")});
 $("#addWork").click(() => {buttons.add("workMinutes")});
 $("#addRest").click(() => {buttons.add("restMinutes")});
 $("#start").click(() => {
   pomo.update();
   if (pomo.startingWorkMinutes === undefined && pomo.startingRestMinutes === undefined) {
     pomo.startingWorkMinutes = pomo.workMinutes;
     pomo.startingRestMinutes = pomo.restMinutes;
   }
   $("#start").css("visibility", "hidden");
   $("#pause").css("visibility", "visible");
 }); 
 $("#pause").click(() => {
   pomo.stopTimer();
   $("#pause").css("visibility", "hidden");
   $("#start").css("visibility", "visible");
 });
 $("#reset").click(() => {
   pomo.stopTimer();
   pomo.reset();
   $("#pause").css("visibility", "hidden");
   $("#start").css("visibility", "visible");
   $("#blink").removeClass("glyphicon-glass").addClass("glyphicon-cog").css("display", "initial");
   $("#blink2").removeClass("glyphicon-glass").addClass("glyphicon-cog").css("display", "initial");
 });

});