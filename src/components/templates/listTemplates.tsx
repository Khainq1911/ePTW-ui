import TemplateCard from "./templateCard";

interface Props {
  templatesList: any;
}
export default function ListTemplate({ templatesList }: Props) {
  return (
    <div>
      {templatesList.map((item: any) => (
        <TemplateCard item={item} key={item.id}/>
      ))}
    </div>
  );
}
