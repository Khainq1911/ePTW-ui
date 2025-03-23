import { useEffect, useState } from "react";
import { listTemplatesService } from "../services/templates.service";
import ListTemplate from "../components/templates/listTemplates";
import Filter from "../components/filter";

export default function Home() {
  const [templates, setTemplates] = useState([])
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await listTemplatesService()
        setTemplates(res)
      } catch {}
    };
    fetchTemplates()
  },[]);

  return <div>
    <Filter/>
    <ListTemplate templatesList={templates}/></div>;
}
