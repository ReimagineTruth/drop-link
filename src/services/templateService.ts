
import { supabase } from "@/integrations/supabase/client";
import { templatesData } from "@/data/templatesData";

export interface TemplateTheme {
  id: number;
  name: string;
  category: string;
  plan: string;
  colors: string[];
  background?: string;
  fontFamily?: string;
  buttonStyle?: string;
  layout?: string;
}

export const applyTemplateToProfile = async (userId: string, templateId: number) => {
  try {
    const template = templatesData.find(t => t.id === templateId);
    if (!template) {
      throw new Error("Template not found");
    }

    // Update user profile with template theme data
    const { data, error } = await supabase
      .from('user_profiles')
      .update({
        theme: JSON.stringify({
          templateId: template.id,
          name: template.name,
          colors: template.colors,
          category: template.category,
          plan: template.plan
        })
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error applying template:", error);
    throw error;
  }
};

export const getUserTemplate = async (userId: string): Promise<TemplateTheme | null> => {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('theme')
      .eq('id', userId)
      .single();

    if (error || !data?.theme) return null;

    const themeData = typeof data.theme === 'string' 
      ? JSON.parse(data.theme) 
      : data.theme;

    return themeData;
  } catch (error) {
    console.error("Error getting user template:", error);
    return null;
  }
};
