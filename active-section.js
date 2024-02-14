const sections = document.querySelectorAll('section');

document.addEventListener("scroll", (e) => {
  const scroll = window.scrollY;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;

    if (scroll >= top && scroll <= (top + height)) {
      const sectionName = section.getAttribute('id');

      navbarMark(sectionName);    
    }
    return;
  })

})

function navbarMark(sectionName) {
  document.querySelectorAll('nav li')
    .forEach((i) => i.classList.remove('active'));
    
  document.querySelector(`nav li[data-section=${sectionName}]`)
    .classList.add('active');
}