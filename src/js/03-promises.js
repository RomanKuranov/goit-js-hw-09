import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit)

function onFormSubmit(event) {
  event.preventDefault();

  let delay = +event.currentTarget.elements.delay.value;
  let step = +event.currentTarget.elements.step.value;
  let amount = +event.currentTarget.elements.amount.value;
 

  for (let i =1; i <= amount; i += 1) {
    createPromise(i,delay).then(({position, delay})=>{
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    }).catch(({position, delay})=>{
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
  delay += step;
}
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject)=>{
  setTimeout(()=>{
    if (shouldResolve) {
      resolve({position, delay})
  } else {
    reject({position, delay})
  }
}, delay)
  })
}
