const TimeHelper = {

  getPauseDuration(pausedAt) {
    var d = new Date();
    var t = d.getTime();
    var timePaused = (t - pausedAt) / 1000;
    if (timePaused < 60) {
      var time = Math.round(timePaused * 100) / 100;
      timePaused = time + ' seconds';
    } else if (timePaused > 3600) {
      var hours = Math.floor(timePaused / 3600);
      var mins = Math.round(timePaused - hours * 3600);
      var formatMins = Math.floor(mins / 60);
      var secs = Math.round(mins - formatMins * 60);
      timePaused = hours + ":" + formatMins + ":" + secs + ' hours';
    } else {
      var mins = Math.floor(timePaused / 60);
      var secs = Math.round(timePaused - mins * 60);
      timePaused = mins + ':' + secs + ' minutes';
    }
    return timePaused;
  },

  getVideoTime(t) {
    let formattedVidTime;
    if (t < 10) { //less than 10 seconds
      formattedVidTime = "0:0" + t;
    } else if (t < 60) { //less than a minute
      formattedVidTime = "0:" + t;
    } else if (t < 3600) { //less than an hour
      var mins = Math.floor(t / 60);
      var secs = Math.round(t - mins * 60)
      formattedVidTime = mins + ":" + secs
    } else { //over an hour
      var hours = Math.floor(t / 3600);
      var mins = Math.round(t - hours * 3600);
      var formatMins = Math.floor(mins / 60);
      var secs = Math.round(mins - formatMins * 60);
      formattedVidTime = hours + ":" + formatMins + ":" + secs;
    }
    return formattedVidTime;
  }

}

export default TimeHelper
