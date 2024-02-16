import React, { useState } from "react";
import { Box } from "@mui/material";

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
import { Input } from "../Input/Input.component";

interface FilterProps {
  type: "trip" | "place" | "hotel" | "country";
  filter?: boolean;
  searchByName: (name: string) => void;
  countries?: { value: string; other: any }[];
  places?: { value: string; other: any }[];
  selectCountry?: (countryName: string) => Promise<any>;
  apply: (params: string) => void;
  onCloseFilter?: () => void;
  onCloseSearch?: () => Promise<void> | void;
}

export const Filter: React.FC<FilterProps> = ({ type, searchByName, countries, selectCountry, places, apply, filter = false, onCloseFilter, onCloseSearch }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedPlaces, setSelectedPlaces] = useState<{ name: string; placeId: number }[]>([]);
  const [minPrice, setMinPrice] = useState<number>(10);
  const [maxPrice, setMaxPrice] = useState<number>(50);
  const [placesFilter, setPlacesFilter] = useState<boolean>(true);
  const [priceFilter, setPriceFilter] = useState<boolean>(false);
  const [dateFilter, setDateFilter] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [loadingPlaces, setLoadingPlaces] = useState<boolean>(false);
  const [dates, setDates] = useState<string[]>([]);

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
          searchParams.append("places", selectedPlaces.map((p) => p.placeId).join(","));
        }

        if (priceFilter) {
          searchParams.append("minPrice", minPrice.toString());
          searchParams.append("maxPrice", maxPrice.toString());
        }

        if (dateFilter) {
          searchParams.append("start", dates[0]);
          searchParams.append("end", dates[1]);
        }
        params = searchParams.toString();
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
                <Paragraph text={"Lugares: "} fontWeight={"bold"} />
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
                <Box sx={{ display: "flex", flexDirection: "column", rowGap: 1, pt: 1.5 }}>
                  <Box sx={{ display: "flex", columnGap: 2 }}>
                    <Input
                      fullWidth
                      type="number"
                      label="precio minimo"
                      value={minPrice}
                      setValue={(value) => {
                        let min = parseFloat(value);
                        if (isNaN(min)) {
                          setMinPrice(0);
                          return;
                        }
                        if (min <= maxPrice) {
                          setMinPrice(min);
                        } else {
                          setMinPrice(10);
                        }
                      }}
                      size="small"
                      inputProps={{ min: 0, max: maxPrice, step: "0.01" }}
                    />
                    <Input
                      fullWidth
                      type="number"
                      label="precio maximo"
                      value={maxPrice}
                      setValue={(value) => {
                        let max = parseFloat(value);
                        if (isNaN(max)) {
                          setMaxPrice(100);
                          return;
                        }
                        if (max >= minPrice) {
                          setMaxPrice(max);
                        } else {
                          setMaxPrice(100);
                        }
                      }}
                      size="small"
                      inputProps={{ min: minPrice, max: 99999, step: "0.01" }}
                    />
                  </Box>
                  <Paragraph text={minPrice !== maxPrice ? "Desde los USD " + minPrice + " hasta los USD " + maxPrice : "Viajes de USD " + minPrice} color="GrayText" />
                </Box>
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
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", rowGap: 1, py: 2 }}>
        <Box sx={{ display: "flex", columnGap: 2, alignItems: "center" }}>
          <SearchBar placeholder="Buscar por nombre" onChange={(value) => setName(value)} onClose={onCloseSearch} />
          <Button title="Buscar" onClick={() => searchByName(name)} color="inherit" size="small" />
          {filter && <IconButton icon={<Icon type="FILTER" />} onClick={() => setOpen(true)} />}
        </Box>
        <Divider />
      </Box>
      <Modal
        title="Filtro personalizado"
        open={open}
        onClose={() => {
          setOpen(false);
          setPlacesFilter(true);
          setPriceFilter(false);
          setDateFilter(false);
          setMinPrice(10);
          setMaxPrice(50);
          setSelectedPlaces([]);
          setDates([]);
          onCloseFilter && onCloseFilter();
        }}
        fullWidth>
        {customFilter()}
      </Modal>
    </>
  );
};
