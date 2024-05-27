export const OpenLink = (() => {
  const getPageInfo = (url: string, target?: string) => {
    window.open(url, target || "_blank");
  };

  return { getPageInfo };
})();
