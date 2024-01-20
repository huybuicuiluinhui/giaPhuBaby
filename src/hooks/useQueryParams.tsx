import { useSearchParams } from "react-router-dom";

export default function useQueryParams() {
  const [searchParams] = useSearchParams();
  // @ts-ignore
  return Object.fromEntries([...searchParams]);
}
