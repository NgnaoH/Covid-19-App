import * as React from "react"
import Svg, { Path } from "react-native-svg"

import { useTheme } from "../themes"

const theme = useTheme()

function HeaderWave2(props) {
  return (
    <Svg {...props}>
      <Path
        fill={theme.background} fillOpacity={0.1}
        d="M0 32l48 10.7C96 53 192 75 288 101.3 384 128 480 160 576 192s192 64 288 58.7c96-5.7 192-47.7 288-90.7s192-85 240-106.7l48-21.3v288H0z"
      />
    </Svg>
  )
}

export default HeaderWave2
