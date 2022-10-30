import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import React from "react";

const filter = createFilterOptions();

export default function SearchMedicines({
  filterValue,
  setFilterValue,
  searchList,
}) {
  return (
    <React.Fragment>
      <Autocomplete
        value={filterValue}
        onChange={(_event, newValue) => {
          setFilterValue(newValue);
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          return filtered;
        }}
        id="free-solo"
        options={searchList}
        getOptionLabel={(option) => {
          // e.g value selected with enter, right from the input
          if (typeof option === "string") {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.title;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(props, option) => <li {...props}>{option.title}</li>}
        sx={{ width: "100%" }}
        renderInput={(params) => (
          <TextField {...params} label="Search medicines" />
        )}
      />
    </React.Fragment>
  );
}
