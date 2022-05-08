import React from "react";
import KMenu from "../";

const HoriMenu = () => {

  const { Item } = KMenu
  return (
    <KMenu defaultSelected="one">
      <Item itemKey="one"> Navigation One</Item>
      <Item itemKey="two"> Navigation two</Item>
    </KMenu>
  )
}

export default HoriMenu