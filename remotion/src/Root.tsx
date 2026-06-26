import { Composition } from "remotion";
import { VolfPackAd } from "./VolfPackAd";
import { FPS, DURATION_FRAMES } from "./theme";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="VolfPackAd"
      component={VolfPackAd}
      durationInFrames={DURATION_FRAMES}
      fps={FPS}
      width={1080}
      height={1920}
    />
  );
};
