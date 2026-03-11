function FilterBar({setSort}){

return(

<div className="filter-bar">

<select onChange={(e)=>setSort(e.target.value)}>

<option value="">Sort By</option>
<option value="rating">Top Rated</option>
<option value="experience">Experience</option>

</select>

</div>

)

}

export default FilterBar