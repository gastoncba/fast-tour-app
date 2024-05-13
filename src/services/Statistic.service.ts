import { GeneralStatistic, Ranking } from "../models";
import { get } from "./Fetch.service";

const SERVICE_ENDPOINT = "statistics";

export const StatisticServices = (() => {
  const getGeneralStatistics = async () => {
    try {
      const general: GeneralStatistic = await get(SERVICE_ENDPOINT + "/general");
      return general;
    } catch (error) {
      throw newError("GENERAL-STATISTICS-FAIL", error);
    }
  };

  const getRanking = async () => {
    try {
      const ranking: Ranking = await get(SERVICE_ENDPOINT + "/ranking");
      return ranking;
    } catch (error) {
      throw newError("GET-RANKING-FAIL", error);
    }
  };

  const getMonthlyTripCounts = async (year: number) => {
    try {
      const result = await get(SERVICE_ENDPOINT + "/frequency/" + year);
      return result;
    } catch (error) {
      throw newError("GET-TRIP-FREQUENCY-FAIL", error);
    }
  };

  type StatisticServiceError = "GENERAL-STATISTICS-FAIL" | "GET-RANKING-FAIL" | "GET-TRIP-FREQUENCY-FAIL";

  const newError = (code: StatisticServiceError, error?: any) => {
    return {
      code: code,
      error: error,
    };
  };

  return { getGeneralStatistics, getRanking, getMonthlyTripCounts };
})();
