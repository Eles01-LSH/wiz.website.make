import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VoucherHero from "@/components/voucher/VoucherHero";
import OfficialServices from "@/components/voucher/OfficialServices";
import AboutExportVoucher from "@/components/voucher/AboutExportVoucher";
import WhyWizVoucher from "@/components/voucher/WhyWizVoucher";
import VoucherProcess from "@/components/voucher/VoucherProcess";
import ServiceRating from "@/components/voucher/ServiceRating";
import VoucherCTA from "@/components/voucher/VoucherCTA";

export default function VoucherPage() {
  return (
    <>
      <Header />
      <main>
        <VoucherHero />
        <OfficialServices />
        <AboutExportVoucher />
        <WhyWizVoucher />
        <VoucherProcess />
        <ServiceRating />
        <VoucherCTA />
      </main>
      <Footer />
    </>
  );
}
