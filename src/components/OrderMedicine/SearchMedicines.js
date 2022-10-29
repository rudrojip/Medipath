import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import React, { useEffect, useState } from "react";

const filter = createFilterOptions();

export default function SearchMedicines({filterValue,setFilterValue,  medicines }) {
  
  const [searchList, setSearchList] = useState([]);
  useEffect(() => {
    if (medicines.length) {
      let tempSearchList = searchList;
      medicines.forEach((medicine) => {
        const name = medicine.get("Name").toLowerCase();
        if (tempSearchList.filter((x) => x.title === name).length === 0) {
          tempSearchList.push({ title: name });
        }
      });
      setSearchList(tempSearchList);
    }
  }, [medicines]);
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
