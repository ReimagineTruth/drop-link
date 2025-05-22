
import TemplateCard from "./TemplateCard";

type Template = {
  id: number;
  name: string;
  category: string;
  image: string;
  popular: boolean;
  new: boolean;
  plan: string;
  colors: string[];
};

type TemplatesGridProps = {
  templates: Template[];
  isLoading?: boolean;
};

const TemplatesGrid = ({ templates, isLoading = false }: TemplatesGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-slate-100 animate-pulse rounded-xl h-72"></div>
        ))}
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {templates.map(template => (
        <TemplateCard key={template.id} template={template} />
      ))}
      
      {templates.length === 0 && (
        <div className="text-center py-16 col-span-full">
          <h3 className="text-2xl font-semibold mb-3">No templates found</h3>
          <p className="text-muted-foreground">Try a different category or check back soon for new additions.</p>
        </div>
      )}
    </div>
  );
};

export default TemplatesGrid;
