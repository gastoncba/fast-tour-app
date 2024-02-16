export const StorageService = (() => {
  const saveToken = (at: string) => {
    localStorage.setItem("at", at);
  };

  const deleteTokens = () => {
    localStorage.removeItem("at");
  };

  const getTokens = (): Promise<{ at: string }> => {
    return new Promise(async (resolve, reject) => {
      const at = localStorage.getItem("at");
      at ? resolve({ at: at }) : reject({ code: "TOKENS-NOT-FOUND" });
    });
  };

  return { saveToken, getTokens, deleteTokens };
})();
