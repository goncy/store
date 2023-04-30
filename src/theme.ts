import {extendTheme, theme} from "@chakra-ui/react";

export default extendTheme({
  colors: {
    primary: theme.colors[process.env.NEXT_PUBLIC_COLOR as keyof typeof theme.colors],
  },
  components: {
    Radio: {
      parts: ["label"],
      baseStyle: {
        label: {
          width: "100%",
        },
      },
    },
  },
});
