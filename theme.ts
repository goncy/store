import {extendTheme, theme} from "@chakra-ui/react";

import {INFORMATION} from "./app/constants";

export default extendTheme({
  colors: {
    primary: theme.colors[INFORMATION.color],
  },
});
