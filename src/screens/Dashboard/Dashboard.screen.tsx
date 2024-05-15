import { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";

import { StatisticServices } from "../../services/Statistic.service";
import { Divider, Heading, Loader, Paragraph, Statistic, Table, TableProps, Tabs, Wrapper, showToast, PopChart, Input, Button } from "../../components";
import { CountryRanking, GeneralStatistic, MonthlyTripCount, PlaceRanking, Ranking, TripRanking } from "../../models";
import { styles } from "../../settings/customStyles.setting";

interface CreateRankingTableStrategy {
  createDataTable(rankings: any[]): TableProps;
}

class CreateTripTableStrategy implements CreateRankingTableStrategy {
  createDataTable(ranking: TripRanking[]): TableProps {
    const columns = [{ title: "Viaje" }, { title: "Descripción" }, { title: "Cantidad de ventas" }];
    const rows = ranking.map((trip) => ({ id: trip.id, items: [{ value: trip.name }, { value: trip.description || "" }, { value: trip.sales_total }] }));
    const table: TableProps = {
      columns,
      rows,
    };
    return table;
  }
}

class CreatePlaceTableStrategy implements CreateRankingTableStrategy {
  createDataTable(ranking: PlaceRanking[]): TableProps {
    const columns = [{ title: "Destino" }, { title: "Cantidad de ventas" }];
    const rows = ranking.map((place) => ({ id: place.id, items: [{ value: place.name }, { value: place.sales_total }] }));
    const table: TableProps = {
      columns,
      rows,
    };
    return table;
  }
}

class CreateCountryTableStrategy implements CreateRankingTableStrategy {
  createDataTable(ranking: CountryRanking[]): TableProps {
    const columns = [{ title: "País" }, { title: "Código" }, { title: "Cantidad de ventas" }];
    const rows = ranking.map((country) => ({ id: country.id, items: [{ value: country.name }, { value: country.code }, { value: country.sales_total }] }));
    const table: TableProps = {
      columns,
      rows,
    };
    return table;
  }
}

interface DashboardProps {}

const GeneralStatisticsEmpty: GeneralStatistic = {
  users: 0,
  orders: 0,
  averageSales: 0,
};

const DataTableEmpty: TableProps = {
  rows: [],
  columns: [],
};

const { red, blueberry, green } = styles.color;

export const DashboardScreen: React.FC<DashboardProps> = () => {
  const [general, setGeneral] = useState<GeneralStatistic>(GeneralStatisticsEmpty);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dataTable, setDataTable] = useState<TableProps>(DataTableEmpty);
  const [ranking, setRanking] = useState<Ranking>({ tripRanking: [], placeRanking: [], countryRanking: [] });
  const [year, setYear] = useState("2024");
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [series, setSeries] = useState<number[]>([]);

  const buildTable = (strategy: CreateRankingTableStrategy, ranking: any[]) => {
    setDataTable(strategy.createDataTable(ranking));
  };

  useEffect(() => {
    const getStatistics = async () => {
      try {
        const general = await StatisticServices.getGeneralStatistics();
        const ranking = await StatisticServices.getRanking();
        const results = await StatisticServices.getMonthlyTripCounts(parseInt(year));
        buildBarData(results);
        setRanking(ranking);
        buildTable(new CreateTripTableStrategy(), ranking.tripRanking);
        setGeneral(general);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        showToast({ message: "Error al cargar las estadisticas", type: "error" });
      }
    };
    getStatistics();
  }, []);

  const handleInput = (inputValue: string) => {
    if (/^\d*$/.test(inputValue)) {
      setYear(inputValue);
    }
  };

  const filterDataByYear = async () => {
    setButtonLoading(true);
    try {
      const results = await StatisticServices.getMonthlyTripCounts(parseInt(year));
      buildBarData(results);
    } catch (error) {
      showToast({ message: "Error al obtener datos para el gráfico de barras", type: "error" });
    } finally {
      setButtonLoading(false);
    }
  };

  const buildBarData = (results: MonthlyTripCount[]) => {
    setSeries(results.map((result) => result.tripCount));
    setCategories(results.map((result) => result.month.substring(0, 3)));
  };

  return (
    <>
      <Heading title="Estadisticas" />
      {isLoading ? (
        <Loader sx={{ py: 2 }} />
      ) : (
        <>
          <Grid container columnSpacing={2} rowSpacing={2} sx={{ py: 2 }}>
            <Grid item lg={2} md={4} xs={12}>
              <Statistic value={general.users} title={"Usuarios"} iconType="USERS" iconStyles={{ color: blueberry }} />
            </Grid>
            <Grid item lg={2} md={4} xs={12}>
              <Statistic value={general.orders} title={"Ordenes"} iconType="BAG" iconStyles={{ color: red }} />
            </Grid>
            <Grid item xl={2} lg={3} md={4} xs={12}>
              <Statistic value={general.averageSales} title={"Ventas promedio"} iconType="CHART" iconStyles={{ color: green }} />
            </Grid>
          </Grid>
          <Grid container columnSpacing={2} rowSpacing={2}>
            <Grid item lg={7} xs={12}>
              <Wrapper sx={{ p: 2 }}>
                <Box>
                  <Paragraph text={"Ranking de viajes"} variant="h6" />
                  <Divider />
                </Box>
                <Tabs
                  styles={{ padding: 4 }}
                  items={[
                    { key: "TRIP", label: "Viajes", children: <Table columns={dataTable.columns} rows={dataTable.rows} /> },
                    { key: "PLACE", label: "Destinos", children: <Table columns={dataTable.columns} rows={dataTable.rows} /> },
                    { key: "COUNTRY", label: "Paises", children: <Table columns={dataTable.columns} rows={dataTable.rows} /> },
                  ]}
                  onChange={(key) => {
                    switch (key) {
                      case "TRIP":
                        buildTable(new CreateTripTableStrategy(), ranking.tripRanking);
                        break;
                      case "PLACE":
                        buildTable(new CreatePlaceTableStrategy(), ranking.placeRanking);
                        break;
                      case "COUNTRY":
                        buildTable(new CreateCountryTableStrategy(), ranking.countryRanking);
                        break;
                      default:
                        break;
                    }
                  }}
                />
              </Wrapper>
            </Grid>
            <Grid item lg={5} xs={12}>
              <Wrapper sx={{ p: 2 }}>
                <Box sx={{ display: "flex", flexDirection: "column", rowGap: 1 }}>
                  <Box sx={{ display: "flex", columnGap: 2, alignItems: "center" }}>
                    <Paragraph text={"Año"} variant="h6" />
                    <Input
                      type="text"
                      setValue={handleInput}
                      value={year}
                      inputProps={{
                        maxLength: 4,
                      }}
                      label=""
                      size="small"
                      sx={{ width: "15%" }}
                    />
                    <Button onClick={filterDataByYear} title="Aplicar" disabled={buttonLoading} />
                  </Box>
                  <Divider />
                </Box>
                <PopChart
                  title="Compras por período de tiempo"
                  type="bar"
                  series={[{ data: series }]}
                  categories={categories}
                  width={"100%"}
                  height={290}
                  tooltip={{ customFrequency: "Viajes vendidos" }}
                  plotOptions={{
                    bar: {
                      borderRadius: 7,
                    },
                  }}
                />
              </Wrapper>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};
