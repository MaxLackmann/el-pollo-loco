class Soundmanager {
  /**
   * Constructs a new instance of the class. Initializes all the audio elements and sets their loop property to true.
   * Also initializes the sounds array and sets the initial state of the isMuted property to true.
   * @constructor
   */
  constructor() {
    this.backgroundSound = new Audio('audio/background.mp3');
    this.backgroundSound.loop = true;

    this.startGameSound = new Audio('audio/start_character.mp3');
    this.hitBottleSound = new Audio('audio/bottle_hit.mp3');
    this.bossSound = new Audio('audio/boss.mp3');
    this.throwBottleSound = new Audio('audio/throw.mp3');
    this.coinSound = new Audio('audio/picked_coin.mp3');
    this.bottleSound = new Audio('audio/picked_bottle.mp3');
    this.winSound = new Audio('audio/win.mp3');
    this.winSound2 = new Audio('audio/win2.mp3');
    this.loseSound = new Audio('audio/lose.mp3');
    this.enemiesDeadSound = new Audio('audio/enemies_dead.mp3');
    this.chickenWalkingSound = new Audio('audio/chicken_walking.mp3');
    this.bossAngrySound = new Audio('audio/boss_angry.mp3');
    this.bossHitSound = new Audio('audio/boss_hit.mp3');
    this.bossAttackSound = new Audio('audio/boss_attack.mp3');
    this.characterHitSound = new Audio('audio/character_hit.mp3');
    this.walkingSound = new Audio('audio/character_walking.mp3');
    this.sleepingSound = new Audio('audio/character_sleeping.mp3');
    this.jumpingSound = new Audio('audio/character_jumping.mp3');

    this.sounds = [
      this.backgroundSound,
      this.startGameSound,
      this.hitBottleSound,
      this.bossSound,
      this.throwBottleSound,
      this.coinSound,
      this.bottleSound,
      this.winSound,
      this.winSound2,
      this.loseSound,
      this.enemiesDeadSound,
      this.chickenWalkingSound,
      this.bossAngrySound,
      this.bossHitSound,
      this.bossAttackSound,
      this.characterHitSound,
      this.walkingSound,
      this.sleepingSound,
      this.jumpingSound,
    ];

    this.isMuted = true; // Changed initial state to false
    this.soundVolumes = {};
    this.initSoundVolumes();
  }

  /**
   * Initializes the sound volumes for all the audio elements in the sounds array.
   * This function iterates over each audio element in the sounds array and stores its source and volume in the soundVolumes object.
   * The soundVolumes object is an instance variable of the class, and it is used to keep track of the initial volumes of the sounds.
   * @return {void} This function does not return anything.
   */
  initSoundVolumes() {
    this.sounds.forEach((sound) => {
      this.soundVolumes[sound.src] = sound.volume;
    });
  }

  /**
   * Toggles the mute state of all sounds and updates the mute icon accordingly.
   * @return {void} This function does not return anything.
   */
  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.muteAllSounds();
    } else {
      this.unmuteAllSounds();
    }

    this.updateMuteIcon();
  }

  /**
   * Mutes all sounds by setting their volume to 0.
   * @return {void} This function does not return a value.
   */
  muteAllSounds() {
    this.sounds.forEach((sound) => {
      if (this.soundVolumes[sound.src] !== undefined) {
        sound.volume = 0;
      }
    });
  }

  /**
   * Unmutes all sounds by setting their volume to the value stored in the soundVolumes object.
   * @return {void} This function does not return a value.
   */
  unmuteAllSounds() {
    this.sounds.forEach((sound) => {
      if (this.soundVolumes[sound.src] !== undefined) {
        sound.volume = this.soundVolumes[sound.src];
      }
    });
  }

  /**
   * Updates the mute icon on the page based on the current mute state.
   * @return {void} This function does not return a value.
   */
  updateMuteIcon() {
    const muteIcon = document.getElementById('muteIcon');
    if (muteIcon) {
      if (this.isMuted) {
        muteIcon.src = './img/instruction/sound_off.svg';
      } else {
        muteIcon.src = './img/instruction/sound_on.svg';
      }
    }
  }
}
