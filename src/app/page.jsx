import { redirect } from "next/navigation";

export default function Home() {
  redirect("/pages/productos");
  return null;
}