import { ClipLoader } from "react-spinners";

interface LoaderProps {
  color: string;
  size: number | string;
}

export default function Loader({ color, size }: LoaderProps) {
  return (
    <ClipLoader
      color={color}
      size={size}
      speedMultiplier={0.5}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
}
