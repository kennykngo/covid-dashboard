import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

export default function RadioButtonsGroup({
  selectedCase,
  setCurrentCase,
  globalCaseArr,
}) {
  const [value, setValue] = React.useState(selectedCase);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Global COVID Update</FormLabel>
      <RadioGroup
        aria-label="gender"
        name="gender1"
        value={selectedCase}
        onChange={setCurrentCase}
        onClick={console.log(selectedCase)}
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
