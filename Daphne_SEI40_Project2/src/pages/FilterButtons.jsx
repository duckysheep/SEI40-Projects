import React from "react";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import skillList from "../data/skillList";

function ToggleButtonGroupControlled({ skillFilter, setSkillFilter }) {
  const skillFilterBtn = skillList.map((ele, i) => {
    return (
      <ToggleButton id={i} value={ele.toLowerCase()} key={ele.toLowerCase()}>
        {ele}
      </ToggleButton>
    );
  });

  const handleChange = (val) => setSkillFilter(val);

  return (
    <ToggleButtonGroup
      type="checkbox"
      value={skillFilter}
      onChange={handleChange}
    >
      {skillFilterBtn}
    </ToggleButtonGroup>
  );
}

export default ToggleButtonGroupControlled;
