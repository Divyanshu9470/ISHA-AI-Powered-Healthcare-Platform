import { NavbarStudent } from "@/components/layout/NavbarStudent";
import { FooterStudent } from "@/components/layout/FooterStudent";

export default function StudentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen">
            <NavbarStudent />
            <main className="flex-grow pt-20">
                {children}
            </main>
            <FooterStudent />
        </div>
    );
}
