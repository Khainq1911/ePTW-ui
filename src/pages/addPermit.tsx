import { useParams } from "react-router-dom";
import Template from "../components/ui/permit/template";
import { useEffect, useState } from "react";
import { getByIdService } from "../services/templates.service";
import { TemplateType } from "../types/template.type";

export default function AddPermit() {
  const [template, setTemplate] = useState<TemplateType | null>(null);
  const { id } = useParams();
  useEffect(() => {
    const getTemplate = async () => {
      try {
        const res = await getByIdService(Number(id));
        setTemplate(res);
      } catch (error) {}
    };

    getTemplate();
  }, []);
  return (
    <div>
      <Template template={template} />
    </div>
  );
}
