
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type TemplateHeaderProps = {
  setActiveTab: (tab: string) => void;
};

const TemplateHeader = ({ setActiveTab }: TemplateHeaderProps) => {
  return (
    <section className="py-12 px-2 md:px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto max-w-6xl text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
          Showcase Your Vision with Beautiful Templates
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-4xl mx-auto px-4">
          Choose from our collection of professionally designed, water-inspired templates that make your Droplink profile stand out.
        </p>
        <Tabs defaultValue="all" className="max-w-4xl mx-auto" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-6 w-full">
            <TabsTrigger value="all" className="text-xs md:text-sm">All</TabsTrigger>
            <TabsTrigger value="basic" className="text-xs md:text-sm">Basic</TabsTrigger>
            <TabsTrigger value="premium" className="text-xs md:text-sm">Premium</TabsTrigger>
            <TabsTrigger value="minimalist" className="text-xs md:text-sm">Minimal</TabsTrigger>
            <TabsTrigger value="creator" className="text-xs md:text-sm">Creator</TabsTrigger>
            <TabsTrigger value="business" className="text-xs md:text-sm">Business</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </section>
  );
};

export default TemplateHeader;
