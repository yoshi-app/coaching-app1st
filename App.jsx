import { useState, useEffect } from 'react';

const programData = [
  { 
    day: 1, 
    theme: '立ち止まる', 
    morning: '今の自分を感じる瞑想', 
    evening: '今日の小さな良かったこと',
    challenge: {
      title: '3回深呼吸を、1日3回',
      description: 'どこでも大丈夫。\n朝起きたとき、お昼ごはんの前、夜寝る前。\nほんの10秒、息を整えるだけ。',
      hint: '忙しい毎日の中で「止まる」ことに慣れていきましょう'
    },
    comments: {
      intention: (userName, text) => `「立ち止まる」ことを意識した${userName}さん。忙しい毎日の中で、そう思えただけで大きな一歩です。`,
      reflection: (userName) => `今日一日を振り返る時間を持てた${userName}さん。「止まる」ことができた自分を、そっと褒めてあげてくださいね。`,
      challengeCompleted: (userName) => `深呼吸で「止まる」ことができた${userName}さん、すごいです。たった10秒でも、その積み重ねが心の余白をつくっていきますよ。`,
      challengeIncomplete: (userName) => `今日は止まれなくても大丈夫。「止まろう」と思えたこと、それ自体がもう変化の始まりです。`
    }
  },
  { 
    day: 2, 
    theme: '手放す', 
    morning: 'イライラを吐き出す呼吸法', 
    evening: '感情をそのまま受け入れる',
    challenge: {
      title: 'イライラしたら「私、今イライラしてる」と心の中でつぶやく',
      description: '怒りを止めなくていい。\nただ「あ、イライラしてるな」と気づくだけ。\nそれだけで、少しだけ楽になります。',
      hint: '感情は抑えず「気づく」だけ。それが手放す第一歩'
    },
    comments: {
      intention: (userName, text) => `感情と向き合おうとする${userName}さんの姿勢、とても勇気があります。今日は「気づく」だけで十分ですよ。`,
      reflection: (userName) => `今日の感情をそのまま受け止めた${userName}さん。良いも悪いもなく、ただ「あった」ことを認められた、それだけで心は少し軽くなります。`,
      challengeCompleted: (userName) => `イライラに「気づけた」${userName}さん、それだけで大きな一歩です。感情を抑えるのではなく、気づくこと。それが手放す第一歩ですよ。`,
      challengeIncomplete: (userName) => `気づけなかった日もあります。それでも「気づこう」とした${userName}さんの姿勢が大切。明日はまた新しい一日です。`
    }
  },
  { 
    day: 3, 
    theme: '自分を満たす', 
    morning: '自分への優しい言葉がけ', 
    evening: '「私」のための1分を振り返る',
    challenge: {
      title: '自分だけのための5分をつくる',
      description: 'コーヒーをゆっくり味わう。\n好きな曲を1曲聴く。\n窓の外をぼーっと眺める。\n\nなんでもいい。「自分のため」の時間を。',
      hint: '罪悪感は横に置いて。あなたにもその時間を持つ権利があります'
    },
    comments: {
      intention: (userName, text) => `自分を満たそうとする${userName}さん、素敵です。あなたが満たされることで、周りの人も温かくなれるんですよ。`,
      reflection: (userName) => `今日の「私」を振り返れた${userName}さん。自分のことを後回しにしがちな毎日で、こうして意識できたこと、大切にしてくださいね。`,
      challengeCompleted: (userName) => `自分のための5分を持てた${userName}さん、えらいです。罪悪感は横に置いて大丈夫。あなたにはその時間を持つ権利があります。`,
      challengeIncomplete: (userName) => `今日は自分の時間が取れなかったんですね。でも「取りたい」と思えた${userName}さんは、もう自分を大切にし始めています。`
    }
  },
  { 
    day: 4, 
    theme: '子どもを見つめる', 
    morning: '子どもの存在に感謝する', 
    evening: '今日の子どもとの瞬間',
    challenge: {
      title: '子どもの目を見て「大好きだよ」と伝える',
      description: '1回でいい。\n照れくさくても、大丈夫。\n言葉にすると、自分の心も温かくなります。',
      hint: '伝えることで、あなた自身も愛情を再確認できます'
    },
    comments: {
      intention: (userName, text) => `子どもを見つめようとする${userName}さんの愛情、とても温かいです。今日は、その気持ちをそのまま大切に過ごしてくださいね。`,
      reflection: (userName) => `今日の子どもとの時間を振り返った${userName}さん。どんな瞬間も、子どもにとっては大切な思い出になっていますよ。`,
      challengeCompleted: (userName) => `「大好きだよ」を伝えられた${userName}さん。その言葉は子どもの心に届いています。そして、${userName}さん自身の心も温かくなったはず。`,
      challengeIncomplete: (userName) => `言葉にできなくても大丈夫。${userName}さんの愛情は、きっと子どもに届いています。心の中で「大好き」と思えたなら、それも立派な愛情表現です。`
    }
  },
  { 
    day: 5, 
    theme: 'パートナーを想う', 
    morning: '相手の良いところを思い出す', 
    evening: '感謝を心の中で伝える',
    challenge: {
      title: '「ありがとう」を具体的に1回伝える',
      description: '「ゴミ出してくれてありがとう」\n「子どもをお風呂に入れてくれて助かった」\n\n小さなことでいい。\n当たり前を、当たり前にしない日。',
      hint: '言葉にすると、相手も自分も少しだけ優しくなれます'
    },
    comments: {
      intention: (userName, text) => `パートナーを想おうとする${userName}さん、素敵です。忙しい日々の中で相手を想う時間を持てること、それ自体が愛情ですよ。`,
      reflection: (userName) => `今日、パートナーへの感謝を心に留めた${userName}さん。当たり前の日常に感謝できる心、とても大切なものです。`,
      challengeCompleted: (userName) => `「ありがとう」を伝えられた${userName}さん。その一言で、二人の間に小さな温かさが生まれましたね。言葉にする勇気、素敵です。`,
      challengeIncomplete: (userName) => `伝えられなかった日もあります。でも${userName}さんが「感謝しよう」と思えたこと、それだけでパートナーへの愛情ですよ。`
    }
  },
  { 
    day: 6, 
    theme: '未来を描く', 
    morning: '理想の自分をイメージ', 
    evening: '小さな一歩を言葉にする',
    challenge: {
      title: '「1年後、どんな自分でいたい？」を書き出す',
      description: '紙でも、スマホのメモでも。\n完璧な答えじゃなくていい。\n\n今、心に浮かんだことを、そのまま言葉に。',
      hint: '書くことで、漠然とした想いが「意図」に変わります'
    },
    comments: {
      intention: (userName, text) => `未来を描こうとする${userName}さん。その姿勢が、もう未来への一歩を踏み出しています。今日のイメージを大切にしてくださいね。`,
      reflection: (userName) => `今日、小さな一歩を意識できた${userName}さん。大きな夢も、小さな一歩の積み重ね。今日の振り返りが、明日への道しるべになりますよ。`,
      challengeCompleted: (userName) => `未来を言葉にできた${userName}さん、すごいです。書いた瞬間、それは「願い」から「意図」に変わりました。その意図が、${userName}さんを導いてくれますよ。`,
      challengeIncomplete: (userName) => `言葉にできなくても大丈夫。未来を考えようとした${userName}さんの心には、もう種が蒔かれています。いつか芽が出る日を楽しみに。`
    }
  },
  { 
    day: 7, 
    theme: '自分に戻る', 
    morning: 'すべてを統合する瞑想', 
    evening: '7日間の自分へ感謝',
    challenge: {
      title: '今日1日、自分に「よくやってるね」と声をかける',
      description: '朝起きたとき。\n家事をしたあと。\n夜、布団に入る前。\n\n何度でも、自分を認めてあげてください。',
      hint: '自分を労う言葉を、これからも持ち続けてくださいね'
    },
    comments: {
      intention: (userName, text) => `7日目、最終日を迎えた${userName}さん。ここまで続けてきた自分を、今日は思いっきり認めてあげてくださいね。`,
      reflection: (userName) => `7日間を振り返った${userName}さん、本当におつかれさまでした。この7日間で出会った「自分」を、これからも大切にしてくださいね。`,
      challengeCompleted: (userName) => `自分に「よくやってるね」と言えた${userName}さん。7日間、自分と向き合い続けたこと、本当にすごいことです。この習慣を、これからも大切にしてくださいね。`,
      challengeIncomplete: (userName) => `自分を褒めるのは難しいですよね。でも${userName}さん、7日間このプログラムを続けたこと、それ自体がもう「よくやってる」の証拠です。`
    }
  },
];

// 日ごとのコメントを取得
const getDayComment = (day, type, userName, text = '') => {
  const dayData = programData[day - 1];
  if (!dayData || !dayData.comments) return null;
  
  const commentFn = dayData.comments[type];
  if (typeof commentFn === 'function') {
    return commentFn(userName, text);
  }
  return null;
};

// 音声読み上げ関数
const speakText = (text) => {
  if ('speechSynthesis' in window) {
    // 既存の読み上げをキャンセル
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.8; // ゆっくり
    utterance.pitch = 1.0;
    utterance.volume = 0.8;
    
    // 日本語の女性音声を優先的に選択
    const voices = window.speechSynthesis.getVoices();
    const japaneseVoice = voices.find(voice => 
      voice.lang.includes('ja') && voice.name.includes('Female')
    ) || voices.find(voice => voice.lang.includes('ja'));
    
    if (japaneseVoice) {
      utterance.voice = japaneseVoice;
    }
    
    window.speechSynthesis.speak(utterance);
  }
};

// 呼吸ガイドコンポーネント
function BreathingGuide({ isRunning }) {
  const [phase, setPhase] = useState('inhale');
  const [counter, setCounter] = useState(5);
  const [voicesLoaded, setVoicesLoaded] = useState(false);
  
  // 音声リストを読み込む
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        setVoicesLoaded(true);
      }
    };
    
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);
  
  // フェーズ変更時に音声を再生
  useEffect(() => {
    if (isRunning && voicesLoaded) {
      if (phase === 'inhale') {
        speakText('吸って');
      } else {
        speakText('吐いて');
      }
    }
  }, [phase, isRunning, voicesLoaded]);
  
  // 瞑想開始時に最初の音声を再生
  useEffect(() => {
    if (isRunning && voicesLoaded) {
      speakText('吸って');
    }
    if (!isRunning) {
      window.speechSynthesis.cancel();
      setPhase('inhale');
      setCounter(5);
    }
  }, [isRunning, voicesLoaded]);
  
  useEffect(() => {
    if (!isRunning) {
      return;
    }
    
    const interval = setInterval(() => {
      setCounter(c => {
        if (c <= 1) {
          setPhase(p => p === 'inhale' ? 'exhale' : 'inhale');
          return phase === 'inhale' ? 7 : 5;
        }
        return c - 1;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isRunning, phase]);
  
  if (!isRunning) return null;
  
  return (
    <div style={{
      textAlign: 'center',
      marginTop: '2rem',
      animation: 'fadeIn 0.5s ease'
    }}>
      <p style={{
        fontFamily: "'Zen Maru Gothic', sans-serif",
        fontSize: '1.3rem',
        color: phase === 'inhale' ? '#c9b99a' : '#a8c5b5',
        marginBottom: '0.5rem',
        transition: 'color 0.5s ease'
      }}>
        {phase === 'inhale' ? '吸って...' : '吐いて...'}
      </p>
      <p style={{
        fontFamily: "'Zen Maru Gothic', sans-serif",
        fontSize: '2rem',
        color: '#8a8a8a',
        margin: 0
      }}>
        {counter}
      </p>
    </div>
  );
}

// オンボーディング画面
function OnboardingScreen({ onComplete }) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [fadeIn, setFadeIn] = useState(true);

  const nextStep = () => {
    setFadeIn(false);
    setTimeout(() => {
      setStep(s => s + 1);
      setFadeIn(true);
    }, 300);
  };

  const handleComplete = () => {
    if (name.trim()) {
      onComplete(name.trim());
    }
  };

  const containerStyle = {
    padding: '3rem 2rem',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    opacity: fadeIn ? 1 : 0,
    transition: 'opacity 0.3s ease',
  };

  if (step === 0) {
    return (
      <div style={{
        ...containerStyle,
        background: 'linear-gradient(180deg, #faf9f7 0%, #f5f3ef 100%)'
      }}>
        <div style={{ marginBottom: '4rem' }}>
          <p style={{
            fontFamily: "'Zen Maru Gothic', sans-serif",
            fontSize: '1.5rem',
            fontWeight: '300',
            color: '#5a5a5a',
            lineHeight: '2.2',
            margin: 0
          }}>
            毎日、<br/>
            がんばってますよね。
          </p>
        </div>

        <p style={{
          fontFamily: "'Zen Maru Gothic', sans-serif",
          fontSize: '1rem',
          color: '#9a9a9a',
          lineHeight: '2',
          marginBottom: '4rem'
        }}>
          子どものこと、家のこと、仕事のこと。<br/>
          気づけば自分のことは後回し。
        </p>

        <button
          onClick={nextStep}
          style={{
            alignSelf: 'flex-start',
            background: 'none',
            border: 'none',
            fontFamily: "'Zen Maru Gothic', sans-serif",
            fontSize: '1rem',
            color: '#b8a89a',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          つぎへ <span style={{ fontSize: '1.2rem' }}>→</span>
        </button>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div style={{
        ...containerStyle,
        background: 'linear-gradient(180deg, #f8f6f2 0%, #f5f8f6 100%)'
      }}>
        <div style={{ marginBottom: '4rem' }}>
          <p style={{
            fontFamily: "'Zen Maru Gothic', sans-serif",
            fontSize: '1.5rem',
            fontWeight: '300',
            color: '#5a5a5a',
            lineHeight: '2.2',
            margin: 0
          }}>
            1日5分だけ、<br/>
            自分に戻る時間を<br/>
            つくりませんか。
          </p>
        </div>

        <div style={{
          width: '60px',
          height: '2px',
          background: 'linear-gradient(90deg, #a8c5b5, #c9b99a)',
          marginBottom: '4rem',
          borderRadius: '1px'
        }} />

        <button
          onClick={nextStep}
          style={{
            alignSelf: 'flex-start',
            background: 'none',
            border: 'none',
            fontFamily: "'Zen Maru Gothic', sans-serif",
            fontSize: '1rem',
            color: '#9ab8a8',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          つぎへ <span style={{ fontSize: '1.2rem' }}>→</span>
        </button>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div style={{
        ...containerStyle,
        background: 'linear-gradient(180deg, #f5f8f6 0%, #faf9f7 100%)'
      }}>
        <p style={{
          fontFamily: "'Zen Maru Gothic', sans-serif",
          fontSize: '0.9rem',
          color: '#a8c5b5',
          marginBottom: '1rem',
          letterSpacing: '0.1em'
        }}>
          自分に戻る7日間
        </p>

        <div style={{ marginBottom: '2.5rem' }}>
          <p style={{
            fontFamily: "'Zen Maru Gothic', sans-serif",
            fontSize: '1.3rem',
            fontWeight: '300',
            color: '#5a5a5a',
            lineHeight: '2',
            margin: 0
          }}>
            朝と夜、ほんの少しのワークで<br/>
            穏やかな自分に出会えます。
          </p>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '1.2rem',
          padding: '1.5rem',
          marginBottom: '3rem',
          boxShadow: '0 2px 20px rgba(0,0,0,0.04)'
        }}>
          <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.2rem' }}>🌅</span>
              <span style={{
                fontFamily: "'Zen Maru Gothic', sans-serif",
                fontSize: '0.9rem',
                color: '#8b7b6b'
              }}>朝の瞑想</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.2rem' }}>🌙</span>
              <span style={{
                fontFamily: "'Zen Maru Gothic', sans-serif",
                fontSize: '0.9rem',
                color: '#6b7c6e'
              }}>夜の振り返り</span>
            </div>
          </div>
          <p style={{
            fontFamily: "'Zen Maru Gothic', sans-serif",
            fontSize: '0.85rem',
            color: '#a8a8a8',
            margin: 0,
            lineHeight: '1.6'
          }}>
            1〜10分、自分のペースで続けられます
          </p>
        </div>

        <button
          onClick={nextStep}
          style={{
            alignSelf: 'flex-start',
            background: 'none',
            border: 'none',
            fontFamily: "'Zen Maru Gothic', sans-serif",
            fontSize: '1rem',
            color: '#9ab8a8',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          つぎへ <span style={{ fontSize: '1.2rem' }}>→</span>
        </button>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div style={{
        ...containerStyle,
        background: 'linear-gradient(180deg, #faf9f7 0%, #fef9f5 100%)'
      }}>
        <p style={{
          fontFamily: "'Zen Maru Gothic', sans-serif",
          fontSize: '1.4rem',
          fontWeight: '300',
          color: '#5a5a5a',
          lineHeight: '2',
          marginBottom: '0.5rem'
        }}>
          あなたのことを<br/>
          教えてください
        </p>

        <p style={{
          fontFamily: "'Zen Maru Gothic', sans-serif",
          fontSize: '0.9rem',
          color: '#a8a8a8',
          marginBottom: '2.5rem'
        }}>
          呼び名を入れてね
        </p>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="ニックネーム"
          style={{
            width: '100%',
            padding: '1.2rem',
            borderRadius: '1rem',
            border: '1px solid #e8e4de',
            fontFamily: "'Zen Maru Gothic', sans-serif",
            fontSize: '1.1rem',
            color: '#5a5a5a',
            marginBottom: '3rem',
            boxSizing: 'border-box',
            background: 'white'
          }}
        />

        <button
          onClick={handleComplete}
          disabled={!name.trim()}
          style={{
            width: '100%',
            background: name.trim() 
              ? 'linear-gradient(135deg, #c9b99a 0%, #b8a890 100%)'
              : '#e8e4de',
            border: 'none',
            padding: '1.2rem',
            borderRadius: '2rem',
            color: name.trim() ? 'white' : '#b8b8b8',
            fontFamily: "'Zen Maru Gothic', sans-serif",
            fontSize: '1rem',
            cursor: name.trim() ? 'pointer' : 'default',
            transition: 'all 0.3s ease',
            boxShadow: name.trim() 
              ? '0 4px 20px rgba(201, 185, 154, 0.3)'
              : 'none'
          }}
        >
          はじめる
        </button>
      </div>
    );
  }
}

// タイマーコンポーネント
function MeditationTimer({ minutes, onComplete, onCancel }) {
  const [timeLeft, setTimeLeft] = useState(minutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      setIsCompleted(true);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const progress = 1 - (timeLeft / (minutes * 60));

  const handleCancel = () => {
    setShowCancelConfirm(true);
    setIsRunning(false);
  };

  const confirmCancel = () => {
    onCancel();
  };

  const resumeMeditation = () => {
    setShowCancelConfirm(false);
    setIsRunning(true);
  };

  if (showCancelConfirm) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem 0' }}>
        <p style={{
          fontFamily: "'Zen Maru Gothic', sans-serif",
          fontSize: '1.1rem',
          color: '#5a5a5a',
          marginBottom: '1rem',
          lineHeight: '1.8'
        }}>
          瞑想を終了しますか？
        </p>
        <p style={{
          fontFamily: "'Zen Maru Gothic', sans-serif",
          fontSize: '0.9rem',
          color: '#a8a8a8',
          marginBottom: '2rem'
        }}>
          途中でも大丈夫。<br/>
          自分のペースで続けていきましょう。
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button
            onClick={resumeMeditation}
            style={{
              background: '#a8c5b5',
              border: 'none',
              padding: '1rem 2rem',
              borderRadius: '2rem',
              color: 'white',
              fontFamily: "'Zen Maru Gothic', sans-serif",
              fontSize: '0.95rem',
              cursor: 'pointer'
            }}
          >
            続ける
          </button>
          <button
            onClick={confirmCancel}
            style={{
              background: 'transparent',
              border: '1px solid #d8d4ce',
              padding: '1rem 2rem',
              borderRadius: '2rem',
              color: '#8a8a8a',
              fontFamily: "'Zen Maru Gothic', sans-serif",
              fontSize: '0.95rem',
              cursor: 'pointer'
            }}
          >
            終了する
          </button>
        </div>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem 0' }}>
        <div style={{ 
          fontSize: '3rem', 
          marginBottom: '1rem',
          animation: 'fadeIn 1s ease'
        }}>✨</div>
        <p style={{ 
          fontFamily: "'Zen Maru Gothic', sans-serif",
          fontSize: '1.1rem',
          color: '#8b7b6b',
          marginBottom: '2rem'
        }}>
          おつかれさまでした
        </p>
        <button
          onClick={onComplete}
          style={{
            background: '#c9b99a',
            border: 'none',
            padding: '1rem 2.5rem',
            borderRadius: '2rem',
            color: 'white',
            fontFamily: "'Zen Maru Gothic', sans-serif",
            fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          次へ
        </button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', padding: '2rem 0' }}>
      <div style={{ position: 'relative', width: '180px', height: '180px', margin: '0 auto 1rem' }}>
        <svg width="180" height="180" style={{ transform: 'rotate(-90deg)' }}>
          <circle
            cx="90" cy="90" r="80"
            fill="none"
            stroke="#e8e4de"
            strokeWidth="4"
          />
          <circle
            cx="90" cy="90" r="80"
            fill="none"
            stroke="#a8c5b5"
            strokeWidth="4"
            strokeDasharray={`${progress * 502} 502`}
            strokeLinecap="round"
            style={{ transition: 'stroke-dasharray 1s linear' }}
          />
        </svg>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: "'Zen Maru Gothic', sans-serif",
          fontSize: '2.5rem',
          color: '#6b7c6e',
          letterSpacing: '0.1em'
        }}>
          {formatTime(timeLeft)}
        </div>
      </div>

      <BreathingGuide isRunning={isRunning} />

      <div style={{ marginTop: '2rem' }}>
        {!isRunning ? (
          <button
            onClick={() => setIsRunning(true)}
            style={{
              background: '#a8c5b5',
              border: 'none',
              padding: '1rem 3rem',
              borderRadius: '2rem',
              color: 'white',
              fontFamily: "'Zen Maru Gothic', sans-serif",
              fontSize: '1rem',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(168, 197, 181, 0.3)'
            }}
          >
            はじめる
          </button>
        ) : (
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button
              onClick={() => setIsRunning(false)}
              style={{
                background: 'transparent',
                border: '1px solid #c9b99a',
                padding: '1rem 2rem',
                borderRadius: '2rem',
                color: '#8b7b6b',
                fontFamily: "'Zen Maru Gothic', sans-serif",
                fontSize: '0.95rem',
                cursor: 'pointer'
              }}
            >
              一時停止
            </button>
            <button
              onClick={handleCancel}
              style={{
                background: 'transparent',
                border: '1px solid #d8d4ce',
                padding: '1rem 2rem',
                borderRadius: '2rem',
                color: '#a8a8a8',
                fontFamily: "'Zen Maru Gothic', sans-serif",
                fontSize: '0.95rem',
                cursor: 'pointer'
              }}
            >
              やめる
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// 記録画面
function RecordsScreen({ records, userName, onBack }) {
  if (records.length === 0) {
    return (
      <div style={{ padding: '2rem 1.5rem', minHeight: '100vh' }}>
        <button 
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            fontFamily: "'Zen Maru Gothic', sans-serif",
            fontSize: '0.9rem',
            color: '#a8a8a8',
            cursor: 'pointer',
            padding: 0,
            marginBottom: '2rem'
          }}
        >
          ← もどる
        </button>

        <h2 style={{
          fontFamily: "'Zen Maru Gothic', sans-serif",
          fontSize: '1.3rem',
          fontWeight: '400',
          color: '#5a5a5a',
          marginBottom: '2rem'
        }}>
          {userName}さんの記録
        </h2>

        <div style={{
          textAlign: 'center',
          padding: '4rem 2rem',
          color: '#a8a8a8'
        }}>
          <p style={{
            fontFamily: "'Zen Maru Gothic', sans-serif",
            fontSize: '2.5rem',
            marginBottom: '1rem'
          }}>📝</p>
          <p style={{
            fontFamily: "'Zen Maru Gothic', sans-serif",
            fontSize: '1rem',
            lineHeight: '1.8'
          }}>
            まだ記録がありません。<br/>
            ワークを始めてみましょう。
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem 1.5rem', minHeight: '100vh' }}>
      <button 
        onClick={onBack}
        style={{
          background: 'none',
          border: 'none',
          fontFamily: "'Zen Maru Gothic', sans-serif",
          fontSize: '0.9rem',
          color: '#a8a8a8',
          cursor: 'pointer',
          padding: 0,
          marginBottom: '2rem'
        }}
      >
        ← もどる
      </button>

      <h2 style={{
        fontFamily: "'Zen Maru Gothic', sans-serif",
        fontSize: '1.3rem',
        fontWeight: '400',
        color: '#5a5a5a',
        marginBottom: '0.5rem'
      }}>
        {userName}さんの記録
      </h2>
      
      <p style={{
        fontFamily: "'Zen Maru Gothic', sans-serif",
        fontSize: '0.9rem',
        color: '#a8a8a8',
        marginBottom: '2rem'
      }}>
        これまでの歩みを振り返ってみましょう
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {records.map((record, index) => (
          <div
            key={index}
            style={{
              background: 'white',
              borderRadius: '1.2rem',
              padding: '1.5rem',
              boxShadow: '0 2px 20px rgba(0,0,0,0.04)',
              border: '1px solid #f0ede8'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '1.2rem' }}>
                {record.type === 'intention' ? '🌅' : record.type === 'reflection' ? '🌙' : '⭐'}
              </span>
              <div>
                <p style={{
                  fontFamily: "'Zen Maru Gothic', sans-serif",
                  fontSize: '0.8rem',
                  color: record.type === 'intention' ? '#b8a89a' : record.type === 'reflection' ? '#9ab8a8' : '#c9a87c',
                  margin: 0
                }}>
                  Day {record.day} {record.type === 'intention' ? '朝の意図' : record.type === 'reflection' ? '夜の振り返り' : 'チャレンジ'}
                </p>
              </div>
            </div>
            
            {record.text && (
              <p style={{
                fontFamily: "'Zen Maru Gothic', sans-serif",
                fontSize: '1rem',
                color: '#5a5a5a',
                lineHeight: '1.7',
                margin: '0 0 1rem 0',
                padding: '1rem',
                background: '#faf9f7',
                borderRadius: '0.8rem'
              }}>
                {record.text}
              </p>
            )}

            {record.type === 'challenge' && (
              <p style={{
                fontFamily: "'Zen Maru Gothic', sans-serif",
                fontSize: '0.9rem',
                color: record.completed ? '#a8c5b5' : '#c9a87c',
                margin: '0 0 1rem 0'
              }}>
                {record.completed ? '✓ できた' : '△ むずかしかった'}
              </p>
            )}

            {record.comment && (
              <div style={{
                padding: '1rem',
                background: record.type === 'intention' 
                  ? 'linear-gradient(135deg, #fef9f5 0%, #faf9f7 100%)'
                  : record.type === 'reflection'
                  ? 'linear-gradient(135deg, #f5faf7 0%, #faf9f7 100%)'
                  : 'linear-gradient(135deg, #fdf8f3 0%, #faf9f7 100%)',
                borderRadius: '0.8rem',
                borderLeft: `3px solid ${record.type === 'intention' ? '#c9b99a' : record.type === 'reflection' ? '#a8c5b5' : '#c9a87c'}`
              }}>
                <p style={{
                  fontFamily: "'Zen Maru Gothic', sans-serif",
                  fontSize: '0.9rem',
                  color: '#7a7a7a',
                  lineHeight: '1.7',
                  margin: 0
                }}>
                  {record.comment}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ホーム画面
function HomeScreen({ userName, currentDay, onStartMorning, onStartEvening, onViewRecords, recordsCount }) {
  const today = programData[currentDay - 1];
  const hour = new Date().getHours();
  const isMorning = hour < 12;

  return (
    <div style={{ padding: '2rem 1.5rem', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <p style={{ 
            fontFamily: "'Zen Maru Gothic', sans-serif",
            fontSize: '1.1rem',
            color: '#5a5a5a',
            marginBottom: '0.3rem'
          }}>
            {userName}さん
          </p>
          <p style={{ 
            fontFamily: "'Zen Maru Gothic', sans-serif",
            fontSize: '0.85rem',
            color: '#a8a8a8',
            margin: 0
          }}>
            自分に戻る7日間
          </p>
        </div>
        
        <button
          onClick={onViewRecords}
          style={{
            background: 'white',
            border: '1px solid #e8e4de',
            borderRadius: '1rem',
            padding: '0.6rem 1rem',
            fontFamily: "'Zen Maru Gothic', sans-serif",
            fontSize: '0.85rem',
            color: '#8a8a8a',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}
        >
          📝 記録 {recordsCount > 0 && <span style={{ color: '#a8c5b5' }}>({recordsCount})</span>}
        </button>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ 
          fontFamily: "'Zen Maru Gothic', sans-serif",
          fontSize: '1.5rem',
          fontWeight: '400',
          color: '#5a5a5a',
          margin: 0
        }}>
          Day {currentDay}. {today.theme}
        </h1>
      </div>

      <div style={{
        background: 'linear-gradient(135deg, #faf9f7 0%, #f5f3ef 100%)',
        borderRadius: '1.5rem',
        padding: '2rem',
        marginBottom: '2rem'
      }}>
        <p style={{
          fontFamily: "'Zen Maru Gothic', sans-serif",
          fontSize: '1rem',
          color: '#7a7a7a',
          lineHeight: '1.8',
          margin: 0
        }}>
          {isMorning 
            ? `おはようございます、${userName}さん。\n今日も、ほんの少しだけ\n自分のための時間を。`
            : `おつかれさまでした、${userName}さん。\n今日一日を、そっと\n振り返ってみませんか。`}
        </p>
      </div>

      <div 
        onClick={onStartMorning}
        style={{
          background: 'white',
          borderRadius: '1.2rem',
          padding: '1.5rem',
          marginBottom: '1rem',
          boxShadow: '0 2px 20px rgba(0,0,0,0.04)',
          cursor: 'pointer',
          border: '1px solid #f0ede8',
          transition: 'transform 0.2s ease'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem'
          }}>
            🌅
          </div>
          <div>
            <p style={{
              fontFamily: "'Zen Maru Gothic', sans-serif",
              fontSize: '0.8rem',
              color: '#b8a89a',
              margin: '0 0 0.3rem 0'
            }}>朝のワーク</p>
            <p style={{
              fontFamily: "'Zen Maru Gothic', sans-serif",
              fontSize: '1rem',
              color: '#5a5a5a',
              margin: 0
            }}>{today.morning}</p>
          </div>
        </div>
      </div>

      <div 
        onClick={onStartEvening}
        style={{
          background: 'white',
          borderRadius: '1.2rem',
          padding: '1.5rem',
          marginBottom: '2rem',
          boxShadow: '0 2px 20px rgba(0,0,0,0.04)',
          cursor: 'pointer',
          border: '1px solid #f0ede8',
          transition: 'transform 0.2s ease'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #a8c5b5 0%, #7fadab 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem'
          }}>
            🌙
          </div>
          <div>
            <p style={{
              fontFamily: "'Zen Maru Gothic', sans-serif",
              fontSize: '0.8rem',
              color: '#9ab8a8',
              margin: '0 0 0.3rem 0'
            }}>夜のワーク</p>
            <p style={{
              fontFamily: "'Zen Maru Gothic', sans-serif",
              fontSize: '1rem',
              color: '#5a5a5a',
              margin: 0
            }}>{today.evening}</p>
          </div>
        </div>
      </div>

      <div style={{ padding: '0 0.5rem' }}>
        <p style={{
          fontFamily: "'Zen Maru Gothic', sans-serif",
          fontSize: '0.8rem',
          color: '#b8b8b8',
          marginBottom: '0.8rem'
        }}>あなたの歩み</p>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {programData.map((_, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: '4px',
                borderRadius: '2px',
                background: i < currentDay ? '#a8c5b5' : '#e8e4de',
                transition: 'background 0.3s ease'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// 朝のワーク画面
function MorningScreen({ day, userName, onBack, onComplete, onSaveRecord }) {
  const [step, setStep] = useState(0);
  const [selectedTime, setSelectedTime] = useState(3);
  const [intention, setIntention] = useState('');
  const [warmComment, setWarmComment] = useState('');
  const today = programData[day - 1];

  const timeOptions = [1, 3, 5];

  const handleSaveIntention = () => {
    const comment = getDayComment(day, 'intention', userName, intention);
    setWarmComment(comment);
    if (intention.trim()) {
      onSaveRecord({
        type: 'intention',
        day: day,
        text: intention,
        comment: comment
      });
    }
    setStep(4);
  };

  if (step === 0) {
    return (
      <div style={{ padding: '2rem 1.5rem', minHeight: '100vh' }}>
        <button 
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            fontFamily: "'Zen Maru Gothic', sans-serif",
            fontSize: '0.9rem',
            color: '#a8a8a8',
            cursor: 'pointer',
            padding: 0,
            marginBottom: '2rem'
          }}
        >
          ← もどる
        </button>

        <div style={{ marginBottom: '3rem' }}>
          <p style={{
            fontFamily: "'Zen Maru Gothic', sans-serif",
            fontSize: '0.85rem',
            color: '#b8a89a',
            marginBottom: '0.5rem'
          }}>Day {day} 朝のワーク</p>
          <h2 style={{
            fontFamily: "'Zen Maru Gothic', sans-serif",
            fontSize: '1.4rem',
            fontWeight: '400',
            color: '#5a5a5a',
            margin: 0
          }}>{today.morning}</h2>
        </div>

        <p style={{
          fontFamily: "'Zen Maru Gothic', sans-serif",
          fontSize: '0.95rem',
          color: '#7a7a7a',
          lineHeight: '1.8',
          marginBottom: '2.5rem'
        }}>
          {userName}さん、今日の瞑想時間を<br/>
          選んでください。短くても大丈夫。
        </p>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem' }}>
          {timeOptions.map(time => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              style={{
                flex: 1,
                padding: '1.5rem 1rem',
                borderRadius: '1rem',
                border: selectedTime === time ? '2px solid #c9b99a' : '1px solid #e8e4de',
                background: selectedTime === time ? '#faf8f5' : 'white',
                fontFamily: "'Zen Maru Gothic', sans-serif",
                fontSize: '1.1rem',
                color: '#5a5a5a',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {time}分
            </button>
          ))}
        </div>

        <button
          onClick={() => setStep(1)}
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
            border: 'none',
            padding: '1.2rem',
            borderRadius: '2rem',
            color: 'white',
            fontFamily: "'Zen Maru Gothic', sans-serif",
            fontSize: '1rem',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(252, 182, 159, 0.3)'
          }}
        >
          瞑想をはじめる
        </button>
      </div>
    );
  }

  // 瞑想導入画面
  if (step === 1) {
    return (
      <div style={{ 
        padding: '2rem 1.5rem', 
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #faf9f7 0%, #fef9f5 100%)'
      }}>
        <p style={{
          fontFamily: "'Zen Maru Gothic', sans-serif",
          fontSize: '0.85rem',
          color: '#b8a89a',
          textAlign: 'center',
          marginBottom: '0.5rem'
        }}>Day {day}</p>
        <h2 style={{
          fontFamily: "'Zen Maru Gothic', sans-serif",
          fontSize: '1.2rem',
          fontWeight: '400',
          color: '#5a5a5a',
          textAlign: 'center',
          marginBottom: '3rem'
        }}>瞑想をはじめる前に</h2>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '1.2rem',
            padding: '1.5rem',
            boxShadow: '0 2px 15px rgba(0,0,0,0.03)'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <span style={{ fontSize: '1.5rem' }}>🧘</span>
              <div>
                <p style={{
                  fontFamily: "'Zen Maru Gothic', sans-serif",
                  fontSize: '1rem',
                  fontWeight: '400',
                  color: '#5a5a5a',
                  marginBottom: '0.5rem'
                }}>心地よい姿勢をとる</p>
                <p style={{
                  fontFamily: "'Zen Maru Gothic', sans-serif",
                  fontSize: '0.9rem',
                  color: '#8a8a8a',
                  lineHeight: '1.7',
                  margin: 0
                }}>
                  座っても、横になっても大丈夫。<br/>
                  背筋をそっと伸ばして、<br/>
                  肩の力を抜きましょう。
                </p>
              </div>
            </div>
          </div>

          <div style={{
            background: 'white',
            borderRadius: '1.2rem',
            padding: '1.5rem',
            boxShadow: '0 2px 15px rgba(0,0,0,0.03)'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <span style={{ fontSize: '1.5rem' }}>🌬️</span>
              <div>
                <p style={{
                  fontFamily: "'Zen Maru Gothic', sans-serif",
                  fontSize: '1rem',
                  fontWeight: '400',
                  color: '#5a5a5a',
                  marginBottom: '0.5rem'
                }}>呼吸に意識を向ける</p>
                <p style={{
                  fontFamily: "'Zen Maru Gothic', sans-serif",
                  fontSize: '0.9rem',
                  color: '#8a8a8a',
                  lineHeight: '1.7',
                  margin: 0
                }}>
                  鼻から吸って、口からゆっくり吐く。<br/>
                  空気が体を流れる感覚を<br/>
                  ただ感じてみてください。
                </p>
              </div>
            </div>
          </div>

          <div style={{
            background: 'white',
            borderRadius: '1.2rem',
            padding: '1.5rem',
            boxShadow: '0 2px 15px rgba(0,0,0,0.03)'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <span style={{ fontSize: '1.5rem' }}>💭</span>
              <div>
                <p style={{
                  fontFamily: "'Zen Maru Gothic', sans-serif",
                  fontSize: '1rem',
                  fontWeight: '400',
                  color: '#5a5a5a',
                  marginBottom: '0.5rem'
                }}>思考が浮かんでも大丈夫</p>
                <p style={{
                  fontFamily: "'Zen Maru Gothic', sans-serif",
                  fontSize: '0.9rem',
                  color: '#8a8a8a',
                  lineHeight: '1.7',
                  margin: 0
                }}>
                  雑念は自然なこと。<br/>
                  そっと呼吸に意識を戻すだけで<br/>
                  十分です。
                </p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => setStep(2)}
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
            border: 'none',
            padding: '1.2rem',
            borderRadius: '2rem',
            color: 'white',
            fontFamily: "'Zen Maru Gothic', sans-serif",
            fontSize: '1rem',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(252, 182, 159, 0.3)'
          }}
        >
          準備ができました
        </button>
      </div>
    );
  }

  // 瞑想タイマー
  if (step === 2) {
    return (
      <div style={{ 
        padding: '2rem 1.5rem', 
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #faf9f7 0%, #fef9f5 100%)'
      }}>
        <p style={{
          fontFamily: "'Zen Maru Gothic', sans-serif",
          fontSize: '0.85rem',
          color: '#b8a89a',
          textAlign: 'center',
          marginBottom: '0.5rem'
        }}>Day {day}</p>
        <h2 style={{
          fontFamily: "'Zen Maru Gothic', sans-serif",
          fontSize: '1.2rem',
          fontWeight: '400',
          color: '#5a5a5a',
          textAlign: 'center',
          marginBottom: '1rem'
        }}>{today.morning}</h2>

        <MeditationTimer 
          minutes={selectedTime} 
          onComplete={() => setStep(3)}
          onCancel={() => setStep(3)}
        />
      </div>
    );
  }

  if (step === 3) {
    return (
      <div style={{ padding: '2rem 1.5rem', minHeight: '100vh' }}>
        <p style={{
          fontFamily: "'Zen Maru Gothic', sans-serif",
          fontSize: '0.85rem',
          color: '#b8a89a',
          marginBottom: '2rem'
        }}>今日の意図</p>

        <h2 style={{
          fontFamily: "'Zen Maru Gothic', sans-serif",
          fontSize: '1.3rem',
          fontWeight: '400',
          color: '#5a5a5a',
          lineHeight: '1.6',
          marginBottom: '2rem'
        }}>
          {userName}さん、今日は<br/>
          どんな自分でありたいですか？
        </h2>

        <p style={{
          fontFamily: "'Zen Maru Gothic', sans-serif",
          fontSize: '0.9rem',
          color: '#a8a8a8',
          marginBottom: '1.5rem'
        }}>
          完璧じゃなくていい。<br/>
          ひとこと、心に浮かんだことを。
        </p>

        <textarea
          value={intention}
          onChange={(e) => setIntention(e.target.value)}
          placeholder="例：子どもの話をゆっくり聞く"
          style={{
            width: '100%',
            height: '120px',
            padding: '1.2rem',
            borderRadius: '1rem',
            border: '1px solid #e8e4de',
            fontFamily: "'Zen Maru Gothic', sans-serif",
            fontSize: '1rem',
            color: '#5a5a5a',
            resize: 'none',
            marginBottom: '2rem',
            boxSizing: 'border-box'
          }}
        />

        <button
          onClick={handleSaveIntention}
          style={{
            width: '100%',
            background: '#c9b99a',
            border: 'none',
            padding: '1.2rem',
            borderRadius: '2rem',
            color: 'white',
            fontFamily: "'Zen Maru Gothic', sans-serif",
            fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          次へ
        </button>
      </div>
    );
  }

  if (step === 4) {
    return (
      <div style={{ padding: '2rem 1.5rem', minHeight: '100vh' }}>
        {warmComment && (
          <div style={{
            background: 'linear-gradient(135deg, #fef9f5 0%, #faf9f7 100%)',
            borderRadius: '1.5rem',
            padding: '1.5rem',
            marginBottom: '2rem',
            borderLeft: '4px solid #c9b99a'
          }}>
            <p style={{
              fontFamily: "'Zen Maru Gothic', sans-serif",
              fontSize: '0.95rem',
              color: '#6a6a6a',
              lineHeight: '1.9',
              margin: 0
            }}>
              {warmComment}
            </p>
          </div>
        )}

        <div style={{
          background: 'white',
          borderRadius: '1.5rem',
          padding: '1.5rem',
          marginBottom: '2rem',
          boxShadow: '0 2px 20px rgba(0,0,0,0.04)',
          border: '1px solid #f0ede8'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '1.2rem' }}>⭐</span>
            <p style={{
              fontFamily: "'Zen Maru Gothic', sans-serif",
              fontSize: '0.85rem',
              color: '#c9a87c',
              margin: 0
            }}>今日のチャレンジ</p>
          </div>

          <h3 style={{
            fontFamily: "'Zen Maru Gothic', sans-serif",
            fontSize: '1.1rem',
            fontWeight: '400',
            color: '#5a5a5a',
            marginBottom: '1rem',
            lineHeight: '1.6'
          }}>
            {today.challenge.title}
          </h3>

          <p style={{
            fontFamily: "'Zen Maru Gothic', sans-serif",
            fontSize: '0.9rem',
            color: '#7a7a7a',
            lineHeight: '1.8',
            marginBottom: '1rem',
            whiteSpace: 'pre-line'
          }}>
            {today.challenge.description}
          </p>

          <div style={{
            background: '#fdf8f3',
            borderRadius: '0.8rem',
            padding: '1rem'
          }}>
            <p style={{
              fontFamily: "'Zen Maru Gothic', sans-serif",
              fontSize: '0.85rem',
              color: '#a8967a',
              margin: 0,
              lineHeight: '1.6'
            }}>
              💡 {today.challenge.hint}
            </p>
          </div>
        </div>

        <button
          onClick={onComplete}
          style={{
            width: '100%',
            background: '#c9b99a',
            border: 'none',
            padding: '1.2rem',
            borderRadius: '2rem',
            color: 'white',
            fontFamily: "'Zen Maru Gothic', sans-serif",
            fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          今日をはじめる
        </button>
      </div>
    );
  }
}

// 夜のワーク画面
function EveningScreen({ day, userName, onBack, onComplete, onSaveRecord }) {
  const [step, setStep] = useState(0);
  const [selectedTime, setSelectedTime] = useState(5);
  const [reflection, setReflection] = useState('');
  const [warmComment, setWarmComment] = useState('');
  const [challengeCompleted, setChallengeCompleted] = useState(null);
  const [challengeComment, setChallengeComment] = useState('');
  const today = programData[day - 1];

  const timeOptions = [3, 5, 10];

  const handleSaveReflection = () => {
    const comment = getDayComment(day, 'reflection', userName);
    setWarmComment(comment);
    if (reflection.trim()) {
      onSaveRecord({
        type: 'reflection',
        day: day,
        text: reflection,
        comment: comment
      });
    }
    setStep(1);
  };

  const handleChallengeResponse = (completed) => {
    setChallengeCompleted(completed);
    const commentType = completed ? 'challengeCompleted' : 'challengeIncomplete';
    const comment = getDayComment(day, commentType, userName);
    setChallengeComment(comment);
    onSaveRecord({
      type: 'challenge',
      day: day,
      completed: completed,
      text: today.challenge.title,
      comment: comment
    });
    setStep(2);
  };

  if (step === 0) {
    return (
      <div style={{ padding: '2rem 1.5rem', minHeight: '100vh' }}>
        <button 
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            fontFamily: "'Zen Maru Gothic', sans-serif",
            fontSize: '0.9rem',
            color: '#a8a8a8',
            cursor: 'pointer',
            padding: 0,
            marginBottom: '2rem'
          }}
        >
          ← もどる
        </button>

        <div style={{ marginBottom: '3rem' }}>
          <p style={{
            fontFamily: "'Zen Maru Gothic', sans-serif",
            fontSize: '0.85rem',
            color: '#9ab8a8',
            marginBottom: '0.5rem'
          }}>Day {day} 夜のワーク</p>
          <h2 style={{
            fontFamily: "'Zen Maru Gothic', sans-serif",
            fontSize: '1.4rem',
            fontWeight: '400',
            color: '#5a5a5a',
            margin: 0
          }}>{today.evening}</h2>
        </div>

        <p style={{
          fontFamily: "'Zen Maru Gothic', sans-serif",
          fontSize: '0.95rem',
          color: '#7a7a7a',
          lineHeight: '1.8',
          marginBottom: '1.5rem'
        }}>
          {userName}さん、今日一日を振り返って。<br/>
          小さなことでも、うまくいかなかったことでも。
        </p>

        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="今日、心に残ったこと..."
          style={{
            width: '100%',
            height: '140px',
            padding: '1.2rem',
            borderRadius: '1rem',
            border: '1px solid #e8e4de',
            fontFamily: "'Zen Maru Gothic', sans-serif",
            fontSize: '1rem',
            color: '#5a5a5a',
            resize: 'none',
            marginBottom: '2rem',
            boxSizing: 'border-box'
          }}
        />

        <button
          onClick={handleSaveReflection}
          style={{
            width: '100%',
            background: 'transparent',
            border: '1px solid #a8c5b5',
            padding: '1rem',
            borderRadius: '2rem',
            color: '#6b7c6e',
            fontFamily: "'Zen Maru Gothic', sans-serif",
            fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          次へ
        </button>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div style={{ padding: '2rem 1.5rem', minHeight: '100vh' }}>
        {warmComment && (
          <div style={{
            background: 'linear-gradient(135deg, #f5faf7 0%, #faf9f7 100%)',
            borderRadius: '1.2rem',
            padding: '1.5rem',
            marginBottom: '2rem',
            borderLeft: '4px solid #a8c5b5'
          }}>
            <p style={{
              fontFamily: "'Zen Maru Gothic', sans-serif",
              fontSize: '0.95rem',
              color: '#6a6a6a',
              lineHeight: '1.8',
              margin: 0
            }}>
              {warmComment}
            </p>
          </div>
        )}

        <div style={{
          background: 'white',
          borderRadius: '1.5rem',
          padding: '1.5rem',
          marginBottom: '2rem',
          boxShadow: '0 2px 20px rgba(0,0,0,0.04)',
          border: '1px solid #f0ede8'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '1.2rem' }}>⭐</span>
            <p style={{
              fontFamily: "'Zen Maru Gothic', sans-serif",
              fontSize: '0.85rem',
              color: '#c9a87c',
              margin: 0
            }}>今日のチャレンジ</p>
          </div>

          <h3 style={{
            fontFamily: "'Zen Maru Gothic', sans-serif",
            fontSize: '1.1rem',
            fontWeight: '400',
            color: '#5a5a5a',
            marginBottom: '1.5rem',
            lineHeight: '1.6'
          }}>
            {today.challenge.title}
          </h3>

          <p style={{
            fontFamily: "'Zen Maru Gothic', sans-serif",
            fontSize: '1rem',
            color: '#7a7a7a',
            marginBottom: '1.5rem'
          }}>
            今日のチャレンジ、どうでしたか？
          </p>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={() => handleChallengeResponse(true)}
              style={{
                flex: 1,
                padding: '1.2rem',
                borderRadius: '1rem',
                border: '1px solid #a8c5b5',
                background: 'white',
                fontFamily: "'Zen Maru Gothic', sans-serif",
                fontSize: '1rem',
                color: '#6b7c6e',
                cursor: 'pointer'
              }}
            >
              できた 😊
            </button>
            <button
              onClick={() => handleChallengeResponse(false)}
              style={{
                flex: 1,
                padding: '1.2rem',
                borderRadius: '1rem',
                border: '1px solid #e8e4de',
                background: 'white',
                fontFamily: "'Zen Maru Gothic', sans-serif",
                fontSize: '1rem',
                color: '#8a8a8a',
                cursor: 'pointer'
              }}
            >
              むずかしかった
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div style={{ padding: '2rem 1.5rem', minHeight: '100vh' }}>
        {challengeComment && (
          <div style={{
            background: 'linear-gradient(135deg, #fdf8f3 0%, #faf9f7 100%)',
            borderRadius: '1.2rem',
            padding: '1.5rem',
            marginBottom: '2rem',
            borderLeft: '4px solid #c9a87c'
          }}>
            <p style={{
              fontFamily: "'Zen Maru Gothic', sans-serif",
              fontSize: '0.95rem',
              color: '#6a6a6a',
              lineHeight: '1.8',
              margin: 0
            }}>
              {challengeComment}
            </p>
          </div>
        )}

        <p style={{
          fontFamily: "'Zen Maru Gothic', sans-serif",
          fontSize: '0.95rem',
          color: '#7a7a7a',
          lineHeight: '1.8',
          marginBottom: '2rem'
        }}>
          心を落ち着ける瞑想で<br/>
          一日を締めくくりましょう。
        </p>

        <p style={{
          fontFamily: "'Zen Maru Gothic', sans-serif",
          fontSize: '0.85rem',
          color: '#9ab8a8',
          marginBottom: '1rem'
        }}>瞑想時間を選んでください</p>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem' }}>
          {timeOptions.map(time => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              style={{
                flex: 1,
                padding: '1.5rem 1rem',
                borderRadius: '1rem',
                border: selectedTime === time ? '2px solid #a8c5b5' : '1px solid #e8e4de',
                background: selectedTime === time ? '#f5faf7' : 'white',
                fontFamily: "'Zen Maru Gothic', sans-serif",
                fontSize: '1.1rem',
                color: '#5a5a5a',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {time}分
            </button>
          ))}
        </div>

        <button
          onClick={() => setStep(3)}
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, #a8c5b5 0%, #7fadab 100%)',
            border: 'none',
            padding: '1.2rem',
            borderRadius: '2rem',
            color: 'white',
            fontFamily: "'Zen Maru Gothic', sans-serif",
            fontSize: '1rem',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(168, 197, 181, 0.3)'
          }}
        >
          瞑想をはじめる
        </button>
      </div>
    );
  }

  // 瞑想導入画面
  if (step === 3) {
    return (
      <div style={{ 
        padding: '2rem 1.5rem', 
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #f5faf7 0%, #f0f5f2 100%)'
      }}>
        <p style={{
          fontFamily: "'Zen Maru Gothic', sans-serif",
          fontSize: '0.85rem',
          color: '#9ab8a8',
          textAlign: 'center',
          marginBottom: '0.5rem'
        }}>Day {day}</p>
        <h2 style={{
          fontFamily: "'Zen Maru Gothic', sans-serif",
          fontSize: '1.2rem',
          fontWeight: '400',
          color: '#5a5a5a',
          textAlign: 'center',
          marginBottom: '3rem'
        }}>おやすみ前の瞑想</h2>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '1.2rem',
            padding: '1.5rem',
            boxShadow: '0 2px 15px rgba(0,0,0,0.03)'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <span style={{ fontSize: '1.5rem' }}>🧘</span>
              <div>
                <p style={{
                  fontFamily: "'Zen Maru Gothic', sans-serif",
                  fontSize: '1rem',
                  fontWeight: '400',
                  color: '#5a5a5a',
                  marginBottom: '0.5rem'
                }}>心地よい姿勢をとる</p>
                <p style={{
                  fontFamily: "'Zen Maru Gothic', sans-serif",
                  fontSize: '0.9rem',
                  color: '#8a8a8a',
                  lineHeight: '1.7',
                  margin: 0
                }}>
                  座っても、横になっても大丈夫。<br/>
                  背筋をそっと伸ばして、<br/>
                  肩の力を抜きましょう。
                </p>
              </div>
            </div>
          </div>

          <div style={{
            background: 'white',
            borderRadius: '1.2rem',
            padding: '1.5rem',
            boxShadow: '0 2px 15px rgba(0,0,0,0.03)'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <span style={{ fontSize: '1.5rem' }}>🌬️</span>
              <div>
                <p style={{
                  fontFamily: "'Zen Maru Gothic', sans-serif",
                  fontSize: '1rem',
                  fontWeight: '400',
                  color: '#5a5a5a',
                  marginBottom: '0.5rem'
                }}>呼吸に意識を向ける</p>
                <p style={{
                  fontFamily: "'Zen Maru Gothic', sans-serif",
                  fontSize: '0.9rem',
                  color: '#8a8a8a',
                  lineHeight: '1.7',
                  margin: 0
                }}>
                  鼻から吸って、口からゆっくり吐く。<br/>
                  空気が体を流れる感覚を<br/>
                  ただ感じてみてください。
                </p>
              </div>
            </div>
          </div>

          <div style={{
            background: 'white',
            borderRadius: '1.2rem',
            padding: '1.5rem',
            boxShadow: '0 2px 15px rgba(0,0,0,0.03)'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <span style={{ fontSize: '1.5rem' }}>🌙</span>
              <div>
                <p style={{
                  fontFamily: "'Zen Maru Gothic', sans-serif",
                  fontSize: '1rem',
                  fontWeight: '400',
                  color: '#5a5a5a',
                  marginBottom: '0.5rem'
                }}>今日の自分を労う</p>
                <p style={{
                  fontFamily: "'Zen Maru Gothic', sans-serif",
                  fontSize: '0.9rem',
                  color: '#8a8a8a',
                  lineHeight: '1.7',
                  margin: 0
                }}>
                  一日がんばった自分に<br/>
                  「おつかれさま」と<br/>
                  心の中で伝えてあげて。
                </p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => setStep(4)}
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, #a8c5b5 0%, #7fadab 100%)',
            border: 'none',
            padding: '1.2rem',
            borderRadius: '2rem',
            color: 'white',
            fontFamily: "'Zen Maru Gothic', sans-serif",
            fontSize: '1rem',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(168, 197, 181, 0.3)'
          }}
        >
          準備ができました
        </button>
      </div>
    );
  }

  // 瞑想タイマー
  if (step === 4) {
    return (
      <div style={{ 
        padding: '2rem 1.5rem', 
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #f5faf7 0%, #f0f5f2 100%)'
      }}>
        <p style={{
          fontFamily: "'Zen Maru Gothic', sans-serif",
          fontSize: '0.85rem',
          color: '#9ab8a8',
          textAlign: 'center',
          marginBottom: '0.5rem'
        }}>Day {day}</p>
        <h2 style={{
          fontFamily: "'Zen Maru Gothic', sans-serif",
          fontSize: '1.2rem',
          fontWeight: '400',
          color: '#5a5a5a',
          textAlign: 'center',
          marginBottom: '1rem'
        }}>おやすみ前の瞑想</h2>

        <MeditationTimer 
          minutes={selectedTime} 
          onComplete={onComplete}
          onCancel={onComplete}
        />
      </div>
    );
  }
}

// 完了画面
function CompleteScreen({ type, day, userName, onHome, onNextDay }) {
  const isMorning = type === 'morning';
  const isLastDay = day === 7;

  return (
    <div style={{ 
      padding: '2rem 1.5rem', 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: isMorning 
        ? 'linear-gradient(180deg, #fef9f5 0%, #faf9f7 100%)'
        : 'linear-gradient(180deg, #f0f5f2 0%, #faf9f7 100%)'
    }}>
      <div style={{ 
        fontSize: '4rem', 
        marginBottom: '2rem',
        animation: 'fadeIn 1s ease'
      }}>
        {isMorning ? '🌸' : '🌙'}
      </div>

      <h2 style={{
        fontFamily: "'Zen Maru Gothic', sans-serif",
        fontSize: '1.3rem',
        fontWeight: '400',
        color: '#5a5a5a',
        textAlign: 'center',
        marginBottom: '1rem'
      }}>
        {isMorning 
          ? `${userName}さん、すてきな一日を` 
          : `${userName}さん、おやすみなさい`}
      </h2>

      <p style={{
        fontFamily: "'Zen Maru Gothic', sans-serif",
        fontSize: '0.95rem',
        color: '#a8a8a8',
        textAlign: 'center',
        lineHeight: '1.8',
        marginBottom: '3rem'
      }}>
        {isMorning
          ? 'Day ' + day + ' の朝のワークが完了しました'
          : 'Day ' + day + ' のワークが完了しました'}
      </p>

      <button
        onClick={onHome}
        style={{
          width: '200px',
          background: isMorning ? '#c9b99a' : '#a8c5b5',
          border: 'none',
          padding: '1rem',
          borderRadius: '2rem',
          color: 'white',
          fontFamily: "'Zen Maru Gothic', sans-serif",
          fontSize: '1rem',
          cursor: 'pointer',
          marginBottom: '1rem'
        }}
      >
        ホームへ
      </button>

      {!isMorning && !isLastDay && (
        <button
          onClick={onNextDay}
          style={{
            background: 'transparent',
            border: 'none',
            fontFamily: "'Zen Maru Gothic', sans-serif",
            fontSize: '0.9rem',
            color: '#a8a8a8',
            cursor: 'pointer'
          }}
        >
          Day {day + 1} へ進む →
        </button>
      )}

      {!isMorning && isLastDay && (
        <p style={{
          fontFamily: "'Zen Maru Gothic', sans-serif",
          fontSize: '0.95rem',
          color: '#a8c5b5',
          textAlign: 'center',
          marginTop: '1rem'
        }}>
          🎉 7日間のプログラム完了！
        </p>
      )}
    </div>
  );
}

// メインApp
export default function App() {
  const [screen, setScreen] = useState('onboarding');
  const [currentDay, setCurrentDay] = useState(1);
  const [userName, setUserName] = useState('');
  const [records, setRecords] = useState([]);

  const handleOnboardingComplete = (name) => {
    setUserName(name);
    setScreen('home');
  };

  const handleSaveRecord = (record) => {
    setRecords(prev => [...prev, record]);
  };

  return (
    <div style={{
      maxWidth: '420px',
      margin: '0 auto',
      background: '#faf9f7',
      minHeight: '100vh',
      fontFamily: "'Zen Maru Gothic', sans-serif"
    }}>
      {screen === 'onboarding' && (
        <OnboardingScreen onComplete={handleOnboardingComplete} />
      )}

      {screen === 'home' && (
        <HomeScreen 
          userName={userName}
          currentDay={currentDay}
          onStartMorning={() => setScreen('morning')}
          onStartEvening={() => setScreen('evening')}
          onViewRecords={() => setScreen('records')}
          recordsCount={records.length}
        />
      )}

      {screen === 'records' && (
        <RecordsScreen
          records={records}
          userName={userName}
          onBack={() => setScreen('home')}
        />
      )}

      {screen === 'morning' && (
        <MorningScreen 
          day={currentDay}
          userName={userName}
          onBack={() => setScreen('home')}
          onComplete={() => setScreen('morning-complete')}
          onSaveRecord={handleSaveRecord}
        />
      )}

      {screen === 'evening' && (
        <EveningScreen 
          day={currentDay}
          userName={userName}
          onBack={() => setScreen('home')}
          onComplete={() => setScreen('evening-complete')}
          onSaveRecord={handleSaveRecord}
        />
      )}

      {screen === 'morning-complete' && (
        <CompleteScreen 
          type="morning"
          day={currentDay}
          userName={userName}
          onHome={() => setScreen('home')}
        />
      )}

      {screen === 'evening-complete' && (
        <CompleteScreen 
          type="evening"
          day={currentDay}
          userName={userName}
          onHome={() => setScreen('home')}
          onNextDay={() => {
            setCurrentDay(d => Math.min(d + 1, 7));
            setScreen('home');
          }}
        />
      )}
    </div>
  );
}
