window.addEventListener('DOMContentLoaded', eventHandlers);

function eventHandlers() {
  document.querySelector('.category').addEventListener('mouseenter', displayCategories);
}

function displayCategories(e) {
  //Display category
  const mainMenu = document.querySelector('.hover-category');
  mainMenu.style = 'display: flex';
  
  mainMenu.addEventListener('mouseleave', () => {
    mainMenu.style = 'display: none';

  });

  mainMenu.addEventListener('mouseenter', () => {
    mainMenu.style = 'display: flex'
  });

  document.querySelector('.category').addEventListener('mouseleave', () => {
    mainMenu.style = 'display: none';
  });

  //Display individual sub menus
  subMenuCategory();
}

//Displaying sub menu category
function subMenuCategory() {
  //displaying development menu when hovered
  const developmentMenu = document.querySelector('.hover-development');

  developmentMenu.addEventListener('mouseenter', function(e) {
    document.querySelector('.hover-development-menu').style = 'display: block';
  });

  developmentMenu.addEventListener('mouseleave', function(e) {
    document.querySelector('.hover-development-menu').style = 'display: none';
  });

  //displaying lifestyle menu when hovered
  const lifestyleMenu = document.querySelector('.hover-lifestyle');

  lifestyleMenu.addEventListener('mouseenter', function(e) {
    document.querySelector('.hover-lifestyle-menu').style = 'display: block';
  });

  lifestyleMenu.addEventListener('mouseleave', function(e) {
    document.querySelector('.hover-lifestyle-menu').style = 'display: none';
  });

  //displaying business menu when hovered
  const businessMenu = document.querySelector('.hover-business');

  businessMenu.addEventListener('mouseenter', function(e) {
    document.querySelector('.hover-business-menu').style = 'display: block';
  });

  businessMenu.addEventListener('mouseleave', function(e) {
    document.querySelector('.hover-business-menu').style = 'display: none';
  });

  //displaying IT menu when hovered
  const ITMenu = document.querySelector('.hover-IT');

  ITMenu.addEventListener('mouseenter', function(e) {
    document.querySelector('.hover-IT-menu').style = 'display: block';
  });

  ITMenu.addEventListener('mouseleave', function(e) {
    document.querySelector('.hover-IT-menu').style = 'display: none';
  });

  //displaying office menu when hovered
  const officeMenu = document.querySelector('.hover-office');

  officeMenu.addEventListener('mouseenter', function(e) {
    document.querySelector('.hover-office-menu').style = 'display: block';
  });

  officeMenu.addEventListener('mouseleave', function(e) {
    document.querySelector('.hover-office-menu').style = 'display: none';
  });

  //displaying personal menu when hovered
  const personalMenu = document.querySelector('.hover-personal');

  personalMenu.addEventListener('mouseenter', function(e) {
    document.querySelector('.hover-personal-menu').style = 'display: block';
  });

  personalMenu.addEventListener('mouseleave', function(e) {
    document.querySelector('.hover-personal-menu').style = 'display: none';
  });

  //displaying design menu when hovered
  const designMenu = document.querySelector('.hover-design');

  designMenu.addEventListener('mouseenter', function(e) {
    document.querySelector('.hover-design-menu').style = 'display: block';
  });

  designMenu.addEventListener('mouseleave', function(e) {
    document.querySelector('.hover-design-menu').style = 'display: none';
  });

  //displaying marketing menu when hovered
  const marketingMenu = document.querySelector('.hover-marketing');

  marketingMenu.addEventListener('mouseenter', function(e) {
    document.querySelector('.hover-marketing-menu').style = 'display: block';
  });

  marketingMenu.addEventListener('mouseleave', function(e) {
    document.querySelector('.hover-marketing-menu').style = 'display: none';
  });

  //displaying photography menu when hovered
  const photographyMenu = document.querySelector('.hover-photography');

  photographyMenu.addEventListener('mouseenter', function(e) {
    document.querySelector('.hover-photography-menu').style = 'display: block';
  });

  photographyMenu.addEventListener('mouseleave', function(e) {
    document.querySelector('.hover-photography-menu').style = 'display: none';
  });

  //displaying health menu when hovered
  const healthMenu = document.querySelector('.hover-health');

  healthMenu.addEventListener('mouseenter', function(e) {
    document.querySelector('.hover-health-menu').style = 'display: block';
  });

  healthMenu.addEventListener('mouseleave', function(e) {
    document.querySelector('.hover-health-menu').style = 'display: none';
  });

  //displaying music menu when hovered
  const musicMenu = document.querySelector('.hover-music');

  musicMenu.addEventListener('mouseenter', function(e) {
    document.querySelector('.hover-music-menu').style = 'display: block';
  });

  musicMenu.addEventListener('mouseleave', function(e) {
    document.querySelector('.hover-music-menu').style = 'display: none';
  });

  //displaying teaching menu when hovered
  const teachingMenu = document.querySelector('.hover-teaching');

  teachingMenu.addEventListener('mouseenter', function(e) {
    document.querySelector('.hover-teaching-menu').style = 'display: block';
  });

  teachingMenu.addEventListener('mouseleave', function(e) {
    document.querySelector('.hover-teaching-menu').style = 'display: none';
  });
}
