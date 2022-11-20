// 分數
let score = 0
// 剩餘秒數
let countdown = 0
// 計時器
let timer = 0

const highscore = {
  name: '',
  score: 0
}

const storage = localStorage.molegame ? JSON.parse(localStorage.molegame) : { name: '', score: 0 }
$('#text-highscorename').text(highscore.name)
$('#text-highscore').text(highscore.score)

    // 取得地鼠圖片
  const moles = $('img') 
    // // 地鼠隨機在六個坑裡出現
    function show() {
      const Random =  Math.floor(Math.random() * 6);
      const mole = moles.get(Random)
      $(mole).css('display', 'block')
      function hide(){
        $(mole).css('display', 'none')
      }
      setTimeout(hide, 1000)
    }



$('#btn-start').click(function () {
  // 停用開始按鈕
  $(this).attr('disabled', true)
  // 重設
  score = 0
  $('#text-score').text(score)
  countdown = 10
  $('#left-time').text(countdown)
  // 開始遊戲
  timer = setInterval(function () {
    // 倒數
    countdown--
    $('#left-time').text(countdown)



    function start(){
      show()
    }
    setInterval(start, 2000)

    $('img').on('click', function(){
      $(this).addClass('hide').removeClass('show')
      $(this).attr('src', './images/dead-mole.png')
      $(this).fadeTo(1000, 0)
      score++
      $('#text-score').text(score)
    })

    // 時間到
    if (countdown === 0) {
      // 停止倒數
      clearInterval(timer)
      // 清空
      $('#game img').remove()
      // 重新啟用開始按鈕
      console.log(this)
      $('#btn-start').attr('disabled', false)

      Swal.fire({
        icon: 'info',
        title: '時間到',
        text: `你得到${score}分`
      })

      if (score > highscore.score) {
        Swal.fire({
          icon: 'info',
          title: '時間到',
          text: `最高分，你得到 ${score} 分`,
          inputPlaceholder: '請輸入名字',
          input: 'text',
          inputAttributes: {
            required: true
          },
          validationMessage: '名稱必填',
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then(result => {
          highscore.score = score
          highscore.name = result.value
          $('#text-highscorename').text(highscore.name)
          $('#text-highscore').text(highscore.score)
          //JSON.stringify可將變數轉成文字 因為localStorage只能放文字，上限5Mb
          //JSON.parse可將文字轉回變數
          // localStorage.setItem('zombiegame', JSON.stringify(highscore))
          localStorage.zombiegame = JSON.stringify(highscore)
        })
      } else {
        Swal.fire({
          icon: 'info',
          title: '時間到',
          text: `你得到 ${score} 分`
        })
      }
    }
  }, 1000)
})




// document.getElementById("btn-start").addEventListener("click", function ()

// // (async () => {
// // const { value: fruit } = await Swal.fire({

// // 選擇打不同角色的選單（套用sweet-alert樣式）
// {

//   Swal.fire({
//     title: 'Select WHO you\n want to 👊whack',
//     input: 'select',
//     inputOptions: {
//       'c&p': '🪓Rodya',
//       'devil': '🔫Pyotr',
//       'tbk': '🎸Smerdyakov'
//     },
//     inputPlaceholder: 'Select a character',
//     showCancelButton: true,
//     inputValidator: (value) => {
//       return new Promise((resolve) => {
//         if (value === 'Rodya' || 'Pyotr' || 'Smerdyakov') {
//           resolve()
//         } else {
//           resolve('You need to select a character :)')
//         }
//       })
//     }
//   })

// })


