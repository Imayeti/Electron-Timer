

 new Vue({
    el: app,
    data: {
      timerRunning: false,
      timerAmountSeconds: "60",
      timerAmountMinutes: 0,
      originalTimerAmount: 0,
      minutesInterval: "",
      inputValue: "",
    },
    computed: {
      percentClass() {
        return "x-" + this.percent;
      },
      percent() {
        return Math.floor((this.timerAmountMinutes / this.originalTimerAmount ) * 100)  ;
      }
    },
    methods: {

      startTimer() {

        if(this.inputValue){
          this.timerAmountSeconds = 60;
          this.originalTimerAmount = this.inputValue;
          this.timerAmountMinutes = this.inputValue;
          console.log("this.timerAmountMinutes", this.timerAmountMinutes);
        }

        if (!this.timerRunning) {
         this.timerAmountSeconds = 60;
         this.minutesInterval = setInterval( () => {
            this.timerAmountSeconds -= 1;
          },1000);
        }
        this.inputValue = "";

        this.timerRunning = true;
      },
      stopTimer() {
        clearInterval(this.minutesInterval);
        this.timerRunning = false;
      },
      setTimerPresetAmount(mins) {
        this.timerRunning = false;
        clearInterval(this.minutesInterval);
        console.log(mins);
        this.originalTimerAmount = mins;
        this.timerAmountMinutes = mins;
        this.startTimer();
      }
    },
    watch: {
      timerAmountSeconds : function () {
        if( this.timerAmountSeconds === 0 ) {
          this.timerAmountSeconds = 60;
          this.timerAmountMinutes -= 1;
        }
        if(this.timerAmountMinutes === 0 ) {
          clearInterval(this.minutesInterval);
          this.timerAmountSeconds = 0;
          this.timerAmountMinutes = 0;
          this.timerRunning = false;
          setTimeout(
            () => {
              var audio = new Audio('./sounds/alarm.mp3');
              audio.volume = 1;
              audio.play();
            }, 100 );

        }
      }
    }
  })
