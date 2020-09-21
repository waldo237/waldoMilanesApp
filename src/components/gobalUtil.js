/* eslint-disable no-bitwise */
/* eslint-disable no-mixed-operators */
const uuidv4 = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
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
  return (localStorage.getItem('auth_access_token'))
    ? localStorage.getItem('auth_access_token')
    : sessionStorage.getItem('auth_access_token');
}

export { uuidv4, ColorFactory, getTokenFromLocalStorage };