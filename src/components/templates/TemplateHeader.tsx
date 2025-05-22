
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type TemplateHeaderProps = {
  setActiveTab: (tab: string) => void;
};

const TemplateHeader = ({ setActiveTab }: TemplateHeaderProps) => {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto max-w-5xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
          Showcase Your Vision with Beautiful Templates
        </h1>
        <p className="text-xl mb-10 max-w-3xl mx-auto">
          Choose from our collection of professionally designed, water-inspired templates that make your Droplink profile stand out.
        </p>
        <Tabs defaultValue="all" className="max-w-3xl mx-auto" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-8">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="premium">Premium</TabsTrigger>
            <TabsTrigger value="minimalist">Minimal</TabsTrigger>
            <TabsTrigger value="creator">Creator</TabsTrigger>
            <TabsTrigger value="business">Business</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </section>
  );
};

export default TemplateHeader;
