const BeforeLogin = document.querySelector('#before-login')
const nameInput = document.querySelector('#before-login input')
const menuBtn = document.querySelector('#before-login button')
const AfterLogin = document.querySelector('#after-login')
const userID = document.querySelectorAll('#user-id')


// 방문 경험에 따라 첫페이지 렌더링
const username = localStorage.getItem('username')
if (username) {
  const greeting = document.querySelector('#greeting')
  const greetingInput = document.querySelector('#greeting-input')
  
  BeforeLogin.classList.remove('d-none')
  greeting.classList.remove('d-none')
  greetingInput.classList.add('d-none')
  userID.forEach((user)=>{
    user.innerText = username
  })
} else {
  BeforeLogin.classList.remove('d-none')
  // username 입력 후 메뉴 추천받기 누르면 추천 메뉴 카드 변경
  menuBtn.addEventListener('click', (event) => {
    event.preventDefault()

    localStorage.setItem('username', nameInput.value)
    userID.forEach((user)=>{
      user.innerText = localStorage.getItem('username')
    })
  })
}

menuBtn.addEventListener('click', (event) => {
  event.preventDefault()

  BeforeLogin.classList.add('d-none')
  AfterLogin.classList.remove('d-none')
})
