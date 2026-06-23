import { NavbarClinical } from "@/components/layout/NavbarClinical";
import { FooterClinical } from "@/components/layout/FooterClinical";

export default function ClinicalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen">
            <NavbarClinical />
            <main className="flex-grow pt-20">
                {children}
            </main>
            <FooterClinical />
        </div>
    );
}
