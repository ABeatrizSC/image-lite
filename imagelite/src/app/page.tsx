import { AuthenticatedPage } from "@/components/AuthenticatedPage";
import { Template } from "@/components/Template";
import GaleryPage from "./galery/page";

export default function Home() {
  return (
    <AuthenticatedPage>
        <Template>
            <GaleryPage />
        </Template>
    </AuthenticatedPage>
  )
}
