import { Card, CardContent, CardHeader } from "./ui/card"
interface rfcardProps{
    raw_text:string,
    id:string,
    onClick:()=>void,
    name:string
    
}

function Rfpcard({ raw_text,id,onClick,name}: rfcardProps) {
  return (
    <Card className="h-[180px] flex flex-col justify-between overflow-hidden" id={id} onClick={onClick} >
      <CardHeader className="font-semibold">
        {name}
      </CardHeader>

      <CardContent className="overflow-hidden">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {raw_text}
        </p>
      </CardContent>
    </Card>
  );
}

export default Rfpcard;

