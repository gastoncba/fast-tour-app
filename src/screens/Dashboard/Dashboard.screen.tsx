import { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";

import { StatisticServices } from "../../services/Statistic.service";
import { Divider, Heading, Loader, Paragraph, Statistic, Table, TableProps, Tabs, Wrapper, showToast, PopChart } from "../../components";
import { CountryRanking, GeneralStatistic, PlaceRanking, Ranking, TripRanking } from "../../models";

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
export const DashboardScreen: React.FC<DashboardProps> = () => {
  const [general, setGeneral] = useState<GeneralStatistic>(GeneralStatisticsEmpty);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dataTable, setDataTable] = useState<TableProps>(DataTableEmpty);
  const [ranking, setRanking] = useState<Ranking>({ tripRanking: [], placeRanking: [], countryRanking: [] });

  const buildTable = (strategy: CreateRankingTableStrategy, ranking: any[]) => {
    setDataTable(strategy.createDataTable(ranking));
  };

  useEffect(() => {
    const getStatistics = async () => {
      try {
        const general = await StatisticServices.getGeneralStatistics();
        const ranking = await StatisticServices.getRanking();
        await StatisticServices.getMonthlyTripCounts(2024);
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

  return (
    <>
      <Heading title="Estadisticas" />
      {isLoading ? (
        <Loader sx={{ py: 2 }} />
      ) : (
        <>
          <Grid container columnSpacing={2} rowSpacing={2} sx={{ py: 2 }}>
            <Grid item lg={2} md={4} xs={12}>
              <Statistic value={general.users} title={"Usuarios"} iconType="USERS" iconStyles={{ color: "green" }} />
            </Grid>
            <Grid item lg={2} md={4} xs={12}>
              <Statistic value={general.orders} title={"Ordenes"} iconType="BAG" iconStyles={{ color: "red" }} />
            </Grid>
            <Grid item xl={2} lg={3} md={4} xs={12}>
              <Statistic value={general.averageSales} title={"Ventas promedio"} iconType="CHART" iconStyles={{ color: "orange" }} />
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
                <Box>
                  <Paragraph text={"Compras por período de tiempo"} variant="h6" />
                  <Divider />
                </Box>
                <PopChart
                  type="bar"
                  series={[{ data: [12, 10, 20, 10, 10, 12, 7, 5, 23, 12, 12, 33] }]}
                  categories={["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]}
                  width={"100%"}
                  height={270}
                  plotOptions={{
                    bar: {
                      borderRadius: 7,
                    },
                  }}
                  options={{
                    dataLabels: {
                      enabled: true,
                      formatter: function (val) {
                        return val + "%";
                      },
                      offsetY: -20,
                      style: {
                        fontSize: "12px",
                        colors: ["#304758"],
                      },
                    },
                    xaxis: {
                      position: "top"
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
