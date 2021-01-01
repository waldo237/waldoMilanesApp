/* eslint-disable no-bitwise */
/* eslint-disable no-mixed-operators */
const uuidv4 = () => {
  if (typeof window !== `undefined`) {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }
}

const ColorFactory = (() => {
  function RandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    this.color = color;
  }

  let instance;
  return {
    getInstance() {
      if (instance == null) {
        instance = new RandomColor();
        instance.constructor = null;
      }
      return instance;
    }
  };
})();

const getTokenFromLocalStorage = () => {
  if (typeof window !== `undefined`) {
    return (localStorage.getItem('auth_access_token'))
      ? localStorage.getItem('auth_access_token')
      : sessionStorage.getItem('auth_access_token');
  }
}
/**
 * @function centerModal centers a modal when you scroll up and down.
 * @param {domElement} domElement 
 */
const centerModal = function (div) {
  if (typeof window !== `undefined`) {
    window.addEventListener('scroll', () => {
      div.style.position = `fixed`;
      div.style.top = `${window.pageYOffset + (div.offsetHeight / 2)}px`
    });
  }
};
export { uuidv4, ColorFactory, getTokenFromLocalStorage, centerModal };