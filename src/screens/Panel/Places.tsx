import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";

import { Heading, Tooltip, IconButton, Icon, Divider, showToast } from "../../components";
import { Place } from "../../models";
import { PlaceService } from "../../services";

interface PlacesProps {}

export const Places: React.FC<PlacesProps> = () => {
  const [places, setPlaces] = useState<Place[]>([]);

  const getPlaces = async () => {
    try {
      let pls = await PlaceService.getPlaces();
      setPlaces(pls);
    } catch (error) {
      showToast("error", "Error al cargar los destinos disponibles");
    }
  };

  useEffect(() => {
    getPlaces();
  }, [])

  return (
    <>
      <Heading title="Destinos disponibles" />
      <Box sx={{ py: 2 }}>
        <Divider />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", pb: 2 }}>
        <Tooltip text="Agregar destino" position="right">
          <Box>
            <IconButton onClick={() => {}} icon={<Icon type="PLUS" />} buttonStyle={{ bgcolor: "primary.main", color: "white", ":hover": { bgcolor: "primary.main", color: "white" } }} />
          </Box>
        </Tooltip>
      </Box>
    </>
  );
};
