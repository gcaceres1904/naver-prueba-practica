import { Box, Button, Container, IconButton, Typography } from "@mui/material";
import { getRequest } from "../httpService.js";
import PropTypes from "prop-types";
import { CopyAll, FirstPage, PictureAsPdf } from "@mui/icons-material";
import { ContenidoSelectOption } from "./ContenidoSelectOption.jsx";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useCallback, useEffect, useState } from "react";

export const ContenidoQuoteHistory = ({
  setOpen,
  setSeverity,
  setSnackBarMessage,
  setElementoInterno,
  baseURL,
}) => {
  const navigateTourType = async () => {
    setElementoInterno(
      <ContenidoSelectOption
        setOpen={setOpen}
        setSeverity={setSeverity}
        setSnackBarMessage={setSnackBarMessage}
        setElementoInterno={setElementoInterno}
        baseURL={baseURL}
      />,
    );
  };

  const [rows, setRows] = useState([]);

  const fetchQuotes = useCallback(async () => {
    try {
      const userRequest = await getRequest(baseURL, `/quotes`);
      setOpen(false);
      if (userRequest?.data) {
        setRows(userRequest.data);
      }
    } catch (e) {
      console.error(e);
      setSeverity("error");
      setSnackBarMessage(`Error during fetching`);
    }
  }, [baseURL, setOpen, setSeverity, setSnackBarMessage]);

  useEffect(() => {
    fetchQuotes();
  }, [fetchQuotes]);

  const columns = [
    {
      headerName: "DATE",
      field: "date",
      flex: 0.5,
      minWidth: 50,
      headerAlign: "center",
    },
    {
      headerName: "TRAVEL AGENT / TRAVEL AGENCY / OPERATOR / DIRECT",
      field: "travelAgent",
      flex: 1,
      minWidth: 100,
      headerAlign: "center",
    },
    {
      headerName: "USER CREATOR",
      field: "userCreator",
      flex: 1,
      minWidth: 100,
      headerAlign: "center",
    },
    {
      headerName: "QUOTE",
      field: "quote",
      flex: 0.5,
      minWidth: 50,
      headerAlign: "center",
    },
    {
      headerName: "TRAVEL CODE",
      field: "travelCode",
      flex: 0.5,
      minWidth: 50,
      headerAlign: "center",
    },

    {
      headerName: "REFERENCE",
      field: "reference",
      flex: 0.5,
      minWidth: 50,
      headerAlign: "center",
    },

    {
      headerName: "DAYS",
      field: "days",
      flex: 0.5,
      minWidth: 50,
      headerAlign: "center",
    },

    {
      headerName: "ACTIONS",
      field: "actions",
      flex: 1,
      minWidth: 100,
      headerAlign: "center",
      renderCell: () => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <IconButton>
            <PictureAsPdf />
          </IconButton>
          <IconButton>
            <CopyAll />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid gold",
          width: "100%",
        }}
      >
        <Button
          variant="text"
          color="white"
          size="small"
          startIcon={<FirstPage fontSize={"large"} color={"white"} />}
          onClick={navigateTourType}
          sx={{ alignSelf: "flex-start" }}
        >
          <Typography variant={"h6"}>Tour Type</Typography>
        </Button>

        <Typography variant={"h4"} sx={{ marginLeft: "auto" }}>
          QUOTE HISTORY
        </Typography>
      </Box>

      <Container
        maxWidth="lg"
        sx={{
          height: "60dvh",
          background:
            "linear-gradient(180deg, rgba(71,71,71,1) 0%, rgba(3,3,3,1) 100%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontSize: "24px",
          border: "1px solid gold",
          borderRadius: "2rem",
          width: "50dvw",
        }}
      >
        <Box
          sx={{
            height: 400,
            width: 1,
            background: "white",
            borderRadius: "5rem",
          }}
        >
          <DataGrid
            rows={rows}
            initialState={{
              filter: {
                filterModel: {
                  items: [],
                },
              },
            }}
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            columns={columns}
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                sx: {
                  backgroundColor: "white",
                },
                showQuickFilter: true,
              },
              footer: {
                sx: {
                  backgroundColor: "white",
                },
              },
            }}
          />
        </Box>
      </Container>
    </Box>
  );
};
ContenidoQuoteHistory.propTypes = {
  setOpen: PropTypes.func,
  setSeverity: PropTypes.func,
  setSnackBarMessage: PropTypes.func,
  baseURL: PropTypes.string,
  setElementoInterno: PropTypes.func,
};
