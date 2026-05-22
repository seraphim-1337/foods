const slides = document.querySelectorAll('.offer__slide'),
      prev = document.querySelector('.offer__slider-prev'),
      next = document.querySelector('.offer__slider-next'),
      currentNum = document.querySelector('#current'),
      totalNum = document.querySelector('#total');


let slideIndex = 0; 

if (slides.length < 10) {
    totalNum.textContent = `0${slides.length}`;
} else {
    totalNum.textContent = slides.length;
}

function showSlide(index) {
    if (index >= slides.length) {
        slideIndex = 0;
    }
    if (index < 0) {
        slideIndex = slides.length - 1;
    }

    slides.forEach(slide => {
        slide.classList.remove('show', 'fade');
        slide.classList.add('hide'); 
    });

    slides[slideIndex].classList.add('show', 'fade');
    slides[slideIndex].classList.remove('hide');


    if (slideIndex + 1 < 10) {
        currentNum.textContent = `0${slideIndex + 1}`;
    } else {
        currentNum.textContent = slideIndex + 1;
    }
}

showSlide(slideIndex);

next.onclick = () => {
    slideIndex++;
    showSlide(slideIndex);
};

prev.onclick = () => {
    slideIndex--;
    showSlide(slideIndex);
};

let currentGender = 'female'; 
let currentActivityCoef = 1.375; 


function selectGender(gender) {
    document.getElementById('female').classList.remove('calculating__choose-item_active');
    document.getElementById('male').classList.remove('calculating__choose-item_active');
    
    document.getElementById(gender).classList.add('calculating__choose-item_active');
    
    currentGender = gender;
    calculateCalorie();
}

function selectActivity(id, coefficient) {
    const activities = ['low', 'small', 'medium', 'high'];
    
    activities.forEach(act => {
        document.getElementById(act).classList.remove('calculating__choose-item_active');
    });
    

    document.getElementById(id).classList.add('calculating__choose-item_active');
    
    currentActivityCoef = coefficient;
    calculateCalorie();
}


function calculateCalorie() {
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const age = parseFloat(document.getElementById('age').value);
    const resultDisplay = document.getElementById('calorie-result');

    if (!height || !weight || !age || height <= 0 || weight <= 0 || age <= 0) {
        resultDisplay.textContent = '0';
        return;
    }

    let bmr; 
    if (currentGender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    const totalCalories = Math.round(bmr * currentActivityCoef);

    resultDisplay.textContent = totalCalories;
}