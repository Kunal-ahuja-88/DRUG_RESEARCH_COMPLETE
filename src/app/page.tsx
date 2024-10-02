import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Metadata } from "next";

export const metadata:Metadata = {
  title : "PharmaVerse : a leading research platform for drug discovery",
  description : "this is a description for PharmaVerse"
}

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <p>Hello dashboard page</p>
      </DefaultLayout>
    </>
  );
}