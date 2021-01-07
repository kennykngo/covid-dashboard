import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import React from "react";

export default function RadioButtonsGroup({
  selectedCase,
  setCurrentCase,
  globalCaseArr,
}) {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Global COVID Update</FormLabel>
      <RadioGroup
        aria-label="covid-update"
        name="covid-update"
        value={selectedCase}
        onChange={setCurrentCase}
        onClick={console.log(selectedCase)}
        className="d-flex"
      >
        {globalCaseArr.map((d) => (
          <FormControlLabel value={d} control={<Radio />} label={d} />
        ))}
        {/* <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" /> */}
      </RadioGroup>
    </FormControl>
  );
}
