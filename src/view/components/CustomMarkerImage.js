import { Image } from "react-native";

// CustomMarkerImage gibt für jeden möglichen geochachName (Parameter) das passende MarkerImage aus assets zurück
// falls kein passendes Image zu geochachName gefunden wurde, wird nichts zurückgegeben und der Standard Marker verwendet
const CustomMarkerImage = ({ geochachName }) => {
  const size = 36;

  switch (geochachName) {
    case "lightbulb":
      return (
        <Image
          source={require("../../../assets/lightbulb.png")}
          style={{ width: size, height: size }}
        />
      );
    case "anchor":
      return (
        <Image
          source={require("../../../assets/anchor.png")}
          style={{ width: size, height: size }}
        />
      );
    case "rocket":
      return (
        <Image
          source={require("../../../assets/rocket.png")}
          style={{ width: size, height: size }}
        />
      );
    case "chair":
      return (
        <Image
          source={require("../../../assets/chair.png")}
          style={{ width: size, height: size }}
        />
      );
    case "coffee_maker":
      return (
        <Image
          source={require("../../../assets/coffee_maker.png")}
          style={{ width: size, height: size }}
        />
      );
    case "watch":
      return (
        <Image
          source={require("../../../assets/watch.png")}
          style={{ width: size, height: size }}
        />
      );
    case "trolley":
      return (
        <Image
          source={require("../../../assets/trolley.png")}
          style={{ width: size, height: size }}
        />
      );
    case "oil_barrel":
      return (
        <Image
          source={require("../../../assets/oil_barrel.png")}
          style={{ width: size, height: size }}
        />
      );
    case "palette":
      return (
        <Image
          source={require("../../../assets/palette.png")}
          style={{ width: size, height: size }}
        />
      );
    case "egg":
      return (
        <Image
          source={require("../../../assets/egg.png")}
          style={{ width: size, height: size }}
        />
      );
    default:
      return;
  }
};

export default CustomMarkerImage;
