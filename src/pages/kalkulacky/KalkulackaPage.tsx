type KalkulackaPageProps = {
  title: string;
};

const KalkulackaPage = ({ title }: KalkulackaPageProps) => (
  <div className="min-h-[40vh]">
    <h1 className="headline-serif text-center md:text-left mb-6">{title}</h1>
  </div>
);

export default KalkulackaPage;
