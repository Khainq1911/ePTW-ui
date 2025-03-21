import { useEffect, useState } from "react";
import { listTemplatesService } from "../services/templates.service";
import ListTemplate from "../components/templates/listTemplates";

export default function Home() {
  const [templates, setTemplates] = useState([])
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await listTemplatesService()
        console.log(res)
        setTemplates(res)
      } catch {}
    };
    fetchTemplates()
  },[]);

  return <div className=""><ListTemplate templatesList={templates}/></div>;
}
