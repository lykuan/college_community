import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import blog from "@/assets/imgs/image_fx_a_2d_image_that_a_younger_man_whose_face_is_c.jpg"
import { cn, formatDate } from "@/lib/utils"
import { Link } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const IdeaPreviewCard = ({ idea: { title, content, community, createdAt, _id } }) => {
  return (
    <Card className={cn(" flex flex-col max-h-fit max-w-[400px] ")}>

      <img src={blog} className={cn("max-h-[100px] w-full object-cover")} alt="idea cover" />

      <CardContent className={cn("flex flex-col max-h-[260px] gap-y-1 p-0.5 flex-grow justify-between")}>
        <div >
          <h3 className="text-pink-500 text-ellipsis line-clamp-1">{title}</h3>
          <p className="flex gap-2 items-center to-pink-500">
            <span className="text-xs">{formatDate(createdAt)}</span><span className="text-xs"></span><Badge variant="secondary">{community}</Badge></p>
        </div>
        <div className="text-sm h-1/3 w-full   line-clamp-2 text-ellipsis  break-words" dangerouslySetInnerHTML={{ __html: content }}></div>

        <Button variant="outline" >
          <Link to={`/idea/${_id}`} className="text-xs text-pink-500">查看详情</Link>
        </Button>


      </CardContent>
    </Card>
  )
}

export default IdeaPreviewCard
