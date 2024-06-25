import { Input } from '@/components/ui/input'

export function Search({ handleFilterData, datas }) {
  const filterDatas = datas
  const handleSearch = (e) => {
    const filterData = filterDatas?.map((group) => {
      return group.data?.filter((item) => {
        console.log(item)
        return (
          item?.author?.profile?.username?.includes(e.target.value) ||
          item?.content?.includes(e.target.value)
        )
      })
    })
    handleFilterData(filterData.flat())
  }
  return (
    <div>
      <Input
        type='search'
        placeholder='搜索帖子'
        onChange={handleSearch}
        className='rounded-full  md:w-[200px] lg:w-[400px]'
      />
    </div>
  )
}
