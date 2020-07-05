// 修改一姬语音台词以及人物简介
requestAnimationFrame(function autoRun() {
  try {
    const arrBackup = cfg.voice.sound.groups_
    if (!arrBackup || arrBackup.length === 0) {
      throw new Error();
    }
    console.log('Hacked语音文本');
    Object.entries(cfg.voice.sound.groups_).forEach(([soundID, soundGroup]) => {
      if (soundID == 1) {
        const changeMap = {
          "获得语音": {
            "words": 'notyet',
          },
          "登录语音普通": {
            "words": 'The end justifies the means. Just go to hell for now, anon-san'
          },
          "登录语音满羁绊": {
            "words": 'The sand in the depths of hell is magical sand. Touching it will reverse fortune and one own distruction'
          },
          "大厅交互语音1": {
            "words": 'You do not have the will to live. You are only trying to survive'
          },
          "大厅交互语音2": {
            "words": 'You were about to die anyway. Let us see how far we can go.'
          },
          "大厅交互语音3": {
            "words": 'You are a retard anon-san'
          },
          "大厅交互语音4": {
            "words": 'I knew it. A twisted way of playing, just as I suspected'
          },
          "大厅交互语音5": {
            "words": 'You should celebrate after I crush him'
          },
          "大厅交互语音6": {
            "words": 'They are afraid of our insanity'
          },
          "大厅交互语音7": {
            "words": 'There will be nothing left at the end of the match. We are going until we see the depths of hell'
          },
          "大厅交互语音8": {
            "words": 'You are really hanging by a thread'
          },
          "送礼物语音普通": {
            "words": 'notyet'
          },
          "送礼物语音喜好": {
            "words": 'notyet'
          },
          "好感度升级语音1": {
            "words": 'notyet'
          },
          "好感度升级语音2": {
            "words": 'notyet'
          },
          "好感度升级语音3": {
            "words": 'notyet'
          },
          "好感度升级语音4": {
            "words": 'notyet'
          }
        };
        soundGroup.forEach(soundObject => {
          soundObject.level_limit = 0;
          if (changeMap.hasOwnProperty(soundObject.name_chs)) {
            for (let [key, val] of Object.entries(changeMap[soundObject.name_chs])) {
              ['_chs', '_en', '_jp'].forEach(suffix => soundObject[key + suffix] = val)
            }
          }
        });
      }
    });
    console.log('Hacked简介文本');
    cfg.item_definition.character.rows_.forEach(chr => {
      const helper = (key, val) => {
        ['', '_chs', '_en', '_jp'].forEach(suffix => chr[key + suffix] = val)
      };
      switch (chr.id) {
        case 200001:
          chr.name = '神楽めあ';
          chr.name_chs = '神楽めあ';
          chr.name_en = 'Akagi Shigeru';
          chr.name_jp = '赤木しげる';
          helper('desc_cv', 'Masato Hagiwara');
          helper('desc', 'Akagi Shigeru is the main protagonist of the Akagi series, and a main character in Ten. He is a genius who specializes in gambling. Ruling the Japanese underworld for around three years, he is well known as a mahjong legend.');
          helper('desc_age', '19');
          helper('desc_birth', '4-6-1946');
          helper('desc_bloodtype', 'O');
          helper('desc_hobby', 'Mahjong, Old men, Death');
          helper('desc_stature', '167 cm ');
          break;
      }
    });
  } catch (error) {
    raf = requestAnimationFrame(autoRun);
  }
});
(function () {
  console.log("加入开局语音及胡牌语音");
  const oldNewRoundplay = view.ActionNewRound.play;
  view.ActionNewRound.play = function (e) {
    if (view.DesktopMgr.Inst["player_datas"][view.DesktopMgr.Inst["seat"]]["character"]["charid"] === 200001)
      Laya.SoundManager.playSound("sound/game_start_200001.mp3", 1, {
        run: () => {}
      });
    return oldNewRoundplay.call(this, e)
  }
  const oldmehule = view.ViewPlayer_Me.prototype.HulePrepare;
  view.ViewPlayer_Me.prototype.HulePrepare = function (e, i, n) {
    if (view.DesktopMgr.Inst["current_step"] > 0 && view.DesktopMgr.Inst["player_datas"][view.DesktopMgr.Inst["seat"]]["character"]["charid"] === 200001)
      Laya.SoundManager.playSound("sound/hupai_200001.mp3", 1, {
        run: () => {}
      });
    return oldmehule.call(this, e, i, n)
  }
})();
