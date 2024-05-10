export const ConversionUtils = (() => {
  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Add a leading zero if month is less than 10
    const day = String(date.getDate()).padStart(2, "0"); // Add a leading zero if day is less than 10
    return `${year}-${month}-${day}`;
  };

  return { getCurrentDate }
})();
