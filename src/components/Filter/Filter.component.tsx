import React, { useState } from "react";
import { Box, Paper } from "@mui/material";

import { Paragraph } from "../Paragraph/Paragraph.component";
import { Modal } from "../Modal/Modal.component";
import { Divider } from "../Divider/Divider.component";
import { SearchBar } from "../SearchBar/SearchBar.component";
import { Icon } from "../Icon/Icon.component";
import { IconButton } from "../IconButton/IconButton.component";
import { Chip } from "../Chip/Chip.component";
import { Button } from "../Button/Button.component";
import { Range } from "../Range/Range.component";
import { Switch } from "../Switch/Switch.component";
import { Loader } from "../Loader/Loader.component";
import { Slider } from "../Slider/Slider.component";
import { showToast } from "../Toaster/Toaster.component";
import { Wrapper } from "../Wrapper/Wrapper.component";

interface FilterProps {
  type: "trip" | "place" | "hotel" | "country";
  filter?: boolean;
  searchByName: (name: string) => void;
  countries?: { value: string; other: any }[];
  places?: { value: string; other: any }[];
  defaultMin?: number;
  defaultMax?: number;
  selectCountry?: (countryName: string) => Promise<any>;
  apply: (params: string) => void;
  onCloseFilter?: () => void;
  onCloseSearch?: () => Promise<void> | void;
}

export const Filter: React.FC<FilterProps> = ({ type, defaultMin, defaultMax, searchByName, countries, selectCountry, places, apply, filter = false, onCloseFilter, onCloseSearch }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedPlaces, setSelectedPlaces] = useState<{ name: string; placeId: number }[]>([]);
  const [prices, setPrices] = useState<number[]>([defaultMin || 10, defaultMax || 10000]);
  const [placesFilter, setPlacesFilter] = useState<boolean>(true);
  const [priceFilter, setPriceFilter] = useState<boolean>(false);
  const [dateFilter, setDateFilter] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [loadingPlaces, setLoadingPlaces] = useState<boolean>(false);
  const [dates, setDates] = useState<string[]>([]);
  const [showSectionFilter, setShowSectionFilter] = useState<boolean>(false);

  const handlerCountry = async (countryName: string) => {
    if (selectCountry) {
      setLoadingPlaces(true);
      await selectCountry(countryName);
      setLoadingPlaces(false);
    }
  };

  const handlerSelect = (value: string) => {
    if (selectedPlaces.find((p) => p.name === value)) {
      return;
    }

    const place = places?.find((p) => p.value === value);

    if (place) {
      setSelectedPlaces([...selectedPlaces, { name: value, placeId: place.other.id }]);
    }
  };

  const handlerDelete = (value: string) => {
    const newItems = selectedPlaces.filter((place) => place.name !== value);
    setSelectedPlaces(newItems);
  };

  const applyFilter = () => {
    switch (type) {
      case "trip":
        let params = "";
        let searchParams = new URLSearchParams();

        if (placesFilter) {
          if (selectedPlaces.length === 0) {
            showToast({ message: "Debe seleccionar al menos un destino si desea filtrar por destinos", type: "info" });
            return;
          }
          searchParams.append("places", selectedPlaces.map((p) => p.placeId).join(","));
        }

        if (priceFilter) {
          searchParams.append("minPrice", prices[0].toString());
          searchParams.append("maxPrice", prices[1].toString());
        }

        if (dateFilter) {
          if (dates.length === 0) {
            showToast({ message: "Seleccione un rango de fechas si desea buscar por fechas", type: "info" });
            return;
          }
          searchParams.append("start", dates[0]);
          searchParams.append("end", dates[1]);
        }
        params = searchParams.toString();

        setOpen(false);
        setShowSectionFilter(true);
        apply(params);
        break;
      default:
        break;
    }
  };

  const customFilter = () => {
    switch (type) {
      case "trip":
        return (
          <Box sx={{ display: "flex", flexDirection: "column", rowGap: 4 }}>
            <Box>
              <Box sx={{ display: "flex", columnGap: 1, alignItems: "center" }}>
                <Switch onChange={(value) => setPlacesFilter(value)} checked={placesFilter} />
                <Paragraph text={"Destinos: "} fontWeight={"bold"} />
              </Box>
              <>
                {placesFilter && (
                  <Box sx={{ display: "flex", flexDirection: "column", rowGap: 1, pt: 1.5 }}>
                    <Box sx={{ display: "flex", columnGap: 2 }}>
                      <SearchBar items={countries} placeholder="País" onSelect={(value) => handlerCountry(value)} />
                      {loadingPlaces ? <Loader /> : <SearchBar items={places?.map((p) => ({ value: p.value }))} placeholder="Lugares" onSelect={(value) => handlerSelect(value)} />}
                    </Box>
                    <Box display={"flex"} flexDirection={"row"} columnGap={1}>
                      {selectedPlaces.map((place) => (
                        <Chip key={place.placeId} label={place.name} onDelete={() => handlerDelete(place.name)} color="default" />
                      ))}
                    </Box>
                  </Box>
                )}
              </>
            </Box>
            <Box>
              <Box sx={{ display: "flex", columnGap: 1, alignItems: "center" }}>
                <Switch onChange={(value) => setPriceFilter(value)} checked={priceFilter} />
                <Paragraph text={"Rango de precios"} fontWeight={"bold"} />
              </Box>
              {priceFilter && (
                <>
                  <Paper sx={{ px: 4, mt: 3 }}>
                    <Slider
                      sx={{ my: 3 }}
                      min={10}
                      max={99999}
                      value={prices}
                      onChange={(e, value) => setPrices(value as number[])}
                      marks={[
                        { value: defaultMin || 10, label: `$${defaultMin || 10}` },
                        { value: 99999, label: `$99999` },
                      ]}
                    />
                    <Paragraph text={"Desde $" + prices[0] + " Hasta los $" + prices[1]} />
                  </Paper>
                </>
              )}
            </Box>
            <Box>
              <Box sx={{ display: "flex", columnGap: 1, alignItems: "center" }}>
                <Switch onChange={(value) => setDateFilter(value)} checked={dateFilter} />
                <Paragraph text={"Rango de fechas"} fontWeight={"bold"} />
              </Box>
              {dateFilter && (
                <Box sx={{ display: "flex", flexDirection: "column", rowGap: 2, pt: 1.5 }}>
                  <Range format="YYYY-MM-DD" onChange={(dateStrings) => setDates(dateStrings)} />
                  {dates.length > 0 && dates[0] !== "" && dates[1] !== "" && <Paragraph text={"Desde el " + dates[0] + " hasta el " + dates[1]} color="GrayText" />}
                </Box>
              )}
            </Box>
            <Box>
              <Button title="Aplicar" onClick={applyFilter} disabled={!placesFilter && !priceFilter && !dateFilter} />
            </Box>
          </Box>
        );
      default:
        return <div>default</div>;
    }
  };
  const reset = () => {
    setPlacesFilter(true);
    setPriceFilter(false);
    setDateFilter(false);
    setShowSectionFilter(false);
    setPrices([defaultMin || 10, defaultMax || 10000]);
    setSelectedPlaces([]);
    setDates([]);
  };
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", rowGap: 1, py: 2 }}>
        <Box sx={{ display: "flex", columnGap: 2, alignItems: "center" }}>
          <SearchBar placeholder="Buscar por nombre" onChange={(value) => setName(value)} onClose={onCloseSearch} />
          <Button
            title="Buscar"
            onClick={() => {
              reset();
              searchByName(name);
            }}
            color="inherit"
            size="small"
          />
          {filter && (
            <IconButton
              icon={<Icon type="FILTER" />}
              onClick={() => {
                reset();
                setOpen(true);
              }}
            />
          )}
        </Box>
        {showSectionFilter && (
          <Wrapper sx={{ p: 2, mb: 1 }}>
            <Paragraph text={"Filtros"} fontWeight={"bold"} color="primary" />
            <Box sx={{ display: "flex", columnGap: 2, alignItems: "center" }}>
              {placesFilter && (
                <Box sx={{ display: "flex", alignItems: "center", columnGap: 1 }}>
                  <Paragraph text={"Destino: "} fontWeight={"bold"} color="primary" />
                  <Box display={"flex"} flexDirection={"row"} columnGap={1}>
                    {selectedPlaces.map((place) => (
                      <Chip key={place.placeId} label={place.name} color="default" />
                    ))}
                  </Box>
                </Box>
              )}
              {priceFilter && (
                <Box sx={{ display: "flex", alignItems: "center", columnGap: 1 }}>
                  <Paragraph text={"Rango de precio: "} fontWeight={"bold"} color="primary" />
                  <Paragraph text={"Desde $" + prices[0] + " hasta $" + prices[1]} />
                </Box>
              )}
              {dateFilter && (
                <Box sx={{ display: "flex", alignItems: "center", columnGap: 1 }}>
                  <Paragraph text={"Fechas:"} fontWeight={"bold"} color="primary" />
                  <Paragraph text={"Desde el " + dates[0] + " hasta el " + dates[1]} color="GrayText" />
                </Box>
              )}
            </Box>
            <Button title="limpiar" onClick={() => reset()} size="small" style={{ mt: 1 }} />
          </Wrapper>
        )}
        <Divider />
      </Box>
      <Modal
        title="Filtro personalizado"
        open={open}
        onClose={() => {
          setOpen(false);
          onCloseFilter && onCloseFilter();
        }}
        fullWidth>
        {customFilter()}
      </Modal>
    </>
  );
};
