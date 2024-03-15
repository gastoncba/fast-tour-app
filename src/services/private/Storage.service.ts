export const StorageService = (() => {
  const saveToken = (at: string) => {
    sessionStorage.setItem("at", at);
  };

  const deleteTokens = () => {
    sessionStorage.removeItem("at");
  };

  const getTokens = (): Promise<{ at: string }> => {
    return new Promise(async (resolve, reject) => {
      const at = sessionStorage.getItem("at");
      at ? resolve({ at: at }) : reject({ code: "TOKENS-NOT-FOUND" });
    });
  };

  return { saveToken, getTokens, deleteTokens };
})();
