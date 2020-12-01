import * as React from "react"
import Svg, { Path } from "react-native-svg"

import { useTheme } from "../themes"

const theme = useTheme()

function HeaderWave1(props) {
  return (
    <Svg {...props}>
      <Path
        fill={theme.background} fillOpacity={0.1}
        d="M0 96l48 32c48 32 144 96 240 96s192-64 288-90.7c96-26.3 192-16.3 288 16 96 31.7 192 85.7 288 90.7s192-37 240-58.7l48-21.3v160H0z"
      />
    </Svg>
  )
}

export default HeaderWave1
