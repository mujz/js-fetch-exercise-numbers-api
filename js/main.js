document.addEventListener('DOMContentLoaded', function() {
  const searchForm = document.querySelector('#search-form')
  const numberInput = document.querySelector('#search')
  const answerNode = document.querySelector('#answer')
  const typeInput = document.querySelector('#type-input')
  
  function readInputValues() {
    return {
      number: numberInput.value.trim() || 'random',
      type: typeInput.value
    }
  }

  function showLoading() {
    answerNode.innerText = 'Loading ...'
    answerNode.classList.remove('danger')
  }

  function fetchAnswer(inputValues) {
    return fetch(`http://numbersapi.com/${inputValues.number}/${inputValues.type}`)
      .then(function(response) {
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        return response.text();
      })
  }

  function showAnswer(answer) {
    answerNode.innerText = answer
  }

  function showError(err) {
    answerNode.classList.add('danger')
    answerNode.innerText = err.message
  }

  searchForm.addEventListener('submit', function(event) {
    event.preventDefault()
    showLoading()
    const inputValues = readInputValues()
    fetchAnswer(inputValues)
      .then(function(answer) { showAnswer(answer) })
      .catch(function (err) { showError(err) })
  })
})