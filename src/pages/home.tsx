import { useEffect, useState } from "react";
import { listTemplatesService } from "../services/templates.service";
import ListTemplate from "../components/ui/templates/listTemplates";
import Filter from "../components/ui/filter";
import { useDebounce } from "../components/hooks/useDebounce";

export default function Home() {
  const [templates, setTemplates] = useState([]);
  const [query, setQuery] = useState<string>("");
  const debouncedValue = useDebounce(query, 300);
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await listTemplatesService(debouncedValue);
        setTemplates(res);
      } catch {}
    };
    fetchTemplates();
  }, [debouncedValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  return (
    <div>
      <Filter handleChange={handleChange} query={query} />
      <ListTemplate templatesList={templates} />
    </div>
  );
}
