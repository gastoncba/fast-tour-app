export const ConversionUtils = (() => {
  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); 
    const day = String(date.getDate()).padStart(2, "0"); 
    return `${year}-${month}-${day}`;
  };

  const trunc = (number: number) => {
    return Math.floor(number * 100) / 100;
  };

  return { getCurrentDate, trunc };
})();
