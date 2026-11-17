/* ==========================================================================
   Shared audio fixes - load in <head> BEFORE any page script that creates audio.

   1. iPhone/iPad ignore `audio.volume = x` (it is always 1). On those devices we
      route each sound through Web Audio and apply the volume there, so the
      existing page code - quiet music (0.05), mute (volume 0), the Main Menu
      volume slider, Vishing's music ducking - works without changes.
      Android and laptops can already set volume, so they are left untouched.
   2. Browsers block play() until the player taps the page (iPhone: every page).
      Background music (looping audio) that was blocked is started again on the
      first tap / click / key press. Paused-by-the-game music is not restarted.

   Debug: add ?iosaudio to a URL to force the iPhone volume path on a laptop.
   ========================================================================== */
(function () {
  var proto = HTMLMediaElement.prototype;
  var Ctx = window.AudioContext || window.webkitAudioContext;
  var ctx = null;

  // --- 1. volume that actually works on iPhone/iPad ---
  var probe = document.createElement('audio');
  probe.volume = 0.5;
  var volumeLocked = probe.volume !== 0.5 || /[?&]iosaudio\b/.test(location.search);

  if (volumeLocked && Ctx) {
    // Web Audio obeys the silent switch by default; normal <audio> does not - keep that behaviour
    if (navigator.audioSession) navigator.audioSession.type = 'playback';

    Object.defineProperty(proto, 'volume', {
      configurable: true,
      get: function () { return this._mmVolume === undefined ? 1 : this._mmVolume; },
      set: function (v) {
        v = Math.min(1, Math.max(0, Number(v) || 0));
        this._mmVolume = v;
        if (!this._mmGain) {
          ctx = ctx || new Ctx();
          var source = ctx.createMediaElementSource(this);
          this._mmGain = ctx.createGain();
          source.connect(this._mmGain);
          this._mmGain.connect(ctx.destination);
        }
        this._mmGain.gain.value = v;
      }
    });
  }

  // --- 2. restart blocked background music on the first tap ---
  var blocked = [];
  var origPlay = proto.play;
  var origPause = proto.pause;

  proto.play = function () {
    var el = this;
    var p = origPlay.apply(el, arguments);
    if (p && p.catch) {
      p.catch(function (err) {
        if (err && err.name === 'NotAllowedError' && el.loop && blocked.indexOf(el) === -1) blocked.push(el);
      });
    }
    return p;
  };

  proto.pause = function () {
    var i = blocked.indexOf(this);
    if (i !== -1) blocked.splice(i, 1); // the game paused it on purpose - don't restart it
    return origPause.apply(this, arguments);
  };

  function unlock() {
    if (ctx && ctx.state !== 'running') ctx.resume();
    blocked.splice(0).forEach(function (el) { origPlay.call(el).catch(function () {}); });
  }
  // touchend/click/keydown are the events that count as a "tap" for starting sound on every browser
  ['touchend', 'click', 'keydown'].forEach(function (type) {
    document.addEventListener(type, unlock, true);
  });
})();
